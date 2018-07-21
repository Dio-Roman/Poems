// подсвечивает активную ссылку в nav-left
const link = document.querySelectorAll(".nav-left__item>li>a");
link[0].attributes[1].nodeValue === window.location.pathname ? link[0].style.color = "#fc1a00" : link[1].style.color = "#fc1a00";