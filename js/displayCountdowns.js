import { popAndAddFormOnList } from "./formupdate.js";
import { loadListPage } from "./listpage/listFunctions.js";
// begin displaycountdown.js
loadListPage();

const handleSubmissionAndLoadListpage=()=>{
    popAndAddFormOnList();
    loadListPage();
}
//get button for create countdown
const createButton = document.getElementsByClassName("new-item")[0];
createButton.addEventListener("click", handleSubmissionAndLoadListpage);