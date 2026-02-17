# 📝 Changelog

Všetky významné zmeny v tomto projekte budú dokumentované v tomto súbore.

Formát je založený na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
a tento projekt dodržiava [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-17

### 🎉 Prvé Vydanie

Prvá plne funkčná verzia agregátora podujatí na Slovensku.

### ✨ Pridané

#### Core Features
- **Web Scraping System**
  - Etický web scraper s Cheerio
  - Podpora pre AFUS.sk ako prvý zdroj
  - Automatická normalizácia dát
  - Chronologické zoradenie podujatí (január - december)
  - Rozšíriteľná architektúra pre ďalšie zdroje

#### Caching System
- 24-hodinový cache mechanizmus
- Automatické ukladanie do JSON súboru
- Validácia cache validity
- Force refresh možnosť

#### API
- REST API endpoint `/api/events`
- Query parameters (month, search, refresh)
- JSON response format
- Error handling

#### UI Components
- **EventCard** - Moderná karta podujatia s:
  - Prominentný dátum badge
  - Názov, miesto, čas
  - Link na zdroj
  - Hover efekty
- **EventGrid** - Responzívny grid layout
- **FilterBar** - Vyhľadávanie a filtrovanie
- **Loading States** - Skeleton screens
- **Error States** - User-friendly error messages

#### Filtering & Search
- Vyhľadávanie podľa názvu a miesta
- Filter podľa mesiaca (1-12)
- Real-time filtering
- Clear filter funkcie
- Aktívne filtre display

#### Design
- Moderný, minimalistický dizajn
- Čisté karty s prehľadnými informáciami
- Plne responzívny (mobil, tablet, desktop)
- Tailwind CSS styling
- Lucide React ikony
- Smooth transitions a animácie

#### Documentation
- README.md - Hlavná dokumentácia
- QUICK_START.md - Rýchly štart návod
- INSTALLATION.md - Detailný inštalačný návod
- DEPLOYMENT.md - Deployment guide
- ADDING_SOURCES.md - Návod na pridanie zdrojov
- PROJECT_SUMMARY.md - Technický prehľad
- CHANGELOG.md - Tento súbor

#### Configuration
- TypeScript konfigurácia
- Tailwind CSS setup
- ESLint konfigurácia
- Next.js 14 App Router
- Environment variables template

#### Developer Experience
- TypeScript pre type safety
- Hot reload (Next.js)
- Clear error messages
- Console logging
- npm scripts pre development

### 🔒 Bezpečnosť

- Input sanitization
- Error boundaries
- Type safety (TypeScript)
- No exposed secrets
- Ethical scraping practices

### 📊 Performance

- Server-side rendering
- Automatic code splitting
- Optimized bundle size
- 24h caching
- Lazy loading ready

### 🎨 Styling

- Tailwind CSS utility classes
- Custom color scheme
- Responsive breakpoints
- Dark mode ready (struktura)
- Accessibility basics

### 🧪 Testing

- Manual testing completed
- Browser compatibility verified
- Mobile responsiveness tested
- Error handling verified

---

## [Unreleased]

### 🚧 Plánované Features

#### Krátky Termín (v1.1.0)
- [ ] Pridanie ďalších zdrojov (kultúrne centrá)
- [ ] Export do kalendára (iCal)
- [ ] Zdieľanie na sociálnych sieťach
- [ ] Dark mode toggle
- [ ] Kategórie podujatí

#### Stredný Termín (v1.2.0)
- [ ] User accounts
- [ ] Uložené podujatia
- [ ] Email notifikácie
- [ ] Push notifikácie
- [ ] Pokročilé filtrovanie

#### Dlhý Termín (v2.0.0)
- [ ] Mapa podujatí
- [ ] Admin panel
- [ ] Mobile app (React Native)
- [ ] API pre tretie strany
- [ ] Multilanguage support

### 🐛 Známe Problémy

Momentálne žiadne známe kritické problémy.

### 💡 Vylepšenia do Budúcnosti

- Unit tests (Jest)
- E2E tests (Playwright)
- Performance monitoring
- Analytics integration
- SEO optimalizácia
- Sitemap generation
- RSS feed

---

## Verzie

### Semantic Versioning

Projekt používa semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR** - Nekompatibilné API zmeny
- **MINOR** - Nové features (backward compatible)
- **PATCH** - Bug fixes (backward compatible)

### Release Notes Template

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- Nové features

### Changed
- Zmeny v existujúcich features

### Deprecated
- Features ktoré budú odstránené

### Removed
- Odstránené features

### Fixed
- Bug fixes

### Security
- Bezpečnostné záplaty
```

---

## Príspevky

Príspevky sú vítané! Pri vytváraní PR:

1. Aktualizujte CHANGELOG.md
2. Pridajte do sekcie [Unreleased]
3. Popíšte zmeny jasne a stručne
4. Uveďte issue číslo (ak existuje)

---

**Udržiavané od:** 2026-02-17  
**Aktuálna verzia:** 1.0.0  
**Status:** ✅ Production Ready
