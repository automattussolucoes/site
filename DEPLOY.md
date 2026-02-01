# Guia de Deploy para Hostinger

## ✅ Projeto já está no GitHub
- Repositório: https://github.com/automattussolucoes/site.git
- Branch: main

## 📋 Pré-requisitos

### 1. Variáveis de Ambiente
Você precisa configurar as seguintes variáveis de ambiente no Hostinger:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

**Importante:** Essas variáveis devem ser as mesmas do arquivo `.env.local` local.

## 🚀 Opções de Deploy no Hostinger

### Opção 1: Deploy via GitHub (Recomendado)

1. **Acesse o painel Hostinger**
   - Vá para a seção "Websites"
   - Selecione seu domínio

2. **Configure Git Deployment**
   - Procure por "Git" ou "Deploy via Git"
   - Conecte sua conta GitHub
   - Selecione o repositório: `automattussolucoes/site`
   - Branch: `main`

3. **Configure Build Settings**
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Adicione as Variáveis de Ambiente**
   - No painel do Hostinger, adicione:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **Deploy**
   - Clique em "Deploy" ou "Publicar"
   - Aguarde o build completar (pode levar alguns minutos)

### Opção 2: Deploy Manual via FTP

1. **Build Local**
   ```bash
   npm run build
   ```
   Isso criará a pasta `dist/` com os arquivos otimizados.

2. **Upload via FTP**
   - Use um cliente FTP (FileZilla, Cyberduck, etc.)
   - Conecte ao seu servidor Hostinger
   - Faça upload de TODO o conteúdo da pasta `dist/` para o diretório `public_html/`

3. **Configuração do Servidor**
   - Certifique-se de que o arquivo `.htaccess` está configurado para SPAs:
   
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 🔧 Configurações Importantes

### Arquivo .htaccess para React Router
Crie ou edite o arquivo `.htaccess` na raiz do seu site:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compressão Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 📝 Checklist Pós-Deploy

- [ ] Verificar se todas as páginas estão acessíveis:
  - `/` - Homepage
  - `/automacao` - Landing Page Automação
  - `/crm` - CRM + Login
  - `/pdv` - PDV + Login
  - `/obras` - Obras + Login
  - `/barber` - Barber + Login
  - `/admin` - Painel Admin

- [ ] Testar formulários de contato
- [ ] Verificar conexão com Supabase
- [ ] Testar login no admin
- [ ] Verificar carregamento de imagens
- [ ] Testar responsividade mobile
- [ ] Verificar links externos (Instagram, Loja)

## 🔄 Atualizações Futuras

Para atualizar o site:

1. **Faça alterações localmente**
2. **Commit e Push**
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   git push origin main
   ```
3. **Deploy automático** (se configurado) ou **Build manual** e upload via FTP

## 🆘 Troubleshooting

### Erro 404 nas rotas
- Verifique se o arquivo `.htaccess` está configurado corretamente
- Certifique-se de que mod_rewrite está habilitado no servidor

### Variáveis de ambiente não funcionam
- No Hostinger, adicione as variáveis no painel de controle
- Rebuild o projeto após adicionar as variáveis

### Imagens não carregam
- Verifique os caminhos das imagens
- Certifique-se de que as imagens do Supabase Storage estão públicas

## 📞 Suporte

Se precisar de ajuda:
1. Documentação Hostinger: https://www.hostinger.com.br/tutoriais/
2. Suporte Hostinger: Via chat no painel
3. Documentação Vite: https://vitejs.dev/guide/static-deploy.html
