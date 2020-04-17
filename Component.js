sap.ui.define([
	"sap/ui/core/UIComponent", 
	"sap/ui/model/json/JSONModel", 
	"sap/ui/Device"
	], function (UIComponent, JSONModel, Device) {
	"use strict";
	
	return UIComponent.extend("sap.ui.covid.Component", {
		metadata : {
            manifest: "json"
    	},
		
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			
			this.getRouter().initialize();
			
			// set the device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
			
			// var oGlobeCases = {
			// 	regions: []
			// };
			
			// var oModel = new JSONModel(oGlobeCases);
			// this.setModel(oModel);
			
		}
	});
});