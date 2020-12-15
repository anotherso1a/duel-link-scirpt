import {
  outCheck
} from "./outCheck"
import {
  isInDuel, clearEffect
} from "../common/utils";
import {
  xxDuel
} from "./xxDuel";


export var xxFluence = () => {
  clearEffect()
  if (isInDuel()) {
    xxDuel()
  } else {
    outCheck('xx')
  }
}