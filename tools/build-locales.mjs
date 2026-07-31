import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = path.resolve(import.meta.dirname, '..');
const cacheFile = path.join(import.meta.dirname, 'translations.json');
async function discoverSourceFiles(directory = projectRoot, prefix = '') {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ['.git', 'assets', 'en', 'ru', 'tools', 'node_modules'].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await discoverSourceFiles(absolute, relative));
    else if (entry.name.endsWith('.html')) files.push(relative);
  }
  return files.sort();
}

const sourceFiles = await discoverSourceFiles();

const localeNames = {
  en: 'English',
  ru: 'Russian'
};

const manual = {
  en: {
    'Bomond': 'Bomond',
    'Bomond.': 'Bomond.',
    'Bomond, Port Mall': 'Bomond, Port Mall',
    'Bomond · Port Mall': 'Bomond · Port Mall',
    'Imona Grup': 'Imona Grup',
    'IMONA GRUP': 'IMONA GRUP',
    'Botanica.': 'Botanica.',
    'Rol Condr Grup': 'Condr Grup role',
    'An': 'Year',
    'Turnare + elicopterizare': 'Concrete pour + power-trowel finish',
    'Fotografii din execuție': 'Photos from the worksite',
    'Imagine de identificare a obiectivului; nu reprezintă fotografia execuției Condr Grup.': 'Property identification image; it is not a photograph of Condr Grup’s work.',
    'Imagine de identificare a companiei; nu reprezintă fotografia execuției Condr Grup.': 'Company identification image; it is not a photograph of Condr Grup’s work.',
    'FOTOGRAFIE DIN ARHIVA CONDR GRUP': 'PHOTO FROM THE CONDR GRUP ARCHIVE',
    'FOTOGRAFIE REPREZENTATIVĂ DIN ARHIVA CONDR GRUP': 'REPRESENTATIVE PHOTO FROM THE CONDR GRUP ARCHIVE',
    'width=device-width,initial-scale=1': 'width=device-width,initial-scale=1',
    'Condr Grup — Construcții care rămân în timp': 'Condr Grup — Construction that stands the test of time',
    'Construcții care': 'Construction <wbr>that',
    'rămân în timp.': 'stands the test of time.',
    'Nu promitem simplu.': 'We do not make vague promises.',
    'Construim': 'We build',
    'concret.': 'with precision.',
    'Un proces': 'A process',
    'fără ceață.': 'with complete clarity.',
    'Munca se vede': 'Our work shows',
    'în teren.': 'on site.',
    'Case la cheie': 'Turnkey houses',
    'Case la cheie — Condr Grup': 'Turnkey houses — Condr Grup',
    'Case, oficii și spații comerciale.': 'Homes, offices and commercial spaces.',
    'Drumuri & amenajări': 'Roads & landscaping',
    'Drumuri și amenajări — Condr Grup': 'Roads and landscaping — Condr Grup',
    'Fundații & structuri': 'Foundations & structures',
    'Fundații și structuri — Condr Grup': 'Foundations and structures — Condr Grup',
    'Beton & platforme': 'Concrete & platforms',
    'Beton și platforme — Condr Grup': 'Concrete and platforms — Condr Grup',
    'Renovări': 'Renovations',
    'Renovări — Condr Grup': 'Renovations — Condr Grup',
    'Demolări': 'Demolition',
    'Demolări — Condr Grup': 'Demolition — Condr Grup',
    'Solicită ofertă': 'Request a quote',
    'Solicită o ofertă': 'Request a quote',
    'Trimite cererea': 'Send request',
    'Lasă o recenzie': 'Leave a review',
    'Recenzii autentice': 'Authentic reviews',
    'Recenzii verificate': 'Verified reviews',
    'Ai lucrat cu echipa Condr Grup?': 'Have you worked with the Condr Grup team?',
    'Portofoliu din șantier': 'Portfolio from the jobsite',
    'ARHIVĂ CONDR GRUP': 'CONDR GRUP ARCHIVE',
    'PROIECT PRIVAT': 'PRIVATE PROJECT',
    'Republica Moldova': 'Republic of Moldova',
    'Vatra, Republica Moldova': 'Vatra, Republic of Moldova',
    'Vatra, Alexandru cel Bun 17A': 'Vatra, 17A Alexandru cel Bun Street',
    'str. Alexandru cel Bun 17A': '17A Alexandru cel Bun Street',
    'Adresă juridică: Alexandru cel Bun 17A, Vatra': 'Registered address: 17A Alexandru cel Bun Street, Vatra',
    'Adresă fizică: Alexandru cel Bun 17A, Vatra': 'Operating address: 17A Alexandru cel Bun Street, Vatra',
    'Cod fiscal / IDNO: 1026023118602': 'Company ID / IDNO: 1026023118602',
    'Păstrarea și ștergerea': 'Retention and deletion',
    'Ultima actualizare: 30 iulie 2026.': 'Last updated: 30 July 2026.'
    ,
    'Vatra': 'Vatra',
    'Bâc': 'Bâc',
    'VATRA · REPUBLICA MOLDOVA': 'VATRA · REPUBLIC OF MOLDOVA',
    'CONDR GRUP S.R.L.': 'CONDR GRUP S.R.L.',
    'Despre Condr Grup': 'About Condr Grup',
    'Cunoaște compania': 'About the company',
    'Lucrări clare pentru proprietari, companii și parteneri de dezvoltare.': 'Clearly defined work for property owners, companies and development partners.',
    'Fiecare proiect începe cu o discuție directă, verificarea condițiilor din teren și definirea exactă a lucrărilor. Rezultatul trebuie să poată fi văzut, măsurat și folosit.': 'Every project starts with a direct discussion, a site assessment and a clear definition of the work. The result must be visible, measurable and fit for purpose.',
    'Ce executăm': 'What we build',
    'De la bază': 'From foundation',
    'la': 'to',
    'rezultat.': 'completion.',
    'Plăci, curți, parcări și pardoseli pentru spații rezidențiale sau industriale.': 'Concrete slabs, yards, parking areas and floors for residential or industrial use.',
    'Pregătire, armare, cofrare și turnare pentru construcții noi sau extinderi.': 'Site preparation, reinforcement, formwork and concrete pouring for new buildings or extensions.',
    'Coordonarea etapelor de la teren și structură până la pregătirea pentru utilizare.': 'Coordination from groundwork and structure through to readiness for use.',
    'Vezi lucrările': 'View projects',
    'Vezi portofoliul': 'View portfolio',
    'Lucrări făcute': 'Completed work',
    'Turnare platformă exterioară': 'Exterior concrete platform',
    'Pardoseală în spațiu industrial': 'Industrial concrete floor',
    'Desfacere controlată a acoperișului': 'Controlled roof demolition',
    'Compartimentare și finisare': 'Partitioning and finishing',
    'Un singur standard vizual.': 'One consistent standard.',
    'Înțelegem lucrarea': 'Understand the scope',
    'Vedem terenul': 'Assess the site',
    'Colectăm locația, scopul, dimensiunile și termenul dorit.': 'We collect the location, purpose, dimensions and target schedule.',
    'Analizăm accesul, condițiile și documentele disponibile.': 'We assess access, site conditions and available documents.',
    'Stabilim lucrările, cantitățile, responsabilitățile și etapele.': 'We define the work, quantities, responsibilities and stages.',
    'Organizăm echipa și urmărim lucrarea până la rezultatul convenit.': 'We organize the team and manage the work through to the agreed result.',
    'Un partener': 'A partner',
    'care': 'that',
    'execută.': 'delivers.',
    'Încrederea se': 'Trust is',
    'construiește.': 'built.',
    'Ai un proiect?': 'Have a project?',
    'Hai să vorbim.': 'Let’s talk.',
    'Hai să discutăm': 'Let’s discuss',
    'proiectul.': 'your project.',
    'Turnare': 'Concrete pouring',
    'Trasare': 'Setting out',
    'Cofraj & armare': 'Formwork & reinforcement',
    'Armare': 'Reinforcement',
    'Beton.': 'Concrete.',
    'Plan. Cofraj.': 'Plan. Formwork.',
    'Coordonăm betonul, accesul și echipa.': 'We coordinate concrete delivery, site access and the crew.',
    'Corelăm lucrarea cu planurile și cotele.': 'We align the work with the drawings and elevations.',
    'Radier și plăci': 'Raft foundations and slabs',
    'Placă armată': 'Reinforced slab',
    'Structură pregătită pentru beton': 'Structure prepared for concrete',
    'Ai proiectul tehnic?': 'Do you have technical drawings?',
    'Îl analizăm pentru': 'We review them for',
    'o discuție de execuție.': 'a construction discussion.',
    'Termen dorit': 'Target schedule',
    'Localitate': 'Location',
    'Persoană fizică': 'Private client',
    'Dezvoltator / antreprenor': 'Developer / contractor',
    'Lucrare': 'Type of work',
    'Sediu': 'Office',
    'Date juridice': 'Company details',
    'Politica de': 'Privacy',
    'confidențialitate.': 'policy.',
    'Contactează-ne': 'Contact us',
    'Scrie pe Viber': 'Message us on Viber',
    'Sună acum': 'Call now',
    'Lucrări': 'Work',
    'în lucru.': 'in progress.',
    'șantier.': 'site.',
    'Suprafața bună': 'A durable surface',
    'începe': 'starts',
    'dedesubt.': 'below the surface.',
    'Beton &': 'Concrete &',
    'platforme.': 'platforms.',
    'Drumuri &': 'Roads &',
    'amenajări.': 'landscaping.',
    'Fundații &': 'Foundations &',
    'structuri.': 'structures.',
    'Renovări organizate.': 'Organized renovations.',
    'Demolări controlate.': 'Controlled demolition.',
    'Aici încă': 'This page',
    'nu am': 'has not been',
    'construit.': 'built yet.',
    'Capacitate': 'Execution capacity',
    'de': ' ',
    'execuție.': 'for demanding projects.',
    'Intrăm în proiect': 'We join the project',
    'cu un rol': 'with a clearly',
    'clar.': 'defined role.',
    'Unde putem': 'Where we can',
    'intra în lucru.': 'support your project.',
    'De la documentație': 'From documentation',
    'până la': 'through to',
    'mobilizare.': 'site mobilization.',
    'Trimite datele': 'Send the project details',
    'pentru analiză.': 'for review.',
    'O companie': 'A company',
    'Claritate înainte.': 'Clarity first.',
    'Ritm': 'Momentum',
    'Lucruri simple.': 'Simple principles.',
    'Ținute constant.': 'Applied consistently.',
    'Un semn simplu.': 'A simple mark.',
    'O direcție solidă.': 'A strong direction.',
    'Spune-ne ce': 'Tell us what',
    'trebuie': 'needs to be',
    'construit.': 'built.',
    'Zece lucrări.': 'Ten real jobsites.',
    'De la armare': 'From reinforcement',
    'suprafață.': 'the finished surface.',
    'Arată-ne situația': 'Show us the actual',
    'din': ' ',
    'teren.': 'site conditions.',
    'Lucrarea trece.': 'The job is completed.',
    'Reputația rămâne.': 'The reputation remains.',
    'Experiențe spuse': 'Real experiences,',
    'direct.': 'shared directly.',
    'Cum a fost': 'How was the',
    'colaborarea?': 'experience?',
    'Control de la suport': 'Control from the sub-base',
    'finisaj.': 'the final finish.',
    'Beton executat': 'Concrete work',
    'Trimite detaliile.': 'Send the details.',
    'Pregătim discuția.': 'We will prepare the next steps.',
    'Case': 'Turnkey',
    'la cheie.': 'homes.',
    'Un singur fir': 'End-to-end',
    'coordonare.': 'coordination.',
    'Decizii înainte': 'Decisions made before',
    'șantier.': 'construction begins.',
    'Avem nevoie': 'What we need',
    'proiect.': 'for your project.',
    'Spune-ne unde': 'Tell us where',
    'te afli': 'the project stands',
    'acum.': 'today.',
    'Uneori proiectul': 'Sometimes a project',
    'începe cu': 'starts by',
    'eliberarea.': 'clearing the space.',
    'Ce trebuie': 'What we need',
    'să': 'to',
    'știm.': 'know.',
    'Intervenții': 'Work carried out',
    'în spații reale.': 'in real spaces.',
    'Trimite fotografii': 'Send photos',
    'și': 'and',
    'locația.': 'the location.',
    'Accesul este parte': 'Access is part',
    'construcție.': 'of the construction.',
    'Apa, sarcina': 'Drainage, loads',
    'nivelul.': 'levels.',
    'Suprafețe pentru': 'Surfaces designed for',
    'folosire reală.': 'real use.',
    'Trimite locația': 'Send the location',
    'dimensiunile.': 'dimensions.',
    'Baza nu se vede.': 'The foundation is not visible.',
    'Dar': 'But',
    'contează.': 'it matters.',
    'Armare și structură': 'Reinforcement and structure',
    'de la bază.': 'from the ground up.',
    'Alege lucrarea': 'Choose the service',
    'de care': ' ',
    'ai nevoie.': 'you need.',
    'Detaliile bune': 'Good details',
    'reduc': 'reduce',
    'surprizele.': 'surprises.',
    'Descrie lucrarea.': 'Describe the project.',
    'Noi clarificăm pașii.': 'We will clarify the next steps.',
    'organizate.': 'managed in clear stages.',
    'Spațiul vechi.': 'The existing space.',
    'Un': 'A',
    'nou început.': 'new beginning.',
    'Întâi descoperim': 'First we identify',
    'ce este': 'what lies',
    'Lucrări reale,': 'Real work,',
    'nu randări.': 'not renderings.',
    'Trimite-le împreună': 'Send them together',
    'cu': 'with',
    'suprafața.': 'the floor area.',
    'Această pagină': 'This page',
    'încă nu este': 'has not been',
    'construită.': 'built yet.',
    'sub finisaj.': 'beneath the finish.',
    'Desfacere și pregătire': 'Dismantling and preparation',
    'Desfaceri interioare': 'Interior dismantling',
    'Sortare și evacuare conform scopului stabilit': 'Sorting and waste removal according to the agreed scope',
    'Modul dorit de evacuare': 'Required waste-removal method',
    'evacuare și pregătirea zonei pentru etapa următoare.': 'waste removal and preparation for the next stage.',
    'Turnare beton armat': 'Reinforced-concrete pouring',
    'Turnare beton la Bâc': 'Concrete pouring in Bâc',
    'Turnare beton Feredeuca': 'Concrete pouring in Feredeuca',
    'Turnarea pardoselii industriale': 'Pouring the industrial concrete floor',
    'Turnare și nivelare suprafață': 'Concrete pouring and surface levelling',
    'Cofrare și armare': 'Formwork and reinforcement',
    'Pregătire, armare, cofrare și turnare.': 'Preparation, reinforcement, formwork and concrete pouring.',
    'Antrepriză generală': 'General contracting',
    'Subantrepriză': 'Subcontracting',
    'Subantrepriză pe proiect': 'Project subcontracting',
    'Subantrepriză pe lucrări definite': 'Subcontracting for a defined scope',
    'Execuție după planuri și cantități': 'Execution according to drawings and quantities',
    'Stabilim comercial': 'Agree commercial terms',
    'Oferta ține cont de acces, condiții, volum și logistică.': 'The quote reflects access, site conditions, volume and logistics.',
    'Pentru o ofertă corectă avem nevoie de locație, dimensiuni, starea terenului sau spațiului și, unde există, planuri ori cantități.': 'For an accurate quote, we need the location, dimensions, condition of the site or space and, where available, drawings or quantities.',
    'Pentru o ofertă serioasă': 'For an accurate quote',
    'Începe discuția': 'Start the discussion',
    'The type of work': 'Type of work',
    'ARHIVĂ REALĂ · BÂC': 'REAL PROJECT ARCHIVE · BÂC',
    'BETON · BÂC': 'CONCRETE · BÂC',
    'Proiecte Condr Grup pentru Port Mall, Bomond, Kaufland, Terra Avia, Imonna Grup și Radisson Blu Leogrand, plus lucrări reale din șantier.': 'Condr Grup projects for Port Mall, Bomond, Kaufland, Terra Avia, Imonna Grup and Radisson Blu Leogrand, plus real jobsite work.',
    'Proiecte de referință': 'Flagship projects',
    'Lucrări pentru': 'Work delivered for',
    'branduri cunoscute.': 'recognized brands.',
    'Condr Grup a executat lucrări pe obiective comerciale, industriale și hoteliere importante din Chișinău. Mai jos prezentăm rolul concret al echipei la fiecare proiect.': 'Condr Grup has delivered work at major commercial, industrial and hospitality properties in Chișinău. Below, we outline the team’s specific role in each project.',
    'FOTOGRAFIE DIN ARHIVA CONDR GRUP': 'PHOTO FROM THE CONDR GRUP ARCHIVE',
    'Lucrări de demolare executate de Condr Grup la Port Mall': 'Demolition work carried out by Condr Grup at Port Mall',
    'PORT': 'PORT',
    'MALL': 'MALL',
    'DEMOLĂRI COMPLETE · 2023–2026': 'COMPLETE DEMOLITION WORKS · 2023–2026',
    'Port Mall': 'Port Mall',
    'Condr Grup a executat întregul pachet de lucrări de demolare pentru intervențiile realizate la Port Mall în perioada 2023–2026.': 'Condr Grup carried out the complete demolition scope for works undertaken at Port Mall between 2023 and 2026.',
    'Lucrări de amenajare executate de Condr Grup în Port Mall': 'Fit-out work carried out by Condr Grup at Port Mall',
    'BOMOND': 'BOMOND',
    'RESTAURANT · AMENAJARE LA CHEIE': 'RESTAURANT · TURNKEY FIT-OUT',
    'Bomond, Port Mall': 'Bomond, Port Mall',
    'Execuția integrală la cheie a restaurantului Bomond din Port Mall, de la lucrările interioare până la pregătirea spațiului pentru utilizare.': 'Complete turnkey fit-out of the Bomond restaurant at Port Mall, from interior construction through to preparing the space for use.',
    'Interiorul unui magazin Kaufland din Chișinău': 'Interior of a Kaufland store in Chișinău',
    'IMAGINE OBIECTIV · KAUFLAND MOLDOVA ↗': 'PROPERTY IMAGE · KAUFLAND MOLDOVA ↗',
    'KAUFLAND': 'KAUFLAND',
    'CONSTRUCȚII · BOTANICA · 2020': 'CONSTRUCTION · BOTANICA · 2020',
    'Kaufland, bd. Decebal': 'Kaufland, Decebal Boulevard',
    'Lucrări de construcție executate în 2020 pentru magazinul Kaufland Botanica de pe bd. Decebal 99/2, în zona bd. Dacia.': 'Construction work carried out in 2020 for the Kaufland Botanica store at 99/2 Decebal Boulevard, near Dacia Boulevard.',
    'Aeronava companiei Terra Avia': 'Terra Avia aircraft',
    'IMAGINE BRAND · WIKIMEDIA COMMONS ↗': 'BRAND IMAGE · WIKIMEDIA COMMONS ↗',
    'TERRA': 'TERRA',
    'AVIA': 'AVIA',
    'REPARAȚIE CAPITALĂ · 2026': 'CAPITAL RENOVATION · 2026',
    'Oficiul Terra Avia': 'Terra Avia office',
    'Lucrări de reparație capitală executate în 2026 în oficiul companiei Terra Avia din Chișinău.': 'Capital renovation work carried out in 2026 at the Terra Avia company office in Chișinău.',
    'Finisarea mecanizată a betonului la Imonna Grup': 'Power-trowel concrete finishing for Imonna Grup',
    'IMONNA GRUP': 'IMONNA GRUP',
    'BETON INDUSTRIAL · FEREDEUCA 4': 'INDUSTRIAL CONCRETE · 4 FEREDEUCA STREET',
    '400 m² pentru Imonna Grup': '400 m² for Imonna Grup',
    'Turnarea a 400 m² de beton și finisarea mecanizată a suprafeței cu elicopterul pe str. Feredeuca 4.': 'Pouring 400 m² of concrete and power-trowel finishing the surface at 4 Feredeuca Street.',
    'Hotelul Radisson Blu Leogrand din Chișinău': 'Radisson Blu Leogrand Hotel in Chișinău',
    'IMAGINE OBIECTIV · SERHIO · CC BY 3.0 ↗': 'PROPERTY IMAGE · SERHIO · CC BY 3.0 ↗',
    'RADISSON': 'RADISSON',
    'BLU': 'BLU',
    'CONSTRUCȚIE HOTELIERĂ · 2016': 'HOSPITALITY CONSTRUCTION · 2016',
    'Radisson Blu Leogrand': 'Radisson Blu Leogrand',
    'Participare la lucrările de construcție ale hotelului Radisson Blu Leogrand din Chișinău în anul 2016.': 'Participation in construction work at the Radisson Blu Leogrand Hotel in Chișinău in 2016.',
    'Și multe alte proiecte comerciale, industriale și rezidențiale, precum și lucrări executate pentru persoane fizice.': 'And many other commercial, industrial and residential projects, as well as work delivered for private clients.',
    'Informațiile despre lucrările executate sunt furnizate de Condr Grup. Imaginile marcate „imagine obiectiv” identifică proprietatea sau brandul și nu reprezintă fotografii din timpul execuției Condr Grup.': 'Information about the completed work is supplied by Condr Grup. Images marked “property image” identify the property or brand and are not photographs taken during Condr Grup’s work.',
    'Arhiva de șantier': 'Jobsite archive',
    'Alte lucrări.': 'More projects.',
    'Același standard.': 'The same standard.',
    'Filtrează după tip pentru a vedea imagini reale din etapele de beton, structură, amenajare, renovare și demolare.': 'Filter by type to see genuine images from concrete, structural, fit-out, renovation and demolition stages.',
    'Adăugăm treptat proiecte și fotografii noi, după confirmarea detaliilor și acordul de publicare.': 'We add new projects and photographs as details are confirmed and publication is approved.'
  },
  ru: {
    'Bomond': 'Bomond',
    'Bomond.': 'Bomond.',
    'Bomond, Port Mall': 'Bomond, Port Mall',
    'Bomond · Port Mall': 'Bomond · Port Mall',
    'Imona Grup': 'Imona Grup',
    'IMONA GRUP': 'IMONA GRUP',
    'Botanica.': 'Botanica.',
    'Rol Condr Grup': 'Роль Condr Grup',
    'An': 'Год',
    'Turnare + elicopterizare': 'Заливка + затирка бетоноотделочной машиной',
    'Fotografii din execuție': 'Фотографии с объекта',
    'Imagine de identificare a obiectivului; nu reprezintă fotografia execuției Condr Grup.': 'Изображение для идентификации объекта; это не фотография работ Condr Grup.',
    'Imagine de identificare a companiei; nu reprezintă fotografia execuției Condr Grup.': 'Изображение для идентификации компании; это не фотография работ Condr Grup.',
    'FOTOGRAFIE DIN ARHIVA CONDR GRUP': 'ФОТО ИЗ АРХИВА CONDR GRUP',
    'FOTOGRAFIE REPREZENTATIVĂ DIN ARHIVA CONDR GRUP': 'РЕПРЕЗЕНТАТИВНОЕ ФОТО ИЗ АРХИВА CONDR GRUP',
    'width=device-width,initial-scale=1': 'width=device-width,initial-scale=1',
    'Condr Grup — Construcții care rămân în timp': 'Condr Grup — Строительство на долгие годы',
    'Construcții care': 'Строительство, <wbr>которое',
    'rămân în timp.': 'служит долгие годы.',
    'Nu promitem simplu.': 'Мы не даём пустых обещаний.',
    'Construim': 'Мы строим',
    'concret.': 'основательно.',
    'Un proces': 'Понятный процесс',
    'fără ceață.': 'без неопределённости.',
    'Munca se vede': 'Результат виден',
    'în teren.': 'на объекте.',
    'Case la cheie': 'Дома под ключ',
    'Case la cheie — Condr Grup': 'Дома под ключ — Condr Grup',
    'Case, oficii și spații comerciale.': 'Дома, офисы и коммерческие помещения.',
    'Drumuri & amenajări': 'Дороги и благоустройство',
    'Drumuri și amenajări — Condr Grup': 'Дороги и благоустройство — Condr Grup',
    'Fundații & structuri': 'Фундаменты и конструкции',
    'Fundații și structuri — Condr Grup': 'Фундаменты и конструкции — Condr Grup',
    'Beton & platforme': 'Бетон и площадки',
    'Beton și platforme — Condr Grup': 'Бетон и площадки — Condr Grup',
    'Renovări': 'Ремонт',
    'Renovări — Condr Grup': 'Ремонт — Condr Grup',
    'Demolări': 'Демонтаж',
    'Demolări — Condr Grup': 'Демонтаж — Condr Grup',
    'Solicită ofertă': 'Запросить смету',
    'Solicită o ofertă': 'Запросить смету',
    'Trimite cererea': 'Отправить заявку',
    'Lasă o recenzie': 'Оставить отзыв',
    'Recenzii autentice': 'Настоящие отзывы',
    'Recenzii verificate': 'Проверенные отзывы',
    'Ai lucrat cu echipa Condr Grup?': 'Вы работали с командой Condr Grup?',
    'Portofoliu din șantier': 'Портфолио с объектов',
    'ARHIVĂ CONDR GRUP': 'АРХИВ CONDR GRUP',
    'PROIECT PRIVAT': 'ЧАСТНЫЙ ПРОЕКТ',
    'Republica Moldova': 'Республика Молдова',
    'Vatra, Republica Moldova': 'Ватра, Республика Молдова',
    'Vatra, Alexandru cel Bun 17A': 'Ватра, ул. Александру чел Бун, 17A',
    'str. Alexandru cel Bun 17A': 'ул. Александру чел Бун, 17A',
    'Adresă juridică: Alexandru cel Bun 17A, Vatra': 'Юридический адрес: Ватра, ул. Александру чел Бун, 17A',
    'Adresă fizică: Alexandru cel Bun 17A, Vatra': 'Фактический адрес: Ватра, ул. Александру чел Бун, 17A',
    'Cod fiscal / IDNO: 1026023118602': 'Фискальный код / IDNO: 1026023118602',
    'Păstrarea și ștergerea': 'Хранение и удаление',
    'Ultima actualizare: 30 iulie 2026.': 'Последнее обновление: 30 июля 2026 г.',
    'Vatra': 'Ватра',
    'Bâc': 'Быч',
    'VATRA · REPUBLICA MOLDOVA': 'ВАТРА · РЕСПУБЛИКА МОЛДОВА',
    'CONDR GRUP S.R.L.': 'CONDR GRUP S.R.L.',
    'Despre Condr Grup': 'О компании Condr Grup',
    'Cunoaște compania': 'О компании',
    'Lucrări clare pentru proprietari, companii și parteneri de dezvoltare.': 'Чётко определённые работы для владельцев, компаний и партнёров-застройщиков.',
    'Fiecare proiect începe cu o discuție directă, verificarea condițiilor din teren și definirea exactă a lucrărilor. Rezultatul trebuie să poată fi văzut, măsurat și folosit.': 'Каждый проект начинается с прямого обсуждения, оценки объекта и точного определения объёма работ. Результат должен быть видимым, измеримым и пригодным для эксплуатации.',
    'Ce executăm': 'Что мы строим',
    'De la bază': 'От основания',
    'la': 'до',
    'rezultat.': 'готового результата.',
    'Plăci, curți, parcări și pardoseli pentru spații rezidențiale sau industriale.': 'Бетонные плиты, дворы, парковки и полы для жилых и промышленных объектов.',
    'Pregătire, armare, cofrare și turnare pentru construcții noi sau extinderi.': 'Подготовка, армирование, опалубка и бетонирование новых зданий и пристроек.',
    'Coordonarea etapelor de la teren și structură până la pregătirea pentru utilizare.': 'Координация этапов от подготовки участка и конструкции до готовности к эксплуатации.',
    'Vezi lucrările': 'Смотреть проекты',
    'Vezi portofoliul': 'Смотреть портфолио',
    'Lucrări făcute': 'Выполненные работы',
    'Turnare platformă exterioară': 'Наружная бетонная площадка',
    'Pardoseală în spațiu industrial': 'Промышленный бетонный пол',
    'Desfacere controlată a acoperișului': 'Контролируемый демонтаж крыши',
    'Compartimentare și finisare': 'Перегородки и отделка',
    'Un singur standard vizual.': 'Единый стандарт качества.',
    'Înțelegem lucrarea': 'Уточняем задачу',
    'Vedem terenul': 'Оцениваем объект',
    'Colectăm locația, scopul, dimensiunile și termenul dorit.': 'Уточняем местоположение, назначение, размеры и желаемые сроки.',
    'Analizăm accesul, condițiile și documentele disponibile.': 'Оцениваем подъезд, условия на объекте и доступную документацию.',
    'Stabilim lucrările, cantitățile, responsabilitățile și etapele.': 'Определяем работы, объёмы, ответственность и этапы.',
    'Organizăm echipa și urmărim lucrarea până la rezultatul convenit.': 'Организуем бригаду и ведём работу до согласованного результата.',
    'Un partener': 'Партнёр',
    'care': 'который',
    'execută.': 'выполняет работу.',
    'Încrederea se': 'Доверие',
    'construiește.': 'строится делом.',
    'Ai un proiect?': 'Есть проект?',
    'Hai să vorbim.': 'Давайте обсудим.',
    'Hai să discutăm': 'Обсудим',
    'proiectul.': 'ваш проект.',
    'Turnare': 'Бетонирование',
    'Trasare': 'Разметка',
    'Cofraj & armare': 'Опалубка и армирование',
    'Armare': 'Армирование',
    'Beton.': 'Бетон.',
    'Plan. Cofraj.': 'План. Опалубка.',
    'Coordonăm betonul, accesul și echipa.': 'Координируем подачу бетона, доступ на объект и работу бригады.',
    'Corelăm lucrarea cu planurile și cotele.': 'Сверяем работы с чертежами и высотными отметками.',
    'Radier și plăci': 'Плитные фундаменты и перекрытия',
    'Placă armată': 'Армированная плита',
    'Structură pregătită pentru beton': 'Конструкция подготовлена к бетонированию',
    'Ai proiectul tehnic?': 'Есть технический проект?',
    'Îl analizăm pentru': 'Мы изучим его для',
    'o discuție de execuție.': 'обсуждения выполнения работ.',
    'Termen dorit': 'Желаемые сроки',
    'Localitate': 'Местоположение',
    'Persoană fizică': 'Частный клиент',
    'Dezvoltator / antreprenor': 'Застройщик / подрядчик',
    'Lucrare': 'Вид работ',
    'Sediu': 'Офис',
    'Date juridice': 'Реквизиты компании',
    'Politica de': 'Политика',
    'confidențialitate.': 'конфиденциальности.',
    'Contactează-ne': 'Связаться с нами',
    'Scrie pe Viber': 'Написать в Viber',
    'Sună acum': 'Позвонить',
    'Lucrări': 'Работы',
    'în lucru.': 'в процессе.',
    'șantier.': 'объекте.',
    'Suprafața bună': 'Надёжная поверхность',
    'începe': 'начинается',
    'dedesubt.': 'с основания.',
    'Beton &': 'Бетон и',
    'platforme.': 'площадки.',
    'Drumuri &': 'Дороги и',
    'amenajări.': 'благоустройство.',
    'Fundații &': 'Фундаменты и',
    'structuri.': 'конструкции.',
    'Aici încă': 'Эта страница',
    'nu am': 'ещё не',
    'construit.': 'построена.',
    'Capacitate': 'Возможности',
    'de': ' ',
    'execuție.': 'для выполнения работ.',
    'Intrăm în proiect': 'Включаемся в проект',
    'cu un rol': 'с чётко',
    'clar.': 'определённой ролью.',
    'Unde putem': 'Где мы можем',
    'intra în lucru.': 'подключиться к работе.',
    'De la documentație': 'От документации',
    'până la': 'до',
    'mobilizare.': 'выхода на объект.',
    'Trimite datele': 'Отправьте данные проекта',
    'pentru analiză.': 'для оценки.',
    'O companie': 'Компания',
    'Claritate înainte.': 'Сначала ясность.',
    'Ritm': 'Рабочий ритм',
    'Lucruri simple.': 'Простые принципы.',
    'Ținute constant.': 'Соблюдаем постоянно.',
    'Un semn simplu.': 'Простой знак.',
    'O direcție solidă.': 'Надёжное направление.',
    'Spune-ne ce': 'Расскажите, что',
    'trebuie': 'нужно',
    'construit.': 'построить.',
    'Zece lucrări.': 'Десять реальных объектов.',
    'De la armare': 'От армирования',
    'suprafață.': 'готовой поверхности.',
    'Arată-ne situația': 'Покажите реальные',
    'din': ' ',
    'teren.': 'условия на объекте.',
    'Lucrarea trece.': 'Работа завершается.',
    'Reputația rămâne.': 'Репутация остаётся.',
    'Experiențe spuse': 'Реальный опыт,',
    'direct.': 'рассказанный напрямую.',
    'Cum a fost': 'Как прошло',
    'colaborarea?': 'сотрудничество?',
    'Control de la suport': 'Контроль от основания',
    'finisaj.': 'финишной обработки.',
    'Beton executat': 'Бетонные работы',
    'Trimite detaliile.': 'Отправьте подробности.',
    'Pregătim discuția.': 'Мы подготовим следующие шаги.',
    'Case': 'Дома',
    'la cheie.': 'под ключ.',
    'Un singur fir': 'Единая',
    'coordonare.': 'координация.',
    'Decizii înainte': 'Решения принимаются до',
    'șantier.': 'начала работ.',
    'Avem nevoie': 'Что нам нужно',
    'proiect.': 'для вашего проекта.',
    'Spune-ne unde': 'Расскажите, на каком',
    'te afli': 'этапе проект',
    'acum.': 'сейчас.',
    'Uneori proiectul': 'Иногда проект',
    'începe cu': 'начинается с',
    'eliberarea.': 'освобождения площадки.',
    'Ce trebuie': 'Что нам нужно',
    'să': ' ',
    'știm.': 'знать.',
    'Intervenții': 'Работы',
    'în spații reale.': 'на реальных объектах.',
    'Trimite fotografii': 'Отправьте фотографии',
    'și': 'и',
    'locația.': 'местоположение.',
    'Accesul este parte': 'Подъезд — часть',
    'construcție.': 'строительного решения.',
    'Apa, sarcina': 'Водоотвод, нагрузки',
    'nivelul.': 'высотные отметки.',
    'Suprafețe pentru': 'Поверхности для',
    'folosire reală.': 'реальной эксплуатации.',
    'Trimite locația': 'Отправьте местоположение',
    'dimensiunile.': 'размеры.',
    'Baza nu se vede.': 'Основание не видно.',
    'Dar': 'Но',
    'contează.': 'оно имеет значение.',
    'Armare și structură': 'Армирование и конструкция',
    'de la bază.': 'с самого основания.',
    'Alege lucrarea': 'Выберите услугу,',
    'de care': ' ',
    'ai nevoie.': 'которая вам нужна.',
    'Detaliile bune': 'Точные детали',
    'reduc': 'уменьшают',
    'surprizele.': 'неожиданности.',
    'Descrie lucrarea.': 'Опишите проект.',
    'Noi clarificăm pașii.': 'Мы уточним следующие шаги.',
    'organizate.': 'по чёткому плану.',
    'Spațiul vechi.': 'Существующее пространство.',
    'Un': ' ',
    'nou început.': 'Новое начало.',
    'Întâi descoperim': 'Сначала выясняем,',
    'ce este': 'что находится',
    'Lucrări reale,': 'Реальные работы,',
    'nu randări.': 'не рендеры.',
    'Trimite-le împreună': 'Пришлите их вместе',
    'cu': 'с',
    'suprafața.': 'площадью помещения.',
    'Această pagină': 'Эта страница',
    'încă nu este': 'ещё не',
    'construită.': 'построена.',
    'sub finisaj.': 'под отделкой.',
    'Desfacere și pregătire': 'Демонтаж и подготовка',
    'Desfaceri interioare': 'Внутренний демонтаж',
    'Sortare și evacuare conform scopului stabilit': 'Сортировка и вывоз отходов согласно согласованному объёму',
    'Modul dorit de evacuare': 'Требуемый способ вывоза отходов',
    'evacuare și pregătirea zonei pentru etapa următoare.': 'вывоз отходов и подготовка территории к следующему этапу.',
    'Turnare beton armat': 'Заливка железобетона',
    'Turnare beton la Bâc': 'Бетонирование · BÂC',
    'Turnare beton Feredeuca': 'Бетонирование в Фередеуке',
    'Turnarea pardoselii industriale': 'Заливка промышленного бетонного пола',
    'Turnare și nivelare suprafață': 'Заливка и выравнивание поверхности',
    'Cofrare și armare': 'Опалубка и армирование',
    'Pregătire, armare, cofrare și turnare.': 'Подготовка, армирование, опалубка и бетонирование.',
    'Antrepriză generală': 'Генеральный подряд',
    'Subantrepriză': 'Субподряд',
    'Subantrepriză pe proiect': 'Субподряд по проекту',
    'Subantrepriză pe lucrări definite': 'Субподряд на согласованный объём работ',
    'Execuție după planuri și cantități': 'Выполнение по чертежам и объёмам',
    'Stabilim comercial': 'Согласовываем коммерческие условия',
    'Oferta ține cont de acces, condiții, volum și logistică.': 'Смета учитывает подъезд, условия на объекте, объём и логистику.',
    'Pentru o ofertă corectă avem nevoie de locație, dimensiuni, starea terenului sau spațiului și, unde există, planuri ori cantități.': 'Для точной сметы нужны местоположение, размеры, состояние участка или помещения и, если есть, чертежи или объёмы.',
    'Pentru o ofertă serioasă': 'Для точной сметы',
    'Începe discuția': 'Начать обсуждение',
    'ARHIVĂ REALĂ · BÂC': 'РЕАЛЬНЫЙ АРХИВ · BÂC',
    'BETON · BÂC': 'БЕТОН · BÂC',
    'Proiecte Condr Grup pentru Port Mall, Bomond, Kaufland, Terra Avia, Imonna Grup și Radisson Blu Leogrand, plus lucrări reale din șantier.': 'Проекты Condr Grup для Port Mall, Bomond, Kaufland, Terra Avia, Imonna Grup и Radisson Blu Leogrand, а также реальные работы со строительных площадок.',
    'Proiecte de referință': 'Знаковые проекты',
    'Lucrări pentru': 'Работы для',
    'branduri cunoscute.': 'известных брендов.',
    'Condr Grup a executat lucrări pe obiective comerciale, industriale și hoteliere importante din Chișinău. Mai jos prezentăm rolul concret al echipei la fiecare proiect.': 'Condr Grup выполняла работы на крупных коммерческих, промышленных и гостиничных объектах Кишинёва. Ниже указан конкретный объём участия команды в каждом проекте.',
    'FOTOGRAFIE DIN ARHIVA CONDR GRUP': 'ФОТО ИЗ АРХИВА CONDR GRUP',
    'Lucrări de demolare executate de Condr Grup la Port Mall': 'Демонтажные работы Condr Grup в Port Mall',
    'PORT': 'PORT',
    'MALL': 'MALL',
    'DEMOLĂRI COMPLETE · 2023–2026': 'ПОЛНЫЙ КОМПЛЕКС ДЕМОНТАЖА · 2023–2026',
    'Port Mall': 'Port Mall',
    'Condr Grup a executat întregul pachet de lucrări de demolare pentru intervențiile realizate la Port Mall în perioada 2023–2026.': 'Condr Grup выполнила полный комплекс демонтажных работ в рамках проектов Port Mall в 2023–2026 годах.',
    'Lucrări de amenajare executate de Condr Grup în Port Mall': 'Отделочные работы Condr Grup в Port Mall',
    'BOMOND': 'BOMOND',
    'RESTAURANT · AMENAJARE LA CHEIE': 'РЕСТОРАН · ОТДЕЛКА ПОД КЛЮЧ',
    'Bomond, Port Mall': 'Bomond, Port Mall',
    'Execuția integrală la cheie a restaurantului Bomond din Port Mall, de la lucrările interioare până la pregătirea spațiului pentru utilizare.': 'Полное выполнение работ под ключ в ресторане Bomond в Port Mall — от внутренних работ до подготовки помещения к эксплуатации.',
    'Interiorul unui magazin Kaufland din Chișinău': 'Интерьер магазина Kaufland в Кишинёве',
    'IMAGINE OBIECTIV · KAUFLAND MOLDOVA ↗': 'ФОТО ОБЪЕКТА · KAUFLAND MOLDOVA ↗',
    'KAUFLAND': 'KAUFLAND',
    'CONSTRUCȚII · BOTANICA · 2020': 'СТРОИТЕЛЬНЫЕ РАБОТЫ · БОТАНИКА · 2020',
    'Kaufland, bd. Decebal': 'Kaufland, бульвар Дечебал',
    'Lucrări de construcție executate în 2020 pentru magazinul Kaufland Botanica de pe bd. Decebal 99/2, în zona bd. Dacia.': 'Строительные работы, выполненные в 2020 году для магазина Kaufland Botanica по адресу бульвар Дечебал 99/2, рядом с бульваром Дачия.',
    'Aeronava companiei Terra Avia': 'Самолёт компании Terra Avia',
    'IMAGINE BRAND · WIKIMEDIA COMMONS ↗': 'ФОТО БРЕНДА · WIKIMEDIA COMMONS ↗',
    'TERRA': 'TERRA',
    'AVIA': 'AVIA',
    'REPARAȚIE CAPITALĂ · 2026': 'КАПИТАЛЬНЫЙ РЕМОНТ · 2026',
    'Oficiul Terra Avia': 'Офис Terra Avia',
    'Lucrări de reparație capitală executate în 2026 în oficiul companiei Terra Avia din Chișinău.': 'Капитальный ремонт офиса компании Terra Avia в Кишинёве, выполненный в 2026 году.',
    'Finisarea mecanizată a betonului la Imonna Grup': 'Механизированная затирка бетона для Imonna Grup',
    'IMONNA GRUP': 'IMONNA GRUP',
    'BETON INDUSTRIAL · FEREDEUCA 4': 'ПРОМЫШЛЕННЫЙ БЕТОН · ФЕРЕДЕУКА 4',
    '400 m² pentru Imonna Grup': '400 м² для Imonna Grup',
    'Turnarea a 400 m² de beton și finisarea mecanizată a suprafeței cu elicopterul pe str. Feredeuca 4.': 'Заливка 400 м² бетона и механизированная затирка поверхности по адресу ул. Фередеука 4.',
    'Hotelul Radisson Blu Leogrand din Chișinău': 'Отель Radisson Blu Leogrand в Кишинёве',
    'IMAGINE OBIECTIV · SERHIO · CC BY 3.0 ↗': 'ФОТО ОБЪЕКТА · SERHIO · CC BY 3.0 ↗',
    'RADISSON': 'RADISSON',
    'BLU': 'BLU',
    'CONSTRUCȚIE HOTELIERĂ · 2016': 'СТРОИТЕЛЬСТВО ОТЕЛЯ · 2016',
    'Radisson Blu Leogrand': 'Radisson Blu Leogrand',
    'Participare la lucrările de construcție ale hotelului Radisson Blu Leogrand din Chișinău în anul 2016.': 'Участие в строительных работах отеля Radisson Blu Leogrand в Кишинёве в 2016 году.',
    'Și multe alte proiecte comerciale, industriale și rezidențiale, precum și lucrări executate pentru persoane fizice.': 'А также многие другие коммерческие, промышленные и жилые проекты и работы для частных заказчиков.',
    'Informațiile despre lucrările executate sunt furnizate de Condr Grup. Imaginile marcate „imagine obiectiv” identifică proprietatea sau brandul și nu reprezintă fotografii din timpul execuției Condr Grup.': 'Сведения о выполненных работах предоставлены Condr Grup. Изображения с пометкой «фото объекта» служат для идентификации объекта или бренда и не являются фотографиями процесса работ Condr Grup.',
    'Arhiva de șantier': 'Архив со стройплощадок',
    'Alte lucrări.': 'Другие работы.',
    'Același standard.': 'Тот же стандарт.',
    'Filtrează după tip pentru a vedea imagini reale din etapele de beton, structură, amenajare, renovare și demolare.': 'Выберите тип работ, чтобы увидеть реальные фотографии этапов бетонирования, возведения конструкций, отделки, ремонта и демонтажа.',
    'Adăugăm treptat proiecte și fotografii noi, după confirmarea detaliilor și acordul de publicare.': 'Мы постепенно добавляем новые проекты и фотографии после подтверждения деталей и согласования публикации.'
  }
};

function shouldTranslate(value) {
  if (!/[A-Za-zĂÂÎȘȚăâîșț]/.test(value)) return false;
  if (/^(?:Condr Grup|CONDR GRUP|S\.R\.L\.|IDNO|B2B|Viber|PortMall|Bâc|Feredeuca|Dumbrava|Vatra)$/i.test(value)) return false;
  if (/^(?:https?:|mailto:|tel:|viber:|#|[\d\s+./·—–-]+)$/.test(value)) return false;
  return true;
}

function collectTranslatable(html) {
  const values = new Set();
  const add = value => {
    const trimmed = value.trim();
    if (trimmed && shouldTranslate(trimmed)) values.add(trimmed);
  };

  html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/>([^<>]+)</g, (_, value) => {
      add(value);
      return _;
    });

  for (const match of html.matchAll(/\b(?:content|title|placeholder|aria-label|alt|data-subject)="([^"]+)"/g)) {
    add(match[1]);
  }
  return values;
}

async function googleTranslateBatch(values, targetLocale) {
  const delimiter = '\n___CG_SPLIT_7A9D___\n';
  const query = values.join(delimiter);
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'ro');
  url.searchParams.set('tl', targetLocale);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', query);

  const response = await fetch(url, {
    headers: { 'User-Agent': 'CondrGrup locale builder' }
  });
  if (!response.ok) throw new Error(`Translation request failed: HTTP ${response.status}`);
  const data = await response.json();
  const translated = data[0].map(part => part[0]).join('');
  const parts = translated.split(delimiter);
  if (parts.length !== values.length) {
    throw new Error(`Translation split mismatch: expected ${values.length}, received ${parts.length}`);
  }
  return parts.map(value => value.trim());
}

async function loadCache() {
  try {
    return JSON.parse(await fs.readFile(cacheFile, 'utf8'));
  } catch {
    return { en: {}, ru: {} };
  }
}

async function translateMissing(values, targetLocale, cache) {
  const pending = values.filter(value => !cache[targetLocale][value]);
  const batches = [];
  let batch = [];
  let size = 0;

  for (const value of pending) {
    if (batch.length && size + value.length > 3200) {
      batches.push(batch);
      batch = [];
      size = 0;
    }
    batch.push(value);
    size += value.length + 26;
  }
  if (batch.length) batches.push(batch);

  for (let index = 0; index < batches.length; index += 1) {
    const source = batches[index];
    let translated;
    try {
      translated = await googleTranslateBatch(source, targetLocale);
    } catch (error) {
      console.warn(`Batch ${index + 1}/${batches.length} failed; retrying entries individually.`);
      translated = [];
      for (const value of source) {
        const [result] = await googleTranslateBatch([value], targetLocale);
        translated.push(result);
      }
    }
    source.forEach((value, itemIndex) => {
      cache[targetLocale][value] = translated[itemIndex];
    });
    console.log(`${localeNames[targetLocale]} translations: batch ${index + 1}/${batches.length}`);
  }

  Object.assign(cache[targetLocale], manual[targetLocale]);
}

function translateValue(value, translations) {
  const trimmed = value.trim();
  if (!translations[trimmed]) return value;
  const start = value.slice(0, value.indexOf(trimmed));
  const end = value.slice(value.indexOf(trimmed) + trimmed.length);
  return `${start}${translations[trimmed]}${end}`;
}

function localizeHtml(html, relativeFile, targetLocale, translations) {
  const sourceDepth = relativeFile.split('/').length - 1;
  let result = html.replace('<html lang="ro"', `<html lang="${targetLocale}"`);

  result = result.replace(/data-root="[^"]*"/, `data-root="${'../'.repeat(sourceDepth + 1)}"`);
  result = result.replace(/>([^<>]+)</g, (match, value) => `>${translateValue(value, translations)}<`);
  result = result.replace(
    /\b(content|title|placeholder|aria-label|alt|data-subject)="([^"]+)"/g,
    (match, attribute, value) => value === 'width=device-width,initial-scale=1'
      ? match
      : `${attribute}="${translateValue(value, translations)}"`
  );

  if (sourceDepth === 0) {
    result = result.replace(/(["'(])assets\//g, '$1../assets/');
  } else {
    result = result.replace(/\.\.\/assets\//g, '../../assets/');
  }

  if (targetLocale === 'en') {
    result = result
      .replaceAll('Condr Group', 'Condr Grup')
      .replace('<h1>Demolition<br><em>controlled.</em>', '<h1>Controlled<br><em>demolition.</em>');
  } else if (targetLocale === 'ru') {
    result = result
      .replaceAll('КОНДР ГРУПП', 'CONDR GRUP')
      .replaceAll('КОНДР ГРУП', 'CONDR GRUP')
      .replaceAll('Кондр Групп', 'Condr Grup')
      .replaceAll('Кондр Груп', 'Condr Grup')
      .replace('<h1>Демонтаж<br><em>контролируемый.</em>', '<h1>Контролируемый<br><em>демонтаж.</em>')
      .replace('<h1>Компания<br>который <em>выполняет работу.</em>', '<h1>Компания<br>которая <em>выполняет работу.</em>');
  }

  return result;
}

async function main() {
  const sources = new Map();
  const allValues = new Set();

  for (const relativeFile of sourceFiles) {
    const html = await fs.readFile(path.join(projectRoot, relativeFile), 'utf8');
    sources.set(relativeFile, html);
    collectTranslatable(html).forEach(value => allValues.add(value));
  }

  const cache = await loadCache();
  for (const locale of ['en', 'ru']) {
    await translateMissing([...allValues], locale, cache);
    const localeRoot = path.join(projectRoot, locale);
    await fs.mkdir(localeRoot, { recursive: true });

    for (const [relativeFile, html] of sources) {
      const outputFile = path.join(localeRoot, relativeFile);
      await fs.mkdir(path.dirname(outputFile), { recursive: true });
      await fs.writeFile(outputFile, localizeHtml(html, relativeFile, locale, cache[locale]), 'utf8');
    }
  }

  await fs.writeFile(cacheFile, `${JSON.stringify(cache, null, 2)}\n`, 'utf8');
  console.log(`Generated ${sourceFiles.length * 2} localized pages from ${allValues.size} source strings.`);
}

await main();
