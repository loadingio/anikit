// Generated by LiveScript 1.3.1
(function(){
  var easingFit, cubic, anikit, ret;
  if (typeof require != 'undefined' && require !== null) {
    easingFit = require('easing-fit');
    cubic = require('cubic');
    anikit = require('../anikit');
  }
  ret = {
    name: 'spin',
    type: 'animation',
    preset: {
      "coin-h": {
        name: "coin (horizontally)",
        cycle: 10,
        dur: 2,
        prop: function(f, c){
          return {
            transform: "rotateY(" + f.value * c.cycle * 360 + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.ry(t * c.cycle * Math.PI * 2)
          };
        }
      },
      "coin-v": {
        name: "coin (vertically)",
        cycle: 10,
        dur: 2,
        prop: function(f, c){
          return {
            transform: "rotateX(" + f.value * c.cycle * 360 + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rx(t * c.cycle * Math.PI * 2)
          };
        }
      },
      "cycle": {
        steep: 0.0,
        cycle: 1,
        prop: function(f, c){
          return {
            transform: "rotate(" + f.value * c.cycle * 360 + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rz(t * c.cycle * Math.PI * 2)
          };
        }
      },
      "cycle-alt": {
        steep: 0.0,
        cycle: -1,
        prop: function(f, c){
          return {
            transform: "rotate(" + f.value * c.cycle * 360 + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rz(t * c.cycle * Math.PI * 2)
          };
        }
      },
      "flip-h": {
        name: "flip (horizontally)",
        cycle: 1,
        flip: true,
        prop: function(f, c){
          return {
            transform: "rotateY(" + f.value * c.cycle * 360 + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.ry(t * c.cycle * Math.PI * 2)
          };
        }
      },
      "flip-v": {
        name: "flip (vertically)",
        cycle: 1,
        flip: true,
        prop: function(f, c){
          return {
            transform: "rotateX(" + f.value * c.cycle * 360 + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rx(t * c.cycle * Math.PI * 2)
          };
        }
      },
      "spin-fast": {
        cycle: 5,
        prop: function(f, c){
          return {
            transform: "rotate(" + f.value * c.cycle * 360 + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rz(t * c.cycle * Math.PI * 2)
          };
        }
      },
      spin: {
        cycle: 1,
        prop: function(f, c){
          return {
            transform: "rotate(" + f.value * c.cycle * 360 + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rz(t * c.cycle * Math.PI * 2)
          };
        }
      }
    },
    edit: {
      steep: {
        'default': 0.4,
        type: 'number',
        min: 0,
        max: 1,
        step: 0.01
      },
      cycle: {
        'default': 1,
        type: 'number',
        min: -20,
        max: 20,
        step: 1
      },
      flip: {
        'default': false,
        type: 'boolean',
        hidden: true
      },
      unit: {
        'default': 'px',
        type: 'choice',
        values: ["px", "%", ""]
      }
    },
    timing: function(t, opt){
      var p1, p2;
      p1 = [opt.steep, 0, 1, 1 - opt.steep];
      p2 = [0, opt.steep, 1 - opt.steep, 1];
      if (opt.flip) {
        p1 = p2;
      }
      if (t === 0 || t === 1) {
        return t;
      }
      if (t < 0.5) {
        t = cubic.Bezier.y(cubic.Bezier.t(t * 2, p1), p1);
        t = t * 0.5;
      } else {
        t = cubic.Bezier.y(cubic.Bezier.t((t - 0.5) * 2, p2), p2);
        t = t * 0.5 + 0.5;
      }
      return t;
    },
    css: function(opt){
      var local, ref$, ref1$, this$ = this;
      local = {
        errorThreshold: 0.001,
        sampleCount: 20
      };
      return easingFit.fitToKeyframes(function(it){
        return this$.timing(it, opt);
      }, (ref$ = (ref1$ = import$(local, opt.local) || {}, ref1$.config = opt, ref1$), ref$.name = opt.name, ref$.prop = opt.prop, ref$));
    },
    js: function(t, opt){
      return opt.prop({
        value: this.timing(t, opt)
      }, opt);
    },
    affine: function(t, opt){
      return opt.value(this.timing(t, opt), opt);
    }
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ret;
  }
  return ret;
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}