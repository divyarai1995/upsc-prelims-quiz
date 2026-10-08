// Scores news items for UPSC relevance with simple keyword rules.

export const CATEGORIES = {
  'Polity & Governance': ['constitution', 'supreme court', 'high court', 'parliament', 'lok sabha', 'rajya sabha', ' bill', ' act,', ' act ', 'amendment', 'election commission', 'governor', 'cabinet', 'ordinance', 'judiciary', 'tribunal', 'fundamental right', 'panchayat', 'delimitation', 'cag ', 'lokpal', 'cji', 'speaker', 'federal', 'centre-state', 'article '],
  Economy: ['rbi', 'repo', 'inflation', 'gdp', 'fiscal', 'budget', 'gst', ' tax', 'sebi', 'banking', ' bank ', 'rupee', 'exports', 'imports', 'trade deficit', 'fdi', 'msme', 'disinvestment', 'monetary', 'credit', 'insolvency', 'nabard', 'msp', 'agricultur', 'farm', 'economy', 'economic', 'fiscal deficit', 'current account', 'forex', 'upi', 'digital payment'],
  Environment: ['climate', 'emission', 'carbon', 'forest', 'wildlife', 'tiger', 'elephant', 'species', 'biodiversity', 'wetland', 'ramsar', 'pollution', 'air quality', 'cop3', 'unfccc', 'glacier', 'heatwave', 'cyclone', 'coral', 'mangrove', 'national park', 'sanctuary', 'renewable', 'solar', 'green hydrogen', 'net zero', 'iucn', 'endangered', 'monsoon', 'flood', 'drought'],
  'Science & Tech': ['isro', 'satellite', 'launch vehicle', 'space', 'nasa', 'quantum', 'artificial intelligence', ' ai ', 'semiconductor', 'vaccine', 'genome', ' gene', 'dna', 'drdo', 'missile', 'nuclear', 'scientists', 'discovery', 'telescope', 'chandrayaan', 'gaganyaan', 'supercomputer', '5g', '6g', 'cyber'],
  'International Relations': ['summit', 'bilateral', 'g20', 'g7', 'brics', 'sco ', 'quad', 'united nations', ' un ', 'treaty', 'agreement', 'mou', 'external affairs', 'foreign minister', 'imf', 'world bank', 'wto', 'asean', 'bimstec', 'saarc', 'diplomat', 'embassy', 'visit to'],
  'Schemes & Initiatives': ['scheme', 'yojana', 'mission', 'abhiyan', 'initiative', 'launched', 'portal', 'programme', 'pradhan mantri', 'pm-', 'flagship'],
  'Defence & Security': ['army', 'navy', 'air force', 'iaf', 'military exercise', 'joint exercise', 'defence', 'warship', 'coast guard', 'border', 'indigenous'],
  Health: ['health', 'disease', 'who ', 'outbreak', 'tuberculosis', 'malaria', 'nutrition', 'ayush', 'icmr', 'antimicrobial', 'pandemic', 'medical'],
  'Culture & Heritage': ['heritage', 'unesco', 'festival', 'temple', 'archaeolog', 'tribal', 'tribe', 'language', 'gi tag', 'geographical indication', 'inscription', 'excavation', 'classical'],
  'Reports & Indices': ['index', 'report', 'ranking', 'survey', 'ranked'],
};

const NEGATIVE = ['murder', 'arrested', 'rape', 'killed', 'accident', 'celebrity', 'film', 'actor', 'actress', 'box office', 'ipl', 'stabbed', 'horoscope', 'sensex', 'nifty', 'stock market', 'gold price', 'petrol price', 'bollywood', 'web series', 'trailer', 'dating', 'wedding', 'police said', 'fir ', 'gang'];

export function scoreItem(item, sourceBonus = 0) {
  const text = ` ${item.title} ${item.summary ?? ''} `.toLowerCase();
  let best = 'General';
  let bestHits = 0;
  let total = 0;
  for (const [cat, words] of Object.entries(CATEGORIES)) {
    const hits = words.filter((w) => text.includes(w)).length;
    total += hits;
    if (hits > bestHits) {
      bestHits = hits;
      best = cat;
    }
  }
  const neg = NEGATIVE.filter((w) => text.includes(w)).length;
  return { score: total + sourceBonus - neg * 3, category: best };
}

export function normaliseTitle(t) {
  return t
    .toLowerCase()
    .replace(/\s+-\s+[^-]+$/, '') // drop " - Publisher" suffix used by aggregators
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 90);
}
