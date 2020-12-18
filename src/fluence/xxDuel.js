import {
  canOperate,
  checkExtra,
  isAttack,
  nextSetp,
  isPrepare,
  // checkEnd,
  resetPosition,
  clearEffect,
  checkEnd,
  isInAutoduel
} from "../common/utils";

/**
 * 使用卡组的方法
 * @param {boolean} withCover 是否需要覆盖卡功能
 */
export function use(withCover){
  var list = [169, 300, 400]; // 3张手牌的位置
  var startY = 1200; // 起手位置
  var endY = 800; // 结束位置

  function useCard(){
    var i = list.length;
    var useFlag = false;
    while (i--) {
      var x = list[i];
      swipe(x, startY, x, endY, 200); // 使用手牌
      sleep(500);
      if (withCover) {
        click(314, 942); // 可以覆盖
        sleep(500);
        checkExtra(); // 当升级召唤或者特殊召唤会提示弹窗，用这个check一下
        sleep(300); // 睡一下，不睡的话上面的点击会被下面打断
        clearEffect(); // 可能会点击到覆盖的牌，提示信息后会导致下一回合按钮隐藏，在这里消除一下影响
      } else {
        click(274, 942); // 发动或召唤
      }
      
      sleep(500);
      var used = canOperate();
      if (!used) { // 按钮消失说明使用成功
        useFlag = true;
        // 走分支路线，判断是否需要装备，升级等
        sleep(1000);
        var ex = checkExtra();
        while (ex) { // 持续跟进
          sleep(1000);
          ex = checkExtra();
        }
        break; // 中断，该方法每次只使用一张牌
      }
    }
    // 流程走完发现没用上牌，说明无牌可用
    // 返回是否用过牌
    return useFlag;
  }
  var tryTimes = 0;
  while (useCard()) {
    tryTimes++;
    if (tryTimes > 6) break; // 有时候这个流程会陷入死循环，加一个判断跳出一下
    // 持续阻断使用牌
    sleep(1000); // 中间睡一秒
  }
}

export function attack(){
  var list = [502, 207, 361]; // 中 左 右
  var startY = 725;
  var endY = 485;
  var endX = 356;
  var i = list.length;
  var attackFlag = false;
  while (i--) {
    var x = list[i];
    sleep(300);
    resetPosition();
    sleep(1000);
    swipe(x, startY, endX, endY, 200); // 攻击
    sleep(300);
    while (!canOperate()) {
      // 如果不能操作说明正在攻击
      attackFlag = true;
      // 如果是最后一击，那这个按钮也出不来了，在此判断一下
      var p = checkEnd();
      if (p) {
        click(p.x, p.y);
        return;
      }
      // 也有可能是有魔法或陷阱卡可以发动
      while (checkExtra()) {
        sleep(1000); // 每1s检查一下是否有其他卡片效果发动
      }
      sleep(1000); // 检查完后过1s再检查下能操作了不
    }
  }
  // 是否攻击过
  return attackFlag;
}

/**
 * 只在决斗中才会执行
 * 外层做前置判断
 */
export function xxDuel(){
  while (checkExtra()) {
    sleep(1000); // 有则持续跟进
  } // 通常额外事件检查，避免阻塞
  var capture = captureScreen(); // 取截图
  if (isAttack(capture)) { // 若符合判断则调用并中断，不符合条件则继续判断下一个流程
    // 战斗阶段
    attack();
    return nextSetp();
  }
  if (isPrepare(capture)) { // 准备阶段
    use();
    return nextSetp();
  }
}


/**
 * 活动决斗
 */
export function actDuel(){
  while (checkExtra()) {
    sleep(1000); // 有则持续跟进
  } // 通常额外事件检查，避免阻塞
  var capture = captureScreen(); // 取截图
  if (isInAutoduel(capture)) return; // 如果自动决斗，不管
  if (isAttack(capture)) { // 若符合判断则调用并中断，不符合条件则继续判断下一个流程
    // 战斗阶段
    attack();
    return nextSetp();
  }
  if (isPrepare(capture)) { // 准备阶段
    use(true);
    return nextSetp();
  }
}