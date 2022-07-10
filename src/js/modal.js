import {btnAddNode, modal, modalDescr, modalImagesLink, modalTitle} from "./selectors.js";
import {store} from "./store/store.js";

export const closeModal = () => {
    modal.classList.add('hide');
    window.onclick = undefined;
    store.setChangingNoteId(null);
    store.setIsSendingModal(false);
    resetModalValues();
}

export const openModal = () => {
    btnAddNode.innerHTML = store.getState().changingNoteId ? "Изменить" : "Добавить";

    modal.classList.remove('hide');
    window.onclick = (e) => {
        if (e.target === modal) {
            store.setIsModal(false);
        }
    };
    window.onkeydown = (e) => {
        if(e.key === "Enter"){
            store.setIsSendingModal(true);
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