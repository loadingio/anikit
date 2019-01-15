// Generated by LiveScript 1.3.1
var ret;
ret = {
  name: 'float',
  preset: {
    float: {}
  },
  edit: {
    steep: {
      'default': 0.4,
      type: 'number',
      min: 0,
      max: 1,
      step: 0.1
    },
    offset: {
      'default': 15,
      type: 'number',
      unit: 'px',
      min: 0,
      max: 1000
    },
    zoom: {
      'default': 0.7,
      type: 'number',
      min: 0,
      max: 1,
      step: 0.1
    },
    shadow_offset: {
      'default': 23,
      type: 'number',
      unit: 'px',
      min: 0,
      max: 1000
    },
    shadow_blur: {
      'default': 5,
      type: 'number',
      unit: 'px',
      min: 0,
      max: 100
    },
    shadow_expand: {
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
  }
};
module.exports = ret;