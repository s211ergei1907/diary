import {render} from "../render.js";
import {closeModal, getValuesFromModal, openModal} from "../modal.js";
import {onSendNote} from "../notes/notes.utils.js";

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
    },
    "isSendingModal": (state) => {
        state.isSendingModal && onSendNote(getValuesFromModal());
    }
}
