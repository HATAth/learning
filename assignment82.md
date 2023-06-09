# 課題82

## 問題

82. todo.css を作成し、todo.htmlに読み込ませてください

    「completed-todo-item」クラスを持つ要素に打ち消し線が適用される様にtodo.cssを修正してください

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
            <button onclick="Addtodo()">追加</button>
        </p>
    </body>

    <script src="todo.js"></script>

</html>
```

todo.js
```javascript
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
    element.className = "completed-todo-item";
    todo_count = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todo_count;
}   
```

todo.css
```css
.completed-todo-item{
    text-decoration: line-through;
}
```

## 結果

![][def]

[def]: https://lh3.googleusercontent.com/pw/AJFCJaVE_DWMGR-X0Aew44lqAALItpTigTkXwEZkhwjDCEdV-WryIsSdTDbAYSPyvfzOSl1CSxxS2MfQ4kOa6USSXxwKiRzv1XlGu1AxHrShnh0J0c5T5mjgZhphzcAYZKxw0-m409zoittB7hNUdyxWKmYkkbTW9FcMRvwR2_NrMmh5sYNf4QQm4u4OnvyjoiRcglbOP2Eisdpd1UCk8vJw2y7ay5MpckXYf9vMYeTPbHMrIUQ11fVZYff-T1c88fIfpL0O9RHz5MPXLZI4A7vER3hucIcvj7uUbpLWNd7YJuKdLhXNHdZnb96TBG6m554AnMEfTn6P9BC5k338RyTURnpTCIdH4PLby5gPAqoDuj4x-QI6ZOWH4iWmSLzV5q8Axjoy6vwxeqZt1k4R6JtwOZswofoDY6Ze0XgNuYEmjO6gdrAQJezzH-dMlyx2oqD4EaVMCs1hmGsE4FAI5T9OUdenQnNYpYa5WVPrp9PBu9_nlvFy4Dld885eGUnWpd-DhpPlR1kj3Oo63rrmsDci1TUiOeVOdB-RcgVQ1M05nIGwzUyVOdiViA-0M8s4_L9I9pqhIhNf7XDa8sLSn2kZwP1YaXJckH1Gqj1THQ3HgWZnzmWB4KRlP-GtwOFKhvrU6hg-B4AbLck_ixESS_-de1tnrFmeKo2BRBFpWSxTnaKN3PT37FVt7fq_MPKAGP0CkvyzlsSKsz7YtRsh0hNaatTvXjv1IoXqRvKkEXoRBKCHmJFx5fcBUsgPNartMPdcCx8EIi1aH-SV9XANr1WlvT21UNthbXs7S444PmmjV2TQ3DDa2x4j9Y6NufOgAr1yCZtwJK-veUNTZKrEIxJs9ZawH3k98lQHsVUII2NP4oH64KYspw6YwhGdJbdqaTEepbh6dWEbVZOZ53vdyErw=w1402-h998-s-no?authuser=0

