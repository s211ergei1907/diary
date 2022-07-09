import {store} from "./store/store.js";
import { prefillModal } from "./modal.js";
import {formNotes} from "./formNotes.js";

export function render() {
    const state = store.getState();
    document.querySelector(".notes").innerHTML =
        formNotes(state.isSearching ? state.searchedNotes : state.notes).join("");
    document.querySelectorAll(".change_note").forEach(button => {
        button.onclick = () => {
            const note = store.getNoteById(button.dataset.id);
            prefillModal({
                title: note.title,
                content: note.content,
                imageLink: note.imageLink
            })
            store.setChangingNoteId(button.dataset.id);
            store.setIsModal(true);
        }
    })
}


