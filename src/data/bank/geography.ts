import { bank } from './helpers';

const b = bank('geography', 'geo');

// Physical geography
b.mcq('Physical Geography', 'In which layer of the atmosphere do most weather phenomena occur?', ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], 0,
  'The troposphere contains nearly all the water vapour and dust, so clouds, rain and storms form there.');

b.two('Physical Geography', 'Consider the following statements:', [
  'Most of the atmospheric ozone is found in the troposphere.',
  'The ionosphere reflects certain radio waves back to the Earth.',
], [false, true],
  'The ozone layer lies in the stratosphere. The ionosphere, within the thermosphere, reflects radio waves, enabling long-distance radio communication.');

b.mcq('Physical Geography', 'Jet streams are generally found:', ['Near the Earth’s surface', 'In the upper troposphere, near the tropopause', 'In the mesosphere', 'In the thermosphere'], 1,
  'Jet streams are narrow bands of fast westerly winds near the tropopause, at around 9 to 12 km altitude.');

b.many('Physical Geography', "Consider the following statements about the Earth's interior:", [
  'S-waves cannot travel through liquids.',
  'The outer core is in a liquid state.',
  'The Mohorovičić discontinuity separates the crust from the mantle.',
], [true, true, true],
  'The S-wave shadow zone shows that the outer core is liquid. The Moho marks the crust-mantle boundary.');

b.mcq('Physical Geography', 'The Coriolis force is zero at:', ['The Equator', 'The Tropic of Cancer', '45° latitude', 'The Poles'], 0,
  'The Coriolis effect is proportional to the sine of latitude: zero at the Equator and maximum at the poles.');

b.two('Climatology', 'Consider the following statements about El Niño:', [
  'It is associated with unusual warming of sea surface waters in the central and eastern equatorial Pacific.',
  'El Niño years are generally associated with a stronger Indian summer monsoon.',
], [true, false],
  'El Niño generally weakens the Indian monsoon, though not in every year. A positive Indian Ocean Dipole can offset its effect.');

b.mcq('Oceanography', 'Which of the following seas has the highest salinity?', ['Baltic Sea', 'Red Sea', 'Black Sea', 'North Sea'], 1,
  'High evaporation and little freshwater inflow make the Red Sea one of the saltiest seas. The Baltic is among the least saline.');

b.pairs('Climatology', 'Consider the following pairs:', ['Local wind', 'Region'], [
  ['Chinook', 'Rocky Mountains, North America'],
  ['Harmattan', 'Australia'],
  ['Sirocco', 'North Africa to southern Europe'],
], [true, false, true],
  'The Harmattan is a dry, dusty wind blowing over West Africa from the Sahara.');

b.mcq('Oceanography', 'Which of the following is a cold ocean current?', ['Gulf Stream', 'Kuroshio Current', 'Labrador Current', 'Brazil Current'], 2,
  'The Labrador Current flows south from the Arctic along Canada. The others are warm currents.');

b.two('Physical Geography', 'Consider the following statements:', [
  'Basalt is an igneous rock.',
  'Marble is a sedimentary rock.',
], [true, false],
  'Basalt is extrusive igneous rock. Marble is metamorphic: limestone recrystallises under heat and pressure to form it.');

b.mcq('Climatology', 'Tropical cyclones do not form within about 5° of the Equator mainly because:', ['Sea temperatures are too low', 'The Coriolis force is too weak', 'There is too little moisture', 'Winds there are too strong'], 1,
  'Cyclones need Coriolis force to start rotating, and it is negligible near the Equator.');

b.ar('Physical Geography', 'On the equinoxes, day and night are nearly equal all over the globe.', 'On the equinoxes, the Sun is overhead at the Equator.', 0,
  'When the Sun is overhead at the Equator (around 21 March and 23 September), the circle of illumination passes through the poles and halves every latitude.');

b.mcq('Physical Geography', 'The International Date Line broadly follows which meridian?', ['0°', '90° E', '180°', '90° W'], 2,
  'The Date Line roughly follows 180° but zigzags to avoid splitting countries and island groups.');

b.two('Physical Geography', 'Consider the following statements about Indian Standard Time (IST):', [
  'IST is based on the 75° E meridian.',
  'IST is 4 hours 30 minutes ahead of Greenwich Mean Time.',
], [false, false],
  'IST is based on 82.5° E, which passes near Mirzapur. At 4 minutes per degree, 82.5° gives 330 minutes, so IST is 5 hours 30 minutes ahead of GMT.');

// Indian geography
b.mcq('Indian Geography', 'The Tropic of Cancer does NOT pass through which of these States?', ['Gujarat', 'Rajasthan', 'Odisha', 'Tripura'], 2,
  'It passes through Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura and Mizoram.');

b.pairs('Indian Geography', 'Consider the following pairs:', ['Mountain pass', 'State'], [
  ['Shipki La', 'Himachal Pradesh'],
  ['Lipulekh', 'Uttarakhand'],
  ['Bomdi La', 'Arunachal Pradesh'],
], [true, true, true],
  'All three are correct. Shipki La is where the Sutlej enters India, Lipulekh is on the Kailash Mansarovar route, and Bomdi La lies on the road to Tawang.');

b.mcq('Indian Geography', 'Which of the following rivers flows westward into the Arabian Sea?', ['Godavari', 'Krishna', 'Narmada', 'Mahanadi'], 2,
  'The Narmada and Tapi flow west through rift valleys and form estuaries. The other three drain into the Bay of Bengal.');

b.two('Indian Geography', 'Consider the following statements:', [
  'The Godavari is the longest river of peninsular India.',
  'The Brahmaputra is known as the Tsangpo in Tibet.',
], [true, true],
  "The Godavari, about 1,465 km long, is called the 'Dakshin Ganga'. The Brahmaputra is the Yarlung Tsangpo in Tibet.");

b.many('Indian Geography', 'Consider the following statements about the Indus river system:', [
  'The Indus rises in Tibet near Lake Mansarovar.',
  'The Jhelum rises from a spring at Verinag.',
  'The Sutlej enters India through the Shipki La.',
], [true, true, true],
  'All three are correct. The Sutlej (Langqen Zangbo in Tibet) enters Himachal Pradesh near Shipki La.');

b.mcq('Indian Geography', 'Which soil is most suitable for cotton cultivation?', ['Alluvial soil', 'Black (regur) soil', 'Laterite soil', 'Desert soil'], 1,
  'Black soil retains moisture well and is rich in lime and iron, making it ideal for cotton.');

b.two('Indian Geography', 'Consider the following statements about laterite soils:', [
  'They form under high temperature and heavy rainfall with alternating wet and dry seasons.',
  'They are rich in nitrogen and humus.',
], [true, false],
  'Heavy rain leaches away nutrients, so laterite soils are poor in nitrogen, phosphate and humus, and rich in iron and aluminium oxides.');

b.mcq('Indian Geography', 'Which is the highest peak in peninsular India?', ['Doddabetta', 'Anamudi', 'Mahendragiri', 'Guru Shikhar'], 1,
  'Anamudi (about 2,695 m) in the Anaimalai Hills of Kerala is the highest peak south of the Himalaya.');

b.pairs('Indian Geography', 'Consider the following pairs:', ['Hills', 'State'], [
  ['Garo Hills', 'Assam'],
  ['Mahadeo Hills', 'Odisha'],
  ['Cardamom Hills', 'Kerala'],
], [false, false, true],
  'The Garo Hills are in Meghalaya, and the Mahadeo Hills are part of the Satpura range in Madhya Pradesh.');

b.mcq('Climatology', 'Which region of India receives most of its annual rainfall during October to December?', ['Malabar coast', 'Coromandel coast of Tamil Nadu', 'Gangetic plains', 'Thar desert'], 1,
  'The Tamil Nadu coast lies in the rain shadow of the south-west monsoon and gets most of its rain from the north-east (retreating) monsoon.');

b.two('Indian Geography', 'Consider the following statements:', [
  'The Western Ghats are a UNESCO World Heritage Site.',
  'The Western Ghats are, on average, higher than the Eastern Ghats.',
], [true, true],
  'The Western Ghats were inscribed in 2012. They are continuous and higher than the broken Eastern Ghats.');

b.mcq('Indian Geography', 'Bhitarkanika, known for its mangroves and saltwater crocodiles, is located in:', ['West Bengal', 'Odisha', 'Andhra Pradesh', 'Gujarat'], 1,
  'Bhitarkanika lies in the Brahmani-Baitarani delta of Odisha and is a Ramsar site.');

b.many('Indian Geography', 'Consider the following statements:', [
  'The Andaman and the Nicobar groups of islands are separated by the Ten Degree Channel.',
  'The Lakshadweep islands are of coral origin.',
  "Barren Island, India's only active volcano, is in Lakshadweep.",
], [true, true, false],
  'Barren Island is in the Andaman Sea, part of the Andaman and Nicobar Islands.');

b.mcq('Indian Geography', 'Keibul Lamjao, the floating national park, is located on which lake?', ['Wular Lake', 'Loktak Lake', 'Chilika Lake', 'Dal Lake'], 1,
  'Keibul Lamjao lies on the phumdis (floating vegetation) of Loktak Lake in Manipur and is home to the sangai deer.');

b.pairs('Indian Geography', 'Consider the following pairs:', ['Mining area', 'Mineral'], [
  ['Jharia', 'Coal'],
  ['Khetri', 'Copper'],
  ['Kudremukh', 'Mica'],
], [true, true, false],
  'Kudremukh in Karnataka is known for iron ore.');

b.mcq('Indian Geography', 'Which of the following is a right-bank (southern) tributary of the Ganga?', ['Gandak', 'Kosi', 'Son', 'Ghaghara'], 2,
  'The Son rises in the Amarkantak plateau and joins the Ganga near Patna. The others are Himalayan left-bank tributaries.');

b.mcq('Indian Geography', "Indira Point, the southernmost point of India, is on:", ['Little Andaman', 'Great Nicobar', 'Minicoy', 'Rameswaram'], 1,
  'Indira Point is at the southern tip of Great Nicobar Island.');

b.two('Climatology', 'Consider the following statements:', [
  'Mawsynram in Meghalaya is among the wettest places on Earth.',
  'Leh is a cold desert.',
], [true, true],
  'Mawsynram and Cherrapunji receive very heavy orographic rainfall. Leh lies in the rain shadow of the Himalaya.');

// World geography
b.mcq('World Geography', 'The Strait of Malacca separates:', ['Sri Lanka and India', 'Malay Peninsula and Sumatra', 'Java and Borneo', 'Taiwan and mainland China'], 1,
  'The Strait of Malacca between the Malay Peninsula and Sumatra links the Indian Ocean with the South China Sea.');

b.pairs('World Geography', 'Consider the following pairs:', ['Strait', 'Connects'], [
  ['Strait of Hormuz', 'Persian Gulf and Gulf of Oman'],
  ['Bosphorus', 'Red Sea and Mediterranean Sea'],
  ['Bab-el-Mandeb', 'Red Sea and Gulf of Aden'],
], [true, false, true],
  'The Bosphorus connects the Black Sea with the Sea of Marmara. The Suez Canal links the Red Sea and the Mediterranean.');

b.mcq('World Geography', 'The Pampas grasslands are found in:', ['Argentina', 'Australia', 'South Africa', 'Hungary'], 0,
  'The Pampas are temperate grasslands of Argentina and Uruguay.');

b.pairs('World Geography', 'Consider the following pairs:', ['Grassland', 'Region'], [
  ['Downs', 'Australia'],
  ['Veld', 'South Africa'],
  ['Llanos', 'Venezuela and Colombia'],
], [true, true, true],
  'All three are correct. The Llanos are tropical grasslands of the Orinoco basin.');

b.mcq('World Geography', 'Which river carries the largest volume of water in the world?', ['Nile', 'Amazon', 'Yangtze', 'Mississippi'], 1,
  'The Amazon has by far the largest discharge, more than the next several rivers combined.');

b.two('World Geography', 'Consider the following statements:', [
  'The Equator passes through Lake Victoria.',
  'Both the Tropic of Cancer and the Tropic of Capricorn pass through Africa.',
], [true, true],
  'Africa is the only continent crossed by the Equator and both Tropics.');

b.mcq('World Geography', "The 'Ring of Fire' is associated with the margins of which ocean?", ['Atlantic', 'Indian', 'Pacific', 'Arctic'], 2,
  'Subduction zones around the Pacific produce most of the world’s earthquakes and volcanoes.');

b.mcq('World Geography', 'Which of the following countries does NOT border the Caspian Sea?', ['Kazakhstan', 'Iran', 'Turkey', 'Azerbaijan'], 2,
  'The Caspian is bordered by Russia, Kazakhstan, Turkmenistan, Iran and Azerbaijan.');

b.mcq('World Geography', 'Which of the following is a landlocked country?', ['Mongolia', 'Myanmar', 'Vietnam', 'Cambodia'], 0,
  'Mongolia lies between Russia and China with no coastline.');

b.two('Climatology', 'Consider the following statements about the Mediterranean type of climate:', [
  'Most of the rainfall occurs in summer.',
  'It is well known for the cultivation of citrus fruits.',
], [false, true],
  'Westerlies bring winter rain, while summers are hot and dry. Citrus fruits, grapes and olives are typical.');

b.mcq('World Geography', 'The Sahel is a semi-arid belt located:', ['North of the Sahara', 'South of the Sahara', 'In the Arabian Peninsula', 'In Central Asia'], 1,
  'The Sahel stretches across Africa between the Sahara to the north and the Sudanian savanna to the south.');

b.pairs('World Geography', 'Consider the following pairs:', ['Lake', 'Location'], [
  ['Lake Baikal', 'Russia'],
  ['Lake Titicaca', 'Chile and Argentina'],
  ['Lake Tanganyika', 'South America'],
], [true, false, false],
  'Lake Titicaca lies on the border of Peru and Bolivia. Lake Tanganyika is an African Great Lake, shared by Tanzania, the Democratic Republic of the Congo, Burundi and Zambia.');

export default b.list;
