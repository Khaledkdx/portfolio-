export const SPARK_BADGE_MARKUP = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  *{box-sizing:border-box}html,body{width:100%;height:100%;margin:0;overflow:hidden;background:#071017;color:#effbff;font-family:Arial,Helvetica,sans-serif}
  body{display:grid;place-items:center;perspective:1100px;background:radial-gradient(circle at 50% 30%,#27495d 0,#0b1821 38%,#030608 100%)}
  canvas,.mist,.glass{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
  .mist{background:radial-gradient(ellipse at 50% 86%,rgba(134,220,255,.2),transparent 44%),linear-gradient(120deg,transparent 20%,rgba(217,246,255,.08) 48%,transparent 66%);mix-blend-mode:screen}
  .glass{background:repeating-linear-gradient(104deg,transparent 0 24px,rgba(207,242,255,.045) 25px,transparent 27px);opacity:.65}
  .scene{position:relative;width:min(64%,390px);aspect-ratio:.72;display:grid;place-items:center;transform-style:preserve-3d;transition:transform .25s cubic-bezier(.2,.8,.2,1)}
  .lanyard{position:absolute;z-index:0;top:-42%;left:50%;width:31%;height:70%;border:12px solid #111d25;border-bottom:0;border-radius:70px 70px 0 0;transform:translateX(-50%) rotateX(7deg);box-shadow:inset 0 0 0 2px #67808d,0 20px 30px #0008}
  .clip{position:absolute;z-index:3;top:-4%;left:50%;width:31%;height:10%;transform:translateX(-50%);border:1px solid #d3e8f0;border-radius:5px;background:linear-gradient(180deg,#f0fbff,#66808c 54%,#d6edf6);box-shadow:0 8px 20px #000b}
  .card{position:relative;z-index:2;width:100%;height:100%;padding:7%;border:1px solid rgba(220,246,255,.8);border-radius:18px;background:linear-gradient(145deg,rgba(231,246,250,.88),rgba(119,145,157,.78) 48%,rgba(31,46,55,.94));box-shadow:0 38px 65px #000c,inset 0 1px 0 #fff,inset 0 -2px 0 #0c1419;backdrop-filter:blur(7px);overflow:hidden}
  .card:before{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 22%,rgba(255,255,255,.55) 39%,transparent 53%);transform:translateX(-120%);animation:sheen 5.8s ease-in-out infinite}
  .top{display:flex;justify-content:space-between;align-items:center;font:700 10px/1 monospace;letter-spacing:.16em;color:#10212a}.signal{display:flex;align-items:center;gap:6px}.signal i{width:7px;height:7px;border-radius:50%;background:#b8ffdd;box-shadow:0 0 12px #59ffc1}
  .photo{position:relative;width:100%;height:48%;margin:8% 0 7%;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,.7);background:#152530}.photo img{width:100%;height:100%;object-fit:cover;object-position:50% 32%;filter:saturate(.76) contrast(1.08)}
  .photo:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(5,14,20,.58))}
  .role{font:700 clamp(8px,1.8vw,12px)/1 monospace;letter-spacing:.16em;color:#b7f0ff;text-transform:uppercase}.name{margin:3% 0 2%;font-weight:800;font-size:clamp(22px,5.5vw,42px);line-height:.9;letter-spacing:-.06em;color:#f6fdff;text-shadow:0 2px 12px #071017}.line{height:1px;margin:6% 0;background:linear-gradient(90deg,#c8f4ff,transparent)}
  .meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;font:700 clamp(7px,1.5vw,10px)/1.35 monospace;color:#12232c}.meta span{padding:7px;border:1px solid rgba(13,34,44,.32);background:rgba(239,251,255,.32)}
  .serial{position:absolute;right:6%;bottom:3%;font:700 8px monospace;letter-spacing:.15em;color:#b7d1dc;writing-mode:vertical-rl}
  .drop{position:absolute;border-radius:999px;background:linear-gradient(180deg,#fff,rgba(127,216,255,.05));filter:blur(.2px)}
  @keyframes sheen{0%,55%{transform:translateX(-130%)}75%,100%{transform:translateX(130%)}}
  @media(max-width:520px){.scene{width:72%}.card{border-radius:14px}.lanyard{border-width:8px}}
  @media(prefers-reduced-motion:reduce){.scene{transition:none}.card:before{animation:none;transform:translateX(45%);opacity:.16}}
</style>
</head>
<body>
  <canvas id="rain" aria-hidden="true"></canvas><div class="mist"></div><div class="glass"></div>
  <div class="scene" id="scene">
    <div class="lanyard"></div><div class="clip"></div>
    <div class="card">
      <div class="top"><span>K / 031</span><span class="signal"><i></i>ACTIVE</span></div>
      <div class="photo"><img src="/khalid-portrait.jpg" alt="" /></div>
      <div class="role">Business growth / automation</div>
      <div class="name">KHALID<br/>MOHAMAD</div>
      <div class="line"></div>
      <div class="meta"><span>MARKETING<br/>JUDGMENT</span><span>SYSTEMS<br/>THINKING</span></div>
      <div class="serial">VERIFIED OPERATOR · UAE</div>
    </div>
  </div>
<script>
(() => {
  const canvas=document.getElementById('rain');const ctx=canvas.getContext('2d');const scene=document.getElementById('scene');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let width=0,height=0,drops=[],raf=0;
  function resize(){const d=Math.min(devicePixelRatio||1,1.5);width=innerWidth;height=innerHeight;canvas.width=width*d;canvas.height=height*d;ctx.setTransform(d,0,0,d,0,0);const count=Math.max(28,Math.floor(width/7));drops=Array.from({length:count},()=>({x:Math.random()*width,y:Math.random()*height,l:12+Math.random()*48,s:4+Math.random()*9,o:.12+Math.random()*.42}));draw(true)}
  function draw(still){ctx.clearRect(0,0,width,height);ctx.lineCap='round';for(const p of drops){ctx.beginPath();ctx.strokeStyle='rgba(185,233,255,'+p.o+')';ctx.lineWidth=.6+Math.random()*.7;ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-3,p.y+p.l);ctx.stroke();if(!still){p.y+=p.s;p.x-=.4;if(p.y>height+60){p.y=-60;p.x=Math.random()*width}}}if(!still)raf=requestAnimationFrame(()=>draw(false))}
  addEventListener('resize',resize,{passive:true});resize();if(!reduced)draw(false);
  if(!reduced){addEventListener('pointermove',(event)=>{const x=(event.clientX/width-.5)*9;const y=(event.clientY/height-.5)*-8;scene.style.transform='rotateY('+x+'deg) rotateX('+y+'deg) translateZ(10px)'},{passive:true});addEventListener('pointerleave',()=>scene.style.transform='')}
  addEventListener('pagehide',()=>cancelAnimationFrame(raf));
})();
</script>
</body>
</html>`;
