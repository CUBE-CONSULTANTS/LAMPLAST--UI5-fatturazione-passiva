sap.ui.define([
    "sap/ui/core/UIComponent",
    "fatturazione/elettronica/passiva/model/models",
    "sap/ui/model/json/JSONModel",
    "./model/mockData"
], (UIComponent, models, JSONModel, mockData) => {
    "use strict";

    return UIComponent.extend("fatturazione.elettronica.passiva.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            const oData = mockData.getInvoicesData();
            oData.SelectedInvoice = null;
            const oModel = new JSONModel(oData);
            this.setModel(oModel);

            
            this.getRouter().initialize();
        }
    });
});