// Generated by LiveScript 1.3.1
(function(){
  var easingFit, cubic, anikit, easing, ret;
  if (typeof require != 'undefined' && require !== null) {
    easingFit = require('easing-fit');
    cubic = require('cubic');
    anikit = require('../anikit');
    easing = require('../easing');
  }
  ret = {
    name: 'rubber',
    type: 'animation',
    preset: {
      jingle: {
        count: 7,
        ratio: 0.6,
        delay: 0.1,
        unit: '',
        offset: {
          'default': 10,
          min: -180,
          max: 180,
          step: 1,
          name: "Rotate Amount"
        },
        origin: [0.5, 0, 0.5],
        prop: function(f, c){
          return {
            transform: "rotate(" + f.value * c.offset + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rz(t * c.offset * Math.PI / 180)
          };
        }
      },
      "rubber-v": {
        count: 7,
        ratio: 0.7,
        delay: 0.3,
        unit: '',
        offset: {
          'default': 0.2,
          min: 0.01,
          max: 1,
          step: 0.01,
          name: "Scale Amount"
        },
        prop: function(f, c){
          return {
            transform: "scaleY(" + (1 + f.value * c.offset) + ")"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.sy(1 + t * c.offset)
          };
        }
      },
      "rubber-h": {
        count: 7,
        ratio: 0.7,
        delay: 0.3,
        unit: '',
        offset: {
          'default': 0.2,
          min: 0.01,
          max: 1,
          step: 0.01,
          name: "Scale Amount"
        },
        prop: function(f, c){
          return {
            transform: "scaleX(" + (1 + f.value * c.offset) + ")"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.sx(1 + t * c.offset)
          };
        }
      },
      "shake-v": {
        count: 5,
        ratio: 0.6,
        delay: 0.3,
        unit: 'px',
        offset: {
          'default': 10,
          min: 0,
          max: 500,
          step: 1,
          name: "Move Amount"
        },
        prop: function(f, c){
          return {
            transform: "translate(0," + f.value * c.offset + c.unit + ")"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.ty(t * c.offset)
          };
        }
      },
      "shake-h": {
        count: 5,
        ratio: 0.7,
        delay: 0.3,
        unit: 'px',
        offset: {
          'default': 10,
          min: 0,
          max: 500,
          step: 1,
          name: "Move Amount"
        },
        prop: function(f, c){
          return {
            transform: "translate(" + f.value * c.offset + c.unit + ",0)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.tx(t * c.offset)
          };
        }
      },
      tick: {
        count: 7,
        ratio: 0.7,
        delay: 0.3,
        unit: "",
        offset: {
          'default': 20,
          min: -180,
          max: 180,
          step: 1,
          name: "Rotate Amount"
        },
        prop: function(f, c){
          return {
            transform: "rotate(" + f.value * c.offset + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rz(t * c.offset * Math.PI / 180)
          };
        }
      },
      smash: {
        count: 4,
        ratio: 0,
        delay: 0.5,
        unit: "",
        offset: {
          'default': 30,
          min: -180,
          max: 180,
          step: 1,
          name: "Rotate Amount"
        },
        local: {
          sampleCount: 20,
          errorThreshold: 0.001
        },
        prop: function(f, c){
          return {
            transform: "rotate(" + f.value * c.offset + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.rz(t * c.offset * Math.PI / 180)
          };
        }
      },
      "jelly-alt": {
        count: 7,
        ratio: 0.7,
        delay: 0.3,
        unit: "",
        offset: {
          'default': 10,
          min: -180,
          max: 180,
          step: 1,
          name: "Rotate Amount"
        },
        prop: function(f, c){
          return {
            transform: "skewX(" + f.value * c.offset + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: anikit.util.kx(t * c.offset * Math.PI / 180)
          };
        }
      },
      jelly: {
        count: 5,
        ratio: 0.6,
        delay: 0.3,
        unit: 'px',
        offset: {
          'default': 10,
          min: -180,
          max: 180,
          step: 1,
          name: "Rotate Amount"
        },
        prop: function(f, c){
          return {
            transform: "translate(" + f.value * -c.offset + c.unit + ",0) skewX(" + f.value * c.offset + "deg)"
          };
        },
        value: function(t, c){
          return {
            transform: [1, -Math.tan(t * c.offset * Math.PI / 180), 0, t * -c.offset, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
          };
        }
      },
      damage: {
        count: 10,
        ratio: 0.8,
        delay: 0.2,
        unit: "",
        offset: {
          'default': 1,
          min: 0,
          max: 1,
          step: 0.01,
          name: "Amount"
        },
        prop: function(f, c){
          return {
            opacity: 1 - f.value * c.offset
          };
        },
        value: function(t, c){
          return {
            opacity: 1 - t * c.offset
          };
        }
      }
    },
    edit: {
      count: {
        name: "Bounce Count",
        'default': 10,
        type: 'number',
        min: 0,
        max: 50
      },
      offset: {
        'default': 1,
        type: 'number',
        min: 0,
        max: 100,
        step: 0.01,
        unit: 'px'
      },
      ratio: {
        name: "Decay",
        'default': 0.8,
        type: 'number',
        min: 0,
        max: 1,
        step: 0.01
      },
      delay: {
        name: "Prepare Time",
        'default': 0.2,
        type: 'number',
        min: 0,
        max: 1,
        step: 0.01
      },
      unit: {
        'default': 'px',
        type: 'choice',
        values: ["px", "%", ""]
      }
    },
    timing: function(t, opt){
      var len, idx, v1, v2;
      if (t < opt.delay) {
        return t / opt.delay;
      }
      len = (1 - opt.delay) / opt.count;
      idx = Math.floor((t - opt.delay) / len);
      t = (t - (idx * len + opt.delay)) / len;
      t = easing.js.easeOutQuad(t);
      v1 = Math.pow(opt.ratio, idx) * Math.pow(-1, idx);
      v2 = Math.pow(opt.ratio, idx + 1) * Math.pow(-1, idx + 1);
      return (v2 - v1) * t + v1;
    },
    css: function(opt){
      var ref$, ref1$, this$ = this;
      return easingFit.fitToKeyframes(function(it){
        return this$.timing(it, opt);
      }, (ref$ = (ref1$ = import$({}, opt.local) || {}, ref1$.config = opt, ref1$), ref$.name = opt.name, ref$.prop = opt.prop, ref$));
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