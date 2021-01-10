import {
  isInDuel, clearEffect
} from "../common/utils";
import { actOutCheck, csmOutCheck, xxOutCheck } from "./outCheck";
import {
  actDuel
  // xxDuel
} from "./xxDuel";


export var xxFluence = () => {
  if (isInDuel()) {
    actDuel();
  } else {
    xxOutCheck();
  }
  sleep(500);
  clearEffect(); // 不应该开始的时候触发，应该结束的时候点
};

export var csmFluence = () => {
  if (isInDuel()) {
    actDuel();
  } else {
    csmOutCheck();
  }
  sleep(500);
  clearEffect();
};

// 龙亚活动脚本
// export var actFluence = () => {
//   if (isInDuel()) {
//     actDuel();
//   } else {
//     actOutCheck();
//   }
//   sleep(500);
//   clearEffect();
// };

// 活动脚本
export var actFluence = () => {
  if (isInDuel()) {
    actDuel();
  } else {
    actOutCheck();
  }
  sleep(500);
  clearEffect();
};