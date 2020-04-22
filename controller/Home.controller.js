sap.ui.define([
   "sap/ui/covid/controller/BaseController",
   "sap/ui/model/json/JSONModel",
   "sap/ui/core/Fragment"
], function (BaseController, JSONModel, Fragment) {
   "use strict";

   return BaseController.extend("sap.covid.controller.Home", {
   	
   	onInit: function () {
   		var oRouter = this.getRouter();
		oRouter.getRoute("appHome").attachMatched(this.onRouteMatched, this);
		
		var oGlobeCases = {
			regions: [],
			Legend:
				[
					{
						"text": "1 - 99 cases",
						"color": "rgb(249,148,148)"
					},
					{
						"text": "100 - 999 cases",
						"color": "rgb(246,99,100)"
					},
					{
						"text": "1,000 - 4,999 cases",
						"color": "rgb(243,51,52)"
					},
					{
						"text": "5,000 - 49,999 cases",
						"color": "rgb(220,13,14)"
					},
					{
						"text": "50,000 - 99,999 cases",
						"color": "rgb(185,12,13)"
					},
					{
						"text": "More than 100,000 cases",
						"color": "rgb(147,10,10)"
					}
				]
		};
			
		var oModel = new JSONModel(oGlobeCases);
		this.getView().setModel(oModel);
		this.getView().getModel().setSizeLimit(300);
		
		var oDetailModel = new JSONModel();
		this.getView().setModel(oDetailModel, "details");
		
		oModel.attachRequestCompleted(this.onRequestCompleted, this);
   	},
   	
   	onRouteMatched: function (oEvent) {
   		var sUrl = "https://api.covid19api.com/summary";
   		// debugger
   		this.getView().getModel().loadData(sUrl, null, true, "GET", true);
   		// debugger
   	},
   	
   	onRequestCompleted: function (oEvt) {
   		
   		var iCountryCount = parseInt(this.getView().getModel().getProperty("/Countries").length, 10);
   		var oCountries = this.getView().getModel().getProperty("/regions");
   		
   		for(var i = 0; i < iCountryCount; i++){
   			var sColor;
   			var iTotalConf = parseInt(this.getView().getModel().getProperty("/Countries/" + i + "/TotalConfirmed"),10);
   			
   			if (iTotalConf > 0 && iTotalConf <= 100){
   				sColor = "rgb(249,148,148)";
   			}else if (iTotalConf > 100 && iTotalConf <= 1000){
   				sColor = "rgb(246,99,100)";
   			}else if (iTotalConf > 1000 && iTotalConf <= 5000){
   				sColor = "rgb(243,51,52)";
   			}else if (iTotalConf > 5000 && iTotalConf <= 50000){
   				sColor = "rgb(220,13,14)";
   			}else if (iTotalConf > 50000 && iTotalConf <= 100000){
   				sColor = "rgb(185,12,13)";
   			}else if (iTotalConf > 100000){
   				sColor = "rgb(147,10,10)";
   			}
   			
   			oCountries.push({
   				name:this.getView().getModel().getProperty("/Countries/" + i + "/Country"),
   				code:this.getView().getModel().getProperty("/Countries/" + i + "/CountryCode"),
   				slug:this.getView().getModel().getProperty("/Countries/" + i + "/Slug"),
   				newConfirmed:this.getView().getModel().getProperty("/Countries/" + i + "/NewConfirmed"),
   				totalConfirmed:this.getView().getModel().getProperty("/Countries/" + i + "/TotalConfirmed"),
   				newDeaths:this.getView().getModel().getProperty("/Countries/" + i + "/NewDeaths"),
   				totalDeaths:this.getView().getModel().getProperty("/Countries/" + i + "/TotalDeaths"),
   				newRecovered:this.getView().getModel().getProperty("/Countries/" + i + "/NewRecovered"),
   				totalRecovered:this.getView().getModel().getProperty("/Countries/" + i + "/TotalRecovered"),
   				color: sColor
   			});
   			
   		}
   		this.getView().getModel().setProperty("/regions", oCountries);
   	},
   	
   	onRegionClick: function (e) {
   		
		//sap.m.MessageToast.show("onRegionClick " + e.getParameter("code"));
		
		var sCode = e.getParameter("code");
		var iCountryCount = parseInt(this.getView().getModel().getProperty("/Countries").length, 10);
		
		for(var i = 0; i < iCountryCount; i++){
			var sCountryCode = this.getView().getModel().getProperty("/Countries/" + i + "/CountryCode");
			if(sCountryCode === sCode){
				var oDetails = {
					name:this.getView().getModel().getProperty("/Countries/" + i + "/Country"),
	   				code:this.getView().getModel().getProperty("/Countries/" + i + "/CountryCode"),
	   				slug:this.getView().getModel().getProperty("/Countries/" + i + "/Slug"),
	   				newConfirmed:this.getView().getModel().getProperty("/Countries/" + i + "/NewConfirmed"),
	   				totalConfirmed:this.getView().getModel().getProperty("/Countries/" + i + "/TotalConfirmed"),
	   				newDeaths:this.getView().getModel().getProperty("/Countries/" + i + "/NewDeaths"),
	   				totalDeaths:this.getView().getModel().getProperty("/Countries/" + i + "/TotalDeaths"),
	   				newRecovered:this.getView().getModel().getProperty("/Countries/" + i + "/NewRecovered"),
	   				totalRecovered:this.getView().getModel().getProperty("/Countries/" + i + "/TotalRecovered")
				};
				this.getView().getModel("details").setProperty("/", oDetails);
				break;
			}
		}
		
		var oView = this.getView();

			// create dialog lazily
			if (!this.byId("detailsDialog")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "sap.ui.covid.view.DetailsDialog",
					controller:this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("detailsDialog").open();
			}	
	},
	
	onCloseDialog : function () {
		this.byId("detailsDialog").close();
	},

	onRegionContextMenu: function (e) {
		
		sap.m.MessageToast.show("onRegionContextMenu " + e.getParameter("code"));
	}

   });

});