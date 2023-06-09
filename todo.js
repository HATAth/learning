let todo_count;

function Addtodo() {
    const inputname = document.getElementById("addname")

    let addtodo = document.createElement("div");
    addtodo.className = "todo-item";
    addtodo.innerText = inputname.value;

    document.body.appendChild(addtodo);
    inputname.value = '';

    todo_count = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todo_count;

    addtodo.setAttribute("onclick", "Completed(this)"); //生成されたaddtodoに属性 onclick = "Completed(this)" を追加する
}

//thisで指定された、つまりクリックされたタグのclass名を変更する。
function Completed(element){
    element.className = "completed-todo-item";
    todo_count = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todo_count;
}   






