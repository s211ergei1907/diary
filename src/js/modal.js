import {btnAddNode, modal, modalDescr, modalImagesLink, modalTitle} from "./selectors.js";
import {store} from "./store/store.js";

export const closeModal = () => {
    modal.classList.add('hide');
    window.onclick = undefined;
    store.setChangingNoteId(null);
    resetModalValues();
}

export const openModal = () => {
    if(store.getState().changingNoteId){
        btnAddNode.innerHTML = "Изменить";
    } else {
        btnAddNode.innerHTML = "Добавить";
    }
    modal.classList.remove('hide');
    window.onclick = (e) => {
        if (e.target === modal) {
            store.setIsModal(false);
        }
    };
    window.onkeydown = (e) => {
        if(e.key === "Enter"){

        }
    }
}

export const getValuesFromModal = () => {
    return {
        title: modalTitle.value,
        content:  modalDescr.value,
        imageLink: modalImagesLink.value,
    }
}

export const resetModalValues = () => {
    modalTitle.value = '';
    modalImagesLink.value = '';
    modalDescr.value = '';
}

export const prefillModal = (values = {}) => {
    modalTitle.value = values.title ?? '';
    modalImagesLink.value = values.imageLink ?? '';
    modalDescr.value = values.content ?? '';
}