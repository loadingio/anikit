(->
  ld$.find document, '#presets .item' .map (n) ->
    n.addEventListener \click, ->
      a = n.getAttribute \data-name
      s = ld$.find(n, '.square', 0)
      s.classList.remove a
      s.offsetHeight
      setTimeout (-> s.classList.add a), 0
  ldrs-nodes = ld$.find document, '.ldrs'
  window.ldcv1 = new ldCover root: ld$.find(document, '#kit-modal-1 .ldcv', 0)
  window.ldcv2 = new ldCover root: ld$.find(document, '#kit-modal-2 .ldcv', 0)
  window.ldcv3 = new ldCover root: ld$.find(document, '#kit-modal-3 .ldcv', 0)
  ldrs1 = new ldSlider root: ldrs-nodes.0, min: 0, max: 1, step: 0.01
  ldrs2 = new ldSlider root: ldrs-nodes.1, min: 0, max: 1, step: 0.01
  ldrs1-demo = ld$.find document, '#ldrs-demo', 0
  kit = new anikit \bounce
  ldrs1.on \change, -> kit.animate-js ldrs1-demo, it
  window.ldap = ldap = new ldAnikitPicker root: '.ldap'
  ldap-nodes = ld$.find document, '#ldap-animate i'
  window.ldap-animate = (node) ->
    ldap.get {host: node} .then (o) ->
      if !o => return
      n = o.name
      k = new anikit(n.replace /^ld-/, '')
      ldap-nodes.map (d,i) ->
        delay = i/ldap-nodes.length
        if !k.config.repeat => delay = -1 + delay
        k.animate-js d, 0
        k.animate d
        d.style.animationDelay = "#{delay}s"


  three-init = (root) ->
    box = root.getBoundingClientRect!
    [w,h] = [box.width, box.height]
    camera = new THREE.PerspectiveCamera 45, w/h, 1, 10000
    scene = new THREE.Scene!
    renderer = new THREE.WebGLRenderer antialias: true, alpha: true
    renderer.setSize w, h
    renderer.setClearColor 0x0, 0
    root.appendChild renderer.domElement
    controls = {}
    animate = (render-func) ->
      _animate = (value) ->
        requestAnimationFrame _animate
        render-func value
      _animate!
    return {camera, scene, renderer, w, h, controls, animate}

  three-prepare = (root) ->
    {camera, scene, renderer, w, h, controls, animate} = three-init root
    d = 1.1
    shape = new THREE.Shape!
    shape.moveTo d, 0
    shape.bezierCurveTo d, 1.3 * d, -d, 1.3 * d, -d, 0
    shape.bezierCurveTo -d, -1.3 * d, d, -1.3 * d, d, 0
    geom = geom = new THREE.ShapeGeometry shape
    mat = mat = new THREE.MeshStandardMaterial color: 0xffffff, metalness: 0, roughness: 0.5
    mat = mat = new THREE.ShaderMaterial do
      side: THREE.DoubleSide
      transparent: true
      uniforms: alpha: type: \f, value: 1
      vertexShader: '''
      varying vec2 vUv;
      varying float vA;
      uniform float alpha;
      void main() {
        vUv = uv;
        vA = alpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }
      '''
      fragmentShader: '''
      varying vec2 vUv;
      varying float vA;
      void main() {
        vec3 c1 = vec3(.3, .5, 0.9);
        vec3 c2 = vec3(.6, .8, 1.);
        vec2 v = vUv;
        float len = 0.;
        len = length(v - 0.);
        len = smoothstep(0.88,0.89,len);
        if(v.y + v.x < 0.0 || v.y - v.x < 0.0 ) { len = 0.; }
        gl_FragColor = vec4(mix(c1, c2, len), vA);
      }
      '''
    mesh = mesh = new THREE.Mesh geom, mat
    group = group = new THREE.Group!
    group.add mesh
    scene.add group
    light = new THREE.HemisphereLight 0x0099ff, 0xff9900, 0.9
    scene.add light
    camera.position.set 0, 0, 10
    camera.lookAt 0, 0, 0
    renderer.render scene, camera
    return {renderer, scene, camera, mesh, animate}

  three-root = ld$.find document, '#three-root', 0
  {renderer, scene, camera, mesh, animate} = three-prepare three-root

  ldrs2.on \change, ->
    kit.animate-three mesh, it
    renderer.render scene, camera
  (->

    local = {count: 0}
    f = (t) ->
      if !(local.start?) => local.start = t
      t = (t - local.start) / 1000
      if local.kit =>
        local.kit.animate-three local.mesh, t
        local.renderer.render local.scene, local.camera
        local.kit.animate-js local.js-obj, t
      requestAnimationFrame f
    requestAnimationFrame f

    view = new ldView root: document, handler: do
      "compare-btn": ({node}) -> node.addEventListener \click, ->
        ldap.get {host: node} .then (o) ->
          if !o => return
          n = o.name
          local.kit = k = new anikit(n.replace /^ld-/, '')
          delete local.start
          view.getAll(\css).map (d,i) ->
            delay = i/ldap-nodes.length
            if !k.config.repeat => delay = -1 + delay
            k.animate-js d, 0
            k.animate d
            d.style.animationDelay = "#{delay}s"
      compare: ({node}) ->
      js: (->)
      css: (->)
      webgl: (->)
    local.js-obj = view.get(\js)
    local <<< three-prepare(view.get(\webgl))
  )!
)!
