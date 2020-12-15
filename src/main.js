auto();
requestScreenCapture();
setScreenMetrics(720, 1280);
sleep(5000);

function isIndex() {
    var index = images.read("/sdcard/Pictures/index.png");
    var p = findImage(captureScreen(), index, {
        region: [620, 116, 100, 110],
        threshold: 0.8
    });
    return p;
}

function isxx() {
    var xx = images.read("/sdcard/Pictures/xx.png");
    var p = findImage(captureScreen(), xx, {
        region: [0, 518, 720, 140],
        threshold: 0.8
    });
    return p
}

function isInxx() {
    var xx = images.read("/sdcard/Pictures/xx.png");
    var p = findImage(captureScreen(), xx, {
        region: [0, 93, 720, 140],
        threshold: 0.8
    });
    return p
}

function needClick() {
    var needclick = images.read("/sdcard/Pictures/needclick.png");

    var p = findImage(captureScreen(), needclick, {
        threshold: 0.8
    });

    return p
}

function outCheck() {
    var p = isIndex()
    if (p) {
        click(262, 1238);
        sleep(500);
        click(262, 1238);
        return p
    }
    p = isxx();
    if (p) {
        click(p.x, p.y);
        return p
    }
    p = isInxx();
    if (p) {
        click(360, 400);
        return
    }
    p = needClick()
    if (p) {
        click(p.x, p.y)
        return
    }
}

function clearEffect() {
    click(720, 250) // 点击
}

function canOperate() {
    var indl = images.read("/sdcard/Pictures/indl.png");
    var p = findImage(captureScreen(), indl, {
        region: [525, 708, 195, 300],
        threshold: 0.8
    });
    return p
}
// 下一个阶段
function nextSetp() {
    click(661, 815)
    sleep(500)
    click(661, 815)
}

function resetPosition() {
    swipe(600, 300, 0, 1280, 200); // 拉到底
    sleep(500);
    swipe(0, 1280, 180, 972, 200); // 复位
}

/** 重复连续调用事件 */
function callActions(fn, repeat, clip) {
  while (repeat--) {
      fn()
      sleep(clip)
  }
}

function use() {
    var list = [169, 300, 400]; // 3张手牌的位置
    var startY = 1200; // 起手位置
    var endY = 800; // 结束位置

    function useCard() {
        var i = list.length
        while (i--) {
            var x = list[i]
            swipe(x, startY, x, endY, 200); // 使用手牌
            sleep(500);
            click(274, 942); // 发动或召唤
            sleep(500);
        }
    }
    callActions(useCard, 3, 2000);
}

function attack() {
    var list = [502, 207, 361]; // 中 左 右
    var startY = 725;
    var endY = 485;
    var endX = 356;
    var i = list.length
    while (i--) {
        var x = list[i];
        sleep(300);
        resetPosition();
        sleep(1000);
        swipe(x, startY, endX, endY, 200); // 攻击
        sleep(300);
        var p = canOperate();
        while (!p) {
            sleep(500);
            p = canOperate();
        }
    }
}

function checkExtra() {
    var extra = images.read("/sdcard/Pictures/extra.png");
    var p = findImage(captureScreen(), extra, {
        region: [0, 730, 720, 170],
        threshold: 0.8
    })
    if (p) {
        click(200, 600);
        sleep(500);
        click(p.x, p.y);
        return p;
    }
    var confirm = images.read("/sdcard/Pictures/confirm.png");
    p = findImage(captureScreen(), confirm, {
        region: [0, 516, 720, 300],
        threshold: 0.8
    });
    if (p) {
        click(p.x, p.y);
        return p;
    }
    var choose = images.read("/sdcard/Pictures/choose.png");
    p = findImage(captureScreen(), choose, {
        region: [575, 1135],
        threshold: 0.8
    });
    if (p) {
        click(135, 874);
        sleep(500);
        click(375, 1082);
    }
    return p
}

function checkEnd() {
    var ok = images.read("/sdcard/Pictures/ok.png");
    var p = findImage(captureScreen(), ok, {
        region: [0, 50],
        threshold: 0.8
    });
    return p
}


var TREN_INDEX = 0 // 0 准备 1 战斗 2 结束
var count = 0
var outFlag = true
// 决斗方法
function duel() {
    clearEffect(); // 每次循环先点一下
    outCheck();
    var extra = checkExtra(); // 处理额外事件
    if (extra) {
        return;
    }
    var myTern = canOperate();
    if (myTern) {
        count = 0;
        if (TREN_INDEX == 0) {
            use();
            TREN_INDEX = 1;
            nextSetp();
            return;
        }
        if (TREN_INDEX == 1) {
            attack();
            nextSetp();
            TREN_INDEX = 2;
            return;
        }
    } else {
        count++
        if (count == 3) { // 重置
            count = 0
            TREN_INDEX = 0
        }
    }
    var end = checkEnd();
    if (end) {
        click(end.x, end.y);
    }
}

function startDuelTimer() {
    duelTimer = setInterval(duel, 3000)
}

function stopDuelTimer() {
    clearInterval(duelTimer) // 清除决斗中计时器
    duelTimer = null
}
var duelTimer;
startDuelTimer()
// var indexTimer = setInterval(outCheck, 5000); // 首页进休闲决斗定时器