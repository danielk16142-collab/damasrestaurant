/**
 * Smart multi-step enquiry form. The path branches on the first answer
 * (buy / sell / both / viewing / relocate), validates each step, and keeps a
 * draft in localStorage. Submission is simulated for the showcase; wire
 * `submitEnquiry` to Wix Forms (or any CRM endpoint) when going live.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/form.css';

type Intent = 'buy' | 'sell' | 'both' | 'viewing' | 'relocate';

interface Data {
  intent: Intent | '';
  property: string;
  areas: string[];
  types: string[];
  budget: string;
  timeline: string;
  financing: string;
  address: string;
  propertyType: string;
  beds: string;
  expectation: string;
  viewingMode: string;
  days: string[];
  timeOfDay: string;
  name: string;
  email: string;
  phone: string;
  contactBy: string;
  message: string;
  consent: boolean;
}

const EMPTY: Data = {
  intent: '', property: '', areas: [], types: [], budget: '', timeline: '', financing: '',
  address: '', propertyType: '', beds: '', expectation: '', viewingMode: '', days: [], timeOfDay: '',
  name: '', email: '', phone: '', contactBy: 'Email', message: '', consent: false,
};

interface Props {
  areas: { slug: string; name: string }[];
  types: string[];
  properties: { slug: string; name: string }[];
}

const INTENTS: { value: Intent; title: string; text: string }[] = [
  { value: 'buy', title: 'Buy a home', text: 'Private search and off-market access' },
  { value: 'sell', title: 'Sell a home', text: 'Valuation and a considered launch' },
  { value: 'both', title: 'Buy and sell', text: 'Coordinate both moves' },
  { value: 'viewing', title: 'Book a viewing', text: 'See a listed home in person or on video' },
  { value: 'relocate', title: 'Relocate', text: 'Moving to Nashville from elsewhere' },
];

const STEP_LABELS: Record<string, string> = {
  intent: 'Intent', search: 'Search', budget: 'Budget', property: 'Property', plans: 'Plans', viewing: 'Viewing', contact: 'Contact',
};

function stepsFor(intent: Data['intent']): string[] {
  switch (intent) {
    case 'buy':
    case 'relocate':
      return ['intent', 'search', 'budget', 'contact'];
    case 'sell':
      return ['intent', 'property', 'plans', 'contact'];
    case 'both':
      return ['intent', 'property', 'search', 'budget', 'contact'];
    case 'viewing':
      return ['intent', 'viewing', 'contact'];
    default:
      return ['intent', 'search', 'budget', 'contact'];
  }
}

const DRAFT_KEY = 'vertice-enquiry-draft';

async function submitEnquiry(data: Data) {
  // Showcase: simulate the network. Replace with a POST to Wix Forms / CRM.
  await new Promise((r) => setTimeout(r, 1100));
  return { ok: true, data };
}

function Pills({ options, value, onChange, multi = false, name }: {
  options: string[]; value: string | string[]; onChange: (v: any) => void; multi?: boolean; name: string;
}) {
  const selected = (o: string) => (multi ? (value as string[]).includes(o) : value === o);
  const toggle = (o: string) => {
    if (!multi) return onChange(o);
    const arr = value as string[];
    onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
  };
  return (
    <div className="pills" role="group" aria-label={name}>
      {options.map((o) => (
        <button type="button" key={o} className="pill" aria-pressed={selected(o)} onClick={() => toggle(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export default function InquiryForm({ areas, types, properties }: Props) {
  const [data, setData] = useState<Data>(EMPTY);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const topRef = useRef<HTMLDivElement>(null);

  // Restore a draft, then let URL params (?intent=, ?property=, ?area=) take priority.
  useEffect(() => {
    let draft: Partial<Data> = {};
    try {
      draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
    } catch {}
    const q = new URLSearchParams(window.location.search);
    const intent = q.get('intent') as Intent | null;
    const property = q.get('property');
    const area = q.get('area');
    const next: Data = { ...EMPTY, ...draft, consent: false };
    if (property && properties.some((p) => p.slug === property)) {
      next.property = property;
      next.intent = intent && INTENTS.some((i) => i.value === intent) ? intent : 'viewing';
    } else if (intent && INTENTS.some((i) => i.value === intent)) {
      next.intent = intent;
    }
    if (area && areas.some((a) => a.slug === area) && !next.areas.includes(area)) next.areas = [...next.areas, area];
    setData(next);
    if (intent || property) {
      setStep(1);
    }
  }, []);

  useEffect(() => {
    try {
      const { consent, ...rest } = data;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
    } catch {}
  }, [data]);

  const steps = useMemo(() => stepsFor(data.intent), [data.intent]);
  const current = steps[step];
  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => {
      const { [k as string]: _, ...rest } = e;
      return rest;
    });
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (current === 'intent' && !data.intent) e.intent = 'Choose one to continue.';
    if (current === 'budget') {
      if (!data.budget) e.budget = 'Choose a budget range.';
      if (!data.timeline) e.timeline = 'Choose a timeline.';
    }
    if (current === 'property') {
      if (data.address.trim().length < 5) e.address = 'Enter the property address or street.';
      if (!data.propertyType) e.propertyType = 'Choose a property type.';
    }
    if (current === 'plans' && !data.timeline) e.timeline = 'Choose a timeline.';
    if (current === 'viewing') {
      if (!data.property) e.property = 'Choose a home to view.';
      if (!data.viewingMode) e.viewingMode = 'Choose in person or video.';
    }
    if (current === 'contact') {
      if (data.name.trim().length < 2) e.name = 'Enter your name.';
      if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Enter a valid email, like name@example.com.';
      if (data.phone && data.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone number, or leave it blank.';
      if (!data.consent) e.consent = 'Please agree so we can reply.';
    }
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => topRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], .pills')?.focus?.());
      return false;
    }
    return true;
  };

  const go = (delta: number) => {
    setDir(delta);
    setStep((s) => Math.max(0, Math.min(steps.length - 1, s + delta)));
    requestAnimationFrame(() => {
      const top = topRef.current;
      if (top && top.getBoundingClientRect().top < 0) {
        window.__lenis ? window.__lenis.scrollTo(top, { offset: -120 }) : top.scrollIntoView({ behavior: 'smooth' });
      }
      top?.querySelector<HTMLElement>('h3')?.focus();
    });
  };

  const onNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (step < steps.length - 1) return go(1);
    setStatus('sending');
    await submitEnquiry(data);
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setStatus('done');
  };

  const chooseIntent = (v: Intent) => {
    set('intent', v);
    setDir(1);
    // Small pause so the selection registers visually before moving on.
    setTimeout(() => setStep(1), 280);
  };

  const firstName = data.name.trim().split(' ')[0];
  const propertyName = properties.find((p) => p.slug === data.property)?.name;

  if (status === 'done') {
    return (
      <div className="iform iform--done" ref={topRef}>
        <p className="eyebrow">Received</p>
        <h3 className="iform__title">Thank you{firstName ? `, ${firstName}` : ''}.</h3>
        <p className="lede">
          {data.intent === 'viewing' && propertyName
            ? `We’ll confirm your ${data.viewingMode.toLowerCase()} viewing of ${propertyName} within a few hours.`
            : 'A partner will reply personally within one business day, usually much sooner.'}
        </p>
        <div className="iform__done-actions">
          <a href="#book" className="btn btn--accent">Book a call now <span className="arrow">→</span></a>
          <a href="/properties" className="link">Browse properties →</a>
        </div>
      </div>
    );
  }

  return (
    <form className="iform" onSubmit={onNext} noValidate ref={topRef as any}>
      <div className="iform__progress" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s + i} className="iform__tick" data-state={i < step ? 'done' : i === step ? 'current' : 'todo'}>
            <span className="iform__tick-bar"></span>
            <span className="iform__tick-label">{STEP_LABELS[s]}</span>
          </span>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">Step {step + 1} of {steps.length}: {STEP_LABELS[current]}</p>

      <div className="iform__step" key={current} style={{ ['--dir' as any]: dir }}>
        {current === 'intent' && (
          <fieldset>
            <legend><h3 className="iform__title" tabIndex={-1}>How can we <em>help?</em></h3></legend>
            <div className="intents">
              {INTENTS.map((i) => (
                <button type="button" key={i.value} className="intent" aria-pressed={data.intent === i.value} onClick={() => chooseIntent(i.value)}>
                  <span className="intent__title">{i.title}</span>
                  <span className="intent__text">{i.text}</span>
                  <span className="intent__arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            {errors.intent && <p className="iform__error" role="alert">{errors.intent}</p>}
          </fieldset>
        )}

        {current === 'search' && (
          <fieldset>
            <legend><h3 className="iform__title" tabIndex={-1}>What are you <em>looking for?</em></h3></legend>
            <p className="iform__hint">Choose as many as you like, or skip if you’re open.</p>
            <div className="field">
              <span className="field__label">Neighbourhoods</span>
              <Pills name="Neighbourhoods" multi options={areas.map((a) => a.name)} value={data.areas.map((s) => areas.find((a) => a.slug === s)?.name || s)} onChange={(names: string[]) => set('areas', names.map((n) => areas.find((a) => a.name === n)!.slug))} />
            </div>
            <div className="field">
              <span className="field__label">Property type</span>
              <Pills name="Property type" multi options={types} value={data.types} onChange={(v: string[]) => set('types', v)} />
            </div>
          </fieldset>
        )}

        {current === 'budget' && (
          <fieldset>
            <legend><h3 className="iform__title" tabIndex={-1}>Budget and <em>timing</em></h3></legend>
            <div className="field">
              <span className="field__label">Budget</span>
              <Pills name="Budget" options={['Under $1.5M', '$1.5M – $2.5M', '$2.5M – $4M', '$4M +']} value={data.budget} onChange={(v: string) => set('budget', v)} />
              {errors.budget && <p className="iform__error" role="alert">{errors.budget}</p>}
            </div>
            <div className="field">
              <span className="field__label">When would you like to move?</span>
              <Pills name="Timeline" options={['As soon as possible', 'Within 3 months', '3 – 6 months', 'Just exploring']} value={data.timeline} onChange={(v: string) => set('timeline', v)} />
              {errors.timeline && <p className="iform__error" role="alert">{errors.timeline}</p>}
            </div>
            <div className="field">
              <span className="field__label">Financing <span className="field__opt">optional</span></span>
              <Pills name="Financing" options={['Cash', 'Mortgage, pre-approved', 'Mortgage, not yet', 'Not sure']} value={data.financing} onChange={(v: string) => set('financing', v)} />
            </div>
          </fieldset>
        )}

        {current === 'property' && (
          <fieldset>
            <legend><h3 className="iform__title" tabIndex={-1}>Tell us about <em>your home</em></h3></legend>
            <label className="field">
              <span className="field__label">Address or street</span>
              <input className="input" value={data.address} onChange={(e) => set('address', e.target.value)} placeholder="e.g. 4410 Harding Pike" autoComplete="street-address" aria-invalid={!!errors.address} />
              {errors.address && <p className="iform__error" role="alert">{errors.address}</p>}
            </label>
            <div className="field">
              <span className="field__label">Property type</span>
              <Pills name="Property type" options={types} value={data.propertyType} onChange={(v: string) => set('propertyType', v)} />
              {errors.propertyType && <p className="iform__error" role="alert">{errors.propertyType}</p>}
            </div>
            <div className="field">
              <span className="field__label">Bedrooms <span className="field__opt">optional</span></span>
              <Pills name="Bedrooms" options={['2', '3', '4', '5', '6+']} value={data.beds} onChange={(v: string) => set('beds', v)} />
            </div>
          </fieldset>
        )}

        {current === 'plans' && (
          <fieldset>
            <legend><h3 className="iform__title" tabIndex={-1}>Your <em>plans</em></h3></legend>
            <div className="field">
              <span className="field__label">When would you like to sell?</span>
              <Pills name="Timeline" options={['As soon as possible', 'Within 3 months', '3 – 6 months', 'Just want a valuation']} value={data.timeline} onChange={(v: string) => set('timeline', v)} />
              {errors.timeline && <p className="iform__error" role="alert">{errors.timeline}</p>}
            </div>
            <label className="field">
              <span className="field__label">Price in mind <span className="field__opt">optional</span></span>
              <input className="input" value={data.expectation} onChange={(e) => set('expectation', e.target.value)} placeholder="e.g. around $2.5M" />
            </label>
          </fieldset>
        )}

        {current === 'viewing' && (
          <fieldset>
            <legend><h3 className="iform__title" tabIndex={-1}>Plan your <em>viewing</em></h3></legend>
            <label className="field">
              <span className="field__label">Home</span>
              <select className="input" value={data.property} onChange={(e) => set('property', e.target.value)} aria-invalid={!!errors.property}>
                <option value="">Choose a home</option>
                {properties.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
              </select>
              {errors.property && <p className="iform__error" role="alert">{errors.property}</p>}
            </label>
            <div className="field">
              <span className="field__label">How would you like to view it?</span>
              <Pills name="Viewing type" options={['In person', 'Live video']} value={data.viewingMode} onChange={(v: string) => set('viewingMode', v)} />
              {errors.viewingMode && <p className="iform__error" role="alert">{errors.viewingMode}</p>}
            </div>
            <div className="field">
              <span className="field__label">Preferred days <span className="field__opt">optional</span></span>
              <Pills name="Days" multi options={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']} value={data.days} onChange={(v: string[]) => set('days', v)} />
            </div>
            <div className="field">
              <span className="field__label">Time of day <span className="field__opt">optional</span></span>
              <Pills name="Time of day" options={['Morning', 'Afternoon', 'Evening']} value={data.timeOfDay} onChange={(v: string) => set('timeOfDay', v)} />
            </div>
          </fieldset>
        )}

        {current === 'contact' && (
          <fieldset>
            <legend><h3 className="iform__title" tabIndex={-1}>Where should we <em>reply?</em></h3></legend>
            <div className="grid2">
              <label className="field">
                <span className="field__label">Full name</span>
                <input className="input" value={data.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />
                {errors.name && <p className="iform__error" role="alert">{errors.name}</p>}
              </label>
              <label className="field">
                <span className="field__label">Email</span>
                <input className="input" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" aria-invalid={!!errors.email} />
                {errors.email && <p className="iform__error" role="alert">{errors.email}</p>}
              </label>
              <label className="field">
                <span className="field__label">Phone <span className="field__opt">optional</span></span>
                <input className="input" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} />
                {errors.phone && <p className="iform__error" role="alert">{errors.phone}</p>}
              </label>
              <div className="field">
                <span className="field__label">Best way to reach you</span>
                <Pills name="Contact method" options={['Email', 'Phone', 'Text']} value={data.contactBy} onChange={(v: string) => set('contactBy', v)} />
              </div>
            </div>
            <label className="field">
              <span className="field__label">Anything else? <span className="field__opt">optional</span></span>
              <textarea className="input" rows={3} value={data.message} onChange={(e) => set('message', e.target.value)} placeholder="Must-haves, schools, dates you're in town…" />
            </label>
            <label className="check">
              <input type="checkbox" checked={data.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} />
              <span>I agree to Vértice contacting me about this enquiry, as described in the <a href="/privacy" className="link" target="_blank" rel="noopener">privacy policy</a>. We never share your details.</span>
            </label>
            {errors.consent && <p className="iform__error" role="alert">{errors.consent}</p>}
          </fieldset>
        )}
      </div>

      {current !== 'intent' && (
        <div className="iform__nav">
          <button type="button" className="link" onClick={() => go(-1)}>← Back</button>
          <button type="submit" className="btn btn--accent" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : step === steps.length - 1 ? <>Send enquiry <span className="arrow">→</span></> : <>Continue <span className="arrow">→</span></>}
          </button>
        </div>
      )}
    </form>
  );
}
