//Чистые функции
let number = 3;
let age = 20;

//При одинаковый аргументах возвращает одно и то же значение
//Использует только переданные ей аргументы и не использует окружение
//Возвращает один тип данных
const clearFunc = (number) => {
    return number + 1;
}

//При одинаковый аргументах возвращает одно и то же значение
//Использует окружение
//
const aLittleBitDirtyFunc = () => {
    return number + 1;
}

//При одинаковый аргументах возвращает одно и то же значение
const dirtyFunc = () => {
    number += 1;
    return number;
}

//При одинаковый аргументах возвращает одно и то же значение
const fuckingDirtyFunc = () => {
    number += 1;
    return number !== 0 ? number : undefined;
}

const absolutelyFuckingDirtyFunc = (number) => {
    number += 1;
    age += number;
    let {data} = fetch("url", {data: number, method: "POST"});
    if(data.res === "agree"){
        return true
    } else {
        return false;
    }
}

console.log(clearFunc(number));
