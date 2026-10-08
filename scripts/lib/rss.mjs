// Minimal RSS 2.0 / Atom parser. No dependencies, good enough for news feeds.

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—', hellip: '…' };

export function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

/** CDATA unwrapped, tags stripped, entities decoded, whitespace collapsed. */
export function cleanText(s) {
  if (!s) return '';
  let t = s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  // Entity-encoded HTML (common in descriptions) is decoded first so its tags can be stripped.
  if (/&lt;\w/.test(t)) t = decodeEntities(t);
  t = t.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
  return decodeEntities(t).replace(/\s+/g, ' ').trim();
}

function tag(block, name) {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i');
  return re.exec(block)?.[1] ?? '';
}

export function parseFeed(xml) {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  return blocks
    .map((b) => {
      let link = cleanText(tag(b, 'link'));
      if (!link) link = /<link[^>]*href=["']([^"']+)["']/i.exec(b)?.[1] ?? '';
      if (!link) link = cleanText(tag(b, 'guid'));
      const rawDate = cleanText(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated') || tag(b, 'dc:date'));
      const date = rawDate ? new Date(rawDate) : null;
      return {
        title: cleanText(tag(b, 'title')),
        link: decodeEntities(link.trim()),
        date: date && !Number.isNaN(date.getTime()) ? date : null,
        summary: cleanText(tag(b, 'description') || tag(b, 'summary') || tag(b, 'content:encoded')),
      };
    })
    .filter((i) => i.title && i.link);
}
