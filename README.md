# 📋 Checklist pre zamestnancov - Zábavka

Webová aplikácia pre správu checklist-u zamestnancov s automatickým zasielaním emailov cez Google Apps Script.

## 🎯 Funkcie

- ✅ Interaktívny checklist s kategóriami úloh
- 📧 Automatické zasielanie emailov pri dokončení checklistu
- 💾 Ukladanie dát do Google Sheets
- 🎨 Moderný dizajn s Zábavka branding farbami
- 📱 Responzívne rozloženie pre mobilné zariadenia
- ⚡ Real-time validácia formulára

## 📁 Štruktúra projektu

```
zabavka-checklist/
├── checklist-zamestnanci.html   # Hlavná webová aplikácia
├── google-apps-script.js        # Backend script pre Google Apps Script
├── zabavka-logo.png             # Logo Zábavka
├── NAVOD-NASTAVENIE-EMAILU.txt  # Návod na nastavenie
└── README.md                    # Tento súbor
```

## 🚀 Inštalácia a nastavenie

### 1. Google Sheets

1. Vytvorte nový Google Sheet
2. Pomenujte ho "Checklist Zamestnanci"
3. Vytvorte hárok s názvom "Odpovede"

### 2. Google Apps Script

1. V Google Sheets: **Extensions** → **Apps Script**
2. Skopírujte obsah súboru `google-apps-script.js`
3. Nastavte trigger pre funkciu `doPost`:
   - Kliknite na hodinky (Triggers)
   - Add Trigger
   - Vyberte `doPost`
   - Event type: **From web**
   - Deploy as: **Web app**

### 3. Deploy Web App

1. V Apps Script: **Deploy** → **New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Skopírujte **Web app URL**

### 4. HTML súbor

1. Otvorte `checklist-zamestnanci.html`
2. Nájdite riadok s `fetch('YOUR_GOOGLE_APPS_SCRIPT_URL')`
3. Nahraďte `YOUR_GOOGLE_APPS_SCRIPT_URL` vašou Web app URL
4. Uložte súbor

## 💻 Použitie

1. Otvorte `checklist-zamestnanci.html` vo webovom prehliadači
2. Vyplňte meno a priezvisko zamestnanca
3. Zakliknite všetky dokončené úlohy v checklistoch
4. Kliknite na **Odoslať checklist**
5. Email sa automaticky odošle a dáta sa uložia do Google Sheets

## 📧 Email konfigurácia

Email sa odosiela na adresu definovanú v Google Apps Script.
Pre zmenu príjemcu upravte premennú v `google-apps-script.js`:

```javascript
const recipientEmail = "vasa@email.sk";
```

## 🎨 Prispôsobenie

### Farby
Hlavné farby projektu (Zábavka branding):
- Primárna: `#b4ff00` (limetková zelená)
- Sekundárna: `#d4ff4e` (svetlá limetková)
- Pozadie: Tmavý gradient

### Logo
Nahraďte súbor `zabavka-logo.png` vlastným logom (odporúčaná šírka: 200-300px)

## 🔧 Technológie

- **Frontend**: HTML5, CSS3, JavaScript (vanilla)
- **Backend**: Google Apps Script
- **Databáza**: Google Sheets
- **Email**: Gmail API (cez Apps Script)

## 📝 Licencia

Tento projekt je vytvorený pre spoločnosť Zábavka.

## 👤 Autor

Vytvorené pre Zábavka

## 🆘 Podpora

Pre technické otázky alebo problémy si prečítajte súbor `NAVOD-NASTAVENIE-EMAILU.txt`.
