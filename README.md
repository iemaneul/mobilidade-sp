# Mobilidade SP

Aplicação web focada em consulta de rotas, linhas e estações do sistema metroferroviário de São Paulo, com interface pensada para funcionar bem no celular.

## Acesso

Use no celular por este link:

`https://iemaneul.github.io/mobilidade-sp/`

Sugestão: abra direto no navegador do celular para testar a experiência mobile, especialmente a busca de origem e destino.

## O que o projeto faz

- Definir rota entre estações
- Exibir o resultado do trajeto com tempo estimado
- Mostrar linhas disponíveis do sistema
- Abrir os detalhes de cada linha
- Listar as estações em ordem
- Mostrar baldeações das estações na visualização da linha

## Tecnologias usadas

### Base da aplicação

- `HTML5`
- `CSS3`
- `JavaScript` puro (`Vanilla JS`)
- `ES Modules` com `script type="module"`

### Dados

- `JSON` local versionado no repositorio
- Base carregada diretamente pelo navegador sem dependencia de backend

### Bibliotecas e serviços externos

- `Google Fonts`
  Fonte usada: `Poppins`

### Hospedagem

- `GitHub Pages`

## Frameworks

Este projeto atualmente **não usa framework frontend** como React, Vue, Angular, Next ou similares.

Toda a interface foi construída com HTML, CSS e JavaScript puro.

## Estrutura principal

- [index.html](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/index.html): página inicial
- [pages/routes.html](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/pages/routes.html): tela para definir rota
- [pages/result.html](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/pages/result.html): resultado da rota
- [pages/lines.html](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/pages/lines.html): listagem das linhas
- [pages/line-detail.html](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/pages/line-detail.html): detalhe de cada linha
- [js/app.js](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/js/app.js): lógica principal de rotas
- [js/lines.js](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/js/lines.js): listagem e detalhe das linhas
- [js/api.js](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/js/api.js): camada de dados baseada em JSON local
- [data/metro-data.json](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/data/metro-data.json): base congelada com linhas, estações, paradas, trechos e baldeações
- [css/style.css](/home/emanuel.costa@ikatec.com.br/Área%20de%20trabalho/metro-sp/css/style.css): estilos globais

## Como rodar

Como o projeto é estático e usa JavaScript no navegador, basta abrir a URL publicada:

`https://iemaneul.github.io/mobilidade-sp/`

Se quiser rodar localmente, você pode servir a pasta do projeto com qualquer servidor estático simples.

## Base estática

As telas continuam as mesmas, mas agora os dados sao lidos de um unico arquivo local:

- `data/metro-data.json`

Isso evita criar uma pagina por estacao e tambem remove a dependencia do Supabase para a consulta publica.

Se um dia voces quiserem atualizar a base, basta gerar novamente esse JSON com os dados mais recentes e publicar junto do projeto.

## Observações

- A experiência principal está sendo tratada com bastante foco em mobile
- A busca de estações foi adaptada para funcionar melhor em navegadores de celular
- O mapa ainda está em construção e pode evoluir depois

## Autor

Projeto publicado em:

`https://iemaneul.github.io/mobilidade-sp/`
