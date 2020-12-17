import {
  callActions,
  isIndex,
  isInxx,
  isxx,
  needClick,
  isIncsm
} from '../common/utils'

/**
 * 首页check
 * @param {"xx"|"csm"} type 自动执行类型
 */
export function outCheck(type){
  return type === 'xx' ?
    xxOutCheck() :
    csmOutCheck()
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
  var capture = captureScreen()
  var p = isIndex(capture)
  if (p) {
    callActions(() => click(100, 1238), 2, 500)
    return p
  }
  // todo check juedou 
  p = isIncsm(capture)
  if (p) {
    click(p.x, p.y)
    return
  }
  p = needClick(capture) // 默认循环，自动点击按钮
  if (p) {
    click(p.x, p.y)
    return
  }
}