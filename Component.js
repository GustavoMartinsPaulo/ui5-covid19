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
		
		Init: function() {
			// set the device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
		}
	});
});