// Generated by LiveScript 1.3.1
var easingFit, cubic, anikit, easing, ret;
easingFit = require('easing-fit');
cubic = require('cubic');
anikit = require('../anikit');
easing = require('../easing');
ret = {
  name: 'bounce-transition',
  type: 'animation',
  preset: {
    "bounce-in-alt": {
      dir: 1,
      count: 3,
      mag: 0.1,
      extrude: 0.5,
      local: {
        sampleCount: 20,
        errorThreshold: 0.001,
        segSampleCount: 1000
      }
    },
    "bounce-out-alt": {
      dir: -1,
      count: 3,
      mag: 0.1,
      local: {
        sampleCount: 20,
        errorThreshold: 0.001,
        segSampleCount: 1000
      }
    },
    "bounce-in": {
      dir: 1,
      count: 4,
      mag: 0.2,
      extrude: 0.5,
      local: {
        sampleCount: 40,
        errorThreshold: 0.0001,
        segSampleCount: 1000
      }
    },
    "bounce-out": {
      dir: -1,
      count: 4,
      mag: 0.2,
      local: {
        sampleCount: 20,
        errorThreshold: 0.001,
        segSampleCount: 1000
      }
    }
  },
  edit: {
    dir: {
      type: 'number',
      'default': 1,
      hidden: true
    },
    count: {
      type: 'number',
      'default': 30,
      min: 0,
      max: 100,
      step: 0.1
    },
    mag: {
      type: 'number',
      'default': 0.3,
      min: 0,
      max: 1,
      step: 0.01
    },
    extrude: {
      type: 'number',
      'default': 0,
      min: 0,
      max: 1,
      step: 0.01
    }
  },
  local: {
    prop: function(f, c){
      var value;
      value = this.value(f.value, c);
      return {
        transform: "matrix(" + anikit.util.m4to3(value.transform).join(',') + ")"
      };
    },
    value: function(t, c){
      t = c.dir > 0
        ? t
        : 1 - t;
      if (c.dir < 0 && t > 1) {
        t = 1;
      }
      t >= 0.01 || (t = 0.01);
      return {
        transform: [t, 0, 0, 0, 0, t, 0, 0, 0, 0, t, 0, 0, 0, 0, 1]
      };
    }
  },
  timing: function(t, opt){
    return 1 - (Math.cos(t * 6.28 * opt.count) * (1 - Math.pow(t, opt.mag)) + (1 - Math.pow(t, opt.mag * (1 - opt.extrude))));
    return 1 - ((1 - Math.exp(t * 5 - 5)) * Math.sin(t * opt.count) * (1 - Math.pow(t, opt.mag)) * Math.max(0, 0.9 - t) * 1.11 + Math.min(Math.pow(2, -t * opt.count), 1));
  },
  css: function(opt){
    var prop, ret, ref$, ref1$, ref2$, this$ = this;
    prop = function(f, c){
      return this$.local.prop(f, c);
    };
    ret = easingFit.fitToKeyframes(function(it){
      return this$.timing(it, opt);
    }, (ref$ = (ref1$ = (ref2$ = import$({}, opt.local) || {}, ref2$.config = opt, ref2$), ref1$.name = opt.name, ref1$), ref$.prop = prop, ref$));
    console.log(ret);
    return ret;
  },
  js: function(t, opt){
    var value;
    value = this.local.value(this.timing(t, opt), opt);
    return {
      transform: "matrix(" + anikit.util.m4to3(value.transform).join(',') + ")"
    };
  }
};
module.exports = ret;
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}