import {btnOpenModel, btnCloseModal, btnAddNode, modalForm, btnDeleteNode, finderInput} from "./js/selectors.js";
import {store} from "./js/store/store.js";
import { getValuesFromModal } from "./js/modal.js";
import {onSendNote} from "./js/onSendNote.js";
import {getCheckedCheckBoxes} from "./js/getCheckedCheckboxes.js";

store.init();

btnOpenModel.onclick = () => {
    // отобразим модальное окно
    store.setIsModal(true);
};

btnCloseModal.onclick = () => {
    store.setIsModal(false);
};

modalForm.onsubmit = (e) => {
    //В эту ф-ию будет передано событие ивент, мы не хотим чтобы страница перезагружалась => event есть метод e.preventDefault(); Убираем стандартное поведение формы
    e.preventDefault();
};

// addEventListener - метод который отслеживает клик по кнопке и запускать функцию(вторым параметром)
btnAddNode.onclick = () => onSendNote(getValuesFromModal());

//Поиск
function findNotesByWord(word) {
    return store.getState().notes.filter(
        ({ title, content, createDate }) =>
            content.toLowerCase().includes(word.toLowerCase().trim()) ||
            title.toLowerCase().includes(word.toLowerCase().trim()) ||
            createDate.includes(word)
    );
}

//ToDo set timeout to prevent every symbol rerender
finderInput.addEventListener("input", (e) => {
    if(!e.target.value){
        store.setIsSearching(false);
    } else {
        store.setSearchedNotes(findNotesByWord(e.target.value));
        store.setIsSearching(true);
    }
});

btnDeleteNode.onclick = () => {
    const idsToDelete = getCheckedCheckBoxes();
    store.deleteNoteById(idsToDelete);
};




window.onbeforeunload = () => {
    localStorage.setItem('notes', JSON.stringify(store.getState().notes));
    localStorage.setItem('id', JSON.stringify(store.getState().UUID));
}