# Anikit

Animation Toolkit for CSS Animation, SMIL, JavaScript and WebGL. Currently in draft stage.


## Introduction

AniKit.js ( アニキト / 兄貴止, ANImation KITs ) is a collection of animations that provides in formats including CSS, JS and GLSL functions. It focuses on animations that could be accomplished with affine transformation and changing opacities.

All animations are defined under src/kits/ as separated files, extend ldEditor "mod" structure with following:

 * name: animation name
 * type: must be "animation"
 * preset: predefined configurations, use to generate different animation from this kit. in following format:
   {
     "animation-name": {
       configs...
       local: { not-exposed-configs... }
       prop: (f, c, i)  (optional)
       value: (t, c, i) (optional)
     }, ...
   }
 * edit: ldEditor style edit object. default value:
   - speed: animation speed
   
 * affine: function. Optional. return specific attributes in js-accessible format.
   - input:
     - time - current time for animation. usually bewteen 0 and 1.
     - opt - configuration derived from edit object.
   - output: object with following attributes:
     - transform: return 4x4 matrix, in the form of a 16-elements array.
     - opacity: return float, between 0 ~ 1.
     - transform-origin: return a 2-elements array, representing (x,y) coord for transform-origin.
       units in %, in float ( 0 ~ 1 maps to 0% ~ 100% )

 * css: function. return css animation keyframes.
   - input:
     - opt - configuration derived from edit object. must have an additional field "name" for animation name.
   - output: named css animation with keyframes.

 * js: funciton(Optional). return css style object which could be applied directly into element's style object.
   - input:
     - time - current time for animation. usually between 0 and 1.
     - opt - configuration derived from edit object.
   - output: style object.

 * glsl: function(Optional). for using animation directly in GLSL. TBD.
   - input: none.
   - output: String representing desired GLSL function.
     - glsl function(float time, 0, vec4 config1, vec4 config2) return mat3 for affine transformation.
     - glsl function(float time, 1, vec4 config1, vec4 config2) return float for opacity.
     - default opts:
       * name: function name.

## USAGE

 * in NodeJS:
   - npm install loadingio/anikit
   - require("anikit");

 * Get Kit:
   - kit = new anikit("kit-name");

 * Apply CSS Animation over HTML Node:
   - kit.animate(node, opt); // opt is optional

 * Remove CSS Animation from HTML Node:
   - kit.statify(node); 

 * Apply JS Animation over HTML Node:
   - kit.animate(node, time, opt); // opt is optional

 * Apply THREEJS Animation over THREE.Mesh:
   - kit.animate-three(mesh, time, opt); // opt is optional

 * Update kit config:
   - kit.setConfig(opt);

 * Get animate mod object directly:
   - {mod, config} = anikit.get("kit-name")

 * generate CSS Animation with custom config:
   - anikit.get("kit-name").mod.css({ ... });


## Building

anikit provides two bundles:
 * JS Bundle - all kits and anikit core function, in one file.
 * CSS Bundle - predefined CSS Animations with ld-[name] structure. will be used to replace loading.css and transition.css.


## TODO

 * integrate transition.css
 * following animation from loading.css are still not implemented:
   - spin/flip.ls
   - other/
     - bounce-ltr-alt.ls
     - bounce-rtl-alt.ls
     - bounce-a-alt.ls
     - bounce-a.ls
     - bounce-rtl.ls
     - bounce-ltr.ls
     - slot.ls
     - leaf.ls
 * implement "set-kit" - animation set for operating multiple elements at one time.


## LICENSE

MIT
