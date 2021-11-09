/*function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes[0].innerHTML
}*/

let  mess=""

function http(url) {

    let endings=0;

    var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
    httpRequest.open('GET', "http://121.41.113.96:11239/"+url, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    httpRequest.send();//第三步：发送请求  将请求参数写在URL中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            const json = httpRequest.responseText;//获取到json字符串，还需解析

            //console.log(json)
            let end= json.substr(-4,1)

            let scan= json.substr(-12,12)
            console.log("正确答案是"+scan)

            mess=scan
            return scan;

            //根据abcd 返回对应 下标 0-3

        }
    };

}


/**
 * 根据传入 字符串分割 文本
 * split() 方法用于把一个字符串分割成字符串数组。
 *
 * var pos=str.indexOf("d");   ||||||| ，  |||||  _  |||||
 * @param sss
 */

function strs(sss) {
    let indexOf1 = sss.indexOf('，');
    let indexOf2 = sss.indexOf('_');
    let indexOf3 = sss.indexOf('。');

    if (indexOf2>indexOf1)indexOf1=indexOf2
    if (indexOf3>indexOf1)indexOf1=indexOf3

    //默认是取最大值
    const  text=sss.substr(1,indexOf1)

    return text;


}

/**
 * 测试点击
 */
function ontest(index) {
    let e1 = document.getElementsByClassName("swiper-slide-active")[0];
    let ee2= e1.querySelectorAll("li")[index]
    ee2.querySelector("label").click()
}

function log1() {
    console.log("加载中")
    console.log("网络请求结果"+mess);

    //根据 mess中值 选择 点击
    if (mess.indexOf('A')!==-1 || mess.indexOf('Y')!==-1)ontest(0);
    if (mess.indexOf('B')!==-1 || mess.indexOf('N')!==-1)ontest(1);
    if (mess.indexOf('C')!==-1)ontest(2);
    if (mess.indexOf('D')!==-1)ontest(3);

}



function classmy() {
    const text= document.getElementsByClassName("swiper-slide-active")[0].getElementsByClassName("title")[0].innerHTML

    //console.log(text)

    //处理
    let strshttp = strs(text);

    //发送网络请求 获取答案
     http(strshttp);

     setTimeout(log1,1000)

}

//翻页
function nextPage() {
    document.evaluate("//*[@id='timu_next']",document.body, null, 9, null).singleNodeValue.click();

}


function endAll() {
    setTimeout(classmy,0)

    //setTimeout(nextPage,1500)


}



endAll()
setTimeout(nextPage,2000)
