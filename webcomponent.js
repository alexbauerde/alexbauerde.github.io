(function () {
  let _shadowRoot;
  let _id;

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
        xmlns:mvc="sap.ui.core.mvc"
        xmlns:core="sap.ui.core"
        xmlns="sap.m">
        <MultiComboBox width="70%"
          showClearIcon="true"
          selectionFinish="onSelectionFinishMAT"
          showValueHelp="true">
          <core:Item key="02030123" text="02030123" />
          <core:Item key="02030124" text="02030124" />
          <core:Item key="02030125" text="02030125" />
          <core:Item key="02030126" text="02030126" />
          <core:Item key="02030127" text="02030127" />
          <core:Item key="02030128" text="02030128" />
        </MultiComboBox>
        <Button text="Test" id="btnTest" press="onButtonPress" />
       </mvc:View>
    </script> 
    `;

  class SNPMaterialSelect extends HTMLElement {
    constructor() {
      super();

      _shadowRoot = this.attachShadow({
        mode: "open",
      });
      _shadowRoot.appendChild(tmpl.content.cloneNode(true));

      _id = createGuid();

      _shadowRoot.querySelector("#oView").id = _id + "_oView";

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
          onInit: function () {},

          onSelectionFinishMAT: function (oEvent) {
            debugger;

            let aTest = ["02030123", "02030124"];

            that.dispatchEvent(
              new CustomEvent("onSelectionFinishMAT", {
                aMaterials: aTest,
              })
            );
          },
        });
      });

      //### THE APP: place the XMLView somewhere into DOM ###
      var oView = sap.ui.xmlview({
        viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
      });
      oView.placeAt(content);

      if (that_._designMode) {
        //oView.byId("passwordInput").setEnabled(false);
      }
    });
  }

  function createGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
})();
