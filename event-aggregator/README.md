# 🎉 Agregátor Podujatí na Slovensku

Moderná, responzívna webová aplikácia pre agregáciu podujatí na Slovensku. Postavená s Next.js 14, Tailwind CSS a Lucide React.

## ✨ Funkcie

- 🔍 **Etický Web Scraping** - Automatické získavanie dát z rôznych zdrojov s rešpektovaním etických pravidiel
- 📅 **Chronologické Zoradenie** - Všetky podujatia automaticky zoradené od 1. januára do 31. decembra
- 🎨 **Moderný Dizajn** - Čistý, minimalistický dizajn s kartami pre každé podujatie
- 🔎 **Vyhľadávanie** - Jednoduché vyhľadávanie podľa názvu alebo miesta
- 📆 **Filter Podľa Mesiaca** - Rýchle filtrovanie podujatí podľa konkrétneho mesiaca
- 💾 **Caching** - Inteligentné ukladanie dát do cache (24 hodín) pre minimalizáciu záťaže zdrojových webov
- 📱 **Plne Responzívne** - Optimalizované pre mobil, tablet a desktop
- ⚡ **Rýchle Načítanie** - Server-side rendering a optimalizácia výkonu

## 🚀 Technológie

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Scraping**: Cheerio
- **Date Handling**: date-fns
- **Language**: TypeScript

## 📦 Inštalácia

1. **Nainštalujte závislosti:**

```bash
npm install
```

2. **Spustite vývojový server:**

```bash
npm run dev
```

3. **Otvorte prehliadač:**

Prejdite na [http://localhost:3000](http://localhost:3000)

## 🛠️ Skripty

```bash
# Spustenie vývojového servera
npm run dev

# Build pre produkciu
npm run build

# Spustenie produkčného servera
npm start

# Linting
npm run lint

# Manuálne spustenie scrapera
npm run scrape
```

## 📁 Štruktúra Projektu

```
event-aggregator/
├── app/
│   ├── api/
│   │   └── events/
│   │       └── route.ts          # API endpoint pre podujatia
│   ├── globals.css               # Globálne štýly
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Hlavná stránka
├── components/
│   ├── EventCard.tsx             # Karta podujatia
│   ├── EventGrid.tsx             # Grid s podujatiami
│   └── FilterBar.tsx             # Filter a vyhľadávanie
├── lib/
│   ├── scraper.ts                # Web scraping logika
│   ├── utils.ts                  # Pomocné funkcie
│   └── date-fns-locale.ts        # Slovenská lokalizácia
├── types/
│   └── event.ts                  # TypeScript typy
├── data/
│   └── events-cache.json         # Cache súbor (generovaný)
└── public/                       # Statické súbory
```

## 🌐 Zdroje Dát

### Aktuálne Zdroje:
- **AFUS.sk** - Asociácia Folklórnych Umeleckých Súborov

### Pridanie Nového Zdroja:

1. Otvorte `lib/scraper.ts`
2. Vytvorte novú funkciu podľa vzoru `scrapeAfusEvents()`
3. Pridajte ju do funkcie `aggregateEvents()`

Príklad:

```typescript
export async function scrapeNewSource(): Promise<Event[]> {
  const config: ScraperConfig = {
    url: 'https://example.sk/events',
    name: 'Example.sk',
  };

  // Implementujte scraping logiku
  // ...

  return events;
}

// V aggregateEvents():
export async function aggregateEvents(): Promise<Event[]> {
  const allEvents: Event[] = [];
  
  const afusEvents = await scrapeAfusEvents();
  allEvents.push(...afusEvents);
  
  const newSourceEvents = await scrapeNewSource();
  allEvents.push(...newSourceEvents);
  
  return sortEventsByDate(allEvents);
}
```

## 🎨 Prispôsobenie Dizajnu

### Farby

Upravte farby v `tailwind.config.ts` alebo priamo v komponentoch:

```typescript
// Primárna farba (modrá)
className="bg-blue-600 hover:bg-blue-700"

// Sekundárna farba (zelená)
className="bg-green-50 text-green-700"
```

### Komponenty

Všetky UI komponenty sú v priečinku `components/` a sú plne prispôsobiteľné.

## 📊 API Endpointy

### GET `/api/events`

Získanie zoznamu podujatí s možnosťou filtrovania.

**Query Parametre:**
- `month` (1-12) - Filter podľa mesiaca
- `search` (string) - Vyhľadávací dotaz
- `refresh` (true/false) - Vynútiť obnovenie cache

**Príklady:**

```bash
# Všetky podujatia
GET /api/events

# Podujatia v máji
GET /api/events?month=5

# Vyhľadávanie
GET /api/events?search=festival

# Obnovenie cache
GET /api/events?refresh=true
```

**Odpoveď:**

```json
{
  "success": true,
  "count": 42,
  "events": [
    {
      "id": "afus-2026-01-15-1",
      "title": "Folklórny festival",
      "date": "2026-01-15",
      "time": "18:00",
      "location": "Bratislava",
      "source": "https://www.afus.sk/kalendar.php",
      "sourceWebsite": "AFUS.sk",
      "month": 1,
      "year": 2026
    }
  ]
}
```

## 🔒 Etické Pravidlá Scrapingu

Aplikácia dodržiava tieto pravidlá:

1. ✅ **User-Agent** - Identifikuje sa ako bot s kontaktnými informáciami
2. ✅ **Rate Limiting** - Minimálne 2 sekundy medzi požiadavkami
3. ✅ **Caching** - Dáta sa cachujú na 24 hodín
4. ✅ **Robots.txt** - Rešpektuje pravidlá robots.txt
5. ✅ **Minimálna Záťaž** - Scraping len raz denne

## 🚀 Deployment

### Vercel (Odporúčané)

1. Push do GitHub repozitára
2. Importujte projekt vo Vercel
3. Deploy sa spustí automaticky

### Iné Platformy

```bash
# Build
npm run build

# Spustenie
npm start
```

## 📝 Poznámky

- Cache sa automaticky obnovuje po 24 hodinách
- Prvé načítanie môže trvať dlhšie (scraping)
- Dáta sú uložené v `data/events-cache.json`
- Pre manuálne obnovenie použite tlačidlo "Obnoviť" v UI

## 🐛 Riešenie Problémov

### Scraping nefunguje

1. Skontrolujte internetové pripojenie
2. Overte, že zdrojový web je dostupný
3. Skontrolujte console logy: `npm run scrape`

### Cache sa neobnovuje

1. Zmažte `data/events-cache.json`
2. Reštartujte server
3. Alebo použite `?refresh=true` v API

### Styling problémy

1. Vyčistite cache: `rm -rf .next`
2. Reštartujte dev server: `npm run dev`

## 📄 Licencia

Tento projekt je vytvorený pre agregáciu verejne dostupných podujatí na Slovensku.

## 👨‍💻 Autor

Vytvorené s ❤️ pre slovenskú komunitu

## 🤝 Prispievanie

Návrhy na nové zdroje dát alebo vylepšenia sú vítané!

1. Fork projektu
2. Vytvorte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmeny (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otvorte Pull Request

## 📞 Kontakt

Pre otázky alebo problémy vytvorte issue v GitHub repozitári.

---

**Vyrobené s Next.js 14 🚀**
