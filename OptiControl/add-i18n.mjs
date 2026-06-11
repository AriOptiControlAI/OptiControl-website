import { readFileSync, writeFileSync } from 'fs';
let html = readFileSync('/Users/ceoshala/Documents/Claude Code/Website Building/OptiControl/index-v2.html', 'utf8');

// ── 1. Wrap hero h1 static line in a span for targeting
html = html.replace(
  'Bedrifter jager leads.<br>',
  '<span id="hero-h1-line1">Bedrifter jager leads.</span><br>'
);

// ── 2. Add lang-switcher CSS before closing </style>
const langCSS = `
    /* ── Language switcher ────────────────────── */
    .lang-switcher { display:flex;align-items:center;gap:.12rem;margin:0 .5rem; }
    .lang-btn { background:none;border:1px solid transparent;cursor:pointer;font-size:1.1rem;line-height:1;padding:.18rem .22rem;border-radius:6px;opacity:.35;transition:opacity .18s,border-color .18s,transform .15s; }
    .lang-btn:hover { opacity:.75;border-color:var(--border);transform:scale(1.1); }
    .lang-btn.active { opacity:1;border-color:var(--border-h); }
    @media (max-width:600px) { .lang-switcher { margin:0 .2rem; } .lang-btn { font-size:.95rem;padding:.15rem .18rem; } }
`;
html = html.replace('  </style>\n</head>', langCSS + '  </style>\n</head>');

// ── 3. Add lang-switcher to nav (before btn-nav)
html = html.replace(
  '  <a href="https://cal.com/arianit-shala-sdsswn/ai-konsultasjon-opticontrol-ai?duration=30" target="_blank" rel="noopener noreferrer" class="btn-nav" id="nav-cta">Få tilgang</a>',
  `  <div class="lang-switcher" id="lang-switcher">
    <button class="lang-btn active" data-lang="no" onclick="setLang('no')" title="Norsk">🇳🇴</button>
    <button class="lang-btn" data-lang="sv" onclick="setLang('sv')" title="Svenska">🇸🇪</button>
    <button class="lang-btn" data-lang="en" onclick="setLang('en')" title="English">🇬🇧</button>
  </div>
  <a href="https://cal.com/arianit-shala-sdsswn/ai-konsultasjon-opticontrol-ai?duration=30" target="_blank" rel="noopener noreferrer" class="btn-nav" id="nav-cta">Få tilgang</a>`
);

// ── 4. Add data-i18n attributes to translatable elements

// Nav links
html = html.replace('<li><a href="#prosess">Slik fungerer det</a></li>', '<li><a href="#prosess" data-i18n="nav.prosess">Slik fungerer det</a></li>');
html = html.replace('<li><a href="#resultater">Resultater</a></li>', '<li><a href="#resultater" data-i18n="nav.resultater">Resultater</a></li>');
html = html.replace('<li><a href="#skiftet">Skiftet</a></li>', '<li><a href="#skiftet" data-i18n="nav.skiftet">Skiftet</a></li>');
html = html.replace('<li><a href="#kunder">Kunder</a></li>', '<li><a href="#kunder" data-i18n="nav.kunder">Kunder</a></li>');
// nav-cta already has id="nav-cta"

// Mobile menu
html = html.replace('<a href="#prosess" class="mob-link">Slik fungerer det</a>', '<a href="#prosess" class="mob-link" data-i18n="nav.prosess">Slik fungerer det</a>');
html = html.replace('<a href="#resultater" class="mob-link">Resultater</a>', '<a href="#resultater" class="mob-link" data-i18n="nav.resultater">Resultater</a>');
html = html.replace('<a href="#skiftet" class="mob-link">Skiftet</a>', '<a href="#skiftet" class="mob-link" data-i18n="nav.skiftet">Skiftet</a>');
html = html.replace('<a href="#kunder" class="mob-link">Kunder</a>', '<a href="#kunder" class="mob-link" data-i18n="nav.kunder">Kunder</a>');
html = html.replace('class="mob-cta mob-link">Få tilgang</a>', 'class="mob-cta mob-link" data-i18n="nav.cta">Få tilgang</a>');

// Hero badge
html = html.replace('<div class="hero-badge"><span class="dot"></span>Signalbasert B2B-kobling</div>', '<div class="hero-badge" data-i18n-html="hero.badge"><span class="dot"></span>Signalbasert B2B-kobling</div>');
// hero-h1-line1 already wrapped
html = html.replace('<span id="hero-h1-line1">', '<span id="hero-h1-line1" data-i18n="hero.h1">');
// hero-sub
html = html.replace('<p class="hero-sub">', '<p class="hero-sub" data-i18n="hero.sub">');
// hero CTAs
html = html.replace('class="btn-p">Få tilgang til nettverket →</a>', 'class="btn-p" data-i18n="hero.cta.primary">Få tilgang til nettverket →</a>');
html = html.replace('<a href="#prosess" class="btn-g">Se hvordan det fungerer</a>', '<a href="#prosess" class="btn-g" data-i18n="hero.cta.secondary">Se hvordan det fungerer</a>');
// hero stats labels
html = html.replace('<span class="hms-lbl">Kunder i Skandinavia</span>', '<span class="hms-lbl" data-i18n="hero.stat1.lbl">Kunder i Skandinavia</span>');
html = html.replace('<span class="hms-lbl">Til første tilkobling</span>', '<span class="hms-lbl" data-i18n="hero.stat2.lbl">Til første tilkobling</span>');
html = html.replace('<span class="hms-lbl">B2B-bedrifter koblet</span>', '<span class="hms-lbl" data-i18n="hero.stat3.lbl">B2B-bedrifter koblet</span>');
// infra badge
html = html.replace('<div class="label label-strong" style="display:inline-flex;"><span class="dot"></span>Proprietær agentisk infrastruktur.</div>', '<div class="label label-strong" style="display:inline-flex;" data-i18n-html="hero.infra.badge"><span class="dot"></span>Proprietær agentisk infrastruktur.</div>');
html = html.replace('<div style="margin-top:.45rem;font-size:.72rem;color:var(--muted);letter-spacing:.01em;">Utviklet og driftet av OptiControl.</div>', '<div style="margin-top:.45rem;font-size:.72rem;color:var(--muted);letter-spacing:.01em;" data-i18n="hero.infra.sub">Utviklet og driftet av OptiControl.</div>');

// Signal feed
html = html.replace('<span class="sf-ttl">Signalfeed</span>', '<span class="sf-ttl" data-i18n="sf.title">Signalfeed</span>');
html = html.replace('<span class="sf-t">2m siden</span>', '<span class="sf-t" data-i18n="sf.t1">2m siden</span>');
html = html.replace('<span class="sf-t">5m siden</span>', '<span class="sf-t" data-i18n="sf.t2">5m siden</span>');
html = html.replace('<span class="sf-t">11m siden</span>', '<span class="sf-t" data-i18n="sf.t3">11m siden</span>');
html = html.replace('<span class="sf-t">18m siden</span>', '<span class="sf-t" data-i18n="sf.t4">18m siden</span>');
// sf tags
html = html.replace('<span class="sf-tag i">Kjøpsintensjon</span><span class="sf-desc">CRM-migrering · Stack-analyse</span>', '<span class="sf-tag i" data-i18n="sf.tag.i">Kjøpsintensjon</span><span class="sf-desc" data-i18n="sf.desc1">CRM-migrering · Stack-analyse</span>');
html = html.replace('<span class="sf-tag e">Engasjement</span><span class="sf-desc">LinkedIn · VP Salg +3 besøk</span>', '<span class="sf-tag e" data-i18n="sf.tag.e">Engasjement</span><span class="sf-desc" data-i18n="sf.desc2">LinkedIn · VP Salg +3 besøk</span>');
html = html.replace('<span class="sf-tag b">Adferd</span><span class="sf-desc">Prisside · 4 besøk denne uken</span>', '<span class="sf-tag b" data-i18n="sf.tag.b">Adferd</span><span class="sf-desc" data-i18n="sf.desc3">Prisside · 4 besøk denne uken</span>');
html = html.replace('<span class="sf-tag i">Kjøpsintensjon</span><span class="sf-desc">Outreach-løsning · Høy samsvar</span>', '<span class="sf-tag i" data-i18n="sf.tag.i2">Kjøpsintensjon</span><span class="sf-desc" data-i18n="sf.desc4">Outreach-løsning · Høy samsvar</span>');
html = html.replace('<span class="sf-ml">Samsvarscore · TechNord AS</span>', '<span class="sf-ml" data-i18n="sf.match">Samsvarscore · TechNord AS</span>');

// Trust heading
html = html.replace(
  '<h2>Gjennom vår <em>proprietære infrastruktur</em> har vi knyttet<br>signalbaserte introduksjoner med selskaper som</h2>',
  '<h2 data-i18n-html="trust.heading">Gjennom vår <em>proprietære infrastruktur</em> har vi knyttet<br>signalbaserte introduksjoner med selskaper som</h2>'
);

// Kunder heading
html = html.replace(
  '<h2>Selskaper som stoler på <span style="color:#ffffff;font-style:normal;">Opti</span><span style="background:linear-gradient(135deg,#00E5FF 0%,#00FF94 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:normal;">Control</span></h2>',
  '<h2 data-i18n-html="kunder.heading">Selskaper som stoler på <span style="color:#ffffff;font-style:normal;">Opti</span><span style="background:linear-gradient(135deg,#00E5FF 0%,#00FF94 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:normal;">Control</span></h2>'
);

// Signal layer
html = html.replace('<div class="label rv"><span class="dot"></span>Signallaget</div>', '<div class="label rv" data-i18n-html="sig.label"><span class="dot"></span>Signallaget</div>');
html = html.replace('<h2 class="h-lg rv d1">Vi leser det markedet<br>allerede sier.</h2>', '<h2 class="h-lg rv d1" data-i18n-html="sig.h2">Vi leser det markedet<br>allerede sier.</h2>');
html = html.replace('<p class="body rv d2">De fleste bedrifter sender kald outreach til folk som ikke er klare. Vi gjør det motsatte — vi identifiserer bedrifter som allerede viser kjøpssignaler, og kobler dem med deg i riktig øyeblikk.</p>', '<p class="body rv d2" data-i18n="sig.body1">De fleste bedrifter sender kald outreach til folk som ikke er klare. Vi gjør det motsatte — vi identifiserer bedrifter som allerede viser kjøpssignaler, og kobler dem med deg i riktig øyeblikk.</p>');
html = html.replace('<p class="body rv d2">Ingen kald kontakt. Ingen spam. Bare varme, relevante koblinger basert på reell markedsatferd.</p>', '<p class="body rv d2" data-i18n="sig.body2">Ingen kald kontakt. Ingen spam. Bare varme, relevante koblinger basert på reell markedsatferd.</p>');
// sig cards
html = html.replace('<div class="sig-ico">Intensjon</div>', '<div class="sig-ico" data-i18n="sig.card1.ico">Intensjon</div>');
html = html.replace('<div class="sig-title">Kjøpsintensjon</div>\n          <div class="sig-desc">Aktiv søking etter løsninger som din, konkurrentanalyse og demoforespørsler.</div>', '<div class="sig-title" data-i18n="sig.card1.title">Kjøpsintensjon</div>\n          <div class="sig-desc" data-i18n="sig.card1.desc">Aktiv søking etter løsninger som din, konkurrentanalyse og demoforespørsler.</div>');
html = html.replace('<div class="sig-ico m">Engasjement</div>', '<div class="sig-ico m" data-i18n="sig.card2.ico">Engasjement</div>');
html = html.replace('<div class="sig-title">Digitalt engasjement</div>\n          <div class="sig-desc">LinkedIn-aktivitet, innholdsinteraksjon og nøkkelbesøk fra beslutningstakere.</div>', '<div class="sig-title" data-i18n="sig.card2.title">Digitalt engasjement</div>\n          <div class="sig-desc" data-i18n="sig.card2.desc">LinkedIn-aktivitet, innholdsinteraksjon og nøkkelbesøk fra beslutningstakere.</div>');
html = html.replace('<div class="sig-ico">Adferd</div>', '<div class="sig-ico" data-i18n="sig.card3.ico">Adferd</div>');
html = html.replace('<div class="sig-title">Adferdssignaler</div>\n          <div class="sig-desc">Prisside-besøk, stack-endringer og gjentatte besøk fra samme bedrift.</div>', '<div class="sig-title" data-i18n="sig.card3.title">Adferdssignaler</div>\n          <div class="sig-desc" data-i18n="sig.card3.desc">Prisside-besøk, stack-endringer og gjentatte besøk fra samme bedrift.</div>');
html = html.replace('<div class="sig-ico m">Timing</div>', '<div class="sig-ico m" data-i18n="sig.card4.ico">Timing</div>');
html = html.replace('<div class="sig-title">Temporal timing</div>\n          <div class="sig-desc">Budsjettsykluser, rolleendringer og vekstfaser som utløser kjøp.</div>', '<div class="sig-title" data-i18n="sig.card4.title">Temporal timing</div>\n          <div class="sig-desc" data-i18n="sig.card4.desc">Budsjettsykluser, rolleendringer og vekstfaser som utløser kjøp.</div>');

// Routing box
html = html.replace('<div style="font-size:.68rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:.25rem;">Rutingmotor — Live</div>', '<div style="font-size:.68rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:.25rem;" data-i18n="rb.live">Rutingmotor — Live</div>');
html = html.replace('<div class="rb-meta">Intensjonsignal oppdaget · Oslo, NO</div>', '<div class="rb-meta" data-i18n="rb.meta1">Intensjonsignal oppdaget · Oslo, NO</div>');
html = html.replace('<span class="rb-badge warm">Varm</span>\n        </div>\n        <div class="rb-con"><div class="rb-line"></div><div class="rb-arrow">→</div><div class="rb-line"></div><div class="rb-lbl">Matches · 91%</div></div>', '<span class="rb-badge warm" data-i18n="rb.badge.warm">Varm</span>\n        </div>\n        <div class="rb-con"><div class="rb-line"></div><div class="rb-arrow">→</div><div class="rb-line"></div><div class="rb-lbl" data-i18n="rb.matches">Matches · 91%</div></div>');
html = html.replace('<div class="rb-meta">ICP-match · Møte planlagt</div>', '<div class="rb-meta" data-i18n="rb.meta2">ICP-match · Møte planlagt</div>');
html = html.replace('<span class="rb-badge routing">Ruter</span>', '<span class="rb-badge routing" data-i18n="rb.badge.routing">Ruter</span>');
html = html.replace('<div class="rb-con"><div class="rb-line"></div><div class="rb-arrow">→</div><div class="rb-line"></div><div class="rb-lbl">Varm intro</div></div>', '<div class="rb-con"><div class="rb-line"></div><div class="rb-arrow">→</div><div class="rb-line"></div><div class="rb-lbl" data-i18n="rb.intro">Varm intro</div></div>');
html = html.replace('<div class="rb-meta">Engasjementsignal · 4 kontaktpunkter</div>', '<div class="rb-meta" data-i18n="rb.meta3">Engasjementsignal · 4 kontaktpunkter</div>');
html = html.replace('<span class="rb-badge warm">Varm</span>\n      </div>', '<span class="rb-badge warm" data-i18n="rb.badge.warm2">Varm</span>\n      </div>');
html = html.replace('✓ &nbsp;2 møter booket i dag via rutingslaget', '<span data-i18n="rb.meetings">✓ &nbsp;2 møter booket i dag via rutingslaget</span>');

// Tagline divider
html = html.replace(
  '<span style="color:var(--cyan);font-weight:700;">Dine ideelle kunder, levert.</span> Hvert kvalifisert signal, hver matchet kobling, hver introduksjon — rutes direkte til deg gjennom vår infrastruktur.',
  '<span id="tagline-p1" data-i18n-html="tagline.p1"><span style="color:var(--cyan);font-weight:700;">Dine ideelle kunder, levert.</span> Hvert kvalifisert signal, hver matchet kobling, hver introduksjon — rutes direkte til deg gjennom vår infrastruktur.</span>'
);
html = html.replace(
  'Vi kobler B2B-beslutningstakere med riktige partnere til rett tid.',
  '<span id="tagline-p2" data-i18n="tagline.p2">Vi kobler B2B-beslutningstakere med riktige partnere til rett tid.</span>'
);

// Process
html = html.replace('<div class="label rv"><span class="dot"></span>Prosessen</div>', '<div class="label rv" data-i18n-html="prosess.label"><span class="dot"></span>Prosessen</div>');
html = html.replace('<h2 class="h-lg rv d1">Fra signal til signert.<br>Fire steg. Fullt automatisert.</h2>', '<h2 class="h-lg rv d1" data-i18n-html="prosess.h2">Fra signal til signert.<br>Fire steg. Fullt automatisert.</h2>');
html = html.replace('<div class="ps-title">Signaldeteksjon</div>', '<div class="ps-title" data-i18n="prosess.step1.title">Signaldeteksjon</div>');
html = html.replace('<div class="ps-desc">Vi overvåker kontinuerlig kjøpsintensjon, engasjement og adferdssignaler på tvers av kanaler.</div>', '<div class="ps-desc" data-i18n="prosess.step1.desc">Vi overvåker kontinuerlig kjøpsintensjon, engasjement og adferdssignaler på tvers av kanaler.</div>');
html = html.replace('<div class="ps-title">ICP-matching</div>', '<div class="ps-title" data-i18n="prosess.step2.title">ICP-matching</div>');
html = html.replace('<div class="ps-desc">Signalene matches mot din ideelle kundeprofil. Bare høysamsvarende muligheter går videre.</div>', '<div class="ps-desc" data-i18n="prosess.step2.desc">Signalene matches mot din ideelle kundeprofil. Bare høysamsvarende muligheter går videre.</div>');
html = html.replace('<div class="ps-title">Varm routing</div>', '<div class="ps-title" data-i18n="prosess.step3.title">Varm routing</div>');
html = html.replace('<div class="ps-desc">Kvalifiserte muligheter rutes direkte til deg via personalisert, varm introduksjon — ingen kald kontakt.</div>', '<div class="ps-desc" data-i18n="prosess.step3.desc">Kvalifiserte muligheter rutes direkte til deg via personalisert, varm introduksjon — ingen kald kontakt.</div>');
html = html.replace('<div class="ps-title">Tilkobling gjort</div>', '<div class="ps-title" data-i18n="prosess.step4.title">Tilkobling gjort</div>');
html = html.replace('<div class="ps-desc">Møtet er booket, kontekst er levert. Du tar over der det teller — i selve samtalen.</div>', '<div class="ps-desc" data-i18n="prosess.step4.desc">Møtet er booket, kontekst er levert. Du tar over der det teller — i selve samtalen.</div>');

// Demo section
html = html.replace('<div class="label rv" style="background:rgba(0,229,255,.1);border-color:rgba(0,229,255,.35);color:var(--cyan);"><span class="dot"></span>Se det i praksis</div>', '<div class="label rv" style="background:rgba(0,229,255,.1);border-color:rgba(0,229,255,.35);color:var(--cyan);" data-i18n-html="demo.label"><span class="dot"></span>Se det i praksis</div>');
html = html.replace(
  '<h2 class="h-lg rv d1" style="margin-bottom:1rem;">Fra forespørsel til<br><span style="background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">kvalifisert dialog.</span></h2>',
  '<h2 class="h-lg rv d1" style="margin-bottom:1rem;" data-i18n-html="demo.h2">Fra forespørsel til<br><span style="background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">kvalifisert dialog.</span></h2>'
);
html = html.replace(
  '<p class="rv d2" style="color:var(--text);font-size:.9rem;line-height:1.75;">Se vår agentiske infrastruktur kjøre en live prospekteringsekvens.<br><span style="display:inline-flex;gap:1.5rem;margin-top:.4rem;font-size:.8rem;color:var(--muted);letter-spacing:.06em;font-weight:500;"><span>Research</span><span>·</span><span>Enrichment</span><span>·</span><span>Personalisering</span></span></p>',
  '<p class="rv d2" style="color:var(--text);font-size:.9rem;line-height:1.75;"><span data-i18n="demo.sub">Se vår agentiske infrastruktur kjøre en live prospekteringsekvens.</span><br><span style="display:inline-flex;gap:1.5rem;margin-top:.4rem;font-size:.8rem;color:var(--muted);letter-spacing:.06em;font-weight:500;"><span>Research</span><span>·</span><span>Enrichment</span><span>·</span><span data-i18n="demo.personalization">Personalisering</span></span></p>'
);
// Demo flow labels
html = html.replace('<div class="dfs-label">Deep Research</div>', '<div class="dfs-label" data-i18n="demo.flow1.label">Deep Research</div>');
html = html.replace('<div class="dfs-label">Beslutningstaker</div>', '<div class="dfs-label" data-i18n="demo.flow2.label">Beslutningstaker</div>');
html = html.replace('<div class="dfs-label">Kontaktinfo</div>', '<div class="dfs-label" data-i18n="demo.flow3.label">Kontaktinfo</div>');
html = html.replace('<div class="dfs-label">Personalisering</div>', '<div class="dfs-label" data-i18n="demo.flow4.label">Personalisering</div>');
// Demo statuses
html = html.replace('<div class="dfs-status" id="dfs-s1">standby</div>', '<div class="dfs-status" id="dfs-s1" data-i18n="demo.flow.standby">standby</div>');
html = html.replace('<div class="dfs-status" id="dfs-s2">venter</div>', '<div class="dfs-status" id="dfs-s2" data-i18n="demo.flow.waiting">venter</div>');
html = html.replace('<div class="dfs-status" id="dfs-s3">venter</div>', '<div class="dfs-status" id="dfs-s3" data-i18n="demo.flow.waiting2">venter</div>');
html = html.replace('<div class="dfs-status" id="dfs-s4">venter</div>', '<div class="dfs-status" id="dfs-s4" data-i18n="demo.flow.waiting3">venter</div>');
// Phase 0
html = html.replace('<div class="dt-prompt-label">Hva leter du etter?</div>', '<div class="dt-prompt-label" data-i18n="demo.phase0.prompt">Hva leter du etter?</div>');
// Phase 1 title
html = html.replace('<span class="dt-title">Deep Research · Skanneringsmodul</span>', '<span class="dt-title" data-i18n="demo.phase1.title">Deep Research · Skanneringsmodul</span>');
// Phase 2
html = html.replace('<span class="dt-title">Research Resultater · 49 treff</span>', '<span class="dt-title" data-i18n="demo.phase2.title">Research Resultater · 49 treff</span>');
html = html.replace('<span class="dt-result-count">49</span> selskaper matcher kriteriet', '<span class="dt-result-count" data-i18n="demo.phase2.count">49</span> <span data-i18n="demo.phase2.matches">selskaper matcher kriteriet</span>');
// Phase 3
html = html.replace('<span class="dt-title">Enrichment · Beslutningstaker &amp; Kontakt</span>', '<span class="dt-title" data-i18n="demo.phase3.title">Enrichment · Beslutningstaker &amp; Kontakt</span>');
// Phase 4
html = html.replace('<span class="dt-title">Personalisering · Utkast generert ✓</span>', '<span class="dt-title" data-i18n="demo.phase4.title">Personalisering · Utkast generert ✓</span>');
html = html.replace('<div class="dt-msg-label">Personalisert outreach melding:</div>', '<div class="dt-msg-label" data-i18n="demo.phase4.label">Personalisert outreach melding:</div>');
// Disclaimer
html = html.replace('Data i eksempelet er fiktiv grunnet personvern', '<span data-i18n="demo.disclaimer">Data i eksempelet er fiktiv grunnet personvern</span>');
// N8N label
html = html.replace('<div class="n8n-label"><span class="dot"></span>n8n workflow · agentisk pipeline</div>', '<div class="n8n-label" data-i18n-html="demo.n8n.label"><span class="dot"></span>n8n workflow · agentisk pipeline</div>');
// N8N nodes subtitles
html = html.replace('<div class="n8n-node-sub">Omsetning · Ansatte · Signal</div>', '<div class="n8n-node-sub" data-i18n="n8n.icp.sub">Omsetning · Ansatte · Signal</div>');
html = html.replace('<div class="n8n-node-sub">Navn · Tittel · Kontakt</div>', '<div class="n8n-node-sub" data-i18n="n8n.enrich.sub">Navn · Tittel · Kontakt</div>');
html = html.replace('<div class="n8n-node-sub">GPT-4 · Personalisert</div>', '<div class="n8n-node-sub" data-i18n="n8n.ai.sub">GPT-4 · Personalisert</div>');
html = html.replace('<div class="n8n-node-sub">Rådgiver følger opp</div>', '<div class="n8n-node-sub" data-i18n="n8n.human.sub">Rådgiver følger opp</div>');
// Scroll hint
html = html.replace('    Bla for å se hele flyten', '    <span data-i18n="demo.n8n.scroll">Bla for å se hele flyten</span>');
// Infra CTA button
html = html.replace('      Forespør infrastruktur tilgang &nbsp;→\n    </a>\n  </div>\n\n</div><!-- /demo -->', '      <span data-i18n="demo.cta">Forespør infrastruktur tilgang &nbsp;→</span>\n    </a>\n  </div>\n\n</div><!-- /demo -->');

// Hybrid section
html = html.replace('<div class="label rv"><span class="dot"></span>Hybridmodellen</div>', '<div class="label rv" data-i18n-html="hybrid.label"><span class="dot"></span>Hybridmodellen</div>');
html = html.replace('<h2 class="h-lg rv d1" style="margin-bottom:1rem;">Teknologi ruter. <br>Mennesker lukker.</h2>', '<h2 class="h-lg rv d1" style="margin-bottom:1rem;" data-i18n-html="hybrid.h2">Teknologi ruter. <br>Mennesker lukker.</h2>');
html = html.replace(
  '<p class="rv d2" style="color:var(--muted);font-size:.95rem;line-height:1.75;">\n      Vi kombinerer agentisk infrastruktur med dedikerte bedriftsrådgivere — en <em style="color:var(--cyan);font-style:normal;white-space:nowrap;">human-in-the-loop</em> modell der ingen lead faller mellom to stoler.\n    </p>',
  '<p class="rv d2" style="color:var(--muted);font-size:.95rem;line-height:1.75;" data-i18n-html="hybrid.sub">\n      Vi kombinerer agentisk infrastruktur med dedikerte bedriftsrådgivere — en <em style="color:var(--cyan);font-style:normal;white-space:nowrap;">human-in-the-loop</em> modell der ingen lead faller mellom to stoler.\n    </p>'
);
html = html.replace('<div class="hm-side-label">Kjøpere</div>', '<div class="hm-side-label" data-i18n="hybrid.left.label">Kjøpere</div>');
html = html.replace('<span>Kjøpssignaler</span>', '<span data-i18n="hybrid.left.node1">Kjøpssignaler</span>');
html = html.replace('<span>Adferdsmønstre</span>', '<span data-i18n="hybrid.left.node2">Adferdsmønstre</span>');
html = html.replace('<span>Engasjement</span>', '<span data-i18n="hybrid.left.node3">Engasjement</span>');
html = html.replace('<div class="hm-badge hm-badge-infra">Infrastruktur</div>', '<div class="hm-badge hm-badge-infra" data-i18n="hybrid.left.badge">Infrastruktur</div>');
html = html.replace('<div class="hm-step-text">ICP-match &amp; kvalifisering</div>', '<div class="hm-step-text" data-i18n="hybrid.step1">ICP-match &amp; kvalifisering</div>');
html = html.replace('<div class="hm-step-text">Agentisk multi-steg outreach</div>', '<div class="hm-step-text" data-i18n="hybrid.step2">Agentisk multi-steg outreach</div>');
html = html.replace('<div class="hm-step-text">Human-in-the-loop oppfølging</div>', '<div class="hm-step-text" data-i18n="hybrid.step3">Human-in-the-loop oppfølging</div>');
html = html.replace('<div class="hm-side-label">Din bedrift</div>', '<div class="hm-side-label" data-i18n="hybrid.right.label">Din bedrift</div>');
html = html.replace('<span>Personalisert intro</span>', '<span data-i18n="hybrid.right.node1">Personalisert intro</span>');
html = html.replace('<span>Dedikert rådgiver</span>', '<span data-i18n="hybrid.right.node2">Dedikert rådgiver</span>');
html = html.replace('<span>Full kontekst levert</span>', '<span data-i18n="hybrid.right.node3">Full kontekst levert</span>');
html = html.replace('<div class="hm-badge hm-badge-human">Human layer</div>', '<div class="hm-badge hm-badge-human" data-i18n="hybrid.right.badge">Human layer</div>');
// Pillars
html = html.replace('<div class="hm-pillar-title">Signal → Match</div>', '<div class="hm-pillar-title" data-i18n="hybrid.pillar1.title">Signal → Match</div>');
html = html.replace('<p class="hm-pillar-desc">Vår infrastruktur identifiserer kjøpere med aktiv intensjon og matcher dem mot din bedriftsprofil — automatisk og kontinuerlig.</p>', '<p class="hm-pillar-desc" data-i18n="hybrid.pillar1.desc">Vår infrastruktur identifiserer kjøpere med aktiv intensjon og matcher dem mot din bedriftsprofil — automatisk og kontinuerlig.</p>');
html = html.replace('<div class="hm-pillar-title">Agentisk outreach</div>', '<div class="hm-pillar-title" data-i18n="hybrid.pillar2.title">Agentisk outreach</div>');
html = html.replace('<p class="hm-pillar-desc">Skriftlig, personalisert kontakt skjer gjennom en multi-steg sekvens — skreddersydd per lead, skalert av agenter, ikke maler.</p>', '<p class="hm-pillar-desc" data-i18n="hybrid.pillar2.desc">Skriftlig, personalisert kontakt skjer gjennom en multi-steg sekvens — skreddersydd per lead, skalert av agenter, ikke maler.</p>');
html = html.replace('<div class="hm-pillar-title">Dedikert rådgiver</div>', '<div class="hm-pillar-title" data-i18n="hybrid.pillar3.title">Dedikert rådgiver</div>');
html = html.replace('<p class="hm-pillar-desc">En dedikert bedriftsrådgiver med full innsikt i ditt selskap og budskap følger opp, bygger relasjon og sikrer at ingenting faller gjennom.</p>', '<p class="hm-pillar-desc" data-i18n="hybrid.pillar3.desc">En dedikert bedriftsrådgiver med full innsikt i ditt selskap og budskap følger opp, bygger relasjon og sikrer at ingenting faller gjennom.</p>');

// Results
html = html.replace('<div class="label rv"><span class="dot"></span>Resultater</div>', '<div class="label rv" data-i18n-html="results.label"><span class="dot"></span>Resultater</div>');
html = html.replace('<h2 class="h-lg rv d1">Infrastrukturnivå-ytelse.</h2>', '<h2 class="h-lg rv d1" data-i18n="results.h2">Infrastrukturnivå-ytelse.</h2>');
html = html.replace('<div class="met-lbl">Flere kvalifiserte dialoger</div>', '<div class="met-lbl" data-i18n="results.met1.lbl">Flere kvalifiserte dialoger</div>');
html = html.replace('<div class="met-desc">Gjennomsnittlig økning i kvalifiserte møter innen 60 dager</div>', '<div class="met-desc" data-i18n="results.met1.desc">Gjennomsnittlig økning i kvalifiserte møter innen 60 dager</div>');
html = html.replace('<div class="met-lbl">Pipeline-vekst</div>', '<div class="met-lbl" data-i18n="results.met2.lbl">Pipeline-vekst</div>');
html = html.replace('<div class="met-desc">Gjennomsnittlig økning i pipeline-verdi for våre kunder</div>', '<div class="met-desc" data-i18n="results.met2.desc">Gjennomsnittlig økning i pipeline-verdi for våre kunder</div>');
html = html.replace('<div class="met-lbl">Til første tilkobling</div>', '<div class="met-lbl" data-i18n="results.met3.lbl">Til første tilkobling</div>');
html = html.replace('<div class="met-desc">Fra onboarding til ditt første varme møte</div>', '<div class="met-desc" data-i18n="results.met3.desc">Fra onboarding til ditt første varme møte</div>');
html = html.replace('<div class="met-lbl">B2B-bedrifter koblet</div>', '<div class="met-lbl" data-i18n="results.met4.lbl">B2B-bedrifter koblet</div>');
html = html.replace('<div class="met-desc">På tvers av konsulentvirksomhet, faglige og teknologiske tjenester</div>', '<div class="met-desc" data-i18n="results.met4.desc">På tvers av konsulentvirksomhet, faglige og teknologiske tjenester</div>');

// Old vs New
html = html.replace('<div class="label rv label-strong"><span class="dot"></span>Tradisjonelle metoder vs. rutingsinfrastruktur</div>', '<div class="label rv label-strong" data-i18n-html="skiftet.label"><span class="dot"></span>Tradisjonelle metoder vs. rutingsinfrastruktur</div>');
html = html.replace('<h2 class="h-lg rv d1">Tradisjonell måte vs<br><span class="cyan-strong">proprietær agentisk infrastruktur</span></h2>', '<h2 class="h-lg rv d1" data-i18n-html="skiftet.h2">Tradisjonell måte vs<br><span class="cyan-strong">proprietær agentisk infrastruktur</span></h2>');
html = html.replace('<p class="body rv d2" style="max-width:100%;margin:0 auto;">Tradisjonelle metoder gjør at du må søke. Infrastruktur bringer dem til deg.</p>', '<p class="body rv d2" style="max-width:100%;margin:0 auto;" data-i18n="skiftet.sub">Tradisjonelle metoder gjør at du må søke. Infrastruktur bringer dem til deg.</p>');
html = html.replace('<div class="on-t">Tradisjonelle metoder</div>', '<div class="on-t" data-i18n="skiftet.old.title">Tradisjonelle metoder</div>');
html = html.replace('<div class="on-sub">Manuell outreach og søking</div>', '<div class="on-sub" data-i18n="skiftet.old.sub">Manuell outreach og søking</div>');
html = html.replace('<div class="on-item">Søk etter prospekter</div>', '<div class="on-item" data-i18n="skiftet.old.item1">Søk etter prospekter</div>');
html = html.replace('<div class="on-item">Kjør kampanjer</div>', '<div class="on-item" data-i18n="skiftet.old.item2">Kjør kampanjer</div>');
html = html.replace('<div class="on-item">Ansett team for å prospektere</div>', '<div class="on-item" data-i18n="skiftet.old.item3">Ansett team for å prospektere</div>');
html = html.replace('<div class="on-item">Betal per kontakt</div>', '<div class="on-item" data-i18n="skiftet.old.item4">Betal per kontakt</div>');
html = html.replace('<div class="on-item">Jag samtaler</div>', '<div class="on-item" data-i18n="skiftet.old.item5">Jag samtaler</div>');
html = html.replace('<div class="on-item">Håp på å bli oppdaget</div>', '<div class="on-item" data-i18n="skiftet.old.item6">Håp på å bli oppdaget</div>');
html = html.replace('<span class="on-lvl-l">Driftsnivå</span>\n        <span class="on-lvl-v">Individuelt</span>', '<span class="on-lvl-l" data-i18n="skiftet.foot.label">Driftsnivå</span>\n        <span class="on-lvl-v" data-i18n="skiftet.old.foot.val">Individuelt</span>');
html = html.replace('<div class="on-sub">Rutingsinfrastruktur</div>', '<div class="on-sub" data-i18n="skiftet.new.sub">Rutingsinfrastruktur</div>');
html = html.replace('<div class="on-item a">Prospekter rutes til deg</div>', '<div class="on-item a" data-i18n="skiftet.new.item1">Prospekter rutes til deg</div>');
html = html.replace('<div class="on-item a">Introduksjoner flyter automatisk</div>', '<div class="on-item a" data-i18n="skiftet.new.item2">Introduksjoner flyter automatisk</div>');
html = html.replace('<div class="on-item a">Infrastruktur håndterer rutingen</div>', '<div class="on-item a" data-i18n="skiftet.new.item3">Infrastruktur håndterer rutingen</div>');
html = html.replace('<div class="on-item a">Betal for infrastrukturtilgang</div>', '<div class="on-item a" data-i18n="skiftet.new.item4">Betal for infrastrukturtilgang</div>');
html = html.replace('<div class="on-item a">Signalbaserte prospekter blir kontaktet på vegne av deg</div>', '<div class="on-item a" data-i18n="skiftet.new.item5">Signalbaserte prospekter blir kontaktet på vegne av deg</div>');
html = html.replace('<div class="on-item a">ICP med kjøpssignal og dialog avholdt blir servert til deg</div>', '<div class="on-item a" data-i18n="skiftet.new.item6">ICP med kjøpssignal og dialog avholdt blir servert til deg</div>');
html = html.replace('<span class="on-lvl-l">Driftsnivå</span>\n        <span class="on-lvl-v a">Systemer</span>', '<span class="on-lvl-l" data-i18n="skiftet.foot.label">Driftsnivå</span>\n        <span class="on-lvl-v a" data-i18n="skiftet.new.foot.val">Systemer</span>');
// Funnel
html = html.replace('<span class="viz-badge t">Tradisjonell tilnærming</span>', '<span class="viz-badge t" data-i18n="viz.trad.badge">Tradisjonell tilnærming</span>');
html = html.replace('<span class="vf-lbl">Selskaper kontaktet</span>\n            <span class="vf-num t">500</span>', '<span class="vf-lbl" data-i18n="viz.trad.bar1">Selskaper kontaktet</span>\n            <span class="vf-num t">500</span>');
html = html.replace('<span class="vf-lbl" style="font-size:.72rem">Interesserte</span>', '<span class="vf-lbl" style="font-size:.72rem" data-i18n="viz.trad.bar2">Interesserte</span>');
html = html.replace('<span class="vf-lbl" style="font-size:.72rem">Kvalifisert intro</span>', '<span class="vf-lbl" style="font-size:.72rem" data-i18n="viz.trad.bar3">Kvalifisert intro</span>');
html = html.replace('<div class="viz-rate-lbl">Konverteringsrate &nbsp;·&nbsp; Spray &amp; Pray</div>', '<div class="viz-rate-lbl" data-i18n="viz.trad.rate.lbl">Konverteringsrate &nbsp;·&nbsp; Spray &amp; Pray</div>');
html = html.replace('<span class="viz-badge o">OptiControl Signal-ruting</span>', '<span class="viz-badge o" data-i18n="viz.opti.badge">OptiControl Signal-ruting</span>');
html = html.replace('<span class="vf-lbl">Signaldeteksjon (daglig)</span>', '<span class="vf-lbl" data-i18n="viz.opti.bar1">Signaldeteksjon (daglig)</span>');
html = html.replace('<span class="vf-lbl">ICP-matching</span>', '<span class="vf-lbl" data-i18n="viz.opti.bar2">ICP-matching</span>');
html = html.replace('<span class="vf-lbl">Selskaper kontaktet</span>\n            <span class="vf-num o">15</span>', '<span class="vf-lbl" data-i18n="viz.opti.bar3">Selskaper kontaktet</span>\n            <span class="vf-num o">15</span>');
html = html.replace('<span class="vf-lbl" style="font-size:.72rem">Kvalifiserte intro.</span>', '<span class="vf-lbl" style="font-size:.72rem" data-i18n="viz.opti.bar4">Kvalifiserte intro.</span>');
html = html.replace('<div class="viz-rate-lbl">Konverteringsrate &nbsp;·&nbsp; Presisjonsruting</div>', '<div class="viz-rate-lbl" data-i18n="viz.opti.rate.lbl">Konverteringsrate &nbsp;·&nbsp; Presisjonsruting</div>');
html = html.replace('<div class="viz-tagline">Vi selger ikke. Vi ruter kvalitet.</div>', '<div class="viz-tagline" data-i18n="viz.tagline">Vi selger ikke. Vi ruter kvalitet.</div>');
// Fundamental shift
html = html.replace('<div class="fund-lbl fund-lbl-strong">Det fundamentale skiftet</div>', '<div class="fund-lbl fund-lbl-strong" data-i18n="fund.label">Det fundamentale skiftet</div>');
html = html.replace(
  '<p>Banker forenkler ikke transaksjoner — de ruter kapital. Teleselskaper kobler ikke samtaler — de ruter data. B2B-bedrifter søker ikke etter sin ICP — <span class="icp-highlight">deres ICP rutes gjennom dem.</span></p>',
  '<p data-i18n-html="fund.text">Banker forenkler ikke transaksjoner — de ruter kapital. Teleselskaper kobler ikke samtaler — de ruter data. B2B-bedrifter søker ikke etter sin ICP — <span class="icp-highlight">deres ICP rutes gjennom dem.</span></p>'
);

// Network section
html = html.replace('<div class="label rv"><span class="dot"></span>Nettverksarkitektur</div>', '<div class="label rv" data-i18n-html="network.label"><span class="dot"></span>Nettverksarkitektur</div>');
html = html.replace('<h2 class="h-lg rv d1">To-sidig rutingsnettverk</h2>', '<h2 class="h-lg rv d1" data-i18n="network.h2">To-sidig rutingsnettverk</h2>');
html = html.replace('<p class="body rv d2" style="text-align:center;max-width:100%;">ICP kompatible selskaper kobles via rutingslaget. Inkompatible signaler filtreres ved kanten.</p>', '<p class="body rv d2" style="text-align:center;max-width:100%;" data-i18n="network.sub">ICP kompatible selskaper kobles via rutingslaget. Inkompatible signaler filtreres ved kanten.</p>');
html = html.replace('<div class="net-col-title">Kjøpssignaler</div>', '<div class="net-col-title" data-i18n="network.left.title">Kjøpssignaler</div>');
html = html.replace('<div class="net-col-sub">Innkommende signalkilder</div>', '<div class="net-col-sub" data-i18n="network.left.sub">Innkommende signalkilder</div>');
html = html.replace('<div class="net-node-name">Enterprise-kjøpere</div><div class="net-node-desc">Aktiv forespørsel</div>', '<div class="net-node-name" data-i18n="network.left.n1.name">Enterprise-kjøpere</div><div class="net-node-desc" data-i18n="network.left.n1.desc">Aktiv forespørsel</div>');
html = html.replace('<div class="net-node-name">Vekstfase</div><div class="net-node-desc">Budsjett godkjent</div>', '<div class="net-node-name" data-i18n="network.left.n2.name">Vekstfase</div><div class="net-node-desc" data-i18n="network.left.n2.desc">Budsjett godkjent</div>');
html = html.replace('<div class="net-node-name">Strategiske partnere</div><div class="net-node-desc">Kvalifisert intensjon</div>', '<div class="net-node-name" data-i18n="network.left.n3.name">Strategiske partnere</div><div class="net-node-desc" data-i18n="network.left.n3.desc">Kvalifisert intensjon</div>');
html = html.replace('<div class="net-node-name">Tidlig fase</div><div class="net-node-desc">Utforskende</div>', '<div class="net-node-name" data-i18n="network.left.n4.name">Tidlig fase</div><div class="net-node-desc" data-i18n="network.left.n4.desc">Utforskende</div>');
html = html.replace('<div class="net-routing-label">RUTINGSLAGET</div>', '<div class="net-routing-label" data-i18n="network.routing.label">RUTINGSLAGET</div>');
html = html.replace('<div class="net-routing-sub">Match · Filtrer · Rut</div>', '<div class="net-routing-sub" data-i18n="network.routing.sub">Match · Filtrer · Rut</div>');
html = html.replace('<div class="net-routing-stat"><strong>87 %</strong> av signaler<br>kvalifiserer for ruting</div>', '<div class="net-routing-stat" data-i18n-html="network.routing.stat"><strong>87 %</strong> av signaler<br>kvalifiserer for ruting</div>');
html = html.replace('<div class="net-col-title">Leverandør - signaler</div>', '<div class="net-col-title" data-i18n="network.right.title">Leverandør - signaler</div>');
html = html.replace('<div class="net-col-sub">Destinasjons-endepunkter</div>', '<div class="net-col-sub" data-i18n="network.right.sub">Destinasjons-endepunkter</div>');
html = html.replace('<div class="net-node-name">Løsningsleverandører</div><div class="net-node-desc">Høyt volum</div>', '<div class="net-node-name" data-i18n="network.right.n1.name">Løsningsleverandører</div><div class="net-node-desc" data-i18n="network.right.n1.desc">Høyt volum</div>');
html = html.replace('<div class="net-node-name">Tjenestepartnere</div><div class="net-node-desc">Mid-Market fokus</div>', '<div class="net-node-name" data-i18n="network.right.n2.name">Tjenestepartnere</div><div class="net-node-desc" data-i18n="network.right.n2.desc">Mid-Market fokus</div>');
html = html.replace('<div class="net-node-name">Enterprise-leverandører</div><div class="net-node-desc">Kun strategisk</div>', '<div class="net-node-name" data-i18n="network.right.n3.name">Enterprise-leverandører</div><div class="net-node-desc" data-i18n="network.right.n3.desc">Kun strategisk</div>');
html = html.replace('<div class="net-node-name">Tidlige leverandører</div><div class="net-node-desc">Uverifisert</div>', '<div class="net-node-name" data-i18n="network.right.n4.name">Tidlige leverandører</div><div class="net-node-desc" data-i18n="network.right.n4.desc">Uverifisert</div>');
html = html.replace('<p>Nettverkseffekter forsterkes ettersom nodetetthet øker. Hver kompatibel kobling styrker rutingslaget. Inkompatible signaler avvises før de bruker systemressurser.</p>', '<p data-i18n="network.footer">Nettverkseffekter forsterkes ettersom nodetetthet øker. Hver kompatibel kobling styrker rutingslaget. Inkompatible signaler avvises før de bruker systemressurser.</p>');

// Connector section
html = html.replace('<div class="label rv"><span class="dot"></span>Hva gjør oss unike</div>', '<div class="label rv" data-i18n-html="conn.label"><span class="dot"></span>Hva gjør oss unike</div>');
html = html.replace(
  '<h2 class="h-lg rv d1" style="font-size:clamp(1.8rem,3vw,2.6rem);">\n          Vi selger ikke,<br><span class="cyan-strong">vi ruter interesse og behov.</span>\n        </h2>',
  '<h2 class="h-lg rv d1" style="font-size:clamp(1.8rem,3vw,2.6rem);" data-i18n-html="conn.h2">\n          Vi selger ikke,<br><span class="cyan-strong">vi ruter interesse og behov.</span>\n        </h2>'
);
html = html.replace('<p class="body rv d2">De fleste jager. De pitcher. De ber om tid. Vi gjør ingen av delene. Vi registrerer kjøpsbehov, matcher det med riktig aktør (deg), og kontrollerer når dere møtes — basert på klare signaler og vår tilknytning som refererer deg direkte inn.</p>', '<p class="body rv d2" data-i18n="conn.body1">De fleste jager. De pitcher. De ber om tid. Vi gjør ingen av delene. Vi registrerer kjøpsbehov, matcher det med riktig aktør (deg), og kontrollerer når dere møtes — basert på klare signaler og vår tilknytning som refererer deg direkte inn.</p>');
html = html.replace(
  '<p class="body rv d2">Vi er ikke selgere. Vi er ikke møtebookere. Vi er koblere som ruter interesserte parter til hverandre — varmt, presist og på riktig tidspunkt. <span class="cyan-strong">Gjennom vår proprietære agentiske infrastruktur.</span></p>',
  '<p class="body rv d2" data-i18n-html="conn.body2">Vi er ikke selgere. Vi er ikke møtebookere. Vi er koblere som ruter interesserte parter til hverandre — varmt, presist og på riktig tidspunkt. <span class="cyan-strong">Gjennom vår proprietære agentiske infrastruktur.</span></p>'
);
html = html.replace('<p>«En connector selger ikke. En connector ruter. Salget skjer fordi matchen allerede var der — vi bare kontrollerte når de møttes.»</p>', '<p data-i18n="conn.quote">«En connector selger ikke. En connector ruter. Salget skjer fordi matchen allerede var der — vi bare kontrollerte når de møttes.»</p>');
html = html.replace('<span class="conn-title">Uten OptiControl</span>', '<span class="conn-title" data-i18n="conn.without.title">Uten OptiControl</span>');
html = html.replace('<p>Ingen signaler. Ingen matching. Du gjetter hvem som trenger hva. Du har kontakter — ikke matches. Kald outreach gir deg data, ikke timing. Ingenting kobler reell etterspørsel til riktig tilbud. Ingenting.</p>', '<p data-i18n="conn.without.text">Ingen signaler. Ingen matching. Du gjetter hvem som trenger hva. Du har kontakter — ikke matches. Kald outreach gir deg data, ikke timing. Ingenting kobler reell etterspørsel til riktig tilbud. Ingenting.</p>');
html = html.replace('<span class="conn-title">Med OptiControl</span>', '<span class="conn-title" data-i18n="conn.with.title">Med OptiControl</span>');
html = html.replace('<p>Signaler flyter inn via vår proprietære infrastruktur. Systemet matcher etterspørsel mot riktig tilbud. Du ser hvem som trenger hva — og hvem som kan levere. Vi ruter introduksjonen varmt. Én tilkobling. Det er det.</p>', '<p data-i18n="conn.with.text">Signaler flyter inn via vår proprietære infrastruktur. Systemet matcher etterspørsel mot riktig tilbud. Du ser hvem som trenger hva — og hvem som kan levere. Vi ruter introduksjonen varmt. Én tilkobling. Det er det.</p>');

// Infra section
html = html.replace('<div class="label label-strong rv" style="justify-content:center;"><span class="dot"></span>Bli en del av nettverket</div>', '<div class="label label-strong rv" style="justify-content:center;" data-i18n-html="infra.label"><span class="dot"></span>Bli en del av nettverket</div>');
html = html.replace('<h2 class="h-lg rv d1">Tilgang til rutingslaget</h2>', '<h2 class="h-lg rv d1" data-i18n="infra.h2">Tilgang til rutingslaget</h2>');
html = html.replace('<p class="body rv d2" style="max-width:100%;text-align:center;margin:0 auto;">Nettverkskapasiteten er kontrollert for å opprettholde signalkvalitet og rutingshastighet.</p>', '<p class="body rv d2" style="max-width:100%;text-align:center;margin:0 auto;" data-i18n="infra.sub">Nettverkskapasiteten er kontrollert for å opprettholde signalkvalitet og rutingshastighet.</p>');
html = html.replace('<div class="rs-lbl">Gjennomsnittlig kvalifiseringsrate</div>', '<div class="rs-lbl" data-i18n="infra.stat1.lbl">Gjennomsnittlig kvalifiseringsrate</div>');
html = html.replace('<div class="rs-lbl">Aktive agentiske arbeidsflyter</div>', '<div class="rs-lbl" data-i18n="infra.stat2.lbl">Aktive agentiske arbeidsflyter</div>');
html = html.replace('<div class="rs-lbl">Aktive ruter <span style="font-size:.85em;font-weight:400;opacity:.7">(internasjonalt)</span></div>', '<div class="rs-lbl" data-i18n-html="infra.stat3.lbl">Aktive ruter <span style="font-size:.85em;font-weight:400;opacity:.7">(internasjonalt)</span></div>');
html = html.replace('<div class="prop-ttl">Nettverkstilgang er kontrollert.</div>', '<div class="prop-ttl" data-i18n="infra.prop.title">Nettverkstilgang er kontrollert.</div>');
html = html.replace('<p>OptiControl er ikke et verktøy du kjøper — det er en proprietær infrastruktur vi har bygget for å oppdage, score og rute kjøpsinteresse i B2B-markedet. Vi har vårt eget system som kontinuerlig overvåker og analyserer signaler på tvers av plattformer, nettverk og kanaler. Vi finner ikke muligheter tilfeldig — vi ruter dem presist.</p>', '<p data-i18n="infra.prop.p1">OptiControl er ikke et verktøy du kjøper — det er en proprietær infrastruktur vi har bygget for å oppdage, score og rute kjøpsinteresse i B2B-markedet. Vi har vårt eget system som kontinuerlig overvåker og analyserer signaler på tvers av plattformer, nettverk og kanaler. Vi finner ikke muligheter tilfeldig — vi ruter dem presist.</p>');
html = html.replace('<p>Vi opprettholder strenge kvalifikasjonsstandarder for å beskytte rutingsintegriteten. Både etterspørsels- og tilbudsnoder må møte nettverkets kompatibilitetskrav. Hvis signalene dine er tydelige og intensjonen er klar — be om tilgang til rutingslaget.</p>', '<p data-i18n="infra.prop.p2">Vi opprettholder strenge kvalifikasjonsstandarder for å beskytte rutingsintegriteten. Både etterspørsels- og tilbudsnoder må møte nettverkets kompatibilitetskrav. Hvis signalene dine er tydelige og intensjonen er klar — be om tilgang til rutingslaget.</p>');

// CTA section
html = html.replace('<div class="label rv" style="justify-content:center;"><span class="dot"></span>Kom i gang</div>', '<div class="label rv" style="justify-content:center;" data-i18n-html="cta.label"><span class="dot"></span>Kom i gang</div>');
html = html.replace('<h2 class="h-lg rv d1" style="font-size:clamp(2.2rem,4vw,3.2rem);">\n      Klar til å motta varme<br>muligheter — <span class="gt">ikke støy?</span>\n    </h2>', '<h2 class="h-lg rv d1" style="font-size:clamp(2.2rem,4vw,3.2rem);" data-i18n-html="cta.h2">\n      Klar til å motta varme<br>muligheter — <span class="gt">ikke støy?</span>\n    </h2>');
html = html.replace('<p class="cta-sub rv d2">Book en gratis 30-minutters strategisamtale. Vi kartlegger din ICP, viser deg nøyaktig hvilke signaler vi overvåker i ditt marked, og gir deg en live demo av rutingslaget.</p>', '<p class="cta-sub rv d2" data-i18n="cta.sub">Book en gratis 30-minutters strategisamtale. Vi kartlegger din ICP, viser deg nøyaktig hvilke signaler vi overvåker i ditt marked, og gir deg en live demo av rutingslaget.</p>');
html = html.replace('class="btn-p" style="padding:.85rem 2rem;font-size:.95rem;">Forespør infrastruktur tilgang →</a>', 'class="btn-p" style="padding:.85rem 2rem;font-size:.95rem;" data-i18n="cta.btn">Forespør infrastruktur tilgang →</a>');
html = html.replace('<p class="rv d4" style="font-size:.74rem;color:var(--dim);margin-top:1rem;">Ingen forpliktelse. Ingen salgspresjon. Bare en klar plan for veksten din.</p>', '<p class="rv d4" style="font-size:.74rem;color:var(--dim);margin-top:1rem;" data-i18n="cta.disclaimer">Ingen forpliktelse. Ingen salgspresjon. Bare en klar plan for veksten din.</p>');

// Team section
html = html.replace('<div class="label rv" style="justify-content:center;"><span class="dot"></span>Teamet bak</div>', '<div class="label rv" style="justify-content:center;" data-i18n-html="team.label"><span class="dot"></span>Teamet bak</div>');
html = html.replace('<h2 class="h-lg rv d1" style="margin-bottom:.5rem;">Menneskene som ruter.</h2>', '<h2 class="h-lg rv d1" style="margin-bottom:.5rem;" data-i18n="team.h2">Menneskene som ruter.</h2>');
html = html.replace('<p class="body rv d2" style="max-width:480px;margin:0 auto;text-align:center;">Teknologi og erfaring i ett — vi bygger infrastrukturen og følger opp personlig.</p>', '<p class="body rv d2" style="max-width:480px;margin:0 auto;text-align:center;" data-i18n="team.sub">Teknologi og erfaring i ett — vi bygger infrastrukturen og følger opp personlig.</p>');
// Team contact labels - there are 4 (phone+email for each person)
html = html.replace(/<div class="team-contact-label">Telefon<\/div>/g, '<div class="team-contact-label" data-i18n="team.contact.phone">Telefon</div>');
html = html.replace(/<div class="team-contact-label">Email<\/div>/g, '<div class="team-contact-label" data-i18n="team.contact.email">Email</div>');
// LinkedIn buttons - two of them
html = html.replace(/<a href="#" class="team-linkedin">/g, '<a href="#" class="team-linkedin" data-i18n-html="team.linkedin.btn">');
html = html.replace(/>\s*Min LinkedIn Profil\s*<\/a>/g, '>Min LinkedIn Profil</a>');

// Footer
html = html.replace('<p class="foot-desc">Norges ledende leverandør av AI-drevne salgsløsninger. Vi hjelper B2B bedrifter øke salg og automatisere prosesser med kunstlig intelligens og menneskelig oppfølging.</p>', '<p class="foot-desc" data-i18n="footer.desc">Norges ledende leverandør av AI-drevne salgsløsninger. Vi hjelper B2B bedrifter øke salg og automatisere prosesser med kunstlig intelligens og menneskelig oppfølging.</p>');
html = html.replace('<span class="foot-badge">AI Salgseksperter</span>', '<span class="foot-badge" data-i18n="footer.badge1">AI Salgseksperter</span>');
html = html.replace('<span class="foot-badge">Norsk Eid</span>', '<span class="foot-badge" data-i18n="footer.badge2">Norsk Eid</span>');
html = html.replace('<div class="foot-col-title">Kontakt Oss</div>', '<div class="foot-col-title" data-i18n="footer.col2.title">Kontakt Oss</div>');
html = html.replace('<div class="foot-contact-sub">Mandag – Fredag, 09:00–17:00</div>', '<div class="foot-contact-sub" data-i18n="footer.phone.hours">Mandag – Fredag, 09:00–17:00</div>');
html = html.replace('<div class="foot-contact-sub">Svar innen 2 timer</div>', '<div class="foot-contact-sub" data-i18n="footer.email.sub">Svar innen 2 timer</div>');
html = html.replace('<div class="foot-contact-val">Strømsø Torg 4, Drammen</div>', '<div class="foot-contact-val" data-i18n="footer.address">Strømsø Torg 4, Drammen</div>');
html = html.replace('<div class="foot-contact-sub">Møter etter avtale</div>', '<div class="foot-contact-sub" data-i18n="footer.address.sub">Møter etter avtale</div>');
html = html.replace('<div class="foot-col-title">Klar for å Starte?</div>', '<div class="foot-col-title" data-i18n="footer.col3.title">Klar for å Starte?</div>');
html = html.replace('<p class="foot-desc" style="margin-bottom:1.5rem;">Book en gratis strategisamtale og få personlige anbefalinger for din bedrift.</p>', '<p class="foot-desc" style="margin-bottom:1.5rem;" data-i18n="footer.col3.sub">Book en gratis strategisamtale og få personlige anbefalinger for din bedrift.</p>');
html = html.replace('        Book Gratis Strategisamtale\n      </a>', '        <span data-i18n="footer.btn.primary">Book Gratis Strategisamtale</span>\n      </a>');
html = html.replace('        Følg oss på LinkedIn\n      </a>', '        <span data-i18n="footer.btn.secondary">Følg oss på LinkedIn</span>\n      </a>');
html = html.replace('<p class="f-copy">© 2026 OptiControl. Alle rettigheter forbeholdt.</p>', '<p class="f-copy" data-i18n="footer.copyright">© 2026 OptiControl. Alle rettigheter forbeholdt.</p>');
html = html.replace('<li><a href="#">Personvern</a></li>', '<li><a href="#" data-i18n="footer.link.privacy">Personvern</a></li>');
html = html.replace('<li><a href="#">Vilkår</a></li>', '<li><a href="#" data-i18n="footer.link.terms">Vilkår</a></li>');

console.log('All data-i18n attributes added.');
console.log('Checking for any failed replacements...');

// Quick sanity check
const checks = [
  ['nav-cta', html.includes('id="nav-cta"')],
  ['lang-switcher', html.includes('id="lang-switcher"')],
  ['hero.badge', html.includes('data-i18n-html="hero.badge"')],
  ['hero.h1', html.includes('data-i18n="hero.h1"')],
  ['prosess.h2', html.includes('data-i18n-html="prosess.h2"')],
  ['hybrid.h2', html.includes('data-i18n-html="hybrid.h2"')],
  ['cta.btn', html.includes('data-i18n="cta.btn"')],
  ['footer.copyright', html.includes('data-i18n="footer.copyright"')],
];
checks.forEach(([name, ok]) => console.log(`  ${ok ? '✓' : '✗'} ${name}`));

writeFileSync('/Users/ceoshala/Documents/Claude Code/Website Building/OptiControl/index-v2.html', html);
console.log('Written to index-v2.html');
