import {render} from "../render.js";
import {closeModal, openModal} from "../modal.js";

export const subscribers = {
    "notes": () => {
        render();
    },
    "isSearching": () => {
        render();
    },
    "searchedNotes": () => {
        render();
    },
    "isModal": (state) => {
        state.isModal ? openModal() : closeModal();
    }
}