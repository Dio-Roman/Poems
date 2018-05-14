"use strict";

// показывает url
// let imgSt = getComputedStyle(document.getElementById('img2'));
// console.log(imgSt.backgroundImage);


const IMAGES = ["1-nezn.jpeg", "2-chto.jpeg", "3-fontan.jpeg"];

// меняет url
// let imgID = document.getElementById('img2');
// imgID.style.backgroundImage = `url('../static/img/${IMAGES[0]}')`;


let cardsArr = document.querySelectorAll('.main__card__img');
console.log(cardsArr);
console.log(cardsArr.length);

for (let index = 0; index < cardsArr.length; index++) {
  cardsArr[index].style.backgroundImage = `url('../static/img/${IMAGES[index]}')`
}