# Recuperação de senha.

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O Usuário deve poder Resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar o Amazon SES para envios em produção;
- O Envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar sua senha deve expirar em 2h;
- O Usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil.

**RF**

- O Usuario deve poder atualizar o seu perfil;

**RN**

- O Usuario não pode alterar seu e-mail para um email já utilizado;
- Para atualizar sua senha, o usuario deve informar a senha antiga;
- Para atualizar a sua senha, o usuario deve confirmar a nova senha;
- Para atualizar a sua senha, a nova senha não deve ser igual a anterior;

# Painel do Prestador.

# Agendamento de serviços.

**RF**

- O Usuário deve poder listar todos os prestadores de serviço cadastrados;

- O usuario deve poder selecionar um prestador específico;

- Após selecionar o prestador específico, o usuário deve poder listar todos os dias de um mês com pelo o menos um horario disponivel de um prestador;

- O usuário deve poder listar horarios disponiveis em um dia específico de um prestador

- O

**RNF**

**RN**
