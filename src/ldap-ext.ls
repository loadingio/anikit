(->
  ldAnikitPickerExt = (opt = {}) ->
    @opt = opt
    @root = if typeof(opt.root) == \string => document.querySelector opt.root else opt.root
    @btn = ld$.find(@root, '.dropdown-toggle', 0)
    @ <<< active: null, anikit: null, evt-handler: {}
    @apply-filters!
    ld$.find @root, '.anikits' .map (d,i) ~> if d.childNodes.length == 0 => ld$.remove d
    ld$.find @root, '.head' .map (d,i) ~>
      if !d.nextSibling or d.nextSibling.classList.contains \dropdown-divider =>
        ld$.remove d.nextSibling; ld$.remove d

    # not used but depict how html are structured.
    html = (name,type=\modal) ->
      demo = """
        <div class="demo"><div class="inner"><div class="ld ld-#name"></div></div></div>
        <span>#name</span>
      """
      return if type == \modal => """<div class="anikit" data-anikit="#name" data-ldcv-set=k>#demo</div>"""
      else """<a href="#" class="dropdown-item anikit" data-anikit="#name">#demo</a>"""

    ld$.find(@root, '.inner', 0).addEventListener \click, (e) ~>
      tgt = e.target
      n = ld$.parent(tgt, '.disabled', @root)
      if n => return e.stopPropagation!
      n = ld$.parent(tgt, '[data-anikit]', @root)
      if !n => return e.stopPropagation!
      kit = n.getAttribute \data-anikit
      if !kit => return e.stopPropagation!
      if @active => @active.classList.remove \active
      n.classList.add \active
      if kit != @anikit => @fire \choose, kit, {limited: !!ld$.parent(tgt, '.limited', @root)}
      @anikit = kit
      @active = n
      if @btn => @btn.innerText = @anikit

  ldAnikitPickerExt.prototype = Object.create(Object.prototype) <<< do
    on: (n, cb) -> @evt-handler.[][n].push cb
    fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
    # re-apply disable-filter and default-filter. default-filter is destructive. ( TODO: better way? )
    apply-filters: (o) ->
      if o? => <[disableFilter defaultFilter]>.map ~> if o[it] => @opt[it] = o[it]
      ld$.find @root, '.anikit' .map (d,i) ~>
        if @opt.disable-filter =>
          ret = @opt.disable-filter(d.getAttribute(\data-anikit),i)
          ld$.cls d, (if @opt.limit-hard => {disabled: ret} else {limited: ret})
        if @opt.default-filter and !@opt.default-filter(d.getAttribute(\data-anikit),i) => ld$.remove d

  if window? => window.ldAnikitPickerExt = ldAnikitPickerExt
)!
