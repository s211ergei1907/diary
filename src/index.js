import {btnOpenModel, btnCloseModal, btnAddNode, modalForm, btnDeleteNode, finderInput} from "./js/selectors.js";
import {store} from "./js/store/store.js";
import {getCheckedCheckBoxes} from "./js/getCheckedCheckboxes.js";
import {useInputSearchingNote} from "./js/searching/searching.hook.js";

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

btnAddNode.onclick = () => {
    store.setIsSendingModal(true);
}

const {onSearch} = useInputSearchingNote();
finderInput.addEventListener("input", (e) => {
    onSearch(e.target.value);
});

btnDeleteNode.onclick = () => {
    const idsToDelete = getCheckedCheckBoxes();
    store.deleteNoteById(idsToDelete);
};

window.onbeforeunload = () => {
    localStorage.setItem('notes', JSON.stringify(store.getState().notes));
    localStorage.setItem('id', JSON.stringify(store.getState().UUID));
}
