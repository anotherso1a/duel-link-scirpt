import './common/pre'
import './events'
// import './ui/layout'
import { emit } from './events/events';
sleep(3000)
emit('csm')
toast('传送门斗脚本已开启')