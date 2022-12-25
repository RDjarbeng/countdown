import { hideContextMenus } from "./hideContextMenus";
import { switchContextIconUp } from "./switchContextIcon";


export const triggerContextMenu = (element) => {
    if (element.querySelector(".menu")) {
        if (element.querySelector(".menu").style.display == "block") {
            hideContextMenus();
        }
        else {
            hideContextMenus(); //close all context menus before displaying the clicked one
            element.querySelector(".menu").style.display = "block";
            switchContextIconUp(element);
            // console.log("context-menu: show");
        }
    }
};
