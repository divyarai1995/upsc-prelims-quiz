import { bank } from './helpers';

const b = bank('environment', 'env');

b.mcq('Climate Change', 'Which of the following greenhouse gases has the highest global warming potential?', ['Carbon dioxide', 'Methane', 'Nitrous oxide', 'Sulphur hexafluoride'], 3,
  'SF6 has a 100-year GWP in the tens of thousands, far above methane and nitrous oxide. Carbon dioxide is the reference with a GWP of 1.');

b.two('Conventions', 'Consider the following statements:', [
  'The Montreal Protocol deals with substances that deplete the ozone layer.',
  'The Kigali Amendment to the Montreal Protocol aims to phase down hydrofluorocarbons (HFCs).',
], [true, true],
  'HFCs do not deplete ozone but are potent greenhouse gases. The 2016 Kigali Amendment added them to the Montreal Protocol.');

b.pairs('Conventions', 'Consider the following pairs:', ['Convention', 'Subject'], [
  ['Ramsar Convention', 'Wetlands'],
  ['Stockholm Convention', 'Protection of the ozone layer'],
  ['Basel Convention', 'Transboundary movement of hazardous wastes'],
], [true, false, true],
  'The Stockholm Convention deals with Persistent Organic Pollutants. The Vienna Convention and Montreal Protocol cover the ozone layer.');

b.mcq('Climate Change', 'The Paris Agreement aims to hold the increase in global average temperature to:', [
  'Below 1°C above pre-industrial levels',
  'Well below 2°C above pre-industrial levels, while pursuing efforts to limit it to 1.5°C',
  'Below 3°C above 1990 levels',
  'Below 2°C above 2015 levels',
], 1, 'Article 2 of the Paris Agreement sets the well-below-2°C goal with efforts towards 1.5°C, measured against pre-industrial levels.');

b.many('Biodiversity', 'Consider the following statements about biodiversity hotspots:', [
  'India has parts of four of the world’s biodiversity hotspots.',
  'The Nicobar Islands are part of the Sundaland hotspot.',
  'The Eastern Ghats are recognised as a separate global biodiversity hotspot.',
], [true, true, false],
  'The four hotspots are the Himalaya, Indo-Burma, Western Ghats and Sri Lanka, and Sundaland (Nicobar Islands). The Eastern Ghats are not a separate hotspot.');

b.mcq('Biodiversity', 'On the IUCN Red List, which category indicates the highest risk of extinction in the wild for a species that still exists in the wild?', ['Vulnerable', 'Endangered', 'Critically Endangered', 'Near Threatened'], 2,
  'The threatened categories in increasing order of risk are Vulnerable, Endangered and Critically Endangered. Beyond that come Extinct in the Wild and Extinct.');

b.two('Species', 'Consider the following statements about the Great Indian Bustard:', [
  'It is listed as Critically Endangered on the IUCN Red List.',
  'Its largest surviving population is in Rajasthan.',
], [true, true],
  'Most remaining birds are in the Thar, around the Desert National Park. Collisions with power lines are a major threat.');

b.mcq('Conservation', 'Project Tiger was launched in India in:', ['1952', '1973', '1986', '1992'], 1,
  'Project Tiger began in 1973. The National Tiger Conservation Authority was set up in 2006.');

b.pairs('Protected Areas', 'Consider the following pairs:', ['National Park', 'State'], [
  ['Kaziranga', 'Assam'],
  ['Bandipur', 'Karnataka'],
  ['Silent Valley', 'Kerala'],
], [true, true, true],
  'All three are correct. Bandipur adjoins Mudumalai (Tamil Nadu) and Wayanad (Kerala) in the Nilgiri Biosphere Reserve.');

b.mcq('Protected Areas', 'Which protected area is the only natural home of the Asiatic lion?', ['Ranthambore', 'Gir', 'Kuno', 'Sariska'], 1,
  'The wild population of Asiatic lions is confined to the Gir landscape of Gujarat.');

b.many('Laws & Institutions', 'Consider the following statements about the Wild Life (Protection) Act, 1972:', [
  'It provides for the protection of wild animals, birds and plants.',
  'Species listed in Schedule I receive the highest degree of protection.',
  'It was amended in 2022 to give effect to India’s obligations under CITES.',
], [true, true, true],
  'The 2022 amendment rationalised the schedules and added provisions to implement CITES.');

b.mcq('Protected Areas', 'Which was the first biosphere reserve established in India?', ['Sundarbans', 'Nilgiri', 'Nanda Devi', 'Gulf of Mannar'], 1,
  'The Nilgiri Biosphere Reserve was set up in 1986, spanning Tamil Nadu, Kerala and Karnataka.');

b.two('Laws & Institutions', 'Consider the following statements:', [
  'Eco-sensitive zones around protected areas are notified under the Environment (Protection) Act, 1986.',
  'The National Green Tribunal was established under the Environment (Protection) Act, 1986.',
], [true, false],
  'ESZs act as shock absorbers around protected areas. The NGT was set up under its own law, the National Green Tribunal Act, 2010.');

b.mcq('Pollution', 'Eutrophication of a water body is mainly caused by:', ['Excess heavy metals', 'Excess nutrients such as nitrogen and phosphorus', 'Low water temperature', 'Excess dissolved oxygen'], 1,
  'Nutrient run-off from fertilisers and sewage fuels algal blooms, which deplete dissolved oxygen when they decay.');

b.two('Ecology', 'Consider the following statements:', [
  'Energy flow in an ecosystem is unidirectional.',
  'On average, about 10% of energy is transferred from one trophic level to the next.',
], [true, true],
  "Energy does not cycle back to producers. Lindeman's 10% law describes the average transfer efficiency.");

b.mcq('Ecology', 'An inverted pyramid of biomass is typically found in:', ['A grassland ecosystem', 'A forest ecosystem', 'An aquatic ecosystem', 'A desert ecosystem'], 2,
  'In many aquatic systems the standing biomass of short-lived phytoplankton is smaller than that of the zooplankton feeding on them.');

b.ar('Ecology', 'The pyramid of energy is always upright.', 'Energy is lost, mostly as heat, at each trophic level.', 0,
  'Because each level receives less energy than the one below, the energy pyramid can never be inverted.');

b.pairs('Species', 'Consider the following pairs:', ['Species', 'Habitat'], [
  ['Hangul', 'Sikkim'],
  ['Sangai deer', 'Assam'],
  ['Nilgiri tahr', 'Western Ghats'],
], [false, false, true],
  'The Hangul (Kashmir stag) survives mainly in Dachigam National Park in Kashmir. The Sangai (brow-antlered deer) is found in Keibul Lamjao National Park in Manipur.');

b.mcq('Pollution', 'Which organisms are widely used as bio-indicators of sulphur dioxide air pollution?', ['Mosses', 'Lichens', 'Ferns', 'Algae'], 1,
  'Lichens are very sensitive to SO2 and disappear from polluted areas.');

b.two('Wetlands', 'Consider the following statements:', [
  'Chilika Lake and Keoladeo National Park were among the first Ramsar sites in India.',
  'The Montreux Record lists Ramsar sites where changes in ecological character have occurred or are likely to occur.',
], [true, true],
  'India designated Chilika and Keoladeo in 1981. Keoladeo is on the Montreux Record; Chilika was removed from it in 2002.');

b.mcq('Climate Change', "The term 'blue carbon' refers to carbon captured by:", ['Fossil fuel deposits', 'Ocean and coastal ecosystems', 'Polar ice sheets', 'Urban forests'], 1,
  'Mangroves, seagrasses and salt marshes store large amounts of carbon in their biomass and sediments.');

b.many('Climate Change', 'Consider the following statements:', [
  'The UNFCCC was adopted at the Rio Earth Summit in 1992.',
  'The Kyoto Protocol set binding emission targets for developed (Annex I) countries.',
  'A fund for responding to loss and damage was agreed at COP27 in Sharm el-Sheikh.',
], [true, true, true],
  'The UNFCCC opened for signature at Rio. Kyoto (1997) set binding targets only for developed countries. COP27 (2022) agreed to set up a loss and damage fund.');

b.mcq('Pollution', 'Which of the following is a primary air pollutant?', ['Ground-level ozone', 'Peroxyacetyl nitrate (PAN)', 'Sulphur dioxide', 'Photochemical smog'], 2,
  'Primary pollutants are emitted directly. Ozone, PAN and smog form through chemical reactions in the atmosphere.');

b.two('Pollution', "Consider the following statements about India's National Air Quality Index:", [
  'It considers eight pollutants.',
  'PM2.5 refers to particulate matter with a diameter of 2.5 micrometres or less.',
], [true, true],
  'The pollutants are PM10, PM2.5, NO2, SO2, CO, O3, NH3 and Pb.');

b.mcq('Ecosystems', 'Pneumatophores found in mangroves help the plants in:', ['Storing salt', 'Gas exchange (breathing)', 'Absorbing nutrients from leaves', 'Seed dispersal'], 1,
  'Pneumatophores are aerial roots that rise above waterlogged, oxygen-poor mud to take in air.');

b.pairs('Protected Areas', 'Consider the following pairs:', ['Tiger Reserve', 'State'], [
  ['Simlipal', 'Odisha'],
  ['Pench', 'Kerala'],
  ['Namdapha', 'Arunachal Pradesh'],
], [true, false, true],
  'Pench Tiger Reserve lies in Madhya Pradesh, and there is also a Pench reserve in Maharashtra.');

b.mcq('Ecosystems', 'The main cause of coral bleaching is:', ['Overfishing', 'Rise in sea surface temperature', 'Ocean currents', 'Volcanic activity'], 1,
  'Heat stress makes corals expel their symbiotic algae (zooxanthellae), turning them white.');

b.two('Ecosystems', 'Consider the following statements about coral reefs:', [
  'Reef-building corals live in a symbiotic relationship with zooxanthellae.',
  'Reef-building corals grow best in cold, deep waters.',
], [true, false],
  'Reef-building corals need warm, clear, shallow, sunlit water because their algae photosynthesise.');

b.mcq('Pollution', 'Biochemical Oxygen Demand (BOD) is a measure of:', ['Heavy metal content in water', 'Organic pollution in water', 'Salinity of water', 'Hardness of water'], 1,
  'BOD is the oxygen microbes need to break down organic matter. A higher BOD means more organic pollution.');

b.two('Biodiversity', 'Consider the following statements:', [
  'Water hyacinth is an invasive aquatic weed in India.',
  'Lantana camara is native to the Western Ghats.',
], [true, false],
  'Lantana camara is native to tropical America and is one of the most damaging invasive plants in Indian forests.');

b.mcq('Climate Change', 'Which of the following is NOT a greenhouse gas?', ['Water vapour', 'Nitrous oxide', 'Nitrogen', 'Methane'], 2,
  'Diatomic nitrogen does not absorb infrared radiation and is not a greenhouse gas.');

b.many('Ecology', 'Consider the following statements about ecological succession:', [
  'Lichens are often the pioneer species on bare rock.',
  'A climax community is relatively stable.',
  'Secondary succession is generally faster than primary succession.',
], [true, true, true],
  'Secondary succession starts where soil already exists, so it proceeds faster than primary succession on bare rock.');

b.mcq('Movements', 'The Chipko movement began in the early 1970s in which present-day State?', ['Himachal Pradesh', 'Uttarakhand', 'Karnataka', 'Rajasthan'], 1,
  'Chipko started in the Garhwal Himalaya (then in Uttar Pradesh, now Uttarakhand), with villagers hugging trees to prevent felling.');

b.pairs('Movements', 'Consider the following pairs:', ['Movement', 'Associated with'], [
  ['Chipko Movement', 'Sunderlal Bahuguna'],
  ['Appiko Movement', 'Karnataka'],
  ['Silent Valley Movement', 'Tamil Nadu'],
], [true, true, false],
  'The Silent Valley movement opposed a hydroelectric project in Kerala.');

b.mcq('Conservation', 'Which of the following is an in-situ method of conservation?', ['Seed bank', 'Botanical garden', 'Biosphere reserve', 'Zoological park'], 2,
  'In-situ conservation protects species in their natural habitat. The others are ex-situ methods.');

b.two('Laws & Institutions', 'Consider the following statements about the Compensatory Afforestation Fund Act, 2016:', [
  'Funds are collected from user agencies that divert forest land for non-forest purposes.',
  'Ninety per cent of the money collected is meant for the States.',
], [true, true],
  'The Act places 90% of the funds with State Compensatory Afforestation Funds and 10% with the National Fund.');

b.mcq('Ecology', 'A keystone species is one that:', [
  'Is the most abundant species in an ecosystem',
  'Has a disproportionately large effect on its ecosystem relative to its abundance',
  'Is found only in one geographical area',
  'Is the first to colonise a bare area',
], 1, 'Removing a keystone species, such as a top predator, can cause large changes in the ecosystem.');

b.ar('Wetlands', "Wetlands are often called the 'kidneys of the landscape'.", 'Wetlands filter sediments, nutrients and pollutants from the water passing through them.', 0,
  'Like kidneys, wetlands clean water flowing through the landscape.');

b.mcq('Species', 'Gahirmatha in Odisha is famous for the mass nesting of:', ['Leatherback turtles', 'Olive Ridley turtles', 'Green sea turtles', 'Saltwater crocodiles'], 1,
  "Gahirmatha is one of the world's largest mass nesting (arribada) sites of Olive Ridley turtles.");

b.two('Species', 'Consider the following statements about the Ganges river dolphin:', [
  'It is the National Aquatic Animal of India.',
  'It is practically blind and relies on echolocation.',
], [true, true],
  'It was declared the National Aquatic Animal in 2009. With very poorly developed eyes, it navigates and hunts using echolocation.');

b.mcq('Species', 'Which animal has been declared the National Heritage Animal of India?', ['Tiger', 'Elephant', 'Asiatic lion', 'Gaur'], 1,
  'The elephant was declared the National Heritage Animal in 2010. The tiger is the National Animal.');

b.many('Pollution', 'Consider the following statements:', [
  'Extended Producer Responsibility makes producers responsible for the management of their products after consumer use.',
  'Microplastics are plastic particles smaller than 5 mm.',
  'Biodegradable plastics break down completely in any natural environment within a few weeks.',
], [true, true, false],
  'Many biodegradable plastics need industrial composting conditions and persist much longer in soil or water.');

b.mcq('Ecosystems', 'Which of the following trees is typical of the tropical evergreen forests of India?', ['Teak', 'Ebony', 'Khair', 'Deodar'], 1,
  'Ebony, mahogany and rosewood are typical of tropical evergreen forests. Teak is a deciduous tree, khair grows in dry and thorn forests, and deodar is a Himalayan conifer.');

export default b.list;
