export const state = {
    checkboxesChecked: [],
    notes: JSON.parse(localStorage.getItem('notes')) ?? [],
    previousNoteId: JSON.parse(localStorage.getItem('id')) ?? -1,
    changingNoteId: null, // string | null
}