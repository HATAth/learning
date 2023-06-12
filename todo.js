let todo_count;
let saved_items;

function Addtodo() {
    const inputname = document.getElementById("addname")

    let addtodo = document.createElement("div");
    addtodo.className = "todo-item";
    addtodo.innerText = inputname.value;

    document.getElementById("nowitems").appendChild(addtodo); //divタグのnowitemsに追加
    inputname.value = '';

    Numtodo();

    addtodo.setAttribute("onclick", "Completed(this)"); //生成されたaddtodoに属性 onclick = "Completed(this)" を追加する

    saved_items = document.getElementById("nowitems").innerHTML; //nowitemsの要素内のhtmlコンテンツ(つまりdivタグ達)の文字列を取得
    localStorage.setItem("saved", saved_items); //取得した文字列をlocalStorageに保存
}

//thisで指定された、つまりクリックされたタグのclass名を変更し、todo-itemの個数を再計算し、表示させる
function Completed(element){
    if(element.className === "todo-item"){
        element.className = "completed-todo-item";
    }
    else{
        element.className = "todo-item";  //クラス名がtodo-itemであればcomplete-todo-itemに、またその逆を行う
    }
    todo_count = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todo_count;
}

//localStorageに保存したdivタグを読み込む。その要素が空でなければnowitemに要素を入れる
function ReadLocalStorage(){
    saved_items = localStorage.getItem("saved");
    if(saved_items){
        document.getElementById("nowitems").innerHTML = saved_items;
    }
}

//todo-itemの個数をカウントし、「未完了のタスク」の表示を切り替える
function Numtodo(){
    todo_count = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todo_count;
}

//読み込まれた時の処理
ReadLocalStorage();
Numtodo();