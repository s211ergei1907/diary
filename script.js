const modal = document.getElementById("myModal");
const btnOpenModel = document.getElementById("myBtn");
const btnCloseModal = document.querySelectorAll(".close")[0];

const modalTitle = document.querySelector('.modal__input');
const modalDescr = document.querySelector('.modal__area');
const modalImagesLink = document.querySelector('.modal__input_images');
const btnAddNode = document.querySelector('.modal__btn2');
const modalForm = document.querySelector('.modal__form');
//Удаление записи
const btnDeleteNode = document.querySelector('.btnDeleteNode');


// modalImagesLink.value = ' ';
//Массив в который будем кидать объект
let notes = JSON.parse(localStorage.getItem('notes')) ?? [];

btnOpenModel.onclick = () => {
    // отобразим модальное окно
    modal.classList.remove('hide');
};

btnCloseModal.onclick = () => {
    modal.classList.add('hide');
};

modalForm.onsubmit = (e) => {
    //В эту ф-ию будет передано событие ивент, мы не хотим чтобы страница перезагружалась => event есть метод e.preventDefault(); Убираем стандартное поведение формы
    console.log(e);
    e.preventDefault();


};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.add('hide');
    }
};
// id для того, чтобы знать где какой элемент note
let id = JSON.parse(localStorage.getItem('id')) ?? -1;
// addEventListener - метод который отслеживает клик по кнопке и запускать функцию(вторым параметром)
btnAddNode.onclick = () => {

    //Каждое новое дело будем записывать в объект, а уже объект добавлять в массив

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
        id: id += 1,
        checked: false
    };
    // localStorage.setItem('note', JSON.stringify(note));
    // note = JSON.parse(localStorage.getItem('note'));
    // console.log(note);
    localStorage.setItem('id', JSON.stringify(id));



    if (note.title != '' && note.content != '') {
        modal.classList.add('hide');
        notes.push(note);
        modalTitle.value = '';
        modalImagesLink.value = ' ';
        modalDescr.value = '';
        insertNotes(notes);
        // console.log(notes);
    }
    //!localstorage устанавливаем значение
    // localStorage.setItem('notes', JSON.stringfy(notes));



    //Добавляем наш объект в массив
    // todoList.push(newTodo);
    // displayMessages();

};


//Поиск
function findNotesByWord(word) {
    return notes.filter(
        ({ title, content, createDate }) =>
            content.includes(word) || title.includes(word) || createDate === word
    );
}

document.querySelector("#finderInput").addEventListener("input", (e) => {
    document.querySelector(".notes").innerHTML = createNotes(
        findNotesByWord(e.target.value)
    ).join("");
});

function insertNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
    document.querySelector(".notes").innerHTML = createNotes(notes).join("");
}

function createNotes(notes) {
    return notes.map(({ title, content, createDate, modified, lastModified, imageLink, id, checked }) => {
        return `

            <div class="note" id='${id}'>
                    <div>
                        <h2 class="note__title" id='${id}'>${title}</h2>
                        <input class="checkbox" type="checkbox" ${checked}/><br/>
                    </div>
                    <div class="note__content">${content}</div>
                    <p class="note__createDate">Создано: ${createDate}</p>
                    ${imageLink ? `<img class="images__js" src="${imageLink}" alt="">` : ''}
                    ${modified ? `<p>Изменено: <i> ${lastModified}</i></p>` : ''}
            </div>
            
        `;
        console.log(notes);

    });


}
// Перебор массива
// function checkedNote() {
//     notes.forEach((item, id) => {

//     });
// }

//

btnDeleteNode.onclick = () => {
    getCheckedCheckBoxes();
};
//Перебор отмеченных chekbox
let checkboxesChecked = [];
function getCheckedCheckBoxes() {
    let checkboxes = document.getElementsByClassName('checkbox');
    // можно в массиве их хранить, если нужно использовать 
    for (let index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked) {
            checkboxesChecked.push(checkboxes[index].value); // положим в массив выбранный
            console.log(checkboxesChecked);
        }
    }
    return checkboxesChecked; // для использования в нужном месте
}

// function deleteCheckbox() {
//     for (let index = 0; index < checkboxesChecked.length; index++) {
//         for(j = index + 1,  ){

//         }
//     }

// }