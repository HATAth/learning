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

//thisで指定された、つまりクリックされたタグのclass名を変更し、todo-itemの個数を再計算し、表示させる。
function Completed(element){
    if(element.className === "todo-item"){
        element.className = "completed-todo-item";
    }
    else{
        element.className = "todo-item";  //クラス名がtodo-itemであればcomplete-todo-itemに、またその逆を行う。
    }
    todo_count = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todo_count;
}   