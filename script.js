document.addEventListener('DOMContentLoaded', () => {
  const telas = [...document.querySelectorAll('.tela')];
  const musica = document.getElementById('musica');
  const som = document.getElementById('som');
  const mostrar = id => { telas.forEach(t => t.classList.remove('ativa')); document.getElementById(id).classList.add('ativa'); window.scrollTo(0,0); };

  document.getElementById('entrar').onclick = async () => { try { await musica.play(); som.textContent='🔊'; } catch(e){} mostrar('mensagem'); };
  document.getElementById('continuar').onclick = () => mostrar('contador-area');
  document.getElementById('ver-historia').onclick = () => mostrar('album-area');
  document.getElementById('abrir-carta').onclick = () => { mostrar('carta-area'); escreverCarta(); };
  document.getElementById('recomecar').onclick = () => location.reload();
  som.onclick = () => { if(musica.paused){musica.play();som.textContent='🔊'}else{musica.pause();som.textContent='🔇'} };

  function atualizarContador(){
    const inicio = new Date(2010,11,10,0,0,0); const agora = new Date();
    let anos = agora.getFullYear()-inicio.getFullYear();
    const aniversario = new Date(agora.getFullYear(),inicio.getMonth(),inicio.getDate());
    if(agora < aniversario) anos--;
    const marco = new Date(inicio); marco.setFullYear(inicio.getFullYear()+anos);
    let resto = Math.max(0,agora-marco);
    const dias = Math.floor(resto/86400000); resto%=86400000;
    const horas = Math.floor(resto/3600000); resto%=3600000;
    const minutos = Math.floor(resto/60000); const segundos=Math.floor((resto%60000)/1000);
    document.getElementById('anos').textContent=anos; document.getElementById('dias').textContent=dias;
    document.getElementById('horas').textContent=horas; document.getElementById('minutos').textContent=minutos; document.getElementById('segundos').textContent=segundos;
  }
  atualizarContador(); setInterval(atualizarContador,1000);

  const fotos=['foto1.jpg','foto2.jpg','foto3.jpg','foto4.jpg','foto5.jpg'];
  const legendas=['Nosso amor em cada sorriso.','Sua beleza vem de dentro e ilumina tudo ao redor.','Você sempre esteve ao meu lado.','Memórias que levarei para toda a vida.','Desde pequeno, seu colo é meu lugar seguro.'];
  let atual=0; const img=document.getElementById('foto-album');
  function trocar(){img.style.opacity='.2';setTimeout(()=>{img.src='imagens/'+fotos[atual];document.getElementById('legenda').textContent=legendas[atual];document.getElementById('indicador').textContent=`${atual+1} / ${fotos.length}`;img.style.opacity='1'},180)}
  document.getElementById('proxima').onclick=()=>{atual=(atual+1)%fotos.length;trocar()};
  document.getElementById('anterior').onclick=()=>{atual=(atual-1+fotos.length)%fotos.length;trocar()};

  const carta=`Mãe,\n\nHoje quero agradecer por cada cuidado, cada oração e cada vez que você colocou minhas necessidades antes das suas. Você é a pessoa que me ensinou o significado do amor verdadeiro.\n\nObrigado por acreditar em mim, por me corrigir quando foi necessário e por nunca soltar minha mão. Tudo o que sou carrega um pouco da sua força, da sua fé e do seu coração.\n\nDesejo que este novo ano da sua vida seja cheio da presença de Deus, saúde, paz, sonhos realizados e muitos motivos para sorrir. Que você receba em dobro todo o amor que entrega ao mundo.\n\nTenho muito orgulho de ser seu filho. Você é e sempre será meu porto seguro.\n\nFeliz aniversário, mãe! Eu te amo infinitamente.`;
  let digitando=false;
  function escreverCarta(){if(digitando)return;digitando=true;const alvo=document.getElementById('texto-carta');alvo.textContent='';let i=0;const timer=setInterval(()=>{alvo.textContent+=carta[i++]||'';if(i>=carta.length){clearInterval(timer);document.getElementById('abrir-final').style.display='inline-block'}},24)}

  document.getElementById('abrir-final').onclick=()=>{mostrar('final-area');criarCoracoes();criarConfetes()};
  function criarCoracoes(){for(let i=0;i<28;i++){setTimeout(()=>{const e=document.createElement('span');e.className='coracao';e.textContent=['❤','💗','♡'][Math.floor(Math.random()*3)];e.style.left=Math.random()*100+'vw';e.style.bottom='-30px';e.style.fontSize=(18+Math.random()*25)+'px';e.style.animationDuration=(4+Math.random()*4)+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),8500)},i*100)}}
  function criarConfetes(){const formas=['◆','●','■','★'];for(let i=0;i<80;i++){setTimeout(()=>{const e=document.createElement('span');e.className='confete';e.textContent=formas[Math.floor(Math.random()*formas.length)];e.style.left=Math.random()*100+'vw';e.style.top='-20px';e.style.color=`hsl(${Math.random()*360} 75% 58%)`;e.style.fontSize=(8+Math.random()*14)+'px';e.style.animationDuration=(3+Math.random()*4)+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),7500)},i*35)}}
});
