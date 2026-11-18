# PetCare

Aplicativo mobile para gerenciamento de animais disponiveis para adocao.

## Objetivo do sistema

O PetCare tera como foco principal um fluxo completo de cadastro e acompanhamento de animais para adocao, com interface mobile e persistencia de dados em nuvem.

## Principais funcionalidades

### 1. CRUD de animais para adocao

O sistema tera um CRUD completo para animais:

- Create: cadastrar um novo animal para adocao.
- Read: listar e visualizar os animais cadastrados.
- Update: editar dados de um animal existente.
- Delete: remover um animal do cadastro.

### 2. Cadastro com foto

Cada animal podera ter foto vinculada ao cadastro, incluindo upload e exibicao da imagem no aplicativo.

### 3. Armazenamento em Cloudinary e Firebase

O projeto utilizara servicos em nuvem para manter os dados e imagens:

- Cloudinary: armazenamento e entrega das fotos dos animais.
- Firebase: armazenamento de dados do aplicativo (ex.: informacoes dos animais, status de adocao e metadados).

## Estrutura tecnica prevista

### Frontend mobile

- React Native
- React Navigation
- React Native Paper para componentizacao e padronizacao visual da interface

### Componentizacao com React Native Paper

A interface sera organizada em componentes reutilizaveis para:

- formularios de cadastro/edicao
- cartoes de animal
- listagens
- botoes e elementos de acao
- feedback visual (mensagens, loading e estados vazios)

## Fluxo funcional esperado

1. Usuario cadastra um animal com foto e dados.
2. Sistema envia imagem para o Cloudinary.
3. Sistema salva os dados do animal e referencia da foto no Firebase.
4. Lista de animais e atualizada no app.
5. Usuario pode editar ou remover registros existentes.

## Equipe

### Alunos

- Laura Robette Grazziolli
- Murilo Eduardo Thome

### Professor

- Jackson Meires

## Status

Projeto em desenvolvimento.

As telas e estrutura inicial ja estao em andamento, com foco nas funcionalidades de CRUD e integracao com servicos em nuvem.
