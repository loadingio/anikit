// Generated by LiveScript 1.3.1
(function(){
  var easingFit, cubic, anikit, value, ref$, h, w, a, ret;
  if (typeof require != 'undefined' && require !== null) {
    easingFit = require('easing-fit');
    cubic = require('cubic');
    anikit = require('../anikit');
  }
  value = function(f, c){
    var ref$, x, y;
    ref$ = [0, 0], x = ref$[0], y = ref$[1];
    if (c.dir === 1) {
      y = -f.value;
    }
    if (c.dir === 2) {
      y = f.value;
    }
    if (c.dir === 3) {
      x = f.value;
    }
    if (c.dir === 4) {
      x = -f.value;
    }
    return {
      transform: [1, 0, 0, x * c.height, 0, 1, 0, y * c.height, 0, 0, 1, 0, 0, 0, 0, 1],
      opacity: (ref$ = f.percent * 10) < 1 ? ref$ : 1
    };
  };
  ref$ = [1, 1], h = ref$[0], w = ref$[1];
  a = h / Math.pow(w, 2);
  ret = {
    name: 'throw',
    type: 'animation',
    preset: {
      "throw-ttb-in": {
        name: "throw-in (top to bottom)",
        dir: 2,
        repeat: 1
      },
      "throw-ltr-in": {
        name: "throw-in (left to right)",
        dir: 4,
        repeat: 1
      },
      "throw-rtl-in": {
        name: "throw-in (right to left)",
        dir: 3,
        repeat: 1
      },
      "throw-btt-in": {
        name: "throw-in (bottom to top)",
        dir: 1,
        repeat: 1
      }
    },
    edit: {
      dir: {
        type: 'number',
        'default': 1,
        hidden: true,
        min: 1,
        max: 4,
        step: 1
      },
      count: {
        name: "Bounce Count",
        type: 'number',
        'default': 3,
        min: 1,
        max: 10,
        step: 1
      },
      height: {
        name: "Height",
        type: 'number',
        'default': 20,
        min: 0,
        max: 1000,
        step: 1
      },
      decay: {
        name: "Decay",
        type: 'number',
        'default': 0.3,
        min: 0.01,
        max: 0.99,
        step: 0.01
      },
      unit: {
        'default': 'px',
        type: 'choice',
        values: ["px", "%", ""]
      }
    },
    track: function(t, opt){
      var r, rr, dx, rin, total, x, i$, to$, i, cw, ox, ret;
      r = opt.decay;
      rr = Math.sqrt(r);
      dx = 0.2;
      rin = 2;
      total = 2 * w * (Math.pow(rr, opt.count) - 1) / (rr - 1);
      if (t < dx) {
        return (rin * 2 * h * total * dx / w) * Math.pow(dx - t, 0.5);
      }
      x = (t - dx) * total / (1 - dx);
      for (i$ = 1, to$ = opt.count; i$ <= to$; ++i$) {
        i = i$;
        cw = 2 * w * (Math.pow(rr, i) - 1) / (rr - 1);
        if (x < cw) {
          break;
        }
      }
      ox = 2 * w * (Math.pow(rr, i) - 1) / (rr - 1) - w * Math.pow(rr, i - 1);
      ret = a * Math.pow(x - ox, 2) - h * Math.pow(r, i - 1);
      return ret;
    },
    local: {
      prop: function(f, c){
        var v, m;
        v = value(f, c);
        m = anikit.util.m4to3(v.transform);
        return v.transform = "translate(" + m[4] + c.unit + "," + m[5] + c.unit + ")", v;
      }
    },
    css: function(opt){
      var ret, this$ = this;
      ret = easingFit.fitToKeyframes(function(it){
        return this$.track(it, opt);
      }, {
        config: opt,
        sampleCount: 100,
        errorThreshold: 0.000001,
        segSampleCount: 100,
        name: opt.name,
        prop: this.local.prop
      });
      return ret;
    },
    js: function(t, opt){
      return this.local.prop({
        value: this.track(t, opt),
        percent: t
      }, opt);
    },
    affine: function(t, opt){
      return value({
        value: this.track(t, opt),
        percent: t
      }, opt);
    }
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ret;
  }
  return ret;
})();