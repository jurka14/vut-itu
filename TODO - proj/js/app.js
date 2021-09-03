//Seklecting elements

/*
    Vytvoøil: Vojtìch Krejèík (xkrejc68) + Vojtìch Jurka (xjurka08)
*/
const dateElement = document.getElementById("date");

const list = document.getElementById("list");
const input = document.getElementById("input");
const plus = document.getElementById("plusTodo");

const sidebar_list = document.getElementById("sidebar_list");
const sideInput = document.getElementById("sideInput");
const plusSidebar = document.getElementById("plusSidebar");

//variables
let LIST = [],
SIDELIST = [],
sideid = 0,
id = 0,
activeid = 0;

SIDELIST.push(
                {
                    name: "$",
                    id: 0,
                    trash: false,
                    list: LIST
                }
             );

//get data
/*function loadToDo(array){
    array.foreach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

let data = localStorage.getItem("TODO");

let sidedata = localStorage.getItem("SIDETODO");

if (data){
    LIST = JSON.parse(data);
   // loadToDo(list);
    id = LIST.length;
}else{
    LIST = [];
    id = 0;
}

if (sidedata){
    SIDELIST = JSON.parse(sidedata);
   // loadToDo(list);
    sideid = SIDELIST.length;
}else{
    SIDELIST = [];
    sideid = 0;
}
*/


//classes
const CHECK = "check-square.svg";
const UNCHECK = "square.svg";
const LINE_THROUGH = "lineThrough";

//date
let options = {weekday:'long', month:'long', day:'numeric'};
let today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add todo
function addToDo(toDo, id, done, trash){
    if(trash){ return; }
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item" >
                    <img src="icons/check.svg" job="complete" id=${id} class ="icon">
                    <p class="text ${LINE}"> ${toDo} </p>
                    <img align="right" src="icons/trash-2.svg" job="delete" id="${id}" class="trash">
                </li>`

    const position = "beforeend"

    list.insertAdjacentHTML(position, item);

}

function addSide(sideToDo, id, trash){
    if(trash){ return; }

    const item = `<li class="sidebar_item" >
                    <p class="text" job="sideButton" id="${id}"> ${sideToDo} </p>
                    <img align="right" src="icons/trash-2.svg" job="sidedelete" id="${id}" class="trash">
                </li>`

    const position = "beforeend"

    sidebar_list.insertAdjacentHTML(position, item);

}



//ulozeni po stisku enter
document.addEventListener("keyup", function(event){
    if( event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);
            SIDELIST[activeid].list.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            input.value = "";
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
    }
});

plus.addEventListener("click", function(event){
    const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);
            SIDELIST[activeid].list.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );

            input.value = "";
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
});

plusSidebar.addEventListener("click", function(event){
    const sideToDo = sideInput.value;
        if(sideToDo){
            sideid++;
            addSide(sideToDo, sideid, false);
            LIST = [];
            SIDELIST.push(
                {
                    name: sideToDo,
                    id: sideid,
                    trash: false,
                    list: LIST
                }
            );

            sideInput.value = "";
            localStorage.setItem("SIDETODO", JSON.stringify(SIDELIST));
        }
});




//complete item of list
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove item of list
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    SIDELIST[activeid].list[element.id].trash = true;
}

function removeSide(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    SIDELIST[element.id].trash = true;
}

function changeList(element){
    list.innerHTML = "";
    activeid = element.id;

    var i;
    for(i = 0; i < SIDELIST[element.id].list.length; i++)
    {
        addToDo(SIDELIST[element.id].list[i].name, SIDELIST[element.id].list[i].id, SIDELIST[element.id].list[i].done, SIDELIST[element.id].list[i].trash);
    }
}


list.addEventListener("click", function(event){
    let element = event.target;
    const elementJob = event.target.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});


sidebar_list.addEventListener("click", function(event){
    let element = event.target;
    const elementJob = event.target.attributes.job.value;
    if(elementJob == "sidedelete"){
        removeSide(element);
    }
    if(elementJob == "sideButton"){
        changeList(element, SIDELIST);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

