const modal = document.getElementById("myModal");
const btnOpenModel = document.getElementById("myBtn");
const btnCloseModal = document.querySelectorAll(".close")[0];

const modalTitle = document.querySelector('.modal__input');
const modalDescr = document.querySelector('.modal__area');
const modalImagesLink = document.querySelector('.modal__input_images');
const btnAddNode = document.querySelector('.modal__btn2');



//Массив в который будем кидать объект
let notes = [];

btnOpenModel.onclick = () =>  {
    // отобразим модальное окно
    modal.classList.remove('hide');
  };

btnCloseModal.onclick = () => {
    modal.classList.add('hide');
}


// window.onclick = function(event){
//     if(event.target == modal){
//         modal.style.display = "none";
//     }
// }

// Логика (моя)
//Получаем элементы из html



// addEventListener - метод который отслеживает клик по кнопке и запускать функцию(вторым параметром)
btnAddNode.onclick = () => {

    //Каждое новое дело будем записывать в объект, а уже объект добавлять в массив

    const note = {
        title: modalTitle.value,
        content: modalDescr.value,
        imageLink: modalImagesLink.value
    };
    


    
    if(note.title != '' && note.content != ''){
        modal.classList.add('hide');
        notes.push(note);
        console.log(notes);
        modalTitle.value = '';
        modalImagesLink.value = '';
        modalDescr.value = '';
    }
    


    //Добавляем в туду лист наш объект
    // todoList.push(newTodo);
    // displayMessages();

};

function findNotesByWord(word) {
    return notes.filter(
        ({ title, body, createDate }) =>
            body.includes(word) || title.includes(word) || createDate === word
    );
}
document.querySelector(".notes").innerHTML = createNotes(notes).join("");
document.querySelector("#finderInput").addEventListener("input", (e) => {
    document.querySelector(".notes").innerHTML = createNotes(
        findNotesByWord(e.target.value)
    ).join("");
});

function createNotes(notes) {
    return notes.map(({ title, body, createDate, modified, lastModified }) => {
        return `
            <div class="note">
                    <h2>${title}</h2>
                    <div>${body}</div>
              <p>Создано: <i>${createDate}</i></p>
              ${modified ?? `<p>Изменено: <i${lastModified}</i></p>`}
            </div>
        `;
    });
}

