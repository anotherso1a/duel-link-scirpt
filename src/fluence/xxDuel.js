import {
  canOperate,
  checkExtra,
  isAttack,
  nextStep,
  isPrepare,
  // checkEnd,
  // resetPosition,
  // clearEffect,
  // checkEnd,
  isInAutoduel,
  checkAttack,
  hasGold,
  canUseExtra,
  isInDuel
} from "../common/utils";

/**
 * 主动发动盖卡
 */
export function useCover(){
  var list = [513, 210, 360];
  var i = list.length;
  while (i--) {
    click(list[i], 870);
    sleep(300);
    click(360, 984); // 使用效果
    // sleep(300); // checkExtra的时间能抵消这个延时，先放在这，兼容下通常怪兽脚本
    // clearEffect();
    var used = canOperate();
    if (!used) { // 按钮消失说明使用成功
      // 走分支路线，判断是否需要装备，升级等
      var ex = checkExtra();
      while (ex) { // 持续跟进
        sleep(1000);
        ex = checkExtra();
      }
    }
    sleep(400);
  }
}

/**
 * 操作额外卡组
 */
export function extraOpt(){
  var p = canUseExtra();
  if (p) {
    click(p.x, p.y);
    sleep(300);
    click(396, 977);
    sleep(1000);
    // 走分支路线，判断是否需要装备，升级等
    while (checkExtra()) { // 持续跟进
      sleep(800);
    }
    return true;
  }
}

/**
 * 使用卡组的方法
 * @param {boolean} withCover 是否需要覆盖卡功能，变相丰富了处理
 */

var USE_LIST = [400, 169, 300]; // 3张手牌的位置
function useCard(withCover){
  var i = USE_LIST.length;
  var useFlag = false;
  while (i--) {
    while (!canOperate()) { // 前置判断一下，不能用牌就阻塞
      if (!isInDuel()) return; // 发现有时候会在外层界面卡在这个循环里面，这里判断一下，不在决斗中的话就退出循环
      checkExtra(); // 判断分支
      sleep(500);
    }
    var x = USE_LIST[i];
    swipe(x, 1200, x, 800, 200); // 使用手牌
    sleep(400);
    var used = canOperate();
    if (withCover) {
      click(323, 977); // 可以覆盖
      sleep(500);
      if (!used) { // 按钮消失说明使用成功，也有可能是对方正在操作
        useFlag = true;
        // 走分支路线，判断是否需要装备，升级等
        while (checkExtra()) { // 持续跟进
          sleep(1000);
        }
        //到这里说明没有可走的分支路线，但是可能是由于对手操作堵塞导致，暂时不影响，因为判断之后进入下一个循环还是会识别阶段信息
        break; // 中断，该方法每次只使用一张牌
      }
    } else {
      click(274, 942); // 发动或召唤
    }
  }
  // 流程走完发现没用上牌，说明无牌可用
  // 返回是否用过牌
  return useFlag;
}

export function use(withCover){
  var tryTimes = 0;
  while (useCard(withCover)) {
    tryTimes++;
    if (tryTimes > 6) break; // 有时候这个流程会陷入死循环，加一个判断跳出一下
    // 持续阻断使用牌
    sleep(1000); // 中间睡一秒
  }
}


function doAtk(list){
  var i = 0;
  var tryTimes = 0;
  var attackFlag = false;
  while (i < list.length) {
    while (!canOperate()) { // 前置判断一下，不能攻击就阻塞
      if (!isInDuel()) return; // 发现有时候会在外层界面卡在这个循环里面，这里判断一下，不在决斗中的话就退出循环
      checkExtra(); // 判断分支
      sleep(500);
    }
    // 这里少滑一点，刚刚能触发攻击就好，不要拖动画面位置
    swipe(list[i], 725, list[i], 615, 300); // 攻击
    sleep(700);
    if (!canOperate()) {
      tryTimes++;
      if (tryTimes > 2) {
        if (!isInDuel()) return; // 发现有时候会在外层界面卡在这个循环里面，这里判断一下，不在决斗中的话就退出循环
      }
      // 如果不能操作说明正在攻击
      attackFlag = true;
      // 也有可能是有魔法或陷阱卡可以发动
      while (checkExtra()) {
        sleep(1000); // 有则持续跟进
      } // 通常额外事件检查，避免阻塞
      return attackFlag;
    }
    if (!attackFlag) { // 考虑可以多次攻击的情况，只有操作攻击无效时，才判定无法攻击
      i++;
    }
  }
  return attackFlag;
}
export function attack(){
  var list = checkAttack(); // 拿到怪兽点位
  if (!list.length) return; // 没有怪兽直接结束
  
  while (doAtk(list)) { // 攻击成功则重新执行
    sleep(1000);
    list = checkAttack(); // 重新识别数据，有时候会撞死
  }
  
  // 是否攻击过
  // return attackFlag;
}

/**
 * 只在决斗中才会执行
 * 外层做前置判断
 * 该方法只能配合通常怪兽+装备卡卡组
 */
export function xxDuel(){
  while (checkExtra()) {
    sleep(1000); // 有则持续跟进
  } // 通常额外事件检查，避免阻塞
  var capture = captureScreen(); // 取截图
  if (isAttack(capture)) { // 若符合判断则调用并中断，不符合条件则继续判断下一个流程
    // 战斗阶段
    attack();
    return nextStep();
  }
  if (isPrepare(capture)) { // 准备阶段
    use();
    return nextStep();
  }
}


/**
 * 活动决斗，可以考虑通用化
 */
export function actDuel(){
  while (checkExtra()) {
    sleep(1000); // 有则持续跟进
  } // 通常额外事件检查，避免阻塞
  var capture = captureScreen(); // 取截图
  if (isInAutoduel(capture)) return; // 如果自动决斗，不管
  if (isAttack(capture)) { // 若符合判断则调用并中断，不符合条件则继续判断下一个流程
    // 战斗阶段
    // 判断黄金宫，有的话直接结束
    if (hasGold()) return nextStep();
    attack();
    return nextStep();
  }
  if (isPrepare(capture)) { // 准备阶段
    use(true);
    while (extraOpt()) {
      sleep(1000);
    }
    return nextStep();
  }
}