auto();
"ui";
requestScreenCapture();
setScreenMetrics(720, 1280);
function isIndex(capture) {
    var index = images.read("/sdcard/Pictures/index.png");
    var p = findImage(capture || captureScreen(), index, {
        region: [620, 116, 100, 110],
        threshold: 0.8
    });
    return p;
}
function callActions(fn, repeat, clip) {
    while (repeat--) {
        fn()
        sleep(clip)
    }
}
function isxx(capture) {
    var xx = images.read("/sdcard/Pictures/xx.png");
    var p = findImage(capture || captureScreen(), xx, {
        region: [0, 518, 720, 140],
        threshold: 0.8
    });
    return p
}
function isInxx(capture) {
    var xx = images.read("/sdcard/Pictures/xx.png");
    var p = findImage(capture || captureScreen(), xx, {
        region: [0, 93, 720, 140],
        threshold: 0.8
    });
    return p
}
/** 页面上是否有按钮需要点击，需要优化，目前编辑卡片也会被点击 */
function needClick(capture) {
    var needclick = images.read("/sdcard/Pictures/needclick.png");

    var p = findImage(capture || captureScreen(), needclick, {
        threshold: 0.8
    });

    return p
}
function xxOutCheck() {
    var capture = captureScreen()
    var p = isIndex(capture)
    if (p) {
        callActions(() => click(262, 1238), 2, 500) // 点2下nav进入休闲决斗页面
        return p
    }
    p = isxx(capture); // 下个循环中判断是否已经进入了休闲决斗页面
    if (p) {
        click(p.x, p.y);
        return p
    }
    p = isInxx(capture); // 下下个循环中检测是否打开了休闲决斗页面
    if (p) {
        click(360, 400); // 开始决斗
        return
    }
    p = needClick(capture) // 默认循环，自动点击按钮
    if (p) {
        click(p.x, p.y)
        return
    }
}

var __timer = setInterval(() =>{},3000)

setInterval(() => {
    var s = xxOutCheck()
    if(s){
        toast('zhaodaole')
    }else{
        toast('meizhaodao')
    }
},3000)