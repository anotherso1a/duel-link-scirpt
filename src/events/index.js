import {
  GlobalTimer
} from '../common/timer'
import {
  xxFluence
} from '../fluence'
import {
  bindEvents
} from './events'


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