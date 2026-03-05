# NASA APOD Viewer 🚀

Um aplicativo web moderno utilizando a API "Astronomy Picture of the Day" (APOD) da NASA. Informe uma data e descubra o que havia no espaço sideral naquele dia!

## Estrutura do Projeto

O projeto é dividido em duas partes:
- **Backend (`/backend`)**: Uma API simples em Python/Flask que se comunica com a NASA de forma segura.
- **Frontend (`/frontend`)**: Uma interface HTML, CSS (Glassmorphism) e JavaScript para o usuário final.

---

## 🛠️ Como rodar o projeto localmente

### 1. Requisitos:
- Python 3 instalado no sistema.
- Um arquivo `.env` dentro da pasta `/backend` com a sua chave da API da NASA:
  ```env
  NASA_API_KEY=sua_chave_aqui
  ```

### 2. Configurando e rodando o Backend
Abra o seu terminal (PowerShell) e execute os comandos abaixo.

1. **Vá para a pasta do backend:**
   ```powershell
   cd backend
   ```

2. **Ative o ambiente virtual:**
   ```powershell
   # Caso você tenha problemas de permissão para rodar scripts, primeiro execute isso como Administrador (só na primeira vez e feche):
   # Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

   .\venv\Scripts\activate
   ```
   *Se você ainda não criou as dependências para algum motivo e precise reinstalar, rode `pip install -r requirements.txt` (nesta máquina ele já está instalado).*

3. **Inicie o servidor Flask:**
   ```powershell
   python app.py
   ```
   *(O servidor iniciará, geralmente no endereço: `http://127.0.0.1:5000`)*. **Mantenha este terminal aberto!**

### 3. Executando o Frontend
Com o backend rodando, não há necessidade de servidor complexo para o frontend:
1. Vá até a pasta `frontend`.
2. Dê dois cliques no arquivo `index.html` para abri-lo direto no seu navegador.
3. Aproveite a viagem pelo espaço sideral! 🌌
