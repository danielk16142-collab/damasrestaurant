/**
 * Private-events enquiry (premium-site-kit InquiryForm pattern, U2): occasion →
 * date and guests → budget → contact. Validates each step and keeps a draft.
 *
 * NOT CONNECTED YET: `submitEnquiry` is the single integration point. Until a
 * form service is chosen, sending opens the visitor's email app with the request
 * written out to info@damas.ca, so nothing is lost. See content.ts `pending`.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/form.css';

type Lang = 'fr' | 'en';
type Occasion = 'corporate' | 'celebration' | 'wedding' | 'reception' | 'other';

interface Data {
  occasion: Occasion | '';
  date: string;
  guests: string;
  moment: string;
  budget: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
}
const EMPTY: Data = { occasion: '', date: '', guests: '', moment: '', budget: '', firstName: '', lastName: '', company: '', email: '', phone: '', notes: '', consent: false };
const DRAFT_KEY = 'damas-events-draft';

const COPY = {
  fr: {
    steps: { occasion: 'Occasion', details: 'Date', budget: 'Budget', contact: 'Coordonnées' },
    occasionTitle: ['Quelle est', 'l’occasion ?'],
    occasions: {
      corporate: ['Réception d’entreprise', 'Repas d’affaires, soirée d’équipe'],
      celebration: ['Célébration', 'Anniversaire, fête de famille'],
      wedding: ['Fiançailles ou mariage', 'Repas de noces, fiançailles'],
      reception: ['Cocktail dînatoire', 'Bouchées et mezzés, debout'],
      other: ['Autre chose', 'Racontez-nous'],
    } as Record<Occasion, [string, string]>,
    detailsTitle: ['La date et', 'les convives'],
    date: 'Date souhaitée',
    guests: 'Nombre de convives',
    guestOptions: ['9 – 20', '21 – 40', '41 – 70', '71 – 100', '100 +'],
    moment: 'Moment',
    momentOptions: ['Midi', 'Soir'],
    budgetTitle: ['Un budget', 'par personne'],
    budget: 'Budget par personne, avant boissons',
    budgetOptions: ['Moins de 80 $', '80 – 120 $', '120 – 160 $', 'Menu dégustation (160 $)', 'À discuter'],
    contactTitle: ['Où vous', 'répondre ?'],
    firstName: 'Prénom', lastName: 'Nom', company: 'Entreprise', email: 'Courriel', phone: 'Téléphone',
    notes: 'Demandes particulières, allergies, confidentialité',
    optional: 'facultatif',
    consent: 'J’accepte que Damas me contacte au sujet de cette demande, comme décrit dans la politique de confidentialité.',
    back: '← Retour', next: 'Continuer', send: 'Envoyer la demande', sending: 'Ouverture…',
    errors: {
      occasion: 'Choisissez une occasion pour continuer.',
      date: 'Indiquez une date.',
      guests: 'Choisissez un nombre de convives.',
      firstName: 'Indiquez votre prénom.',
      lastName: 'Indiquez votre nom.',
      email: 'Entrez un courriel valide, par exemple nom@exemple.com.',
      phone: 'Entrez un numéro à 10 chiffres.',
      consent: 'Cochez la case pour que nous puissions vous répondre.',
    },
    notice: 'Le formulaire n’est pas encore relié à notre messagerie : « Envoyer » ouvre votre courriel avec la demande déjà rédigée pour info@damas.ca.',
    doneTitle: ['Merci', ''],
    doneText: 'Votre application de courriel s’est ouverte avec votre demande. Envoyez-la, et nous reviendrons vers vous avec les détails. Rien ne s’est ouvert ? Écrivez-nous à info@damas.ca ou appelez le (514) 439-5435.',
    subject: 'Événement privé',
  },
  en: {
    steps: { occasion: 'Occasion', details: 'Date', budget: 'Budget', contact: 'Details' },
    occasionTitle: ['What’s the', 'occasion?'],
    occasions: {
      corporate: ['Corporate event', 'Business dinner, team evening'],
      celebration: ['Celebration', 'Birthday, family gathering'],
      wedding: ['Engagement or wedding', 'Wedding dinner, engagement'],
      reception: ['Cocktail reception', 'Bites and mezze, standing'],
      other: ['Something else', 'Tell us about it'],
    } as Record<Occasion, [string, string]>,
    detailsTitle: ['Date and', 'guests'],
    date: 'Preferred date',
    guests: 'Number of guests',
    guestOptions: ['9 – 20', '21 – 40', '41 – 70', '71 – 100', '100 +'],
    moment: 'Time of day',
    momentOptions: ['Lunch', 'Evening'],
    budgetTitle: ['A budget', 'per guest'],
    budget: 'Budget per guest, before drinks',
    budgetOptions: ['Under $80', '$80 – 120', '$120 – 160', 'Tasting menu ($160)', 'To discuss'],
    contactTitle: ['Where should', 'we reply?'],
    firstName: 'First name', lastName: 'Last name', company: 'Company', email: 'Email', phone: 'Phone',
    notes: 'Special requests, allergies, privacy',
    optional: 'optional',
    consent: 'I agree to Damas contacting me about this request, as described in the privacy policy.',
    back: '← Back', next: 'Continue', send: 'Send the request', sending: 'Opening…',
    errors: {
      occasion: 'Choose an occasion to continue.',
      date: 'Add a date.',
      guests: 'Choose a number of guests.',
      firstName: 'Add your first name.',
      lastName: 'Add your last name.',
      email: 'Enter a valid email, like name@example.com.',
      phone: 'Enter a 10-digit phone number.',
      consent: 'Tick the box so we can reply.',
    },
    notice: 'This form isn’t connected to our inbox yet: “Send” opens your email app with the request already written to info@damas.ca.',
    doneTitle: ['Thank you', ''],
    doneText: 'Your email app opened with your request. Send it and we’ll come back to you with the details. Nothing opened? Email info@damas.ca or call (514) 439-5435.',
    subject: 'Private event',
  },
};

const STEPS = ['occasion', 'details', 'budget', 'contact'] as const;
type Step = (typeof STEPS)[number];

/** Single integration point. Today: compose an email; later: POST to the chosen service. */
async function submitEnquiry(data: Data, lang: Lang, privacyHref: string) {
  const c = COPY[lang];
  const lines = [
    `${c.steps.occasion}: ${data.occasion ? c.occasions[data.occasion][0] : ''}`,
    `${c.date}: ${data.date}`,
    `${c.guests}: ${data.guests}`,
    data.moment && `${c.moment}: ${data.moment}`,
    data.budget && `${c.budget}: ${data.budget}`,
    `${c.firstName} / ${c.lastName}: ${data.firstName} ${data.lastName}`,
    data.company && `${c.company}: ${data.company}`,
    `${c.email}: ${data.email}`,
    `${c.phone}: ${data.phone}`,
    data.notes && `${c.notes}: ${data.notes}`,
  ].filter(Boolean);
  const href = `mailto:info@damas.ca?subject=${encodeURIComponent(`${c.subject} — ${data.date} — ${data.guests}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
  void privacyHref;
  window.location.href = href;
  return { ok: true };
}

function Pills({ options, value, onChange, name }: { options: string[]; value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="pills" role="group" aria-label={name}>
      {options.map((o) => (
        <button type="button" key={o} className="pill" aria-pressed={value === o} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

export default function EventsForm({ lang, privacyHref }: { lang: Lang; privacyHref: string }) {
  const c = COPY[lang];
  const [data, setData] = useState<Data>(EMPTY);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const topRef = useRef<HTMLFormElement & HTMLDivElement>(null);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    try { setData({ ...EMPTY, ...JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}'), consent: false }); } catch {}
  }, []);
  useEffect(() => {
    try { const { consent, ...rest } = data; localStorage.setItem(DRAFT_KEY, JSON.stringify(rest)); } catch {}
  }, [data]);

  const current: Step = STEPS[step];
  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => { const { [k as string]: _, ...rest } = e; return rest; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (current === 'occasion' && !data.occasion) e.occasion = c.errors.occasion;
    if (current === 'details') {
      if (!data.date) e.date = c.errors.date;
      if (!data.guests) e.guests = c.errors.guests;
    }
    if (current === 'contact') {
      if (data.firstName.trim().length < 1) e.firstName = c.errors.firstName;
      if (data.lastName.trim().length < 1) e.lastName = c.errors.lastName;
      if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = c.errors.email;
      if (data.phone.replace(/\D/g, '').length < 10) e.phone = c.errors.phone;
      if (!data.consent) e.consent = c.errors.consent;
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
    setStep((s) => Math.max(0, Math.min(STEPS.length - 1, s + delta)));
    requestAnimationFrame(() => {
      const top = topRef.current;
      if (top && top.getBoundingClientRect().top < 0) window.__lenis ? window.__lenis.scrollTo(top, { offset: -120 }) : top.scrollIntoView({ behavior: 'smooth' });
      top?.querySelector<HTMLElement>('h3')?.focus();
    });
  };

  const onNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (step < STEPS.length - 1) return go(1);
    setStatus('sending');
    await submitEnquiry(data, lang, privacyHref);
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setStatus('done');
  };

  const Title = ({ t }: { t: string[] }) => <h3 className="iform__title" tabIndex={-1}>{t[0]} <em>{t[1]}</em></h3>;
  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="iform__error" role="alert" id={`err-${k}`}>{errors[k]}</p> : null);

  if (status === 'done') {
    return (
      <div className="iform iform--done" ref={topRef}>
        <h3 className="iform__title">{c.doneTitle[0]}{data.firstName ? `, ${data.firstName}` : ''}.</h3>
        <p className="lede">{c.doneText}</p>
      </div>
    );
  }

  return (
    <form className="iform" onSubmit={onNext} noValidate ref={topRef}>
      <p className="iform__notice">{c.notice}</p>
      <div className="iform__progress" aria-hidden="true">
        {STEPS.map((s, i) => (
          <span key={s} className="iform__tick" data-state={i < step ? 'done' : i === step ? 'current' : 'todo'}>
            <span className="iform__tick-bar"></span>
            <span className="iform__tick-label">{c.steps[s]}</span>
          </span>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{`${step + 1} / ${STEPS.length} : ${c.steps[current]}`}</p>

      <div className="iform__step" key={current} style={{ ['--dir' as any]: dir }}>
        {current === 'occasion' && (
          <fieldset>
            <legend><Title t={c.occasionTitle} /></legend>
            <div className="intents">
              {(Object.keys(c.occasions) as Occasion[]).map((o) => (
                <button type="button" key={o} className="intent" aria-pressed={data.occasion === o} onClick={() => { set('occasion', o); setDir(1); setTimeout(() => setStep(1), 260); }}>
                  <span className="intent__title">{c.occasions[o][0]}</span>
                  <span className="intent__text">{c.occasions[o][1]}</span>
                  <span className="intent__arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <Err k="occasion" />
          </fieldset>
        )}

        {current === 'details' && (
          <fieldset>
            <legend><Title t={c.detailsTitle} /></legend>
            <label className="field">
              <span className="field__label">{c.date}</span>
              <input className="input" type="date" min={today} value={data.date} onChange={(e) => set('date', e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'err-date' : undefined} />
              <Err k="date" />
            </label>
            <div className="field">
              <span className="field__label">{c.guests}</span>
              <Pills name={c.guests} options={c.guestOptions} value={data.guests} onChange={(v) => set('guests', v)} />
              <Err k="guests" />
            </div>
            <div className="field">
              <span className="field__label">{c.moment} <span className="field__opt">{c.optional}</span></span>
              <Pills name={c.moment} options={c.momentOptions} value={data.moment} onChange={(v) => set('moment', v)} />
            </div>
          </fieldset>
        )}

        {current === 'budget' && (
          <fieldset>
            <legend><Title t={c.budgetTitle} /></legend>
            <div className="field">
              <span className="field__label">{c.budget} <span className="field__opt">{c.optional}</span></span>
              <Pills name={c.budget} options={c.budgetOptions} value={data.budget} onChange={(v) => set('budget', v)} />
            </div>
          </fieldset>
        )}

        {current === 'contact' && (
          <fieldset>
            <legend><Title t={c.contactTitle} /></legend>
            <div className="grid2">
              {(['firstName', 'lastName'] as const).map((k) => (
                <label className="field" key={k}>
                  <span className="field__label">{c[k]}</span>
                  <input className="input" value={data[k]} onChange={(e) => set(k, e.target.value)} autoComplete={k === 'firstName' ? 'given-name' : 'family-name'} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `err-${k}` : undefined} />
                  <Err k={k} />
                </label>
              ))}
              <label className="field">
                <span className="field__label">{c.email}</span>
                <input className="input" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
                <Err k="email" />
              </label>
              <label className="field">
                <span className="field__label">{c.phone}</span>
                <input className="input" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} />
                <Err k="phone" />
              </label>
              <label className="field">
                <span className="field__label">{c.company} <span className="field__opt">{c.optional}</span></span>
                <input className="input" value={data.company} onChange={(e) => set('company', e.target.value)} autoComplete="organization" />
              </label>
            </div>
            <label className="field">
              <span className="field__label">{c.notes} <span className="field__opt">{c.optional}</span></span>
              <textarea className="input" rows={3} value={data.notes} onChange={(e) => set('notes', e.target.value)} />
            </label>
            <label className="check">
              <input type="checkbox" checked={data.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'err-consent' : undefined} />
              <span>{c.consent} <a href={privacyHref} className="link" target="_blank" rel="noopener">↗</a></span>
            </label>
            <Err k="consent" />
          </fieldset>
        )}
      </div>

      {current !== 'occasion' && (
        <div className="iform__nav">
          <button type="button" className="link" onClick={() => go(-1)}>{c.back}</button>
          <button type="submit" className="btn btn--accent" disabled={status === 'sending'}>
            {status === 'sending' ? c.sending : step === STEPS.length - 1 ? c.send : c.next} <span className="arrow">→</span>
          </button>
        </div>
      )}
    </form>
  );
}
