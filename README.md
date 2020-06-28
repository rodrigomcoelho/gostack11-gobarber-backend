## Recuperação de senha
**RF (Requisitos Funcionais)**
- O usuário deve poder recuperar sua senha informando o seu email;
-

**RNF (Requisitos não funcionais)**

**RN (Regra de negócio)**

## Atualização Perfil

**RF**
- O usuário deve poder atualizar seu nome, email e senha;

**RN**
- O

## Painel do prestador

**RF**
- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber um notificação sempre que houver um agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**
- Os agendamentos do prestador no dia deve ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**
- A notificação deve ter um status de lida ou não-lida para que prestador possa controlar;

## Agendamento de serviços

**RF**
- O usuário deve poder listar todos os prestadores cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos horário disponível de um prestador;
- O usuário deve poder listar horários disponiveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazena em cache;

**RN**
- Cada agendamento deve durar 1h extamente;
- Os agendamentos deve estar disponíveis entre 8h às 18h (primeiro às 8h, ultimo às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo


