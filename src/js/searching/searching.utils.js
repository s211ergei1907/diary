import {store} from "../store/store.js";

export const findNotesByWord = (word) => {
    return store.getState().notes.filter(
        ({ title, content, createDate }) =>
            content.toLowerCase().includes(word.toLowerCase().trim()) ||
            title.toLowerCase().includes(word.toLowerCase().trim()) ||
            createDate.includes(word)
    );
}