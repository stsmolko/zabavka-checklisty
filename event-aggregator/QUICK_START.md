# 🚀 Rýchly Štart

Tento návod vás prevedie základným nastavením a spustením aplikácie.

## 📋 Predpoklady

Uistite sa, že máte nainštalované:

- **Node.js** (verzia 18 alebo vyššia) - [Stiahnuť](https://nodejs.org/)
- **npm** (zvyčajne súčasť Node.js)

Overenie inštalácie:

```bash
node --version  # malo by vypísať v18.x.x alebo vyššie
npm --version   # malo by vypísať v9.x.x alebo vyššie
```

## 🎯 Krok za Krokom

### 1. Nainštalujte Závislosti

```bash
cd event-aggregator
npm install
```

Toto nainštaluje všetky potrebné balíčky (Next.js, React, Tailwind CSS, atď.)

### 2. Spustite Vývojový Server

```bash
npm run dev
```

Počkajte, kým sa zobrazí:

```
✓ Ready in X.Xs
○ Local:   http://localhost:3000
```

### 3. Otvorte Aplikáciu

Otvorte prehliadač a prejdite na:

```
http://localhost:3000
```

## 🎉 Hotovo!

Aplikácia by mala byť spustená a funkčná. Pri prvom načítaní:

1. Automaticky sa spustí scraping z AFUS.sk
2. Dáta sa uložia do cache (`data/events-cache.json`)
3. Zobrazí sa zoznam podujatí

## 🔧 Základné Použitie

### Vyhľadávanie

Zadajte názov podujatia alebo miesto do vyhľadávacieho poľa.

### Filtrovanie

Vyberte mesiac z rozbaľovacieho menu pre zobrazenie podujatí v konkrétnom mesiaci.

### Obnovenie Dát

Kliknite na tlačidlo "Obnoviť" pre načítanie najnovších dát zo zdrojov.

## 📊 Testovanie Scrapera

Pre manuálne spustenie scrapera:

```bash
npm run scrape
```

Toto:
- Načíta dáta z AFUS.sk
- Uloží ich do `data/events-cache.json`
- Vypíše štatistiky do konzoly

## 🐛 Časté Problémy

### Port 3000 je obsadený

Ak je port 3000 už používaný, Next.js automaticky ponúkne iný port (napr. 3001).

Alebo môžete špecifikovať vlastný port:

```bash
PORT=3001 npm run dev
```

### Chyba pri inštalácii závislostí

Skúste vyčistiť cache a znovu nainštalovať:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Scraping nefunguje

1. Overte internetové pripojenie
2. Skontrolujte, či je AFUS.sk dostupný
3. Pozrite console logy pre detaily

## 📝 Ďalšie Kroky

- Prečítajte si [README.md](./README.md) pre detailnú dokumentáciu
- Prispôsobte dizajn v `components/` priečinku
- Pridajte nové zdroje dát v `lib/scraper.ts`

## 🆘 Potrebujete Pomoc?

Ak narazíte na problém:

1. Skontrolujte console logy v termináli
2. Pozrite browser console (F12)
3. Prečítajte si sekciu "Riešenie Problémov" v README.md

---

**Užite si používanie aplikácie! 🎉**
