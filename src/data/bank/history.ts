import { bank } from './helpers';

const b = bank('history', 'his');

// Ancient India
b.mcq('Ancient India', 'Which Harappan site is known for a dockyard?', ['Kalibangan', 'Lothal', 'Dholavira', 'Banawali'], 1,
  'Lothal in Gujarat has a large brick basin widely interpreted as a dockyard, pointing to maritime trade.');

b.two('Ancient India', 'Consider the following statements about the Harappan civilisation:', [
  'Iron tools were widely used by the Harappans.',
  'The Great Bath was found at Mohenjo-daro.',
], [false, true],
  'The Harappans were a Bronze Age people; iron was unknown to them. The Great Bath is at Mohenjo-daro.');

b.mcq('Ancient India', 'The Gayatri Mantra is found in which Veda?', ['Rigveda', 'Samaveda', 'Yajurveda', 'Atharvaveda'], 0,
  'The Gayatri Mantra is in the third mandala of the Rigveda and is addressed to Savitr.');

b.pairs('Ancient India', 'Consider the following pairs:', ['Buddhist Council', 'Venue'], [
  ['First Council', 'Rajagriha'],
  ['Second Council', 'Pataliputra'],
  ['Fourth Council', 'Kashmir'],
], [true, false, true],
  'The Second Council was held at Vaishali under Kalasoka. The Third was at Pataliputra under Ashoka; the Fourth in Kashmir under Kanishka.');

b.mcq('Ancient India', 'Vardhamana Mahavira was born at:', ['Lumbini', 'Kundagrama', 'Pavapuri', 'Rajagriha'], 1,
  'Mahavira was born at Kundagrama near Vaishali and attained nirvana at Pavapuri. Lumbini is the birthplace of the Buddha.');

b.two('Ancient India', 'Consider the following statements about Ashoka:', [
  'All of his inscriptions are written in the Brahmi script.',
  'The Kalinga war is described in Major Rock Edict XIII.',
], [false, true],
  "Most Ashokan edicts are in Prakrit in Brahmi, but those in the north-west use Kharosthi, and Greek and Aramaic appear in Afghanistan. Rock Edict XIII records the Kalinga war and Ashoka's remorse.");

b.mcq('Ancient India', 'Megasthenes, the author of Indica, came to the court of:', ['Bindusara', 'Chandragupta Maurya', 'Ashoka', 'Kanishka'], 1,
  'Megasthenes was the ambassador of Seleucus Nicator to the court of Chandragupta Maurya at Pataliputra.');

b.two('Ancient India', 'Consider the following statements about the Gupta period:', [
  "Samudragupta's Prayag (Allahabad) Pillar inscription was composed by Harisena.",
  'The Chinese pilgrim Fa-Hien visited India during the reign of Chandragupta II.',
], [true, true],
  'Harisena, the court poet, composed the Prayag Prashasti. Fa-Hien travelled in India in the early fifth century, during the reign of Chandragupta II.');

b.mcq('Ancient India', 'The Tamil epic Silappadikaram was written by:', ['Kambar', 'Ilango Adigal', 'Sattanar', 'Tiruvalluvar'], 1,
  'Silappadikaram is attributed to Ilango Adigal. Sattanar wrote Manimekalai; Tiruvalluvar wrote the Tirukkural.');

b.many('Ancient India', 'Consider the following statements about the Chola period:', [
  'The Uttaramerur inscriptions describe village assemblies and their election procedure.',
  "Rajendra I assumed the title 'Gangaikonda Chola'.",
  'The Brihadeshwara temple at Thanjavur was built by Rajaraja I.',
], [true, true, true],
  "The Uttaramerur inscriptions (of Parantaka I) detail the sabha's committees and lot-based selection. Rajendra I took the title after his northern campaign. Rajaraja I built the Brihadeshwara temple.");

b.mcq('Ancient India', 'Nalanda Mahavihara was founded in the fifth century under the patronage of:', ['Harshavardhana', 'Kumaragupta I', 'Dharmapala', 'Ashoka'], 1,
  'Nalanda is associated with Kumaragupta I. Harsha was a later patron. Dharmapala of the Pala dynasty founded Vikramashila.');

b.mcq('Ancient India', 'The Chinese pilgrim Xuanzang (Hiuen Tsang) visited India during the reign of:', ['Chandragupta II', 'Harshavardhana', 'Pulakeshin I', 'Kanishka'], 1,
  'Xuanzang visited India in the seventh century during the reign of Harsha and studied at Nalanda.');

// Medieval India
b.mcq('Medieval India', 'The iqta system was institutionalised in the Delhi Sultanate by:', ['Qutbuddin Aibak', 'Iltutmish', 'Balban', 'Alauddin Khalji'], 1,
  'Iltutmish organised the iqta system, assigning revenue of territories to officers in return for administrative and military service.');

b.two('Medieval India', 'Consider the following statements about Alauddin Khalji:', [
  'He introduced market control measures to regulate prices in Delhi.',
  'He built the Qutub Minar.',
], [true, false],
  'Alauddin Khalji fixed prices and set up market controls. The Qutub Minar was begun by Qutbuddin Aibak and completed by Iltutmish.');

b.mcq('Medieval India', 'The Battle of Talikota (1565) led to the decline of which kingdom?', ['Bahmani Sultanate', 'Vijayanagara', 'Kakatiya', 'Hoysala'], 1,
  'An alliance of Deccan Sultanates defeated Vijayanagara at Talikota (Rakkasa-Tangadi), and its capital Hampi was sacked.');

b.pairs('Medieval India', 'Consider the following pairs:', ['Saint', 'Associated with'], [
  ['Surdas', 'Ramcharitmanas'],
  ['Tukaram', 'Punjab'],
  ['Chaitanya Mahaprabhu', 'Bengal'],
], [false, false, true],
  'Ramcharitmanas was written by Tulsidas; Surdas is known for the Sursagar. Tukaram was a Varkari saint of Maharashtra. Chaitanya popularised Krishna bhakti in Bengal and Odisha.');

b.mcq('Medieval India', 'The Dahsala (Zabti) system of land revenue under Akbar is associated with:', ['Birbal', 'Raja Todar Mal', 'Abul Fazl', 'Raja Man Singh'], 1,
  'Raja Todar Mal developed the Dahsala system, in which revenue was fixed on the average produce and prices of the previous ten years.');

b.two('Medieval India', 'Consider the following statements:', [
  'Akbar promulgated the Din-i-Ilahi (Tauhid-i-Ilahi).',
  'The Buland Darwaza at Fatehpur Sikri was built by Shah Jahan.',
], [true, false],
  'Akbar built the Buland Darwaza to commemorate his Gujarat campaign. Shah Jahan built the Taj Mahal and the Red Fort in Delhi.');

b.mcq('Medieval India', 'The council of ministers under Shivaji was known as:', ['Ashtapradhan', 'Panch Mahal', 'Diwan-i-Khas', 'Majlis-i-Khalwat'], 0,
  'The Ashtapradhan was a council of eight ministers, headed by the Peshwa.');

b.mcq('Medieval India', 'Who wrote the Ain-i-Akbari?', ['Badauni', 'Abul Fazl', 'Faizi', 'Nizamuddin Ahmad'], 1,
  'Abul Fazl wrote the Akbarnama, of which the Ain-i-Akbari is the third volume describing administration and society.');

b.two('Medieval India', 'Consider the following statements about Sufism in India:', [
  'The Chishti order was established in India by Khwaja Moinuddin Chishti.',
  'Nizamuddin Auliya belonged to the Suhrawardi order.',
], [true, false],
  'Moinuddin Chishti settled at Ajmer. Nizamuddin Auliya of Delhi was a Chishti saint. The Suhrawardi order was strong in Multan.');

b.mcq('Medieval India', 'The Vijayanagara Empire was founded in 1336 by:', ['Krishnadeva Raya', 'Harihara and Bukka', 'Deva Raya II', 'Alauddin Hasan Bahman Shah'], 1,
  'Harihara I and Bukka Raya of the Sangama dynasty founded Vijayanagara. Alauddin Hasan Bahman Shah founded the Bahmani Sultanate in 1347.');

// Modern India
b.mcq('Modern India', 'The Permanent Settlement of Bengal (1793) was introduced by:', ['Warren Hastings', 'Lord Cornwallis', 'Lord Wellesley', 'Lord Dalhousie'], 1,
  'Lord Cornwallis introduced the Permanent Settlement, fixing land revenue with zamindars in perpetuity.');

b.pairs('Modern India', 'Consider the following pairs:', ['Policy or measure', 'Governor-General / Viceroy'], [
  ['Subsidiary Alliance', 'Lord Wellesley'],
  ['Vernacular Press Act', 'Lord Ripon'],
  ['Doctrine of Lapse', 'Lord Dalhousie'],
], [true, false, true],
  'The Vernacular Press Act (1878) was passed under Lord Lytton. Lord Ripon repealed it in 1882.');

b.mcq('Modern India', 'The first session of the Indian National Congress in 1885 was presided over by:', ['Dadabhai Naoroji', 'W. C. Bonnerjee', 'Surendranath Banerjee', 'A. O. Hume'], 1,
  'The first session was held in Bombay in December 1885 under W. C. Bonnerjee. A. O. Hume was a founder.');

b.two('Modern India', 'Consider the following statements regarding the Partition of Bengal:', [
  'It was announced during the viceroyalty of Lord Curzon.',
  'It was annulled in 1919 as part of the Montagu-Chelmsford Reforms.',
], [true, false],
  'Bengal was partitioned in 1905 under Curzon, sparking the Swadeshi movement. The partition was revoked in 1911, announced at the Delhi Durbar.');

b.mcq('Modern India', 'The All-India Muslim League was founded in 1906 at:', ['Lucknow', 'Aligarh', 'Dhaka', 'Lahore'], 2,
  'It was founded at Dhaka in December 1906 during the All-India Muhammadan Educational Conference.');

b.mcq('Modern India', 'The split between the Moderates and Extremists in the Congress took place at which session?', ['Calcutta, 1906', 'Surat, 1907', 'Lucknow, 1916', 'Lahore, 1929'], 1,
  'The Congress split at Surat in 1907. The two factions reunited at Lucknow in 1916.');

b.many('Modern India', "Consider the following statements about Gandhi's early movements in India:", [
  'The Champaran Satyagraha (1917) concerned indigo cultivators.',
  'The Kheda Satyagraha (1918) sought remission of land revenue after crop failure.',
  'During the Ahmedabad mill strike (1918), Gandhi undertook a fast.',
], [true, true, true],
  'Champaran opposed the tinkathia system of indigo cultivation. Kheda was a no-revenue campaign. In Ahmedabad, Gandhi fasted to support the mill workers, who won a wage increase.');

b.mcq('Modern India', 'Which committee was appointed by the government to inquire into the Jallianwala Bagh massacre?', ['Hunter Committee', 'Simon Commission', 'Butler Committee', 'Muddiman Committee'], 0,
  'The Disorders Inquiry Committee under Lord William Hunter was set up in 1919. The Congress conducted its own inquiry too.');

b.two('Modern India', 'Consider the following statements about the Non-Cooperation Movement:', [
  'It was withdrawn after the Chauri Chaura incident of 1922.',
  'The Khilafat question was one of its causes.',
], [true, true],
  'Gandhi called off the movement after a mob burnt a police station at Chauri Chaura in February 1922. The Khilafat issue was merged into the movement.');

b.mcq('Modern India', "The 'Purna Swaraj' resolution was adopted at which Congress session?", ['Calcutta, 1928', 'Lahore, 1929', 'Karachi, 1931', 'Haripura, 1938'], 1,
  'The Lahore session of December 1929, presided over by Jawaharlal Nehru, adopted complete independence as the goal. 26 January 1930 was observed as Independence Day.');

b.ar('Modern India', 'The Simon Commission was boycotted by most Indian political parties.', 'The Simon Commission did not include any Indian member.', 0,
  'The all-white composition of the commission, set up in 1927 to review the 1919 reforms, was the main reason for the boycott.');

b.pairs('Modern India', 'Consider the following pairs:', ['Newspaper', 'Associated with'], [
  ['Kesari', 'Bal Gangadhar Tilak'],
  ['Al-Hilal', 'Maulana Abul Kalam Azad'],
  ['New India', 'Annie Besant'],
], [true, true, true],
  "All three are correct. Annie Besant ran New India and Commonweal during the Home Rule movement. (Amrita Bazar Patrika, often used as a distractor, was started by Sisir Kumar Ghosh and Motilal Ghosh.)");

b.mcq('Modern India', 'The Quit India resolution was passed in August 1942 at a session held in:', ['Wardha', 'Bombay', 'Calcutta', 'Delhi'], 1,
  "The AICC passed the resolution at Gowalia Tank, Bombay, on 8 August 1942, where Gandhi gave the call 'Do or Die'.");

b.two('Modern India', 'Consider the following statements about the Cabinet Mission (1946):', [
  'It proposed the setting up of a Constituent Assembly.',
  'It recommended the partition of India into two dominions.',
], [true, false],
  'The Cabinet Mission rejected the demand for a separate Pakistan and proposed a three-tier federal structure with groupings of provinces. Partition came with the Mountbatten Plan of 1947.');

b.mcq('Modern India', 'The Brahmo Samaj was founded by:', ['Debendranath Tagore', 'Raja Ram Mohan Roy', 'Keshab Chandra Sen', 'Ishwar Chandra Vidyasagar'], 1,
  'Raja Ram Mohan Roy founded the Brahmo Sabha in 1828, later called the Brahmo Samaj.');

b.pairs('Modern India', 'Consider the following pairs:', ['Organisation', 'Founder'], [
  ['Arya Samaj', 'Swami Dayananda Saraswati'],
  ['Satyashodhak Samaj', 'Raja Ram Mohan Roy'],
  ['Prarthana Samaj', 'Ishwar Chandra Vidyasagar'],
], [true, false, false],
  'The Satyashodhak Samaj was founded by Jyotiba Phule in 1873. The Prarthana Samaj was founded in Bombay in 1867 by Atmaram Pandurang, with M. G. Ranade as a leading figure.');

b.mcq('Modern India', 'The Ghadar Party was founded in 1913 in:', ['Canada', 'United States', 'United Kingdom', 'Germany'], 1,
  'The Ghadar Party was formed in San Francisco, with Lala Har Dayal among its leaders.');

b.mcq('Modern India', 'The Poona Pact of 1932 was signed between:', ['Gandhi and Jinnah', 'Gandhi and B. R. Ambedkar', 'Nehru and Ambedkar', 'Gandhi and Lord Irwin'], 1,
  'The Poona Pact replaced separate electorates for the Depressed Classes (under the Communal Award) with reserved seats in joint electorates.');

b.two('Modern India', 'Consider the following statements about the Revolt of 1857:', [
  'Rani Lakshmibai led the revolt at Lucknow.',
  'Begum Hazrat Mahal led the revolt at Kanpur.',
], [false, false],
  'Rani Lakshmibai led the revolt at Jhansi and Begum Hazrat Mahal at Lucknow. Nana Saheb and Tantia Tope led at Kanpur, and Kunwar Singh in Bihar.');

// Art and Culture
b.mcq('Art & Culture', 'Kuchipudi is a classical dance form that originated in:', ['Tamil Nadu', 'Andhra Pradesh', 'Kerala', 'Odisha'], 1,
  'Kuchipudi takes its name from a village in Krishna district, Andhra Pradesh.');

b.pairs('Art & Culture', 'Consider the following pairs:', ['Classical dance', 'State'], [
  ['Sattriya', 'Odisha'],
  ['Mohiniyattam', 'Tamil Nadu'],
  ['Kuchipudi', 'Kerala'],
], [false, false, false],
  'None is correct. Sattriya is from Assam, Mohiniyattam from Kerala and Kuchipudi from Andhra Pradesh. Odisha has Odissi and Tamil Nadu has Bharatanatyam.');

b.mcq('Art & Culture', 'The Ajanta caves are best known for:', ['Jain sculptures', 'Buddhist murals and sculptures', 'Rock-cut Shiva temples', 'Mughal miniature paintings'], 1,
  'Ajanta has Buddhist chaityas and viharas with celebrated murals of Jataka stories, mostly from the Vakataka period.');

b.two('Art & Culture', 'Consider the following statements about temple architecture:', [
  'The Nagara style is mainly associated with northern India.',
  'The Vesara style is mainly found in Kashmir.',
], [true, false],
  'Vesara, a blend of Nagara and Dravida, is found in the Deccan, notably in Chalukya and Hoysala temples.');

b.mcq('Art & Culture', 'The Sun Temple at Konark was built by a ruler of which dynasty?', ['Chola', 'Eastern Ganga', 'Pala', 'Rashtrakuta'], 1,
  'Narasimhadeva I of the Eastern Ganga dynasty built it in the thirteenth century. It is a UNESCO World Heritage Site.');

b.mcq('Art & Culture', 'The Kailasa temple at Ellora was built under which dynasty?', ['Chalukyas of Badami', 'Rashtrakutas', 'Pallavas', 'Hoysalas'], 1,
  'The monolithic Kailasa temple (Cave 16) is attributed to the Rashtrakuta king Krishna I.');

b.pairs('Art & Culture', 'Consider the following pairs:', ['Musician', 'Associated with'], [
  ['Thyagaraja', 'Carnatic music'],
  ['Tansen', 'Court of Akbar'],
  ['Purandara Dasa', 'Hindustani music'],
], [true, true, false],
  "Purandara Dasa is called the 'Pitamaha' (father) of Carnatic music.");

b.mcq('Art & Culture', 'Madhubani painting is a traditional art form of:', ['Bihar', 'Odisha', 'Rajasthan', 'Gujarat'], 0,
  'Madhubani (Mithila) painting comes from the Mithila region of Bihar.');

b.mcq('Art & Culture', 'The Gandhara school of art flourished mainly under the patronage of the:', ['Mauryas', 'Kushanas', 'Guptas', 'Satavahanas'], 1,
  'Gandhara art, with its Greco-Roman influence, flourished under the Kushanas, especially Kanishka.');

b.two('Art & Culture', 'Consider the following statements:', [
  'The Gandhara school shows strong Greco-Roman influence.',
  'The Mathura school mainly used grey-blue schist.',
], [true, false],
  'Mathura sculptors used spotted red sandstone. Grey schist is characteristic of Gandhara.');

export default b.list;
