"ui";
ui.layout(
  <vertical>
    <text padding="10" w="auto" h="auto" text="使用说明，点击以下按钮先打开游戏，进入游戏首页"/>
    <text padding="10" w="auto" h="auto" text="决斗中设置需设置顶部视角模式"/>
    <text padding="10" w="auto" h="auto" text="设置好后打开该软件，点击对应脚本"/>
    <text padding="10" w="auto" h="auto" text="进行授权，提示脚本启动后进入游戏即可"/>
    <button style="Widget.AppCompat.Button.Colored" id="xx" text="休闲"/>
    <button style="Widget.AppCompat.Button.Colored" id="csm" text="传送门"/>
    <button style="Widget.AppCompat.Button.Colored" id="act" text="活动"/>
    <button style="Widget.AppCompat.Button.Colored" id="pause" text="暂停"/>
    <button style="Widget.AppCompat.Button.Colored" id="stop" text="退出"/>
  </vertical>
);

var xx = "./xx.js";
var csm = "./csm.js";
var act = "./act.js";


var execution;
var isSomeTaskRunning = false;

// 休闲决斗脚本执行
ui.xx.on("click", () => {
  if (isSomeTaskRunning) {
    return toastLog('请先停止正在运行中的脚本');
  }
  threads.start(function(){
    isSomeTaskRunning = true;
    toastLog("开始执行休闲决斗脚本");
    sleep(1200);
    execution = engines.execScriptFile(xx);
  });
});
// 传送门决斗脚本执行
ui.csm.on("click", () => {
  if (isSomeTaskRunning) {
    return toastLog('请先停止正在运行中的脚本');
  }
  threads.start(function(){
    isSomeTaskRunning = true;
    toastLog("开始执行传送门决斗脚本");
    sleep(1200);
    execution = engines.execScriptFile(csm);
  });
});
// 活动脚本执行
ui.act.on("click", () => {
  if (isSomeTaskRunning) {
    return toastLog('请先停止正在运行中的脚本');
  }
  threads.start(function(){
    isSomeTaskRunning = true;
    toastLog("开始执行活动决斗脚本");
    sleep(1200);
    execution = engines.execScriptFile(act);
  });
});


// 暂停
ui.pause.on("click", () => {
  if (execution) {
    execution.getEngine().forceStop(); // 停止脚本
    isSomeTaskRunning = false; // 设置值为false
    execution = false;
  }
});

ui.stop.on("click", () => {
  exit();

});