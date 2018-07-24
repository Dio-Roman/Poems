"use strict";

// let IMAGES = ["1-nezn.jpeg", "2-chto.jpeg", "3-fontan.jpeg", "4-zima.jpeg", "5-lyric.jpeg", "6-zima.jpeg", "7-razgul.jpeg", "8-razmysh.jpeg", "9-zvezda.jpeg", "10-noch.jpeg", "11-jizn.jpeg", "12-instrum.jpeg", "13-milyi.jpeg", "14-galvan.jpeg", "15-shkola.jpeg", "16-zabot.jpeg", "17-plach.jpeg", "18-rybolov.jpeg", "19-odnu.jpeg", "20-skazka.jpeg"];

let mainCardImg = document.querySelectorAll('.main__card-img');
let mainCard = document.querySelectorAll(".main__card");
let mainCardNmame = document.querySelectorAll(".main__card-name");

// меняет url с нужной картинкой
// for (let index = 0; index < mainCardImg.length; index++) {
//   mainCardImg[index].style.backgroundImage = `url('../static/img/${IMAGES[index]}')`
// }

// проверка на наличие Названия стиха и добавляет класс с текст-в-fade

for (let j = 0; j < mainCard.length; j++) {
  if (!mainCard[j].querySelector('.main__card-title').innerText) {
    mainCardImg[j].style.backgroundImage = ''; //удалить фон картинку
    mainCardImg[j].classList.add("text-fade"); //добав. класс с fade
  }
}

// ----------фильтр-----

let selectArr = document.querySelector(".select")

// фильтрует по жанрам сравнивая value и название класса
function sort(value) {
  for (let k = 0; k < mainCard.length; k++) {
    mainCard[k].style.display = "initial";
    mainCard[k].style.visibility = "visible";
    if (value != "all") {
      if (mainCard[k].classList[3] != value) {
        mainCard[k].style.display = "none";
      }
    }
  }
}
// показ. значение выделенного элемента 
function selectIndex() {
  let numberIndex = selectArr.options.selectedIndex;
  let selectValue = selectArr.options[numberIndex].value;

  sort(selectValue);
}