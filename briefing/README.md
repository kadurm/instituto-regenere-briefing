# Briefing Interativo de Site Institucional - Instituto Regenere 🌿

Este é um formulário de briefing altamente interativo, moderno e elegante, projetado sob medida com a identidade visual do **Instituto Regenere** (tons de verde floresta, sage/oliva e dourado areia premium). Ele foi criado para que você possa enviar o link diretamente para a sua cliente e entender em profundidade todos os requisitos, objetivos, público-alvo e preferências estéticas para o novo site.

O projeto foi planejado para ser publicado no **GitHub** e implantado na **Vercel** de forma 100% gratuita, sem necessidade de servidores ou bancos de dados complexos.

---

## ✨ Recursos e Diferenciais Premium

1. **Identidade Visual Integrada:** Design inspirado na logo da empresa, transmitindo acolhimento, profissionalismo e sofisticação à cliente.
2. **Navegação Multi-Passos Fluida:** 6 etapas bem definidas que dividem as perguntas por temas (Evita sobrecarregar a cliente com um formulário longo demais).
3. **Salvamento Automático (Auto-Save):** As respostas da cliente são salvas no navegador local à medida que ela digita. Se ela fechar a aba acidentalmente, nenhum dado será perdido!
4. **Segurança Tripla nas Respostas (Sem Perda de Dados):**
   * **Envio por E-mail:** Envia um e-mail estruturado e profissional com todas as respostas diretamente para você por meio do serviço seguro *FormSubmit.co*.
   * **Download em TXT/Markdown:** A cliente pode baixar uma cópia completa formatada de suas próprias respostas na tela de sucesso.
   * **Cópia rápida:** Botão para copiar o relatório completo para a área de transferência.
   * **WhatsApp Quick-Share:** Permite que a cliente envie um aviso rápido de conclusão direto no seu WhatsApp.
5. **Painel do Desenvolvedor Oculto:** Um botão de engrenagem flutuante discreto no canto inferior direito que permite configurar o e-mail destinatário diretamente pelo navegador, gerando a URL pronta.
6. **Design Responsivo e Lindo:** Perfeito em celulares, tablets e computadores, com micro-animações, sombras suaves, gradientes orgânicos e glassmorphism.

---

## 📩 Como Receber as Respostas da Cliente

O site usa o **FormSubmit.co**, um serviço gratuito que intercepta envios de formulários HTML normais e os envia como e-mails formatados.

### Método 1: Pela URL da Página (Recomendado & Prático)
Você não precisa mexer no código para trocar o e-mail receptor! Basta enviar o link para a cliente adicionando o parâmetro `?email=seuemail@exemplo.com` no final.
* **Exemplo de Link:** `https://regenere-briefing.vercel.app/?email=carlos.devops@exemplo.com`
* O formulário detectará automaticamente este parâmetro e direcionará as respostas para este endereço!

### Método 2: Pelo Painel do Desenvolvedor (Localmente)
1. Abra a página do formulário no navegador.
2. Clique no ícone de engrenagem no canto inferior direito.
3. Insira o seu e-mail e clique em **Salvar Configuração**.
4. O formulário recarregará e atualizará a URL com o seu e-mail de destino.

> [!IMPORTANT]
> **Primeiro Envio (Ativação do FormSubmit):**
> Quando a cliente enviar o formulário pela primeira vez para um novo e-mail, o FormSubmit enviará um e-mail de confirmação automática para esse endereço com o assunto *"FormSubmit - Action Required"*.
> Você deve **clicar no link de confirmação** contido nesse e-mail uma única vez para autorizar o recebimento de mensagens vindas do formulário. A partir daí, todos os envios seguintes chegarão instantaneamente na sua caixa de entrada!

---

## 🚀 Como Colocar no GitHub e Implantar na Vercel

### Passo 1: Inicializar o Git Local e fazer o Commit
No terminal, na pasta do projeto:
```bash
git init
git add .
git commit -m "feat: initial commit - briefing form instituto regenere"
```

### Passo 2: Enviar para o GitHub
1. Vá no seu [GitHub](https://github.com) e crie um novo repositório chamado `instituto-regenere-briefing` (público ou privado).
2. Siga as instruções para associar o repositório local ao GitHub e fazer o push:
```bash
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/instituto-regenere-briefing.git
git push -u origin main
```

### Passo 3: Publicar na Vercel
A Vercel importará o projeto do GitHub em segundos:
1. Acesse o painel da [Vercel](https://vercel.com) e clique em **Add New > Project**.
2. Conecte sua conta do GitHub e importe o repositório `instituto-regenere-briefing`.
3. Na seção de configurações, **não é necessário mudar nada** (Framework Preset: *Other*, Build Command: *None*).
4. Clique em **Deploy**.
5. Pronto! Em menos de 10 segundos o seu site estará no ar e um link curto e seguro (ex: `https://instituto-regenere-briefing.vercel.app`) será gerado.

---

## 📂 Estrutura do Projeto

* `index.html` - Arquivo estrutural do formulário com SEO e acessibilidade.
* `style.css` - Estilo premium com paleta de cores institucional, animações e responsividade.
* `script.js` - Lógica das abas, validação, auto-save e exportações.
* `Logo regenere.png` - Identidade visual da marca do cliente.
* `.gitignore` - Arquivo para evitar envio de lixos do sistema ao repositório.

---
*Criado com dedicação por Carlos Eduardo.*
