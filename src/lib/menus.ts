/**
 * Menus transcribed from the printed PDFs (Damas Website Example/Menus).
 * Prices in CAD, before taxes. Edit here; both languages render from this file.
 */
export type L = { fr: string; en: string };
export type Dish = { name: L; desc?: L; price?: string };
export type Section = { id: string; title: L; items: Dish[]; cols?: 1 | 2 };
export type Menu = { id: string; title: L; intro?: L; note?: L; pdf?: string; sections: Section[] };

export const same = (s: string): L => ({ fr: s, en: s });

export const dinner: Menu = {
  id: 'diner',
  title: { fr: 'Menu à la carte', en: 'À la carte' },
  intro: {
    fr: 'Les mezzés se partagent au centre de la table, à la syrienne, avant les spécialités et les grillades sur charbon de bois.',
    en: 'Mezzes are shared at the centre of the table, the Syrian way, before the specialties and the charcoal grills.',
  },
  pdf: '/menus/diner.pdf',
  sections: [
    {
      id: 'mezzes-froids',
      title: { fr: 'Mezzés froids', en: 'Cold mezzes' },
      items: [
        { name: { fr: 'Salade fattouch', en: 'Fattouch salad' }, price: '28 / 38' },
        { name: { fr: 'Salade baba ghannouj', en: 'Baba ghannouj salad' }, price: '28' },
        { name: { fr: 'Yalanji de feuilles de vigne farcies', en: 'Stuffed vine leaf yalanji' }, price: '24' },
        { name: { fr: "Kibbeh nayyeh (tartare d’agneau)", en: 'Kibbeh nayyeh (lamb tartare)' }, price: '36' },
        {
          name: { fr: 'Plateau de mezzés du chef', en: "Chef’s mezzes platter" },
          desc: {
            fr: "Hummus, mouhammara, mutabbal de betterave, mutabbal d’aubergine",
            en: 'Hummus, mouhammara, beet mutabbal, eggplant mutabbal',
          },
          price: '34',
        },
      ],
    },
    {
      id: 'mezzes-chauds',
      title: { fr: 'Mezzés chauds', en: 'Hot mezzes' },
      items: [
        {
          name: same('Batata harra'),
          desc: { fr: 'Pommes de terre frites épicées, ail, citron, coriandre', en: 'Spicy fried potatoes, garlic, lemon, coriander' },
          price: '18',
        },
        { name: { fr: 'Pastirma de bœuf farcie', en: 'Stuffed beef pastirma' }, desc: { fr: 'Œufs de caille', en: 'Crispy quail eggs' }, price: '34' },
        { name: { fr: 'Borek au fromage', en: 'Cheese borek' }, desc: { fr: 'Confiture de figues à la nigelle', en: 'Nigella fig jam' }, price: '29' },
        { name: { fr: 'Kibbeh aux pistaches', en: 'Pistachio fried kibbeh' }, desc: { fr: 'Mutabbal de betterave', en: 'Beet mutabbal' }, price: '29' },
        {
          name: { fr: 'Maitake grillé', en: 'Grilled maitake' },
          desc: { fr: 'Courgette, aubergine, hummus aux cèpes, dukkah', en: 'Zucchini, eggplant, porcini hummus, dukkah' },
          price: '36',
        },
        { name: { fr: 'Crevettes kunafa', en: 'Kunafa shrimp' }, desc: { fr: "Labneh au miel et za’atar", en: "Honey labneh & za’atar" }, price: '44' },
        { name: { fr: "Hummus shawarma à l’agneau", en: 'Hummus lamb shawarma' }, price: '45' },
        {
          name: { fr: "Langue d’agneau déglacée au citron", en: 'Lemon-deglazed lamb tongue' },
          desc: { fr: "Piment d’Alep, hummus aux herbes", en: 'Aleppo pepper, herb hummus' },
          price: '42',
        },
        {
          name: { fr: 'Dumplings façon shish barak', en: 'Shish barak dumplings' },
          desc: { fr: 'Yogourt à la menthe', en: 'Mint yogurt, coriander butter' },
          price: '38',
        },
        {
          name: { fr: 'Betteraves ancestrales rôties', en: 'Roasted heirloom beets' },
          desc: { fr: "Halloumi grillé, orange, fenouil, za’atar", en: "Grilled halloumi, orange, fennel, za’atar" },
          price: '39',
        },
        { name: { fr: 'Pieuvre grillée', en: 'Grilled octopus' }, desc: { fr: 'Salade de pois chiches au citron', en: 'Lemon chickpea salad' }, price: '46' },
        {
          name: { fr: 'Faux-filet sharhat', en: 'Ribeye steak sharhat' },
          desc: {
            fr: 'Hummus aux cèpes, sauce aux champignons (Canadian Prime, 8 oz)',
            en: 'Porcini hummus, lemon mushroom sauce (Canadian Prime, 8 oz)',
          },
          price: '49',
        },
      ],
    },
    {
      id: 'specialites',
      title: { fr: 'Spécialités syriennes et grillades sur charbon de bois', en: 'Syrian specialties & charcoal grills' },
      items: [
        { name: same('Shish taouk'), desc: { fr: "Pommes de terre à l’ail", en: 'Garlic lemon potatoes' }, price: '48' },
        {
          name: { fr: "Kebab d’agneau à l’aubergine", en: 'Eggplant lamb kebab' },
          desc: { fr: "Sauce tomate au beurre, labneh à l’ail", en: 'Tomato butter sauce, garlic labneh' },
          price: '52',
        },
        {
          name: { fr: "Carré d’agneau", en: 'Rack of lamb' },
          desc: { fr: "Salade d’aubergines fumées, sauce au tahini (18 oz)", en: 'Smoked eggplant salad, tahini sauce (18 oz)' },
          price: '84',
        },
        {
          name: { fr: 'Kebab de filet mignon', en: 'Filet mignon kebab' },
          desc: { fr: "Maitake grillé, hummus au za’atar (Canadian Prime, 10 oz)", en: "Grilled maitake, za’atar hummus (Canadian Prime, 10 oz)" },
          price: '88',
        },
        { name: { fr: 'Grillades mixtes pour deux', en: 'Mixed grill for two' }, desc: { fr: 'Pour trois + 60', en: 'For three + 60' }, price: '185' },
        { name: { fr: 'Joue de bœuf braisée au freekeh', en: 'Braised beef cheek with freekeh' }, price: '53' },
        {
          name: { fr: "Jarret d’agneau fattet mozat", en: 'Lamb shank fattet mozat' },
          desc: { fr: 'Tahini, yogourt, herbes, ghee', en: 'Tahini yogurt, herbs, ghee' },
          price: '54',
        },
        {
          name: { fr: "Maqlouba d’épaule d’agneau et aubergine", en: 'Lamb shoulder & eggplant maqlouba' },
          desc: { fr: 'Batersh de tomate', en: 'Tomato batersh' },
          price: '55',
        },
        { name: { fr: 'Bar grillé', en: 'Grilled sea bass' }, desc: { fr: 'Moujaddara, tahini aux herbes', en: 'Moujaddara, herb tahini' }, price: '65' },
        {
          name: { fr: 'Daurade rose rôtie façon samké harra', en: 'Pink sea bream samké harra' },
          desc: { fr: 'Farce aux légumes et aux noix (2 lb)', en: 'Vegetable and walnut stuffing (2 lb)' },
          price: '85',
        },
      ],
    },
  ],
};

export const tasting = {
  price: '160',
  per: { fr: 'par personne', en: 'per guest' },
  text: {
    fr: "Un voyage généreux et raffiné au cœur de la cuisine syrienne. Cette expérience tisse les saveurs intemporelles de la Syrie avec le regard contemporain du chef, créant un dialogue entre héritage et imagination. Bien qu’il soit préétabli, nous sommes toujours heureux de répondre à vos préférences ou demandes particulières, dans la mesure du possible.",
    en: "A generous and refined journey through the soul of Syrian cuisine. This experience weaves together timeless Syrian flavours and the chef’s modern interpretation, creating a dialogue between heritage and imagination. While it follows a set progression, we are happy to accommodate special requests or preferences.",
  },
  pairings: [
    { name: { fr: 'Accord vins classique', en: 'Classic wine pairing' }, price: '85' },
    { name: { fr: 'Accord vins méditerranéen', en: 'Mediterranean wine pairing' }, price: '110' },
    { name: { fr: "Accord vins d’exception", en: 'Exceptional wine pairing' }, price: '150' },
    { name: { fr: 'Accord cocktails', en: 'Cocktail pairing' }, price: '85' },
    { name: { fr: 'Accord mocktails', en: 'Mocktail pairing' }, price: '65' },
  ] as Dish[],
};

export const brunch: Menu = {
  id: 'brunch',
  title: same('Brunch'),
  intro: {
    fr: 'Le week-end, la maison s’éveille autour des mezzés du matin, du four à pain et des grillades.',
    en: 'On weekends, the house wakes up to morning mezzes, the bread oven and the grill.',
  },
  note: { fr: 'Menu dégustation brunch 75 · Accord vin 55', en: 'Brunch tasting menu 75 · Wine pairing 55' },
  pdf: '/menus/brunch.pdf',
  sections: [
    {
      id: 'brunch-mezzes',
      title: { fr: 'Mezzés', en: 'Mezzes' },
      items: [
        {
          name: { fr: 'Mezzé matinal du chef', en: "Chef’s morning mezze" },
          desc: {
            fr: "Labneh au pourpier · Aubergine frite à la grenadine · Hummus au za’atar · Hindbeh de pissenlit avec feta",
            en: "Purslane labneh · Fried eggplant with pomegranate · Za’atar hummus · Dandelion hindbeh with feta",
          },
          price: '25',
        },
        { name: { fr: 'Salade fattouch', en: 'Fattouch salad' }, price: '24' },
        { name: { fr: 'Plateau de fatayer', en: 'Fatayer platter' }, desc: { fr: 'Agneau et akkawi', en: 'Lamb and akkawi' }, price: '22' },
        { name: { fr: "Tartare d’agneau façon kibbeh nayyeh", en: 'Kibbeh nayyeh' }, desc: { fr: '', en: 'Lamb tartare' }, price: '25' },
        { name: { fr: 'Carottes rôties au miel', en: 'Honey-roasted carrots' }, desc: { fr: 'Labneh et dukkah', en: 'Labneh and dukkah' }, price: '19' },
        { name: { fr: 'Halloumi grillé', en: 'Grilled halloumi' }, price: '21' },
        { name: { fr: 'Salade de fèves tiède façon foul moudammas', en: 'Warm fava bean salad (foul moudammas)' }, price: '21' },
        { name: { fr: "Saucisse d’agneau syrienne grillée et hummus", en: 'Grilled Syrian lamb sausage and hummus' }, price: '25' },
      ],
    },
    {
      id: 'brunch-signatures',
      title: { fr: 'Signatures régionales et grillades', en: 'Regional signatures & charcoal grills' },
      items: [
        { name: same('Fattet hummus'), price: '24' },
        { name: { fr: 'Sliders de taouk frit', en: 'Crispy taouk sliders' }, desc: { fr: 'Pastirma, œuf de caille', en: 'Pastirma, quail eggs' }, price: '15 – 28' },
        { name: { fr: "Omelette à l’aubergine fumée", en: 'Smoked eggplant omelette' }, price: '28' },
        {
          name: { fr: "Casserole d’œufs menemen", en: 'Menemen egg casserole' },
          desc: {
            fr: "Langues d’agneau confites et patates aux herbes · Soujouk et graviera · Champignons et feta",
            en: 'Lamb tongue confit and herb potatoes · Sujuk sausage and graviera cheese · Mushroom and feta',
          },
          price: '32',
        },
        { name: { fr: 'Faux-filet grillé et œufs ottomans', en: 'Grilled ribeye and Ottoman eggs' }, desc: { fr: '8 oz, Prime', en: '8 oz, Prime' }, price: '48' },
        { name: { fr: 'Bar grillé', en: 'Grilled sea bass' }, desc: { fr: 'Salade de betteraves rôties', en: 'Roasted beet salad' }, price: '45' },
        { name: same('Shish taouk'), desc: { fr: "Pommes de terre épicées à l’ail", en: 'Spicy garlic potatoes' }, price: '38' },
        { name: { fr: "Kebab d’agneau à l’aubergine", en: 'Eggplant lamb kebab' }, desc: { fr: 'Sauce tomate au beurre', en: 'Butter tomato sauce' }, price: '39' },
      ],
    },
    {
      id: 'brunch-sucre',
      title: { fr: 'Du côté sucré', en: 'On the sweeter side' },
      items: [
        { name: same('Halawet el-jeben'), price: '15' },
        { name: { fr: "Crème glacée à l’ashta", en: 'Ashta ice cream' }, price: '14' },
        { name: same('Kunafa'), price: '20' },
        { name: { fr: 'Pain doré au halva', en: 'Halva French toast' }, price: '23' },
      ],
    },
  ],
};

export const desserts: Menu = {
  id: 'desserts',
  title: same('Desserts'),
  pdf: '/menus/desserts.pdf',
  sections: [
    {
      id: 'desserts-carte',
      title: { fr: 'Douceurs', en: 'Sweets' },
      cols: 1,
      items: [
        {
          name: { fr: "Glace à l’ashta et pistache, barbe à papa syrienne", en: 'Pistachio ashta ice cream, Syrian cotton candy' },
          price: '19',
        },
        { name: { fr: 'Glace au chocolat et halva, kataïfi', en: 'Chocolate halva ice cream, kataifi' }, price: '21' },
        { name: same('Halawet al-jibn'), price: '19' },
        { name: { fr: 'Kunafa au fromage', en: 'Cheese kunafa' }, price: '22' },
      ],
    },
  ],
};

export const drinks: Menu = {
  id: 'bar',
  title: { fr: 'Bar & nectars', en: 'Bar & nectars' },
  intro: {
    fr: "Le bar puise dans le garde-manger syrien : piment d’Alep, eau de rose, safran, cardamome, abricot Qamar al-Din.",
    en: 'The bar draws on the Syrian pantry: Aleppo pepper, rosewater, saffron, cardamom, Qamar al-Din apricot.',
  },
  sections: [
    {
      id: 'cocktails',
      title: same('Cocktails'),
      items: [
        { name: same('Bellini Safran Abricot'), desc: { fr: "Prosecco, jus d’orange, gingembre, vanille, muscade", en: 'Prosecco, orange juice, ginger, vanilla, nutmeg' }, price: '19' },
        { name: { fr: 'Concombre Smash', en: 'Cucumber Smash' }, desc: { fr: 'Vodka Aupale, sirop de romarin, concombre, cava', en: 'Aupale vodka, rosemary syrup, cucumber, cava' }, price: '22' },
        { name: same('Aleppo Gin Sour'), desc: { fr: "Gin Botanist, citron, coriandre, fleur d’oranger, piment d’Alep", en: 'Botanist gin, lemon, cilantro, orange blossom, Aleppo pepper' }, price: '23' },
        { name: same('Hibiscus Sipper'), desc: { fr: 'Gin Hendrick’s, hibiscus, concombre, sumac', en: 'Hendrick’s gin, hibiscus, cucumber, sumac' }, price: '22' },
        { name: same('Gingembre Rose'), desc: { fr: 'Rhum Planteray, gingembre, cardamome, blanc d’œuf, rose', en: 'Planteray rum, ginger, cardamom, egg white, Damascus rose' }, price: '21' },
        { name: same('Cherry Sour'), desc: { fr: 'Rhum Havana Club 7, cerises, thé, blanc d’œuf, poivre noir', en: 'Havana Club 7 rum, cherries, tea, egg white, black pepper' }, price: '23' },
        { name: same('Qamarita'), desc: { fr: "Tequila reposado, thé, nectar d’abricot, safran, tajín d’Alep", en: 'Reposado tequila, tea, apricot nectar, saffron, Aleppo tajín' }, price: '22' },
        { name: same('Jullab Mezcalita'), desc: { fr: 'Mezcal Sueño de Alden, Cointreau, nectar de datte, eau de rose', en: 'Sueño de Alden mezcal, Cointreau, date nectar, rosewater' }, price: '23' },
        { name: same('Sazarak'), desc: { fr: 'Brandy de xérès Lustau, rye Lot 40, bitters Peychaud, arak', en: 'Lustau brandy de Jerez, Lot 40 rye, Peychaud bitters, arak' }, price: '24' },
        { name: same('Beet Al-Sham'), desc: { fr: 'Gin Radoune, betterave, Bitter Red Esquimalt, aneth', en: 'Radoune gin, beet, Esquimalt Bitter Red, dill' }, price: '25' },
        { name: same('The East Fashioned'), desc: { fr: "Whisky japonais Nikka, vermouth blanc Bordiga, fleur d’oranger, bitter au chocolat", en: 'Japanese Nikka whisky, Bordiga white vermouth, orange blossom, chocolate bitters' }, price: '26' },
        { name: same('Cardamome Espresso Martini'), desc: { fr: 'Espresso, vodka Ketel One, Cointreau, Kahlúa, cardamome', en: 'Espresso, Ketel One vodka, Cointreau, Kahlúa, cardamom' }, price: '24' },
      ],
    },
    {
      id: 'mocktails',
      title: { fr: 'Sans alcool', en: 'Zero proof' },
      items: [
        { name: same('Karkadeh'), desc: { fr: 'Gin sans alcool, hibiscus, concombre, sumac', en: 'Zero-proof gin, hibiscus, cucumber, sumac' }, price: '18' },
        { name: same('Aleppo Sour'), desc: { fr: "Gin sans alcool, coriandre, citron, fleur d’oranger, piment d’Alep", en: 'Zero-proof gin, cilantro, lemon, orange blossom, Aleppo pepper' }, price: '18' },
        { name: same('Gingembre Rose'), desc: { fr: 'Gingembre, cardamome, citron, roses de Damas', en: 'Ginger, cardamom, lemon, Damascus rose' }, price: '16' },
        { name: { fr: 'Chaï glacé', en: 'Iced chai' }, desc: { fr: 'Thé Earl Grey, cardamome, safran', en: 'Earl Grey tea, cardamom, saffron' }, price: '14' },
      ],
    },
    {
      id: 'nectars',
      title: { fr: 'Nectars traditionnels', en: 'Traditional nectars' },
      items: [
        { name: same('Jullab'), desc: { fr: 'Dattes, noix de pin', en: 'Dates, pine nuts' }, price: '12' },
        { name: same('Sharab al-Ward'), desc: { fr: 'Rose, citron', en: 'Rose, lemon' }, price: '8' },
        { name: same('Qamar al-Din'), desc: { fr: 'Abricot, pistaches', en: 'Apricot, pistachio' }, price: '10' },
        { name: same('Polo'), desc: { fr: 'Menthe, citron, glace frappée', en: 'Mint, lemon, crushed ice' }, price: '10' },
      ],
    },
    {
      id: 'bieres',
      title: { fr: 'Bières et canettes', en: 'Beer & cans' },
      items: [
        { name: same('961 Pilsner'), desc: { fr: 'Liban', en: 'Lebanon' }, price: '13' },
        { name: same('961 Lager'), desc: { fr: 'Liban', en: 'Lebanon' }, price: '13' },
        { name: same('961 LPA'), desc: { fr: 'Liban', en: 'Lebanon' }, price: '13' },
        { name: same('Wills Ghost Farm IPA'), desc: same('Montréal'), price: '15' },
        { name: same('Desrochers Beez Pourpre'), desc: same('Laurentides'), price: '12' },
        { name: { fr: 'Pit Caribou sans alcool', en: 'Pit Caribou non-alcoholic' }, desc: same('Gaspé · 0,5 %'), price: '12' },
        { name: same('Fin Soda Poire'), desc: same('Montréal · 0 %'), price: '12' },
        { name: same('Fin Soda Aperitivo'), desc: same('Montréal · 0 %'), price: '12' },
        { name: { fr: "Eau d’Épinette Harrington", en: 'Harrington spruce soda' }, desc: same('Laurentides · 0 %'), price: '12' },
      ],
    },
  ],
};

/** Wines of the Levant, shown as a story on the wine chapter; full list lives in the PDF. */
export const levantWines = [
  { name: 'Bargylus Blanc 2018', grapes: 'Sauvignon blanc, chardonnay', origin: { fr: 'Lattaquié, Syrie', en: 'Latakia, Syria' } },
  { name: 'Bargylus Rouge 2017', grapes: 'Syrah, merlot, cabernet sauvignon', origin: { fr: 'Lattaquié, Syrie', en: 'Latakia, Syria' } },
  { name: 'Kashf 2022, El Sabban', grapes: 'Viognier', origin: { fr: 'Mont-Liban', en: 'Mount Lebanon' } },
  { name: 'Ward 2023, Heya', grapes: 'Tempranillo', origin: { fr: 'Bekaa, Liban', en: 'Bekaa, Lebanon' } },
];
export const araks = ['Massaya', 'Kefraya', 'Al-Karram', 'Brun', 'Ksarak', 'Ixsir'];

export const winePdf = '/menus/vins.pdf';

export const brunchDrinks: Menu = {
  id: 'brunch-boissons',
  title: { fr: 'Boissons du brunch', en: 'Brunch drinks' },
  pdf: '/menus/brunch-boissons.pdf',
  sections: [
    {
      id: 'brunch-cocktails',
      title: same('Cocktails'),
      items: [
        { name: { fr: 'Mimosa gingembre', en: 'Ginger mimosa' }, price: '15' },
        { name: { fr: 'Thé miel fizz', en: 'Honey tea fizz' }, price: '17' },
        { name: same('Silk Road Caesar'), desc: { fr: 'Bloody Caesar au za’atar', en: 'Bloody Caesar with za’atar' }, price: '18' },
        { name: { fr: 'Negroni infusé au café', en: 'Coffee Negroni' }, price: '18' },
        { name: { fr: 'Arak pamplemousse', en: 'Arak grapefruit' }, price: '18' },
        { name: { fr: 'Espresso martini framboise', en: 'Raspberry espresso martini' }, price: '20' },
        { name: { fr: 'Hibiscus Sipper au gin', en: 'Hibiscus Sipper with gin' }, price: '22' },
        { name: same('Aleppo Tequila Sour'), price: '22' },
        { name: { fr: 'Beet al-Sham au gin', en: 'Beet al-Sham with gin' }, price: '25' },
      ],
    },
    {
      id: 'brunch-mocktails',
      title: { fr: 'Sans alcool', en: 'Zero proof' },
      items: [
        { name: same('Hibiscus'), price: '14' },
        { name: same('Aleppo Sour'), price: '14' },
        { name: same('Gingembre Rose'), price: '14' },
        { name: { fr: 'Chaï glacé', en: 'Iced chai' }, price: '11' },
        { name: { fr: 'Qamar al-Din abricot', en: 'Qamar al-Din apricot' }, price: '10' },
      ],
    },
    {
      id: 'jus',
      title: { fr: 'Jus frais', en: 'Fresh juices' },
      items: [
        { name: same('Orange'), price: '9' },
        { name: { fr: 'Pamplemousse', en: 'Grapefruit' }, price: '9' },
        { name: { fr: 'Betterave', en: 'Beet' }, price: '10' },
        { name: { fr: 'Carotte et curcuma', en: 'Carrot turmeric' }, price: '10' },
        { name: same('Smoothie'), price: '11' },
      ],
    },
    {
      id: 'cafes-signatures',
      title: { fr: 'Cafés signatures', en: 'Signature coffees' },
      items: [
        { name: { fr: 'Cappuccino au baklava', en: 'Baklava cappuccino' }, price: '7' },
        { name: { fr: 'Cappuccino rose', en: 'Rose cappuccino' }, price: '7' },
        { name: { fr: 'Cappuccino à la cardamome', en: 'Cardamom cappuccino' }, price: '7' },
        { name: { fr: 'Latte à la pistache', en: 'Pistachio latte' }, price: '7' },
        { name: { fr: 'Latte caramel', en: 'Caramel latte' }, price: '7' },
        { name: { fr: 'Matcha à la fleur d’oranger', en: 'Orange blossom matcha' }, price: '9' },
      ],
    },
    {
      id: 'cafes-classiques',
      title: { fr: 'Cafés classiques', en: 'Classic coffees' },
      items: [
        { name: same('Espresso / Americano'), price: '4' },
        { name: same('Macchiato / Cortado'), price: '5' },
        { name: same('Latte'), price: '6' },
        { name: same('Cappuccino'), price: '6' },
        { name: same('Mocha'), price: '7' },
        { name: same('Matcha'), price: '8' },
      ],
    },
    {
      id: 'brunch-bieres',
      title: { fr: 'Bières et canettes', en: 'Beer & cans' },
      items: [
        { name: same('961 Pilsner'), desc: { fr: 'Liban', en: 'Lebanon' }, price: '13' },
        { name: same('961 Lager'), desc: { fr: 'Liban', en: 'Lebanon' }, price: '13' },
        { name: same('961 LPA'), desc: { fr: 'Liban', en: 'Lebanon' }, price: '13' },
        { name: same('Wills Ghost Farm IPA'), desc: same('Montréal'), price: '15' },
        { name: same('Desrochers Beez Pourpre'), desc: same('Laurentides'), price: '13' },
        { name: { fr: 'Pit Caribou sans alcool', en: 'Pit Caribou non-alcoholic' }, desc: same('Gaspé · 0,5 %'), price: '12' },
        { name: same('Fin Soda Poire'), desc: same('Montréal · 0 %'), price: '12' },
        { name: { fr: 'Eau d’Épinette Harrington', en: 'Harrington spruce soda' }, desc: same('Laurentides · 0 %'), price: '12' },
      ],
    },
  ],
};

/** The five menus, in switcher order. `key` is the route key in i18n.ts. */
export type MenuPage = {
  key: 'menu-dinner' | 'menu-brunch' | 'menu-brunch-drinks' | 'menu-desserts' | 'menu-wine';
  label: L;
  lede: L;
  pdf: string;
  menu?: Menu;
  tasting?: boolean;
};

/** Dinner combines the food, the tasting menu and the bar, like the printed dinner menu. */
export const dinnerFull: Menu = {
  ...dinner,
  title: { fr: 'Dîner', en: 'Dinner' },
  sections: [...dinner.sections, ...drinks.sections],
};

export const menuPages: MenuPage[] = [
  {
    key: 'menu-dinner',
    label: { fr: 'Dîner', en: 'Dinner' },
    lede: { fr: 'Cocktails, mezze, grillades et menu dégustation.', en: 'Cocktails, mezze, grills and tasting menu.' },
    pdf: '/menus/diner.pdf',
    menu: dinnerFull,
    tasting: true,
  },
  {
    key: 'menu-brunch',
    label: same('Brunch'),
    lede: { fr: 'Samedi et dimanche.', en: 'Saturday and Sunday.' },
    pdf: '/menus/brunch.pdf',
    menu: brunch,
  },
  {
    key: 'menu-brunch-drinks',
    label: { fr: 'Boissons du brunch', en: 'Brunch drinks' },
    lede: { fr: 'Cafés, cocktails et sans alcool.', en: 'Coffees, cocktails and zero proof.' },
    pdf: '/menus/brunch-boissons.pdf',
    menu: brunchDrinks,
  },
  {
    key: 'menu-desserts',
    label: same('Desserts'),
    lede: { fr: 'Eau de rose, fleur d’oranger, cardamome.', en: 'Rosewater, orange blossom, cardamom.' },
    pdf: '/menus/desserts.pdf',
    menu: desserts,
  },
  {
    key: 'menu-wine',
    label: { fr: 'Vins', en: 'Wine' },
    lede: { fr: 'Cave syrienne, libanaise et d’ailleurs.', en: 'Syrian, Lebanese and beyond.' },
    pdf: '/menus/vins.pdf',
  },
];
