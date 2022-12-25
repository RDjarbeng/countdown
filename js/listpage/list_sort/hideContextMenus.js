import { closeSortMenu } from "../list_ui/closeSortMenu";
import { removeElementSetDisplayNone } from "../../functions.js";
import { switchContextIconDown } from "./listFunctions";

/**
 * Closes all countdown context menus, event or triggered in code
 * @param {Event} [event]
 */
export function hideContextMenus(event) {
    //if function is not triggered by event listener, event is empty
    if ((!(event != null)) || !(event.target.className == 'countdown-list-options' || event.target.tagName == 'I' || (event.target.className.search('sort-title') > -1))) {
        document.querySelectorAll('.menu').forEach(contextMenu => removeElementSetDisplayNone(contextMenu));
        document.querySelectorAll('.fa-chevron-circle-up').forEach(element => switchContextIconDown(element));
        closeSortMenu();
        // }
    }
}
