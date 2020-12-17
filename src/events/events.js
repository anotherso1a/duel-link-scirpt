export var EventBus = events.emitter()


export function bindEvents(type, listener){
  EventBus.addListener(type, listener)
}

export function removeEvents(type, listener){
  EventBus.removeListener(type, listener)
}

export function emit(type, payload){
  EventBus.emit(type, payload)
}

export function clearEvents(type){
  EventBus.removeAllListeners(type)
}
