# 🏎️ Essepi Ricambi — E-Commerce Premium, Magazzino & Logistica

> **Piattaforma E-Commerce di livello enterprise per la vendita di ricambi auto originali e aftermarket**, creata come evoluzione autonoma e indipendente del negozio eBay storico **[Essepi Ricambi](https://www.ebay.it/str/essepiricambi)** (oltre 4.400 ricambi a catalogo, 3.600+ vendite e 100% di feedback positivi).

---

## 🌟 Caratteristiche Principali

### 🛍️ Vetrina Storefront & Esperienza d'Acquisto
- **Design Cinematico Automotive**: Interfaccia ultra-moderna con accenti neon amber/orange e cyan, texture carbon subtle, effetti glassmorphism e micro-animazioni fluide.
- **Garage Virtuale Interattivo ("Cerca per Auto")**: Filtro immediato per Marca (Volkswagen, Toyota, Fiat, Ford, BMW, Opel, Mini, ecc.), Modello e Anno di produzione. Mostra solo i ricambi al 100% compatibili.
- **Ricerca Rapida per Codice OEM**: Ricerca live con auto-completamento immediato per codice originale stampato sul pezzo (es. `04466-0F010`), codice SKU o descrizione.
- **Schede Prodotto Dettagliate**:
  - Immagini ad alta risoluzione con visualizzazione ingrandita.
  - Box Codice OEM con pulsante "Copia Codice" in 1 click.
  - Tabella completa delle compatibilità veicoli con filtro di ricerca interno.
  - Scorporo trasparente del prezzo: **Prezzo Netto Imponibile + IVA 22% = Totale Lordo**.
  - Canale diretto WhatsApp pre-compilato con codice OEM e titolo ricambio per chiedere conferme tramite foto libretto / telaio VIN.
- **Carrello Dinamico & Spedizioni**: Calcolo in tempo reale della soglia per la **Spedizione Gratuita** (ordini > €149,00) e selezione corriere (BRT, GLS, DHL Express, Ritiro in sede).

---

### 📦 Gestione Magazzino, Logistica & Fisco (Pannello Soci / Admin `/admin`)
- **Panoramica KPI & Statistiche in Tempo Reale**:
  - Fatturato Lordo e Imponibile Netto totale.
  - Debito IVA (22%) raccolto per la liquidazione periodica.
  - Valore complessivo delle merci a magazzino (€).
  - Avvisi automatici su articoli **Sotto Scorta** e prodotti esauriti.
- **Inventario & Giacenze**:
  - Tabella magazzino completa con SKU, Codice OEM, Giacenza reale e **Posizione Scaffale** (es. `Scaffale B-14 / C2`).
  - Modifica rapida giacenza in 1-click (+/-) con auto-aggiornamento.
- **Inserimento Nuovo Ricambio**:
  - Form guidato per aggiungere nuovi articoli: Codice OEM, Marca, Condizione (Nuovo Originale, New Old Stock NOS, Aftermarket, Ricondizionato), Posizione a scaffale.
  - **Calcolatore Fiscale Automatico**: inserisci il prezzo imponibile e il sistema calcola automaticamente l'IVA 22% e la spedizione per il carrello.
- **Logistica & Gestione Spedizioni**:
  - Gestione avanzata ordini: *In attesa di pagamento*, *Da imballare/elaborare*, *Spedito con corriere*, *Consegnato*.
  - Assegnazione corriere espresso (GLS, BRT, DHL, SDA) e inserimento del **Numero di Tracciamento (LDV)** con notifica per il cliente.
  - Generazione e stampa della **Distinta di Spedizione / Packing Slip** per il magazziniere.
- **Fiscalità Italiana & Commercialista**:
  - Suddivisione automatica ordini **Privati (B2C con Codice Fiscale)** e **Aziende/Officine (B2B con Partita IVA, Codice Destinatario SDI e PEC)**.
  - **Esportazione Registro Corrispettivi in formato CSV**: file pronto da consegnare al commercialista per le dichiarazioni IVA mensili o trimestrali.

---

### ⚖️ Conformità Legale al 100% per l'Italia e l'Unione Europea
- **Banner Cookie GDPR**: conforme alle *Linee Guida del Garante Privacy del 10 giugno 2021*, con blocco preventivo, opzioni "Accetta Tutti", "Solo Tecnici" e personalizzazione granulare (tecnici, analitici, marketing).
- **Informativa Privacy (GDPR Reg. UE 2016/679)**: titolare del trattamento, basi giuridiche e diritti dell'interessato consultabili su `/privacy`.
- **Termini e Condizioni di Vendita**: conformi al *Codice del Consumo (D.Lgs. 206/2005)* e al *D.Lgs. 70/2003 sul Commercio Elettronico* su `/termini`.
- **Diritto di Recesso a 14 Giorni & Garanzia 24 Mesi**: conformi alla normativa europea sui contratti a distanza con modulo tipo di recesso scaricabile su `/recesso`.
- **Dati Aziendali Obbligatori (Art. 2250 c.c.)**: Ragione Sociale, Partita IVA, REA, PEC e Sede esposti in modo chiaro nel footer e nei documenti contabili.

---

## 🛠️ Stack Tecnologico

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Linguaggio**: [TypeScript](https://www.typescriptlang.org/)
- **Stile & Design System**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icone**: [Lucide React](https://lucide.dev/)
- **Database & Backend Ready**: [Supabase](https://supabase.com/) (PostgreSQL con RLS, migrazioni e indici performanti)
- **Stato & Persistenza**: React Context + LocalStorage (funzionamento offline e fallback automatico) con sincronizzazione Supabase
- **Hosting & Deploy**: [Vercel](https://vercel.com/)

---

## 🚀 Guida Rapida all'Avvio Locale

1. **Clona la repository o accedi alla cartella del progetto**:
   ```bash
   cd "D:\Dev\Web project\essepi-ricambi"
   ```

2. **Installa le dipendenze**:
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**:
   ```bash
   npm run dev
   ```
   Apri il browser su [http://localhost:3000](http://localhost:3000).

4. **Verifica della build di produzione**:
   ```bash
   npm run build
   ```

---

## 📦 Deploy su GitHub e Vercel

### 1. Carica su GitHub
Il progetto è già inizializzato come repository Git locale. Per caricarlo sul tuo account GitHub:

```bash
# 1. Crea una nuova repository vuota su https://github.com/new (es. "essepi-ricambi")
# 2. Aggiungi il remote ed effettua il push:
git add .
git commit -m "feat: complete premium auto parts e-commerce with warehouse, logistics and legal compliance"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/essepi-ricambi.git
git push -u origin main
```

### 2. Deploy su Vercel in 1 Click
1. Vai su [vercel.com](https://vercel.com/) ed effettua il login (con GitHub).
2. Clicca su **"Add New Project"** e seleziona la repository `essepi-ricambi`.
3. Vercel riconoscerà automaticamente il framework **Next.js**.
4. Nelle **Environment Variables** (opzionale fino a quando non colleghi Supabase):
   - `NEXT_PUBLIC_SITE_URL`: `https://tuo-dominio.vercel.app`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `393461811152`
5. Clicca su **"Deploy"**. In circa 60 secondi il sito sarà online e accessibile in tutto il mondo con certificato SSL HTTPS gratuito!

---

## 🗄️ Configurazione Backend su Supabase

Il progetto è pre-configurato per collegarsi a un database PostgreSQL gestito su **Supabase**:

1. Crea un nuovo progetto su [supabase.com](https://supabase.com/).
2. Vai nella sezione **SQL Editor** del tuo progetto Supabase.
3. Apri il file già pronto presente nel progetto:
   `supabase/migrations/001_essepi_schema.sql`
4. Incolla il contenuto ed esegui la query: verranno create tutte le tabelle (`products`, `categories`, `product_compatibilities`, `orders`, `order_items`, `inventory_logs`), i trigger per lo scarico automatico del magazzino e le policy di sicurezza (RLS).
5. Recupera le credenziali in **Project Settings -> API**:
   - `Project URL`
   - `anon public key`
6. Inserisci le credenziali nel file `.env.local` locale o nella dashboard di Vercel:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tuo-progetto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tuo-anon-key-pubblico
   ```
7. *Nota:* Anche senza Supabase collegato, l'applicazione funziona al 100% grazie al sistema di fallback e memoria locale reattiva!

---

## 📞 Contatti & Assistenza Tecnica
- **Negozio eBay Storico**: [https://www.ebay.it/str/essepiricambi](https://www.ebay.it/str/essepiricambi)
- **Email Diretta**: info@partsit.it
- **WhatsApp**: +39 346 181 1152
- **PEC**: essepiricambi@legalmail.it
