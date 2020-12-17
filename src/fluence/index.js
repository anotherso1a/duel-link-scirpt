import {
  isInDuel, clearEffect
} from "../common/utils";
import { actOutCheck, csmOutCheck, xxOutCheck } from "./outCheck";
import {
  actDuel,
  xxDuel
} from "./xxDuel";


export var xxFluence = () => {
  clearEffect();
  if (isInDuel()) {
    xxDuel();
  } else {
    xxOutCheck();
  }
};

export var csmFluence = () => {
  clearEffect();
  if (isInDuel()) {
    xxDuel();
  } else {
    csmOutCheck();
  }
};

export var actFluence = () => {
  clearEffect();
  if (isInDuel()) {
    actDuel();
  } else {
    actOutCheck();
  }
};