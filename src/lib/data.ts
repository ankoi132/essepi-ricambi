import { Product, Category, ShippingMethod, PaymentMethod, Order } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'freni',
    slug: 'freni',
    name: 'Impianto Frenante',
    description: 'Pastiglie, dischi freno ventilati, ganasce, pinze e tubi freno ad alte prestazioni.',
    iconName: 'Disc',
    itemCount: 480,
    image: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'distribuzione',
    slug: 'distribuzione',
    name: 'Distribuzione & Cinghie',
    description: 'Kit catena di distribuzione, cinghie dentate, tenditori idraulici e pompe acqua.',
    iconName: 'Cog',
    itemCount: 390,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'filtri',
    slug: 'filtri',
    name: 'Filtri & Manutenzione',
    description: 'Filtri olio, aria, carburante, abitacolo ai carboni attivi e filtri idraulici.',
    iconName: 'Filter',
    itemCount: 650,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'illuminazione',
    slug: 'illuminazione',
    name: 'Illuminazione & Fanali',
    description: 'Proiettori anteriori, fanali posteriori a LED, frecce laterali e luci targa originali.',
    iconName: 'Zap',
    itemCount: 520,
    image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'sospensioni',
    slug: 'sospensioni',
    name: 'Sospensioni & Cuscinetti',
    description: 'Ammortizzatori a gas, mozzi ruota con cuscinetto, bracci oscillanti e cuffie giunto.',
    iconName: 'Shield',
    itemCount: 410,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'motore',
    slug: 'motore',
    name: 'Componenti Motore',
    description: 'Guarnizioni testata, punterie, termostati, sensori giri motore e corpi farfallati.',
    iconName: 'Gauge',
    itemCount: 590,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'carrozzeria',
    slug: 'carrozzeria',
    name: 'Carrozzeria & Cristalli',
    description: 'Alzacristalli elettrici, maniglie porta, specchietti retrovisori e serrature.',
    iconName: 'Car',
    itemCount: 340,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'accessori',
    slug: 'accessori',
    name: 'Accessori & Interni',
    description: 'Alette parasole originali, tappetini sagomati, pomelli cambio e componenti abitacolo.',
    iconName: 'Sparkles',
    itemCount: 280,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'esp-820242021302',
    sku: 'TYT-04466-0F010',
    oemCode: '04466-0F010',
    name: 'Set Pastiglie Freno Posteriori Originali Toyota Verso (2009-2016)',
    slug: 'set-pastiglie-freno-posteriori-originali-toyota-verso-04466-0f010',
    brand: 'Toyota Genuine Parts',
    category: 'freni',
    subCategory: 'pastiglie',
    condition: 'Nuovo NOS',
    priceNet: 39.34,
    priceGross: 47.99,
    vatRate: 22,
    stock: 8,
    minStock: 2,
    location: 'Scaffale B-14 / C2',
    costPrice: 22.00,
    weightKg: 1.2,
    shippingCost: 7.90,
    featured: true,
    rating: 5.0,
    reviewsCount: 19,
    images: [
      'https://i.ebayimg.com/images/g/oKMAAeSwLTZqz0OL/s-l500.jpg'
    ],
    description: 'Set pastiglie freno a disco asse posteriore originale Toyota Genuine Parts per Toyota Verso (AUR2_, ZGR2_, WAR20_) prodotte dal 2009 al 2016. Ricambio originale garanzia di massima sicurezza, assenza di fischi e usura uniforme del disco.',
    features: [
      'Codice originale OEM: 04466-0F010 (sostituisce anche 04466-02180)',
      'Posizione: Asse posteriore sinistro e destro',
      'Include mollette e lamierini anti-vibrazione',
      'Materiale d\'attrito originale ad alta resistenza termica',
      'Stato: Nuovo New Old Stock con imballo sigillato d\'origine'
    ],
    compatibility: [
      { make: 'Toyota', model: 'Verso', yearStart: 2009, yearEnd: 2016, engine: '1.6 D-4D / 2.0 D-4D / 1.8 Valvematic' },
      { make: 'Toyota', model: 'Auris', yearStart: 2007, yearEnd: 2012, engine: '2.0 D-4D / 2.2 D-CAT' },
      { make: 'Toyota', model: 'Corolla Verso', yearStart: 2004, yearEnd: 2009, engine: '2.2 D-4D' }
    ]
  },
  {
    id: 'esp-820241957677',
    sku: 'TYT-42410-F4010',
    oemCode: '42410-F4010',
    name: 'Kit Cuscinetto Ruota Posteriore e Mozzo Originale Toyota C-HR (2016-2023)',
    slug: 'kit-cuscinetto-ruota-mozzo-posteriore-toyota-c-hr-42410-f4010',
    brand: 'Toyota Genuine Parts',
    category: 'sospensioni',
    subCategory: 'cuscinetti',
    condition: 'Nuovo Originale',
    priceNet: 147.54,
    priceGross: 180.00,
    vatRate: 22,
    stock: 4,
    minStock: 1,
    location: 'Scaffale D-03 / A1',
    costPrice: 95.00,
    weightKg: 3.4,
    shippingCost: 8.90,
    featured: true,
    rating: 4.9,
    reviewsCount: 14,
    images: [
      'https://i.ebayimg.com/images/g/BncAAeSwpu9qz0EJ/s-l500.jpg'
    ],
    description: 'Gruppo mozzo e cuscinetto ruota posteriore completo con anello sensore ABS integrato per Toyota C-HR prima serie (AX10 / ZYX10). Alta precisione di rotolamento e tenuta stagna ermetica garantita.',
    features: [
      'OEM: 42410-F4010 / 42410F4010',
      'Posizione di montaggio: Asse posteriore (compatibile DX / SX)',
      'Sensore ABS magnetico integrato',
      'Pre-ingrassato e sigillato a vita'
    ],
    compatibility: [
      { make: 'Toyota', model: 'C-HR', yearStart: 2016, yearEnd: 2023, engine: '1.8 Hybrid (ZYX10) / 2.0 Hybrid / 1.2 Turbo' },
      { make: 'Toyota', model: 'Corolla', yearStart: 2019, yearEnd: 2024, engine: '1.8 Hybrid / 2.0 Hybrid' }
    ]
  },
  {
    id: 'esp-358685773661',
    sku: 'FRD-1372438-KIT',
    oemCode: '1372438 / 1704066',
    name: 'Kit Catena Distribuzione con Paraolio e Pompa Acqua Ford Transit 2.4 TDE / DI',
    slug: 'kit-catena-distribuzione-pompa-acqua-ford-transit-2-4-tde-di',
    brand: 'Ford Motorcraft',
    category: 'distribuzione',
    subCategory: 'catena',
    condition: 'Nuovo Originale',
    priceNet: 188.52,
    priceGross: 230.00,
    vatRate: 22,
    stock: 5,
    minStock: 2,
    location: 'Scaffale A-08 / B3',
    costPrice: 125.00,
    weightKg: 5.8,
    shippingCost: 9.90,
    featured: true,
    rating: 4.8,
    reviewsCount: 22,
    images: [
      'https://i.ebayimg.com/images/g/mS0AAeSwTLhqL-3J/s-l500.jpg'
    ],
    description: 'Kit distribuzione completo di catene, tenditori idraulici rinforzati, pattini guida, guarnizioni carter, paraolio albero motore e pompa acqua per Ford Transit Mk6 / Mk7 con motore 2.4 Duratorq TDE / DI.',
    features: [
      'Kit completo 8 pezzi con ingranaggi e tenditore idraulico',
      'Include pompa dell\'acqua ad alta portata',
      'Guarnizione metallo-elastomero per carter distribuzione',
      'Qualità OEM resistente alle sollecitazioni gravose'
    ],
    compatibility: [
      { make: 'Ford', model: 'Transit', yearStart: 2000, yearEnd: 2006, engine: '2.4 DI (75cv, 90cv, 120cv, 125cv)' },
      { make: 'Ford', model: 'Transit', yearStart: 2006, yearEnd: 2014, engine: '2.4 TDCi / TDE (100cv, 115cv, 140cv)' },
      { make: 'Land Rover', model: 'Defender', yearStart: 2007, yearEnd: 2016, engine: '2.4 Td4 4x4' }
    ]
  },
  {
    id: 'esp-358398540545',
    sku: 'VAG-1J6945095Q',
    oemCode: '1J6945095Q',
    name: 'Fanale Posteriore Sinistro Originale Volkswagen Golf IV (1997-2004) Hella/OEM',
    slug: 'fanale-posteriore-sinistro-volkswagen-golf-iv-1j6945095q',
    brand: 'Volkswagen AG',
    category: 'illuminazione',
    subCategory: 'fanali',
    condition: 'Nuovo NOS',
    priceNet: 69.67,
    priceGross: 85.00,
    vatRate: 22,
    stock: 6,
    minStock: 2,
    location: 'Scaffale C-05 / E1',
    costPrice: 42.00,
    weightKg: 1.6,
    shippingCost: 7.90,
    featured: true,
    rating: 5.0,
    reviewsCount: 31,
    images: [
      'https://i.ebayimg.com/images/g/3OsAAeSwAUppzTRi/s-l500.jpg'
    ],
    description: 'Gruppo ottico posteriore lato guida (sinistro) versione fumé/rosso originale Volkswagen per Golf 4 berlina 3/5 porte. Pezzo originale nuovo di fabbrica (New Old Stock), plastiche limpide mai montate.',
    features: [
      'Codice originale VW: 1J6 945 095 Q / 1J6945095Q',
      'Lato di montaggio: Sinistro (lato conducente)',
      'Omologazione europea E-Mark stampata sulla lente',
      'Portalampade guarnito di tenuta in schiuma a cellula chiusa'
    ],
    compatibility: [
      { make: 'Volkswagen', model: 'Golf IV', yearStart: 1997, yearEnd: 2004, engine: 'Tutte le versioni berlina (1.4, 1.6, 1.9 TDI, GTI, R32)' }
    ]
  },
  {
    id: 'esp-358194769236',
    sku: 'VAG-6C0945096K',
    oemCode: '6C0945096K',
    name: 'Fanale Posteriore Destro Originale Volkswagen Polo V Facelift 6C (2014-2017)',
    slug: 'fanale-posteriore-destro-volkswagen-polo-v-6c0945096k',
    brand: 'Volkswagen AG',
    category: 'illuminazione',
    subCategory: 'fanali',
    condition: 'Nuovo Originale',
    priceNet: 81.97,
    priceGross: 100.00,
    vatRate: 22,
    stock: 3,
    minStock: 1,
    location: 'Scaffale C-05 / E2',
    costPrice: 55.00,
    weightKg: 1.5,
    shippingCost: 7.90,
    featured: false,
    rating: 4.9,
    reviewsCount: 8,
    images: [
      'https://i.ebayimg.com/images/g/l-0AAeSwO2Bphffm/s-l500.jpg'
    ],
    description: 'Fanale posteriore destro (lato passeggero) per Volkswagen Polo 5 restyling (Tipo 6C). Ricambio autentico VW con rifinitura impeccabile e precisione d\'incastro millimetrica.',
    features: [
      'Codice OEM: 6C0 945 096 K / 6C0945096K',
      'Compatibile con allestimenti Trendline, Comfortline, Highline',
      'Sigillatura ermetica contro condensa e polvere'
    ],
    compatibility: [
      { make: 'Volkswagen', model: 'Polo V (6C)', yearStart: 2014, yearEnd: 2017, engine: '1.0 MPI / 1.2 TSI / 1.4 TDI' }
    ]
  },
  {
    id: 'esp-820241930253',
    sku: 'FT-71740678',
    oemCode: '71740678 / 55180016',
    name: 'Guarnizione Coperchio Punterie Fiat Punto Palio Strada Idea 1.8 & Opel Corsa B',
    slug: 'guarnizione-punterie-fiat-punto-palio-strada-opel-corsa-71740678',
    brand: 'Elring / Ricambio Certificato',
    category: 'motore',
    subCategory: 'guarnizioni',
    condition: 'Aftermarket Certificato',
    priceNet: 14.75,
    priceGross: 18.00,
    vatRate: 22,
    stock: 15,
    minStock: 4,
    location: 'Scaffale A-02 / G4',
    costPrice: 6.50,
    weightKg: 0.25,
    shippingCost: 6.90,
    featured: false,
    rating: 4.8,
    reviewsCount: 29,
    images: [
      'https://i.ebayimg.com/images/g/40MAAeSw2ONq0Of1/s-l500.jpg'
    ],
    description: 'Guarnizione coperchio valvole in elastomero FPM ad altissima resistenza alle temperature elevate e agli idrocarburi per motori GM/Fiat 1.8 e famiglia Opel 1.2 / 1.4.',
    features: [
      'Codice ricambio: 71740678, 55180016, 90409594',
      'Tenuta garantita contro trafilaggi d\'olio motore',
      'Mescola flessibile resistente fino a 200°C'
    ],
    compatibility: [
      { make: 'Fiat', model: 'Punto II (188)', yearStart: 1999, yearEnd: 2006, engine: '1.8 130 HGT' },
      { make: 'Fiat', model: 'Strada / Palio', yearStart: 2003, yearEnd: 2011, engine: '1.8 8V Flex / Benzina' },
      { make: 'Fiat', model: 'Idea', yearStart: 2004, yearEnd: 2012, engine: '1.8' },
      { make: 'Opel', model: 'Corsa B', yearStart: 1993, yearEnd: 2000, engine: '1.2i / 1.4i / 1.4 16V' }
    ]
  },
  {
    id: 'esp-820241895529',
    sku: 'OPL-1606318',
    oemCode: '1606318 / 90008544',
    name: 'Kit Serie Guarnizioni Testata Motore Opel Kadett A-C-D 1.0 S / Corsa A 1.0',
    slug: 'kit-guarnizioni-testata-opel-kadett-corsa-a-1606318',
    brand: 'Glaser / OEM Quality',
    category: 'motore',
    subCategory: 'guarnizioni',
    condition: 'Nuovo NOS',
    priceNet: 36.89,
    priceGross: 45.00,
    vatRate: 22,
    stock: 7,
    minStock: 2,
    location: 'Scaffale A-03 / H1',
    costPrice: 19.00,
    weightKg: 0.9,
    shippingCost: 7.50,
    featured: false,
    rating: 5.0,
    reviewsCount: 6,
    images: [
      'https://i.ebayimg.com/images/g/IoIAAeSwzj5q0OYH/s-l500.jpg'
    ],
    description: 'Kit completo guarnizioni smeriglio testata per motori storici Opel 1.0 litri OHV asta e bilancieri. Ideale per restauri auto d\'epoca e youngtimer.',
    features: [
      'Codice originale Opel: 1606318 / 90008544',
      'Include guarnizione testa rinforzata con anelli parafiamma',
      'Guarnizione aspirazione, scarico e gommini guidavalvole inclusi'
    ],
    compatibility: [
      { make: 'Opel', model: 'Kadett A / B / C / D', yearStart: 1962, yearEnd: 1984, engine: '1.0 N / 1.0 S' },
      { make: 'Opel', model: 'Corsa A', yearStart: 1982, yearEnd: 1993, engine: '1.0 45cv OHV' }
    ]
  },
  {
    id: 'esp-358281779340',
    sku: 'BMW-51472409276',
    oemCode: '51472409276',
    name: 'Set Tappetini in Gomma All-Weather Posteriori Originali BMW Serie 7 F01 / F02',
    slug: 'set-tappetini-gomma-posteriori-originali-bmw-serie-7-f01-51472409276',
    brand: 'BMW Genuine Accessories',
    category: 'accessori',
    subCategory: 'interni',
    condition: 'Nuovo Originale',
    priceNet: 61.48,
    priceGross: 75.00,
    vatRate: 22,
    stock: 5,
    minStock: 2,
    location: 'Scaffale F-01 / A4',
    costPrice: 38.00,
    weightKg: 2.8,
    shippingCost: 8.50,
    featured: false,
    rating: 5.0,
    reviewsCount: 11,
    images: [
      'https://i.ebayimg.com/images/g/Ko0AAeSwMQhpps1C/s-l500.jpg'
    ],
    description: 'Tappeti sagomati in gomma speciale impermeabile e inodore con bordo rialzato originale BMW per vano posteriore Serie 7 (F01/F02). Proteggono la moquette da fango, neve e liquidi.',
    features: [
      'Codice catalogo BMW: 51 47 2 409 276 / 51472409276',
      'Finitura nera satinata con logo BMW goffrato in rilievo',
      'Sistema di fissaggio a baionetta antiscivolo',
      'Facilmente lavabili con idropulitrice'
    ],
    compatibility: [
      { make: 'BMW', model: 'Serie 7 (F01 / F02 / F03 / F04)', yearStart: 2008, yearEnd: 2015, engine: '730d, 740d, 740i, 750i, 760i, ActiveHybrid' }
    ]
  },
  {
    id: 'esp-358482452970',
    sku: 'VAG-6N6Z64227PL',
    oemCode: '6N0711118 / 6N6Z64227PL',
    name: 'Kit Pomello e Cuffia Cambio Originale Volkswagen Polo III (1994-2001)',
    slug: 'pomello-cuffia-cambio-volkswagen-polo-iii-6n',
    brand: 'Volkswagen AG',
    category: 'accessori',
    subCategory: 'interni',
    condition: 'Nuovo NOS',
    priceNet: 31.97,
    priceGross: 39.00,
    vatRate: 22,
    stock: 9,
    minStock: 3,
    location: 'Scaffale F-02 / B1',
    costPrice: 16.00,
    weightKg: 0.45,
    shippingCost: 6.90,
    featured: false,
    rating: 4.9,
    reviewsCount: 17,
    images: [
      'https://i.ebayimg.com/images/g/6y0AAeSwZU5p340t/s-l500.jpg'
    ],
    description: 'Pomello leva cambio con schema marce a 5 velocità completo di cuffia e cornice ad incastro per Volkswagen Polo serie 6N e 6N2. Ricambio New Old Stock introvabile in concessionaria.',
    features: [
      'Codice originale VW: 6N6Z64227PL',
      'Pelle sintetica texturizzata antiusura',
      'Incastro perfetto senza giochi o vibrazioni'
    ],
    compatibility: [
      { make: 'Volkswagen', model: 'Polo III (6N / 6N2)', yearStart: 1994, yearEnd: 2001, engine: '1.0, 1.4, 1.6, 1.9 SDI / TDI' },
      { make: 'Seat', model: 'Ibiza II / Cordoba', yearStart: 1993, yearEnd: 1999, engine: '1.4, 1.6, 1.9 D' }
    ]
  },
  {
    id: 'esp-358203002575',
    sku: 'VAG-1T0837462C',
    oemCode: '1T0837462 / 1T0837462C',
    name: 'Alzacristallo Elettrico Anteriore Destro Volkswagen Touran (2003-2015)',
    slug: 'alzacristallo-anteriore-destro-volkswagen-touran-1t0837462c',
    brand: 'Magneti Marelli',
    category: 'carrozzeria',
    subCategory: 'cristalli',
    condition: 'Aftermarket Certificato',
    priceNet: 53.28,
    priceGross: 65.00,
    vatRate: 22,
    stock: 7,
    minStock: 2,
    location: 'Scaffale E-04 / A2',
    costPrice: 32.00,
    weightKg: 2.1,
    shippingCost: 8.50,
    featured: false,
    rating: 4.8,
    reviewsCount: 13,
    images: [
      'https://i.ebayimg.com/images/g/zH0AAeSwN8NpicXU/s-l500.jpg'
    ],
    description: 'Meccanismo alzacristalli porta anteriore destra (lato passeggero) con cavi rinforzati in acciaio intrecciato per VW Touran prima e seconda serie (1T1, 1T2, 1T3). Predisposto per montaggio motorino originale.',
    features: [
      'Codice di riferimento: 1T0 837 462 C',
      'Pulegge in teflon autolubrificante con molle di compensazione',
      'Cavi rinforzati antigrippaggio'
    ],
    compatibility: [
      { make: 'Volkswagen', model: 'Touran I / II (1T1, 1T2, 1T3)', yearStart: 2003, yearEnd: 2015, engine: '1.6, 1.9 TDI, 2.0 TDI, 1.4 TSI' }
    ]
  },
  {
    id: 'esp-358342142033',
    sku: 'BM-51169812691',
    oemCode: '51169812691',
    name: 'Aletta Parasole Sinistra Lato Guida Originale Mini Cooper JCW / One D (R56/R55)',
    slug: 'aletta-parasole-sinistra-originale-mini-cooper-51169812691',
    brand: 'Mini Genuine Parts',
    category: 'accessori',
    subCategory: 'interni',
    condition: 'Nuovo Originale',
    priceNet: 57.38,
    priceGross: 70.00,
    vatRate: 22,
    stock: 3,
    minStock: 1,
    location: 'Scaffale F-03 / C1',
    costPrice: 36.00,
    weightKg: 0.65,
    shippingCost: 7.50,
    featured: false,
    rating: 5.0,
    reviewsCount: 7,
    images: [
      'https://i.ebayimg.com/images/g/2EcAAeSwjlJps~CC/s-l500.jpg'
    ],
    description: 'Pantina aletta parasole originale colore grigio chiaro / antracite con specchietto di cortesia e clip di ritegno originale Mini per modelli R55 Clubman, R56 Hatchback, R57 Cabrio.',
    features: [
      'Codice originale: 51 16 9 812 691 / 51169812691',
      'Dotata di contatto microswitch per luce specchietto',
      'Tessuto originale resistente allo scolorimento UV'
    ],
    compatibility: [
      { make: 'Mini', model: 'Cooper / Cooper S / JCW / One (R56)', yearStart: 2006, yearEnd: 2013, engine: '1.4, 1.6, 1.6T, 2.0 Cooper SD' },
      { make: 'Mini', model: 'Clubman (R55)', yearStart: 2007, yearEnd: 2014, engine: 'Tutte le versioni' }
    ]
  },
  {
    id: 'esp-820241857171',
    sku: 'TYT-04428-60130',
    oemCode: '04428-60130',
    name: 'Kit Cuffia Semiasse Giunto Interno Anteriore Originale Toyota Hilux & Land Cruiser',
    slug: 'kit-cuffia-semiasse-originale-toyota-hilux-land-cruiser-04428-60130',
    brand: 'Toyota Genuine Parts',
    category: 'sospensioni',
    subCategory: 'semiassi',
    condition: 'Nuovo Originale',
    priceNet: 40.98,
    priceGross: 50.00,
    vatRate: 22,
    stock: 11,
    minStock: 3,
    location: 'Scaffale D-02 / B4',
    costPrice: 24.00,
    weightKg: 0.7,
    shippingCost: 7.50,
    featured: false,
    rating: 5.0,
    reviewsCount: 15,
    images: [
      'https://i.ebayimg.com/images/g/890AAeSwpP9qz0V-/s-l500.jpg'
    ],
    description: 'Kit soffietto cuffia di protezione giunto omocinetico lato differenziale (interno) originale Toyota con grasso speciale al bisolfuro di molibdeno e fascette metalliche inox Oetiker.',
    features: [
      'Codice OEM: 04428-60130 / 04438-60030',
      'Gomma termoplastica Hytrel resistente a tagli, fango e torsioni fuoristrada',
      'Fascette crimpabili ad alta tenuta incluse'
    ],
    compatibility: [
      { make: 'Toyota', model: 'Hilux VII / VIII', yearStart: 2005, yearEnd: 2023, engine: '2.5 D-4D / 2.8 D-4D / 3.0 D-4D' },
      { make: 'Toyota', model: 'Land Cruiser Prado (KDJ120 / KDJ150)', yearStart: 2002, yearEnd: 2023, engine: '3.0 D-4D / 2.8 D-4D' }
    ]
  }
];

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'express_standard',
    name: 'Corriere Espresso BRT / GLS (24/48h)',
    courier: 'BRT / GLS',
    description: 'Consegna rapida tracciata in tutta Italia con notifica SMS ed email.',
    estimatedDays: '1-2 giorni lavorativi',
    price: 7.90,
    freeAbove: 149.00
  },
  {
    id: 'express_insured',
    name: 'Spedizione Protetta & Assicurata 100%',
    courier: 'DHL Express / BRT Assicurato',
    description: 'Include assicurazione all-risk contro smarrimento o danni durante il trasporto e priorità di evasione.',
    estimatedDays: '24h garantite',
    price: 13.90
  },
  {
    id: 'pickup',
    name: 'Ritiro Gratuito in Magazzino',
    courier: 'Ritiro Diretto',
    description: 'Pronto per il ritiro in 2 ore presso la nostra sede logistica (previo appuntamento telefonico).',
    estimatedDays: 'Disponibile in giornata',
    price: 0.00
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Carta di Credito / Debito (Visa, Mastercard, Amex)',
    description: 'Transazione crittografata con sicurezza 3D Secure v2.',
    extraFee: 0,
    badge: 'Istantaneo & Protetto'
  },
  {
    id: 'paypal',
    name: 'PayPal / Paga in 3 Rate senza interessi',
    description: 'Paga con il tuo conto PayPal o dilaziona l\'importo in 3 rate mensili a tasso zero.',
    extraFee: 0,
    badge: '3 Rate a Tasso 0'
  },
  {
    id: 'bank_transfer',
    name: 'Bonifico Bancario Anticipato',
    description: 'Riceverai le coordinate IBAN via email. La spedizione partirà non appena accreditato il bonifico.',
    extraFee: 0
  },
  {
    id: 'cash_on_delivery',
    name: 'Contrassegno (Pagamento in contanti al corriere)',
    description: 'Paga direttamente al corriere all\'arrivo del pacco. Supplemento gestione contanti.',
    extraFee: 4.90,
    badge: '+€4,90 contrassegno'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ESP-2026-0038',
    createdAt: '2026-10-14T10:15:00Z',
    customer: {
      customerType: 'private',
      firstName: 'Marco',
      lastName: 'Rossi',
      fiscalCode: 'RSSMRC80A01H501Z',
      email: 'marco.rossi@email.it',
      phone: '+39 333 4567890',
      address: 'Via Garibaldi 45',
      city: 'Bologna',
      postalCode: '40121',
      province: 'BO',
      country: 'Italia',
      notes: 'Suonare campanello Rossi'
    },
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 1 }
    ],
    shippingMethod: SHIPPING_METHODS[0],
    paymentMethod: PAYMENT_METHODS[0],
    subtotalNet: 39.34,
    vatAmount: 8.65,
    shippingTotal: 7.90,
    paymentExtraFee: 0,
    totalGross: 55.89,
    status: 'shipped',
    trackingNumber: 'GLS-8493021948IT',
    courierName: 'GLS Express',
    invoiceIssued: true,
    invoiceNumber: 'FATT-2026/0084'
  },
  {
    id: 'ord-1002',
    orderNumber: 'ESP-2026-0039',
    createdAt: '2026-10-14T16:40:00Z',
    customer: {
      customerType: 'business',
      firstName: 'Andrea',
      lastName: 'Ferrari',
      companyName: 'Autofficina Ferrari S.n.c.',
      vatNumber: '02849180362',
      fiscalCode: '02849180362',
      sdiCode: 'M5UXCR1',
      pec: 'officinaferrari@pec.it',
      email: 'officina.ferrari@gmail.com',
      phone: '+39 059 876543',
      address: 'Via Emilia Est 220',
      city: 'Modena',
      postalCode: '41122',
      province: 'MO',
      country: 'Italia',
      notes: 'Orario officina 8:30 - 18:30'
    },
    items: [
      { product: INITIAL_PRODUCTS[1], quantity: 1 },
      { product: INITIAL_PRODUCTS[5], quantity: 2 }
    ],
    shippingMethod: SHIPPING_METHODS[0],
    paymentMethod: PAYMENT_METHODS[1],
    subtotalNet: 177.04,
    vatAmount: 38.96,
    shippingTotal: 0.00, // Gratuita sopra 149
    paymentExtraFee: 0,
    totalGross: 216.00,
    status: 'processing',
    invoiceIssued: true,
    invoiceNumber: 'FATT-2026/0085'
  },
  {
    id: 'ord-1003',
    orderNumber: 'ESP-2026-0040',
    createdAt: '2026-10-15T11:20:00Z',
    customer: {
      customerType: 'private',
      firstName: 'Giuseppe',
      lastName: 'Bianchi',
      fiscalCode: 'BNCGPP75M10F205W',
      email: 'g.bianchi@hotmail.com',
      phone: '+39 347 9876543',
      address: 'Corso Vittorio Emanuele 12',
      city: 'Milano',
      postalCode: '20121',
      province: 'MI',
      country: 'Italia'
    },
    items: [
      { product: INITIAL_PRODUCTS[2], quantity: 1 }
    ],
    shippingMethod: SHIPPING_METHODS[1],
    paymentMethod: PAYMENT_METHODS[3], // Contrassegno
    subtotalNet: 188.52,
    vatAmount: 41.48,
    shippingTotal: 13.90,
    paymentExtraFee: 4.90,
    totalGross: 248.80,
    status: 'pending_payment',
    invoiceIssued: false
  }
];

export const VEHICLE_MAKES = [
  'Volkswagen',
  'Toyota',
  'Fiat',
  'Ford',
  'BMW',
  'Opel',
  'Mini',
  'Renault',
  'Audi',
  'Mercedes-Benz',
  'Alfa Romeo',
  'Seat'
];
