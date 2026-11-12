/* NEXUS — interações acessíveis e organização das animações.
   O HTML já é legível antes da execução deste arquivo. Veja docs/03-animacoes.md. */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let userReduced = false;
  try { userReduced = localStorage.getItem('nexus-reduced-motion') === 'true'; } catch { /* Navegação privada: a preferência funciona nesta sessão. */ }
  let animationContext;
  let scene;
  let scenePromise;
  const reduce = () => userReduced || systemMotion.matches;
  const motionButton = $('#motion');
  motionButton.hidden = false;

  // Demonstrações: estados ARIA sincronizados com os estados visuais.
  const signalButton = $('#signal');
  signalButton.hidden = false;
  signalButton.addEventListener('click', () => {
    const on = signalButton.getAttribute('aria-pressed') !== 'true';
    signalButton.setAttribute('aria-pressed', String(on));
    $('#bit').textContent = on ? '1' : '0';
    $('.circuit-visual').classList.toggle('off', !on);
    $('.live-state').textContent = on ? '● ATIVO' : '○ INATIVO';
  });
  $$('[data-mode]').forEach(button => button.addEventListener('click', () => {
    $$('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    $('#terminal-view').hidden = button.dataset.mode !== 'terminal';
    $('#graphic-view').hidden = button.dataset.mode !== 'graphic';
  }));
  $('#open-file').addEventListener('click', () => {
    const result = $('#file-result');
    result.hidden = !result.hidden;
    $('#open-file').textContent = result.hidden ? 'Abrir documento ↗' : 'Fechar documento ×';
    $('#open-file').setAttribute('aria-expanded', String(!result.hidden));
  });
  $('#open-file').setAttribute('aria-expanded', 'false');
  $('#open-file').setAttribute('aria-controls', 'file-result');
  const apps = {
    mapa: ['◎', 'Explore o caminho.', 'Um mapa responde à sua localização e à sua intenção de chegar.'],
    musica: ['♫', 'Leve seu som.', 'A mesma superfície se transforma em uma biblioteca de música.'],
    mensagem: ['✉', 'Encurte a distância.', 'O teclado aparece quando a próxima ideia precisa virar mensagem.']
  };
  $$('[data-app]').forEach(button => button.addEventListener('click', () => {
    $$('[data-app]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const [icon, title, text] = apps[button.dataset.app];
    $('.phone-glyph').textContent = icon;
    $('#phone-card h3').textContent = title;
    $('#phone-card p').textContent = text;
    if (window.gsap && !reduce()) gsap.fromTo('#phone-card', {opacity:.35,y:7}, {opacity:1,y:0,duration:.35,overwrite:true});
  }));

  // Uma atualização por frame para o progresso, preservando a rolagem nativa.
  const chapters = $$('[data-chapter]');
  const chapterLinks = $$('.chapter-nav a');
  let ticking = false;
  function updateReading() {
    const distance = document.documentElement.scrollHeight - innerHeight;
    $('.progress span').style.transform = `scaleX(${distance > 0 ? Math.min(1, scrollY / distance) : 0})`;
    let current = '';
    chapters.forEach(section => { if (section.getBoundingClientRect().top < innerHeight * .48) current = section.id; });
    chapterLinks.forEach(link => {
      if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateReading); } }, {passive:true});
  addEventListener('resize', updateReading, {passive:true});
  updateReading();

  function initAnimations() {
    // revert restaura os estilos iniciais, inclusive ao alterar a preferência durante a leitura.
    animationContext?.revert();
    animationContext = null;
    const reduced = reduce();
    document.documentElement.classList.toggle('reduced-motion', reduced);
    motionButton.setAttribute('aria-pressed', String(reduced));
    const label = systemMotion.matches ? 'Movimento reduzido pelo sistema' : reduced ? 'Ativar movimento' : 'Pausar movimento';
    motionButton.setAttribute('aria-label', label);
    $('.motion-label').textContent = label;
    motionButton.firstElementChild.textContent = reduced ? '▷' : 'Ⅱ';
    scene?.setReduced(reduced);
    if (reduced || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    animationContext = gsap.context(() => {
      // Entradas pontuais: os parágrafos principais permanecem visíveis.
      gsap.from('.hero-content > *', {y:28,opacity:0,duration:1.1,stagger:.12,ease:'power3.out',clearProps:'all'});
      $$('.reveal').forEach(element => {
        gsap.from(element, {y:28,opacity:.1,duration:.85,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 94%',once:true},clearProps:'all'});
      });
      $$('.circuit-paths path, .attention path, .network-path').forEach(path => {
        const length = path.getTotalLength();
        gsap.fromTo(path, {strokeDasharray:length,strokeDashoffset:length}, {strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:path.closest('section'),start:'top 75%',end:'center 45%',scrub:1}});
      });
      // matchMedia restaura os estilos ao passar para outro formato de tela.
      const media = gsap.matchMedia();
      media.add('(min-width: 1050px)', () => {
        gsap.fromTo('.phone', {rotation:-9,y:28}, {rotation:4,y:-24,ease:'none',scrollTrigger:{trigger:'#mobile',start:'top bottom',end:'bottom top',scrub:1.5}});
        gsap.fromTo('.archive', {rotation:-3,y:35}, {rotation:1,y:-15,ease:'none',scrollTrigger:{trigger:'#web',start:'top bottom',end:'bottom top',scrub:1.3}});
        gsap.to('.hero-content', {y:80,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      });
      return () => media.revert();
    });
  }
  motionButton.addEventListener('click', () => {
    if (systemMotion.matches) return; // A preferência do sistema permanece prioritária.
    userReduced = !userReduced;
    try { localStorage.setItem('nexus-reduced-motion', String(userReduced)); } catch {}
    initAnimations();
    if (!reduce()) loadScene();
  });
  systemMotion.addEventListener('change', () => { initAnimations(); if (!reduce()) loadScene(); });
  initAnimations();

  async function loadScene() {
    if (scene || scenePromise || reduce()) return;
    // Carregamento adiado do módulo pesado, independente do conteúdo e dos controles.
    scenePromise = import('./scene.js').then(module => {
      scene = module.createScene($('#scene'), reduce());
    }).catch(() => { /* O SVG permanece visível se o módulo ou WebGL falhar. */ });
    await scenePromise;
  }
  if ('requestIdleCallback' in window) requestIdleCallback(loadScene, {timeout:1800});
  else setTimeout(loadScene, 700);
  addEventListener('load', () => window.ScrollTrigger?.refresh(), {once:true});
})();
