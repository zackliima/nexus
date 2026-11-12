# 02 — Design e responsividade

## Direção visual

A ideia é um arquivo digital contemplativo: base escura, título sem serifa em grande escala, palavras em serifa itálica e diagramas delicados. Violeta marca a narrativa; verde-água marca estados e conexões. A seção clara da web quebra o ritmo escuro e dá espaço ao conceito de documento.

O vidro usa fundo parcialmente transparente, borda clara, sombra discreta e `backdrop-filter`. Fica restrito a navegação e poucos elementos; parágrafos repousam sobre fundos estáveis. Sem suporte a blur, o fundo translúcido ainda existe e o texto permanece utilizável.

## Mobile first na prática

O CSS fora de media queries descreve o celular. As adaptações usam `min-width`, acrescentando espaço quando disponível:

| Faixa | Decisões |
| --- | --- |
| Base, abaixo de 700px | Uma coluna; cena da abertura abaixo do texto; navegação de capítulos rolável; sem movimentos de inclinação ligados ao scroll. |
| A partir de 700px | Cabeçalho mais amplo; detalhes de navegação visíveis; abertura com esfera lateral; introdução em duas áreas. |
| A partir de 1050px | Texto e demonstração em colunas; capítulos alternados; inclinação do telefone e do documento; fontes em duas colunas. |

Os números são decisões de conteúdo, não uma lista de modelos de dispositivos. Um tablet estreito pode usar a composição de celular; uma janela de desktop estreita também.

## Valores que vale estudar

`--gutter: clamp(22px, 5vw, 84px)` mantém margem lateral mínima, cresce com a janela e para em 84px. Nos títulos, `clamp()` combina tamanho mínimo legível e máximo controlado. As dimensões fixas do telefone pertencem à ilustração; o fluxo principal continua flexível.

`minmax(0, 1fr)` evita que conteúdo longo force uma coluna além do espaço disponível. `scroll-padding-top` deixa espaço para os dois níveis de navegação fixa. A altura da abertura usa `svh` para reduzir mudanças causadas pelas barras do navegador móvel.

## Semântica e interação

- Um `h1`, títulos `h2` para capítulos e `h3` apenas no exemplo do telefone.
- Link de pular para conteúdo, foco visível e links nativos para capítulos.
- Botões para mudar estado; links para navegar. Os dois não foram confundidos.
- `aria-pressed` informa o estado de controles alternáveis.
- `details/summary` funciona sem JavaScript.
- `aria-live="polite"` comunica a troca de conteúdo no telefone.
- O SVG alternativo da abertura é decorativo; as ilustrações educativas recebem descrição.

O objetivo é manter uma experiência utilizável. Isto não representa uma certificação WCAG: leitor de tela real, ampliação e contraste de todos os estados ainda merecem auditoria dedicada.

## Referências visuais

[Catálogo Sites of the Year — Awwwards](https://www.awwwards.com/websites/sites_of_the_year/) consultado em 11/11/2026. O catálogo identifica projetos como Igloo Inc e Lusion v3. A ficha individual do Igloo não carregou na pesquisa; portanto, não se atribui a este trabalho uma análise completa de seu movimento ou tecnologia. A referência informa a ambição estética, não uma alegação de equivalência ou cópia.
