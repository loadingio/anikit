// Generated by LiveScript 1.3.1
var easingFit, cubic, easing, kitsList, uuid, ref$, cos, sin, tan, anikit;
easingFit = require('easing-fit');
cubic = require('cubic');
easing = require('./easing');
kitsList = require('./kits-list.gen');
uuid = require('uuid/v4');
ref$ = {
  cos: Math.cos,
  sin: Math.sin,
  tan: Math.tan
}, cos = ref$.cos, sin = ref$.sin, tan = ref$.tan;
anikit = function(name, opt){
  var ref$;
  opt == null && (opt = {});
  ref$ = anikit.get(name, opt), this.mod = ref$.mod, this.config = ref$.config;
  ref$ = [null, uuid()], this.dom = ref$[0], this.id = ref$[1];
  this.setConfig(this.config);
  return this;
};
anikit.prototype = import$(Object.create(Object.prototype), {
  setConfig: function(c){
    var ref$;
    c == null && (c = {});
    import$(this.config, c);
    if (this.dom) {
      this.dom.textContent = this.mod.css((ref$ = import$({}, this.config), ref$.name = this.config.name + "-" + this.id, ref$));
    }
    return this.mod.config = this.config;
  },
  css: function(opt){
    opt == null && (opt = {});
    if (this.mod.css) {
      return this.mod.css(import$(import$({}, this.config), opt));
    } else {
      return {};
    }
  },
  js: function(t, opt){
    opt == null && (opt = this.config);
    if (this.mod.js) {
      return this.mod.js(t, opt);
    } else {
      return {};
    }
  },
  affine: function(t, opt){
    opt == null && (opt = this.config);
    if (this.mod.affine) {
      return this.mod.affine(t, opt);
    } else {
      return {};
    }
  },
  animateJs: function(node, t, opt){
    var that, k, v;
    if (that = node.ldStyle) {
      for (k in that) {
        v = that[k];
        node.style[k] = "";
      }
    }
    node.ldStyle = this.js(t - Math.floor(t));
    return import$(node.style, this.js(t - Math.floor(t)));
  },
  animateThree: function(node, t, opt){
    var values, box, bbox, ref$, wx, wy, wz, nx, ny, nz, m, mat, gmat, opacity;
    values = this.affine(t, opt
      ? import$(import$({}, this.config), opt)
      : this.config);
    box = new THREE.Box3().setFromObject(node);
    node.geometry.computeBoundingBox();
    bbox = node.geometry.boundingBox;
    ref$ = ['x', 'y', 'z'].map(function(it){
      return bbox.max[it] - bbox.min[it];
    }).map(function(d, i){
      return ((values.transformOrigin || [0.5, 0.5, 0.5])[i] - 0.5) * d;
    }), wx = ref$[0], wy = ref$[1], wz = ref$[2];
    ref$ = ['x', 'y', 'z'].map(function(it){
      return (bbox.max[it] + bbox.min[it]) * 0.5;
    }), nx = ref$[0], ny = ref$[1], nz = ref$[2];
    if (nx || ny || nz) {
      m = new THREE.Matrix4();
      m.set(1, 0, 0, -nx, 0, 1, 0, -ny, 0, 0, 1, -nz, 0, 0, 0, 1);
      node.geometry.applyMatrix(m);
      node.repos = m.getInverse(m);
    }
    node.matrixAutoUpdate = false;
    mat = values.transform || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    [3, 7, 11].map(function(it){
      return mat[it] = mat[it] / 40;
    });
    gmat = new THREE.Matrix4().makeTranslation(wx, wy, wz);
    node.matrix.set.apply(node.matrix, mat);
    node.matrix.multiply(gmat);
    node.matrix.premultiply(gmat.getInverse(gmat));
    if (node.repos) {
      node.matrix.premultiply(node.repos);
    }
    opacity = values.opacity != null ? values.opacity : 1;
    if (node.material.uniforms && node.material.uniforms.alpha) {
      return node.material.uniforms.alpha.value = opacity;
    } else {
      node.material.transparent = true;
      return node.material.opacity = opacity;
    }
  },
  animate: function(node, opt){
    var that;
    opt == null && (opt = {});
    opt = import$(import$({}, this.config), opt);
    if (!this.dom) {
      document.body.appendChild(this.dom = document.createElement('style'));
      this.setConfig();
    }
    node.style.animation = this.config.name + "-" + this.id + " " + (opt.dur || 1) + "s " + ((that = opt.repeat) ? that : 'infinite') + " linear forwards";
    return node.style.animationDelay = (opt.delay || 0) + "s";
  },
  statify: function(node){
    return node.style.animation = node.style.animationDelay = "";
  },
  destroy: function(){
    return this.dom.parentNode.removechild(this.dom);
  }
});
import$(anikit, {
  util: {
    m4to3: function(m){
      return [m[0], m[1], m[4], m[5], m[3], -m[7]].map(function(it){
        return easingFit.round(it);
      });
    },
    noise: function(t){
      return (Math.sin(t * 43758.5453) + 1) * 0.5;
    },
    kth: function(n, m, k){
      if (k > n) {
        k = n;
      }
      if (m === 1) {
        return k;
      }
      k = k * m + m - 1;
      while (k >= n) {
        k = k - n + Math.floor((k - n) / (m - 1));
      }
      return k;
    },
    rx: function(t){
      return [1, 0, 0, 0, 0, cos(t), -sin(t), 0, 0, sin(t), cos(t), 0, 0, 0, 0, 1];
    },
    ry: function(t){
      return [cos(t), 0, sin(t), 0, 0, 1, 0, 0, -sin(t), 0, cos(t), 0, 0, 0, 0, 1];
    },
    rz: function(t){
      return [cos(t), sin(t), 0, 0, -sin(t), cos(t), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    },
    tx: function(t){
      return [1, 0, 0, t, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    },
    ty: function(t){
      return [1, 0, 0, 0, 0, 1, 0, -t, 0, 0, 1, 0, 0, 0, 0, 1];
    },
    tz: function(t){
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, t, 0, 0, 0, 1];
    },
    sx: function(t){
      return [t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    },
    sy: function(t){
      return [1, 0, 0, 0, 0, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    },
    sz: function(t){
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, t, 0, 0, 0, 0, 1];
    },
    s: function(t){
      return [t, 0, 0, 0, 0, t, 0, 0, 0, 0, t, 0, 0, 0, 0, 1];
    },
    kx: function(t){
      return [1, -tan(t), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    },
    ky: function(t){
      return [1, 0, 0, 0, tan(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
  },
  get: function(name, opt){
    var mod, config, k, ref$, v, o;
    opt == null && (opt = {});
    mod = this.types[name]
      ? this.mods[this.types[name]]
      : this.mods[name];
    config = {
      name: name,
      dur: 1,
      repeat: 1
    };
    if (mod.preset[name]) {
      for (k in ref$ = mod.edit) {
        v = ref$[k];
        o = mod.preset[name][k];
        if (o && o['default']) {
          import$(mod.edit[k], mod.preset[name][k]);
        }
      }
    }
    for (k in ref$ = mod.edit) {
      v = ref$[k];
      config[k] = v['default'];
    }
    if (mod.preset[name]) {
      for (k in config) {
        v = config[k];
        o = mod.preset[name][k];
        if (typeof o === 'undefined' || (typeof o === 'object' && o['default'] != null)) {
          continue;
        }
        config[k] = o;
      }
      config.prop = (ref$ = mod.preset[name]).prop;
      config.value = ref$.value;
      config.local = ref$.local;
    }
    import$(config, opt);
    return {
      mod: mod,
      config: config
    };
  }
  /* all available mods */,
  mods: kitsList.mods
  /* all available animations, base on mods */,
  types: kitsList.types
});
if (typeof window != 'undefined' && window !== null) {
  window.easing = easing;
  window.anikit = anikit;
  window.easingFit = easingFit;
  window.cubic = cubic;
}
if (typeof module != 'undefined' && module !== null) {
  import$(module.exports, anikit);
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
