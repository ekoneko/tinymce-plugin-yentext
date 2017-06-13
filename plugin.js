/* global tinymce */
import "./style.css";
import YenTexts from "./data";

const body = tinyMCE.dom.DomQuery("body");
tinymce.PluginManager.add("yen", function(editor) {
  this.dialog = null;
  const createDialog = (x, y) => {
    const dialog = document.createElement("div");
    dialog.className = "tinymce-yen-box mce-menu";
    dialog.style.left = `${x}px`;
    dialog.style.top = `${y}px`;
    document.body.appendChild(dialog);

    YenTexts.forEach(yen => {
      dialog.innerHTML += createItem(yen);
    });

    setTimeout(() => {
      body.on("click", bindEvent);
    });

    this.dialog = dialog;
  };

  const createItem = text => {
    return `<div class="tinymce-yen-item">${text}</div>`;
  };

  const hideDialog = () => {
    if (!this.dialog) {
      return;
    }
    this.dialog.remove();
    body.off("click", bindEvent);
    setTimeout(() => {
      this.dialog = null;
    });
  };

  const bindEvent = event => {
    const { target } = event;
    if (!this.dialog.contains(target)) {
      hideDialog();
    } else if (target.classList.contains("tinymce-yen-item")) {
      editor.insertContent(target.innerText);
    }
    editor.once("click", () => {
      hideDialog();
    });
  };

  const showDialog = event => {
    if (!this.dialog) {
      createDialog(event.pageX, event.pageY);
    }
  };

  editor.addButton("yen", {
    icon: "yen",
    tooltip: "Yen text",
    onclick: showDialog
  });
});
