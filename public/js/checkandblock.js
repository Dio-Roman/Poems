// Проверка, чтоб были заполнены все (5 шт.) поля

let submit = [false, false, false, false, false];

//1.  check title of poem
document.querySelector('#stihname').onchange = function () {
    let stihName = document.querySelector('#stihname').value;
    stihName ? submit[0] = true : submit[0] = false;
}
// 2. check text of poem
document.querySelector('#stihtext').oninput = function () {
    let stihText = document.querySelector('#stihtext').value;
    stihText ? submit[1] = true : submit[1] = false;
}
// 3. check genre of poem
document.querySelector('.radio').addEventListener('change', () => {
    let radio1 = document.querySelector('#radio1');
    let radio2 = document.querySelector('#radio2');
    let radio3 = document.querySelector('#radio3');
    if (radio1.checked || radio2.checked || radio3.checked) {
        submit[2] = true
    } else {
        submit[2] = false
    };
})
//4. check name of img file
let imgName = document.querySelector('#img-name');

imgName.oninput = function () {
    imgName.value ? submit[3] = true : submit[3] = false;
}
// 4.1. проверка на правильный формат имени картинки ("число-строка") через regexp
imgName.onblur = function () {
    let arr = imgName.value.split('-');
    const regNum = /\d/;
    const regStr = /[a-z]/;

    (regNum.test(arr[0]) && regStr.test(arr[1])) ? submit[3] = true : submit[3] = false;
    // console.log(regStr.test(arr[1]))
}
// 5. check if choosen file
document.querySelector('#file').oninput = function () {
    let ChoosenFile = document.querySelector('#file').value;
    ChoosenFile ? submit[4] = true : submit[4] = false;
}

document.querySelector('#submit').addEventListener('click', (e) => {
    if (!submit.every(elem => elem == true)) {
        e.preventDefault();
    }
});