function makeFile(author, description, image, localisation, date){
    let container = document.createElement("div");
    container.className = "report-container";

    // left and top container
    let containerLeft = document.createElement("div");
    containerLeft.className = "container-left";
    let img = document.createElement("img");
    img.className = "image";
    img.src = image;
    let datePad = document.createElement("p");
    datePad.className = "date";
    datePad.innerHTML = date;
    let loc = document.createElement("p");
    loc.className = "localisation";
    loc.innerHTML = localisation;

    containerLeft.appendChild(img);
    containerLeft.appendChild(datePad);
    containerLeft.appendChild(loc);

    // right and bottom container
    let containerRight = document.createElement("div");
    containerRight.className = "container-right";
    let auth = document.createElement("p");
    auth.className = "author";
    auth.innerHTML = author;
    let desc = document.createElement("p");
    desc.className = "description";
    desc.innerHTML = description;

    containerRight.appendChild(auth);
    containerRight.appendChild(desc);

    //main container
    container.appendChild(containerLeft);
    container.appendChild(containerRight);
    document.getElementById("reports").appendChild(container);

}