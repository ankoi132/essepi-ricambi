-- Schema SQL per Essepi Ricambi (Supabase PostgreSQL)
-- Creato per l'e-commerce Essepi Ricambi: Catalogo, Magazzino, Logistica e Fiscalità Italiana

-- 1. Estensioni
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabella Categorie
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  item_count INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabella Prodotti
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT ('esp-' || uuid_generate_v4()),
  sku TEXT UNIQUE NOT NULL,
  oem_code TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  sub_category TEXT,
  condition TEXT NOT NULL CHECK (condition IN ('Nuovo Originale', 'Nuovo NOS', 'Aftermarket Certificato', 'Ricondizionato Garantito', 'Usato Verificato')),
  price_net NUMERIC(10, 2) NOT NULL, -- Imponibile
  price_gross NUMERIC(10, 2) NOT NULL, -- Prezzo al pubblico con IVA
  vat_rate NUMERIC(5, 2) DEFAULT 22.00, -- Aliquota IVA italiana (22%)
  stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 2, -- Soglia riordino
  location TEXT NOT NULL DEFAULT 'Magazzino Centrale', -- Posizione Scaffale / Corsia
  cost_price NUMERIC(10, 2), -- Costo d'acquisto fornitore
  weight_kg NUMERIC(6, 3) DEFAULT 1.000,
  shipping_cost NUMERIC(6, 2) DEFAULT 7.90,
  featured BOOLEAN DEFAULT FALSE,
  rating NUMERIC(3, 2) DEFAULT 5.00,
  reviews_count INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  description TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici di ricerca rapida per codice OEM, SKU e Ricerca Testuale Full-Text
CREATE INDEX IF NOT EXISTS idx_products_oem ON products (oem_code);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products (sku);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products (brand);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category_id);

-- 4. Tabella Compatibilità Veicoli
CREATE TABLE IF NOT EXISTS product_compatibilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year_start INTEGER NOT NULL,
  year_end INTEGER NOT NULL,
  engine TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_compat_make_model ON product_compatibilities (make, model);
CREATE INDEX IF NOT EXISTS idx_compat_product ON product_compatibilities (product_id);

-- 5. Tabella Ordini (Pronta per Normativa e Fatturazione Italiana)
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT ('ord-' || uuid_generate_v4()),
  order_number TEXT UNIQUE NOT NULL, -- es. ESP-2026-0042
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Dati Cliente
  customer_type TEXT NOT NULL CHECK (customer_type IN ('private', 'business')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company_name TEXT,
  vat_number TEXT, -- Partita IVA (obbligatoria se business)
  fiscal_code TEXT NOT NULL, -- Codice Fiscale (obbligatorio in Italia)
  sdi_code TEXT, -- Codice Destinatario SDI a 7 caratteri (o 0000000)
  pec TEXT, -- Posta Elettronica Certificata
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  province TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Italia',
  customer_notes TEXT,
  
  -- Spedizione e Pagamento
  shipping_method_id TEXT NOT NULL,
  shipping_courier TEXT,
  shipping_cost NUMERIC(10, 2) DEFAULT 0.00,
  tracking_number TEXT,
  payment_method_id TEXT NOT NULL,
  payment_extra_fee NUMERIC(10, 2) DEFAULT 0.00,
  
  -- Totali Fiscali (Scorporo IVA 22%)
  subtotal_net NUMERIC(10, 2) NOT NULL, -- Totale imponibile
  vat_amount NUMERIC(10, 2) NOT NULL, -- Quota IVA 22%
  total_gross NUMERIC(10, 2) NOT NULL, -- Totale pagato dal cliente
  
  -- Stato e Fatturazione
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('pending_payment', 'processing', 'shipped', 'delivered', 'cancelled')),
  invoice_issued BOOLEAN DEFAULT FALSE,
  invoice_number TEXT,
  
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- 6. Dettagli Articoli Ordine
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_sku TEXT NOT NULL,
  product_oem TEXT NOT NULL,
  unit_price_net NUMERIC(10, 2) NOT NULL,
  unit_price_gross NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_net NUMERIC(10, 2) NOT NULL,
  total_gross NUMERIC(10, 2) NOT NULL
);

-- 7. Registro Movimenti Magazzino (Carico, Scarico, Reso, Inventario)
CREATE TABLE IF NOT EXISTS inventory_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  change_amount INTEGER NOT NULL, -- Positivo per carico, negativo per vendita
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('vendita_ordine', 'carico_fornitore', 'rettifica_inventario', 'reso_cliente')),
  reference_id TEXT, -- ID Ordine o Numero bolla DDT fornitore
  operator TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Trigger per decremento automatico stock quando viene confermato un ordine
CREATE OR REPLACE FUNCTION handle_order_inventory_decrement()
RETURNS TRIGGER AS $$
BEGIN
  -- Scala la giacenza per ogni prodotto ordinato
  UPDATE products
  SET stock = stock - NEW.quantity,
      updated_at = NOW()
  WHERE id = NEW.product_id;

  -- Registra nel log movimenti
  INSERT INTO inventory_logs (product_id, change_amount, previous_stock, new_stock, reason, reference_id)
  SELECT 
    NEW.product_id,
    -NEW.quantity,
    p.stock + NEW.quantity,
    p.stock,
    'vendita_ordine',
    NEW.order_id
  FROM products p
  WHERE p.id = NEW.product_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_order_inventory_decrement
AFTER INSERT ON order_items
FOR EACH ROW
EXECUTE FUNCTION handle_order_inventory_decrement();

-- 9. Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_compatibilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;

-- Prodotti e Categorie leggibili da chiunque
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read compatibilities" ON product_compatibilities FOR SELECT USING (true);

-- Ordini inseribili da utenti/clienti durante il checkout
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);

-- Gestione completa solo per admin / service role
CREATE POLICY "Admin all products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all inventory" ON inventory_logs FOR ALL USING (auth.role() = 'authenticated');
