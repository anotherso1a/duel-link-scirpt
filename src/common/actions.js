import { CACHED_IMG, RATIO } from "./pre";

// export function Swipe(x, y, dx, dy, time){
//   return swipe(x * RATIO, y * RATIO, dx * RATIO, dy * RATIO, time)
// }

// export function Click(x, y){
//   return click(x * RATIO, y * RATIO)
// }

export function FindImage(image, tpl, options){
  if (options.region && options.region.length) {
    for (var i = 0;i < options.region.length;i++) {
      options.region[i] = options.region[i] * RATIO;
    }
  }
  var p = findImage(image, tpl, options);
  if (p) {
    p.x = p.x / (RATIO * RATIO);
    p.y = p.y / (RATIO * RATIO);
  }
  return p;
}

export function MatchTemplate(image, tpl, options){
  if (options.region && options.region.length) {
    for (var i = 0;i < options.region.length;i++) {
      options.region[i] = options.region[i] * RATIO;
    }
  }
  var res = images.matchTemplate(image, tpl, options);
  res.matches.forEach(p => {
    p.x = p.x / (RATIO * RATIO);
    p.y = p.y / (RATIO * RATIO);
  });
  return res.matches;
}

export function getImage(path){
  if (CACHED_IMG[path]) {
    return CACHED_IMG[path];
  }
  var img = images.read(path);
  CACHED_IMG[path] = images.scale(img, RATIO, RATIO);
  return CACHED_IMG[path];
}
