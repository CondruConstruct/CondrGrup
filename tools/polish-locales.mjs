import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const replacements = {
  en: {
    'Case study · arrangement': 'Case study · fit-out',
    'Turnkey arrangement': 'Turnkey fit-out',
    'Purpose confirmed': 'Confirmed scope',
    'The Condr Grup package was the execution of the turnkey works for the Bomond restaurant in the Port Mall.': "Condr Grup's scope covered turnkey works for the Bomond restaurant at Port Mall.",
    'The description maintains a verifiable purpose;': 'The description keeps the publicly stated scope precise;',
    'the order of interventions and the delivery points': 'the work sequence and handover checkpoints',
    'coordination of stages in the construction site': 'coordination of work stages on site',
    'Send the plan, area, location and term.': 'Send the plan, floor area, location and deadline.',
    'INDUSTRIAL CONCRETE · FEREDEUILI 4': 'INDUSTRIAL CONCRETE · FEREDEULUI 4',
    'Imona Group': 'Imona Grup',
    'Mechanized finished concrete': 'Power-trowel concrete finishing',
    'mechanized finishing with the helicopter': 'a power-trowel finish',
    'mechanized finishing of the surface by helicopter': 'power-trowel surface finishing',
    'mechanized finishing by helicopter': 'power-trowel finishing',
    'Mechanized finishing by helicopter': 'Power-trowel finishing',
    '4 Feredeuil str.': '4 Feredeului Street',
    '4 Feredeuil Street': '4 Feredeului Street',
    'What we prepare before casting': 'Before the concrete pour',
    'putting concrete into operation': 'concrete placement',
    'continuous casting planning': 'planning a continuous pour',
    'Experience stated': 'Company-stated experience',
    'Kaufland Botanica objective': 'Kaufland Botanica project',
    'Do you need an executor?': 'Do you need a contractor?',
    'Major repair.': 'Major renovation.',
    'capital repair': 'major renovation',
    'capital repairs': 'major renovations',
    'exclusive execution': 'sole delivery by Condr Grup',
    'hotel objective': 'hotel project',
    'check-in and drop-off points': 'inspection and handover checkpoints',
    'Send the plans or quote available.': 'Send the available plans or bill of quantities.',
    'construction site with several specialties': 'multi-trade construction site',
    'The series documents subdivision work in the Port Mall.': 'The series documents interior partition work at Port Mall.'
  },
  ru: {
    'Кейс · договоренность': 'Кейс · отделка',
    'Организация под ключ': 'Отделка под ключ',
    'Цель подтверждена': 'Подтвержденный объем работ',
    'Из сырого космоса<br>до <em>исполнение.</em>': 'От чернового пространства<br>до <em>сдачи.</em>',
    'Архив группы Condr': 'Архив Condr Grup',
    'работу подразделения в торговом центре «Порт Молл»': 'работы по внутренним перегородкам в Port Mall',
    'Группа компаний «Имона»': 'Imona Grup',
    'ИМОНА ГРУПП': 'IMONA GRUP',
    'Imona Group': 'Imona Grup',
    'FEREDEUILI 4': 'ФЕРЕДЕУЛУЙ 4',
    'с помощью вертолета': 'бетоноотделочной машиной',
    'поверхности вертолетом': 'поверхности бетоноотделочной машиной',
    'Механизированная отделка вертолетом': 'Механизированная затирка бетоноотделочной машиной',
    'до <em>отделка.</em>': 'до <em>финишной затирки.</em>',
    'цель как эксклюзивное исполнение': 'объект как полностью выполненный только Condr Grup',
    'гостиничной задаче': 'гостиничном проекте',
    'пункты регистрации и высадки': 'контрольные точки и передача работ',
    'доступное предложение': 'имеющуюся ведомость объемов работ',
    'не представляет собой фотографию казни': 'не является фотографией работ',
    'Фотографии с казни': 'Фотографии с объекта'
  }
};

async function walk(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.name.endsWith('.html')) files.push(absolute);
  }
  return files;
}

for (const [language, mapping] of Object.entries(replacements)) {
  for (const filename of await walk(path.join(root, language))) {
    let html = await fs.readFile(filename, 'utf8');
    for (const [from, to] of Object.entries(mapping)) html = html.replaceAll(from, to);
    await fs.writeFile(filename, html, 'utf8');
  }
}

console.log('English and Russian technical terminology polished.');
