# 課題85

## 問題

85. アイテムの削除機能を実装してください

## プログラムリスト

todo.html
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Todo</title>
        <link rel="stylesheet" href="todo.css" />
    </head>
    <body>
        <h1>Todoリスト</h1>
        <p>
            未完了のタスク:<span id="num_of_todo">0</span>
        </p>

        <p>
            <input id="addname">
            <button onclick="addTodo()">追加</button>
        </p>

        <div id="nowitems"></div> <!--このdivタグにtodo-item達が追加される-->
    </body>

    <script src="todo.js"></script>

</html>
```

todo.js(変更あり)
```javascript
function addTodo() {
    const inputName = document.getElementById("addname")

    let addElement = document.createElement("div");
    addElement.className = "todo-item";
    addElement.innerText = inputName.value;

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-botton";
    deleteButton.innerText = "削除"
    deleteButton.setAttribute("onclick", "deleteItem(this)"); //このボタンがクリックされたら関数deleteItemを実行する
    addElement.appendChild(deleteButton); //生成されたaddElementに削除ボタンを追加

    document.getElementById("nowitems").appendChild(addElement); //divタグのnowitemsに追加
    inputName.value = '';

    updateNumOfTodo();

    addElement.setAttribute("onclick", "completed(this)"); //生成されたaddElementに属性 onclick = "Completed(this)" を追加する

    let savedItems = document.getElementById("nowitems").innerHTML; //nowitemsの要素内のhtmlコンテンツ(つまりdivタグ達)の文字列を取得
    localStorage.setItem("saved", savedItems); //取得した文字列をlocalStorageに保存
}

//thisで指定された、つまりクリックされたタグのclass名を変更し、todo-itemの個数を再計算し、表示させる
function completed(element){
    if(element.className === "todo-item"){
        element.className = "completed-todo-item";
    }
    else{
        element.className = "todo-item";  //クラス名がtodo-itemであればcomplete-todo-itemに、またその逆を行う
    }
    let todoCount = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todoCount;
}

//localStorageに保存したdivタグを読み込む。その要素が空でなければnowitemに要素を入れる
function readLocalStorage(){
    let savedItems = localStorage.getItem("saved");
    if(savedItems){
        document.getElementById("nowitems").innerHTML = savedItems;
    }
}

//todo-itemの個数をカウントし、「未完了のタスク」の表示を切り替える
function updateNumOfTodo(){
    let todoCount = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todoCount;
}

//ボタンをクリックしたitemの表示を削除、LocalStrageからも削除
function deleteItem(element){
    element.parentNode.remove(); //ボタンの親のdivタグごと削除
    let savedItems = document.getElementById("nowitems").innerHTML;
    localStorage.setItem("saved", savedItems); //削除された今の状態をLocalStrageに保存し直す。
}

//読み込まれた時の処理
window.onload = (e) => {
	readLocalStorage();
	updateNumOfTodo();
};
```

todo.css
```css
.completed-todo-item{
    text-decoration: line-through;
}
```