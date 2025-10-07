sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/mockData",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, JSONModel, mockData, Fragment, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("fatturazione.elettronica.passiva.controller.Home", {

        onInit() {
            this.oFilterBar = this.byId("filterBar");

            // Setup dei filtri
            this._filters = {
                societa: new sap.ui.mdc.FilterField({ propertyKey: "societa", label: "Società", conditions: "{$filters>/societa}" }),
                numeroFattura: new sap.ui.mdc.FilterField({ propertyKey: "numeroFattura", label: "Fornitore", conditions: "{$filters>/numeroFattura}" }),
                paese: new sap.ui.mdc.FilterField({ propertyKey: "paese", label: "Partita IVA", conditions: "{$filters>/paese}" }),
                cliente: new sap.ui.mdc.FilterField({ propertyKey: "cliente", label: "Partita IVA 1", conditions: "{$filters>/cliente}" }),
                orgComm: new sap.ui.mdc.FilterField({ propertyKey: "orgComm", label: "Tipo doc. AdE", conditions: "{$filters>/orgComm}" }),
                dataDoc: new sap.ui.mdc.FilterField({ propertyKey: "dataDoc", label: "Nr. documento nel file XML ", conditions: "{$filters>/dataDoc}" }),
                tipoFattura: new sap.ui.mdc.FilterField({ propertyKey: "tipoFattura", label: "Data documento", conditions: "{$filters>/tipoFattura}" }),
                codDestinatario: new sap.ui.mdc.FilterField({ propertyKey: "codDestinatario", label: "Codice destinatario", conditions: "{$filters>/codDestinatario}" }),
                nrInvioSdi: new sap.ui.mdc.FilterField({ propertyKey: "nrInvioSdi", label: "Nr. invio SDI", conditions: "{$filters>/nrInvioSdi}" }),
                dataRicezione: new sap.ui.mdc.FilterField({ propertyKey: "dataRicezione", label: "Data ricezione", conditions: "{$filters>/dataRicezione}" }),
            };

            Object.values(this._filters).forEach(f => this.oFilterBar.addFilterItem(f));

            const oData = mockData.getInvoicesData();

            this._calculateTotals(oData);

            oData.SelectedInvoice = null; // aggiungiamo il campo di selezione

            const oModel = new JSONModel(oData);
            oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
            oModel.setSizeLimit(1000);

            this.getView().setModel(oModel);
            this._bindTreeTable();


            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.getRoute("RouteHome").attachPatternMatched(this._onBeforeShow, this);
        },

        _calculateTotals(oData) {
            if (!oData?.Invoices) return;

            oData.Invoices.forEach(inv => {
                let docTotal = 0;

                if (inv.items?.length) {
                    inv.items.forEach(item => {
                        const qty = parseFloat((item.quantity || "0").replace(",", "."));
                        const price = parseFloat((item.unitPrice || "0").replace(",", "."));

                        const total = qty * price;
                        item.totalPrice = total.toFixed(2).replace(".", ",");
                        docTotal += total;
                    });
                }

                inv.totalPrice = docTotal.toFixed(2).replace(".", ",");
            });
        },

        _bindTreeTable() {
            const oTreeTable = this.byId("idTreeTable");
            oTreeTable.bindRows({
                path: "/Invoices",
                parameters: { arrayNames: ["items"] }
            });
        },

        _onBeforeShow() {

            const oModel = this.getView().getModel();

            oModel.setProperty("/SelectedInvoice", null);

            const aInvoices = oModel.getProperty("/Invoices") || [];
            aInvoices.forEach(inv => inv.selected = false);
            oModel.setProperty("/Invoices", aInvoices);

            // reset visuale
            this.byId("idTreeTable").clearSelection();
        },

        onAfterRendering() {
            const oFilter = this.getView().byId("filterBar");
            if (oFilter && oFilter._btnSearch) oFilter._btnSearch.setText("Avvio");
        },

        onShowErrorDialog(oEvent) {
            const oContext = oEvent.getSource().getBindingContext();
            const oInvoice = oContext.getObject();

            if (!oInvoice.multiSuppliers || oInvoice.multiSuppliers.length <= 1) {
                sap.m.MessageBox.warning(oInvoice.warningText || "Errore generico nella fattura.");
                return;
            }

            if (!this._oSupplierDialog) {
                sap.ui.core.Fragment.load({
                    id: this.getView().getId(),
                    name: "fatturazione.elettronica.passiva.view.fragments.scegliFornitore",
                    controller: this
                }).then(oDialog => {
                    this._oSupplierDialog = oDialog;
                    this.getView().addDependent(oDialog);

                    const oModel = new sap.ui.model.json.JSONModel(oInvoice.multiSuppliers);
                    oDialog.setModel(oModel);
                    oDialog.open();
                });
            } else {
                const oModel = new sap.ui.model.json.JSONModel(oInvoice.multiSuppliers);
                this._oSupplierDialog.setModel(oModel);
                this._oSupplierDialog.open();
            }

            this._oSelectedInvoiceForSupplier = oInvoice;
        },

        onConfirmSupplierSelect() {
            const oTable = sap.ui.core.Fragment.byId(this.getView().getId(), "supplierTable");
            const aSelected = oTable.getSelectedItems();

            if (aSelected.length === 0) {
                sap.m.MessageToast.show("Seleziona un fornitore prima di assegnare.");
                return;
            }

            const oSelected = aSelected[0].getBindingContext().getObject();
            const oInvoice = this._oSelectedInvoiceForSupplier;

            oInvoice.supplier = oSelected.supplier;
            oInvoice.supplierName = oSelected.supplierName;

            // Rimuovo warning
            oInvoice.hasWarning = false;
            oInvoice.warningText = "";

            sap.m.MessageToast.show(`Fornitore assegnato: ${oSelected.supplierName}`);
            this._oSupplierDialog.close();

            this.getView().getModel().refresh(true);
        },


        onCancelSupplierSelect() {
            this._oSupplierDialog.close();
        },



        onVisualizzaDati: function () {
            var oTable = this.byId("idTreeTable");
            var aSelected = oTable.getSelectedIndices();

            if (aSelected.length === 0) {
                sap.m.MessageToast.show("Seleziona una fattura per visualizzare i dettagli.");
                return;
            }

            if (aSelected.length > 1) {
                sap.m.MessageBox.warning("Puoi visualizzare i dati di una sola fattura alla volta.");
                return;
            }


            var oContext = oTable.getContextByIndex(aSelected[0]);
            var oSelected = oContext.getObject();


            if (!oSelected.items) {
                sap.m.MessageToast.show("Puoi visualizzare i dati solo delle fatture principali.");
                return;
            }


            var oGlobalModel = new sap.ui.model.json.JSONModel({
                SelectedInvoice: oSelected
            });
            sap.ui.getCore().setModel(oGlobalModel, "SelectedInvoiceModel");


            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Dettaglio", {
                invoiceId: oSelected.docNumber
            });
        }



    });
});
