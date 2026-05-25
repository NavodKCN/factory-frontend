// ============================================================
// FACTORY APP — Mock Data Layer
// Mirrors real Mosaico data structure from screenshots & PDFs
// ============================================================

// ----------------------------
// SUPPLIERS
// ----------------------------
export const suppliers = [
  { id: 1, code: 'TRE_VALLI',    name: 'TRE VALLI',     email: 'ordini@bullgroup.it,ordinipv@bullgroup.it', address: 'Via Piandelmedico, 74 - 60035 Jesi' },
  { id: 2, code: 'SEDE',         name: 'SEDE',           email: 'sede@amodo.it',   address: '' },
  { id: 3, code: 'DAC',          name: 'DAC',            email: 'dac@example.it',  address: '' },
  { id: 4, code: 'PARTESA',      name: 'PARTESA',        email: '',                address: '' },
  { id: 5, code: 'SEDE_PLATANI', name: 'SEDE PLATANI',   email: '',                address: '' },
  { id: 6, code: 'CHIMICART',    name: 'CHIMICART',      email: '',                address: '' },
];

// ----------------------------
// ARTICLES / PRODUCTS
// ----------------------------
export const articles = [
  // SUPERFRESCHI
  { id: 'QFL-0040A', code: 'QFL-0040A', name: 'FORMAGGIO SPALMABILE 1KG',       category: 'SUPERFRESCHI', pack: 1,   um: 'KG',  umxct: '1 KG',   costUnit: 6.961 },
  { id: 'Q-0006',    code: 'Q-0006',    name: 'LATTE FRESCO AQ BOTT LT',         category: 'SUPERFRESCHI', pack: 1,   um: 'LT',  umxct: '1 LT',   costUnit: 1.074 },
  { id: 'Q-0008',    code: 'Q-0008',    name: 'PANNA FRESCA LT',                 category: 'SUPERFRESCHI', pack: 1,   um: 'LT',  umxct: '1 LT',   costUnit: 4.744 },
  { id: 'QFL-0672',  code: 'QFL-0672',  name: 'LATTE SENZA LATTOSIO',            category: 'SUPERFRESCHI', pack: 1,   um: 'LT',  umxct: '1 LT',   costUnit: 1.036 },
  { id: 'Q-0280',    code: 'Q-0280',    name: 'MASCARPONE 500GR',                category: 'SUPERFRESCHI', pack: 0.5, um: 'KG',  umxct: '0.5 KG', costUnit: 5.9   },
  { id: 'Q1011X',    code: 'Q1011X',    name: 'EDAMER 1KG',                      category: 'SUPERFRESCHI', pack: 1,   um: 'KG',  umxct: '1 KG',   costUnit: 6.19  },
  { id: 'Q1013X',    code: 'Q1013X',    name: 'MORTADELLA 1KG',                  category: 'SUPERFRESCHI', pack: 1,   um: 'KG',  umxct: '1 KG',   costUnit: 4.5   },

  // CAFFE
  { id: 'Q-0001',    code: 'Q-0001',    name: 'CAFFE',                           category: 'CAFFE',        pack: 6,   um: 'KG',  umxct: '6 KG',   costUnit: 20    },
  { id: 'Q-0598',    code: 'Q-0598',    name: 'CAFFE DECAFFEINATO 50PZ',         category: 'CAFFE',        pack: 50,  um: 'PZ',  umxct: '50 PZ',  costUnit: 0.161 },
  { id: 'Q1216',     code: 'Q1216',     name: 'CAFFE DECAFFEINATO 80PZ',         category: 'CAFFE',        pack: 80,  um: 'PZ',  umxct: '80 PZ',  costUnit: 0.283 },
  { id: 'SM-0322',   code: 'SM-0322',   name: 'BASE CREMA CAFFE FREDDA',         category: 'CAFFE',        pack: 1,   um: 'KG',  umxct: '1 KG',   costUnit: 7.33  },
  { id: 'Q1122',     code: 'Q1122',     name: 'CREMA CAFFE FREDDA 10KG',         category: 'CAFFE',        pack: 10,  um: 'KG',  umxct: '10 KG',  costUnit: 19.36 },
  { id: 'Q1210',     code: 'Q1210',     name: 'CREMA CAFFE FREDDA 1KG',          category: 'CAFFE',        pack: 1,   um: 'KG',  umxct: '1 KG',   costUnit: 17.75 },
  { id: 'Q-0133',    code: 'Q-0133',    name: 'ZUCCHERO BIANCO 2850PZ',          category: 'CAFFE',        pack: 2850,um: 'PZ',  umxct: '2850 PZ',costUnit: 0.009 },
  { id: 'Q-0134',    code: 'Q-0134',    name: 'ZUCCHERO DI CANNA 2850PZ',        category: 'CAFFE',        pack: 2850,um: 'PZ',  umxct: '2850 PZ',costUnit: 0.011 },
  { id: 'Q1118',     code: 'Q1118',     name: 'BEVANDA DI AVENA 6PZ X 1LT',      category: 'CAFFE',        pack: 6,   um: 'PZ',  umxct: '6 PZ',   costUnit: 8.340 },
  { id: 'Q1117A',    code: 'Q1117A',    name: 'BEVANDA DI SOIA 6PZ X 1LT',       category: 'CAFFE',        pack: 6,   um: 'PZ',  umxct: '6 PZ',   costUnit: 6.900 },

  // BEVANDE
  { id: 'Q-0035',    code: 'Q-0035',    name: 'ACQUA FRIZZANTE 0,5L PET',        category: 'BEVANDE',      pack: 24,  um: 'PZ',  umxct: '24 PZ',  costUnit: 0.159 },
  { id: 'QFL-0263',  code: 'QFL-0263',  name: 'ACQUA FRIZZANTE PLASTICA 1,5LT',  category: 'BEVANDE',      pack: 6,   um: 'PZ',  umxct: '6 PZ',   costUnit: 0.397 },
  { id: 'QFL-0250',  code: 'QFL-0250',  name: 'ACQUA FRIZZANTE VETRO 50cl',      category: 'BEVANDE',      pack: 20,  um: 'PZ',  umxct: '20 PZ',  costUnit: 0.258 },
  { id: 'Q-0034',    code: 'Q-0034',    name: 'ACQUA NATURALE 0,5L PET',         category: 'BEVANDE',      pack: 24,  um: 'PZ',  umxct: '24 PZ',  costUnit: 0.159 },
  { id: 'QFL-0262',  code: 'QFL-0262',  name: 'ACQUA NATURALE PLASTICA 1,5 LT',  category: 'BEVANDE',      pack: 6,   um: 'PZ',  umxct: '6 PZ',   costUnit: 0.397 },
  { id: 'QFL-0249',  code: 'QFL-0249',  name: 'ACQUA NATURALE VETRO 50cl',       category: 'BEVANDE',      pack: 20,  um: 'PZ',  umxct: '20 PZ',  costUnit: 0.261 },
  { id: 'QFL-0778',  code: 'QFL-0778',  name: 'COCA COLA 33CL BOTTIGLIA',        category: 'BEVANDE',      pack: 24,  um: 'PZ',  umxct: '24 PZ',  costUnit: 0.776 },
  { id: 'Q-0047',    code: 'Q-0047',    name: 'RED BULL 25CL LATTINA',           category: 'BEVANDE',      pack: 24,  um: 'PZ',  umxct: '24 PZ',  costUnit: 1.164 },

  // PULIZIE
  { id: 'DET0008',   code: 'DET0008',   name: 'ALCOOL 1LT',                      category: 'PULIZIE',      pack: 15,  um: 'PZ',  umxct: '15 PZ',  costUnit: 47.02 },
  { id: 'PK0074',    code: 'PK0074',    name: 'ALZAIMMONDIZIA CON MANICO',        category: 'PULIZIE',      pack: 1,   um: 'PZ',  umxct: '1 PZ',   costUnit: 4.96  },
  { id: 'DET001',    code: 'DET001',    name: 'BOBINA JOY 800 STRATI 2PZ',        category: 'PULIZIE',      pack: 2,   um: 'PZ',  umxct: '2 PZ',   costUnit: 16.57 },
  { id: 'DET0006',   code: 'DET0006',   name: 'CANDEGGINA 3 X 5 LT',             category: 'PULIZIE',      pack: 3,   um: 'PZ',  umxct: '3 PZ',   costUnit: 8.71  },
  { id: 'DET0015',   code: 'DET0015',   name: 'CHIMIBRILL VETRI 6 X 750ML',       category: 'PULIZIE',      pack: 6,   um: 'PZ',  umxct: '6 PZ',   costUnit: 16.17 },

  // PACKAGING
  { id: 'PK-0078',   code: 'PK-0078',   name: 'BICCHIERE CAFFE ASPORTO 3OZ 50 PZ',category: 'PACKAGING',   pack: 50,  um: 'PZ',  umxct: '50 PZ',  costUnit: 2.42  },
  { id: 'PK-0129',   code: 'PK-0129',   name: 'BICCHIERE CAPPUCCINO 9OZ 50PZ',   category: 'PACKAGING',    pack: 50,  um: 'PZ',  umxct: '50 PZ',  costUnit: 3.39  },
  { id: 'PK-0197',   code: 'PK-0197',   name: 'BICCHIERE POLIPROP 355CC 30PZ',   category: 'PACKAGING',    pack: 30,  um: 'PZ',  umxct: '30 PZ',  costUnit: 2.40  },
  { id: 'PK-0199',   code: 'PK-0199',   name: 'BICCHIERE POLIPROP 500CC 40PZ',   category: 'PACKAGING',    pack: 40,  um: 'PZ',  umxct: '40 PZ',  costUnit: 3.21  },
  { id: 'PK0004',    code: 'PK0004',    name: 'CARTA FORNO 40X60 PZ.500',        category: 'PACKAGING',    pack: 500, um: 'PZ',  umxct: '500 PZ', costUnit: 40.24 },
  { id: 'PK0039',    code: 'PK0039',    name: 'CANNUCCE PLA NERE DRITTE 15CM 250PZ',category:'PACKAGING',  pack: 250, um: 'PZ',  umxct: '250 PZ', costUnit: 4.36  },
  { id: 'PK0024',    code: 'PK0024',    name: 'CANNUCCE PLA NERE DRITTE 21CM 150PZ',category:'PACKAGING',  pack: 150, um: 'PZ',  umxct: '150 PZ', costUnit: 2.93  },

  // DA FORNO
  { id: 'Q-0145',    code: 'Q-0145',    name: 'BOMBOLONE',                       category: 'DA FORNO',     pack: 48,  um: 'PZ',  umxct: '48 PZ',  costUnit: 0.349 },
  { id: 'Q1123',     code: 'Q1123',     name: 'CROISSANT BURRO 70G',             category: 'DA FORNO',     pack: 60,  um: 'PZ',  umxct: '60 PZ',  costUnit: 0.35  },
  { id: 'Q1177',     code: 'Q1177',     name: 'CROISSANT MULTICEREALI 80G',      category: 'DA FORNO',     pack: 54,  um: 'PZ',  umxct: '54 PZ',  costUnit: 0.414 },

  // VARIE
  { id: 'SM-0225',   code: 'SM-0225',   name: '1 DOSE ZUCCHERO',                 category: 'VARIE',        pack: 1,   um: 'PZ',  umxct: '1 PZ',   costUnit: 0.05  },
  { id: 'QF-002',    code: 'QF-002',    name: 'ACQUA',                           category: 'FITTIZIE',     pack: 1,   um: 'LT',  umxct: '1 LT',   costUnit: 0     },
  { id: 'V00035D',   code: 'V00035D',   name: 'ABBRACCIO CHAI',                  category: 'CAFFE',        pack: 1,   um: 'PZ',  umxct: '1 PZ',   costUnit: 0     },
  { id: 'V00035A',   code: 'V00035A',   name: 'ABBRACCIO LAVANDA',               category: 'CAFFE',        pack: 1,   um: 'PZ',  umxct: '1 PZ',   costUnit: 0     },
  { id: 'V00035B',   code: 'V00035B',   name: 'ABBRACCIO MACHA',                 category: 'CAFFE',        pack: 1,   um: 'PZ',  umxct: '1 PZ',   costUnit: 0     },
];

// ----------------------------
// ORDERS
// ----------------------------
export const orders = [
  {
    id: 2509,
    supplierId: 6,
    supplierName: 'CHIMICART',
    status: 'EVASO',
    requestedDelivery: '2026-05-04',
    createdAt: '2026-05-04T08:09:00',
    value: 616.82,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: null, ref: null, value: null },
    items: [],
  },
  {
    id: 2508,
    supplierId: 1,
    supplierName: 'TRE VALLI',
    status: 'EVASO',
    requestedDelivery: '2026-05-05',
    createdAt: '2026-05-04T17:23:00',
    value: 68.00,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: null, ref: null, value: null },
    items: [
      { articleId: 'QFL-0040A', code: 'QFL-0040A', name: 'FORMAGGIO SPALMABILE 1KG', pack: 1, um: 'KG', costUnit: 6.96,  qty: 1,  received: 1,  accepted: 1  },
      { articleId: 'Q-0006',    code: 'Q-0006',    name: 'LATTE FRESCO AQ BOTT LT',  pack: 1, um: 'LT', costUnit: 1.074, qty: 48, received: 48, accepted: 48 },
      { articleId: 'Q-0008',    code: 'Q-0008',    name: 'PANNA FRESCA LT',          pack: 1, um: 'LT', costUnit: 4.744, qty: 2,  received: 2,  accepted: 2  },
    ],
  },
  {
    id: 2507,
    supplierId: 2,
    supplierName: 'SEDE',
    status: 'EVASO',
    requestedDelivery: '2026-05-05',
    createdAt: '2026-05-04T08:09:00',
    value: 616.82,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: null, ref: null, value: null },
    items: [],
  },
  {
    id: 2506,
    supplierId: 1,
    supplierName: 'TRE VALLI',
    status: 'EVASO',
    requestedDelivery: '2026-04-30',
    createdAt: '2026-04-29T13:56:00',
    value: 147.10,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: null, ref: null, value: null },
    items: [],
  },
  {
    id: 2505,
    supplierId: 3,
    supplierName: 'DAC',
    status: 'EVASO',
    requestedDelivery: '2026-04-23',
    createdAt: '2026-04-23T12:40:00',
    value: 140.75,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: '2026-04-17', ref: '36pl', value: 140.75 },
    items: [],
  },
  {
    id: 2504,
    supplierId: 4,
    supplierName: 'PARTESA',
    status: 'EVASO',
    requestedDelivery: '2026-04-23',
    createdAt: '2026-04-23T12:37:00',
    value: 247.36,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: '2026-04-17', ref: '36pl', value: 247.36 },
    items: [],
  },
  {
    id: 2503,
    supplierId: 5,
    supplierName: 'SEDE PLATANI',
    status: 'EVASO',
    requestedDelivery: '2026-04-23',
    createdAt: '2026-04-23T12:35:00',
    value: 454.79,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: '2026-04-17', ref: '36pl', value: 454.79 },
    items: [],
  },
  {
    id: 2502,
    supplierId: 1,
    supplierName: 'TRE VALLI',
    status: 'EVASO',
    requestedDelivery: '2026-04-24',
    createdAt: '2026-04-23T10:44:00',
    value: 94.01,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: null, ref: null, value: null },
    items: [],
  },
  {
    id: 2501,
    supplierId: 5,
    supplierName: 'SEDE PLATANI',
    status: 'EVASO',
    requestedDelivery: '2026-04-24',
    createdAt: '2026-04-23T10:39:00',
    value: 626.03,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: null, ref: null, value: null },
    items: [],
  },
  {
    id: 2500,
    supplierId: 2,
    supplierName: 'SEDE',
    status: 'EVASO',
    requestedDelivery: '2026-04-27',
    createdAt: '2026-04-23T10:36:00',
    value: 1107.06,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: null, ref: null, value: null },
    items: [],
  },
  {
    id: 2499,
    supplierId: 1,
    supplierName: 'TRE VALLI',
    status: 'EVASO',
    requestedDelivery: '2026-04-22',
    createdAt: '2026-04-22T10:51:00',
    value: 59.86,
    warehouse: 'MAGAZZINO CENTRALE',
    ddt: { date: '2026-04-18', ref: '1282-1312', value: 59.86 },
    items: [],
  },
];

// ----------------------------
// INVENTORIES
// ----------------------------
export const inventories = [
  {
    id: 152,
    date: '2026-02-02',
    createdAt: '2026-04-02T12:37:00',
    warehouse: 'MAGAZZINO CENTRALE',
    status: 'open',
    totalValue: 8472.71,
  },
  {
    id: 151,
    date: '2026-01-04',
    createdAt: '2026-08-01T13:51:00',
    warehouse: 'MAGAZZINO CENTRALE',
    status: 'closed',
    totalValue: 0,
  },
  {
    id: 150,
    date: '2025-12-01',
    createdAt: '2025-04-12T15:25:00',
    warehouse: 'MAGAZZINO CENTRALE',
    status: 'closed',
    totalValue: 0,
  },
  {
    id: 149,
    date: '2025-11-04',
    createdAt: '2025-06-11T13:38:00',
    warehouse: 'MAGAZZINO CENTRALE',
    status: 'closed',
    totalValue: 0,
  },
  {
    id: 148,
    date: '2025-09-28',
    createdAt: '2025-10-29T12:38:00',
    warehouse: 'MAGAZZINO CENTRALE',
    status: 'closed',
    totalValue: 0,
  },
  {
    id: 147,
    date: '2025-07-30',
    createdAt: '2025-07-31T11:36:00',
    warehouse: 'MAGAZZINO CENTRALE',
    status: 'closed',
    totalValue: 0,
  },
  {
    id: 146,
    date: '2025-06-30',
    createdAt: '2025-07-10T09:57:00',
    warehouse: 'MAGAZZINO CENTRALE',
    status: 'closed',
    totalValue: 0,
  },
  {
    id: 145,
    date: '2025-06-02',
    createdAt: '2025-06-03T13:06:00',
    warehouse: 'MAGAZZINO CENTRALE',
    status: 'closed',
    totalValue: 0,
  },
];

// Inventory items for #152
export const inventoryItems152 = [
  // CAFFE
  { articleId: 'A-0093', code: 'A-0093', name: 'BICCHIERE CAFFE SPECIALE',   category: 'CAFFE', umxct: '48 PZ', ct: null,  sfuso: null  },
  { articleId: 'A-0035', code: 'A-0035', name: 'CUCCHIAINO CAFFE',           category: 'CAFFE', umxct: '12 PZ', ct: null,  sfuso: null  },
  { articleId: 'AT-012', code: 'AT-012', name: 'MACCHINA CAFFE 3 GRUPPI AUTO',category:'CAFFE', umxct: '1 PZ',  ct: null,  sfuso: null  },
  { articleId: 'AT-014', code: 'AT-014', name: 'MACINADOSATORE CAFFE',       category: 'CAFFE', umxct: '1 PZ',  ct: null,  sfuso: null  },
  { articleId: 'SM-0322',code: 'SM-0322',name: 'BASE CREMA CAFFE FREDDA',    category: 'CAFFE', umxct: '1 KG',  ct: 3,     sfuso: 0.5   },
  { articleId: 'Q-0001', code: 'Q-0001', name: 'CAFFE',                      category: 'CAFFE', umxct: '6 KG',  ct: 5,     sfuso: 1.5   },
  { articleId: 'Q-0598', code: 'Q-0598', name: 'CAFFE DECAFFEINATO 50PZ',    category: 'CAFFE', umxct: '50 PZ', ct: 2,     sfuso: 0     },
  { articleId: 'Q1216',  code: 'Q1216',  name: 'CAFFE DECAFFEINATO 80PZ',    category: 'CAFFE', umxct: '80 PZ', ct: 0,     sfuso: 63    },
  { articleId: 'Q1122',  code: 'Q1122',  name: 'CREMA CAFFE FREDDA 10KG',    category: 'CAFFE', umxct: '10 KG', ct: 0,     sfuso: 1     },
  { articleId: 'Q1210',  code: 'Q1210',  name: 'CREMA CAFFE FREDDA 1KG',     category: 'CAFFE', umxct: '1 KG',  ct: 1,     sfuso: 0     },
  { articleId: 'PK-0078',code: 'PK-0078',name: 'BICCHIERE CAFFE ASPORTO 3OZ 50 PZ',category:'CAFFE',umxct:'50 PZ',ct:3,  sfuso: 0     },
  { articleId: 'PK0027A',code: 'PK0027A',name: 'COPERCHIO BICCH 3OZ CAFFE 100PZ',category:'CAFFE',umxct:'100 PZ',ct:1,  sfuso: 50    },
];

// ----------------------------
// WASTE (SCARTI) — Calendar
// ----------------------------
export const wasteCalendar = [
  // April 2026 — green = data entered, empty = not entered
  { date: '2026-04-01', dayName: 'mercoledì', invenduto: true,  produzione: true  },
  { date: '2026-04-02', dayName: 'giovedì',   invenduto: true,  produzione: true  },
  { date: '2026-04-03', dayName: 'venerdì',   invenduto: true,  produzione: true  },
  { date: '2026-04-04', dayName: 'sabato',    invenduto: true,  produzione: true  },
  { date: '2026-04-05', dayName: 'domenica',  invenduto: true,  produzione: true  },
  { date: '2026-04-06', dayName: 'lunedì',    invenduto: true,  produzione: true  },
  { date: '2026-04-07', dayName: 'martedì',   invenduto: true,  produzione: true  },
  { date: '2026-04-08', dayName: 'mercoledì', invenduto: true,  produzione: true  },
  { date: '2026-04-09', dayName: 'giovedì',   invenduto: true,  produzione: true  },
  { date: '2026-04-10', dayName: 'venerdì',   invenduto: true,  produzione: true  },
  { date: '2026-04-11', dayName: 'sabato',    invenduto: true,  produzione: true  },
  { date: '2026-04-12', dayName: 'domenica',  invenduto: true,  produzione: true  },
  { date: '2026-04-13', dayName: 'lunedì',    invenduto: true,  produzione: true  },
  { date: '2026-04-14', dayName: 'martedì',   invenduto: true,  produzione: true  },
  { date: '2026-04-15', dayName: 'mercoledì', invenduto: true,  produzione: false },
  { date: '2026-04-16', dayName: 'giovedì',   invenduto: true,  produzione: true  },
  { date: '2026-04-17', dayName: 'venerdì',   invenduto: true,  produzione: true  },
  { date: '2026-04-18', dayName: 'sabato',    invenduto: true,  produzione: true  },
  { date: '2026-04-19', dayName: 'domenica',  invenduto: true,  produzione: true  },
  { date: '2026-04-20', dayName: 'lunedì',    invenduto: true,  produzione: true  },
  { date: '2026-04-21', dayName: 'martedì',   invenduto: true,  produzione: true  },
  { date: '2026-04-22', dayName: 'mercoledì', invenduto: true,  produzione: true  },
  { date: '2026-04-23', dayName: 'giovedì',   invenduto: true,  produzione: true  },
  { date: '2026-04-24', dayName: 'venerdì',   invenduto: true,  produzione: true  },
  { date: '2026-04-25', dayName: 'sabato',    invenduto: false, produzione: true  },
  { date: '2026-04-26', dayName: 'domenica',  invenduto: true,  produzione: false },
  { date: '2026-04-27', dayName: 'lunedì',    invenduto: false, produzione: false },
  { date: '2026-04-28', dayName: 'martedì',   invenduto: false, produzione: false },
  { date: '2026-04-29', dayName: 'mercoledì', invenduto: false, produzione: false },
  { date: '2026-04-30', dayName: 'giovedì',   invenduto: false, produzione: false },
];

// Waste entries (scarto items)
export const wasteEntries = {
  '2026-04-28': {
    invenduto: [],
    produzione: [],
  }
};

// ----------------------------
// META
// ----------------------------
export const appMeta = {
  pdv: 'CESENATICO',
  user: 'AMMINISTRATORE',
  warehouse: 'MAGAZZINO CENTRALE',
  company: 'AMODO CESENATICO',
  address: 'VIALE CARDUCCI 6 ANGOLO VIA DEL FORTINO',
  city: '47042 - CESENATICO',
  phone: '0547 1825172',
};

// ----------------------------
// CATEGORIES
// ----------------------------
export const categories = [
  '-- TUTTI --',
  'BEVANDE',
  'CAFFE',
  'CIOCCOLATO',
  'CUCINA',
  'DA FORNO',
  'FITTIZIE',
  'GELATO',
  'GUARNIZIONI',
  'ORTOFRUTTA',
  'PACKAGING',
  'PULIZIE',
  'SUPERFRESCHI',
  'TE',
  'TORTE',
  'VARIE',
];

// ----------------------------
// HELPERS
// ----------------------------
export const formatCurrency = (value) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const getDayName = (dateStr) => {
  const days = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  return days[new Date(dateStr).getDay()];
};
