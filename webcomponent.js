(function () {
  let _shadowRoot;
  let _id;
  let _password;

  let tmpl = document.createElement("template");
  tmpl.innerHTML = `
    <style>
    </style>

    <div id="ui5_content" name="ui5_content">
      <slot name="content"></slot>
    </div>

    <script id="oView" name="oView" type="sapui5/xmlview">
      <mvc:View
        controllerName="com.snp.materialselect"
        xmlns:l="sap.ui.layout"
       xmlns:mvc="sap.ui.core.mvc"
        xmlns="sap.m">
        <l:VerticalLayout
        class="sapUiContentPadding"
        width="100%">
        <l:content> 
          <Button text="Press me" id="btnTest press="onButtonPress" />
        </l:content>
        </l:VerticalLayout>
       </mvc:View>
    </script> 
    `;

  class SNPMaterialSelect extends HTMLElement {
    constructor() {
      super();

      this.addEventListener("click", (event) => {
        console.log("click");
      });
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      if ("designMode" in changedProperties) {
        this._designMode = changedProperties["designMode"];
      }
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      loadthis(this);
    }
  }

  customElements.define("com-snp-materialselect", SNPMaterialSelect);

  // UTILS
  function loadthis(that) {
    var that_ = that;

    let content = document.createElement("div");
    content.slot = "content";
    that_.appendChild(content);

    sap.ui.getCore().attachInit(function () {
      "use strict";

      //### Controller ###
      sap.ui.define(["jquery.sap.global", "sap/ui/core/mvc/Controller"], function (jQuery, Controller) {
        "use strict";

        return Controller.extend("com.snp.materialselect", {
          onInit: function () {
            debugger;
          },

          onButtonPress: function (oEvent) {
            console.log(_password);

            that.dispatchEvent(
              new CustomEvent("onBtnPressSAC", {
                detail: "Test",
              })
            );
          },
        });
      });

      debugger;
      //### THE APP: place the XMLView somewhere into DOM ###
      var oView = sap.ui.xmlview({
        viewContent: jQuery(document.getElementById("_oView")).html(),
      });
      oView.placeAt(content);

      if (that_._designMode) {
        //oView.byId("passwordInput").setEnabled(false);
      }
    });
  }
})();
