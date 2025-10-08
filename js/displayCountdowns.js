import { popAndAddFormOnList } from "./formupdate.js";
import { addEventHandlers } from "./listpage/listEventListener.js";
import { loadListPage } from "./listpage/listFunctions.js";
import { addSortUIAndListeners } from "./listpage/list_sort/sort.js";
import { addSortUI } from "./listpage/list_ui/addSortUI.js";
import { requestNotificationPermission } from "./notification.js";
// import { addEventHandlers } from "./listEventListener";

// begin displaycountdown.js
loadListPage();
addEventHandlers();
addSortUIAndListeners()
const handleSubmissionAndLoadListpage=()=>{
    popAndAddFormOnList();
    loadListPage();
// addEventHandlers();
addSortUI();
}
//get button for create countdown
const createButton = document.getElementsByClassName("new-item")[0];
createButton.addEventListener("click", handleSubmissionAndLoadListpage);
if(Notification.permission !=='granted')
requestNotificationPermission();

