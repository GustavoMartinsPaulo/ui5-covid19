sap.ui.define([
	"sap/ui/vbm/AnalyticMap", "sap/ui/model/json/JSONModel", "sap/ui/Device"
], function(AnalyticMap, JSONModel, Device) {
	"use strict";

	AnalyticMap.GeoJSONURL = "test-resources/sap/ui/vbm/demokit/media/analyticmap/L0.json";

	sap.ui.controller("sap.ui.covid.controller.C", {

		onRegionClick: function(e) {
			sap.m.MessageToast.show("onRegionClick " + e.getParameter("code"));
			
		},

		onRegionContextMenu: function(e) {
			sap.m.MessageToast.show("onRegionContextMenu " + e.getParameter("code"));
		}
	});

});
