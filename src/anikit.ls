require! <[easing-fit cubic ./easing]>
kits-list = require './kits-list.gen'
uuid = require 'uuid/v4'

GBCR = (n) -> n.getBoundingClientRect!
if navigator? => if /Firefox\/([0-9.]+)/.exec(navigator.userAgent) =>
  GBCR = (n) ->
    box = n.getBoundingClientRect!
    t = getComputedStyle(n).transform
    t = t.trim!.substring(7).replace(/[)]/g,'').split(\,)
    if t.length < 6 => t = [1,0,0,1,0,0]
    t = t.map -> +it
    box <<< x: box.x + t.4, y: box.y + t.5


{cos,sin,tan} = Math{cos,sin,tan}

anikit = (name, opt={}) ->
  @{mod, config} = anikit.get(name, opt)
  [@name, @dom, @id] = [name, null, uuid!]
  @set-config @config
  @

anikit.prototype = Object.create(Object.prototype) <<< do
  set-config: (c={}) ->
    @config <<< c
    if @dom => @dom.textContent = @mod.css({} <<< @config <<< name: "#{@config.name}-#{@id}")
    @mod.config = @config
  get-config: -> @config
  cls: (cfg = {}, opt = {}) ->
    if !@mod.css => return null
    prefix = opt.prefix or ''
    name = (if prefix => "#{prefix}-" else "") + (opt.name or @config.name or @mod.name or 'unnamed')
    css = @mod.css (cfg = {} <<< @config <<< cfg <<< {name})


    # there might be redundant transform generated. check and clear them.
    re = do
      skewX: /skewX\(0(deg)?\)/g
      skewY: /skewY\(0(deg)?\)/g
      rotate: /rotate\(0(deg)?\)/g
      scale: /scale\(1(,1)?\)/g
    has = {}
    [k for k of re].map (k)->
      if (new RegExp(k)).exec(css.replace(re[k], '')) => return
      css := css.replace(re[k], '')
    css = css.replace /\s+;/g, ';'

    if @mod.js and cfg.repeat =>
      js = @mod.js 0, cfg
      init-values = (["animation-fill-mode: forwards"] ++ ["#n: #v" for n,v of js]).join(\;)
    else init-values = ""

    origin = if !(cfg.origin?) => ""
    else "transform-origin: #{cfg.origin[0 to 1].map(-> (it * 100) + \%).join(' ')}"
    selector = (if opt.alias => that.map(->"#{prefix}-#it") else [name]).map(-> ".#prefix.#it").join(',')
    return """
    #css
    #selector {
      animation: #{name} #{cfg.dur or 1}s #{cfg.repeat or \infinite} linear; #init-values; #origin
    }
    """

  css: (opt={}) -> if @mod.css => @mod.css {} <<< @config <<< opt else {}
  js: (t, opt={}) -> if @mod.js => @mod.js t, opt = {} <<< @config <<< opt
  affine: (t, opt={}) -> if @mod.affine => @mod.affine t, opt = {} <<< @config <<< opt
  get-dom: ->
    if !@dom =>
      document.body.appendChild(@dom = document.createElement \style)
      @dom.setAttribute \id, "#{@config.name}-#{@id}"
      @dom.setAttribute \data-anikit, ""
      @set-config!
    @dom

  timing: (t, opt=@config) ->
    t = t / (opt.dur or 1)
    if opt.repeat < 0 => return t
    if opt.repeat and t > opt.repeat => t = 1
    if t != Math.floor(t) => t = t - Math.floor(t)
    t

  animate-js: (node, t, opt={}) ->
    opt = {} <<< @config <<< opt
    if node.ld-style => for k,v of that => node.style[k] = ""
    origin = if @config.origin => that else [0.5, 0.5, 0.5]
    t = @timing t, opt
    node.ld-style = @js t, opt
    node.ld-style <<< [origin.0, origin.1].map(-> "#{it * 100}%").join(' ')
    node.style <<< node.ld-style

  animate-three: (node, t, opt={}) ->
    opt = {} <<< @config <<< opt
    t = @timing t, opt
    values = @affine t, opt
    if !values => return
    box = new THREE.Box3!setFromObject node
    node.geometry.computeBoundingBox!
    bbox = node.geometry.boundingBox
    [wx,wy,wz] = <[x y z]>
      .map -> bbox.max[it] - bbox.min[it]
      .map (d,i) -> ((opt.origin or values.transform-origin or [0.5,0.5,0.5])[i] - 0.5) * d
    [nx,ny,nz] = <[x y z]>
      .map -> (bbox.max[it] + bbox.min[it]) * 0.5
    if (nx or ny or nz) and !node.repos =>
      m = new THREE.Matrix4!
      m.set 1,0,0,-nx,0,1,0,-ny,0,0,1,-nz,0,0,0,1
      node.geometry.applyMatrix m
      node.repos = m.getInverse m
    node.matrixAutoUpdate = false
    mat = values.transform or [1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1]
    [3,7,11].map -> mat[it] = mat[it] / 40 #TODO make to real ratio

    gmat = new THREE.Matrix4!makeTranslation wx, wy, wz
    node.matrix.set.apply( node.matrix, mat)
    node.matrix.multiply gmat
    node.matrix.premultiply gmat.getInverse gmat
    if node.repos => node.matrix.premultiply node.repos

    opacity = if values.opacity? => values.opacity else 1
    if node.material.uniforms and node.material.uniforms.alpha =>
      node.material.uniforms.alpha.value = opacity
    node.material.transparent = true
    node.material.opacity = opacity

  animate: (node, opt={}) ->
    opt = {} <<< @config <<< opt
    @get-dom!

    [dur,rpt, dir] = [opt.dur or 1, if opt.repeat => that else \infinite, opt.animation-dir or \normal]
    origin = if @config.origin => that else [0.5, 0.5, 0.5]
    node.style.transformOrigin = [origin.0, origin.1].map(-> "#{it * 100}%").join(' ')
    # this works perfectly only when transform is in animation. see README for more detail
    #node.style.transformBox = "fill-box"
    node.style.animation = "#{@config.name}-#{@id} #{dur}s #{rpt} linear forwards #{dir}"
    node.style.animationDelay = "#{opt.delay or 0}s"
  origin: (n,h,opt={}) ->
    {x,y,ox,oy,s} = opt
    if x? and y? => return anikit.util.origin n, h, x, y, ox, oy, if s? => s else 1
    if @config.origin => [x,y,z] = that
    else if @mod.affine =>
      value = @mod.affine 0, @config
      if value.transform-origin => [x,y,z] = value.transform-origin
    if !(x?) or !(y?) => [x,y,z] = [0.5, 0.5, 0.5]
    if n.style => anikit.util.origin n, h, x, y, ox, oy, if s? => s else 1

  statify: (node) ->
    for k,v of node.ld-style => node.style[k] = null
    node.style.animation = node.style.animationDelay = ""
  destroy: -> if @dom and @dom.parentNode => @dom.parentNode.removeChild @dom

anikit <<< do
  util:
    m4to3: (m) -> [m.0, m.1, m.4, m.5, m.3, -m.7].map -> easing-fit.round it
    noise: (t) -> (Math.sin(t * 43758.5453) + 1 ) * 0.5
    round: easing-fit.round
    /* TBD: we should design a better flow for rounding output
    rounds: (v, d = 5) ->
      if v.opacity? => v.opacity = easing-fit.round v.opacity, d
      if v.transform? => v.transform = v.transform.map -> easing-fit.round it, d
      return v
    */

    # 2D transform matrix decomposition algorithm via QR matrix decomposition
    # algorithm adopted from http://frederic-wang.fr/decomposition-of-2d-transform-matrices.html
    # credit: Frederic Wang, 2013
    decompose: (mat, opt = {}) ->
      [a,b,c,d,e,f] = mat
      D = a * d - b * c
      t = [e,f]
      [kx,ky,r,s] = [0,0,0,[0,0]]
      if a or b =>
        R = Math.sqrt(a * a + b * b)
        r = (if b > 0 => 1 else -1 ) * Math.acos( a / R )
        s = [R, D / R]
        kx = Math.atan((a * c + b * d) / (R * R))
      else if c or d =>
        S = Math.sqrt(c * c + d * d)
        r = Math.PI/2 - (if d > 0 => Math.acos(-c / s) else -Math.acos(c / s))
        s = [D/s, s]
        ky = Math.atan(a * c + b * d) / (s * s)
      else s = [0,0]
      u = opt.unit or \px
      return [
        "translate(#{t.0}#{u},#{t.1}#{u})",
        "rotate(#{r * 180 / Math.PI}deg)",
        "scale(#{s.0},#{s.1})",
        "skewX(#{kx * 180 / Math.PI}deg)",
        "skewY(#{ky * 180 / Math.PI}deg)"
      ].join(' ')



    kth: (n,m,k) ->
      if k > n => k = n
      if m == 1 => return k
      k = k * m + m - 1
      while k >= n => k = k - n + Math.floor((k - n) / (m - 1))
      return k
    origin: (n,h,px=0.5,py=0.5,ox=0,oy=0,s=1) ->
      if typeof(h.x) == typeof(h.width) == \number =>
        [x,y] = [h.x + h.width * px, h.y + h.height * py]
        n.style.transform-origin = "#{x}px #{y}px"
        [x,y]
      else if n.transform
        svg = null
        _ = (n) ~>
          if n.nodeName.toLowerCase! == \svg => svg := n; return n.createSVGMatrix!
          return _(n.parentNode).multiply(
            if n.transform and n.transform.baseVal.consolidate! => that.matrix else svg.createSVGMatrix!
          )
        mat = _ n.parentNode
        p = svg.createSVGPoint!
        abox = n.getBoundingClientRect!
        rbox = h.getBoundingClientRect!
        p1 = (p <<< x: abox.x - rbox.x, y: abox.y - rbox.y).matrixTransform(mat.inverse!)
        p2 = (p <<< x: abox.x + abox.width - rbox.x, y: abox.y + abox.height - rbox.y).matrixTransform(mat.inverse!)
        box = x: p1.x, y: p1.y, width: p2.x - p1.x, height: p2.y - p1.y
        [x,y] = [box.x + box.width * px, box.y + box.height * py]
        n.style.transform-origin = "#{x}px #{y}px"
        [x,y]
      else
        [nb, hb] = [n,h].map -> GBCR it #!it.getBoundingClientRect!
        x = nb.width * px + nb.x - hb.x + ox # - hb.width * 0.5
        y = nb.height * py + nb.y - hb.y + oy # - hb.height * 0.5
        n.style.transform-origin = "#{x * s}px #{y * s}px"
        [x,y]
    /* forward, reverse, random */
    order: (i,n,t = 0) ->
      if t == 0 => return i
      else if t == 1 => return n - i - 1
      else if t == 2 => return @kth n, n * n + 7, i

    rx: (t) -> [1, 0, 0, 0, 0, cos(t), -sin(t), 0, 0, sin(t), cos(t), 0, 0, 0, 0, 1]
    ry: (t) -> [cos(t), 0, sin(t), 0, 0, 1, 0, 0, -sin(t), 0, cos(t), 0, 0, 0, 0, 1]
    rz: (t) -> [cos(t), sin(t), 0, 0, -sin(t), cos(t), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    tx: (t) -> [1, 0, 0, t, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    ty: (t) -> [1, 0, 0, 0, 0, 1, 0, -t, 0, 0, 1, 0, 0, 0, 0, 1]
    tz: (t) -> [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, t, 0, 0, 0, 1]
    sx: (t) -> [t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    sy: (t) -> [1, 0, 0, 0, 0, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    sz: (t) -> [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, t, 0, 0, 0, 0, 1]
    s:  (t) -> [t, 0, 0, 0, 0, t, 0, 0, 0, 0, t, 0, 0, 0, 0, 1]
    kx: (t) -> [1, -tan(t), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    ky: (t) -> [1, 0, 0, 0, tan(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  set: (name, mod) ->
    @mods[name] = mod
    if mod.preset => for k,v of mod.preset => @types[k] = name

  get: (name, opt={}) ->
    config = {name: name, dur: 1, repeat: 0}
    ret = if @types[name] => @mods[@types[name]] else @mods[name]
    mod = {}
    # make a whole new object and clone the subject-to-modified edit
    # so we won't pollute the raw mod
    for k,v of ret => mod[k] = v
    mod.edit = JSON.parse JSON.stringify mod.edit

    # overwrite edit settings
    if mod.preset[name] => for k,v of mod.edit =>
      o = mod.preset[name][k]
      if o and o.default? => mod.edit[k] <<< mod.preset[name][k]

    for k,v of mod.edit => config[k] = v.default

    # overwrite configs: deprecated, should use 'overwrite edit settings'.
    if mod.preset[name] =>
      for k,v of config =>
        o = mod.preset[name][k]
        # if o exists, and it's an edit setting (check with default attr) then pass
        if typeof(o) == \undefined or (typeof(o) == \object and o.default?) => continue
        config[k] = o
      config <<< mod.preset[name]{prop, value, local, origin}

    # overwrite by custom
    config <<< opt
    return {mod, config}
  /* all available mods */
  mods: kits-list.mods
  /* all available animations, base on mods */
  types: kits-list.types


if window? => window <<< {easing, anikit, easing-fit, cubic}
# required module can't be used as a constructor so we put anikit in exports.anikit
if module? => module.exports <<< anikit; module.exports.anikit = anikit
