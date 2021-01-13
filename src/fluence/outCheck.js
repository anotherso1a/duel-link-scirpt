import {
  callActions,
  isIndex,
  isInxx,
  isxx,
  needClick,
  isAutoduel,
  isIncsm,
  isInact
} from '../common/utils';


/**
 * 休闲决斗入口检查
 */
export function xxOutCheck(){
  var capture = captureScreen();
  var p = isIndex(capture);
  if (p) {
    callActions(() => click(262, 1238), 2, 500); // 点2下nav进入休闲决斗页面
    return p;
  }
  p = isxx(capture); // 下个循环中判断是否已经进入了休闲决斗页面
  if (p) {
    click(p.x, p.y);
    return p;
  }
  p = isInxx(capture); // 下下个循环中检测是否打开了休闲决斗页面
  if (p) {
    click(360, 400); // 开始决斗
    return;
  }
  p = needClick(capture); // 默认循环，自动点击按钮
  if (p) {
    click(p.x, p.y);
    return;
  }
}

/**
 * 传送门外部检查
 */
export function csmOutCheck(){
  var capture = captureScreen();
  var p = isIndex(capture);
  if (p) {
    callActions(() => click(100, 1238), 2, 500);
    return p;
  }
  // todo check juedou 
  p = isIncsm(capture);
  if (p) {
    click(p.x, p.y);
    return;
  }
  p = needClick(capture); // 默认循环，自动点击按钮
  if (p) {
    click(p.x, p.y);
    return;
  }
}

/**
 * 蓝神活动执行脚本外部检查
 */
export function actOutCheck(){
  var capture = captureScreen();
  var p = isIndex(capture);
  if (p) {
    click(360, 360);
    return p;
  }

  p = isInact(capture);
  if (p) {
    // click(p.x,p.y) // 本来应该这样，但是决斗会动，有时候会判断失败
    click(352, 1169);
    sleep(500);
    click(352, 1061);
    sleep(500);
    click(352, 942);
    return;
  }
  // 点自动决斗
  p = isAutoduel(capture);
  if (p) {
    click(p.x, p.y);
    return;
  }
  p = needClick(capture); // 默认循环，自动点击按钮
  if (p) {
    click(p.x, p.y);
    return;
  }
}

/**
 * 鲨鱼活动
 */
// export function actOutCheck(){
//   var capture = captureScreen();
//   var p = isIndex(capture);
//   if (p) {
//     callActions(() => click(100, 1238), 2, 500);
//     return p;
//   }
//   // todo check juedou 
//   p = isIncsm(capture);
//   if (p) {
//     click(p.x, p.y);
//     sleep(500); // 睡一下，有可能会被外部的人给中断
//     click(531, 729); // 点击确定
//     return;
//   }
//   p = needClick(capture); // 默认循环，自动点击按钮
//   if (p) {
//     click(p.x, p.y);
//   }
// }


/**
 * 刷路人外部检查
 */
export function passengerOutCheck(){
  var capture = captureScreen();
  var p = isIndex(capture);
  if (p) {
    // todo 检查路人，点击路人
    // click(360, 360);
    return p;
  }

  // 判断自动决斗按钮，点击，并return

  p = needClick(capture); // 默认循环，自动点击按钮
  if (p) {
    click(p.x, p.y);
    return;
  }
}