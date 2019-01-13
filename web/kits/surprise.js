// Generated by LiveScript 1.3.1
var ret;
ret = {
  name: 'surprise',
  preset: {
    surprise: {}
  },
  edit: {
    zoom_min: {
      'default': 0.5,
      type: 'number',
      min: 0,
      max: 10,
      step: 0.1
    },
    zoom_max: {
      'default': 1.0,
      type: 'number',
      min: 0,
      max: 10,
      step: 0.1
    },
    skew: {
      'default': 25,
      type: 'number',
      unit: 'deg',
      min: -90,
      max: 90
    }
  },
  css: function(opt){
    return "@keyframes " + opt.name + " {\n  0% { transform: skewX(0deg) scale(1); }\n  10% { transform: skewX(" + (-opt.skew) + "deg) scale(" + opt.zoom_min + "); }\n  20% { transform: skewX(" + (-opt.skew) + "deg) scale(" + opt.zoom_min + "); }\n  30% { transform: skewX(" + opt.skew + "deg) scale(" + opt.zoom_max + "); }\n  40% { transform: skewX(" + (-opt.skew) + "deg) scale(" + opt.zoom_max + "); }\n  50% { transform: skewX(" + opt.skew + "deg) scale(" + opt.zoom_max + "); }\n  60% { transform: skewX(" + (-opt.skew) + "deg) scale(" + opt.zoom_max + "); }\n  70% { transform: skewX(" + opt.skew + "deg) scale(" + opt.zoom_max + "); }\n  80% { transform: skewX(" + (-opt.skew) + "deg) scale(" + opt.zoom_max + "); }\n  90% { transform: skewX(" + opt.skew + "deg) scale(" + opt.zoom_max + "); }\n  100% { transform: skewX(" + (-opt.skew) + "deg) scale(" + opt.zoom_max + "); }\n}";
  },
  js: function(t, opt){
    var ref$, k1, k2, s1, s2, d, k, s;
    ref$ = [0, 0, opt.zoom_min, opt.zoom_min], k1 = ref$[0], k2 = ref$[1], s1 = ref$[2], s2 = ref$[3];
    d = Math.floor(t * 10);
    if (d === 0) {
      ref$ = [0, -1], k1 = ref$[0], k2 = ref$[1];
    } else if (d === 1) {
      ref$ = [-1, -1], k1 = ref$[0], k2 = ref$[1];
    } else {
      ref$ = [Math.pow(-1, d - 1), Math.pow(-1, d)], k1 = ref$[0], k2 = ref$[1];
    }
    if (d === 0) {
      ref$ = [1, opt.zoom_min], s1 = ref$[0], s2 = ref$[1];
    } else {
      if (d > 1) {
        s2 = opt.zoom_max;
      }
      if (d > 2) {
        s1 = opt.zoom_max;
      }
    }
    t = 10 * t - d;
    k = (k2 - k1) * t + k1;
    s = (s2 - s1) * t + s1;
    return {
      transform: "skewX(" + k * opt.skew + "deg) scale(" + s + ")"
    };
  }
};
module.exports = ret;