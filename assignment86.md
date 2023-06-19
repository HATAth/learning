# 課題86

## 問題

86. アイテムの編集機能を実装してください

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
todo.js
```javascript
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

        element.parentNode.replaceWith(editMode);
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
```

## 結果

![][def1]

[def1]:https://lh3.googleusercontent.com/pw/AJFCJaWoKuGiOvso36E0-0IUE2IxB4VZkC14dRRpPsoq3AzbfOhNzDl36V0p5KqocsfgrbWZZKIGUefk_EZo9HtzzTaCOlU4KAkzGam0YwJMiFUg-lh3zwQDJ4mfVDYubtu0t3B4RtONjHCjRMHVmN6XAePTUuasOyeVXIqDR6szEZmjfKGRDTNkjxs4nMj0QpzIMXmTTT7Yuvy4kULWZ0BgKwujoS-HrjygRfrULGdCCIHtozNyyQOJnBxc2ckArVwPk7qORnUUKIImAMJM06FxESzhlbwqXqugX0-L3yzKyJ1u5t97a_d_dxqcmKUwPAZXDQfvZ-FqpUrVF-qwJEchaoksH2_tmzSpZ6uT0fo1V6Mpt49RAuJ4JD96GGgBqmvaB2pMYOfYfYWxkndyDkJW2V_kuAy5Pz7yKiSG871B6iVjf5WwcaO0MMhO2bCvMpGNOdBAVH4H3mOEasFcoWDZU05JQzP6CUizmQdgEULnYMd2GEz3DWujLFybF7-W8KxVr2uWnYi-edZdl3jkhjyPRNrQKKKJjBGu-HLDkXUe818DNKugXgBJtDpap2vRI6j-n8umI7-Yup3R2EvBpy1ZcrBzUfrKSJ8k4pALJRCHJz0OUT9B5YU8zy7Uu5WCZdPO8U9DRzpcXeqJb6vA9LmU35pd5qAVX5B3uqpB73kZaCIzZffRIlt7Rla2EnuK_HLKdHpDu3F5XPIpRzhtldaenWdXE8lZEBiGG4GYCeXhMqb_vcqvZglNZhk6jkjlxfPK0TuwbFLH9V74LI32T_wGBInwX-KRZZO6lQyKm37m-sL-mJ1v4QbSaXee8ypWrVBaAANbpRUD7MSiDM49hT4DQTTvHiATxdz2YJaklgbCtQ3WlZsO6dVBdvNKRad1KTfnH81JIa-MNvC2N7qJTaNdwA=w1330-h904-s-no?authuser=0

![][def2]

[def2]:https://lh3.googleusercontent.com/pw/AJFCJaVToYSwiUxqbbDo-MSw1kw9cnFwfHFyRxvMaCPxO0md_N3CLqW0z92jMZ4gNV73hvgJ7EJC_0HNDMBDdaamlI04X8Z7HmnsMCtoAMXHmHYaQiPtPqTu7P7uX8CHxmQYkbFSSjwsw93Kc9JNWjBgYJa3OFf8TdN4G_C9yvj7oVQIFIxuqkzyQj0gi9-izhZGsw6-8Ez1UnH2N0HYFOAmTOruD5NJtcmm_BnJB_Lvc7L5t-AZtiIiswmKF3c6RtAI6cbMe3GL5rEl3h8MHrMo6ko9Nwfy0nmk7QWiFZaS-jPUVadI4oCRqVB8a_iKYXCGTI8uE5DYbu9ZShfD2I1ofEZZ7bBXYhBtJ1PRf9AyR6c2tlhX5E5k1Uxlgg7MmrEcX_3Tb2axqIy6O27NhQydf2exHJOmxO-rLuyKM121GITFPO1g7ryNkH_aQbGpdE1yi_in4kso2x_rrJuHPXwBbpIArySnV6ooRP-1Wlyj1d9Klkpc1vDMOdl34rmVZ6TY8KeP3vErqWZI6eeG8R1U96UdgzLKAfC_Nd2oPqyPzxZBfNf0ofsbbvsDSMvyNsOyXg8gBIR1dsI208rK-Ah6SWDoSwYgO6kCPsOX455uUF3omq1oIsvQKi6RevqYEXXjmOfNq-x2US7Qzu0LaphsQKcwIW7QvauZIikkVUbiT-9P9jaBByr2kIbR7sjjhIWt7bJnyq5aAKs6QRSjs4A8i3s9m9RcFh6dxxthnEMlL3bJZkpBmKvmvWQvG1PnwA0SYwnQwMrw_G8lFcA4cCAkDf0Ftbd_7gDzJ7KAf2zxNFpEXmwf5rqiKDjo9T9DZ2RDeK7tCj8gt5MLfb9De-Crh7MqKZ4lhxjWO0Roh8h5P3zYu39Yu_iJCWNjNxRh0h2bgoi01Uh7pnrbLZFR6yzh8w=w1172-h790-s-no?authuser=0

