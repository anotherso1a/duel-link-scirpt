import { FindImage, getImage, MatchTemplate } from "./actions";

/** 停止所有脚本进程 */
export function stopAll(){
  engines.stopAll();
}

/** 重复连续调用事件 */
export function callActions(fn, repeat, clip){
  while (repeat--) {
    fn();
    sleep(clip);
  }
}


/** 是否在首页 */
export function isIndex(capture){
  var index = getImage("./images/index.png");
  var p = FindImage(capture || captureScreen(), index, {
    region: [620, 116, 100, 110],
    threshold: 0.8
  });

  return p;
}

/** 是否能获取到休闲决斗，二级页面 */
export function isxx(capture){
  var xx = getImage("./images/xx.png");
  var p = FindImage(capture || captureScreen(), xx, {
    region: [0, 518, 720, 140],
    threshold: 0.8
  });

  return p;
}

/** 是否打开了休闲决斗的pannel，和二级页面不同的是此处为顶部识别 */
export function isInxx(capture){
  var xx = getImage("./images/xx.png");
  var p = FindImage(capture || captureScreen(), xx, {
    region: [0, 93, 720, 140],
    threshold: 0.8
  });

  return p;
}

/**
 * 是否在传送门
 */
export function isIncsm(capture){
  var csmdl = getImage("./images/csmdl.png");
  var p = FindImage(capture || captureScreen(), csmdl, {
    region: [161, 1055, 400, 100],
    threshold: 0.8
  });

  return p;
}

/**
 * 是否在活动，该方法只能在活动流程的入口使用
 */
export function isInact(capture){
  var isact = getImage("./images/isact.png");
  var p = FindImage(capture || captureScreen(), isact, {
    threshold: 0.8
  });

  return p;
}

/**
 * 页面上是否有自动决斗的按钮
 */
export function isAutoduel(capture){
  var autoduel = getImage("./images/autoduel.png");
  var p = FindImage(capture || captureScreen(), autoduel, {
    threshold: 0.8
  });

  return p;
}
/**
 * 是否正在自动决斗，有限级最高，有的话除了clearEffect之外不做任何操作
 */
export function isInAutoduel(capture){
  var inauto = getImage("./images/inauto.png");
  var p = FindImage(capture || captureScreen(), inauto, {
    region: [0, 0, 720, 200],
    threshold: 0.8
  });

  return p;
}

/** 页面上是否有按钮需要点击，需要优化，目前编辑卡片也会被点击 */
export function needClick(capture){
  var needclick = getImage("./images/needclick.png");

  var p = FindImage(capture || captureScreen(), needclick, {
    threshold: 0.8
  });


  return p;
}

/** 
 * 每次主循环触发，
 * 空点一下屏幕，
 * 可以触发抽卡和一些点空白处关闭的弹窗
 */
export function clearEffect(){
  click(720, 400); // 点击
}



// 决斗中相关


/**
 * 分支路线
 * 是否发动效果的处理，各种分支选择的处理都放到这里，但是检查多了之后会导致效率变低
 */
export function checkExtra(capture){
  capture = capture || captureScreen();
  // 页面是否有确认按钮，优先判断，有就点
  var confirm = getImage("./images/confirm.png");
  var p = FindImage(capture, confirm, {
    region: [0, 516, 720, 300], 
    threshold: 0.8
  });

  if (p) {
    click(p.x, p.y);
    return p;
  }
  // 选择攻击或守备表示形式
  var extra = getImage("./images/extra.png");
  p = FindImage(capture, extra, {
    region: [0, 730, 720, 170],
    threshold: 0.8
  });

  if (p) {
    click(200, 600);
    sleep(500);
    click(p.x, p.y);
    return p;
  }
  // 是否需要选择，当左下角出现特殊按钮时，有就选择第一个
  var choose = getImage("./images/choose.png");
  p = FindImage(capture, choose, {
    region: [575, 1135],
    threshold: 0.8
  });

  if (p) { // 后续考虑兼容牌组顺序情况，暂时先不管，这个方法耗费时间有点多了
    click(135, 874);
    sleep(500);
    click(375, 1082);
    sleep(500);
    click(375, 1236); // 有骰子或者属性选择的情况，点一下更下面的按钮
    return p;
  }
  var hasback = getImage("./images/hasback.png"); // 返回按钮，对方让你查看卡组时会有这种情况
  p = FindImage(capture, hasback, {
    region: [0, 1183, 100, 100],
    threshold: 0.8
  });
  if (p) {
    click(p.x, p.y);
    return p;
  }
  p = needClick(capture);
  if (p) {
    click(p.x, p.y);
  }
  return p; // 如果都没有触发那就走别的流程
}

/**
 * 判断我方怪兽卡片的位置
 */
export function checkAttack(capture){
  var atk = getImage("./images/atk.png");
  var atk_g = getImage("./images/atk_g.png");
  var res = MatchTemplate(capture || captureScreen(), atk, {
    region: [156, 600, 400, 200],
    max: 3,
    threshold: 0.8
  });
  var res_g = MatchTemplate(capture || captureScreen(), atk_g, {
    region: [156, 600, 400, 200],
    max: 3,
    threshold: 0.8
  });
  for (var i = 0;i < res_g.length;i++) {
    res[res.length + i] = res_g[i];
  }
  var width = atk.getWidth();
  for (var j = 0;j < res.length;j++) {
    res[j] = res[j].point.x + width; // 只保留格式化后的x位置
  }

  return res;
}
/**
 * 对面是否有黄金宫
 */
export function hasGold(capture){
  var gold = getImage("./images/gold.png");
  var p = FindImage(capture || captureScreen(), gold, {
    region: [560, 400, 130, 140],
    threshold: 0.8
  });

  return p;
}
/**
 * 额外卡组是否可用
 */
export function canUseExtra(capture){
  var extra_card = getImage("./images/extra_card.png");
  var p = FindImage(capture || captureScreen(), extra_card, {
    region: [0, 806, 130, 130],
    threshold: 0.8
  });

  return p;
}

/** 是否有跳转至下一个阶段的按钮 */
export function canOperate(capture){
  var indl = getImage("./images/indl.png");
  var p = FindImage(capture || captureScreen(), indl, {
    region: [525, 708, 195, 300],
    threshold: 0.8
  });

  return p;
}

/** 跳转到下一阶段，应在canOperate识别到之后才能调用 */
export function nextStep(){
  click(661, 815);
  sleep(500);
  click(661, 815);
}

/** 
 * 重置视角，
 * 因为攻击的过程中可能会拖动屏幕导致元素位置改变，
 * 使用该方法进行位置还原，
 * 需要优化
 */
export function resetPosition(){
  swipe(600, 300, 0, 1280, 200); // 拉到底
  sleep(500);
  swipe(0, 1280, 180, 972, 200); // 复位
}

/**
 * 检查屏幕下方是否有“好”按钮
 * 当有时，说明决斗结束
 * 其实也可以判断“记录”按钮
 */
export function checkEnd(capture){
  var ok = getImage("./images/ok.png");
  var p = FindImage(capture || captureScreen(), ok, {
    region: [0, 50],
    threshold: 0.8
  });

  return p;
}

/**
 * 是否是我放准备阶段
 */
export function isPrepare(capture){
  var prepare = getImage("./images/prepare.png");
  var p = FindImage(capture || captureScreen(), prepare, {
    region: [400, 60, 200, 40],
    threshold: 0.8
  });

  return p;
}

/**
 * 是否是我方战斗阶段
 */
export function isAttack(capture){
  var atk = getImage("./images/attack.png");
  var p = FindImage(capture || captureScreen(), atk, {
    region: [400, 60, 200, 40],
    threshold: 0.8
  });

  return p;
}
/**
 * 是否在决斗中
 */
export function isInDuel(capture){
  var induel = getImage("./images/induel.png");
  var p = FindImage(capture || captureScreen(), induel, {
    region: [445, 19, 100, 40],
    threshold: 0.8
  });

  return p;
}