# 🚀 Deployment Guide

Návod na nasadenie aplikácie do produkcie.

## 📦 Príprava na Deployment

### 1. Build Aplikácie

```bash
npm run build
```

Toto vytvorí optimalizovanú produkčnú verziu v `.next/` priečinku.

### 2. Testovanie Produkčnej Verzie Lokálne

```bash
npm start
```

Otvorte `http://localhost:3000` a overte, že všetko funguje správne.

## ☁️ Vercel (Odporúčané)

Vercel je najjednoduchší spôsob nasadenia Next.js aplikácie.

### Automatický Deployment z GitHub

1. **Push do GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/event-aggregator.git
git push -u origin main
```

2. **Pripojte Vercel:**

- Prejdite na [vercel.com](https://vercel.com)
- Kliknite na "Add New Project"
- Importujte váš GitHub repozitár
- Vercel automaticky detekuje Next.js a nakonfiguruje build

3. **Deploy:**

- Kliknite na "Deploy"
- Vercel automaticky:
  - Nainštaluje závislosti
  - Spustí build
  - Nasadí aplikáciu
  - Poskytne vám URL (napr. `your-app.vercel.app`)

### Environment Variables na Vercel

V Vercel dashboard:

1. Prejdite do Settings → Environment Variables
2. Pridajte potrebné premenné (ak máte)
3. Redeploy aplikáciu

### Automatické Deploymenty

Každý push do `main` branch automaticky spustí nový deployment.

## 🐳 Docker

### Dockerfile

Vytvorte `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

Vytvorte `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

### Build a Spustenie

```bash
docker-compose up -d
```

## 🖥️ VPS / Dedicated Server

### Požiadavky

- Node.js 18+
- npm
- PM2 (pre process management)

### 1. Inštalácia na Server

```bash
# Naklonujte repozitár
git clone https://github.com/username/event-aggregator.git
cd event-aggregator

# Nainštalujte závislosti
npm install

# Build
npm run build
```

### 2. PM2 Setup

```bash
# Nainštalujte PM2 globálne
npm install -g pm2

# Spustite aplikáciu
pm2 start npm --name "event-aggregator" -- start

# Nastavte auto-restart pri reboot
pm2 startup
pm2 save
```

### 3. Nginx Reverse Proxy

Vytvorte `/etc/nginx/sites-available/event-aggregator`:

```nginx
server {
    listen 80;
    server_name yourdomain.sk;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktivujte konfiguráciu:

```bash
sudo ln -s /etc/nginx/sites-available/event-aggregator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. SSL s Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.sk
```

## 📊 Monitoring

### Vercel Analytics

Vercel automaticky poskytuje analytics. Aktivujte v dashboard.

### PM2 Monitoring

```bash
# Zobraziť status
pm2 status

# Zobraziť logy
pm2 logs event-aggregator

# Monitoring dashboard
pm2 monit
```

## 🔄 Aktualizácie

### Vercel

Automatické - stačí push do GitHub.

### VPS

```bash
cd event-aggregator
git pull
npm install
npm run build
pm2 restart event-aggregator
```

## 🔐 Bezpečnosť

### 1. Environment Variables

Nikdy necommitujte `.env.local` do git:

```bash
# .gitignore už obsahuje
.env*.local
```

### 2. Rate Limiting

Pre produkciu zvážte pridanie rate limiting middleware.

### 3. CORS

Ak budete používať API externe, nakonfigurujte CORS v `next.config.js`.

## 📈 Performance Optimization

### 1. Caching Headers

Next.js automaticky nastavuje optimálne cache headers.

### 2. CDN

Vercel automaticky používa CDN. Pre iné platformy zvážte Cloudflare.

### 3. Image Optimization

Použite Next.js Image komponent pre obrázky:

```tsx
import Image from 'next/image';
```

## 🔍 SEO

### 1. Sitemap

Vytvorte `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.sk',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
```

### 2. Robots.txt

Už vytvorené v `public/robots.txt`. Aktualizujte URL.

## 📞 Support

Pri problémoch s deploymentom:

1. Skontrolujte build logy
2. Overte environment variables
3. Testujte lokálne s `npm run build && npm start`

---

**Úspešný deployment! 🎉**
