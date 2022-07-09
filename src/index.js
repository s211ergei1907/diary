import {modal, btnOpenModel, btnCloseModal, modalTitle, modalDescr, modalImagesLink, btnAddNode, modalForm, btnDeleteNode} from "./js/selectors.js";
import {state} from "./js/state.js";


insertNotes(state.notes);

const openModal = () => {
    modal.classList.remove('hide');
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.add('hide');
        }
    };
}
const closeModal = () => {
    modal.classList.add('hide');
    window.onclick = undefined;
    state.changingNoteId = null;
}


btnOpenModel.onclick = (e) => {
    // отобразим модальное окно
    openModal();
};

btnCloseModal.onclick = () => {
     closeModal();
};

modalForm.onsubmit = (e) => {
    //В эту ф-ию будет передано событие ивент, мы не хотим чтобы страница перезагружалась => event есть метод e.preventDefault(); Убираем стандартное поведение формы
    e.preventDefault();
};




// addEventListener - метод который отслеживает клик по кнопке и запускать функцию(вторым параметром)
btnAddNode.onclick = () => {
    //Каждое новое дело будем записывать в объект, а уже объект добавлять в массив
    if (state.changingNoteId) {
        const note = state.notes.filter(note => note.id === Number(state.changingNoteId))[0];
        note.title = modalTitle.value
        note.content = modalDescr.value
        note.imageLink = modalImagesLink.value
        insertNotes(state.notes);
        closeModal();
    } else {
        let note = {
            title: modalTitle.value,
            content: modalDescr.value,
            imageLink: modalImagesLink.value,
            createDate:
                String(new Date().getDate()).padStart(2, 0) +
                "." +
                String(new Date().getMonth() + 1).padStart(2, 0) +
                "." +
                new Date().getFullYear(),
            lastModified: null,
            modified: false,
            id: ++state.previousNoteId,
        };

        if (note.title !== '' && note.content !== '') {
            modal.classList.add('hide');
            state.notes.push(note);
            modalTitle.value = '';
            modalImagesLink.value = '';
            modalDescr.value = '';
            insertNotes(state.notes);
        }
    }

};


//Поиск
function findNotesByWord(word) {
    return state.notes.filter(
        ({ title, content, createDate }) =>
            content.includes(word) || title.includes(word) || createDate.includes(word)
    );
}

document.querySelector("#finderInput").addEventListener("input", (e) => {
    document.querySelector(".notes").innerHTML = createNotes(
        findNotesByWord(e.target.value)
    ).join("");
});

function insertNotes(notes) {
    document.querySelector(".notes").innerHTML = createNotes(notes).join("");
    document.querySelectorAll(".change_note").forEach(button => {
        button.onclick = (e) => {
            const note = state.notes.filter(note => note.id === Number(button.dataset.id))[0];
            modal.querySelector(".modal__input").value = note.title;
            modal.querySelector(".modal__area").value = note.content;
            modal.querySelector(".modal__input_images").value = note.imageLink;
            state.changingNoteId = button.dataset.id;
            openModal();
        }
    })
}

function createNotes(notes) {
    return notes.map(({ title, content, createDate, modified, lastModified, imageLink, id }) => {
        //ToDo add checked
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


btnDeleteNode.onclick = () => {
    const idsToDelete = getCheckedCheckBoxes();
    state.notes = state.notes.filter(note => {
        return !idsToDelete.includes(String(note.id));
    })
    insertNotes(state.notes);
};


function getCheckedCheckBoxes() {
    const checkboxesChecked = []
    let checkboxes = document.querySelectorAll(".checkbox");
    // можно в массиве их хранить, если нужно использовать
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkboxesChecked.push(checkbox.dataset.id); // положим в массив выбранный
        }
    })
    return checkboxesChecked; // для использования в нужном месте
}

window.onbeforeunload = () => {
    localStorage.setItem('notes', JSON.stringify(state.notes));
    localStorage.setItem('id', JSON.stringify(state.previousNoteId));
}