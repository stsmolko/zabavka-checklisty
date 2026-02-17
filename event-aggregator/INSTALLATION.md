# 🚀 Kompletný Inštalačný Návod

Tento návod vás prevedie celým procesom inštalácie a spustenia aplikácie od začiatku.

## 📋 Systémové Požiadavky

### Minimálne Požiadavky

- **Operačný Systém:** Windows 10+, macOS 10.15+, alebo Linux
- **RAM:** 4 GB (odporúčané 8 GB)
- **Disk:** 500 MB voľného miesta
- **Internet:** Aktívne pripojenie

### Potrebný Software

1. **Node.js** (verzia 18 alebo vyššia)
2. **npm** (zvyčajne súčasť Node.js)
3. **Git** (voliteľné, pre version control)
4. **Textový editor** (VS Code, Sublime, atď.)

## 🔧 Inštalácia Node.js

### Windows

1. Stiahnite inštalátor z [nodejs.org](https://nodejs.org/)
2. Spustite stiahnutý `.msi` súbor
3. Postupujte podľa inštalačného sprievodcu
4. Reštartujte počítač

### macOS

**Option 1: Oficiálny inštalátor**
```bash
# Stiahnite z nodejs.org a nainštalujte
```

**Option 2: Homebrew**
```bash
brew install node
```

### Linux (Ubuntu/Debian)

```bash
# Aktualizujte package manager
sudo apt update

# Nainštalujte Node.js a npm
sudo apt install nodejs npm

# Overte verziu
node --version
npm --version
```

### Overenie Inštalácie

Otvorte terminál/command prompt a spustite:

```bash
node --version
# Malo by vypísať: v18.x.x alebo vyššie

npm --version
# Malo by vypísať: v9.x.x alebo vyššie
```

## 📦 Stiahnutie Projektu

### Option 1: Git Clone (Odporúčané)

```bash
# Naklonujte repozitár
git clone https://github.com/username/event-aggregator.git

# Prejdite do priečinka
cd event-aggregator
```

### Option 2: ZIP Download

1. Stiahnite ZIP súbor projektu
2. Rozbaľte ho
3. Otvorte terminál v priečinku projektu

## 🔨 Inštalácia Projektu

### Krok 1: Otvorte Terminál v Priečinku Projektu

**Windows:**
- Otvorte priečinok v Exploreri
- Shift + Pravý klik → "Open PowerShell window here"

**macOS:**
- Otvorte priečinok vo Finderi
- Pravý klik → Services → New Terminal at Folder

**Linux:**
- Otvorte priečinok v file manageri
- Pravý klik → Open in Terminal

### Krok 2: Nainštalujte Závislosti

```bash
npm install
```

**Čo sa deje:**
- npm stiahne všetky potrebné balíčky
- Vytvorí `node_modules/` priečinok
- Môže trvať 2-5 minút

**Možné problémy:**

❌ **"npm: command not found"**
```bash
# Node.js nie je nainštalovaný alebo nie je v PATH
# Riešenie: Nainštalujte Node.js a reštartujte terminál
```

❌ **"EACCES: permission denied"**
```bash
# Problém s oprávneniami (Linux/macOS)
# Riešenie: Použite npm bez sudo (nastavte npm prefix)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

❌ **"Network error"**
```bash
# Problém s internetom alebo firewall
# Riešenie: Skontrolujte pripojenie, skúste:
npm install --registry=https://registry.npmjs.org/
```

### Krok 3: Vytvorte Data Priečinok (Ak neexistuje)

```bash
mkdir -p data
```

## ▶️ Spustenie Aplikácie

### Vývojový Režim

```bash
npm run dev
```

**Čo sa deje:**
- Spustí sa Next.js development server
- Aplikácia sa skompiluje
- Server počúva na porte 3000

**Výstup by mal vyzerať takto:**

```
  ▲ Next.js 14.2.18
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Ready in 2.5s
```

### Krok 4: Otvorte Aplikáciu

Otvorte prehliadač a prejdite na:

```
http://localhost:3000
```

## 🎉 Prvé Spustenie

### Čo sa stane pri prvom načítaní:

1. **Scraping** - Aplikácia automaticky načíta podujatia z AFUS.sk
2. **Caching** - Dáta sa uložia do `data/events-cache.json`
3. **Zobrazenie** - Podujatia sa zobrazia na stránke

**Prvé načítanie môže trvať 5-10 sekúnd.**

### Overenie Funkčnosti

✅ **Kontrolný zoznam:**

- [ ] Stránka sa načítala bez chyby
- [ ] Vidíte zoznam podujatí
- [ ] Vyhľadávanie funguje
- [ ] Filter mesiacov funguje
- [ ] Tlačidlo "Obnoviť" funguje
- [ ] Responzívny dizajn (zmenšite okno)

## 🛠️ Pokročilé Nastavenia

### Environment Variables (Voliteľné)

Vytvorte `.env.local` súbor v root priečinku:

```bash
# Skopírujte example súbor
cp .env.example .env.local
```

Upravte hodnoty podľa potreby:

```env
NODE_ENV=development
SCRAPER_DELAY_MS=2000
CACHE_MAX_AGE_HOURS=24
```

### Custom Port

Ak je port 3000 obsadený:

```bash
PORT=3001 npm run dev
```

### Production Build

Pre testovanie produkčnej verzie:

```bash
# Build
npm run build

# Spustenie
npm start
```

## 🧪 Testovanie Scrapera

### Manuálne Spustenie

```bash
npm run scrape
```

**Výstup:**

```
🚀 Starting event scraper...

🔍 Scraping events from AFUS.sk...
✅ Successfully scraped 42 events from AFUS.sk
💾 Events cached to /path/to/data/events-cache.json

📊 Total events: 42

📅 Sample events:
  - 2026-01-15 | Folklórny festival | Bratislava
  - 2026-02-20 | Tradičný tanec | Košice
  ...
```

## 📂 Štruktúra po Inštalácii

```
event-aggregator/
├── node_modules/          ← Nainštalované balíčky (veľký priečinok)
├── data/
│   └── events-cache.json  ← Cache súbor (vytvorí sa automaticky)
├── .next/                 ← Build výstupy (vytvorí sa pri dev/build)
├── app/
├── components/
├── lib/
├── types/
├── public/
├── package.json
└── ... ostatné súbory
```

## 🐛 Riešenie Problémov

### Aplikácia sa nespustí

**Problém:** Port 3000 je obsadený

```bash
# Zistite, čo používa port 3000
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000

# Ukončite proces alebo použite iný port
PORT=3001 npm run dev
```

**Problém:** "Cannot find module"

```bash
# Preinštalujte závislosti
rm -rf node_modules package-lock.json
npm install
```

**Problém:** TypeScript chyby

```bash
# Vyčistite cache a rebuild
rm -rf .next
npm run dev
```

### Scraping nefunguje

**Problém:** "fetch failed"

```bash
# Skontrolujte internet
ping google.com

# Skúste manuálny scraping s logmi
npm run scrape
```

**Problém:** "No events found"

- Overte, že AFUS.sk je dostupný
- Skontrolujte, či sa nezmenila štruktúra webu
- Pozrite console logy pre detaily

### Styling problémy

**Problém:** Tailwind CSS nefunguje

```bash
# Vyčistite cache
rm -rf .next
npm run dev
```

## 📚 Ďalšie Kroky

Po úspešnej inštalácii:

1. **Prečítajte [QUICK_START.md](./QUICK_START.md)** - Základné použitie
2. **Prečítajte [README.md](./README.md)** - Detailná dokumentácia
3. **Preskúmajte kód** - Pochopte ako aplikácia funguje
4. **Prispôsobte dizajn** - Upravte farby, layout, atď.
5. **Pridajte zdroje** - Prečítajte [ADDING_SOURCES.md](./ADDING_SOURCES.md)

## 🎓 Užitočné Príkazy

```bash
# Vývojový server
npm run dev

# Produkčný build
npm run build

# Spustenie produkcie
npm start

# Linting
npm run lint

# Manuálny scraping
npm run scrape

# Vyčistenie cache
rm -rf .next node_modules

# Reinstall
npm install

# Update dependencies
npm update
```

## 💡 Tipy pre Začiatočníkov

### VS Code Extensions (Odporúčané)

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **ESLint**
- **Prettier**
- **Auto Rename Tag**

### Užitočné Skratky

- `Ctrl/Cmd + C` - Zastaviť server v termináli
- `Ctrl/Cmd + Shift + R` - Hard refresh v prehliadači
- `F12` - Otvoriť DevTools v prehliadači

### Learning Resources

- [Next.js Dokumentácia](https://nextjs.org/docs)
- [React Dokumentácia](https://react.dev)
- [Tailwind CSS Dokumentácia](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Potrebujete Pomoc?

### Kde hľadať pomoc:

1. **Dokumentácia projektu** - Prečítajte všetky .md súbory
2. **Console logy** - Pozrite terminál a browser console
3. **Google/Stack Overflow** - Hľadajte chybové hlášky
4. **GitHub Issues** - Vytvorte issue v repozitári

### Informácie pre debugging:

Pri hlásení problému uveďte:

- Operačný systém a verziu
- Node.js verziu (`node --version`)
- npm verziu (`npm --version`)
- Chybovú hlášku (celú)
- Kroky na reprodukciu problému

## ✅ Kontrolný Zoznam Inštalácie

- [ ] Node.js nainštalovaný (v18+)
- [ ] npm nainštalovaný (v9+)
- [ ] Projekt stiahnutý
- [ ] Závislosti nainštalované (`npm install`)
- [ ] Development server funguje (`npm run dev`)
- [ ] Aplikácia dostupná na `localhost:3000`
- [ ] Scraping funguje (vidíte podujatia)
- [ ] Všetky funkcie fungujú (search, filter, refresh)

## 🎉 Gratulujeme!

Ak ste prešli všetkými krokmi, aplikácia by mala byť plne funkčná. Užite si používanie a vývoj!

---

**Posledná aktualizácia:** 2026-02-17  
**Verzia:** 1.0.0
