
const sub=document.getElementById("add");
const lb=document.getElementById("listBox");
const saveTaskButton = document.getElementById("save-todo-btn");

const saveInd = document.getElementById("saveIndex");
let todoArray = [];
sub.addEventListener("click", (e) => {
  e.preventDefault();
  
   let text=document.getElementById("t").value;
   let desc=document.getElementById("d").value;
   let dateInput = document.getElementById("dateInput").value;

    let a={
        text , desc , dateInput
    };
    let todo = localStorage.getItem("todo");
    if (todo === null ) {
   todoArray = [];
   } else {
   todoArray = JSON.parse(todo);
   
 }
if(text=="" || desc==""){
  alert("Blank text/descrription field is not allowed");
 }
 else{
 todoArray.push(a);
}

document.getElementById("t").value="";
document.getElementById("d").value="";    
document.getElementById("dateInput").value="";
localStorage.setItem("todo", JSON.stringify(todoArray));  
displayTodo();
}); 


function deleteTodo(ind) {
let todo = localStorage.getItem("todo");
 todoArray = JSON.parse(todo);
 todoArray.splice(ind, 1);
 localStorage.setItem("todo", JSON.stringify(todoArray));
 displayTodo();
}
function editTodo(ind) {
  saveInd.value = ind;
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  document.getElementById("t").value = todoArray[ind].text;
  document.getElementById("d").value=todoArray[ind].desc;
  document.getElementById("dateInput").value=todoArray[ind].dateInput;
  sub.style.display = "none";
  saveTaskButton.style.display = "block";
  }

  saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id].text = document.getElementById("t").value ;
    todoArray[id].desc= document.getElementById("d").value;
    todoArray[id].dateInput=document.getElementById("dateInput").value;
    sub.style.display = "block";
    saveTaskButton.style.display = "none";
    document.getElementById("t").value="";
    document.getElementById("d").value="";    
    document.getElementById("dateInput").value="";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   });


function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  for ( let ind=0; ind<todoArray.length ; ind++) {
    htmlCode += `<div class="card text-white bg-danger mb-3" style="max-width: 80rem; Height:16rem">
  <div class="card-header">Note${ind}</div>
      
     <div class="card-body">
        <h5 class="card-title">${todoArray[ind].text}</h5><hr>
         <p class="card-text">Description: ${todoArray[ind].desc} </p>
        <p class="card-text">Date: ${todoArray[ind].dateInput} </p> 
        <button onclick=deleteTodo(${ind}) class="btn btn-primary" style="background:black">Delete</button>
        <button onclick=editTodo(${ind}) class="btn btn-primary" style="background:black">Edit</button>

       </div>
    </div>
     </div>`;
  }
  lb.innerHTML = htmlCode;
 }
 displayTodo();