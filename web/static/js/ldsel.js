// Generated by LiveScript 1.3.1
(function(){
  var handler, ldSelect;
  handler = function(){};
  ldSelect = function(opt){
    var this$ = this;
    this.root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.ldcv = new ldCover({
      root: this.root
    });
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
      return this$.ldcv.set(ret);
    });
    return this;
  };
  ldSelect.prototype = import$(Object.create(Object.prototype), {
    get: function(opt){
      opt == null && (opt = {});
      this.pos(opt);
      return this.ldcv.get();
    },
    pos: function(opt){
      var box, x;
      opt == null && (opt = {});
      if (opt.host) {
        box = opt.host.getBoundingClientRect();
        x = box.x + box.width / 2;
        this.base.style.left = x + "px";
        return this.base.style.transform = "translate(-50%,0)";
      }
    }
  });
  return window.ldSelect = ldSelect;
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}