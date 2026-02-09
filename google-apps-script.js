// Google Apps Script pre Zabavka Checklist
// Tento kód skopíruj do Google Sheets -> Extensions -> Apps Script

// Funkcia pre GET požiadavky (potrebná pre Web App)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'status': 'success',
    'message': 'Zabavka Checklist API je aktívne'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Funkcia pre POST požiadavky (odosielanie formulára)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ak je sheet prázdny, pridaj hlavičky
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Čas odoslania',
        'Dátum',
        'Názov akcie',
        'Atrakcia',
        'Meno a priezvisko',
        'Druh akcie',
        'Vstupné',
        'Kontrola atrakcie',
        'Kontrola brigádnik',
        'Kontrola šofér',
        'Rodinné oslavy',
        'Pokladňa',
        'Objednávka tričko',
        'Servis dodávky',
        'Servis atrakcie',
        'Čistenie atrakcie',
        'Správa pre šéfka'
      ]);
      
      // Naformátuj hlavičky
      var headerRange = sheet.getRange(1, 1, 1, 17);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#b4ff00');
      headerRange.setFontColor('#000000');
    }
    
    // Parsuj JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Pridaj nový riadok s dátami
    sheet.appendRow([
      data.cas_odoslania || new Date().toLocaleString('sk-SK'),
      data.datum || '',
      data.nazov_akcie || '',
      data.atrakcia || '',
      data.meno_priezvisko || '',
      data.druh_akcie || '',
      data.vstupne || '',
      data.checklist || '',
      data.brigadnik || '',
      data.sofer || '',
      data.rodinne_oslavy || '',
      data.pokladna || '',
      data.objednavka_tricko || '',
      data.servis_dodavky || '',
      data.servis_atrakcie || '',
      data.cistenie_atrakcie || '',
      data.sprava_pre_sefku || ''
    ]);
    
    // Pošli email notifikáciu (voliteľné)
    sendEmailNotification(data);
    
    // Vráť úspešnú odpoveď
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Dáta boli úspešne uložené'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Vráť chybovú odpoveď
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Funkcia na odoslanie email notifikácie
function sendEmailNotification(data) {
  // NASTAV SVOJ EMAIL TU:
  var emailAddress = 'tvoj-email@example.com'; // <-- ZMEŇ NA SVOJ EMAIL
  
  var subject = '✅ Nový Zabavka Checklist: ' + (data.meno_priezvisko || 'Neznámy');
  
  var body = '🎉 Nový checklist bol odoslaný!\n\n';
  body += '📅 Dátum: ' + (data.datum || '') + '\n';
  body += '📍 Akcia: ' + (data.nazov_akcie || '') + '\n';
  body += '🎪 Atrakcia: ' + (data.atrakcia || '') + '\n';
  body += '👤 Meno: ' + (data.meno_priezvisko || '') + '\n';
  body += '🎭 Druh akcie: ' + (data.druh_akcie || '') + '\n';
  body += '💰 Vstupné: ' + (data.vstupne || '') + '\n\n';
  
  body += '═══════════════════════════════\n';
  body += '🏰 KONTROLA ATRAKCIE:\n';
  body += '═══════════════════════════════\n';
  body += (data.checklist || 'Nevyplnené') + '\n\n';
  
  body += '═══════════════════════════════\n';
  body += '👷 KONTROLA BRIGÁDNIK:\n';
  body += '═══════════════════════════════\n';
  body += (data.brigadnik || 'Nevyplnené') + '\n\n';
  
  body += '═══════════════════════════════\n';
  body += '🚗 KONTROLA ŠOFÉR:\n';
  body += '═══════════════════════════════\n';
  body += (data.sofer || 'Nevyplnené') + '\n\n';
  
  if (data.rodinne_oslavy) {
    body += '═══════════════════════════════\n';
    body += '🎂 RODINNÉ OSLAVY:\n';
    body += '═══════════════════════════════\n';
    body += data.rodinne_oslavy + '\n\n';
  }
  
  if (data.pokladna) {
    body += '═══════════════════════════════\n';
    body += '💵 POKLADŇA:\n';
    body += '═══════════════════════════════\n';
    body += data.pokladna + '\n\n';
  }
  
  if (data.objednavka_tricko) {
    body += '👕 OBJEDNÁVKA TRIČKO: ' + data.objednavka_tricko + '\n\n';
  }
  
  if (data.servis_dodavky) {
    body += '🔧 SERVIS DODÁVKY: ' + data.servis_dodavky + '\n\n';
  }
  
  if (data.servis_atrakcie) {
    body += '🔧 SERVIS ATRAKCIE: ' + data.servis_atrakcie + '\n\n';
  }
  
  if (data.cistenie_atrakcie) {
    body += '🧹 ČISTENIE ATRAKCIE: ' + data.cistenie_atrakcie + '\n\n';
  }
  
  if (data.sprava_pre_sefku) {
    body += '═══════════════════════════════\n';
    body += '💬 SPRÁVA PRE ŠÉFKU:\n';
    body += '═══════════════════════════════\n';
    body += data.sprava_pre_sefku + '\n\n';
  }
  
  body += '\n⏰ Odoslané: ' + (data.cas_odoslania || new Date().toLocaleString('sk-SK'));
  body += '\n\n--\nZabavka Checklist System';
  
  try {
    MailApp.sendEmail(emailAddress, subject, body);
  } catch (error) {
    Logger.log('Chyba pri posielaní emailu: ' + error.toString());
  }
}

// Testovacia funkcia
function test() {
  var testData = {
    datum: '2024-01-15',
    nazov_akcie: 'Testovacia akcia',
    atrakcia: 'Skákací hrad',
    meno_priezvisko: 'Ján Novák',
    druh_akcie: 'Rodinná oslava',
    vstupne: 'Nie',
    checklist: '✅ Test 1\n✅ Test 2',
    cas_odoslania: new Date().toLocaleString('sk-SK')
  };
  
  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var response = doPost(e);
  Logger.log(response.getContent());
}
