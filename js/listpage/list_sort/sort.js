import { toggleElementDisplayBlockOnScreen } from "../../functions";

export const sortTitleEventHandler = () => {
    const sortOpts = document.querySelector(".sort-options");
    toggleElementDisplayBlockOnScreen(sortOpts);
}