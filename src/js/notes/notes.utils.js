import {store} from "../store/store.js";

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
    const note = store.getNoteById(id);
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

export function formNotes(notes) {
    return notes.map(({ title, content, createDate, modified, lastModified, imageLink, id }) => {
        return `
            <div class="note" id='${id}'>
                    <div>
                        <h2 class="note__title">${title}</h2>
                        <input class="checkbox" type="checkbox" data-id=${id}><br/>
                        <button class="change_note" data-id=${id}>Изменить</button>
                    </div>
                    <div class="note__content">${content}</div>
                    <p class="note__createDate">Создано: ${createDate}</p>
                    ${imageLink ? `<img class="images__js" src="${imageLink}" alt="">` : ''}
                    ${modified ? `<p>Изменено: <i> ${lastModified}</i></p>` : ''}
            </div>
        `;
    });
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


