// import { stopAll } from "../common/utils"
import { emit } from "../events/events"

"ui"
ui.layout(
  <vertical>
    <text padding="10" w="auto" h="auto" text="使用说明，点击以下按钮先打开游戏，进入游戏首页"/>
    <text padding="10" w="auto" h="auto" text="决斗中设置需设置顶部视角模式"/>
    <text padding="10" w="auto" h="auto" text="设置好后打开该软件，点击对应脚本"/>
    <text padding="10" w="auto" h="auto" text="进行授权，提示脚本启动后进入游戏即可"/>
    <button style="Widget.AppCompat.Button.Colored" id="xx" text="休闲"/>
    <button style="Widget.AppCompat.Button.Colored" id="csm" text="传送门"/>
    <button style="Widget.AppCompat.Button.Colored" id="pause" text="暂停"/>
    <button style="Widget.AppCompat.Button.Colored" id="stop" text="退出"/>
  </vertical>
)


// bindings
ui.xx.click(function(){
  emit('xx') // 开始休闲决斗脚本
  toast('休闲决斗脚本已启动')
})
ui.csm.click(function(){
  emit('csm') // 开始传送门脚本
  toast('传送门脚本已启动')
})

ui.pause.click(function(){
  emit('xxstop') // 停止休闲决斗脚本
  emit('csmstop') // 停止休闲决斗脚本
  toast('脚本已停止')
})


ui.stop.click(function(){
  engines.stopAll()
})
