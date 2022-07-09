import {store} from "./store/store.js";

export const getPrettyFullDate = () => {
    return (
        String(new Date().getDate()).padStart(2, 0) +
        "." +
        String(new Date().getMonth() + 1).padStart(2, 0) +
        "." +
        new Date().getFullYear()
    );
}

export const formNote = (noteData) => {
     return {
        title: noteData.title,
        content: noteData.content,
        imageLink: noteData.imageLink,
        createDate: getPrettyFullDate(),
        lastModified: null,
        modified: false,
        id: store.getUUID(),
    };
}

const updateNote = (noteData, id) => {
    const state = store.getState();
    const note = state.notes.filter(note => note.id === Number(id))[0];
    const newNote = {
        ...note,
        title: noteData.title,
        content: noteData.content,
        imageLink: noteData.imageLink,
        lastModified: getPrettyFullDate(),
    }
    store.updateNoteById(newNote, id);
}

const createNote = (noteData) => {
    const note = formNote(noteData);
    store.saveNewNote(note);
}


export const onSendNote = (noteData) => {
    const state = store.getState();
    if (state.changingNoteId) {
        updateNote(noteData, state.changingNoteId);
        store.setIsModal(false);
    } else {
        if (noteData.title !== '' && noteData.content !== '') {
            createNote(noteData);
            store.setIsModal(false);
        }
    }
}


