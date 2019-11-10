// Generated by LiveScript 1.3.1
(function(){
  var easingFit, cubic, anikit, ret;
  if (typeof require != 'undefined' && require !== null) {
    easingFit = require('easing-fit');
    cubic = require('cubic');
    anikit = require('../anikit');
  }
  ret = {
    name: 'float',
    type: 'animation',
    preset: {
      float: {}
    },
    edit: {
      steep: {
        'default': 0.4,
        type: 'number',
        min: 0,
        max: 1,
        step: 0.01
      },
      offset: {
        name: "Float Height",
        'default': 15,
        type: 'number',
        unit: 'px',
        min: 0,
        max: 1000
      },
      zoom: {
        name: "Min Scale",
        'default': 0.7,
        type: 'number',
        min: 0,
        max: 1,
        step: 0.01
      },
      shadow_offset: {
        name: "Shadow offset",
        'default': 23,
        type: 'number',
        unit: 'px',
        min: 0,
        max: 1000
      },
      shadow_blur: {
        name: "Shadow Blur",
        'default': 5,
        type: 'number',
        unit: 'px',
        min: 0,
        max: 100
      },
      shadow_expand: {
        name: "Shadow Expand",
        'default': -15,
        type: 'number',
        unit: 'px',
        min: -1000,
        max: 1000
      },
      unit: {
        'default': 'px',
        type: 'choice',
        values: ["px", "%", ""]
      }
    },
    css: function(c){
      return "@keyframes " + c.name + " {\n  0% {\n    animation-timing-function: cubic-bezier(0," + c.steep + "," + (1 - c.steep) + ",1);\n    transform: translate(0,0) scale(" + c.zoom + ");\n    box-shadow: 0 0 0 rgba(0,0,0,.3);\n  }\n  50% {\n    animation-timing-function: cubic-bezier(" + c.steep + ",0,1," + (1 - c.steep) + ");\n    transform: translate(0," + (-c.offset) + c.unit + ") scale(1);\n    box-shadow: 0 " + c.shadow_offset + c.unit + " " + c.shadow_blur + c.unit + " " + c.shadow_expand + c.unit + " rgba(0,0,0,.2)\n  }\n  100% {\n    transform: translate(0,0) scale(" + c.zoom + ");\n    box-shadow: 0 0 0 rgba(0,0,0,.3)\n  }\n} ";
    },
    timing: function(t, opt){
      var p1, p2;
      p1 = [0, opt.steep, 1 - opt.steep, 1];
      p2 = [opt.steep, 0, 1, 1 - opt.steep];
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
      return 2 * (0.5 - Math.abs(t - 0.5));
    },
    js: function(t, opt){
      t = this.timing(t, opt);
      return {
        transform: "translate(0," + t * -opt.offset + opt.unit + ") scale(" + (t * (1 - opt.zoom) + opt.zoom) + ")"
      };
    },
    affine: function(t, opt){
      var s, ty;
      t = this.timing(t, opt);
      s = t * (1 - opt.zoom) + opt.zoom;
      ty = t * -opt.offset;
      return {
        transform: [s, 0, 0, 0, 0, s, 0, -ty, 0, 0, s, 0, 0, 0, 0, 1]
      };
    }
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ret;
  }
  return ret;
})();