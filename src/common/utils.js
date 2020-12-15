/** 停止所有脚本进程 */
export function stopAll(){
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
export function isIndex() {
  var index = images.read("/sdcard/Pictures/index.png");
  var p = findImage(captureScreen(), index, {
      region: [620, 116, 100, 110],
      threshold: 0.8
  });
  return p;
}

/** 是否能获取到休闲决斗，二级页面 */
export function isxx() {
  var xx = images.read("/sdcard/Pictures/xx.png");
  var p = findImage(captureScreen(), xx, {
      region: [0, 518, 720, 140],
      threshold: 0.8
  });
  return p
}

/** 是否打开了休闲决斗的pannel，和二级页面不同的是此处为顶部识别 */
export function isInxx() {
  var xx = images.read("/sdcard/Pictures/xx.png");
  var p = findImage(captureScreen(), xx, {
      region: [0, 93, 720, 140],
      threshold: 0.8
  });
  return p
}

/** 页面上是否有按钮需要点击，需要优化，目前编辑卡片也会被点击 */
export function needClick() {
  var needclick = images.read("/sdcard/Pictures/needclick.png");

  var p = findImage(captureScreen(), needclick, {
      threshold: 0.8
  });

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

/** 是否有跳转至下一个阶段的按钮 */
export function canOperate() {
  var indl = images.read("/sdcard/Pictures/indl.png");
  var p = findImage(captureScreen(), indl, {
      region: [525, 708, 195, 300],
      threshold: 0.8
  });
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
export function checkEnd() {
  var ok = images.read("/sdcard/Pictures/ok.png");
  var p = findImage(captureScreen(), ok, {
      region: [0, 50],
      threshold: 0.8
  });
  return p
}


