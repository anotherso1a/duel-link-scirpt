"ui";
auto();
ui.layout(
  <vertical>
    <text padding="10" w="auto" h="auto" text="使用说明，该软件暂时只适合720*1280大小分辨率的屏幕"/>
    <text padding="10" w="auto" h="auto" text="推荐使用模拟器进行挂机，模拟器需设置分辨率为720*1280，dpi需要为2，我试的也不多，雷电模拟器是能满足要求的"/>
    <text padding="10" w="auto" h="auto" text="如需手机使用，可以下载x8沙箱之类的能模拟分辨率的产品，没试过，不知道ok不。"/>
    <text padding="10" w="auto" h="auto" text="需要先进入游戏首页再使用该脚本"/>
    <text padding="10" w="auto" h="auto" text="决斗中设置需设置顶部视角模式，为提升效率以及准确率，强烈建议关闭人物嘲讽"/>
    <text padding="10" w="auto" h="auto" text="设置好后打开该软件，点击对应脚本"/>
    <text padding="10" w="auto" h="auto" text="提示脚本启动后进行屏幕录制授权，之后再进入游戏即可"/>
    <text padding="10" w="auto" h="auto" text="遇到任何问题请加群：616430213"/>
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
    toastLog('脚本已停止');
    isSomeTaskRunning = false; // 设置值为false
    execution = false;
  }
});

ui.stop.on("click", () => {
  exit();

});