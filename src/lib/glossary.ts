import type { L } from './menus';

/** A small lexicon of the Syrian table, used on the story page (and as DefinedTermSet JSON-LD). */
export const glossary: { term: string; termEn?: string; ar: string; def: L }[] = [
  { term: 'Mezzé', ar: 'مازة', def: { fr: 'Petits plats froids et chauds, posés au centre de la table et partagés par tous.', en: 'Small hot and cold dishes set at the centre of the table and shared by all.' } },
  { term: 'Hummus', ar: 'حمّص', def: { fr: 'Purée de pois chiches, tahini et citron, souvent couronnée de viande ou d’herbes.', en: 'Chickpeas puréed with tahini and lemon, often crowned with meat or herbs.' } },
  { term: 'Mutabbal', ar: 'متبّل', def: { fr: 'Aubergine fumée écrasée au tahini. Chez Damas, il se décline aussi à la betterave.', en: 'Smoked eggplant mashed with tahini. At Damas, it also comes in beet.' } },
  { term: 'Mouhammara', ar: 'محمّرة', def: { fr: 'Poivrons rouges, noix et mélasse de grenade : une spécialité d’Alep.', en: 'Red peppers, walnuts and pomegranate molasses: a specialty of Aleppo.' } },
  { term: 'Fattouch', ar: 'فتّوش', def: { fr: 'Salade d’herbes et de légumes croquants, pain grillé et sumac.', en: 'A salad of herbs and crisp vegetables with toasted bread and sumac.' } },
  { term: 'Kibbeh', ar: 'كبّة', def: { fr: 'Boulgour et viande façonnés à la main ; nayyeh, elle se sert crue, en tartare.', en: 'Bulgur and meat shaped by hand; as nayyeh, it is served raw, as a tartare.' } },
  { term: 'Yalanji', ar: 'يالنجي', def: { fr: 'Feuilles de vigne roulées sur un riz aux herbes et au citron.', en: 'Vine leaves rolled around rice with herbs and lemon.' } },
  { term: 'Shish barak', ar: 'شيش برك', def: { fr: 'Petits chaussons de viande pochés dans un yogourt tiède.', en: 'Little meat dumplings poached in warm yogurt.' } },
  { term: 'Fatteh', ar: 'فتّة', def: { fr: 'Pain grillé, pois chiches ou viande, nappés de yogourt au tahini et de ghee.', en: 'Toasted bread with chickpeas or meat under tahini yogurt and ghee.' } },
  { term: 'Maqlouba', ar: 'مقلوبة', def: { fr: '« À l’envers » : riz, viande et aubergine cuits ensemble puis renversés au service.', en: '“Upside down”: rice, meat and eggplant cooked together, then flipped to serve.' } },
  { term: 'Freekeh', ar: 'فريكة', def: { fr: 'Blé vert récolté jeune puis fumé, au goût grillé.', en: 'Young green wheat, roasted for a smoky flavour.' } },
  { term: 'Samké harra', ar: 'سمكة حرّة', def: { fr: '« Poisson épicé » : poisson entier relevé de piment, d’herbes et de noix.', en: '“Spicy fish”: a whole fish with chili, herbs and walnuts.' } },
  { term: 'Kunafa', ar: 'كنافة', def: { fr: 'Cheveux d’ange croustillants, fromage fondant et sirop parfumé.', en: 'Crisp shredded pastry, melting cheese and fragrant syrup.' } },
  { term: 'Halawet el-jibn', ar: 'حلاوة الجبن', def: { fr: 'Roulés de pâte de fromage garnis d’ashta, sirop et pistaches.', en: 'Rolls of sweet cheese dough filled with ashta, with syrup and pistachios.' } },
  { term: 'Ashta', ar: 'قشطة', def: { fr: 'Crème épaisse parfumée à la fleur d’oranger ou à l’eau de rose.', en: 'Thick clotted cream scented with orange blossom or rosewater.' } },
  { term: 'Qamar al-Din', ar: 'قمر الدين', def: { fr: 'Pâte d’abricot séché de Damas, bue en nectar.', en: 'Dried apricot paste from Damascus, served as a nectar.' } },
  { term: 'Jullab', ar: 'جلّاب', def: { fr: 'Sirop de dattes et d’eau de rose, servi sur glace avec des pignons.', en: 'Date and rosewater syrup served over ice with pine nuts.' } },
  { term: 'Arak', ar: 'عرق', def: { fr: 'Eau-de-vie anisée du Levant, qui blanchit au contact de l’eau.', en: 'The anise spirit of the Levant, which turns milky with water.' } },
  { term: 'Piment d’Alep', termEn: 'Aleppo pepper', ar: 'فليفلة حلبية', def: { fr: 'Flocons de piment doux, fruités et légèrement huileux.', en: 'Mild, fruity, slightly oily chili flakes.' } },
  { term: 'Za’atar', ar: 'زعتر', def: { fr: 'Thym sauvage, sumac et sésame : le parfum des matins levantins.', en: 'Wild thyme, sumac and sesame: the scent of Levantine mornings.' } },
];
