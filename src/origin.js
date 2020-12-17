/* eslint-disable */
auto()
"ui"
requestScreenCapture()
setScreenMetrics(720, 1280)

var __timer = setInterval(() => {}, 3000) // 维持脚本

var GlobalTimer = {
  xxTimer: null, // 休闲timer
  csmTimer: null // 传送门timer
} // 全局timer

/** 停止所有脚本进程 */
function stopAll(){
  engines.stopAll()
}

/** 重复连续调用事件 */
function callActions(fn, repeat, clip){
  while (repeat--) {
    fn()
    sleep(clip)
  }
}


/** 是否在首页 */
function isIndex(capture){
  var index = images.read("/sdcard/Pictures/index.png")
  var p = findImage(capture || captureScreen(), index, {
    region: [620, 116, 100, 110],
    threshold: 0.8
  })
  index.recycle()
  return p
}

/** 是否能获取到休闲决斗，二级页面 */
function isxx(capture){
  var xx = images.read("/sdcard/Pictures/xx.png")
  var p = findImage(capture || captureScreen(), xx, {
    region: [0, 518, 720, 140],
    threshold: 0.8
  })
  xx.recycle()
  return p
}

/** 是否打开了休闲决斗的pannel，和二级页面不同的是此处为顶部识别 */
function isInxx(capture){
  var xx = images.read("/sdcard/Pictures/xx.png")
  var p = findImage(capture || captureScreen(), xx, {
    region: [0, 93, 720, 140],
    threshold: 0.8
  })
  xx.recycle()
  return p
}

/** 页面上是否有按钮需要点击，需要优化，目前编辑卡片也会被点击 */
function needClick(capture){
  var needclick = images.read("/sdcard/Pictures/needclick.png")

  var p = findImage(capture || captureScreen(), needclick, {
    threshold: 0.8
  })

  needclick.recycle()

  return p
}

/** 
 * 每次主循环触发，
 * 空点一下屏幕，
 * 可以触发抽卡和一些点空白处关闭的弹窗
 */
function clearEffect(){
  click(720, 250) // 点击
}



// 决斗中相关


/**
 * 分支路线
 */
function checkExtra(capture){
  capture = capture || captureScreen()
  // 页面是否有确认按钮，优先判断，有就点
  var confirm = images.read("/sdcard/Pictures/confirm.png")
  var p = findImage(capture, confirm, {
    region: [0, 516, 720, 300],
    threshold: 0.8
  })
  confirm.recycle()
  if (p) {
    click(p.x, p.y)
    return p
  }
  // 选择攻击或守备表示形式
  var extra = images.read("/sdcard/Pictures/extra.png")
  p = findImage(capture, extra, {
    region: [0, 730, 720, 170],
    threshold: 0.8
  })
  extra.recycle()
  if (p) {
    click(200, 600)
    sleep(500)
    click(p.x, p.y)
    return p
  }
  // 是否需要选择，当左下角出现特殊按钮时，有就选择第一个
  var choose = images.read("/sdcard/Pictures/choose.png")
  p = findImage(capture, choose, {
    region: [575, 1135],
    threshold: 0.8
  })
  if (p) {
    click(135, 874)
    sleep(500)
    click(375, 1082)
  }
  choose.recycle()
  return p // 如果都没有触发那就走别的流程
}

/** 是否有跳转至下一个阶段的按钮 */
function canOperate(capture){
  var indl = images.read("/sdcard/Pictures/indl.png")
  var p = findImage(capture || captureScreen(), indl, {
    region: [525, 708, 195, 300],
    threshold: 0.8
  })
  indl.recycle()
  return p
}

/** 跳转到下一阶段，应在canOperate识别到之后才能调用 */
function nextSetp(){
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
function resetPosition(){
  swipe(600, 300, 0, 1280, 200) // 拉到底
  sleep(500)
  swipe(0, 1280, 180, 972, 200) // 复位
}

/**
 * 检查屏幕下方是否有“好”按钮
 * 当有时，说明决斗结束
 * 其实也可以判断“记录”按钮
 */
function checkEnd(capture){
  var ok = images.read("/sdcard/Pictures/ok.png")
  var p = findImage(capture || captureScreen(), ok, {
    region: [0, 50],
    threshold: 0.8
  })
  ok.recycle()
  return p
}

/**
 * 是否是我放准备阶段
 */
function isPrepare(capture){
  var prepare = images.read("/sdcard/Pictures/prepare.png")
  var p = findImage(capture || captureScreen(), prepare, {
    region: [400, 60, 200, 40],
    threshold: 0.8
  })
  prepare.recycle()
  return p
}

/**
 * 是否是我方战斗阶段
 */
function isAttack(capture){
  var atk = images.read("/sdcard/Pictures/attack.png")
  var p = findImage(capture || captureScreen(), atk, {
    region: [400, 60, 200, 40],
    threshold: 0.8
  })
  atk.recycle()
  return p
}
/**
 * 是否在决斗中
 */
function isInDuel(capture){
  var induel = images.read("/sdcard/Pictures/induel.png")
  var p = findImage(capture || captureScreen(), induel, {
    region: [445, 19, 100, 40],
    threshold: 0.8
  })
  induel.recycle()
  return p
}

var EventBus = events.emitter()


function bindEvents(type, listener){
  EventBus.addListener(type, listener)
}

function removeEvents(type, listener){
  EventBus.removeListener(type, listener)
}

function emit(type, payload){
  EventBus.emit(type, payload)
}

function clearEvents(type){
  EventBus.removeAllListeners(type)
}

var w = floaty.window(
  <frame bg="#80000000">
    <vertical>
      <button style="Widget.AppCompat.Button.Colored" id="xx" text="休闲"/>
      <button style="Widget.AppCompat.Button.Colored" id="csm" text="传送门"/>
      <button style="Widget.AppCompat.Button.Colored" id="hide" text="隐藏"/>
      <button style="Widget.AppCompat.Button.Colored" id="pause" text="暂停"/>
      <button style="Widget.AppCompat.Button.Colored" id="stop" text="退出"/>
    </vertical>
  </frame>
)
  
var floatPop = floaty.window(
  <frame id="show" w="80px" h="80px" bg="#80000000" text="显示选项"></frame>
)
  
function hidePannel(){
  w.setPosition(-500, 300)
}
  
function showPannel(){
  w.setPosition(0, 300)
}
  
// init
floatPop.setPosition(0, 220)
  
floatPop.show.click(showPannel)
  
  
// bindings
w.xx.click(function(){
  emit('xx') // 开始休闲决斗脚本
  toast('休闲决斗脚本已启动')
  hidePannel()
})
w.csm.click(function(){
  toast('chuansongmen')
})
  
w.pause.click(function(){
  emit('xxstop') // 停止休闲决斗脚本
  toast('脚本已停止')
})
  
w.hide.click(hidePannel)
  
w.stop.click(stopAll)
  
  
hidePannel() // init call


/**
 * 首页check
 * @param {"xx"|"csm"} type 自动执行类型
 */
function outCheck(type){
  xxOutCheck()
  // return type === 'xx' ?
  //   xxOutCheck() :
  //   csmOutCheck()
}


/**
 * 休闲决斗入口检查
 */
function xxOutCheck(){
  var capture = captureScreen()
  var p = isIndex(capture)
  if (p) {
    callActions(() => click(262, 1238), 2, 500) // 点2下nav进入休闲决斗页面
    return p
  }
  p = isxx(capture) // 下个循环中判断是否已经进入了休闲决斗页面
  if (p) {
    click(p.x, p.y)
    return p
  }
  p = isInxx(capture) // 下下个循环中检测是否打开了休闲决斗页面
  if (p) {
    click(360, 400) // 开始决斗
    return
  }
  p = needClick(capture) // 默认循环，自动点击按钮
  if (p) {
    click(p.x, p.y)
    return
  }
}

/**
 * 传送门外部检查
 */
function csmOutCheck(){
  var p = isIndex()
  if (p) {
    callActions(() => click(80, 1238), 2, 500)
    return p
  }
  // todo check juedou 
}

function use(){
  var list = [169, 300, 400] // 3张手牌的位置
  var startY = 1200 // 起手位置
  var endY = 800 // 结束位置

  function useCard(){
    var i = list.length
    var useFlag = false
    while (i--) {
      var x = list[i]
      swipe(x, startY, x, endY, 200) // 使用手牌
      sleep(500)
      click(274, 942) // 发动或召唤
      sleep(500)
      var used = canOperate()
      if (!used) { // 按钮消失说明使用成功
        useFlag = true
        // 走分支路线，判断是否需要装备，升级等
        sleep(1000)
        var ex = checkExtra()
        while (ex) { // 持续跟进
          sleep(1000)
          ex = checkExtra()
        }
        break // 中断，该方法每次只使用一张牌
      }
    }
    // 流程走完发现没用上牌，说明无牌可用
    // 返回是否用过牌
    return useFlag
  }
  while (useCard()) {
    // 持续阻断使用牌
    sleep(1000) // 中间睡一秒
  }
}

function attack(){
  var list = [502, 207, 361] // 中 左 右
  var startY = 725
  var endY = 485
  var endX = 356
  var i = list.length
  var attackFlag = false
  while (i--) {
    var x = list[i]
    sleep(300)
    resetPosition()
    sleep(1000)
    swipe(x, startY, endX, endY, 200) // 攻击
    sleep(300)
    while (!canOperate()) {
      // 如果不能操作说明正在攻击
      attackFlag = true
      // 也有可能是有魔法或陷阱卡可以发动
      while (checkExtra()) {
        sleep(1000) // 每1s检查一下是否有其他卡片效果发动
      }
      sleep(1000) // 检查完后过1s再检查下能操作了不
    }
  }
  // 是否攻击过
  return attackFlag
}

/**
 * 只在决斗中才会执行
 * 外层做前置判断
 */
function xxDuel(){
  clearEffect()
  while (checkExtra()) {
    sleep(1000) // 有则持续跟进
  } // 通常额外事件检查，避免阻塞
  var capture = captureScreen() // 取截图
  if (isAttack(capture)) { // 若符合判断则调用并中断，不符合条件则继续判断下一个流程
    // 战斗阶段
    attack()
    return nextSetp()
  }
  if (isPrepare(capture)) { // 准备阶段
    use()
    return nextSetp()
  }
  var end = checkEnd(capture)
  if (end) {
    click(end.x, end.y)
  }
}

var xxFluence = () => {
  if (isInDuel()) {
    xxDuel()
  } else {
    outCheck('xx')
  }
}


// 绑定休闲决斗事件
const xxStart = () => {
  GlobalTimer.xxTimer && clearInterval(GlobalTimer.xxTimer)
  GlobalTimer.xxTimer = setInterval(xxFluence, 3000)
}

const xxStop = () => {
  GlobalTimer.xxTimer && clearInterval(GlobalTimer.xxTimer)
  GlobalTimer.xxTimer = null
}

bindEvents('xx', xxStart)
bindEvents('xxstop', xxStop)

// todo 绑定传送门