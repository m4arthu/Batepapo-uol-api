# Batepapo-uol-api
Bem-vindo ao Batepapo UOL API! Esta é a API do projeto Batepapo UOL, uma aplicação que simula uma sala de bate-papo online. Neste projeto, utilizamos as tecnologias Node.js, Express e MongoDB para criar o servidor que gerencia as mensagens enviadas pelos usuários.

Funcionalidades Principais
A API do Batepapo UOL possui as seguintes funcionalidades principais:

Enviar mensagens: Os usuários podem enviar mensagens para a sala de bate-papo.

Visualizar mensagens: Os usuários podem visualizar as mensagens enviadas pelos outros participantes.

Listar participantes: A API fornece uma lista dos participantes atuais da sala de bate-papo.

Tecnologias Utilizadas
O Batepapo UOL API foi desenvolvido utilizando as seguintes tecnologias:

Node.js: Ambiente de execução JavaScript server-side, utilizado como base para desenvolver o servidor.

Express: Framework para construção de aplicações web em Node.js. Foi utilizado para criar as rotas da API e gerenciar as requisições.

MongoDB: Banco de dados não relacional utilizado para armazenar as mensagens enviadas pelos usuários.

Como Rodar o Projeto
Para rodar o Batepapo UOL API localmente em sua máquina, siga os passos abaixo:

Pré-requisitos
Node.js: Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em: https://nodejs.org/

MongoDB: É necessário ter o MongoDB instalado e em execução localmente ou acessível através de uma URL externa.

Passo 1: Clonar o repositório
Clone este repositório em um diretório de sua preferência utilizando o seguinte comando:

bash
Copy code
git clone https://github.com/seu_usuario/batepapo-uol-api.git
Passo 2: Instalar as dependências
Navegue para o diretório raiz do projeto e instale as dependências utilizando o npm:

bash
Copy code
cd batepapo-uol-api
npm install
Passo 3: Configurar o ambiente
Antes de executar o projeto, é necessário configurar as variáveis de ambiente. Para isso, crie um arquivo .env na raiz do diretório e defina as seguintes variáveis:

Faça u  arquivo .env e insira:
 -MONGODB_URI=link_para_seu_banco_de_dados_mongodb
 -PORT:5000

Passo 4: Iniciar o servidor
Após concluir as etapas anteriores, você está pronto para iniciar o servidor. No diretório raiz do projeto, execute o seguinte comando:
 -npm start
Se tudo estiver configurado corretamente, você verá a mensagem "Servidor iniciado na porta 3000" no console. Isso significa que o servidor está rodando corretamente e está pronto para receber as requisições dos clientes.

Endpoints da API
A seguir, estão listados os principais endpoints da API do Batepapo UOL:

POST /messages: Envia uma nova mensagem para a sala de bate-papo.

GET /messages: Retorna todas as mensagens enviadas pelos usuários na sala de bate-papo.

GET /participants: Retorna a lista de participantes atuais na sala de bate-papo.

Considerações Finais
O Batepapo UOL API é uma parte essencial do projeto Batepapo UOL, fornecendo as funcionalidades necessárias para o gerenciamento das mensagens enviadas pelos usuários. Certifique-se de que o MongoDB esteja em execução corretamente e que todas as variáveis de ambiente estejam configuradas de acordo com o seu ambiente de desenvolvimento.

Divirta-se utilizando o Batepapo UOL API e sinta-se à vontade para contribuir com melhorias e novas funcionalidades! Em caso de dúvidas ou problemas, sinta-se à vontade para abrir uma issue no repositório ou entrar em contato com a equipe de desenvolvimento.

Boa codificação!
