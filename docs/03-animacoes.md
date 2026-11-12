# 03 — Como as animações funcionam

## Três responsabilidades

1. CSS cuida de hover, foco, vidro e cursor do terminal.
2. GSAP modifica propriedades de elementos HTML e caminhos SVG.
3. Three.js desenha a cena decorativa na abertura usando WebGL.

As bibliotecas não controlam o conteúdo editorial. A página mantém texto e referências quando uma delas falha.

## Tween: uma transição com início e fim

No `main.js`, procure `gsap.from`. O elemento começa com deslocamento em `y` e opacidade reduzida, então volta ao estilo definido pelo CSS. `duration` mede a duração em segundos. `ease` define como a velocidade varia; `power2.out` desacelera perto do fim.

`stagger: .12` cria um intervalo entre as entradas da abertura. `clearProps: 'all'` remove os estilos temporários depois da animação, deixando o CSS reassumir o controle. Não use esse padrão indiscriminadamente em elementos com outros estilos inline importantes.

## ScrollTrigger: a rolagem como entrada

`trigger` é o elemento observado. `start: 'top 94%'` começa quando seu topo chega a 94% da altura da janela. `once: true` faz a entrada acontecer uma vez por configuração de animação.

Nos caminhos, `scrub: 1` liga o progresso da animação ao scroll com cerca de um segundo de suavização. O usuário pode rolar para trás e ver o desenho recuar. `end` define onde o desenho estará completo.

A implementação não usa `pin` nem rolagem horizontal forçada. A história tem texto suficiente para merecer leitura contínua. `pin` poderia fixar um painel durante certo trecho, mas exigiria validar sobreposição, altura e navegação por teclado. Não foi necessário nesta versão.

## Desenhar um SVG sem plugin adicional

Cada caminho tem um comprimento calculado por `getTotalLength()`. `strokeDasharray` cria um traço desse tamanho; `strokeDashoffset` desloca esse traço para fora da área visível. Reduzir o deslocamento até zero revela a linha.

Isso anima o contorno, não transforma a geometria do desenho. Não há MorphSVG, DrawSVG nem morphing de formas nesta versão. A escolha evita uma dependência para um efeito simples.

## Movimento responsivo e reversível

`gsap.matchMedia()` ativa inclinação do telefone, movimento do documento e deslocamento da abertura apenas acima de 1050px. Quando a condição deixa de valer, os estilos são revertidos.

`gsap.context()` reúne animações para que `revert()` possa restaurá-las quando o usuário pausa o movimento. A configuração também observa `prefers-reduced-motion`. A preferência do sistema tem prioridade sobre o botão; o botão informa isso no rótulo.

## Three.js: o que você está vendo

A esfera é uma distribuição de pontos calculada com o ângulo áureo e posições de Fibonacci. Pontos próximos recebem linhas. Três toros finos criam órbitas; um icosaedro interno acrescenta profundidade. Não há arquivo GLB, modelo baixado, textura, sombra ou pós-processamento.

`PerspectiveCamera` determina a projeção; `WebGLRenderer` transforma a cena em pixels. O `Group` permite rotacionar todos os componentes juntos. O tempo entre frames determina a rotação, evitando uma velocidade dependente da taxa de atualização do monitor.

O ponteiro de mouse provoca uma pequena alteração de orientação. Em toque, essa reação não é necessária. O número de pontos é escolhido na criação da cena: 150 em janela pequena, 250 nas demais. Mudar a largura não recria a quantidade de pontos; apenas ajusta câmera e canvas.

## Custo e pausa

- Importação do módulo 3D adiada para depois da carga inicial.
- Densidade de pixels limitada a 1,5 para reduzir trabalho da GPU.
- `IntersectionObserver` pausa a renderização fora da abertura.
- `visibilitychange` pausa em aba escondida.
- `ResizeObserver` ajusta câmera e canvas ao contêiner.
- Preferência de movimento reduzido impede a carga inicial do 3D.
- Se WebGL falhar, a ilustração SVG continua no lugar.

O cálculo de pares de pontos é quadrático: dobrar `count` pode aproximadamente quadruplicar as comparações. Não aumente a densidade sem medir. A velocidade atual da rotação está em `angle += delta * .09`.

## Documentação oficial

- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP](https://gsap.com/docs/v3/)
- [Three.js](https://threejs.org/docs/)

As APIs devem ser conferidas na documentação da versão antes de atualizar as bibliotecas. Não há uso de versões flutuantes por CDN.
