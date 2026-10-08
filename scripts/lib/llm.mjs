// OpenAI-compatible chat client. Works with the free tiers of Google Gemini
// (default), Groq, OpenRouter and others that expose /chat/completions.

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/openai';
const GEMINI_MODELS = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash'];

export function llmConfig(env = process.env) {
  const apiKey = env.LLM_API_KEY || env.GEMINI_API_KEY || '';
  const baseUrl = (env.LLM_BASE_URL || GEMINI_BASE).replace(/\/+$/, '');
  const custom = !!env.LLM_BASE_URL && !env.LLM_BASE_URL.includes('generativelanguage.googleapis.com');
  const models = [env.LLM_MODEL, ...(custom ? [] : GEMINI_MODELS)].filter(Boolean);
  return { apiKey, baseUrl, models: [...new Set(models)] };
}

/** Extracts the first JSON object from a model reply, tolerating code fences. */
export function parseJsonLoose(text) {
  if (!text) throw new Error('Empty model reply');
  const cleaned = text.replace(/```(?:json)?/gi, '');
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('No JSON object in model reply');
  return JSON.parse(cleaned.slice(start, end + 1));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function chatJSON({ apiKey, baseUrl, models }, system, user, { fetchImpl = fetch, log = console.log } = {}) {
  if (!models.length) throw new Error('No model configured. Set LLM_MODEL.');
  let lastError;
  for (const model of models) {
    let useFormat = true;
    for (let attempt = 0; attempt < 3; attempt++) {
      const body = {
        model,
        temperature: 0.4,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        ...(useFormat ? { response_format: { type: 'json_object' } } : {}),
      };
      let res;
      try {
        res = await fetchImpl(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(120_000),
        });
      } catch (e) {
        lastError = e;
        log(`  ${model}: network error ${e.message}`);
        await sleep(5000);
        continue;
      }
      const text = await res.text();
      if (res.ok) {
        const data = JSON.parse(text);
        const content = data.choices?.[0]?.message?.content;
        return { model, json: parseJsonLoose(typeof content === 'string' ? content : JSON.stringify(content)) };
      }
      lastError = new Error(`${model}: HTTP ${res.status} ${text.slice(0, 300)}`);
      log(`  ${lastError.message}`);
      if (res.status === 400 && useFormat && /response_format|json/i.test(text)) {
        useFormat = false;
        continue;
      }
      if (res.status === 429 || res.status >= 500) {
        await sleep(15_000 * (attempt + 1));
        continue;
      }
      break; // 401/403/404 etc: try the next model
    }
  }
  throw lastError ?? new Error('All models failed');
}
