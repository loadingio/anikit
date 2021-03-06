(->
  if require? => require! <[easing-fit cubic ../anikit]>
  ret = do
    name: \blur
    type: \animation
    preset:
      blur: {}
    edit: 
      blur: name: "Blur Amount", default: 10, type: \number, unit: \px, units: <[px %]>, min: 0, max: 100, step: 1
      unit: default: \px, type: \choice, values: ["px", ""]

    css: (opt) ->
      """
      @keyframes #{opt.name} {
        0% { filter: blur(0) }
        50% { filter: blur(#{opt.blur}#{opt.unit}) }
        100% { filter: blur(0) }
      }
      """

    js: (t, opt) -> return { filter: "blur(#{opt.blur * (1 - Math.abs(t - 0.5) * 2)}#{opt.unit})" }

  if module? => module.exports = ret
  return ret
)!
