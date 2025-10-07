sap.ui.define([], function () {
  "use strict";

  return {
    getInvoicesData: function () {
      return {
        Invoices: [
          {
            // ====== TESTATA (GENITORE) ======
            docNumber: "0003829203",
            fiscalYear: "2024",
            status: "R",
            statusText: "Da registrare",
            company: "S100",
            companyName: "DEMO S.p.A.",
            supplier: "11000118",
            supplierName: "Alfasigma S.p.A.",
            hasWarning: true,
            warningText: "Controllo in sospeso",
            docType: "ZP01 TD01 Fattura",
            uomXml: "Conf.",
            reference: "0003829203",
            currency: "EUR",
            date: "2024-12-06",
            reason: "Destinatario Merci: HUMANITAS MIRASOLE SPA",
            unitPrice: "",
            totalPrice: "16.523,13",
            multiSuppliers: [
              {
                supplier: "11000118",
                supplierName: "Alfasigma S.p.A.",
                srConta: "ZF01",
                codicePaese: "IT",
                partIva: "02082370442",
                partitaIva1: "IT02082370442",
                paese: "IT",
                gruppoCm: "77",
                fiscEst: ""
              },
              {
                supplier: "11000999",
                supplierName: "Recordati Industria Chimica",
                srConta: "ZF01",
                codicePaese: "IT",
                partIva: "02082370942",
                partitaIva1: "IT02082370942",
                paese: "IT",
                gruppoCm: "77",
                fiscEst: ""
              }
            ],
            items: [
              {
                docNumber: "0003829203",
                line: "10",
                articleGroup: "AICFARMACO",
                materialCode: "019653115",
                materialDesc: 'Cod. AIC "019653115" BENTALAN 1,5MG/2ML Conf.',
                quantity: "10,000",
                unitPrice: "1,86",
                totalPrice: "18,60",
                vatCode: "10"
              },
              {
                docNumber: "0003829203",
                line: "20",
                articleGroup: "AICFARMACO",
                materialCode: "027350273",
                materialDesc: 'Cod. AIC "027350273" LAVORFLEX 25 MG PO Conf.',
                quantity: "20,000",
                unitPrice: "2,66",
                totalPrice: "53,20",
                vatCode: "10"
              }
            ]
          },

          // ====== 2 ======
          {
            docNumber: "0003829204",
            fiscalYear: "2024",
            status: "Y",
            statusText: "In lavorazione",
            company: "S200",
            companyName: "BETA Pharma S.r.l.",
            supplier: "12000245",
            supplierName: "Angelini S.p.A.",
            hasWarning: false,
            warningText: "",
            docType: "ZP02 TD01 Fattura",
            uomXml: "Pz",
            reference: "0003829204",
            currency: "EUR",
            date: "2024-12-07",
            reason: "Destinatario Merci: OSPEDALE SAN RAFFAELE",
            totalPrice: "8.920,45",

            items: [
              {
                docNumber: "0003829204",
                line: "10",
                articleGroup: "FARMACO",
                materialCode: "045221009",
                materialDesc: 'Cod. AIC "045221009" Tachipirina 500mg 20 cpr',
                quantity: "50,000",
                unitPrice: "1,10",
                totalPrice: "55,00",
                vatCode: "22"
              },
              {
                docNumber: "0003829204",
                line: "20",
                articleGroup: "FARMACO",
                materialCode: "071145998",
                materialDesc: 'Cod. AIC "071145998" Moment 400mg 24 cpr',
                quantity: "30,000",
                unitPrice: "1,20",
                totalPrice: "36,00",
                vatCode: "22"
              }
            ]
          },

          // ====== 3 ======
          {
            docNumber: "0003829205",
            fiscalYear: "2025",
            status: "G",
            statusText: "Registrata",
            company: "S300",
            companyName: "OMEGA Distribuzioni S.p.A.",
            supplier: "13000178",
            supplierName: "Recordati Industria Chimica",
            hasWarning: false,
            warningText: "",
            docType: "ZP03 TD01 Fattura",
            uomXml: "Conf.",
            reference: "0003829205",
            currency: "EUR",
            date: "2025-01-10",
            reason: "Destinatario Merci: CLINICA HUMANITAS",
            totalPrice: "12.430,00",

            items: [
              {
                docNumber: "0003829205",
                line: "10",
                articleGroup: "AICFARMACO",
                materialCode: "078945612",
                materialDesc: 'Cod. AIC "078945612" Ibuprofene 600mg 30 cpr',
                quantity: "200,000",
                unitPrice: "0,85",
                totalPrice: "170,00",
                vatCode: "22"
              },
              {
                docNumber: "0003829205",
                line: "20",
                articleGroup: "AICFARMACO",
                materialCode: "091158234",
                materialDesc: 'Cod. AIC "091158234" Voltadvance 25mg 10 bustine',
                quantity: "100,000",
                unitPrice: "2,00",
                totalPrice: "200,00",
                vatCode: "22"
              }
            ]
          },

          // ====== 4 ======
          {
            docNumber: "0003829206",
            fiscalYear: "2025",
            status: "R",
            statusText: "Da registrare",
            company: "S400",
            companyName: "GAMMA Farmaceutica",
            supplier: "14000890",
            supplierName: "Pfizer Italia",
            hasWarning: true,
            warningText: "Dati incompleti per l’invio SDI",
            docType: "ZP04 TD01 Fattura",
            uomXml: "Pz",
            reference: "0003829206",
            currency: "EUR",
            date: "2025-01-15",
            reason: "Destinatario Merci: FARMACIA CENTRALE",
            totalPrice: "21.784,65",
            multiSuppliers: [
              {
                supplier: "11000118",
                supplierName: "Alfasigma S.p.A.",
                srConta: "ZF01",
                codicePaese: "IT",
                partIva: "02082370442",
                partitaIva1: "IT02082370442",
                paese: "IT",
                gruppoCm: "77",
                fiscEst: ""
              },
              {
                supplier: "11000999",
                supplierName: "Recordati Industria Chimica",
                srConta: "ZF01",
                codicePaese: "IT",
                partIva: "02082370942",
                partitaIva1: "IT02082370942",
                paese: "IT",
                gruppoCm: "77",
                fiscEst: ""
              }
            ],

            items: [
              {
                docNumber: "0003829206",
                line: "10",
                articleGroup: "AICMED",
                materialCode: "054878231",
                materialDesc: 'Cod. AIC "054878231" Xanax 0,25mg 30 cpr',
                quantity: "40,000",
                unitPrice: "2,30",
                totalPrice: "92,00",
                vatCode: "10"
              },
              {
                docNumber: "0003829206",
                line: "20",
                articleGroup: "AICMED",
                materialCode: "060045901",
                materialDesc: 'Cod. AIC "060045901" Enantyum 25mg 10 cpr',
                quantity: "25,000",
                unitPrice: "3,10",
                totalPrice: "77,50",
                vatCode: "10"
              }
            ]
          },

          // ====== 5 ======
          {
            docNumber: "0003829207",
            fiscalYear: "2025",
            status: "Y",
            statusText: "In attesa di conferma contabile",
            company: "S500",
            companyName: "DELTA Medical S.r.l.",
            supplier: "15000234",
            supplierName: "Menarini Group",
            hasWarning: false,
            warningText: "",
            docType: "ZP05 TD01 Fattura",
            uomXml: "Conf.",
            reference: "0003829207",
            currency: "EUR",
            date: "2025-01-20",
            reason: "Destinatario Merci: OSPEDALE NIGUARDA",
            totalPrice: "7.945,50",

            items: [
              {
                docNumber: "0003829207",
                line: "10",
                articleGroup: "FARMACO",
                materialCode: "065008731",
                materialDesc: 'Cod. AIC "065008731" Tachidol 500mg 20 cpr',
                quantity: "40,000",
                unitPrice: "1,50",
                totalPrice: "60,00",
                vatCode: "22"
              },
              {
                docNumber: "0003829207",
                line: "20",
                articleGroup: "FARMACO",
                materialCode: "069999412",
                materialDesc: 'Cod. AIC "069999412" Plasil 10mg 20 cpr',
                quantity: "30,000",
                unitPrice: "2,00",
                totalPrice: "60,00",
                vatCode: "22"
              }
            ]
          }
        ]
      };
    }
  };
});
