// Generated by LiveScript 1.3.1
var ret;
ret = {
  name: 'slide',
  preset: {
    "slide-ltr": {
      errorThreshold: 0.0001,
      sampleCount: 20,
      offset: 200,
      propFunc: function(f, opt){
        return {
          transform: "translate(" + f.value * opt.offset + opt.unit + ",0)",
          opacity: f.value <= -0.8 || f.value >= 0.8 ? 0 : 1
        };
      }
    },
    "slide-rtl": {
      errorThreshold: 0.0001,
      sampleCount: 20,
      offset: -200,
      propFunc: function(f, opt){
        return {
          transform: "translate(" + f.value * opt.offset + opt.unit + ",0)",
          opacity: f.value <= -0.8 || f.value >= 0.8 ? 0 : 1
        };
      }
    },
    "slide-btt": {
      errorThreshold: 0.0001,
      sampleCount: 20,
      offset: -200,
      propFunc: function(f, opt){
        return {
          transform: "translate(0," + f.value * opt.offset + opt.unit + ")",
          opacity: f.value <= -0.8 || f.value >= 0.8 ? 0 : 1
        };
      }
    },
    "slide-ttb": {
      errorThreshold: 0.0001,
      sampleCount: 20,
      offset: 200,
      propFunc: function(f, opt){
        return {
          transform: "translate(0," + f.value * opt.offset + opt.unit + ")",
          opacity: f.value <= -0.8 || f.value >= 0.8 ? 0 : 1
        };
      }
    }
  },
  edit: {
    steep: {
      'default': 0.3,
      type: 'number',
      min: 0.3,
      max: 1
    },
    offset: {
      'default': 200,
      type: 'number',
      unit: 'px',
      min: -2000,
      max: 2000
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
    if (t < 0.5) {
      t = anikit.cubic.Bezier.y(anikit.cubic.Bezier.t(t * 2, p1), p1);
    } else {
      t = anikit.cubic.Bezier.y(anikit.cubic.Bezier.t((t - 0.5) * 2, p2), p2) / 2;
      t = t * 2 - 1;
    }
    return t;
  },
  css: function(opt){
    var this$ = this;
    return anikit.stepToKeyframes(function(it){
      return this$.timing(it, opt);
    }, opt);
  },
  js: function(t, opt){
    return opt.propFunc({
      value: this.timing(t, opt)
    }, opt);
  }
  /* equivalent keyframes */
  /*
  slide(name, dur, rate, offset, func)
    .{name}
      animation: unquote(name) dur linear infinite
    @keyframes {name}
      0%, 100%
        timing-speed-up(rate)
      50%
        timing-speed-down(rate)
      0%
        func(0)
      49.9%
        func(offset)
      50%
        func(-1 * offset)
      100%
        func(0)
  */
};
module.exports = ret;