//名前、削除ボタン、編集ボタンを表示する要素を作成する。名前を引数として指定する
function newItem(name) {
    let addElement = document.createElement("div");
    addElement.className = "todo-item";
    addElement.innerText = name;

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

    addElement.setAttribute("onclick", "completed(this)"); //生成されたaddElementに属性 onclick = "Completed(this)" を追加する

    return addElement;
}

//itemの追加
function addTodo() {
    const inputName = document.getElementById("addname")

    let addElement = newItem(inputName.value);

    document.getElementById("nowitems").appendChild(addElement); //divタグのnowitemsに追加
    inputName.value = '';

    updateNumOfTodo();

    let savedItems = document.getElementById("nowitems").innerHTML; //nowitemsの要素内のhtmlコンテンツ(つまりdivタグ達)の文字列を取得
    localStorage.setItem("saved", savedItems); //取得した文字列をlocalStorageに保存
}

//thisで指定された、つまりクリックされたタグのclass名を変更し、todo-itemの個数を再計算し、表示させる
function completed(element){
    if(document.getElementsByClassName("edit-item").length == 0){ //他に編集状態にあるitemが存在する場合は実行しない
        if(element.className === "todo-item"){
            element.className = "completed-todo-item";
        }
        else{
            element.className = "todo-item";  //クラス名がtodo-itemであればcomplete-todo-itemに、またその逆を行う
        }
    }
    updateNumOfTodo();
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
    let savedItems = document.getElementById("nowitems").innerHTML;
    localStorage.setItem("saved", savedItems); //削除された今の状態をLocalStrageに保存し直す。
}

//編集ボタンをクリックしたitemを編集状態に移らせる
function editItem(element){
    if(document.getElementsByClassName("edit-item").length == 0){ //他に編集状態にあるitemが存在する場合は実行しない
        let editMode = document.createElement("div"); //編集状態
        editMode.className = "edit-item";

        let editInput = document.createElement("input");
        editInput.id = "edit-input";
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

//読み込まれた時の処理
window.onload = (e) => {
	readLocalStorage();
	updateNumOfTodo();
};
