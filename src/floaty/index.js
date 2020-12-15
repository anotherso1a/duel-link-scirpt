import { stopAll } from "../common/utils";
import { emit } from "../events/events";

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
);

var floatPop = floaty.rawWindow(
  <frame id="show" w="80px" h="80px" bg="#80000000" text="显示选项"></frame>
)

// exports 
export function hidePannel(){
  w.setPosition(-500, 300)
}

export function showPannel(){
  w.setPosition(0, 300)
}

// init
floatPop.setTouchable(true);
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
