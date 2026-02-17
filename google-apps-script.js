// ==============================================
// ZABAVKA CHECKLIST - GOOGLE APPS SCRIPT
// ==============================================
// Tento skript spracováva dáta z formulára a odosiela emaily

function doGet() {
  return ContentService.createTextOutput('Zabavka Checklist API je aktívne! ✅').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    // Získanie dát z POST requestu
    const data = JSON.parse(e.postData.contents);
    
    // Získanie aktívneho sheetu
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Vytvorenie hlavičky ak ešte neexistuje
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Čas odoslania', 'Dátum', 'Dátumové upozornenie', 'Názov akcie', 'Atrakcia', 
        'Meno a priezvisko', 'Email zamestnanca', 'Druh akcie', 'Vstupné', 
        'Kontrola atrakcie', 'Kontrola brigádnik', 'Kontrola šofér', 
        'Rodinné oslavy', 'Pokladňa', 'Maskoti', 
        'Objednávka tričko', 'Servis dodávky', 'Servis atrakcie', 
        'Čistenie atrakcie', 'Správa pre šéfku'
      ];
      
      const headerRange = sheet.getRange(1, 1, 1, 20);
      headerRange.setValues([headers]);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#b4ff00');
      headerRange.setFontColor('#000000');
      
      // Nastavenie zarovnania a wrap pre všetky stĺpce
      const allRange = sheet.getRange(1, 1, 1000, 20);
      allRange.setVerticalAlignment('top');
      allRange.setHorizontalAlignment('left');
      allRange.setWrap(true);
    }
    
    // Pridanie nového riadku s dátami
    sheet.appendRow([
      data.cas_odoslania || '',
      data.datum || '',
      data.datum_upozornenie || '',
      data.nazov_akcie || '',
      data.atrakcia || '',
      data.meno_priezvisko || '',
      data.email_zamestnanca || '',
      data.druh_akcie || '',
      data.vstupne || '',
      data.checklist || '',
      data.brigadnik || '',
      data.sofer || '',
      data.rodinne_oslavy || '',
      data.pokladna || '',
      data.maskoti || '',
      data.objednavka_tricko || '',
      data.servis_dodavky || '',
      data.servis_atrakcie || '',
      data.cistenie_atrakcie || '',
      data.sprava_pre_sefku || ''
    ]);
    
    // Zvýraznenie bunky s dátumovým upozornením ak existuje
    if (data.datum_upozornenie && data.datum_upozornenie.length > 0) {
      const lastRow = sheet.getLastRow();
      const upozornenieCell = sheet.getRange(lastRow, 3); // Stĺpec C
      upozornenieCell.setBackground('#ff4757');
      upozornenieCell.setFontColor('#ffffff');
      upozornenieCell.setFontWeight('bold');
    }
    
    // Odoslanie emailov
    posliEmail(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Dáta boli úspešne uložené'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Chyba: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function posliEmail(data) {
  try {
    // Emailové adresy
    const emailSefka = 'kontrola@zabavka.sk';
    const emailZamestnanec = data.email_zamestnanca || '';
    const emailAdmin = 'stsmolko@gmail.com';
    const emailServis = 'dusan.onody2@gmail.com';
    
    // Vytvorenie tela emailu pre šéfku
    let emailBody = '📋 NOVÝ CHECKLIST OD ZAMESTNANCA\n\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += 'ZÁKLADNÉ INFORMÁCIE\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    emailBody += '⏰ Čas odoslania: ' + (data.cas_odoslania || '') + '\n';
    emailBody += '📅 Dátum: ' + (data.datum || '') + '\n';
    
    if (data.datum_upozornenie && data.datum_upozornenie.length > 0) {
      emailBody += '\n⚠️ ' + data.datum_upozornenie + '\n';
    }
    
    emailBody += '📍 Názov akcie: ' + (data.nazov_akcie || '') + '\n';
    emailBody += '🎪 Atrakcia: ' + (data.atrakcia || '') + '\n';
    emailBody += '👤 Meno: ' + (data.meno_priezvisko || '') + '\n';
    emailBody += '📧 Email: ' + (data.email_zamestnanca || '') + '\n';
    emailBody += '🎯 Druh akcie: ' + (data.druh_akcie || '') + '\n';
    emailBody += '💰 Vstupné: ' + (data.vstupne || '') + '\n\n';
    
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += '✅ KONTROLA ATRAKCIE\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    emailBody += data.checklist || 'Nevyplnené\n';
    emailBody += '\n';
    
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += '👷 KONTROLA BRIGÁDNIK\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    emailBody += data.brigadnik || 'Nevyplnené\n';
    emailBody += '\n';
    
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += '🚗 KONTROLA ŠOFÉR\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    emailBody += data.sofer || 'Nevyplnené\n';
    emailBody += '\n';
    
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += '🎉 RODINNÉ OSLAVY\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    emailBody += data.rodinne_oslavy || 'Nevyplnené\n';
    emailBody += '\n';
    
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += '💵 POKLADŇA\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    emailBody += data.pokladna || 'Nevyplnené\n';
    emailBody += '\n';
    
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += '🎭 MASKOTI\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    emailBody += data.maskoti || 'Nevyplnené\n';
    emailBody += '\n';
    
    if (data.objednavka_tricko && data.objednavka_tricko.trim().length > 0) {
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      emailBody += '👕 OBJEDNÁVKA TRIČKO\n';
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      emailBody += data.objednavka_tricko + '\n\n';
    }
    
    if (data.servis_dodavky && data.servis_dodavky.trim().length > 0) {
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      emailBody += '🔧 SERVIS DODÁVKY\n';
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      emailBody += data.servis_dodavky + '\n\n';
    }
    
    if (data.servis_atrakcie && data.servis_atrakcie.trim().length > 0) {
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      emailBody += '🔧 SERVIS ATRAKCIE\n';
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      emailBody += data.servis_atrakcie + '\n\n';
    }
    
    if (data.cistenie_atrakcie && data.cistenie_atrakcie.trim().length > 0) {
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      emailBody += '🧹 ČISTENIE ATRAKCIE\n';
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      emailBody += data.cistenie_atrakcie + '\n\n';
    }
    
    if (data.sprava_pre_sefku && data.sprava_pre_sefku.trim().length > 0) {
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      emailBody += '💬 SPRÁVA PRE ŠÉFKU\n';
      emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      emailBody += data.sprava_pre_sefku + '\n\n';
    }
    
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    emailBody += 'Koniec reportu\n';
    emailBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    
    // Odoslanie emailu šéfke
    MailApp.sendEmail({
      to: emailSefka,
      subject: '📋 Nový checklist: ' + (data.nazov_akcie || 'Bez názvu') + ' - ' + (data.meno_priezvisko || ''),
      body: emailBody
    });
    
    // Odoslanie potvrdzovacieho emailu zamestnancovi
    if (emailZamestnanec && emailZamestnanec.length > 0) {
      let confirmBody = 'Ahoj ' + (data.meno_priezvisko || '') + '! 👋\n\n';
      confirmBody += '✅ Tvoj checklist bol úspešne odoslaný!\n\n';
      confirmBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      confirmBody += 'Základné informácie:\n';
      confirmBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      confirmBody += '⏰ Čas odoslania: ' + (data.cas_odoslania || '') + '\n';
      confirmBody += '📅 Dátum: ' + (data.datum || '') + '\n';
      
      if (data.datum_upozornenie && data.datum_upozornenie.length > 0) {
        confirmBody += '\n⚠️ ' + data.datum_upozornenie + '\n';
      }
      
      confirmBody += '📍 Akcia: ' + (data.nazov_akcie || '') + '\n';
      confirmBody += '🎪 Atrakcia: ' + (data.atrakcia || '') + '\n\n';
      confirmBody += 'Ďakujeme za vyplnenie checklistu! 🎉\n\n';
      confirmBody += 'Tím Zabavka.sk';
      
      MailApp.sendEmail({
        to: emailZamestnanec,
        subject: '✅ Potvrdenie: Checklist bol úspešne odoslaný',
        body: confirmBody
      });
    }
    
    // Odoslanie anonymnej správy adminovi
    if (data.sprava_pre_sefku && data.sprava_pre_sefku.trim().length > 0) {
      let adminBody = '💬 ANONYMNÁ SPRÁVA OD ZAMESTNANCA\n\n';
      adminBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      adminBody += data.sprava_pre_sefku + '\n\n';
      adminBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      adminBody += 'Táto správa bola odoslaná anonymne z checklistu.\n';
      adminBody += 'Dátum: ' + (data.datum || '') + '\n';
      adminBody += 'Čas: ' + (data.cas_odoslania || '');
      
      MailApp.sendEmail({
        to: emailAdmin,
        subject: '💬 Anonymná správa od zamestnanca',
        body: adminBody
      });
    }
    
    // Odoslanie servisných hlásení
    let maServis = false;
    let servisBody = '🔧 SERVISNÉ HLÁSENIE\n\n';
    servisBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    servisBody += 'Od: ' + (data.meno_priezvisko || '') + '\n';
    servisBody += 'Akcia: ' + (data.nazov_akcie || '') + '\n';
    servisBody += 'Atrakcia: ' + (data.atrakcia || '') + '\n';
    servisBody += 'Dátum: ' + (data.datum || '') + '\n';
    servisBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    
    if (data.servis_dodavky && data.servis_dodavky.trim().length > 0) {
      servisBody += '🚗 SERVIS DODÁVKY:\n' + data.servis_dodavky + '\n\n';
      maServis = true;
    }
    
    if (data.servis_atrakcie && data.servis_atrakcie.trim().length > 0) {
      servisBody += '🎪 SERVIS ATRAKCIE:\n' + data.servis_atrakcie + '\n\n';
      maServis = true;
    }
    
    if (data.cistenie_atrakcie && data.cistenie_atrakcie.trim().length > 0) {
      servisBody += '🧹 ČISTENIE ATRAKCIE:\n' + data.cistenie_atrakcie + '\n\n';
      maServis = true;
    }
    
    if (maServis) {
      MailApp.sendEmail({
        to: emailServis,
        subject: '🔧 Servisné hlásenie: ' + (data.atrakcia || 'Bez názvu'),
        body: servisBody
      });
    }
    
    Logger.log('Emaily úspešne odoslané');
    
  } catch (error) {
    Logger.log('Chyba pri odosielaní emailov: ' + error.toString());
  }
}

// Testovacia funkcia pre odosielanie emailov
function testEmail() {
  const testData = {
    cas_odoslania: '14:30:00',
    datum: '12.02.2026',
    datum_upozornenie: '⚠️ ROZDIELNY DÁTUM! Dátum v úvode: 11.02.2026, Dátum odoslania: 12.02.2026',
    nazov_akcie: 'Detský deň v Bratislave',
    atrakcia: 'Hrad Angry Birds',
    meno_priezvisko: 'Ján Testovací',
    email_zamestnanca: 'test@zabavka.sk',
    druh_akcie: 'Obecná/mestská akcia',
    vstupne: 'Áno',
    checklist: '✅ Atrakcia je prikotvená k zemi\n✅ Atrakcia má prevádzkový poriadok\n❌ Koberček nie je položený',
    brigadnik: '✅ Mám zabavka tričko\n✅ Mám pevnú obuv\n✅ Nefajčím',
    sofer: '✅ Mám odfotené vozidlo pred\n✅ Skladový lístok vyplnený',
    rodinne_oslavy: '',
    pokladna: '',
    maskoti: '',
    objednavka_tricko: 'Ján Novák, veľkosť L',
    servis_dodavky: 'Pravé spätné zrkadlo je uvoľnené',
    servis_atrakcie: 'Kompresor má divný zvuk',
    cistenie_atrakcie: 'Šmykľavka je špinavá od blatá',
    sprava_pre_sefku: 'Bolo by super keby sme mali viac času na prípravu atrakcií. Niekedy je to veľmi narýchlo.'
  };
  
  posliEmail(testData);
  Logger.log('Test email odoslaný');
}
