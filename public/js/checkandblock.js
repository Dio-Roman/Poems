// Проверка, чтоб были заполнены все поля

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

//4. check anem of img file
document.querySelector('#img-name').oninput = function () {
    let imgName = document.querySelector('#img-name').value;
    imgName ? submit[3] = true : submit[3] = false;
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