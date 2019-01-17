require! <[easing-fit cubic ../anikit]>
ret = do
  name: \patrol
  type: \animation
  preset: 
    breath:
      steep: 0.6, offset: 0.06
      prop: (f, c) -> {transform: "scale(#{1 + f.value * c.offset - 0.03})"}
      value: (t, c) -> transform: anikit.util.s(1 + t * c.offset - 0.03)
    dim:
      steep: 0.6, offset: 0.5
      prop: (f, c) -> {opacity: 0.5 + f.value * c.offset}
      value: (t, c) -> opacity: 0.5 + t * c.offset
    metronome:
      steep: 0.6, offset: 10, rotate: 30, unit: \px
      local: error-threshold: 0.001, sample-count: 20, seg-sample-count: 1000
      prop: (f, c) -> {
        transform: "translate(#{f.value * c.offset}#{c.unit}) rotate(#{f.value * c.offset * 2}deg)"
      }
      value: (t, c) -> 
        a = t * c.offset * 2 * Math.PI / 180
        return transform: [
          Math.cos(a), Math.sin(a), 0, t * c.offset,
          -Math.sin(a), Math.cos(a), 0, 0,
          0, 0, 1, 0, 0, 0, 0, 1
        ]
    swing:
      steep: 0.6, offset: 30, unit: ''
      prop: (f, c) -> {transform: "rotate(#{f.value * c.offset}deg)"}
      value: (t, c) -> transform: anikit.util.rz t * c.offset * Math.PI / 180
    "wander-v": 
      steep: 0.6, offset: 10, unit: \px
      prop: (f, c) -> {transform: "translate(0,#{f.value * c.offset}#{c.unit})"}
      value: (t, c) -> transform: anikit.util.ty t * c.offset
    wander:
      steep: 0.6, offset: 10, unit: \px
      prop: (f, c) -> {transform: "translate(#{f.value * c.offset}#{c.unit},0)"}
      value: (t, c) -> transform: anikit.util.tx t * c.offset

  edit: do
    steep: default: 0.6, type: \number, min: 0, max: 1, step: 0.01
    offset: default: 10, type: \number, unit: \px, min: 0, max: 100, step: 0.01
    unit: default: \px, type: \choice, values: ["px", "%", ""]
  timing: (t, opt) ->
    p = [opt.steep,0,1 - opt.steep,1]
    if t < 0.5 =>
      t = cubic.Bezier.y(cubic.Bezier.t(t * 2, p), p) / 2
    else
      t = (cubic.Bezier.y(cubic.Bezier.t((t - 0.5) * 2, p), p) / 2) + 0.5
    t = 1 - 4 * Math.abs(t - 0.5) # -1 -> 1 -> -1
    return t

  css: (opt) -> 
    easing-fit.fit-to-keyframes (~> @timing it, opt), ({} <<< opt.local or {}) <<< {config: opt} <<< opt{name, prop}
  js: (t, opt) -> opt.prop {value: @timing t, opt}, opt
  affine: (t, opt) -> opt.value @timing(t, opt), opt

  /* equivalent keyframes */
  /*
  @keyframes {name}
    0%,50%,100%
      timing-step(rate)
    0%
      func(-1 * max)
    50%
      func(1 * max)
    100%
      func(-1 * max)
  */

module.exports = ret
