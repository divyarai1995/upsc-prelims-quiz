import { bank } from './helpers';

const b = bank('gk', 'gk');

b.pairs('Reports & Indices', 'Consider the following pairs:', ['Report', 'Published by'], [
  ['World Economic Outlook', 'International Monetary Fund'],
  ['Global Gender Gap Report', 'World Economic Forum'],
  ['World Development Report', 'World Trade Organization'],
], [true, true, false],
  'The World Development Report is published by the World Bank.');

b.mcq('Reports & Indices', 'The Global Hunger Index is published by:', ['Food and Agriculture Organization', 'World Food Programme', 'Concern Worldwide and Welthungerhilfe', 'UNICEF'], 2,
  'The GHI is a joint publication of the Irish NGO Concern Worldwide and the German NGO Welthungerhilfe.');

b.mcq('Reports & Indices', "The World Bank's 'Doing Business' report was discontinued in 2021. Its replacement is called:", ['Business Ready (B-READY)', 'Global Competitiveness Index', 'Enterprise Surveys', 'Logistics Performance Index'], 0,
  'The World Bank launched B-READY as the successor to Doing Business.');

b.two('International Organisations', 'Consider the following statements about the UN Security Council:', [
  'It has five permanent members.',
  'Its ten non-permanent members are elected by the General Assembly for two-year terms.',
], [true, true],
  'The permanent members are China, France, Russia, the UK and the US. India has served several terms as a non-permanent member.');

b.mcq('International Organisations', 'The International Court of Justice is located in:', ['Geneva', 'New York', 'The Hague', 'Vienna'], 2,
  'The ICJ sits at the Peace Palace in The Hague, Netherlands.');

b.pairs('International Organisations', 'Consider the following pairs:', ['Organisation', 'Headquarters'], [
  ['UNESCO', 'Paris'],
  ['UNEP', 'New York'],
  ['FAO', 'Rome'],
  ['WHO', 'Geneva'],
], [true, false, true, true],
  'The UN Environment Programme is headquartered in Nairobi, Kenya. The other three pairs are correct.');

b.many('International Groupings', 'Consider the following statements:', [
  'India is a member of the Shanghai Cooperation Organisation.',
  'India is a member of the Gulf Cooperation Council.',
  'India is a member of Asia-Pacific Economic Cooperation (APEC).',
], [true, false, false],
  'India became a full SCO member in 2017. The GCC is a grouping of six Gulf monarchies, and India is not a member of APEC.');

b.mcq('International Groupings', 'Which of the following countries is NOT a member of BIMSTEC?', ['Bhutan', 'Thailand', 'Maldives', 'Myanmar'], 2,
  'BIMSTEC members are Bangladesh, Bhutan, India, Myanmar, Nepal, Sri Lanka and Thailand.');

b.mcq('International Groupings', 'Which of the following countries is NOT a member of SAARC?', ['Afghanistan', 'Myanmar', 'Maldives', 'Bhutan'], 1,
  'SAARC members are Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan and Sri Lanka.');

b.two('International Groupings', 'Consider the following statements about the G20:', [
  'India held the G20 presidency in 2023.',
  'The African Union became a permanent member of the G20 at the New Delhi Summit.',
], [true, true],
  'The New Delhi Summit in September 2023 admitted the African Union as a permanent member.');

b.mcq('Awards', 'In which year was the Bharat Ratna first awarded?', ['1950', '1954', '1962', '1971'], 1,
  'The first recipients in 1954 were C. Rajagopalachari, S. Radhakrishnan and C. V. Raman.');

b.pairs('Important Days', 'Consider the following pairs:', ['Day', 'Date'], [
  ['World Environment Day', '22 April'],
  ['World Water Day', '22 March'],
  ['National Science Day', '11 May'],
], [false, true, false],
  'World Environment Day is 5 June (22 April is Earth Day). National Science Day is 28 February; 11 May is National Technology Day.');

b.mcq('Important Days', 'National Science Day (28 February) commemorates:', ['The launch of Aryabhata', 'The discovery of the Raman effect', 'The founding of ISRO', "India's first nuclear test"], 1,
  'C. V. Raman announced the Raman effect on 28 February 1928.');

b.mcq('Awards', 'Who was the first Indian to win a Nobel Prize?', ['C. V. Raman', 'Rabindranath Tagore', 'Mother Teresa', 'Har Gobind Khorana'], 1,
  'Tagore won the Nobel Prize in Literature in 1913 for Gitanjali.');

b.pairs('Awards', 'Consider the following pairs:', ['Laureate', 'Nobel Prize category'], [
  ['C. V. Raman', 'Physics'],
  ['Har Gobind Khorana', 'Physics'],
  ['Kailash Satyarthi', 'Peace'],
], [true, false, true],
  'Har Gobind Khorana shared the 1968 Nobel Prize in Physiology or Medicine for work on the genetic code.');

b.pairs('Defence Exercises', 'Consider the following pairs:', ['Exercise', 'Partner country'], [
  ['Yudh Abhyas', 'United States'],
  ['Mitra Shakti', 'Nepal'],
  ['Garuda', 'Russia'],
], [true, false, false],
  'Mitra Shakti is with Sri Lanka (Surya Kiran is with Nepal). Garuda is an air force exercise with France; Indra is the exercise with Russia.');

b.mcq('Defence Exercises', "The 'Varuna' naval exercise is conducted between India and:", ['United States', 'France', 'Japan', 'Australia'], 1,
  'Varuna is the bilateral India–France naval exercise.');

b.two('Firsts', 'Consider the following statements:', [
  'Indira Gandhi was the first woman Prime Minister of India.',
  'Sarojini Naidu was the first woman President of India.',
], [true, false],
  'Indira Gandhi first became Prime Minister in 1966. Pratibha Patil became the first woman President in 2007; Sarojini Naidu was the first woman Governor of an Indian State (United Provinces).');

b.mcq('Indian States', 'Which State was the first to be formed on a linguistic basis, in 1953?', ['Andhra State', 'Kerala', 'Gujarat', 'Karnataka'], 0,
  "Andhra State was carved out of Madras State in 1953 after Potti Sriramulu's fast unto death.");

b.mcq('Sports', 'The Durand Cup is associated with which sport?', ['Hockey', 'Cricket', 'Football', 'Golf'], 2,
  "The Durand Cup, first held in 1888, is one of the world's oldest football tournaments.");

b.pairs('Sports', 'Consider the following pairs:', ['Trophy', 'Sport'], [
  ['Ranji Trophy', 'Cricket'],
  ['Davis Cup', 'Hockey'],
  ['Thomas Cup', 'Badminton'],
], [true, false, true],
  'The Davis Cup is the premier international team event in men’s tennis.');

b.mcq('International Organisations', 'The headquarters of the International Solar Alliance is located in:', ['Paris', 'Gurugram', 'Abu Dhabi', 'Nairobi'], 1,
  'The ISA secretariat is in Gurugram, Haryana, India.');

b.two('International Organisations', 'Consider the following statements about the International Solar Alliance:', [
  'It was launched by India and France at COP21 in Paris in 2015.',
  'Its membership is restricted to countries lying between the Tropics of Cancer and Capricorn.',
], [true, false],
  'The ISA framework was amended to open membership to all UN member states.');

b.mcq('Reports & Indices', "The 'State of the World's Forests' report is published by:", ['UNEP', 'FAO', 'IUCN', 'WWF'], 1,
  'The Food and Agriculture Organization publishes it. WWF publishes the Living Planet Report.');

b.mcq('Reports & Indices', "The 'Living Planet Report' is published by:", ['IUCN', 'WWF', 'UNEP', 'Greenpeace'], 1,
  "WWF's Living Planet Report tracks trends in global wildlife populations through the Living Planet Index.");

b.two('National Symbols', 'Consider the following statements:', [
  'The National Calendar of India is based on the Saka era.',
  "The National Song 'Vande Mataram' was composed by Bankim Chandra Chattopadhyay.",
], [true, true],
  'The Saka calendar was adopted in 1957. Vande Mataram appears in the novel Anandamath.');

b.mcq('National Symbols', 'The design of the Indian national flag is commonly credited to:', ['Pingali Venkayya', 'Bhikaiji Cama', 'Sarojini Naidu', 'Rabindranath Tagore'], 0,
  'Pingali Venkayya designed the flag on which the national flag adopted on 22 July 1947 was based.');

b.mcq('Indian States', 'Which is the largest State of India by area?', ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'], 2,
  'Rajasthan covers about 10.4% of India’s area. Madhya Pradesh is second.');

b.pairs('Culture', 'Consider the following pairs:', ['Festival', 'State'], [
  ['Bihu', 'Assam'],
  ['Hornbill Festival', 'Nagaland'],
  ['Onam', 'Kerala'],
], [true, true, true],
  'All three are correct. The Hornbill Festival is held in Nagaland every December.');

b.mcq('Indian States', 'Which State has the longest coastline in India?', ['Andhra Pradesh', 'Tamil Nadu', 'Gujarat', 'Maharashtra'], 2,
  'Gujarat has the longest coastline among Indian States.');

export default b.list;
