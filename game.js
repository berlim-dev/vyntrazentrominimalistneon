'use strict';
(()=>{
/* ===== BASE ===== */
const $=s=>document.querySelector(s),cv=$('#c'),cx=cv.getContext('2d'),ui=$('#ui'),root=document.documentElement;
const touch=matchMedia('(pointer:coarse)').matches||'ontouchstart' in window;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),S0=30,GR=2400,JV=720,PI=Math.PI;
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
/* ===== DADOS ===== */
const NM='Brisa,Onda,Maré,Eco,Pulso,Rastro,Salto,Ritmo,Faísca,Vórtice,Prisma,Cometa,Horizonte,Órbita,Zênite'.split(',');
const U=[
{n:'AZURIA',c:5,d:[.05,.2],tag:'Leve e moderno',bg:['#e8f7ff','#bfe9ff'],a:'#1e90ff',b:'#18d2e6',hz:'#0b4fd6',bk:'#13b8d6',gd:'#2a6fd8',sh:0,m:{bpm:88,root:57,ch:[[0,'m'],[-4,'M'],[3,'M'],[-2,'M']],sc:[0,3,5,7,10],w:['sine','triangle','sine','triangle'],ar:2,bs:8,dr:0}},
{n:'VELORIA',c:10,d:[.2,.4],tag:'Futurista',bg:['#f1eaff','#d9c9ff'],a:'#8a4dff',b:'#c5a3ff',hz:'#5b21c9',bk:'#a47bff',gd:'#6a3bd6',sh:4,m:{bpm:100,root:50,ch:[[0,'m'],[5,'m'],[-4,'M'],[-2,'M']],sc:[0,2,3,7,8],w:['triangle','sine','triangle','sine'],ar:2,bs:4,dr:1}},
{n:'SOLARIS',c:10,d:[.35,.55],tag:'Vibrante',bg:['#fff6d8','#ffd9a0'],a:'#ff9a1f',b:'#ffd23a',hz:'#e0560a',bk:'#ffb43a',gd:'#e07a14',sh:3,m:{bpm:116,root:55,ch:[[0,'M'],[5,'M'],[7,'M'],[5,'M']],sc:[0,2,4,7,9],w:['triangle','triangle','square','triangle'],ar:1,bs:4,dr:1}},
{n:'NEBULIS',c:15,d:[.55,.8],tag:'Espacial e melódico',bg:['#ffe9f6','#ffc2e6'],a:'#ff2fa8',b:'#d62bff',hz:'#b0107a',bk:'#f06ac0',gd:'#c9288f',sh:-1,m:{bpm:96,root:53,ch:[[0,'m'],[3,'M'],[-4,'M'],[7,'M']],sc:[0,2,3,7,10],w:['sine','sine','triangle','sine'],ar:2,bs:8,dr:1}},
{n:'ECLYPS',c:15,d:[.75,1],tag:'Intenso e futurista',bg:['#e6fff4','#b5f3dc'],a:'#12c98a',b:'#14d6d6',hz:'#067a5c',bk:'#30d6a8',gd:'#0f9f78',sh:6,m:{bpm:132,root:48,ch:[[0,'m'],[-4,'M'],[-7,'M'],[-2,'M']],sc:[0,3,5,7,10],w:['triangle','sawtooth','square','triangle'],ar:1,bs:4,dr:2}}];
const MENU={bpm:104,root:52,ch:[[0,'M'],[7,'M'],[9,'m'],[5,'M']],sc:[0,2,4,7,9],w:['triangle','sine','square','sine'],ar:1,bs:4,dr:1};
const EYES=[{id:'furious',n:'Furioso',p:0},{id:'happy',n:'Alegre',p:145},{id:'sad',n:'Triste',p:155},{id:'blink',n:'Piscando',p:170}];
const CH=[['Cubo Azul',0,'sq','#1e90ff','#7fd0ff','face'],['Cubo Coral',35,'sq','#ff6b57','#ffc2b8','face'],['Cubo Menta',55,'sq','#1fc48f','#b5f3dc','face'],['Cubo Neon',85,'sq','#ff2fd0','#fff','gl',1],['Cubo Listrado',120,'sq','#ffb020','#ff6b57','str'],['Cubo Duplo',160,'sq','#8a4dff','#d9c9ff','in'],['Esfera Solar',210,'ci','#ffb020','#ffe08a','face'],['Esfera Orbital',270,'ci','#12c98a','#14d6d6','ring',1],['Triângulo Prisma',340,'tr','#ff2fa8','#ffd0ee','in'],['Losango Cristal',420,'di','#18d2e6','#fff','in'],['Hexágono Colmeia',520,'hx','#ff9a1f','#ffe08a','in'],['Cubo Aurora',650,'sq','#1e90ff','#ff2fa8','gr',1]].map((v,i)=>({id:'c'+i,n:v[0],p:v[1],sh:v[2],a:v[3],b:v[4],dt:v[5],tr:v[6]}));
/* ===== SAVE ===== */
const KEY='zentro_save_v1',DEF=()=>({coins:0,owned:['c0'],eq:'c0',prog:{},st:{plays:0,dist:0,wins:0,deaths:0},o:{mus:1,sfx:1,q:1,fx:1,vib:1,part:1},last:0,ub:[],eye:'furious',eyeOwned:['furious']});
let S;try{S=Object.assign(DEF(),JSON.parse(localStorage.getItem(KEY)));S.o=Object.assign(DEF().o,S.o);S.st=Object.assign(DEF().st,S.st);S.eyeOwned=Array.isArray(S.eyeOwned)?S.eyeOwned:['furious'];if(S.eye==='classic'||!['furious','happy','sad','blink'].includes(S.eye))S.eye='furious';if(S.eyeOwned.includes('classic')){S.eyeOwned=S.eyeOwned.filter(x=>x!=='classic');if(!S.eyeOwned.includes('furious'))S.eyeOwned.push('furious')}if(!S.eyeOwned.includes('furious'))S.eyeOwned.push('furious')}catch(e){S=DEF()}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const done=(u,i)=>!!(S.prog[u+'-'+i]&&S.prog[u+'-'+i].done),cnt=u=>{let n=0;for(let i=0;i<U[u].c;i++)n+=done(u,i);return n};
const unl=u=>u===0||cnt(u-1)===U[u-1].c,lunl=(u,i)=>unl(u)&&(i===0||done(u,i-1)),eqc=()=>CH.find(c=>c.id===S.eq)||CH[0];
/* ===== AUDIO ===== */
const Q={m:[0,3,7],M:[0,4,7]},fq=m=>440*Math.pow(2,(m-69)/12);
const SF={jump:[['square',320,640,.12,.06]],land:[['sine',170,80,.09,.12]],die:[['sawtooth',300,40,.4,.09],['n',0,0,.3,.1]],win:[['triangle',523,523,.18,.1,0],['triangle',659,659,.18,.1,.12],['triangle',784,784,.18,.1,.24],['triangle',1047,1047,.5,.1,.36]],unlock:[['sine',660,660,.15,.1,0],['sine',880,880,.15,.1,.1],['sine',1320,1320,.4,.1,.2]],click:[['triangle',720,720,.05,.07]],open:[['sine',380,720,.14,.08]],close:[['sine',720,380,.14,.08]],buy:[['triangle',880,880,.08,.09,0],['triangle',1320,1320,.2,.09,.08]],equip:[['sine',600,900,.12,.09]],deny:[['square',200,150,.15,.05]],pause:[['sine',500,300,.12,.08]],resume:[['sine',300,500,.12,.08]],restart:[['triangle',400,800,.15,.08]],shop:[['triangle',520,520,.07,.07,0],['triangle',780,780,.12,.07,.07]],sel:[['sine',900,900,.05,.06]]};
const A={ctx:null,m:null,
init(){if(this.ctx)return;const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=this.ctx=new C();this.sg=c.createGain();this.sg.gain.value=.55;this.sg.connect(c.destination);const b=c.createBuffer(1,c.sampleRate/2,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;this.nb=b},
resume(){if(this.ctx&&this.ctx.state!=='running'&&this.ctx.state!=='closed')this.ctx.resume()},
n(t,f,d,w,v,bus,at){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type=w;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+(at||.01));g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
ns(t,d,v,bus,fr,type){const c=this.ctx,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=this.nb;f.type=type;f.frequency.value=fr;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(bus);s.start(t);s.stop(t+d+.02)},
kick(t,bus,v){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.18);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.2)},
play(cfg,menu){if(!this.ctx||(this.m&&this.m.cfg===cfg))return;this.stop(.6);const c=this.ctx,bus=c.createGain();bus.gain.value=0;bus.gain.setTargetAtTime(S.o.mus?1:0,c.currentTime,.3);bus.connect(this.sg);const L=[0,1,2,3,4].map(()=>{const g=c.createGain();g.gain.value=0;g.connect(bus);return g});const m=this.m={cfg,bus,L,step:0,t:c.currentTime+.1,p:0,paused:0,menu,done:0};m.id=setInterval(()=>this.tick(m),30)},
stop(f){const m=this.m;if(!m)return;this.m=null;clearInterval(m.id);m.bus.gain.setTargetAtTime(0,this.ctx.currentTime,f/3);setTimeout(()=>{try{m.bus.disconnect()}catch(e){}},f*1000+600)},
pause(p){const m=this.m;if(!m)return;m.paused=p;m.bus.gain.setTargetAtTime(p||!S.o.mus?0:1,this.ctx.currentTime,.1)},
setMus(){const m=this.m;if(m)m.bus.gain.setTargetAtTime(S.o.mus&&!m.paused?1:0,this.ctx.currentTime,.1)},
tick(m){const c=this.ctx;if(m.paused){m.t=c.currentTime+.05;return}const th=[0,.12,.28,.5,.72];m.L.forEach((g,k)=>g.gain.setTargetAtTime(m.menu||m.done?1:clamp((m.p-th[k])/.12,0,1),c.currentTime,.25));while(m.t<c.currentTime+.15){this.step(m);m.t+=60/m.cfg.bpm/4;m.step++}},
step(m){const c=m.cfg,s=m.step,ps=s&15,bar=(s>>4)&3,sd=60/c.bpm/4,t=m.t,ch=c.ch[bar],r=c.root+ch[0],iv=Q[ch[1]],L=m.L,w=c.w;
if(ps===0)iv.forEach(v=>this.n(t,fq(r+v+12),sd*16,w[0],.035,L[0],.6));
if(ps%c.bs===0)this.n(t,fq(r-12),sd*c.bs*.9,w[1],.14,L[1]);
if(ps%c.ar===0){const a=[iv[0],iv[1],iv[2],iv[1]+12];this.n(t,fq(r+12+a[(s/c.ar|0)%4]),sd*c.ar*1.3,w[2],.04,L[2],.005)}
if(ps%(c.dr?4:8)===0)this.kick(t,L[3],.22);
if(c.dr===2||ps%2===1)this.ns(t,.04,.025,L[3],7000,'highpass');
if(c.dr&&(ps===4||ps===12))this.ns(t,.12,.07,L[3],1800,'bandpass');
if(ps%2===0&&(ps*5+bar*3)%7<4){const i=(ps/2*3+bar*2)%c.sc.length;this.n(t,fq(r+12+c.sc[i]+(ps>=8?12:0)),sd*3,w[3],.06,L[4],.02)}},
outro(){const m=this.m;if(!m)return;m.done=1;const c=this.ctx,t=c.currentTime+.05,r=m.cfg.root+12;[0,4,7,12,16].forEach((v,i)=>this.n(t+i*.09,fq(r+v+12),1.6,'triangle',.08,m.bus,.01));setTimeout(()=>this.stop(2.5),1200)},
sfx(n){if(!this.ctx||!S.o.sfx)return;const c=this.ctx,t0=c.currentTime;(SF[n]||[]).forEach(([w,f0,f1,d,v,dl])=>{const t=t0+(dl||0);if(w==='n')return this.ns(t,d,v,this.sg,900,'lowpass');const o=c.createOscillator(),g=c.createGain();o.type=w;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(this.sg);o.start(t);o.stop(t+d+.02)})}};
const snd=n=>A.sfx(n);
/* ===== FASES: PERCURSOS AUTORAIS POR FASE ===== */
// Cada universo possui uma linguagem de percurso própria. Os padrões abaixo usam
// exclusivamente os tipos de objeto e as colisões já existentes no jogo.
function build(u,i,demo){
 const D=U[u],pg=D.c>1?i/(D.c-1):0;
 const d=demo?.12:clamp([[.06,.22],[.22,.42],[.42,.58],[.58,.82],[.82,1]][u][0]+([[.06,.22],[.22,.42],[.42,.58],[.58,.82],[.82,1]][u][1]-[[.06,.22],[.22,.42],[.42,.58],[.58,.82],[.82,1]][u][0])*pg,0,1);
 const dSpd=demo?.15:clamp(D.d[0]+(D.d[1]-D.d[0])*pg,0,1);
 const spd=demo?330:330+u*22+dSpd*40;
 const len=demo?5000:7000+u*900+i*150;
 const r=rng(0x5a170+u*7919+i*104729),ob=[];
 const gapSec=1.12-.34*d-.06*pg,rest=Math.round(spd*gapSec);
 let x=demo?800:720;
 const put=(o)=>{ob.push(o)};
 const ground=(t,at,w=30,h=30,extra={})=>put({t,x:at,w,h,...extra});
 const pit=(at,width,ys,ws,ks)=>{
   put({t:'g',x:at,w:width});
   let px=at+10;
   const spacing=ys.length>1?Math.max(4,(width-20-ws.reduce((sum,w)=>sum+w,0))/(ys.length-1)):0;
   for(let j=0;j<ys.length;j++){
     const w=ws[j],y=ys[j],k=ks[j];
     put({t:'pl',k,x:px,w,h:14,y,baseX:px,baseY:y,ph:r()*6.283,amp:0,used:0,dead:0,angle:0});
     px+=w+spacing;
   }
 };
 const motifs=[
  // AZURIA: linhas limpas, ilhas largas e alternância simples de alturas.
  (a)=>{ground('s',a,26,28);ground('s',a+42,26,28);return 100},
  (a)=>{ground('b',a,34,30);ground('s',a+112,26,28);return 168},
  (a)=>{ground('h',a+24,28,28,{y:45});ground('s',a+120,26,28);return 176},
  (a)=>{pit(a,142,[18,26],[58,58],[0,1]);return 164},
  (a)=>{ground('b',a,42,30);ground('b',a+58,42,30);return 140},
  (a)=>{ground('v',a+25,38,24,{y:43,ph:r()*6.28,amp:5});return 92},
  // VELORIA: diagonais de obstáculos, plataformas escalonadas e mudanças de ritmo.
  (a)=>{ground('s',a,24,30);ground('b',a+88,32,38);return 152},
  (a)=>{pit(a,158,[16,30],[54,58],[2,3]);return 180},
  (a)=>{ground('h',a+12,28,28,{y:48});ground('b',a+100,32,42);return 168},
  (a)=>{ground('b',a,34,34);ground('s',a+62,25,30);ground('s',a+94,25,30);return 154},
  (a)=>{pit(a,164,[20,16],[60,58],[5,8]);return 184},
  (a)=>{ground('v',a+12,38,24,{y:40,ph:r()*6.28,amp:6});ground('s',a+112,26,30);return 166},
  // SOLARIS: blocos em sequência, janelas de salto e plataformas em zigue-zague.
  (a)=>{ground('b',a,40,42);ground('s',a+82,26,30);ground('b',a+146,34,30);return 208},
  (a)=>{pit(a,166,[24,14],[56,60],[1,2]);ground('s',a+188,26,30);return 230},
  (a)=>{ground('s',a,26,30);ground('s',a+34,26,30);ground('b',a+112,38,42);return 178},
  (a)=>{ground('p',a+22,108,14,{y:45});ground('s',a+142,26,30);return 194},
  (a)=>{pit(a,160,[14,26],[52,62],[3,5]);return 182},
  (a)=>{ground('h',a+12,28,28,{y:44});ground('v',a+102,38,24,{y:42,ph:r()*6.28,amp:5});return 170},
  // NEBULIS: ilhas suspensas, obstáculos aéreos e travessias em três tempos.
  (a)=>{pit(a,170,[14,30,18],[48,48,48],[8,9,1]);return 194},
  (a)=>{ground('v',a+10,38,24,{y:41,ph:r()*6.28,amp:7});ground('s',a+108,26,32);ground('s',a+142,26,32);return 190},
  (a)=>{ground('b',a,34,46);ground('h',a+100,28,30,{y:48});return 164},
  (a)=>{pit(a,166,[28,16],[58,58],[2,8]);ground('b',a+190,34,38);return 236},
  (a)=>{ground('p',a+12,92,14,{y:28});ground('v',a+130,38,24,{y:43,ph:r()*6.28,amp:6});return 184},
  (a)=>{ground('s',a,24,30);ground('b',a+68,32,42);ground('s',a+142,26,30);return 194},
  // ECLYPS: combinações densas, ilhas estreitas e decisões de salto/espera.
  (a)=>{pit(a,174,[12,26,14],[46,46,48],[9,8,3]);return 198},
  (a)=>{ground('b',a,34,46);ground('s',a+76,24,32);ground('v',a+148,38,24,{y:42,ph:r()*6.28,amp:7});return 206},
  (a)=>{ground('h',a+10,28,30,{y:46});ground('b',a+92,34,42);ground('s',a+164,24,32);return 210},
  (a)=>{pit(a,168,[26,12,24],[46,46,46],[5,9,2]);ground('s',a+194,24,32);return 226},
  (a)=>{ground('s',a,24,32);ground('s',a+30,24,32);ground('b',a+94,34,46);ground('s',a+166,24,32);return 210},
  (a)=>{ground('v',a+10,38,24,{y:40,ph:r()*6.28,amp:7});ground('h',a+92,28,30,{y:46});ground('b',a+164,34,44);return 214}
 ];
 // A ordem e a combinação são exclusivas por fase; os universos usam famílias
 // diferentes e a rotação por índice evita repetir a mesma sequência.
 const families=[[0,1,2,3,4,5],[6,7,8,9,10,11],[12,13,14,15,16,17],[18,19,20,21,22,23],[24,25,26,27,28,29]];
 const family=families[u],count=demo?10:Math.max(12,Math.floor((len-1450)/(rest+250)));
 let n=0,signature=[];
 while(x<len-680&&n<count+8){
   const phase=(i*7+n*5+u*3)%family.length;
   const idx=family[(phase+(n%3===0?i%family.length:0))%family.length];
   const start=x+rest+Math.round(r()*(1-d)*24);
   if(start>=len-680)break;
   const width=motifs[idx](start);
   signature.push(idx);
   x=start+width;
   n++;
 }
 ob.sort((a,b)=>a.x-b.x);
 return{ob,len,spd};
}
/* ===== ESTADO / TELA ===== */
let W,H,sc,dpr,gy=300,G={st:'menu',ob:[],p:null,cam:0},bgG,bgU=-1,cur='',sel=S.eq,eyeSel=S.eye||'classic',tab='aud',rc=0,parts=[],pt=0,hbv='',tt;
function rs(){const og=gy,iw=innerWidth,ih=innerHeight;dpr=Math.min(devicePixelRatio||1,S.o.q?2:1);sc=Math.min(ih/360,iw/520);W=iw/sc;H=ih/sc;gy=Math.round(H*.74);cv.width=iw*dpr;cv.height=ih*dpr;bgG=null;if(G.p)G.p.y+=gy-og}
addEventListener('resize',rs);
function load(u,i,demo){const b=build(u,i,demo);S.last=demo?S.last:u;const th=U[demo?S.last:u];root.style.setProperty('--a',th.a);root.style.setProperty('--b',th.b);G={st:demo?'menu':'play',u:demo?S.last:u,i,demo,ob:b.ob,len:b.len,spd:b.spd,p:{x:0,y:gy-S0,vy:0,rot:0,on:true,sq:0},cam:0,px:140,jb:0,cy:0,held:0,wait:0,age:0,shake:0,fl:0,cnt:0,bi:0,winAnim:0,tr:[]};parts=[]}
const toast=t=>{const e=$('#toast');e.textContent=t;e.className='on';clearTimeout(tt);tt=setTimeout(()=>e.className='',2200)};
const endRun=()=>{if(G.p&&!G.demo&&!G.cnt){G.cnt=1;S.st.dist+=G.p.x;save()}};
function start(u,i){endRun();A.init();A.resume();if(A.ctx)A.stop(.3);S.st.plays++;load(u,i,0);G.wait=.9;cur='';ui.className='';ui.innerHTML='';$('#hud').classList.add('on');$('#hl').textContent=`${U[u].n} ${i+1}/${U[u].c} · ${NM[(i+u*4)%15]}`;A.play(U[u].m,0);save()}
function leave(s,a){endRun();$('#hud').classList.remove('on');load(0,0,1);G.u=S.last;load(S.last,0,1);A.init();if(A.ctx){A.pause(0);A.play(MENU,1)}show(s,a)}
function jump(){if(G.st==='play'&&G.wait<=0){G.jb=.1}}
function pause(){if(G.st!=='play'||G.wait>0)return;G.st='pause';A.pause(1);snd('pause');show('pause')}
function resume(){if(G.st!=='pause')return;G.st='play';A.pause(0);snd('resume');cur='';ui.innerHTML=''}
const restart=()=>{snd('restart');start(G.u,G.i)};
function die(){if(G.demo){burst(G.p,6);load(0,0,1);return}G.st='dead';G.deadT=0;G.shake=.5;burst(G.p,S.o.q?18:8);snd('die');A.stop(.8);if(S.o.vib&&touch&&navigator.vibrate)navigator.vibrate(60);endRun();S.st.deaths++;const pct=Math.floor(clamp(G.p.x/G.len,0,1)*100),k=G.u+'-'+G.i,pr=S.prog[k]||(S.prog[k]={pct:0,sc:0,done:0}),nr=pct>pr.pct,sc2=Math.floor(G.p.x/10);if(nr)pr.pct=pct;pr.sc=Math.max(pr.sc||0,sc2);save();setTimeout(()=>{if(G.st==='dead')show('dead',{pct,sc:sc2,nr})},750)}
function win(){G.st='win';G.winAnim=0;endRun();const k=G.u+'-'+G.i,pr=S.prog[k]||(S.prog[k]={pct:0,sc:0,done:0}),first=!pr.done;pr.pct=100;pr.done=1;const sc2=Math.floor(G.len/10)+500;pr.sc=Math.max(pr.sc||0,sc2);let gain=first?35+G.u*8+G.i*2:10,msg='';if(!S.ub.includes(G.u)&&cnt(G.u)===U[G.u].c){S.ub.push(G.u);gain+=100+G.u*25;msg='Universo concluído!'+(G.u<4?' '+U[G.u+1].n+' desbloqueado.':' Você zerou o ZENTRO!')}S.coins+=gain;S.st.wins++;save();A.outro();snd('win');G.fl=1;for(let z=0;z<5;z++)burst({x:G.p.x+(Math.random()-.5)*120,y:G.p.y-30-Math.random()*80},8);if(msg)setTimeout(()=>snd('unlock'),700);setTimeout(()=>{if(G.st==='win')show('win',{gain,msg,sc:sc2})},1900)}
function nextLv(){const{u,i}=G;if(i+1<U[u].c)return[u,i+1];if(u<4&&unl(u+1))return[u+1,0];return null}
/* ===== FISICA ===== */
function platformPos(o){
 let x=o.baseX,y=o.baseY;
 if(o.k===6)x+=Math.sin(G.age*1.8+o.ph)*o.amp;
 if(o.k===7)y+=Math.sin(G.age*1.8+o.ph)*20;
 if(o.k===14&&o.used)y+=Math.min(34,(G.age-o.used)*95);
 return{x,y};
}
function phys(dt){const p=G.p;G.jb-=dt;G.cy-=dt;
if(G.jb>0&&(p.on||G.cy>0)){p.vy=-JV;p.on=false;G.cy=0;G.jb=0;p.sq=-.5;if(!G.demo)snd('jump')}
const pb=p.y+S0;p.vy+=GR*dt;p.y+=p.vy*dt;const B=p.y+S0,x0=p.x+5,x1=p.x+S0-5,cm=p.x+S0/2;let land=null,landObj=null,dead=false,over=true;
for(const o of G.ob){if(o.t==='g'&&cm>o.x&&cm<o.x+o.w){over=false;break}}
if(over&&B>=gy){if(pb<=gy+6)land=gy;else dead=true}
for(const o of G.ob){if(o.x>p.x+80)break;if(o.x+o.w<p.x-10)continue;
if(o.t==='b'){if(x1>o.x&&x0<o.x+o.w){const top=gy-o.h;if(B>top+1&&p.y<gy){if(pb<=top+8&&p.vy>=0){if(land===null||top<land)land=top}else dead=true}}}
else if(o.t==='s'){if(x1>o.x+7&&x0<o.x+o.w-7&&B-3>gy-o.h+9)dead=true}
else if(o.t==='h'){if(x1>o.x+4&&x0<o.x+o.w-4&&p.y+5<gy-o.y&&B-3>gy-o.y-o.h)dead=true}
 else if(o.t==='v'){const by=gy-o.y-Math.sin(G.age*2.4+o.ph)*o.amp,px=o.x+5,py=by-o.h/2;if(x1>px&&x0<o.x+o.w-5&&B>py+2&&p.y<py+o.h-2)dead=true}
 else if(o.t==='p'){const top=gy-o.y;if(x1>o.x&&x0<o.x+o.w&&B>top&&p.y<top+o.h){if(pb<=top+9&&p.vy>=0){if(land===null||top<land)land=top}else if(B>top+5&&p.y<gy-8)dead=true}}
else if(o.t==='sp'){const top=gy-o.y-o.h;if(x1>o.x+2&&x0<o.x+o.w-2&&B>top+3&&p.y<top+o.h)dead=true}
else if(o.t==='pl'&&!o.dead){const pos=platformPos(o),ox=pos.x,cx=clamp(cm-ox,0,o.w),ang=(o.k===13||o.k===16)?(o.angle||0):0;let top=gy-pos.y-o.h;if(o.k===4){/* acompanha exatamente a face inclinada desenhada do triângulo */top=gy-pos.y-o.h/2-(2*o.h)*(cx/o.w)}else if(ang){top+=((cx-o.w/2)*Math.sin(ang))+((o.h/2)*(1-Math.cos(ang)))}if(x1>ox&&x0<ox+o.w&&B>=top-2&&p.y<top+o.h+5&&p.vy>=0&&pb<=top+Math.max(13,o.h+4)){if(land===null||top<land){land=top;landObj=o}}}}
if(dead||p.y>H+80){die();return}
if(land!==null){p.y=land-S0;p.vy=0;if(!p.on){p.on=true;p.sq=.7;if(!G.demo)snd('land');dust(p,4)}
 if(landObj){const k=landObj.k;if(k===10||k===12){if(!landObj.used)landObj.used=G.age}else if(k===11){p.vy=-920;p.on=false;landObj.used=G.age}else if(k===13||k===14||k===16){landObj.used=G.age}}
 G.cy=.07;if(G.held)G.jb=.1}else p.on=false;
if(!p.on)p.rot+=dt*(PI/2)/.6;else p.rot+=(Math.round(p.rot/(PI/2))*PI/2-p.rot)*Math.min(1,dt*18)}
function bot(){const p=G.p;let o;for(const q of G.ob)if(q.x+q.w>p.x+S0-2){o=q;break}if(!o||!p.on)return;const d=o.x-(p.x+S0),th=o.t==='g'?.09:o.t==='b'&&o.h>30?.17:o.t==='v'?.24:o.t==='p'?.2:.19;if(d<G.spd*th&&d>-5)G.jb=.05}
function upd(dt){const p=G.p;G.age+=dt;for(const o of G.ob){if(o.t==='pl'&&(o.k===10||o.k===12)&&o.used&&G.age-o.used>(o.life||.38))o.dead=1;if(o.t==='pl'&&o.k===13&&o.used)o.angle=Math.min(.28,(G.age-o.used)*.9);if(o.t==='pl'&&o.k===14&&o.used)o.baseY=o.baseY+0; if(o.t==='pl'&&o.k===14&&o.used)o.y=o.baseY+Math.min(34,(G.age-o.used)*95);if(o.t==='pl'&&o.k===16&&o.used)o.angle=Math.min(.18,(G.age-o.used)*.6)}if(G.st==='dead'){G.deadT=(G.deadT||0)+dt;return}if(G.wait>0){G.wait-=dt;return}
G.px=G.demo?W*.6:Math.min(140,W*.25);if(G.st==='win'){G.winAnim=(G.winAnim||0)+dt;p.x=G.len-S0*.4;p.y=gy-S0-Math.sin(Math.min(1,G.winAnim*2.5))*22;p.rot=Math.sin(G.winAnim*5)*.12}else p.x+=G.spd*dt;
if(G.demo)bot();if(G.st!=='win')phys(dt);
if(G.st==='dead')return;p.sq*=Math.exp(-dt*12);G.cam=p.x-G.px;if(p.x>=G.len){if(G.demo)load(0,0,1);else if(G.st==='play')win()}
if(G.st==='play'&&A.m)A.m.p=clamp(p.x/G.len,0,1)}
/* ===== PARTICULAS ===== */
const burst=(p,n)=>{if(!S.o.part&&!G.demo)return;const c=eqc();for(let i=0;i<n;i++)parts.push({x:p.x+15,y:p.y+15,vx:(Math.random()-.5)*420,vy:-Math.random()*400,l:.9,m:.9,s:4+Math.random()*5,c:i%2?c.a:c.b,g:1})};
const dust=(p,n)=>{if(!S.o.part)return;for(let i=0;i<n;i++)parts.push({x:p.x+8+Math.random()*14,y:p.y+S0,vx:-60-Math.random()*60,vy:-Math.random()*60,l:.35,m:.35,s:3,c:'#fff',g:0})};
const TRL=.32,hexRGB=h=>{const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]};
function fx(dt){if(G.st==='pause')return;const cap=S.o.q?140:50;if(parts.length>cap)parts.splice(0,parts.length-cap);for(let i=parts.length-1;i>=0;i--){const q=parts[i];q.l-=dt;if(q.l<=0){parts.splice(i,1);continue}q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.g)q.vy+=1500*dt}
G.shake=Math.max(0,G.shake-dt);G.fl=Math.max(0,G.fl-dt*1.5);const p=G.p;pt+=dt;
if(p&&p.on&&pt>.035&&(G.st==='menu'||(G.st==='play'&&G.wait<=0))){pt=0;dust(p,1)}
// Rastro: posições recentes do personagem (apenas visual; não participa de colisão nem de física).
const tr=G.tr||(G.tr=[]);for(let i=tr.length-1;i>=0;i--){tr[i].l-=dt;if(tr[i].l<=0)tr.splice(i,1)}
if(p&&S.o.part&&(G.st==='menu'||G.st==='win'||(G.st==='play'&&G.wait<=0))){tr.push({x:p.x,y:p.y,l:TRL});if(tr.length>26)tr.shift()}else if(!S.o.part)tr.length=0}
/* ===== DESENHO ===== */
function rr(c,x,y,w,h,r){c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function shp(c,k,x,y,s,r){c.beginPath();if(k===0)c.arc(x,y,s,0,7);else if(k<0){c.arc(x,y,s,0,7);c.moveTo(x+s*.6,y);c.arc(x,y,s*.6,0,7)}else{for(let i=0;i<k;i++){const a=r+i*6.2832/k;c[i?'lineTo':'moveTo'](x+Math.cos(a)*s,y+Math.sin(a)*s)}c.closePath()}c.fill('evenodd')}
function dch(c,h,s,dead=false,eyeOverride){
const r=s/2,eye=EYES.find(e=>e.id===(eyeOverride||S.eye))||EYES[0];c.save();c.fillStyle=h.a;c.strokeStyle=h.b;c.lineWidth=s*.08;
if(h.dt==='gl'){c.shadowColor=h.a;c.shadowBlur=s*.5}
if(h.dt==='gr'){const g=c.createLinearGradient(-r,-r,r,r);g.addColorStop(0,h.a);g.addColorStop(1,h.b);c.fillStyle=g}
c.beginPath();
if(h.sh==='sq')rr(c,-r,-r,s,s,s*.18);else if(h.sh==='ci')c.arc(0,0,r,0,7);
else if(h.sh==='tr'){c.moveTo(0,-r);c.lineTo(r,r*.8);c.lineTo(-r,r*.8);c.closePath()}
else if(h.sh==='di'){c.moveTo(0,-r);c.lineTo(r,0);c.lineTo(0,r);c.lineTo(-r,0);c.closePath()}
else{for(let i=0;i<6;i++){const a=i*PI/3;c[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}c.closePath()}
c.fill();c.shadowBlur=0;if(h.dt==='gl')c.strokeStyle='#fff';c.stroke();
if(h.dt==='in'){c.globalAlpha=.85;c.fillStyle=h.b;c.beginPath();rr(c,-r*.38,-r*.38,r*.76,r*.76,r*.1);c.fill();c.globalAlpha=1}
else if(h.dt==='str'){c.fillStyle=h.b;c.fillRect(-r*.9,-r*.2,s*.9,r*.4)}
else if(h.dt==='ring'){c.strokeStyle=h.b;c.beginPath();c.arc(0,0,r*.55,0,7);c.stroke()}
const ey=r*.57,ex=r*.29,eyeY=ey*.08;
if(dead){
 c.strokeStyle='#17213b';c.lineWidth=Math.max(1.5,s*.055);c.lineCap='round';
 [-1,1].forEach(side=>{const xx=side*ex;c.beginPath();c.moveTo(xx-ey*.42,-ey*.62);c.lineTo(xx+ey*.42,ey*.22);c.moveTo(xx+ey*.42,-ey*.62);c.lineTo(xx-ey*.42,ey*.22);c.stroke()});
}else{
 const blinkNow=eye.id==='blink'&&(Date.now()%3200<170);
 c.fillStyle='#fff';c.strokeStyle='#17213b';c.lineWidth=Math.max(2,s*.075);c.lineJoin='round';
 [-1,1].forEach(side=>{
   c.beginPath();
   if(blinkNow){c.ellipse(side*ex,eyeY,ey*.48,ey*.12,0,0,Math.PI*2)}
   else if(eye.id==='happy'){c.ellipse(side*ex,eyeY+ey*.04,ey*.46,ey*.48,0,0,Math.PI*2)}
   else if(eye.id==='sad'){c.ellipse(side*ex,eyeY+ey*.08,ey*.43,ey*.52,0,0,Math.PI*2)}
   else if(eye.id==='furious'){c.moveTo(side*ex-ey*.48,eyeY-ey*.38);c.lineTo(side*ex+ey*.38,eyeY-ey*.5);c.lineTo(side*ex+ey*.48,eyeY+ey*.38);c.quadraticCurveTo(side*ex,eyeY+ey*.62,side*ex-ey*.48,eyeY+ey*.38);c.closePath()}
   else{c.ellipse(side*ex,eyeY,ey*.45,ey*.52,0,0,Math.PI*2)}
   c.fill();c.stroke();
 });
 c.strokeStyle='#17213b';c.lineWidth=Math.max(2.5,s*.105);c.lineCap='round';c.lineJoin='round';
 [-1,1].forEach(side=>{
   c.beginPath();
   if(eye.id==='happy'){
     c.moveTo(side*ex-ey*.58,-ey*.65);c.quadraticCurveTo(side*ex,-ey*1.02,side*ex+ey*.58,-ey*.65);
   }else if(eye.id==='sad'){
     c.moveTo(side*ex-ey*.58,-ey*.9);c.lineTo(side*ex+ey*.55,-ey*.55);
   }else if(eye.id==='blink'){
     c.moveTo(side*ex-ey*.52,-ey*.68);c.lineTo(side*ex+ey*.52,-ey*.68);
   }else{
     if(side<0){c.moveTo(side*ex-ey*.66,-ey*.94);c.lineTo(side*ex+ey*.62,-ey*.48)}
     else{c.moveTo(side*ex-ey*.62,-ey*.48);c.lineTo(side*ex+ey*.66,-ey*.94)}
   }
   c.stroke();
 });
}
c.restore()}

/* ===== DETALHES MINIMALISTAS (fundo, objetos e mapa) ===== */
const hh=(n)=>{n=Math.imul(n^n>>>15,2246822507);n=Math.imul(n^n>>>13,3266489909);return((n^n>>>16)>>>0)/4294967296};
function farDecor(c,D,cam,u){
 // camada distante: silhuetas do universo (parallax lento)
 const k=.07,sp=210;c.save();c.fillStyle=D.a;
 const i0=Math.floor((cam*k)/sp)-1,i1=i0+Math.ceil(W/sp)+3;
 for(let i=i0;i<=i1;i++){const r=hh(i*31+u*7),x=i*sp-cam*k+r*60,b=gy-6;c.globalAlpha=.09;
  if(u===0){c.beginPath();c.arc(x+60,b,50+r*60,Math.PI,0);c.fill()}
  else if(u===1){const w=34+r*30,h=60+hh(i+9)*110;c.fillRect(x,b-h,w,h);c.fillRect(x+w+6,b-h*.6,w*.7,h*.6)}
  else if(u===2){c.beginPath();c.moveTo(x-40,b);c.quadraticCurveTo(x+50,b-80-r*60,x+150,b);c.fill();if(i%3===0){c.globalAlpha=.12;c.fillStyle=D.b;c.beginPath();c.arc(x+60,b-150-r*40,26,0,7);c.fill();c.fillStyle=D.a}}
  else if(u===3){c.globalAlpha=.1;c.beginPath();c.arc(x+40,b-120-r*90,14+r*26,0,7);c.fill();c.globalAlpha=.16;c.lineWidth=2;c.strokeStyle=D.a;c.beginPath();c.ellipse(x+40,b-120-r*90,(14+r*26)*1.7,(14+r*26)*.4,-.3,0,7);c.stroke()}
  else{const h=70+r*90;c.beginPath();c.moveTo(x,b);c.lineTo(x+14,b-h);c.lineTo(x+34,b-h);c.lineTo(x+48,b);c.fill();c.globalAlpha=.14;c.fillRect(x+16,b-h-12,16,12)}}
 // estrelas / pontos minimalistas
 c.fillStyle=D.hz;for(let i=0;i<22;i++){const x=(((hh(i*5+u)*(W+80))-cam*(.04+(i%3)*.03))%(W+80)+(W+80))%(W+80)-40,y=18+hh(i*9+u*3)*(gy*.62);c.globalAlpha=.1+.1*((i%3)/2);const s=1.5+(i%3);c.fillRect(x,y,s,s)}
 c.restore()}
function floatDecor(c,D,cam){
 // objetos flutuantes (cruzes, losangos, anéis) em duas profundidades
 c.save();c.lineWidth=2;c.lineCap='round';
 for(let l=0;l<2;l++){const k=.22+l*.18,n=8,sp=W+200;for(let i=0;i<n;i++){const x=(((i*sp/n+hh(i+l*50)*70)-cam*k)%sp+sp)%sp-100,y=26+hh(i*13+l*7)*(gy-110),t=G.age||0,bob=Math.sin(t*1.2+i)*4,s=5+hh(i+3)*5+l*2;
  c.globalAlpha=.16+.08*l;c.strokeStyle=i%2?D.a:D.b;c.save();c.translate(x,y+bob);c.rotate(t*.3*(i%2?1:-1)+i);c.beginPath();
  const m=(i+l)%3;if(m===0){c.moveTo(-s,0);c.lineTo(s,0);c.moveTo(0,-s);c.lineTo(0,s)}else if(m===1){c.moveTo(0,-s);c.lineTo(s,0);c.lineTo(0,s);c.lineTo(-s,0);c.closePath()}else c.arc(0,0,s,0,7);c.stroke();c.restore()}}
 c.restore()}
function groundDecor(c,D,cam,x0,x1){
 // detalhes dentro do chão: só onde há chão (recorte), nada sobre os vãos
 c.save();c.beginPath();let sx=x0;for(const o of G.ob){if(o.t!=='g'||o.w===undefined||o.x+o.w<x0||o.x>x1)continue;c.rect(sx-cam,gy,o.x-sx,H-gy);sx=o.x+o.w}c.rect(sx-cam,gy,x1-sx,H-gy);c.clip();
 const cell=64,a=Math.floor(x0/cell),b=Math.ceil(x1/cell);
 for(let i=a;i<=b;i++){const r=hh(i*17+(G.u|0)*3),x=i*cell-cam,y=gy+16+r*Math.max(10,(H-gy)-30);
  c.globalAlpha=.16;c.fillStyle='#fff';
  const m=i%4;if(m===0)c.fillRect(x,y,28+r*18,3);else if(m===1){c.beginPath();c.arc(x+10,y,3+r*3,0,7);c.fill()}else if(m===2){c.fillRect(x,y,3,14);c.fillRect(x+9,y+4,3,10)}else{c.strokeStyle='#fff';c.lineWidth=2;c.strokeRect(x,y,12,12)}
  if(r>.6){c.globalAlpha=.1;c.fillStyle=D.hz;c.fillRect(x+30,y+18,20,4)}}
 c.globalAlpha=.08;c.fillStyle='#000';for(let x=-(cam%160);x<W;x+=160)c.fillRect(x,gy+5,2,H-gy);
 c.restore()}
function surfDecor(c,D,cam,x0,x1){
 // pequenos detalhes sobre a superfície (baixos e arredondados, não confundem com obstáculos)
 const cell=90,a=Math.floor(x0/cell),b=Math.ceil(x1/cell);c.save();
 for(let i=a;i<=b;i++){const r=hh(i*29+(G.u|0)),wx=i*cell+r*50;if(G.ob.some(o=>o.t==='g'&&wx>o.x-14&&wx<o.x+o.w+14))continue;if(G.ob.some(o=>o.t!=='g'&&o.t!=='v'&&o.t!=='p'&&o.t!=='pl'&&o.t!=='h'&&wx>o.x-16&&wx<o.x+(o.w||0)+16))continue;
  const x=wx-cam;c.globalAlpha=.3;c.fillStyle='#fff';c.beginPath();if(i%3===0){c.arc(x,gy-3,3,Math.PI,0);c.arc(x+7,gy-3,2,Math.PI,0)}else if(i%3===1){c.rect(x,gy-3,12,3)}else{c.arc(x,gy-2,2.4,0,7)}c.fill()}
 c.restore()}
function draw(){const c=cx,D=U[G.u]||U[0];c.setTransform(dpr*sc,0,0,dpr*sc,0,0);
if(!bgG||bgU!==G.u){bgG=c.createLinearGradient(0,0,0,H);bgG.addColorStop(0,D.bg[0]);bgG.addColorStop(1,D.bg[1]);bgU=G.u}
c.fillStyle=bgG;c.fillRect(0,0,W,H);c.save();
if(G.shake>0&&S.o.fx)c.translate((Math.random()-.5)*G.shake*14,(Math.random()-.5)*G.shake*14);
const cam=G.cam,L=S.o.q?2:1;
farDecor(c,D,cam,G.u|0);
for(let l=0;l<L;l++){const k=.12+l*.22,n=9,sp=W+260;for(let i=0;i<n;i++){const x=(((i*sp/n+(i*53%40))-cam*k)%sp+sp)%sp-130,y=30+((i*73+l*131)%Math.floor(gy-80)),s=(24+((i*37+l*19)%50))*(l?1.2:.8);c.globalAlpha=.12+.08*l;c.fillStyle=i%2?D.a:D.b;shp(c,D.sh,x,y,s,cam*.002*(i%2?1:-1)+i)}}
c.globalAlpha=1;
for(let j=0;j<7;j++){const dx=((j*173-cam*.38)%(W+180)+(W+180))%(W+180)-70,dy=gy-35-((j*47)%Math.max(70,gy*.42));c.globalAlpha=.16;c.strokeStyle=j%2?D.a:D.b;c.lineWidth=2;c.beginPath();c.arc(dx,dy,5+(j%3)*3,0,Math.PI*2);c.stroke();c.beginPath();c.moveTo(dx-9,dy+12);c.lineTo(dx+9,dy+12);c.stroke()}
c.globalAlpha=1;
floatDecor(c,D,cam);
const x0=cam-60,x1=cam+W+60;let sx=x0;c.fillStyle=D.gd;
for(const o of G.ob){if(o.t!=='g'||o.x+o.w<x0||o.x>x1)continue;c.fillRect(sx-cam,gy,o.x-sx,H-gy);sx=o.x+o.w}c.fillRect(sx-cam,gy,x1-sx,H-gy);
c.fillStyle='rgba(255,255,255,.45)';sx=x0;for(const o of G.ob){if(o.t!=='g'||o.x+o.w<x0||o.x>x1)continue;c.fillRect(sx-cam,gy,o.x-sx,5);sx=o.x+o.w}c.fillRect(sx-cam,gy,x1-sx,5);
c.fillStyle='rgba(255,255,255,.14)';for(let x=-(cam%80);x<W;x+=80)c.fillRect(x,gy+24,36,5);
groundDecor(c,D,cam,x0,x1);surfDecor(c,D,cam,x0,x1);
for(const o of G.ob){if(o.x+o.w<x0||o.x>x1||o.t==='g')continue;const x=o.x-cam;
if(o.t==='v'){const by=gy-o.y-Math.sin(G.age*2.4+o.ph)*o.amp;c.save();c.translate(x+o.w/2,by);c.fillStyle=D.hz;c.beginPath();c.ellipse(0,0,12,7,0,0,7);c.fill();c.fillStyle=D.a;c.beginPath();c.arc(10,-2,5,0,7);c.fill();c.strokeStyle=D.hz;c.lineWidth=3;c.lineCap='round';const flap=Math.sin(G.age*13+o.ph)*8;c.beginPath();c.moveTo(-3,0);c.quadraticCurveTo(-12,-12-flap,-19,-8-flap);c.moveTo(2,0);c.quadraticCurveTo(-5,12+flap,-12,9+flap);c.stroke();c.restore()}
else if(o.t==='p'){c.fillStyle=D.bk;c.shadowColor=D.a;c.shadowBlur=10;c.beginPath();rr(c,x,gy-o.y,o.w,o.h,7);c.fill();c.shadowBlur=0;c.fillStyle='rgba(255,255,255,.65)';c.fillRect(x+8,gy-o.y+3,o.w-16,2)}
else if(o.t==='pl'&&!o.dead){const pos=platformPos(o),px=pos.x-cam,py=gy-pos.y-o.h;c.save();c.translate(px+o.w/2,py+o.h/2);if(o.k===13||o.k===16)c.rotate(o.angle||0);c.fillStyle=D.bk;c.shadowColor=D.a;c.shadowBlur=8;c.beginPath();if(o.k===4){c.moveTo(-o.w/2,o.h);c.lineTo(o.w/2,-o.h);c.lineTo(o.w/2,o.h);c.closePath()}else if(o.k===17){c.transform(1,.0,-.18,1,0,0);rr(c,-o.w/2,-o.h/2,o.w,o.h,5)}else rr(c,-o.w/2,-o.h/2,o.w,o.h,5);c.fill();c.shadowBlur=0;c.fillStyle='rgba(255,255,255,.58)';c.fillRect(-o.w/2+7,-o.h/2+2,Math.max(4,o.w-14),2);if(o.k===11){c.save();c.strokeStyle='#fff';c.fillStyle='#fff';c.lineWidth=3;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(0,4);c.lineTo(0,-5);c.moveTo(-6,-1);c.lineTo(0,-8);c.lineTo(6,-1);c.stroke();c.restore()}if((o.k===10||o.k===12)&&o.used){const left=clamp(1-(G.age-o.used)/(o.life||.38),0,1);c.globalAlpha=.9;c.fillStyle='rgba(255,255,255,.35)';c.fillRect(-o.w/2,-o.h/2-6,o.w,3);c.fillStyle=D.hz;c.fillRect(-o.w/2,-o.h/2-6,o.w*left,3);c.globalAlpha=.45+.45*Math.sin(G.age*24);c.strokeStyle=D.hz;c.lineWidth=2;c.strokeRect(-o.w/2+1,-o.h/2+1,o.w-2,o.h-2)}else if(o.k===10||o.k===12){c.globalAlpha=.9;c.strokeStyle=D.hz;c.lineWidth=1.5;c.strokeRect(-o.w/2+2,-o.h/2+1,o.w-4,o.h-2)}c.restore()}
else if(o.t==='sp'){const top=gy-o.y-o.h;c.fillStyle=D.hz;c.beginPath();c.moveTo(x,top+o.h);c.lineTo(x+o.w/2,top);c.lineTo(x+o.w,top+o.h);c.closePath();c.fill();c.strokeStyle='rgba(255,255,255,.65)';c.lineWidth=1.5;c.beginPath();c.moveTo(x+o.w/2,top+4);c.lineTo(x+o.w/2,top+o.h-2);c.stroke()}
else if(o.t==='s'){c.fillStyle=D.hz;c.beginPath();c.moveTo(x,gy);c.lineTo(x+o.w/2,gy-o.h);c.lineTo(x+o.w,gy);c.fill()}
else if(o.t==='b'){c.fillStyle=D.bk;c.beginPath();rr(c,x,gy-o.h,o.w,o.h+4,5);c.fill();c.fillStyle='rgba(255,255,255,.4)';c.fillRect(x+3,gy-o.h+3,o.w-6,5);c.strokeStyle=D.hz;c.lineWidth=2;c.beginPath();rr(c,x+1,gy-o.h+1,o.w-2,o.h+2,5);c.stroke()}
else if(o.t==='h'){const cy=gy-o.y-o.h/2;c.fillStyle=D.hz;c.beginPath();c.moveTo(x+o.w/2,cy-o.h/2-4);c.lineTo(x+o.w+4,cy);c.lineTo(x+o.w/2,cy+o.h/2+4);c.lineTo(x-4,cy);c.fill()}}
if(G.len){const fx0=G.len-cam,glow=.5+.5*Math.sin(G.age*4);c.save();c.translate(fx0,gy-74);c.globalAlpha=.22+.12*glow;c.fillStyle=D.a;c.beginPath();c.ellipse(0,0,38+glow*5,82+glow*5,0,0,7);c.fill();c.globalAlpha=1;c.strokeStyle=D.a;c.lineWidth=7;c.beginPath();c.ellipse(0,0,25,68,0,0,7);c.stroke();c.strokeStyle=D.b;c.lineWidth=2;c.beginPath();c.ellipse(0,0,16,58,0,0,7);c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(0,-72,5+glow*2,0,7);c.fill();c.restore()}
for(const q of parts){c.globalAlpha=clamp(q.l/q.m,0,1);c.fillStyle=q.c;c.fillRect(q.x-cam,q.y,q.s,q.s)}c.globalAlpha=1;
const p=G.p;if(G.tr&&G.tr.length>1&&S.o.part){const h=eqc(),t=G.tr,rgb=hexRGB(h.a),n=t.length,hx=t[n-1].x-cam+S0/2,tx=t[0].x-cam+S0/2;
 c.save();const gr=c.createLinearGradient(tx,0,Math.max(hx,tx+1),0);gr.addColorStop(0,`rgba(${rgb},0)`);gr.addColorStop(1,`rgba(${rgb},.42)`);c.fillStyle=gr;c.beginPath();
 for(let i=0;i<n;i++){const k=clamp(t[i].l/TRL,0,1),hw=S0*(.08+.34*k),X=t[i].x-cam+S0/2,Y=t[i].y+S0/2;i?c.lineTo(X,Y-hw):c.moveTo(X,Y-hw)}
 for(let i=n-1;i>=0;i--){const k=clamp(t[i].l/TRL,0,1),hw=S0*(.08+.34*k);c.lineTo(t[i].x-cam+S0/2,t[i].y+S0/2+hw)}
 c.closePath();c.fill();c.restore()}
if(p){const h=eqc();c.save();c.translate(p.x-cam+S0/2,p.y+S0);c.scale(1+.25*p.sq,1-.25*p.sq);c.translate(0,-S0/2);c.rotate(p.rot);dch(c,h,S0,G.st==='dead');c.restore()}
c.restore();
if(G.wait>0&&G.st==='play'){c.fillStyle='rgba(22,32,58,.8)';c.font='900 34px "Avenir Next","Segoe UI",sans-serif';c.textAlign='center';c.fillText('Pronto?',W/2,H*.35)}
if(G.st==='win'){const a=clamp((G.winAnim||0)*2,0,1),pulse=1+Math.sin((G.winAnim||0)*8)*.035;c.save();c.globalAlpha=a;c.translate(W/2,H*.24);c.scale(pulse,pulse);c.textAlign='center';c.font='900 27px "Avenir Next","Segoe UI",sans-serif';c.fillStyle=D.hz;c.fillText('CONQUISTA!',0,0);c.font='800 11px "Avenir Next","Segoe UI",sans-serif';c.fillStyle=D.a;c.fillText('FASE CONCLUÍDA',0,19);c.restore()}
if(G.fl>0){c.fillStyle=`rgba(255,255,255,${G.fl*.6})`;c.fillRect(0,0,W,H)}}
function hud(){if(G.st!=='play'&&G.st!=='win'&&G.st!=='pause')return;const v=Math.floor(clamp(G.p.x/G.len,0,1)*100);if(v+''!==hbv){hbv=v+'';$('#hb').style.width=v+'%';$('#hp').textContent=v+'%'}}
function pv(t,eyePreview){const c=$('#pv');if(!c)return;const x=c.getContext('2d'),h=CH.find(q=>q.id===sel),g=x.createLinearGradient(0,0,0,200);x.setTransform(1,0,0,1,0,0);g.addColorStop(0,'#fff');g.addColorStop(1,'#cfe9ff');x.fillStyle=g;x.fillRect(0,0,200,200);x.fillStyle='#2a6fd8';x.fillRect(0,150,200,50);
const ph=(t*1.1)%1.5,a=ph<.9?ph/.9:-1,y=a>=0?Math.sin(a*PI)*60:0,sq=a<0?Math.max(0,.4-(ph-.9)*.9):0;
x.fillStyle='rgba(22,32,58,.15)';x.beginPath();x.ellipse(100,152,26-y*.15,5,0,0,7);x.fill();
x.save();x.translate(100,150-y);x.scale(1+.25*sq,1-.25*sq);x.translate(0,-30);x.rotate(a>=0?a*PI/2:0);dch(x,h,60,false,eyePreview||S.eye);x.restore()}
/* ===== UI ===== */
const IC={play:'M8 5v14l11-7z',grid:'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',bag:'M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2',cup:'M8 4h8v6a4 4 0 01-8 0zM8 6H4v1a3 3 0 003 3M16 6h4v1a3 3 0 01-3 3M12 14v4M8 20h8',gear:'M12 9a3 3 0 100 6 3 3 0 000-6zM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1',info:'M12 3a9 9 0 100 18 9 9 0 000-18zM12 11v6M12 7.5v.5',back:'M15 5l-7 7 7 7',pause:'M8 5v14M16 5v14',lock:'M6 11h12v9H6zM9 11V8a3 3 0 016-0v3',check:'M5 12l5 5 9-10',coin:'M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 12h5'};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24"><path d="${IC[n]}"/></svg>`;$('#pb').innerHTML=ic('pause');
const top=(t,b,s)=>`<div class="top">${b?`<button class="ib" data-a="bk" data-s="${b}" data-u="${s===undefined?'':s}" aria-label="Voltar">${ic('back')}</button>`:''}<h2>${t}</h2><span class="chip">${ic('coin')}${S.coins}</span></div>`;
const row=(l,c)=>`<div class="row"><span>${l}</span>${c}</div>`,tg=(k,a,b)=>`<button class="tg ${S.o[k]?'on':''}" data-a="tg" data-k="${k}">${S.o[k]?(a||'Ligado'):(b||'Desligado')}</button>`;
const R={
menu:()=>`<div class="logo"><i></i>ZENTRO</div><p class="sub">MINIMALIST NEON</p><div class="panel mg"><button class="btn big" data-a="play">${ic('play')}JOGAR</button><button class="btn g" data-a="go" data-s="uni">${ic('grid')}UNIVERSOS</button><button class="btn g" data-a="go" data-s="shop">${ic('bag')}LOJA DE PERSONAGENS</button><button class="btn g" data-a="go" data-s="rec">${ic('cup')}RECORDES</button><button class="btn g" data-a="go" data-s="opt">${ic('gear')}OPÇÕES</button><button class="btn g wide" data-a="go" data-s="cred">${ic('info')}CRÉDITOS</button></div>`,
uni:()=>top('Universos','menu')+`<div class="panel list">${U.map((D,u)=>{const ok=unl(u),n=cnt(u);return`<button class="uc ${ok?'':'lk'}" style="--a:${D.a};--b:${D.b}" data-a="uni" data-u="${u}"><b>${D.n}</b><span>${D.tag} · ${D.c} fases</span><div class="bar"><i style="width:${n/D.c*100}%"></i></div><em>${ok?n+'/'+D.c:ic('lock')}</em></button>`}).join('')}</div>`,
lv:u=>{const D=U[u];return top(D.n,'uni')+`<div class="panel lvs">${Array.from({length:D.c},(_,i)=>{const ok=lunl(u,i),dn=done(u,i),pr=S.prog[u+'-'+i];return`<button class="lv ${dn?'dn':ok?'ok':'lk'}" data-a="lvl" data-u="${u}" data-i="${i}">${ok?(dn?ic('check'):i+1):ic('lock')}<small>${NM[(i+u*4)%15]}${!dn&&pr&&pr.pct?' · '+pr.pct+'%':''}</small></button>`}).join('')}</div>`},
shop:()=>{const h=CH.find(c=>c.id===sel)||CH[0],own=S.owned.includes(h.id),eq=S.eq===h.id,eye=EYES.find(e=>e.id===eyeSel)||EYES[0],eyeOwned=S.eyeOwned.includes(eye.id),eyeEquipped=S.eye===eye.id;return top('Loja','menu')+`<div class="panel shop"><div class="pre"><canvas id="pv" width="200" height="200"></canvas><b>${h.n}</b><span>${own?(eq?'Equipado':'Adquirido'):h.p+' moedas'}</span>${own?`<button class="btn" data-a="eq" ${eq?'disabled':''}>${eq?'Equipado':'Equipar'}</button>`:`<button class="btn" data-a="buy">Comprar · ${h.p}</button>`}<small>Todos têm a mesma jogabilidade.</small></div><div class="shopcontent"><b class="section-label">PERSONAGENS</b><div class="thg">${CH.map(c=>`<button class="th ${c.id===sel?'s':''}" data-a="pick" data-id="${c.id}"><canvas class="tc" data-id="${c.id}" width="56" height="56"></canvas>${S.eq===c.id?'Equipado':S.owned.includes(c.id)?'Seu':c.p}</button>`).join('')}</div><div class="eyes-shop"><b class="section-label">PERSONALIZAR OLHOS</b><p class="eye-hint">Prévia do personagem selecionado acima.</p><div class="eyegrid">${EYES.map(e=>`<button class="eyeopt ${e.id===eyeSel?'s':''}" data-a="pickEye" data-id="${e.id}"><b>${e.n}</b><small>${S.eyeOwned.includes(e.id)?(S.eye===e.id?'Em uso':'Adquirido'):e.p+' moedas'}</small></button>`).join('')}</div><div class="eye-action">${eyeOwned?`<button class="btn" data-a="eqeye" ${eyeEquipped?'disabled':''}>${eyeEquipped?'Olhos em uso':'Aplicar olhos'}</button>`:`<button class="btn" data-a="buyeye">Comprar olhos · ${eye.p} moedas</button>`}</div></div></div></div>`},
rec:()=>{let b='Nenhum ainda',bu=-1,bi=-1,tot=0;U.forEach((D,u)=>{tot+=D.c;for(let i=0;i<D.c;i++){const p=S.prog[u+'-'+i];if(p&&p.pct&&(u>bu||(u===bu&&i>bi))){bu=u;bi=i;b=`${D.n} ${i+1} · ${p.pct}%`}}});const nd=U.reduce((a,_,u)=>a+cnt(u),0),st=[['Fases concluídas',nd+'/'+tot],['Melhor progresso',b],['Distância percorrida',Math.round(S.st.dist/30)+' m'],['Total de partidas',S.st.plays],['Universos desbloqueados',U.filter((_,u)=>unl(u)).length+'/5'],['Personagens adquiridos',S.owned.length+'/'+CH.length],['Vitórias / quedas',S.st.wins+' / '+S.st.deaths]];return top('Recordes','menu')+`<div class="panel stats">${st.map(s=>`<div class="st"><b>${s[1]}</b><span>${s[0]}</span></div>`).join('')}</div>`},
opt:()=>{const T=[['aud','Áudio'],['vid','Vídeo'],['gm','Jogabilidade'],['how','Como jogar'],['rs','Restaurar']];let b='';
if(tab==='aud')b=row('Música',tg('mus'))+row('Efeitos sonoros',tg('sfx'));
else if(tab==='vid')b=(touch?'':row('Tela cheia',`<button class="tg" data-a="fs">Alternar</button>`))+row('Qualidade visual',tg('q','Alta','Baixa'))+row('Efeitos de tela (tremor e brilho)',tg('fx'));
else if(tab==='gm')b=(touch?row('Vibração',tg('vib')):'')+row('Partículas e rastros',tg('part'));
else if(tab==='how')b=`<h3>Objetivo</h3><p>O cubo avança sozinho. Pule para desviar de espinhos, buracos e obstáculos suspensos e chegue ao final de cada fase.</p><h3>Controles</h3>${touch?'<p>Toque em qualquer lugar da tela para pular. Use o botão no topo para pausar.</p>':'<p>ESPAÇO, W, SETA PARA CIMA ou clique do mouse: pular.<br>ESC: pausar. R: reiniciar.</p>'}<h3>Progresso e universos</h3><p>A barra no topo mostra a porcentagem da fase. Conclua todas as fases de um universo para desbloquear o próximo.</p><h3>Moedas e loja</h3><p>Ganhe moedas ao concluir fases e universos. Na loja, toque num personagem para ver a prévia, compre e equipe. Eles são só visuais.</p>`;
else b=rc?`<p>Restaurar as configurações padrão? Seu progresso e suas compras não serão apagados.</p><div class="mg"><button class="btn" data-a="rok">Confirmar</button><button class="btn g" data-a="rno">Cancelar</button></div>`:`<p>Volta áudio, vídeo e jogabilidade aos valores padrão.</p><button class="btn" data-a="rst">Restaurar configurações</button>`;
return top('Opções','menu')+`<div class="panel"><div class="tabs">${T.map(t=>`<button class="${tab===t[0]?'on':''}" data-a="tab" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>${b}</div>`},
cred:()=>top('Créditos','menu')+`<div class="panel"><h3>VYNTRA</h3><p>Desenvolvedor independente e criador do ZENTRO.</p><p>Responsável pela concepção, desenvolvimento e criação da experiência do jogo.</p><p>Este projeto representa criatividade, dedicação e paixão pelo desenvolvimento de jogos.</p><p><b>Obrigado por jogar!</b></p></div>`,
pause:()=>`<div class="panel res"><h1>Pausado</h1><div class="acts"><button class="btn" data-a="resume">Continuar</button><button class="btn g" data-a="restart">Reiniciar fase</button><button class="btn g" data-a="menu">Voltar ao menu</button></div></div>`,
dead:a=>`<div class="panel res"><h1>Fim de partida</h1><div class="big2">${a.pct}%</div><p>Pontuação: ${a.sc}${a.nr?' · <b>Novo recorde!</b>':''}</p><div class="acts"><button class="btn" data-a="restart">Tentar novamente</button><button class="btn g" data-a="lvls">Seleção de fases</button><button class="btn g" data-a="menu">Menu</button></div></div>`,
win:a=>{const n=nextLv();return`<div class="panel res"><h1>Fase concluída!</h1><div class="big2">${a.sc}</div><p>Pontuação · +${a.gain} moedas</p>${a.msg?`<p><b>${a.msg}</b></p>`:''}<div class="acts">${n?'<button class="btn" data-a="next">Continuar</button>':''}<button class="btn g" data-a="lvls">Seleção de fases</button><button class="btn g" data-a="menu">Menu</button></div></div>`}};
function show(n,a){cur=n;ui.className=n==='menu'?'m':'';ui.innerHTML=`<div class="scr">${R[n](a)}</div>`;if(n==='shop'){ui.querySelectorAll('.tc').forEach(c=>{const x=c.getContext('2d');x.translate(28,28);dch(x,CH.find(h=>h.id===c.dataset.id)||CH[0],36)})}}
const act={
play(){let t=null;for(let u=0;u<5&&!t;u++)for(let i=0;i<U[u].c;i++)if(lunl(u,i)&&!done(u,i)){t=[u,i];break}if(!t)t=[S.last,0];start(t[0],t[1])},
go(d){snd(d.s==='shop'?'shop':'open');if(d.s==='shop'){sel=S.eq;eyeSel=S.eye||'furious'}show(d.s)},
bk(d){snd('close');d.s==='menu'?show('menu'):show(d.s)},
uni(d){const u=+d.u;if(!unl(u)){snd('deny');return toast('Conclua todas as fases de '+U[u-1].n)}snd('open');S.last=u;load(u,0,1);show('lv',u)},
lvl(d){const u=+d.u,i=+d.i;if(!lunl(u,i)){snd('deny');return toast('Fase bloqueada')}snd('click');start(u,i)},
pause,resume,restart,menu(){snd('close');leave('menu')},lvls(){snd('close');leave('lv',G.u)},
next(){const n=nextLv();if(n){snd('click');start(n[0],n[1])}},
pick(d){sel=d.id;snd('sel');show('shop')},pickEye(d){eyeSel=d.id;snd('sel');show('shop')},
buy(){const h=CH.find(c=>c.id===sel);if(!h)return;if(S.owned.includes(h.id)){toast('Personagem já adquirido');return}if(S.coins<h.p){snd('deny');return toast('Moedas insuficientes')}S.coins-=h.p;S.owned.push(h.id);S.eq=h.id;save();snd('buy');toast(h.n+' adquirido e equipado');show('shop')},
eq(){if(S.owned.includes(sel)){S.eq=sel;save();snd('equip');show('shop')}},buyeye(){const e=EYES.find(x=>x.id===eyeSel);if(!e||S.eyeOwned.includes(e.id))return;if(S.coins<e.p){snd('deny');return toast('Moedas insuficientes')}S.coins-=e.p;S.eyeOwned.push(e.id);S.eye=e.id;save();snd('buy');toast('Olhos desbloqueados e aplicados');show('shop')},eqeye(){if(S.eyeOwned.includes(eyeSel)){S.eye=eyeSel;save();snd('equip');show('shop')}},
tg(d){const k=d.k;S.o[k]=S.o[k]?0:1;save();snd('click');if(k==='mus')A.setMus();if(k==='q')rs();show('opt')},
tab(d){tab=d.t;rc=0;snd('sel');show('opt')},
fs(){snd('click');document.fullscreenElement?document.exitFullscreen():root.requestFullscreen&&root.requestFullscreen()},
rst(){rc=1;snd('click');show('opt')},rno(){rc=0;snd('close');show('opt')},
rok(){S.o=DEF().o;rc=0;save();A.setMus();rs();snd('restart');toast('Configurações restauradas');show('opt')}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;first();b.blur();act[b.dataset.a]&&act[b.dataset.a](b.dataset)});
/* ===== ENTRADA ===== */
function first(){A.init();A.resume();if(A.ctx&&!A.m&&G.st==='menu')A.play(MENU,1)}
cv.addEventListener('pointerdown',e=>{e.preventDefault();first();G.held=1;jump()});
addEventListener('pointerup',()=>{G.held=0});
addEventListener('keydown',e=>{const k=e.code;first();if(k==='Space'||k==='KeyW'||k==='ArrowUp'){e.preventDefault();if(!e.repeat){G.held=1;jump()}}else if(k==='Escape'){G.st==='play'?pause():resume()}else if(k==='KeyR'&&!G.demo&&['play','pause','dead'].includes(G.st))restart()});
addEventListener('keyup',e=>{if(e.code==='Space'||e.code==='KeyW'||e.code==='ArrowUp')G.held=0});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
/* ===== MOBILE: zoom, gestos, áudio iOS e redimensionamento (só toque) ===== */
if(touch){
const nz=e=>e.preventDefault();
['gesturestart','gesturechange','gestureend'].forEach(t=>document.addEventListener(t,nz,{passive:false}));
document.addEventListener('touchmove',e=>{if(!e.target.closest||!e.target.closest('.panel'))e.preventDefault()},{passive:false});
document.addEventListener('touchstart',e=>{if(e.touches.length>1&&(!e.target.closest||!e.target.closest('.panel')))e.preventDefault()},{passive:false});
document.addEventListener('dblclick',nz,{passive:false});
document.addEventListener('contextmenu',nz);
const rel=()=>{G.held=0};
addEventListener('pointercancel',rel);addEventListener('blur',rel);addEventListener('pagehide',rel);
addEventListener('touchend',first,{passive:true});
let rq=0;const rsq=()=>{if(rq)return;rq=requestAnimationFrame(()=>{rq=0;rs()})};
addEventListener('orientationchange',()=>{rsq();setTimeout(rs,250);setTimeout(rs,600)});
if(window.visualViewport)visualViewport.addEventListener('resize',rsq);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>{A.resume();rs()},50)});
}
/* ===== LOOP ===== */
let last=0,acc=0;
function frame(ts){requestAnimationFrame(frame);const dt=Math.min((ts-last)/1000,.05);last=ts;if(G.st!=='pause'){acc+=dt;while(acc>=1/120){upd(1/120);acc-=1/120}}else acc=0;fx(dt);draw();hud();if(cur==='shop')pv(ts/1000,eyeSel)}
rs();load(S.last,0,1);show('menu');requestAnimationFrame(frame);
})();
