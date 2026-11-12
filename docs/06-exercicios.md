# 06 — Exercícios para aprender com o Nexus

Faça uma cópia antes de experimentar. Mude uma coisa por vez e compare no celular e no desktop.

## 1. Uma nova identidade

Altere `--accent` e `--mint` no CSS. Observe quais partes mudam e quais continuam iguais. As cores da esfera são valores próprios em `scene.js`; sincronize-os também. Objetivo: perceber a diferença entre variáveis CSS e materiais WebGL.

## 2. Entenda o estado de um botão

Localize o evento de `signalButton` em `main.js`. Antes de alterar, explique o papel de `aria-pressed`, `classList.toggle` e `textContent`. Acrescente um texto abaixo do circuito que descreva o estado, usando `aria-live="polite"` para anunciar a mudança.

## 3. Um quarto aplicativo

Adicione um botão de câmera à demonstração do telefone e uma entrada `camera` ao objeto `apps`. Mantenha um rótulo acessível. Verifique se os quatro botões continuam cabendo na menor largura.

## 4. Uma animação com outra personalidade

Na entrada `.reveal`, compare `duration: .85` com `duration: 1.4`. Depois altere apenas o easing. Duração e curva de velocidade são coisas diferentes: tente descrever a sensação de cada resultado.

## 5. Desenhe um circuito

Adicione um `path` ao grupo `.circuit-paths` no HTML. Use comandos `M`, `H`, `V` e `L`. O código existente calcula seu comprimento automaticamente. Se o desenho não aparecer, confira viewBox, posição e stroke antes de mexer no JavaScript.

## 6. Explore o custo do 3D

Com WebGL funcionando localmente, altere `count` de 250 para 400. Observe a fluidez e o uso de CPU/GPU nas ferramentas do navegador. Depois reduza para 120. A melhor imagem não é necessariamente a que tem mais pontos.

## 7. Escreva um capítulo novo

Escolha um tema, encontre duas fontes confiáveis e escreva uma pergunta central. Adicione uma seção ao HTML e um link à navegação de capítulos. Use `data-chapter` para integrar o indicador. Confira a ordem dos títulos e os IDs das referências.

## 8. Teste a falha de propósito

Em uma cópia, renomeie temporariamente `three.module.js`. A história deve continuar legível e a imagem SVG deve permanecer. Restaure o arquivo. Depois faça o mesmo com GSAP: os botões básicos devem continuar funcionando. Esse exercício mostra por que a interface não deve depender de uma biblioteca de animação.
