# 04 — Etapas e decisões

## Etapa 1: delimitar a história

O tema amplo “tecnologia” foi reduzido a cinco mudanças na relação entre pessoas e informação. A alternativa seria uma longa cronologia de produtos; ela prejudicaria a continuidade e exigiria muito mais pesquisa.

## Etapa 2: pesquisar antes de escrever

Foram consultados Computer History Museum, Doug Engelbart Institute, CERN, anúncio original da Apple, artigo do Transformer e NIST. A redação manteve os números de referência no HTML para que a fonte não desapareça quando o JavaScript estiver desativado.

## Etapa 3: montar o HTML completo

Os capítulos foram escritos no HTML, não gerados por arrays JavaScript. Isso facilita seu primeiro estudo, permite buscar trechos diretamente no VS Code e preserva leitura e links sem scripts. Cada seção possui um ID estável para navegação.

## Etapa 4: construir a composição de celular

O fluxo base é vertical. Depois vieram as adaptações para 700px e 1050px. As ilustrações respeitam o contêiner; a navegação de capítulos permite rolagem dentro da própria faixa em telas estreitas.

## Etapa 5: criar estados compreensíveis

Antes de animar, foram implementados o sinal 0/1, a alternância comando/interface e os três conteúdos do telefone. Esses comportamentos usam eventos, objetos e atributos ARIA. São bons pontos de entrada para quem está aprendendo JavaScript.

## Etapa 6: acrescentar movimento

GSAP entrou após a base. Os parágrafos principais não dependem de animação para aparecer. O SVG comunica conexões; o telefone e o documento ganham movimento sutil em telas largas. A rolagem permanece nativa.

## Etapa 7: acrescentar o 3D

A cena procedural evita um modelo externo pesado. A alternativa SVG já está presente no HTML. Só depois de a cena ser criada a classe `is-ready` esconde a imagem estática. Falhas do módulo são contidas para não quebrar as interações.

## Etapa 8: verificar e corrigir

Na revisão, foi encontrado um ID duplicado entre um gradiente SVG e o botão do circuito; o gradiente recebeu o nome `signal-gradient`. Também foi incluída uma fonte mínima de símbolos para evitar quadrados no lugar de setas em ambientes sem as fontes esperadas.

O navegador remoto rejeitou o contexto WebGL; o fallback foi preservado e essa limitação foi registrada, sem declarar o 3D como validado visualmente. A página foi inspecionada em larguras menores com frames de viewport real.

## Etapa 9: preparar para estudo local

Bibliotecas foram fixadas e incluídas em `vendor`. Não há build, pacote npm ou backend a configurar. O ZIP contém somente o projeto e a documentação; arquivos temporários de inspeção não fazem parte da entrega.

## Por que poucas ferramentas?

Adicionar uma biblioteca para cada efeito dificultaria entender as dependências e encontrar problemas. CSS, GSAP e Three.js cobrem os comportamentos escolhidos. Uma biblioteca adicional só faria sentido ao resolver uma necessidade concreta, como um modelo 3D complexo ou uma simulação física.
