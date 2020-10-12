function elementPosition(a) {
    let b = a.getBoundingClientRect();
    return {
        clientX: a.offsetLeft,
        clientY: a.offsetTop,
        viewportX: (b.x || b.left),
        viewportY: (b.y || b.top),
        height: b.height,
        width: b.width
    }
}

function keepMenuOnTop(){
    let posMenu = elementPosition(document.getElementById("menu"));
    let menu = document.getElementById("menu");
    let date = document.getElementById("date");
    if  (posMenu.viewportY < elementPosition(document.getElementById("main")).viewportY) {
        menu.className = "row order-2 navbar navbar-expand-lg navbar-dark bg-dark menu";
        date.className = "datepad";
    }else if (posMenu.viewportY <= 0) {
        menu.className = "row order-2 navbar navbar-expand-lg navbar-dark bg-dark menuFixed";
        date.className = "datepad2";
    }
}

function reposNavBar(){
    let mainContainer = document.getElementById("main");
    let heroImg = document.getElementById("hero_img");
    let heroSize = elementPosition(heroImg);
    mainContainer.style.top = heroSize.height + "px";
}