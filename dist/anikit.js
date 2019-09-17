// Generated by LiveScript 1.3.1
var easingFit, cubic, easing, kitsList, uuid, GBCR, ref$, cos, sin, tan, anikit;
easingFit = require('easing-fit');
cubic = require('cubic');
easing = require('./easing');
kitsList = require('./kits-list.gen');
uuid = require('uuid/v4');
GBCR = function(n){
  return n.getBoundingClientRect();
};
if (typeof navigator != 'undefined' && navigator !== null) {
  if (/Firefox\/([0-9.]+)/.exec(navigator.userAgent)) {
    GBCR = function(n){
      var box, t;
      box = n.getBoundingClientRect();
      t = getComputedStyle(n).transform;
      t = t.trim().substring(7).replace(/[)]/g, '').split(',');
      if (t.length < 6) {
        t = [1, 0, 0, 1, 0, 0];
      }
      t = t.map(function(it){
        return +it;
      });
      return box.x = box.x + t[4], box.y = box.y + t[5], box;
    };
  }
}
ref$ = {
  cos: Math.cos,
  sin: Math.sin,
  tan: Math.tan
}, cos = ref$.cos, sin = ref$.sin, tan = ref$.tan;
anikit = function(name, opt){
  var ref$;
  opt == null && (opt = {});
  ref$ = anikit.get(name, opt), this.mod = ref$.mod, this.config = ref$.config;
  ref$ = [name, null, uuid()], this.name = ref$[0], this.dom = ref$[1], this.id = ref$[2];
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
  getConfig: function(){
    return this.config;
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
    opt == null && (opt = {});
    if (this.mod.js) {
      return this.mod.js(t, opt = import$(import$({}, this.config), opt));
    }
  },
  affine: function(t, opt){
    opt == null && (opt = {});
    if (this.mod.affine) {
      return this.mod.affine(t, opt = import$(import$({}, this.config), opt));
    }
  },
  getDom: function(){
    if (!this.dom) {
      document.body.appendChild(this.dom = document.createElement('style'));
      this.dom.setAttribute('id', this.config.name + "-" + this.id);
      this.dom.setAttribute('data-anikit', "");
      this.setConfig();
    }
    return this.dom;
  },
  timing: function(t, opt){
    opt == null && (opt = this.config);
    t = t / (opt.dur || 1);
    if (opt.repeat < 0) {
      return t;
    }
    if (opt.repeat && t > opt.repeat) {
      t = 1;
    }
    if (t !== Math.floor(t)) {
      t = t - Math.floor(t);
    }
    return t;
  },
  animateJs: function(node, t, opt){
    var that, k, v;
    opt == null && (opt = {});
    opt = import$(import$({}, this.config), opt);
    if (that = node.ldStyle) {
      for (k in that) {
        v = that[k];
        node.style[k] = "";
      }
    }
    t = this.timing(t, opt);
    node.ldStyle = this.js(t, opt);
    return import$(node.style, node.ldStyle);
  },
  animateThree: function(node, t, opt){
    var values, box, bbox, ref$, wx, wy, wz, nx, ny, nz, m, mat, gmat, opacity;
    opt == null && (opt = {});
    opt = import$(import$({}, this.config), opt);
    t = this.timing(t, opt);
    values = this.affine(t, opt);
    if (!values) {
      return;
    }
    box = new THREE.Box3().setFromObject(node);
    node.geometry.computeBoundingBox();
    bbox = node.geometry.boundingBox;
    ref$ = ['x', 'y', 'z'].map(function(it){
      return bbox.max[it] - bbox.min[it];
    }).map(function(d, i){
      return ((opt.origin || values.transformOrigin || [0.5, 0.5, 0.5])[i] - 0.5) * d;
    }), wx = ref$[0], wy = ref$[1], wz = ref$[2];
    ref$ = ['x', 'y', 'z'].map(function(it){
      return (bbox.max[it] + bbox.min[it]) * 0.5;
    }), nx = ref$[0], ny = ref$[1], nz = ref$[2];
    if ((nx || ny || nz) && !node.repos) {
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
      node.material.uniforms.alpha.value = opacity;
    }
    node.material.transparent = true;
    return node.material.opacity = opacity;
  },
  animate: function(node, opt){
    var that, ref$, dur, rpt, dir, origin;
    opt == null && (opt = {});
    opt = import$(import$({}, this.config), opt);
    this.getDom();
    ref$ = [opt.dur || 1, (that = opt.repeat) ? that : 'infinite', opt.animationDir || 'normal'], dur = ref$[0], rpt = ref$[1], dir = ref$[2];
    origin = (that = this.config.origin)
      ? that
      : [0.5, 0.5, 0.5];
    node.style.animation = this.config.name + "-" + this.id + " " + dur + "s " + rpt + " linear forwards " + dir;
    return node.style.animationDelay = (opt.delay || 0) + "s";
  },
  origin: function(n, h, opt){
    var x, y, ox, oy, s, that, z, value, ref$;
    opt == null && (opt = {});
    x = opt.x, y = opt.y, ox = opt.ox, oy = opt.oy, s = opt.s;
    if (x != null && y != null) {
      return anikit.util.origin(n, h, x, y, ox, oy, s != null ? s : 1);
    }
    if (that = this.config.origin) {
      x = that[0], y = that[1], z = that[2];
    } else if (this.mod.affine) {
      value = this.mod.affine(0, this.config);
      if (value.transformOrigin) {
        ref$ = value.transformOrigin, x = ref$[0], y = ref$[1], z = ref$[2];
      }
    }
    if (!(x != null) || !(y != null)) {
      ref$ = [0.5, 0.5, 0.5], x = ref$[0], y = ref$[1], z = ref$[2];
    }
    if (n.style) {
      return anikit.util.origin(n, h, x, y, ox, oy, s != null ? s : 1);
    }
  },
  statify: function(node){
    return node.style.animation = node.style.animationDelay = "";
  },
  destroy: function(){
    if (this.dom && this.dom.parentNode) {
      return this.dom.parentNode.removeChild(this.dom);
    }
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
    round: easingFit.round
    /* TBD: we should design a better flow for rounding output
    rounds: (v, d = 5) ->
      if v.opacity? => v.opacity = easing-fit.round v.opacity, d
      if v.transform? => v.transform = v.transform.map -> easing-fit.round it, d
      return v
    */,
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
    origin: function(n, h, px, py, ox, oy, s){
      var ref$, x, y, svg, _, mat, p, abox, rbox, p1, p2, box, nb, hb, this$ = this;
      px == null && (px = 0.5);
      py == null && (py = 0.5);
      ox == null && (ox = 0);
      oy == null && (oy = 0);
      s == null && (s = 1);
      if (typeof h.x === (ref$ = typeof h.width) && ref$ === 'number') {
        ref$ = [h.x + h.width * px, h.y + h.height * py], x = ref$[0], y = ref$[1];
        n.style.transformOrigin = x + "px " + y + "px";
        return [x, y];
      } else if (n.transform) {
        svg = null;
        _ = function(n){
          var that;
          if (n.nodeName.toLowerCase() === 'svg') {
            svg = n;
            return n.createSVGMatrix();
          }
          return _(n.parentNode).multiply((that = n.transform && n.transform.baseVal.consolidate())
            ? that.matrix
            : svg.createSVGMatrix());
        };
        mat = _(n.parentNode);
        p = svg.createSVGPoint();
        abox = n.getBoundingClientRect();
        rbox = h.getBoundingClientRect();
        p1 = (p.x = abox.x - rbox.x, p.y = abox.y - rbox.y, p).matrixTransform(mat.inverse());
        p2 = (p.x = abox.x + abox.width - rbox.x, p.y = abox.y + abox.height - rbox.y, p).matrixTransform(mat.inverse());
        box = {
          x: p1.x,
          y: p1.y,
          width: p2.x - p1.x,
          height: p2.y - p1.y
        };
        ref$ = [box.x + box.width * px, box.y + box.height * py], x = ref$[0], y = ref$[1];
        n.style.transformOrigin = x + "px " + y + "px";
        return [x, y];
      } else {
        ref$ = [n, h].map(function(it){
          return GBCR(it);
        }), nb = ref$[0], hb = ref$[1];
        x = nb.width * px + nb.x - hb.x + ox;
        y = nb.height * py + nb.y - hb.y + oy;
        n.style.transformOrigin = x * s + "px " + y * s + "px";
        return [x, y];
      }
    }
    /* forward, reverse, random */,
    order: function(i, n, t){
      t == null && (t = 0);
      if (t === 0) {
        return i;
      } else if (t === 1) {
        return n - i - 1;
      } else if (t === 2) {
        return this.kth(n, n * n + 7, i);
      }
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
  set: function(name, mod){
    var k, ref$, v, results$ = [];
    this.mods[name] = mod;
    if (mod.preset) {
      for (k in ref$ = mod.preset) {
        v = ref$[k];
        results$.push(this.types[k] = name);
      }
      return results$;
    }
  },
  get: function(name, opt){
    var config, ret, mod, k, v, ref$, o;
    opt == null && (opt = {});
    config = {
      name: name,
      dur: 1,
      repeat: 0
    };
    ret = this.types[name]
      ? this.mods[this.types[name]]
      : this.mods[name];
    mod = {};
    for (k in ret) {
      v = ret[k];
      mod[k] = v;
    }
    mod.edit = JSON.parse(JSON.stringify(mod.edit));
    if (mod.preset[name]) {
      for (k in ref$ = mod.edit) {
        v = ref$[k];
        o = mod.preset[name][k];
        if (o && o['default'] != null) {
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
      config.origin = ref$.origin;
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
// Generated by LiveScript 1.3.1
(function(){
  var ldAnikitPicker;
  ldAnikitPicker = function(opt){
    var handler, this$ = this;
    this.opt = opt;
    this.root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.ldcv = new ldCover({
      root: this.root
    });
    this.input = this.root.querySelector('input');
    this.item = Array.from(this.root.querySelectorAll('.item'));
    this.base = this.root.querySelector('.base');
    this.root.addEventListener('click', function(e){
      var n, ret;
      n = e.target;
      while (n && n !== this$.root) {
        if (n.classList.contains('item')) {
          break;
        }
        n = n.parentNode;
      }
      if (!(n && n.classList.contains('item'))) {
        return;
      }
      ret = n.getAttribute('data-value');
      return this$.ldcv.set({
        name: ret,
        info: {
          limited: n.classList.contains('limited')
        }
      });
    });
    handler = function(){
      return this$.item.map(function(it){
        return it.style.display = !~it.textContent.indexOf(this$.input.value) ? 'none' : 'block';
      });
    };
    this.input.addEventListener('input', handler);
    return this;
  };
  ldAnikitPicker.prototype = import$(Object.create(Object.prototype), {
    get: function(opt){
      opt == null && (opt = {});
      this.pos(opt);
      return this.ldcv.get();
    },
    pos: function(opt){
      var box;
      opt == null && (opt = {});
      if (opt.host) {
        box = opt.host.getBoundingClientRect();
        return this.base.style.left = box.x + "px";
      }
    },
    applyFilters: function(o){
      var this$ = this;
      if (o != null) {
        ['disableFilter', 'defaultFilter'].map(function(it){
          if (o[it]) {
            return this$.opt[it] = o[it];
          }
        });
      }
      return ld$.find(this.root, '.item').map(function(d, i){
        var ret;
        if (this$.opt.disableFilter) {
          ret = this$.opt.disableFilter(d.getAttribute('data-anikit'), i);
          ld$.cls(d, this$.opt.limitHard
            ? {
              disabled: ret
            }
            : {
              limited: ret
            });
        }
        if (this$.opt.defaultFilter && !this$.opt.defaultFilter(d.getAttribute('data-anikit'), i)) {
          return ld$.remove(d);
        }
      });
    }
  });
  return window.ldAnikitPicker = ldAnikitPicker;
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
