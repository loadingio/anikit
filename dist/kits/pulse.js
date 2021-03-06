// Generated by LiveScript 1.3.1
(function(){
  var easingFit, cubic, anikit, ret;
  if (typeof require != 'undefined' && require !== null) {
    easingFit = require('easing-fit');
    cubic = require('cubic');
    anikit = require('../anikit');
  }
  ret = {
    name: 'pulse',
    type: 'animation',
    edit: {
      decay: {
        name: "Decay",
        type: 'number',
        'default': 3,
        min: 1,
        max: 10,
        step: 1
      },
      scale: {
        name: "Scale",
        type: 'number',
        'default': 0.3,
        min: 0.01,
        max: 1,
        step: 0.01
      }
    },
    preset: {
      pulse: {}
    },
    track: function(t, opt){
      t = 2 * (1 - 1 * t);
      t = t - Math.floor(t);
      return Math.pow(t, opt.decay) * opt.scale + (1 - opt.scale / 2);
    },
    local: {
      prop: function(f, c){
        return {
          transform: "scale(" + f.value + ")"
        };
      },
      value: function(t, c){
        return {
          transform: [t, 0, 0, 0, 0, t, 0, 0, 0, 0, t, 0, 0, 0, 0, 1]
        };
      }
    },
    css: function(opt){
      var ret, this$ = this;
      ret = easingFit.fitToKeyframes(function(it){
        return this$.track(it, opt);
      }, {
        config: opt,
        sampleCount: 100,
        errorThreshold: 0.0001,
        segSampleCount: 100,
        name: opt.name,
        prop: this.local.prop
      });
      return ret;
    },
    js: function(t, opt){
      return this.local.prop({
        value: this.track(t, opt)
      }, opt);
    },
    affine: function(t, opt){
      return this.local.value(this.track(t, opt), opt);
    }
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ret;
  }
  return ret;
})();