# 課題84

## 問題

84. 追加ボタンを押した際にアイテムの内容をlocalStorageに保存するように修正してください
また、todo.htmlを開いた時にlocalStorageからアイテムの内容を読み込み、画面に表示するように修正してください

## プログラムリスト

todo.html(変更あり)
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
            <button onclick="Addtodo()">追加</button>
        </p>

        <div id="nowitems"></div> <!--このdivタグにtodo-item達が追加される-->
    </body>

    <script src="todo.js"></script>

</html>
```

todo.js(変更あり)
```javascript
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
```

todo.css
```css
.completed-todo-item{
    text-decoration: line-through;
}
```

## 結果

todo.htmlを再度読み込んだ後
![][def]

[def]: https://lh3.googleusercontent.com/pw/AJFCJaWzlBTmPh_PzTdaTPnG7-kcbSKPeTenq36l8slO6mGDiXxEQkxusqbVv05lw8MgUHQKwH8vw388BIgHIILeyOg4gBkLdEOsOdLcdTFobVLpqGeD-3k5GhBsPlczdXq8MQWQUUkBT9y8OzYeDRov5pD1TG0vU7gkWAnoe1r6ep8E6rY36axEaL2sd1DasRWKIOr1Oqbz-Qryssw-Flwo4yy2Yb2X91vmZv8quDS-72vLPu8gzgI3NfcJcBrYzlsRWcu1rS62KVJ93GBSny4KOhNqdsZ8xl1q2pWQitleAtVqPaiptqrKfcBcQk9BKmBwlAxC4232bkdYgjBsd7D2Sm2SSDNn1Qf12mC8U3Na94ngufeDYCUGwNCjyQECnDfkFz_wHD446_cA4QCCtr0DZL42CG0jKYylOS36nrNg54da5CXbw1Y00Rb6u551vCUM-nUtmGOjpu47dQo9Ayq3rlTggcwjt7hlewZqqC3N5nlYitEJ_JJsMzBNP6MLZyN4Zq-R8mZMppWVb8qlmX8F0f9gsHyqwhJcDp8YfnOtTksepv0XPMNIRP4ykUR_L3DEidqCYj5mR_zyG9xiUgtiiNj_vTGNU8WL0OajVMXdPyJaBUwvq1dCmA6cJEigpQM1YjJQGNXeQlHiqM0dvJamOumSTB4SjGBEisxPREJ8J2VQfQjNxjy98N3UWaLc4jY8vR5uBJdkTQEBAUJmCxV132iEVSI_YHi8YUcate_MvPHwZHsDCEnz_wF0IvPsNgGEspVKOGFutLLsaoeZmoIeKm68Oly4VE7eI-orcsbM-ds3BxBkg8ilZyZpKXZLDgp4JLhh59pVWUPm9Qe8rg-Qqdgp08zNSR87fukmqRdtxMmp1DTuhHEg5oh1i2QXWqA52cK7w2LzIDSDN6rgqysb6A=w3126-h1554-s-no?authuser=0

