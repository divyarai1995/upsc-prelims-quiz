import { bank } from './helpers';

const b = bank('science', 'sci');

b.mcq('Health & Biology', 'Which vitamin is synthesised in human skin on exposure to sunlight?', ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'], 2,
  'Ultraviolet-B light converts a cholesterol derivative in the skin into vitamin D3.');

b.pairs('Health & Biology', 'Consider the following pairs:', ['Deficiency disease', 'Vitamin'], [
  ['Scurvy', 'Vitamin C'],
  ['Beriberi', 'Vitamin B12'],
  ['Night blindness', 'Vitamin A'],
  ['Rickets', 'Vitamin D'],
], [true, false, true, true],
  'Beriberi is caused by deficiency of vitamin B1 (thiamine); B12 deficiency causes pernicious anaemia. The other three pairs are correct.');

b.two('Health & Biology', 'Consider the following statements:', [
  'A person with blood group O negative is considered a universal donor of red blood cells.',
  'A person with blood group AB positive is considered a universal recipient.',
], [true, true],
  'O negative red cells carry no A, B or Rh antigens. AB positive plasma has no anti-A or anti-B antibodies.');

b.mcq('Health & Biology', 'Insulin is produced by:', ['Alpha cells of the pancreas', 'Beta cells of the pancreas', 'The liver', 'The adrenal glands'], 1,
  'Beta cells in the islets of Langerhans secrete insulin; alpha cells secrete glucagon.');

b.two('Biotechnology', 'Consider the following statements about mRNA vaccines:', [
  'They instruct cells to make a protein that triggers an immune response.',
  "They alter the recipient's DNA.",
], [true, false],
  'The mRNA stays in the cytoplasm, does not enter the nucleus, and is broken down after use. It cannot change DNA.');

b.mcq('Health & Biology', 'Antibiotics are effective against infections caused by:', ['Viruses', 'Bacteria', 'Prions', 'All microorganisms'], 1,
  'Antibiotics target bacterial structures such as cell walls and ribosomes. They do not work against viruses.');

b.many('Biotechnology', 'Consider the following statements:', [
  'CRISPR-Cas9 is a gene-editing tool.',
  'DNA fingerprinting relies on variable regions such as tandem repeats.',
  'In DNA, adenine pairs with uracil.',
], [true, true, false],
  'In DNA, adenine pairs with thymine. Uracil replaces thymine in RNA.');

b.mcq('Space', 'Chandrayaan-3’s Vikram lander touched down in August 2023 in which region of the Moon?', ['Near the north pole', 'Near the equator', 'Near the south pole', 'On the far side near the equator'], 2,
  'India became the first country to land near the lunar south polar region.');

b.two('Space', 'Consider the following statements about Aditya-L1:', [
  "It is India's first space-based mission to study the Sun.",
  'The Lagrange point L1 is about 1.5 million km from the Earth.',
], [true, true],
  'Aditya-L1 orbits around the Sun-Earth L1 point, which gives an uninterrupted view of the Sun.');

b.mcq('Space', 'Geostationary satellites orbit at an altitude of approximately:', ['400 km', '2,000 km', '20,200 km', '35,786 km'], 3,
  'At about 35,786 km above the Equator, the orbital period equals one sidereal day, so the satellite appears fixed in the sky. GPS satellites orbit near 20,200 km.');

b.pairs('Space', 'Consider the following pairs:', ['Launch vehicle', 'Description'], [
  ['LVM3', 'Launched Chandrayaan-3'],
  ['PSLV', 'Widely used for Sun-synchronous polar orbits'],
  ['SSLV', 'Designed to carry satellites heavier than 10 tonnes'],
], [true, true, false],
  'The Small Satellite Launch Vehicle carries satellites of up to about 500 kg to low Earth orbit.');

b.mcq('Space', 'NavIC (formerly IRNSS) is:', ["India's regional satellite navigation system", "India's crewed spaceflight programme", 'A weather forecasting satellite', 'A communication satellite for rural broadband'], 0,
  'NavIC provides positioning over India and the surrounding region, extending about 1,500 km beyond its borders.');

b.two('Energy', 'Consider the following statements:', [
  'Nuclear fission involves splitting heavy atomic nuclei.',
  'Commercial nuclear power plants today generate electricity through nuclear fusion.',
], [true, false],
  'All commercial reactors use fission. Fusion power is still experimental (for example ITER).');

b.mcq('Energy', "India's three-stage nuclear power programme is ultimately aimed at using:", ['Uranium-238', 'Plutonium-239', 'Thorium', 'Deuterium'], 2,
  "Homi Bhabha's plan uses India's large thorium reserves in the third stage, after pressurised heavy water reactors and fast breeder reactors.");

b.mcq('Physics & Chemistry', 'Which of the following is a semiconductor?', ['Copper', 'Silicon', 'Aluminium', 'Silver'], 1,
  'Silicon and germanium are semiconductors. Copper, aluminium and silver are conductors.');

b.two('Emerging Technology', 'Consider the following statements:', [
  'A qubit can exist in a superposition of the states 0 and 1.',
  'Quantum key distribution uses principles of quantum mechanics to exchange encryption keys securely.',
], [true, true],
  'Superposition and entanglement underlie quantum computing. QKD can reveal eavesdropping because measuring a quantum state disturbs it.');

b.mcq('Emerging Technology', 'LiDAR measures distance using:', ['Radio waves', 'Sound waves', 'Pulses of laser light', 'Infrared heat signatures'], 2,
  'LiDAR (Light Detection and Ranging) times the return of laser pulses to map surfaces in 3D.');

b.pairs('Emerging Technology', 'Consider the following pairs:', ['Term', 'Meaning'], [
  ['Blockchain', 'A distributed, tamper-resistant ledger'],
  ['Li-Fi', 'Data transmission using sound waves'],
  ['Edge computing', 'Processing data close to where it is generated'],
], [true, false, true],
  'Li-Fi transmits data using light, typically from LEDs.');

b.mcq('Physics & Chemistry', 'A light-year is a unit of:', ['Time', 'Distance', 'Speed', 'Luminosity'], 1,
  'A light-year is the distance light travels in one year, about 9.46 trillion km.');

b.two('Physics & Chemistry', 'Consider the following statements:', [
  'Sound travels faster in air than in steel.',
  'Light travels faster in water than in a vacuum.',
], [false, false],
  'Sound travels much faster in solids such as steel than in air. Light is fastest in a vacuum and slows in water (refractive index about 1.33).');

b.mcq('Physics & Chemistry', 'The blue colour of the clear sky is mainly due to:', ['Reflection', 'Refraction', 'Scattering of light', 'Dispersion by water droplets'], 2,
  'Air molecules scatter shorter (blue) wavelengths much more strongly than longer ones (Rayleigh scattering).');

b.ar('Physics & Chemistry', 'Ice floats on water.', 'Ice is less dense than liquid water.', 0,
  'Hydrogen bonds hold water molecules in an open lattice in ice, making it about 9% less dense than liquid water.');

b.mcq('Physics & Chemistry', "Which is the most abundant element in the Earth's crust by mass?", ['Silicon', 'Oxygen', 'Aluminium', 'Iron'], 1,
  "Oxygen makes up about 46% of the crust's mass, followed by silicon.");

b.many('Health & Biology', 'Consider the following statements:', [
  'Malaria is caused by a protozoan parasite.',
  'Tuberculosis is a bacterial disease.',
  'Dengue is caused by a bacterium.',
], [true, true, false],
  'Dengue is a viral disease spread by Aedes mosquitoes. Malaria is caused by Plasmodium; TB by Mycobacterium tuberculosis.');

b.mcq('Defence', 'BrahMos missiles are produced by a joint venture between India and:', ['France', 'Israel', 'Russia', 'United States'], 2,
  "BrahMos Aerospace is a joint venture of DRDO and Russia's NPO Mashinostroyeniya; the name joins the Brahmaputra and the Moskva.");

b.two('Defence', 'Consider the following statements:', [
  'Agni series missiles are ballistic missiles.',
  'BrahMos is a supersonic cruise missile.',
], [true, true],
  'Agni missiles follow a ballistic trajectory. BrahMos flies at around Mach 2.8 to 3 as a cruise missile.');

b.mcq('Health & Biology', 'Which organ of the human body produces bile?', ['Gall bladder', 'Liver', 'Pancreas', 'Stomach'], 1,
  'The liver produces bile; the gall bladder stores and concentrates it.');

b.two('Biotechnology', 'Consider the following statements:', [
  'Bt cotton carries a gene from the bacterium Bacillus thuringiensis.',
  'Golden Rice is genetically modified to produce beta-carotene.',
], [true, true],
  'The Bt gene produces a protein toxic to bollworms. Golden Rice was engineered to address vitamin A deficiency.');

b.mcq('Biotechnology', 'Stem cells are important in medicine mainly because they can:', ['Fight bacterial infections', 'Develop into specialised cell types', 'Produce antibodies on their own', 'Carry oxygen in blood'], 1,
  'Their ability to self-renew and differentiate makes them useful for regenerative medicine.');

b.mcq('Energy', "Which method of producing hydrogen is called 'green hydrogen'?", ['Steam reforming of natural gas', 'Coal gasification', 'Electrolysis of water using renewable electricity', 'Steam reforming of natural gas with carbon capture'], 2,
  'Green hydrogen uses renewable power for electrolysis. Grey hydrogen comes from natural gas and blue hydrogen adds carbon capture.');

b.two('Energy', 'Consider the following statements:', [
  'Lithium-ion batteries are used in most electric vehicles today.',
  'Sodium-ion batteries do not require lithium.',
], [true, true],
  'Sodium-ion batteries use abundant sodium, which can reduce dependence on lithium supply chains.');

b.mcq('Physics & Chemistry', 'A seismograph is used to record:', ['Atmospheric pressure', 'Earthquake waves', 'Humidity', 'Wind speed'], 1,
  'Seismographs record ground motion. Earthquake magnitude is expressed on scales such as the moment magnitude scale.');

b.many('Space', 'Consider the following statements:', [
  'The gravity of a black hole is so strong that even light cannot escape it.',
  'The Sun will end its life as a neutron star.',
  'The Sun is a neutron star.',
], [true, false, false],
  'The Sun is a main-sequence (G-type) star and is too light to become a neutron star; it will end as a white dwarf. Neutron stars form when much more massive stars collapse after a supernova.');

b.mcq('Emerging Technology', 'Large language models are primarily trained to:', ['Store a database of verified facts', 'Predict the next piece of text based on patterns in large datasets', 'Translate binary code into images', 'Control industrial robots'], 1,
  'LLMs learn statistical patterns from large text corpora by predicting the next token, and are then refined with further training.');

export default b.list;
