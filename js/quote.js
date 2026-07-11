/* Witt Co. — instant quote tool (residential + commercial modes)
   Rates are ballpark estimates; final pricing confirmed on-site. */

const RATES = {
  res: {
    size:  { small: 160, medium: 190, large: 230, xl: 275 },   // monthly, weekly service
    freq:  { weekly: 1, biweekly: 0.65 },
    extras: { spa: 25, salt: 15, trees: 20 },
    spread: 0.10,
  },
  com: {
    perVisit: { small: 65, medium: 80, large: 100, xl: 125 },  // per pool, per visit
    type:     { hoa: 1.0, hotel: 1.15, apartment: 1.05, gym: 0.95 },
    weeksPerMonth: 4.33,
    spread: 0.12,
  },
};

const EXTRA_LABELS = { spa: 'Spa / hot tub', salt: 'Saltwater system', trees: 'Heavy tree coverage' };
const SIZE_LABELS  = { small: 'Small (under 15k gal)', medium: 'Medium (15–25k gal)', large: 'Large (25–40k gal)', xl: 'Extra large (40k+ gal)' };
const TYPE_LABELS  = { hoa: 'HOA / community', hotel: 'Hotel / resort', apartment: 'Apartment complex', gym: 'Gym / fitness club' };

let mode = 'res';

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const val = name => { const el = document.querySelector(`input[name="${name}"]:checked`); return el ? el.value : null; };
const money = n => '$' + (Math.round(n / 5) * 5).toLocaleString();

function setMode(next) {
  mode = next;
  $('#mode-res').classList.toggle('active', mode === 'res');
  $('#mode-com').classList.toggle('active', mode === 'com');
  $('#mode-res').setAttribute('aria-pressed', mode === 'res');
  $('#mode-com').setAttribute('aria-pressed', mode === 'com');
  $('#panel-res').hidden = mode !== 'res';
  $('#panel-com').hidden = mode !== 'com';
  calc();
}

function calc() {
  const lines = [];
  let low, high, per = '/month';

  if (mode === 'res') {
    const size = val('res-size') || 'medium';
    const freq = val('res-freq') || 'weekly';
    let monthly = RATES.res.size[size] * RATES.res.freq[freq];

    lines.push([SIZE_LABELS[size], money(RATES.res.size[size]) + '/mo']);
    lines.push([freq === 'weekly' ? 'Weekly service' : 'Bi-weekly service', freq === 'weekly' ? 'included' : '× 0.65']);

    $$('input[name="res-extra"]:checked').forEach(x => {
      monthly += RATES.res.extras[x.value];
      lines.push([EXTRA_LABELS[x.value], '+' + money(RATES.res.extras[x.value]) + '/mo']);
    });

    low = monthly * (1 - RATES.res.spread);
    high = monthly * (1 + RATES.res.spread);

    if ($('#res-deepclean').checked) {
      lines.push(['First-visit deep clean (one-time)', '$250–$450']);
    }
  } else {
    const type   = val('com-type') || 'hoa';
    const size   = val('com-size') || 'medium';
    const visits = Number(val('com-visits') || 3);
    const pools  = Number($('#com-pools').value || 1);

    const perVisit = RATES.com.perVisit[size] * RATES.com.type[type];
    const monthly  = perVisit * visits * RATES.com.weeksPerMonth * pools;

    lines.push([TYPE_LABELS[type], '× ' + RATES.com.type[type].toFixed(2)]);
    lines.push([SIZE_LABELS[size], money(RATES.com.perVisit[size]) + '/visit']);
    lines.push([visits + '× per week', visits * RATES.com.weeksPerMonth % 1 ? '~' + Math.round(visits * RATES.com.weeksPerMonth) + ' visits/mo' : visits * RATES.com.weeksPerMonth + ' visits/mo']);
    lines.push([pools + (pools > 1 ? ' pools' : ' pool'), pools > 1 ? '× ' + pools : 'included']);

    low = monthly * (1 - RATES.com.spread);
    high = monthly * (1 + RATES.com.spread);
  }

  $('#est-mode-tag').textContent = (mode === 'res' ? 'Residential' : 'Commercial') + ' estimate';
  $('#est-price').textContent = money(low) + ' – ' + money(high);
  $('#est-per').textContent = per + (mode === 'com' ? ' · formal proposal after site walkthrough' : '');
  $('#est-lines').innerHTML = lines
    .map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`)
    .join('');
}

function summaryText() {
  const rows = [...$('#est-lines').querySelectorAll('li')]
    .map(li => '  • ' + li.children[0].textContent + ' — ' + li.children[1].textContent);
  return [
    'Quote request — ' + (mode === 'res' ? 'Residential' : 'Commercial'),
    '',
    'Estimated: ' + $('#est-price').textContent + ' ' + $('#est-per').textContent,
    ...rows,
    '',
    'Name: '  + ($('#q-name').value || '—'),
    'Phone: ' + ($('#q-phone').value || '—'),
    'Email: ' + ($('#q-email').value || '—'),
    'Notes: ' + ($('#q-notes').value || '—'),
  ].join('\n');
}

// wire up
$('#mode-res').addEventListener('click', () => setMode('res'));
$('#mode-com').addEventListener('click', () => setMode('com'));
$$('#quote-form input, #quote-form select').forEach(el => el.addEventListener('change', calc));

$('#quote-form').addEventListener('submit', e => {
  e.preventDefault();
  const subject = encodeURIComponent('Quote request — ' + (mode === 'res' ? 'Residential' : 'Commercial') + ' (' + $('#est-price').textContent + '/mo est.)');
  const body = encodeURIComponent(summaryText());
  window.location.href = `mailto:wittcopoolpros@gmail.com?subject=${subject}&body=${body}`;
  $('#q-sent').hidden = false;
});

// support ?mode=commercial deep links
setMode(new URLSearchParams(location.search).get('mode') === 'commercial' ? 'com' : 'res');
