# 🎯 ZAČNITE TU - Event Aggregator

Vitajte v projekte **Agregátor Podujatí na Slovensku**! Tento súbor vám pomôže rýchlo sa zorientovať.

## 🚀 Rýchly Štart (5 minút)

```bash
# 1. Nainštalujte závislosti
npm install

# 2. Spustite vývojový server
npm run dev

# 3. Otvorte prehliadač
# http://localhost:3000
```

**Hotovo!** Aplikácia by mala bežať. 🎉

---

## 📚 Dokumentácia - Ktorú Prečítať?

### 🟢 Pre Začiatočníkov

1. **[INSTALLATION.md](./INSTALLATION.md)** ← Začnite tu!
   - Inštalácia Node.js
   - Krok-za-krokom setup
   - Riešenie problémov

2. **[QUICK_START.md](./QUICK_START.md)**
   - Základné použitie
   - Testovanie funkcií
   - Prvé kroky

### 🟡 Pre Vývojárov

3. **[README.md](./README.md)**
   - Prehľad projektu
   - Technológie
   - API dokumentácia
   - Prispôsobenie

4. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**
   - Technický prehľad
   - Architektúra
   - Dátový tok
   - Best practices

5. **[ADDING_SOURCES.md](./ADDING_SOURCES.md)**
   - Ako pridať nové zdroje
   - Scraping patterns
   - Debugging tips

### 🔵 Pre Deployment

6. **[DEPLOYMENT.md](./DEPLOYMENT.md)**
   - Vercel deployment
   - Docker setup
   - VPS konfigurácia
   - SSL certifikáty

### 📝 Ostatné

7. **[CHANGELOG.md](./CHANGELOG.md)**
   - História zmien
   - Verzie
   - Plánované features

---

## 🎯 Čo Tento Projekt Robí?

### Hlavné Funkcie

✅ **Web Scraping** - Automaticky získava podujatia z AFUS.sk  
✅ **Caching** - Ukladá dáta na 24 hodín (šetrí zdroje)  
✅ **Vyhľadávanie** - Nájdite podujatia podľa názvu alebo miesta  
✅ **Filtrovanie** - Filter podľa mesiaca  
✅ **Responzívny Dizajn** - Funguje na mobile, tablete, desktope  
✅ **Moderné UI** - Čisté karty s prehľadnými informáciami  

### Technológie

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Cheerio** - Web scraping
- **Lucide React** - Icons

---

## 📁 Štruktúra Projektu (Zjednodušene)

```
event-aggregator/
│
├── 📱 app/                    # Next.js stránky
│   ├── page.tsx               # Hlavná stránka
│   └── api/events/            # API endpoint
│
├── 🧩 components/             # React komponenty
│   ├── EventCard.tsx          # Karta podujatia
│   ├── EventGrid.tsx          # Grid zobrazenie
│   └── FilterBar.tsx          # Vyhľadávanie + filter
│
├── 📚 lib/                    # Core logika
│   ├── scraper.ts             # Web scraping + caching
│   └── utils.ts               # Helper funkcie
│
├── 💾 data/                   # Cache súbory
│   └── events-cache.json      # Uložené podujatia
│
└── 📖 *.md                    # Dokumentácia
```

---

## 🎨 Čo Môžete Urobiť?

### 1. Spustiť Aplikáciu ✅

```bash
npm run dev
```

### 2. Pridať Nový Zdroj Podujatí 🔧

Prečítajte: [ADDING_SOURCES.md](./ADDING_SOURCES.md)

```typescript
// lib/scraper.ts
export async function scrapeNewSource(): Promise<Event[]> {
  // Váš scraping kód
}
```

### 3. Prispôsobiť Dizajn 🎨

```typescript
// components/EventCard.tsx
// Zmeňte farby, layout, štýly
```

### 4. Nasadiť do Produkcie 🚀

Prečítajte: [DEPLOYMENT.md](./DEPLOYMENT.md)

```bash
# Vercel (najjednoduchšie)
git push origin main
# Automatický deployment!
```

---

## 🛠️ Užitočné Príkazy

```bash
# Development
npm run dev              # Spustiť dev server
npm run build            # Build pre produkciu
npm start                # Spustiť produkčný server

# Utility
npm run scrape           # Manuálny scraping
npm run lint             # Linting

# Maintenance
rm -rf .next             # Vyčistiť cache
rm -rf node_modules      # Vymazať závislosti
npm install              # Reinstall závislosti
```

---

## 🐛 Niečo Nefunguje?

### Časté Problémy

**Port 3000 je obsadený:**
```bash
PORT=3001 npm run dev
```

**Scraping nefunguje:**
```bash
npm run scrape  # Testujte manuálne
```

**Styling problémy:**
```bash
rm -rf .next
npm run dev
```

**Viac riešení:** [INSTALLATION.md](./INSTALLATION.md) → Riešenie Problémov

---

## 📞 Potrebujete Pomoc?

### Kde Hľadať

1. **Dokumentácia** - Prečítajte .md súbory
2. **Console Logy** - Pozrite terminál a browser console (F12)
3. **Google** - Hľadajte chybové hlášky
4. **GitHub Issues** - Vytvorte issue

### Pri Hlásení Problému Uveďte

- Operačný systém
- Node.js verziu (`node --version`)
- Chybovú hlášku
- Kroky na reprodukciu

---

## 🎓 Learning Path

### Pre Úplných Začiatočníkov

1. Nainštalujte Node.js
2. Prečítajte [INSTALLATION.md](./INSTALLATION.md)
3. Spustite aplikáciu (`npm run dev`)
4. Preskúmajte UI v prehliadači
5. Pozrite kód v `app/page.tsx`

### Pre Vývojárov

1. Prečítajte [README.md](./README.md)
2. Preskúmajte [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. Analyzujte `lib/scraper.ts`
4. Vytvorte vlastný scraper
5. Prispôsobte komponenty

### Pre DevOps

1. Prečítajte [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Nastavte CI/CD
3. Nakonfigurujte monitoring
4. Setup SSL certifikáty

---

## ✅ Kontrolný Zoznam

### Prvé Spustenie

- [ ] Node.js nainštalovaný
- [ ] Projekt stiahnutý
- [ ] `npm install` dokončený
- [ ] `npm run dev` funguje
- [ ] Aplikácia otvorená v prehliadači
- [ ] Vidím zoznam podujatí

### Pochopenie Projektu

- [ ] Prečítal som README.md
- [ ] Rozumiem štruktúre projektu
- [ ] Viem ako pridať nový zdroj
- [ ] Viem ako prispôsobiť dizajn
- [ ] Viem ako nasadiť do produkcie

---

## 🎉 Ďalšie Kroky

### Teraz Môžete

1. ✅ **Používať aplikáciu** - Prehliadajte podujatia
2. 🔧 **Pridať zdroje** - Rozšírte databázu podujatí
3. 🎨 **Prispôsobiť dizajn** - Zmeňte farby, layout
4. 🚀 **Nasadiť online** - Zdieľajte s ostatnými
5. 🤝 **Prispieť** - Vytvorte pull request

---

## 📊 Štatistiky Projektu

- **Verzia:** 1.0.0
- **Status:** ✅ Production Ready
- **Vytvorené:** 2026-02-17
- **Technológie:** Next.js 14, TypeScript, Tailwind CSS
- **Zdroje:** AFUS.sk (rozšíriteľné)
- **Licencia:** Open Source

---

## 💡 Tipy

### Pre Najlepší Zážitok

1. **Použite VS Code** - Najlepší editor pre tento projekt
2. **Nainštalujte extensions** - ESLint, Tailwind IntelliSense
3. **Otvorte DevTools** - F12 v prehliadači
4. **Čítajte console logy** - Veľa užitočných informácií
5. **Experimentujte** - Nebojte sa meniť kód!

### Užitočné Skratky

- `Ctrl/Cmd + C` - Zastaviť server
- `Ctrl/Cmd + Shift + R` - Hard refresh
- `F12` - DevTools

---

## 🌟 Features v Pláne

### Verzia 1.1.0
- Viac zdrojov podujatí
- Export do kalendára
- Dark mode
- Kategórie podujatí

### Verzia 2.0.0
- User accounts
- Notifikácie
- Mapa podujatí
- Mobile app

---

## 🤝 Prispievanie

Príspevky sú vítané!

1. Fork projektu
2. Vytvorte feature branch
3. Commit zmeny
4. Push do branch
5. Otvorte Pull Request

---

## 📜 Licencia

Tento projekt je vytvorený pre agregáciu verejne dostupných podujatí na Slovensku.

---

## 🎯 Záver

**Máte všetko, čo potrebujete na začiatok!**

- 📖 Dokumentácia je kompletná
- 💻 Kód je production-ready
- 🎨 Dizajn je moderný
- 🚀 Deployment je jednoduchý

**Začnite s [INSTALLATION.md](./INSTALLATION.md) a užite si vývoj!**

---

**Vytvorené s ❤️ pre slovenskú komunitu**

**Verzia:** 1.0.0 | **Dátum:** 2026-02-17 | **Status:** ✅ Ready
