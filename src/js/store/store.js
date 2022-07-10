import {subscribers} from "./subscribers.js";

const initialState = {
    checkboxesChecked: [],
    notes: JSON.parse(localStorage.getItem('notes')) ?? [],
    UUID: JSON.parse(localStorage.getItem('id')) ?? -1,
    changingNoteId: null, // string | null
    isSearching: false,
    isModal: false,
    isSendingModal: false,
    searchedNotes: [],
}

export const store = {
    _state: new Proxy({}, {
        set(target, key, val){
            const oldTarget = {...target};
            target[key] = val;
            const newTarget = {...target};
            subscribers[key]?.(newTarget, oldTarget);
            return true;
        }
    }),

    init(){
        for (const key in initialState) {
            this._state[key] = initialState[key];
        }
    },

    getState(){
        return {...this._state};
    },

    getNoteById(id){
        return this._state.notes.filter(note => note.id === Number(id))[0];
    },

    updateNoteById(note, id){
        this._state.notes = [...this._state.notes.filter(note => note.id !== Number(id)), note];
    },

    saveNewNote(note){
        this._state.notes = [...this._state.notes, note];
    },

    //id - string or array of strings
    deleteNoteById(id) {
        let idsToDelete = Array.isArray(id) ? id : [id];
        this._state.notes = this._state.notes.filter(note => {
            return !idsToDelete.includes(String(note.id));
        })
    },

    setSearchedNotes(notes){
        this._state.searchedNotes = notes;
    },

    setIsSearching(flag){
        this._state.isSearching = flag;
    },

    setChangingNoteId(id){
        this._state.changingNoteId = id;
    },

    setIsModal(flag){
        this._state.isModal = flag;
    },

    getUUID(){
        this._state.UUID += 1;
        return this._state.UUID;
    },

    setIsSendingModal(flag){
        this._state.isSendingModal = flag;
    }
}
