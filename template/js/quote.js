/* ══════════════════════════════════════════════════════════
   BLANK TEMPLATE — quote tool logic

   FILL IN two things:
     1. RATES below — the real numbers (see BRIEF.md §6)
     2. The *_LABELS maps — the wording shown in the estimate breakdown
   The option values (t1, f1, e1…) must match the input values in quote.html.
   ══════════════════════════════════════════════════════════ */

const RATES = {
  // ── MODE A ──────────────────────────────────────────────
  a: {
    tier:   { t1: 0, t2: 0, t3: 0, t4: 0 },  // base price per tier
    freq:   { f1: 1, f2: 1 },                 // multiplier per frequency
    extras: { e1: 0, e2: 0, e3: 0 },          // flat amount added per add-on
    spread: 0.10,                             // ±10% shown as a range
  },
  // ── MODE B ──────────────────────────────────────────────
  b: {
    tier:      { t1: 0, t2: 0, t3: 0, t4: 0 },        // base price per visit
    type:      { y1: 1, y2: 1, y3: 1, y4: 1 },        // multiplier per property type
    perPeriod: 4.33,                                   // weeks per month
    spread:    0.12,
  },
};

// Wording used in the estimate breakdown — must cover every option value above.
const TIER_LABELS_A = { t1: '{{A_TIER_1}}', t2: '{{A_TIER_2}}', t3: '{{A_TIER_3}}', t4: '{{A_TIER_4}}' };
const FREQ_LABELS   = { f1: '{{A_FREQ_1}}', f2: '{{A_FREQ_2}}' };
const EXTRA_LABELS  = { e1: '{{A_EXTRA_1}}', e2: '{{A_EXTRA_2}}', e3: '{{A_EXTRA_3}}' };
const TIER_LABELS_B = { t1: '{{B_TIER_1}}', t2: '{{B_TIER_2}}', t3: '{{B_TIER_3}}', t4: '{{B_TIER_4}}' };
const TYPE_LABELS   = { y1: '{{B_TYPE_1}}', y2: '{{B_TYPE_2}}', y3: '{{B_TYPE_3}}', y4: '{{B_TYPE_4}}' };

const PER_LABEL = '/{{PRICE_PERIOD}}';        // e.g. "/month", "/visit", "/job"
const SEND_TO   = '{{EMAIL}}';

let mode = 'a';

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const val = name => { const el = document.querySelector(`input[name="${name}"]:checked`); return el ? el.value : null; };
const money = n => '$' + (Math.round(n / 5) * 5).toLocaleString();

function setMode(next) {
  mode = next;
  $('#mode-a').classList.toggle('active', mode === 'a');
  $('#mode-b').classList.toggle('active', mode === 'b');
  $('#mode-a').setAttribute('aria-pressed', mode === 'a');
  $('#mode-b').setAttribute('aria-pressed', mode === 'b');
  $('#panel-a').hidden = mode !== 'a';
  $('#panel-b').hidden = mode !== 'b';
  calc();
}

function calc() {
  const lines = [];
  let low, high;

  if (mode === 'a') {
    const tier = val('a-tier') || 't2';
    const freq = val('a-freq') || 'f1';
    let total = RATES.a.tier[tier] * RATES.a.freq[freq];

    lines.push([TIER_LABELS_A[tier], money(RATES.a.tier[tier]) + PER_LABEL]);
    lines.push([FREQ_LABELS[freq], RATES.a.freq[freq] === 1 ? 'included' : '× ' + RATES.a.freq[freq]]);

    $$('input[name="a-extra"]:checked').forEach(x => {
      total += RATES.a.extras[x.value];
      lines.push([EXTRA_LABELS[x.value], '+' + money(RATES.a.extras[x.value]) + PER_LABEL]);
    });

    low  = total * (1 - RATES.a.spread);
    high = total * (1 + RATES.a.spread);
  } else {
    const type   = val('b-type') || 'y1';
    const tier   = val('b-tier') || 't2';
    const visits = Number(val('b-visits') || 1);
    const qty    = Number($('#b-qty').value || 1);

    const each  = RATES.b.tier[tier] * RATES.b.type[type];
    const total = each * visits * RATES.b.perPeriod * qty;

    lines.push([TYPE_LABELS[type], '× ' + RATES.b.type[type].toFixed(2)]);
    lines.push([TIER_LABELS_B[tier], money(RATES.b.tier[tier]) + '/visit']);
    lines.push([visits + '× per week', '~' + Math.round(visits * RATES.b.perPeriod) + ' visits']);
    lines.push([qty + (qty > 1 ? ' locations' : ' location'), qty > 1 ? '× ' + qty : 'included']);

    low  = total * (1 - RATES.b.spread);
    high = total * (1 + RATES.b.spread);
  }

  $('#est-mode-tag').textContent = (mode === 'a' ? '{{MODE_A_NAME}}' : '{{MODE_B_NAME}}') + ' estimate';
  $('#est-price').textContent = money(low) + ' – ' + money(high);
  $('#est-per').textContent = PER_LABEL;
  $('#est-lines').innerHTML = lines.map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join('');
}

function summaryText() {
  const rows = [...$('#est-lines').querySelectorAll('li')]
    .map(li => '  • ' + li.children[0].textContent + ' — ' + li.children[1].textContent);
  return [
    'Quote request — ' + (mode === 'a' ? '{{MODE_A_NAME}}' : '{{MODE_B_NAME}}'),
    '',
    'Estimated: ' + $('#est-price').textContent + ' ' + $('#est-per').textContent,
    ...rows,
    '',
    'Name: '  + ($('#q-name').value  || '—'),
    'Phone: ' + ($('#q-phone').value || '—'),
    'Email: ' + ($('#q-email').value || '—'),
    'Notes: ' + ($('#q-notes').value || '—'),
  ].join('\n');
}

$('#mode-a').addEventListener('click', () => setMode('a'));
$('#mode-b').addEventListener('click', () => setMode('b'));
$$('#quote-form input, #quote-form select').forEach(el => el.addEventListener('change', calc));

$('#quote-form').addEventListener('submit', e => {
  e.preventDefault();
  const subject = encodeURIComponent('Quote request — ' + (mode === 'a' ? '{{MODE_A_NAME}}' : '{{MODE_B_NAME}}'));
  const body = encodeURIComponent(summaryText());
  window.location.href = `mailto:${SEND_TO}?subject=${subject}&body=${body}`;
  $('#q-sent').hidden = false;
});

// deep link: quote.html?mode=b opens the second mode
setMode(new URLSearchParams(location.search).get('mode') === 'b' ? 'b' : 'a');
