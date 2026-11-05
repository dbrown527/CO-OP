(function(){
  if (window.__coopReveal) return; window.__coopReveal = true;
  var seen = new WeakSet();
  var ease = 'cubic-bezier(.2,.7,.2,1)';
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target; io.unobserve(el);
      el.style.opacity = '1'; el.style.transform = 'none';
      setTimeout(function(){ el.style.transition = ''; el.style.opacity = ''; el.style.transform = ''; }, 1600);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  function prep(el, delay){
    if (seen.has(el)) return; seen.add(el);
    el.style.opacity = '0'; el.style.transform = 'translateY(36px)';
    el.style.transition = 'opacity .9s ' + ease + ' ' + delay + 'ms, transform .9s ' + ease + ' ' + delay + 'ms';
    io.observe(el);
  }
  function scan(){
    document.querySelectorAll('section[data-screen-label] > div').forEach(function(c){
      if (getComputedStyle(c).position === 'absolute' || c.closest('[data-no-reveal]')) return;
      Array.prototype.forEach.call(c.children, function(ch, i){
        var kids = ch.children, cs = getComputedStyle(ch);
        if (cs.display === 'grid' && kids.length >= 3) Array.prototype.forEach.call(kids, function(k, j){ prep(k, Math.min(j, 8) * 90); });
        else prep(ch, i * 140);
      });
    });
  }
  var t; function queue(){ clearTimeout(t); t = setTimeout(scan, 60); }
  new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState !== 'loading') queue(); else document.addEventListener('DOMContentLoaded', queue);
})();
