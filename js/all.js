var BMI = 0;
var judge = '';

// 建立DOM
var btnArea = document.querySelector('.btn');
var btnResult = document.querySelector('.btn-result');
var list = document.querySelector('.list');
var clearHistory = document.querySelector('#clearHistory');
var data= JSON.parse(localStorage.getItem("BMIitem")) ||[];

// 監聽及更新
btnResult.addEventListener('click',action);
clearHistory.addEventListener('click', deleteList);
list.addEventListener('click', toggleDone);
updateList(data);

//btn總控制
function action(){
    //取得輸入值
    var h = document.querySelector('#height').value;
    var w = document.querySelector('#weight').value;
    var check_h = Number(h);
    var check_w = Number(w);
    // 檢查是否為非數字
    if(isNaN(check_h) || isNaN(check_w)){
        alert('請輸入數字');
        return;
    }
    // 檢查是否為空值或負值
    if(h == '' || w == '' || h <= 0 || w <= 0){
        alert('請輸入身高和體重，數字不可為0');
        return;
    }

    // 執行方法
    //計算BMI
        calculate(h ,w);
    //建立JSON個是資料，並存進localStorage
        addData(h ,w);
    //將更新的data資料顯示於畫面上
        updateList(data);
    // //變更按鈕樣式
        changeBtn();

}
//計算BMI
function calculate(h, w){
    var BMIbefore = w /Math.pow(h/100,2);
    BMI = BMIbefore.toFixed(2); //取小數點第二位
    //判定BMI指標
    if( BMI >=40){
        judge ='重度肥胖';
    }else if( BMI >=35){
        judge = '中度肥胖';
    }else if( BMI >=30){
        judge = '輕度肥胖';
    }else if (BMI >=25){
        judge = '過重';
    }else if (BMI >= 18.5){
        judge = '理想';
    }else{
        judge = '過輕';
    }
};

//建立JSON格式資料，並存進localStorage
function addData(h, w) {
    var totalResult = {
        judge: judge,
        BMI: BMI,
        weight: w,
        height: h,
        time: today()
    }
    data.push(totalResult);
    localStorage.setItem("BMIitem",JSON.stringify(data));
};

function today(){
    var today = new Date();
    var time = (today.getMonth() + 1) + '-' + today.getDate() + '-' +today.getFullYear();
    return time;
}
// //將更新的data資料顯示於畫面上
function updateList(data){
    var str ='';
    var len = data.length;
    for(var i= (len-1); i>=0; i--) {
        str += '<div class="boxColor" ></div ><li><table><tr><td>'+data[i].judge+'</td><td><span>BMI</span>'+data[i].BMI+'</td><td><span>weight</span>'+data[i].weight+'kg</td><td><span>height</span>'+data[i].height+'cm</td><td><span>'+data[i].time+'</span></td></tr></table><a href="#" class="delete" data-index="'+i+'">x</a></li>';
    };
    list.innerHTML = str;
    //變更列表顏色
    var updateNum = len-1;
    for(var colorNum=0;colorNum<len; colorNum++){
        changeColor(colorNum, data[updateNum].judge);
        updateNum --;
    }
};
//變更列表顏色
function changeColor(colorNum, judge){
    var boxColor = document.querySelectorAll('.boxColor');
    switch (judge){
        case '過輕':
            boxColor[colorNum].setAttribute('id', 'lev1');
            break;
        case '理想':
            boxColor[colorNum].setAttribute('id', 'lev2');
            break;
        case '過重':
            boxColor[colorNum].setAttribute('id', 'lev3');
            break;
        case '輕度肥胖':
            boxColor[colorNum].setAttribute('id', 'lev4');
            break;
        case '中度肥胖':
            boxColor[colorNum].setAttribute('id', 'lev5');
            break;
        case '重度肥胖':
            boxColor[colorNum].setAttribute('id', 'lev6');
            break;
    }

};
// //變更btn樣式
function changeBtn(){
    //更新btn內容
    var str = '<div class="newBtn">'+BMI+'</div ><div class="BMI">BMI</div><div class="judge">'+judge+'</div><a id="refreshBtn"></a>';
    btnArea.innerHTML = str;
    //建立DOM
    var newBtn = document.querySelector('.newBtn');
    var refreshBtn = document.querySelector('#refreshBtn');
    //判定新btn顏色
    switch(judge){
        case '過輕':
            btnArea.setAttribute('style', 'color:#31BAF9');
            newBtn.setAttribute('style', 'border: 6px solid #31BAF9');
            refreshBtn.setAttribute('style', 'background-color: #31BAF9');
            break;
        case '理想':
            btnArea.setAttribute('style', 'color:#86D73F');
            newBtn.setAttribute('style', 'border: 6px solid #86D73F');
            refreshBtn.setAttribute('style', 'background-color: #86D73F');
            break;
        case '過重':
            btnArea.setAttribute('style', 'color:#FF982D');
            newBtn.setAttribute('style', 'border: 6px solid #FF982D');
            refreshBtn.setAttribute('style', 'background-color: #FF982D');
            break;
        case '輕度肥胖':
            btnArea.setAttribute('style', 'color:#FF6C03');
            newBtn.setAttribute('style', 'border: 6px solid #FF6C03');
            refreshBtn.setAttribute('style', 'background-color: #FF6C03');
            break;
        case '中度肥胖':
            btnArea.setAttribute('style', 'color:#FF6C03');
            newBtn.setAttribute('style', 'border: 6px solid #FF6C03');
            refreshBtn.setAttribute('style', 'background-color: #FF6C03');
            break;
        case '重度肥胖':
            btnArea.setAttribute('style', 'color:#FF1200');
            newBtn.setAttribute('style', 'border: 6px solid #FF1200');
            refreshBtn.setAttribute('style', 'background-color: #FF1200');
            break;
    }
    //建立重新整理功能
    refreshBtn.onclick = function reload(e){
        e.preventDefault();
        window.location.reload();
    }
};

//清除所有localStorage資料，畫面更新
function deleteList(){
    localStorage.removeItem("BMIitem");
    data = [];
    updateList(data);
};

//單筆刪除列表項目
function toggleDone(e){
    e.preventDefault();
    if(e.target.nodeName !== "A"){return;};
    var index = e.target.dataset.index;
    data.splice(index,1);
    updateList(data);
    localStorage.setItem("BMIitem",JSON.stringify(data));
};