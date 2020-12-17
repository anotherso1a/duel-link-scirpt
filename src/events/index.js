import {
  xxFluence,
  csmFluence
} from '../fluence'
import {
  bindEvents
} from './events'


var Status = {
  xx: false,
  csm: false
}
// 绑定休闲决斗事件
var xxStart = () => {
  Status.xx = true
  while (Status.xx) {
    sleep(3000)
    xxFluence()
  }
}

var xxStop = () => {
  Status.xx = false
}

bindEvents('xx', xxStart)
bindEvents('xxstop', xxStop)

// todo 绑定传送门
var csmStart = () => {
  Status.csm = true
  while (Status.csm) {
    sleep(3000)
    csmFluence()
  }
}

var csmStop = () => {
  Status.csm = false
}

bindEvents('csm', csmStart)
bindEvents('csmstop', csmStop)