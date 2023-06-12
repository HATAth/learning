# 課題83

## 問題

83. todo-itemを押した際に、そのアイテムが既に「completed-todo-item」クラスを持つのであれば、「todo-item」クラスを持つように修正してください

## プログラムリスト
todo-html
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

todo-css
```css
.completed-todo-item{
    text-decoration: line-through;
}
```

todo-js(変更あり)
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
    if(element.className === "todo-item"){
        element.className = "completed-todo-item";
    }
    else{
        element.className = "todo-item";  //クラス名がtodo-itemであればcomplete-todo-itemに、またその逆を行う。
    }
    todo_count = document.getElementsByClassName("todo-item").length;
    document.getElementById("num_of_todo").textContent = todo_count;
}   
```

## 結果

task2をクリックした時
![][def1]

再びtask2をクリックした時
![][def2]

[def1]:https://lh3.googleusercontent.com/pw/AJFCJaVsJP8gvWcYFbma2M_wnNLJRrS6u9fsdVjHYZH_AgvfxyXJEJlCdISez0xrjEiOIlPyhupuJ4mSL6hhfxSToSyR3mJ8cLTAOgv6SJS9Z9EZ_9Lj0Lcp2ZJlfNFEIY8BjSEoZxP9UKDyItm_Jl1r8liSBaFTHzq_giNyr9_ZR0SN40KL6apXDfIgcsqto9ZKm9ICacpwQFcyTpQUnzjlXXvR7HataxkYMFZgv2uoPKpfLmUIcfaA60kdr8jcEtM9VL-qrqIV2F1PygK6cHkxW7a8mkGnNjtuok9YTZDqq2InWPTnPlmBPOxBQhbb21A1UYsOHPnCncnohmadkZ1NemfrpX6ZTg_m0GvEpND1JuzMbRbjs8f2iNquJnRUFn6uASI6ii7kS_uA4W_E4B-p_vvXoYHtzXC3Ttu2awbuYZVnceHxBAXqPO7awL3TU8KtWD1XiakDiNYOBTI4-i4EmjiC6Kh6FBjBsIYUW1WAXJRNos-KP9oziG92Tg7nFslZMAJ-XyZeS8qD8puT4gvh2uX-s8SnmgJXqN3_QrQ_kBd0qa9BKNjh30xxdMi7qeqsrsFr2w66jtCdY_mTKdScnY0fDD9B-IFnvcgu374rpO1HUl3C1bQgxUBlfetK8kwt4LPzXkcWUVVmlsiLcXLnEF8w4rQuOF10-U8NuASn1xP1c8jdcHPpohfgW9EXe5wgUlN_cir9iH8soanRtB5QqRudeyoo1VsDG0lj0PgeMmLY3E1qhcG73tIbJMIHKFSBn-URfC8aqec37SSWLDy4tSRhb0_n_Elz3VF51AwMkJUbwQ6jJLhCouxRwAAQWV8MU5pDnq8EOPtP-PKTY4TVYr0CBQJi76vGj2PR3f6aJeR9oxsfqKndSLOnkYsHZbiI5WGLoCpj-MblMRRenm8ikA=w1282-h904-s-no?authuser=0

[def2]:https://lh3.googleusercontent.com/pw/AJFCJaUPbsOL8JTRk-MBH2y5s_L3bqeQnycypjDsfvISGhoxGDRXijSKPn94tyPed914AgvDtgWG2Y3Sau8FfSidq_-J_jxX8XUltFD3ExQOsZj6w6R7Dh-iQG6pQrk6AKBx4-QyF32GvuxgyO7Pn5jH3GYe-52YCpZPkHw1-HWyIKNvwJROfVac8n5R1ZBi1mgWnupOZpTtcBxE57eSLYLj-ek3LsL6fXD158bD4s5BAD7UU_F3FqWsaXNME5OPW9C5s-sDIzI7h8PEco0yyPdOAl8Kg9YWe4fPacrZrDoHBwVYjH05jSCxMLazTt71c-18k_sSg_qW-qdpcAuoEoR7Z-HbzJEP4OscA7rHH9PV436y-UZkB7zMxx6M64QU9AcuZV5twXYSqPZ6ghloTgAV1LIhVIzEhsWSSweGDsEmR-LeUJHkXml0CkZTuaOENOq3Oa878SKaeJoh0wDdrv6BE8KxraUKVGpXP3s9nP5ASSIQnSNHNnh32wiwsTTp5H-jK8QtnftMG6xWzIMB6t9t3GxWcpmc9WFI08o5rNaLQ4LAlk9bERxrjl8Vg2d8xFTqmXIBrddh36nby6PlEWHu-2P_q91gA7qhG95aWVE9FRHlT1eZeVLm9TC4rlYGy_FlEf3w_C_dXvjY2BtZ7H1epAUrvVGdUQPR3Tkb7pvpJIu6CAuKitR-QytS4KESBibsBWIR6Us_PrgOpNv-BpWFClotp6frUT6YaZMtW83zXLkr7DgQm58dYZvpnvEtfdkerpajXPusthRSZ1NgfrIcgaNz6val7IMFjMIQt5Zl-VfvwG06oPt_M1ePBscXQq-nL7FhIEYWrMc6JwIVpTSttoL0H3D6gy4XRCI_8hqDUyVcCb0UVDCu5jpFIBUJGRnGZqrf80N_sRhp2lddFpL0fA=w1518-h1262-s-no?authuser=0

