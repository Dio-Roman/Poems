"use strict";
// import images from "images.js";
// import {IMAGES} from 'images.js';

const IMAGES = ["1-nezn.jpeg", "2-chto.jpeg", "3-fontan.jpeg", "4-zima.jpeg", "5-lyric.jpeg", "6-zima.jpeg", "7-razgul.jpeg", "8-razmysh.jpeg"];

// меняет url с нужной картинкой

let mainCardImg = document.querySelectorAll('.main__card-img');

for (let index = 0; index < mainCardImg.length; index++) {
  mainCardImg[index].style.backgroundImage = `url('../static/img/${IMAGES[index]}')`
}

// проверка на наличие Названия стиха и добавляет класс с текст-в-fade

let mainCard = document.querySelectorAll(".main__card");
let mainCardNmame = document.querySelectorAll(".main__card-name")
// let mainCardImg = document.querySelectorAll(".main__card__img");
for (let j = 0; j < mainCard.length; j++) {
  if(!mainCard[j].querySelector('.main__card-title').innerText) {
    mainCardImg[j].style.backgroundImage = '';  //удалить фон картинку
    mainCardImg[j].classList.add("text-fade");  //добав. класс с fade
  }
}

// ----------фильтр-----

let selectArr = document.querySelector(".select")
let mainCardArr = document.querySelectorAll(".main__card");

// фильтрует по жанрам сравнивая value и название класса
function sort (value) {
  for(let k = 0; k < mainCardArr.length; k++) {
    mainCardArr[k].style.display = "initial";
    if(value != "all") {
      if(mainCardArr[k].classList[1]!= value) {
            mainCardArr[k].style.display = "none";
        }
    }
}
}
// показ. значение выделенного элемента 
function selectIndex (){
  let numberIndex = selectArr.options.selectedIndex;
  let selectValue = selectArr.options[numberIndex].value;

  sort(selectValue);
}

