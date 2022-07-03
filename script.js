const modal = document.getElementById("myModal");
const btnOpenModel = document.getElementById("myBtn");
const btnCloseModal = document.querySelectorAll(".close")[0];

const modalTitle = document.querySelector('.modal__input');
const modalDescr = document.querySelector('.modal__area');
const modalImagesLink = document.querySelector('.modal__input_images');
const btnAddNode = document.querySelector('.modal__btn2');
const modalForm = document.querySelector('.modal__form');

//Массив в который будем кидать объект
let notes = [];

btnOpenModel.onclick = () =>  {
    // отобразим модальное окно
    modal.classList.remove('hide');
  };

btnCloseModal.onclick = () => {
    modal.classList.add('hide');
}
modalForm.onsubmit = (e) =>{
    //В эту ф-ию будет передано событие ивент, мы не хотим чтобы страница перезагружалась => event есть метод e.preventDefault(); Убираем стандартное поведение формы
    console.log(e);
    e.preventDefault();

    
}

window.onclick = function(event){
    if(event.target == modal){
        modal.classList.add('hide');
    }
}


// addEventListener - метод который отслеживает клик по кнопке и запускать функцию(вторым параметром)
btnAddNode.onclick = () => {

    //Каждое новое дело будем записывать в объект, а уже объект добавлять в массив

    const note = {
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
    };
    


    
    if(note.title != '' && note.content != '' ){
        modal.classList.add('hide');
        notes.push(note);
        console.log(notes);
        modalTitle.value = '';
        modalImagesLink.value = '';
        modalDescr.value = '';
        insertNotes(notes);
    }
    


    //Добавляем в туду лист наш объект
    // todoList.push(newTodo);
    // displayMessages();

};



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

function insertNotes(notes){
    document.querySelector(".notes").innerHTML = createNotes(notes).join("");
}

function createNotes(notes) {
    return notes.map(({ title, content, createDate, modified, lastModified, imageLink }) => {
        return `
            <div class="note">
                    <h2>${title}</h2>
                    <div>${content}</div>
              <p>Создано: <i>${createDate}</i></p>
              ${imageLink ? `<img class="images__js" src="${imageLink}" alt="">`: ''}
              ${modified ? `<p>Изменено: <i> ${lastModified}</i></p>`: ''}
            </div>
        `;
    });
}

insertNotes(notes);
