# 課題88

## 問題

88. アイテムの複製機能を実装してください

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

todo.css
```css
.completed-todo-item{
    text-decoration: line-through;
}
```

todo.js(変更あり)
```javascript
//名前、削除ボタン、編集ボタンを表示する要素を作成する。名前を引数として指定する
function newItem(name) {
    let addElement = document.createElement("div");
    addElement.className = "todo-item";

    let nameOfAddElement = document.createElement("span");
    nameOfAddElement.className = "item-name";
    nameOfAddElement.innerText = name;
    nameOfAddElement.setAttribute("onclick", "completed(this)"); //名前がクリックされたら関数Completedを実行する
    addElement.appendChild(nameOfAddElement); //itemの名前部分

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-botton";
    deleteButton.innerText = "削除"
    deleteButton.setAttribute("onclick", "deleteItem(this)"); //削除ボタンを作成。このボタンがクリックされたら関数deleteItemを実行する
    addElement.appendChild(deleteButton); //生成されたaddElementに削除ボタンを追加

    let editButton = document.createElement("button");
    editButton.className = "edit-botton";
    editButton.innerText = "編集"
    editButton.setAttribute("onclick", "editItem(this)"); //編集ボタンを作成。このボタンがクリックされたら関数editItemを実行する
    addElement.appendChild(editButton); //生成されたaddElementに編集ボタンを追加

    let duplicateButton = document.createElement("button");
    duplicateButton.className = "duplicate-botton";
    duplicateButton.innerText = "複製"
    duplicateButton.setAttribute("onclick", "duplicateItem(this)"); //複製ボタンを作成。このボタンがクリックされたら関数duplicateItemを実行する
    addElement.appendChild(duplicateButton); //生成されたaddElementに複製ボタンを追加

    return addElement;
}

//itemの追加
function addTodo() {
    const inputName = document.getElementById("addname")

    let addElement = newItem(inputName.value);

    document.getElementById("nowitems").appendChild(addElement); //divタグのnowitemsに追加
    inputName.value = '';

    updateNumOfTodo();
    saveLocalStrage();
}

//thisで指定された、つまりクリックされたタグのclass名を変更し、todo-itemの個数を再計算し、表示させる
function completed(element){
    if(document.getElementsByClassName("edit-item").length == 0){ //他に編集状態にあるitemが存在する場合は実行しない
        if(element.parentNode.className === "todo-item"){
            element.parentNode.className = "completed-todo-item";
        }
        else{
            element.parentNode.className = "todo-item";  //クラス名がtodo-itemであればcomplete-todo-itemに、またその逆を行う
        }
        saveLocalStrage();
    }
    updateNumOfTodo();
}

//localStrageに今のitemを保存する。
function saveLocalStrage(){
    let savedItems = document.getElementById("nowitems").innerHTML; //nowitemsの要素内のhtmlコンテンツ(つまりdivタグ達)の文字列を取得
    localStorage.setItem("saved", savedItems); //取得した文字列をlocalStorageに保存
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
    let todoCount = document.getElementsByClassName("todo-item").length + document.getElementsByClassName("edit-item").length;
    document.getElementById("num_of_todo").textContent = todoCount;
}

//削除ボタンをクリックしたitemの表示を削除、LocalStrageからも削除
function deleteItem(element){
    element.parentNode.remove(); //ボタンの親のdivタグごと削除
    saveLocalStrage(); //削除された今の状態をLocalStrageに保存し直す。
    updateNumOfTodo();
}

//編集ボタンをクリックしたitemを編集状態に移らせる
function editItem(element){
    if(document.getElementsByClassName("edit-item").length == 0){ //他に編集状態にあるitemが存在する場合は実行しない
        let eChildren = element.parentNode.children;
        let preItemName = eChildren[0].innerText; //編集前の名前を取得

        let editMode = document.createElement("div"); //編集状態
        editMode.className = "edit-item";

        let editInput = document.createElement("input");
        editInput.id = "edit-input";
        editInput.setAttribute("value", preItemName); //はじめは編集前の名前を表示
        editMode.appendChild(editInput); //編集状態のinput部分

        let editCompleteButton = document.createElement("button");
        editCompleteButton.className = "edit-complete-botton";
        editCompleteButton.innerText = "完了"; 
        editCompleteButton.setAttribute("onclick", "editComplete(this)"); //編集完了ボタンを作成。このボタンがクリックされたら関数editCompleteを実行する
        editMode.appendChild(editCompleteButton);

        element.parentNode.replaceWith(editMode); //itemを編集状態にする。
    }
}

//編集完了ボタンをクリックしたitemを入力した文字列の名前に変更し、編集状態を終了する。
function editComplete(element){
    const editInputName = document.getElementById("edit-input"); //編集状態のinputから文字を取得
    let editedItem = newItem(editInputName.value);
     
    element.parentNode.replaceWith(editedItem); //編集状態の終了、文字を置き換えて戻る
    updateNumOfTodo();    
    let savedItems = document.getElementById("nowitems").innerHTML; //nowitemsの要素内のhtmlコンテンツ(つまりdivタグ達)の文字列を取得
    localStorage.setItem("saved", savedItems); //取得した文字列をlocalStorageに保存
}

//複製ボタンをクリックしたitemの名前と同じitemを生成する。
function duplicateItem(element){
    let eChildren = element.parentNode.children;

    let duplicatedItem = newItem(eChildren[0].innerText); //複製
    document.getElementById("nowitems").appendChild(duplicatedItem);

    updateNumOfTodo();
    saveLocalStrage();
}

//読み込まれた時の処理
window.onload = (e) => {
	readLocalStorage();
	updateNumOfTodo();
};
```

## 結果

[実行した動画](https://photos.google.com/search/_tra_/photo/AF1QipM0lA8y2e0jeD3BULF0mJrZdqL23wQf7EmONl3Q)

