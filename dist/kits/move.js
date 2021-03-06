// Generated by LiveScript 1.3.1
(function(){
  var easingFit, cubic, anikit, move, ret;
  if (typeof require != 'undefined' && require !== null) {
    easingFit = require('easing-fit');
    cubic = require('cubic');
    anikit = require('../anikit');
  }
  move = {
    prop: function(f, c){
      var value;
      value = this.value(f.value, c);
      value.transform = anikit.util.decompose(anikit.util.m4to3(value.transform), c);
      return value;
    },
    value: function(t, c){
      var ret, ref$;
      ret = {
        transform: anikit.util[c.dir % 2 ? 'tx' : 'ty']((c.dir > 2 ? -1 : 1) * (2 * t - ((ref$ = Math.floor(2 * t) * 2) < 2 ? ref$ : 2)) * c.offset / 2)
      };
      if (c.fade) {
        ret.opacity = anikit.util.round((ref$ = Math.abs(t - 0.5) * 10) < 1 ? ref$ : 1);
      }
      return ret;
    }
  };
  ret = {
    name: 'move',
    type: 'animation',
    preset: {
      "move-ltr": import$({
        label: "move (left to right)",
        offset: 100,
        dir: 1
      }, move),
      "move-rtl": import$({
        label: "move (right to left)",
        offset: 100,
        dir: 3
      }, move),
      "move-ttb": import$({
        label: "move (top to bottom)",
        offset: 100,
        dir: 2
      }, move),
      "move-btt": import$({
        label: "move (bottom to top)",
        offset: 100,
        dir: 4
      }, move),
      "move-fade-ltr": import$({
        label: "move faded (left to right)",
        offset: 100,
        dir: 1,
        fade: true
      }, move),
      "move-fade-rtl": import$({
        label: "move faded (right to left)",
        offset: 100,
        dir: 3,
        fade: true
      }, move),
      "move-fade-ttb": import$({
        label: "move faded (top to bottom)",
        offset: 100,
        dir: 2,
        fade: true
      }, move),
      "move-fade-btt": import$({
        label: "move faded (bottom to top)",
        offset: 100,
        dir: 4,
        fade: true
      }, move)
    },
    edit: {
      steep: {
        'default': 0.3,
        type: 'number',
        min: 0.3,
        max: 1,
        step: 0.01
      },
      offset: {
        name: "Move Distance",
        'default': 100,
        type: 'number',
        unit: 'px',
        min: 0,
        max: 1000
      },
      dir: {
        'default': 1,
        type: 'number',
        hidden: true
      },
      unit: {
        'default': 'px',
        type: 'choice',
        values: ["px", "%", ""]
      },
      fade: {
        type: 'boolean',
        'default': false
      }
    },
    timing: function(t, opt){
      return ((2 * t + 1) % 2 - 1) * 0.5 + 0.5;
    },
    css: function(opt){
      var ref$;
      return easingFit.toKeyframes([
        {
          percent: 0,
          value: 0
        }, {
          percent: 40,
          value: 0.4
        }, {
          percent: 49.99999,
          value: 0.4999999
        }, {
          percent: 50,
          value: 0.5
        }, {
          percent: 50.00001,
          value: 0.5000001
        }, {
          percent: 60,
          value: 0.6
        }, {
          percent: 100,
          value: 1
        }
      ], (ref$ = {
        prop: function(f, c){
          return move.prop(f, c);
        },
        config: opt
      }, ref$.name = opt.name, ref$));
    },
    js: function(t, opt){
      return opt.prop({
        value: t
      }, opt);
    },
    affine: function(t, opt){
      return opt.value(t, opt);
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