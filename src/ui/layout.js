import { stopAll } from "../common/utils";
import { emit } from "../events/events";

"ui";
ui.layout(
  <vertical>
    <button style="Widget.AppCompat.Button.Colored" id="xx" text="休闲"/>
    <button style="Widget.AppCompat.Button.Colored" id="csm" text="传送门"/>
    <button style="Widget.AppCompat.Button.Colored" id="hide" text="隐藏"/>
    <button style="Widget.AppCompat.Button.Colored" id="pause" text="暂停"/>
    <button style="Widget.AppCompat.Button.Colored" id="stop" text="退出"/>
  </vertical>
);


// bindings
ui.xx.click(function(){
  // emit('xx') // 开始休闲决斗脚本
  toast('休闲决斗脚本已启动')
})
ui.csm.click(function(){
  toast('chuansongmen')
})

ui.pause.click(function(){
  // emit('xxstop') // 停止休闲决斗脚本
  toast('脚本已停止')
})


// ui.stop.click(stopAll)
