let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function(){
    modal.style.display = "block";
}

span.onclick = function(){
    modal.style.display = "none";
}


// window.onclick = function(event){
//     if(event.target == modal){
//         modal.style.display = "none";
//     }
// }

// Логика (моя)
//Получаем элементы из html
let modalTitle = document.querySelector('.modal__input');
let modalDescr = document.querySelector('.modal__area');
let modalImagesLink = document.querySelector('modal__input_images');
let addNodes = document.querySelector('.modal__btn2');
let todo1;
let todo2;
let todo3;

// addEventListener - метод который отслеживает клик по кнопке и запускать функцию(вторым параметром)
addNodes.addEventListener('click', function(){

    // let todoList = [];
    //Каждое новое дело будем записывать в объект, а уже объект добавлять в массив
    let newTodo = {
        todo1: modalTitle.value,
        todo2: modalDescr.value,
        todo3: addMessage.value,
        
    };
    console.log(newTodo);


    //Добавляем в туду лист наш объект
    // todoList.push(newTodo);
    // displayMessages();

});


