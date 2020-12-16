/** 停止所有脚本进程 */
export function stopAll() {
  engines.stopAll()
}

/** 重复连续调用事件 */
export function callActions(fn, repeat, clip) {
  while (repeat--) {
    fn()
    sleep(clip)
  }
}


/** 是否在首页 */
export function isIndex(capture) {
  var index = images.read("/sdcard/Pictures/index.png");
  var p = findImage(capture || captureScreen(), index, {
    region: [620, 116, 100, 110],
    threshold: 0.8
  });
  index.recycle()
  return p;
}

/** 是否能获取到休闲决斗，二级页面 */
export function isxx(capture) {
  var xx = images.read("/sdcard/Pictures/xx.png");
  var p = findImage(capture || captureScreen(), xx, {
    region: [0, 518, 720, 140],
    threshold: 0.8
  });
  xx.recycle()
  return p
}

/** 是否打开了休闲决斗的pannel，和二级页面不同的是此处为顶部识别 */
export function isInxx(capture) {
  var xx = images.read("/sdcard/Pictures/xx.png");
  var p = findImage(capture || captureScreen(), xx, {
    region: [0, 93, 720, 140],
    threshold: 0.8
  });
  xx.recycle()
  return p
}

/**
 * 是否在传送门
 */
export function isIncsm(capture){
  var csmdl = images.read("/sdcard/Pictures/csmdl.png");
  var p = findImage(capture || captureScreen(), csmdl, {
    region: [161, 1055, 400, 100],
    threshold: 0.8
  });
  csmdl.recycle()
  return p
}

/** 页面上是否有按钮需要点击，需要优化，目前编辑卡片也会被点击 */
export function needClick(capture) {
  var needclick = images.read("/sdcard/Pictures/needclick.png");

  var p = findImage(capture || captureScreen(), needclick, {
    threshold: 0.8
  });
  needclick.recycle()

  return p
}

/** 
 * 每次主循环触发，
 * 空点一下屏幕，
 * 可以触发抽卡和一些点空白处关闭的弹窗
 */
export function clearEffect() {
  click(720, 250) // 点击
}



// 决斗中相关


/**
 * 分支路线
 */
export function checkExtra(capture) {
  capture = capture || captureScreen()
  // 页面是否有确认按钮，优先判断，有就点
  var confirm = images.read("/sdcard/Pictures/confirm.png");
  var p = findImage(capture, confirm, {
    region: [0, 516, 720, 300],
    threshold: 0.8
  });
  confirm.recycle()
  if (p) {
    click(p.x, p.y);
    return p;
  }
  // 选择攻击或守备表示形式
  var extra = images.read("/sdcard/Pictures/extra.png");
  p = findImage(capture, extra, {
    region: [0, 730, 720, 170],
    threshold: 0.8
  })
  extra.recycle()
  if (p) {
    click(200, 600);
    sleep(500);
    click(p.x, p.y);
    return p;
  }
  // 是否需要选择，当左下角出现特殊按钮时，有就选择第一个
  var choose = images.read("/sdcard/Pictures/choose.png");
  p = findImage(capture, choose, {
    region: [575, 1135],
    threshold: 0.8
  });
  choose.recycle()
  if (p) {
    click(135, 874);
    sleep(500);
    click(375, 1082);
  }
  return p // 如果都没有触发那就走别的流程
}

/** 是否有跳转至下一个阶段的按钮 */
export function canOperate(capture) {
  var indl = images.read("/sdcard/Pictures/indl.png");
  var p = findImage(capture || captureScreen(), indl, {
    region: [525, 708, 195, 300],
    threshold: 0.8
  });
  indl.recycle()
  return p
}

/** 跳转到下一阶段，应在canOperate识别到之后才能调用 */
export function nextSetp() {
  click(661, 815)
  sleep(500)
  click(661, 815)
}

/** 
 * 重置视角，
 * 因为攻击的过程中可能会拖动屏幕导致元素位置改变，
 * 使用该方法进行位置还原，
 * 需要优化
 */
export function resetPosition() {
  swipe(600, 300, 0, 1280, 200); // 拉到底
  sleep(500);
  swipe(0, 1280, 180, 972, 200); // 复位
}

/**
 * 检查屏幕下方是否有“好”按钮
 * 当有时，说明决斗结束
 * 其实也可以判断“记录”按钮
 */
export function checkEnd(capture) {
  var ok = images.read("/sdcard/Pictures/ok.png");
  var p = findImage(capture || captureScreen(), ok, {
    region: [0, 50],
    threshold: 0.8
  });
  ok.recycle()
  return p
}

/**
 * 是否是我放准备阶段
 */
export function isPrepare(capture) {
  var prepare = images.read("/sdcard/Pictures/prepare.png");
  var p = findImage(capture || captureScreen(), prepare, {
    region: [400, 60, 200, 40],
    threshold: 0.8
  });
  prepare.recycle()
  return p
}

/**
 * 是否是我方战斗阶段
 */
export function isAttack(capture) {
  var atk = images.read("/sdcard/Pictures/attack.png");
  var p = findImage(capture || captureScreen(), atk, {
    region: [400, 60, 200, 40],
    threshold: 0.8
  });
  atk.recycle()
  return p
}
/**
 * 是否在决斗中
 */
export function isInDuel(capture) {
  var induel = images.read("/sdcard/Pictures/induel.png");
  var p = findImage(capture || captureScreen(), induel, {
    region: [445, 19, 100, 40],
    threshold: 0.8
  });
  induel.recycle()
  return p
}