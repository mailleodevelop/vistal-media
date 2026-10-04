/* VISTAL click transition */
(function(){var st=document.createElement('style');st.textContent="#vtx{position:fixed;inset:0;z-index:99999;background:#12100e;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .7s cubic-bezier(.4,0,.2,1),visibility 0s linear .7s}\n#vtx.on{opacity:1;visibility:visible;pointer-events:all;transition:opacity .7s cubic-bezier(.4,0,.2,1)}\n#vtx video,#vtx .vtx-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 56%}\n#vtx .vtx-poster{background-size:cover;background-position:50% 56%}\n#vtx .vtx-flash{position:absolute;inset:0;background:radial-gradient(circle at 50% 55%,rgba(255,236,214,.95),rgba(184,115,51,.55) 38%,rgba(18,16,14,0) 70%);opacity:0;mix-blend-mode:screen}\n#vtx .vtx-mark{position:absolute;left:0;right:0;bottom:12vh;text-align:center;font:400 clamp(20px,3vw,34px)/1 'Fraunces',serif;letter-spacing:.32em;color:#f3ede2;opacity:0}";document.head.appendChild(st);})();
. Replace CFG URLs after uploading. -->
<style>
#vtx{position:fixed;inset:0;z-index:99999;background:#12100e;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .7s cubic-bezier(.4,0,.2,1),visibility 0s linear .7s}
#vtx.on{opacity:1;visibility:visible;pointer-events:all;transition:opacity .7s cubic-bezier(.4,0,.2,1)}
#vtx video,#vtx .vtx-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 56%}
#vtx .vtx-poster{background-size:cover;background-position:50% 56%}
#vtx .vtx-flash{position:absolute;inset:0;background:radial-gradient(circle at 50% 55%,rgba(255,236,214,.95),rgba(184,115,51,.55) 38%,rgba(18,16,14,0) 70%);opacity:0;mix-blend-mode:screen}
#vtx .vtx-mark{position:absolute;left:0;right:0;bottom:12vh;text-align:center;font:400 clamp(20px,3vw,34px)/1 'Fraunces',serif;letter-spacing:.32em;color:#f3ede2;opacity:0}
</style>
<script>
(function(){
  if(window.__vtxInit)return;window.__vtxInit=true;
  var CFG={
    match:/vistal/i,            /* links whose href matches this open the transition */
    webm:'https://cdn.jsdelivr.net/gh/mailleodevelop/vistal-media@f6e7042128e7c41f216b9b516e60a312f2849253/vistal-crystals-loop.webm',
    mp4:'https://cdn.jsdelivr.net/gh/mailleodevelop/vistal-media@f6e7042128e7c41f216b9b516e60a312f2849253/vistal-crystals-loop.mp4',
    mobile:'https://cdn.jsdelivr.net/gh/mailleodevelop/vistal-media@f6e7042128e7c41f216b9b516e60a312f2849253/vistal-crystals-mobile.mp4',
    poster:'https://cdn.jsdelivr.net/gh/mailleodevelop/vistal-media@f6e7042128e7c41f216b9b516e60a312f2849253/vistal-crystals-poster.webp',
    playMs:2300                 /* how long the crystal moment plays before the page opens */
  };
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var small=window.matchMedia&&window.matchMedia('(max-width:700px)').matches;
  var el,vid,busy=false;
  function build(withVideo){
    if(el)return;
    el=document.createElement('div');el.id='vtx';el.setAttribute('aria-hidden','true');
    el.innerHTML='<div class="vtx-poster" style="background-image:url(\''+CFG.poster+'\')"></div>'+
      (withVideo?'<video muted playsinline preload="auto"></video>':'')+
      '<div class="vtx-flash"></div><div class="vtx-mark">VISTAL</div>';
    document.body.appendChild(el);
    if(withVideo){
      vid=el.querySelector('video');
      function add(s,t){var e=document.createElement('source');e.src=s;e.type=t;vid.appendChild(e);}
      if(small){add(CFG.mobile,'video/mp4');}else{add(CFG.webm,'video/webm');add(CFG.mp4,'video/mp4');}
      vid.load();
    }
  }
  function anim(node,frames,opt){return node.animate?node.animate(frames,opt):null;}
  /* ARRIVE: overlay held from the previous page, fades out to reveal the page */
  try{
    if(sessionStorage.getItem('vtxArrive')==='1'){
      sessionStorage.removeItem('vtxArrive');
      build(false);el.classList.add('on');el.style.transition='none';
      var fade=function(){requestAnimationFrame(function(){el.style.transition='';el.classList.remove('on');setTimeout(function(){if(el&&el.parentNode){el.parentNode.removeChild(el);el=null;}},900);});};
      if(document.readyState==='complete')setTimeout(fade,200);else window.addEventListener('load',function(){setTimeout(fade,200);});
    }
  }catch(e){}
  /* warm the video when the visitor shows intent */
  function warm(e){var a=e.target.closest&&e.target.closest('a[href]');if(a&&CFG.match.test(a.getAttribute('href'))&&!reduce)build(true);}
  document.addEventListener('mouseover',warm,{passive:true});
  document.addEventListener('touchstart',warm,{passive:true});
  document.addEventListener('click',function(e){
    if(reduce||busy||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||a.target==='_blank'||a.hasAttribute('download'))return;
    var href=a.getAttribute('href');
    if(!href||!CFG.match.test(href))return;
    var u;try{u=new URL(a.href,location.href);}catch(x){return;}
    if(u.origin!==location.origin||u.pathname===location.pathname)return;
    e.preventDefault();busy=true;
    build(true);
    el.classList.add('on');
    var flash=el.querySelector('.vtx-flash'),mark=el.querySelector('.vtx-mark');
    if(vid){var p=vid.play();if(p&&p.catch)p.catch(function(){});}
    setTimeout(function(){
      anim(flash,[{opacity:0},{opacity:.9,offset:.35},{opacity:0}],{duration:1100,easing:'ease-in-out',fill:'forwards'});
      anim(mark,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:900,delay:250,easing:'ease-out',fill:'forwards'});
    },900);
    setTimeout(function(){
      try{sessionStorage.setItem('vtxArrive','1');}catch(x){}
      location.href=u.href;
    },CFG.playMs);
  },true);
  /* back/forward cache: never leave the overlay stuck */
  window.addEventListener('pageshow',function(e){if(e.persisted&&el){el.classList.remove('on');busy=false;}});
})();
