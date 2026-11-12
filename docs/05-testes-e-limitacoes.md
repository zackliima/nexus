# 05 — Testes e limitações

Registro de verificação da versão 1.0, em 11/11/2026.

## Verificações realizadas

| Verificação | Resultado / alcance |
| --- | --- |
| Sintaxe de `main.js` e `scene.js` | Verificada com Node em modo script e módulo, respectivamente. |
| Integridade dos recursos e âncoras | Verificação local de arquivos, IDs e referências internas. |
| Desktop, janela de aproximadamente 1363px | Abertura, navegação, capítulo de interfaces e seção web inspecionados em Chromium. |
| Celular, frames de 320px e 390px | Abertura inspecionada; leitura do capítulo de circuitos conferida em 320px. |
| Tablet, frame de 768px | Abertura e adaptação do cabeçalho inspecionadas. |
| Largura horizontal | Sem overflow do documento nas larguras medidas de 305, 375, 753 e 1363px. Nos frames, a barra vertical ocupa 15px. |
| Botão do circuito | Alternância de 1 para 0 e estado inativo confirmados. |
| Comando / interface | Mudança de painel e abertura do documento confirmadas. |
| Telefone | Troca de mapa para música confirmada, inclusive estado ARIA. |
| Redução manual de movimento | Controle muda estado; reativação de movimento confirmada. |
| SVG com ScrollTrigger | Estilos de desenho de caminho observados durante a rolagem. |
| Sem JavaScript | Conteúdo, referências e elementos nativos presentes em frame com scripts bloqueados. |
| Falha de WebGL | O ambiente recusou o contexto gráfico; a alternativa SVG permaneceu visível. |

Os frames testam largura de layout real dentro do Chromium. Não equivalem a um celular físico: não reproduzem GPU, toque, barras móveis, consumo de bateria ou Safari.

## Correções feitas durante a revisão

1. ID do gradiente SVG diferenciado do ID do botão de sinal.
2. Cabeçalho ajustado para 320px sem colisão entre marca e navegação.
3. Fonte pequena de símbolos incluída para setas e controles consistentes.
4. Ilustração de hipertexto própria usada em vez de redistribuição de captura histórica de terceiros.

## Ainda não validado

- Renderização efetiva da cena WebGL e seu desempenho em GPU real. O navegador remoto estava com WebGL desativado.
- Safari/iOS e Firefox; orientação em dispositivos físicos.
- Medição de Core Web Vitals, FPS e memória em aparelhos de entrada.
- Auditoria completa de leitor de tela, contraste e zoom a 200%/400%.
- Preferência de movimento reduzido acionada pelo sistema operacional real; a lógica existe e o controle manual foi exercitado.
- Falha independente de cada biblioteca via rede. Não há rede externa necessária para as bibliotecas, mas arquivos locais podem ser removidos acidentalmente.

## Roteiro para seu teste local

1. Abra pelo Live Server. Confira se a esfera se move lentamente; se não, veja se o botão está em modo reduzido ou se seu sistema pede redução de movimento.
2. Abra o console do navegador. Um erro sobre WebGL aponta para aceleração gráfica, suporte ou política do navegador; um erro 404 aponta para arquivo ausente.
3. No modo responsivo, teste 320, 390, 768, 1024, 1280 e 1920px. Teste também arrastar a largura livremente.
4. Percorra os links com Tab e ative botões com Enter/Espaço. Confira se o foco é visível e se nada depende de mouse.
5. Abra os detalhes de cada capítulo e consulte uma referência.
6. Teste a navegação com movimento pausado e ativo. Verifique se a leitura continua confortável.
7. No iPhone, teste Safari e Chrome, especialmente o vidro e a barra de navegação de capítulos.
8. Antes de publicar, execute Lighthouse no ambiente final e registre os valores; não trate uma medição local como garantia de produção.

## Escopo visual

Há GSAP, desenho SVG, parallax discreto e uma cena procedural. Não há sequência cinematográfica com modelos 3D autorais, áudio, morphing entre todos os capítulos ou experiência equivalente certificada a um vencedor do Awwwards. Esses seriam novos ciclos de direção de arte, implementação e testes.
