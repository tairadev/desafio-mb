
# Desafio MB Web - Guilherme Henrique Taira🚀

Criar uma aplicação cliente (browser) de cadastro de usuários que envia os dados para um servidor NodeJS via uma API.

## 👌 Requisitos técnicos para a aplicação
- VueJS 3 (preferencialmente composition API + Vite) / Javascript Vanilla (não utilize Typescript)
- Não é necessário utilizar Vue Router ou frameworks do tipo
- Não utilize frameworks de Store/Gerenciamento de estado, dê preferência a recursos nativos da framework Vue ou do Javascript Vanilla
- Não utilize frameworks para requisições HTTP como Axios e similares, dê preferência ao fetch nativo
- CSS/SASS desenvolvidos por você apenas (não utilize Tailwind, Vuetify ou outras frameworks de estilo, queremos entender como você estrutura classes e seus nomes, estilos, elementos e nomenclatura das variáveis)
- Performance no client-side é importante, leve isso em consideração ao construir sua solução, tanto em download dos assets, bem como na execução do código e uso de recursos de processamento e memória.
- NodeJS com Express para servir o conteúdo e as APIs (com modo "mockup") descritos abaixo na sessão Requisitos técnicos para o servidor NodeJS

## 🖥️ Instalação
Para a instalação, é necessário ter o Node.js instalado em seu computador (de preferência na versão 18).
Para verificar se você possui o Node instalado, rode o seguinte comando:

```terminal
node -v
```

Caso ainda não possua o Node instalado, acessar o site oficial e instalar (https://nodejs.org/en).
\
Agora, com o Node instalado, clone o repositório em uma pasta de sua preferência, rodando no terminal:
```terminal
git clone https://github.com/tairadev/desafio-mb.git
```
\
Acesse a raíz do projeto rodando:
```terminal
cd /desafio-mb // ou cd.\desafio-mb\
```
\
E rode o comando abaixo para iniciar o servidor:
```terminal
npm start
```
\
Com isso, será iniciada a instalação das dependências. Quando for exibida a mensagem "Servidor rodando em http://localhost:3000" basta acessar a url http://localhost:3000/registration para visualizar a aplicação.