ret = do
  name: \squeeze
  preset:
    squeeze:
      sample-count: 20, error-threshold: 0.001
      propFunc: (f, opt) ->
        sx = 1 - 2 * (Math.abs(0.5 - f.value)) * opt.zoomx
        sy = 1 - 2 * (0.5 - Math.abs(0.5 - f.value)) * opt.zoomy
        { transform: "scale(#{sx},#{sy})" }
  edit: 
    steep: default: 0.5, type: \number, min: 0, max: 1
    zoomx: default: 0.5, type: \number, min: 0, max: 3, step: 0.1
    zoomy: default: 0.5, type: \number, min: 0, max: 3, step: 0.1

  timing: (t, opt) ->
    p1 = [0, opt.steep, 1 - opt.steep, 1]
    d = (t - Math.floor(t * 2) * 0.5) * 2
    d = anikit.cubic.Bezier.y(anikit.cubic.Bezier.t(d, p1), p1) * 0.5
    d = d + Math.floor(t * 2) * 0.5
    return d

  css: (opt) -> anikit.step-to-keyframes (~> @timing it, opt), opt
  js: (t, opt) -> opt.propFunc {value: @timing t, opt}, opt

  /* equivalent keyframes */
  /*
   @keyframes ld-squeeze
      0%
        transform: scale(1,config.zoom_y)
      50%
        transform: scale(config.zoom_x,1)
      100%
        transform: scale(1,config.zoom_y)
    .ld-squeeze
      animation: ld-squeeze config.dur infinite
      timing-speed-down(config.accelerate)
  */

module.exports = ret
