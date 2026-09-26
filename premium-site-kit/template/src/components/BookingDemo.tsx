/**
 * Call booking: a working PLACEHOLDER for the showcase.
 * Availability is generated locally and nothing is sent. When going live,
 * replace this component with a Cal.com embed (connected to Google Calendar
 * with Google Meet as the location) or Wix Bookings.
 */
import { useMemo, useState } from 'react';
import '../styles/form.css';

const SLOTS = ['9:00', '10:00', '11:30', '13:00', '14:30', '16:00'];
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ymd = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;

function isBookable(d: Date, today: Date) {
  const horizon = new Date(today);
  horizon.setDate(horizon.getDate() + 35);
  return d > today && d <= horizon && d.getDay() !== 0;
}

// Deterministic "busy" slots so the calendar looks lived-in.
function slotsFor(d: Date) {
  const seed = d.getDate() * 7 + d.getMonth() * 3;
  return SLOTS.filter((_, i) => (seed + i * 5) % 4 !== 0).filter((s) => d.getDay() !== 6 || parseInt(s) < 13);
}

function to24(s: string) {
  const [h, m] = s.split(':');
  return `${h.padStart(2, '0')}${m}00`;
}
function label12(s: string) {
  const [h, m] = s.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
}

export default function BookingDemo() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [day, setDay] = useState<Date | null>(null);
  const [slot, setSlot] = useState('');
  const [mode, setMode] = useState<'Google Meet' | 'Phone call'>('Google Meet');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const cells = useMemo(() => {
    const first = new Date(view);
    const days: (Date | null)[] = Array(first.getDay()).fill(null);
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= count; i++) days.push(new Date(view.getFullYear(), view.getMonth(), i));
    return days;
  }, [view]);

  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = view < new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError('Enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email.');
    setError('');
    setDone(true);
  };

  if (done && day) {
    const start = to24(slot);
    const [h, m] = slot.split(':').map(Number);
    const endMin = h * 60 + m + 30;
    const end = `${String(Math.floor(endMin / 60)).padStart(2, '0')}${String(endMin % 60).padStart(2, '0')}00`;
    const gcal = new URL('https://calendar.google.com/calendar/render');
    gcal.searchParams.set('action', 'TEMPLATE');
    gcal.searchParams.set('text', 'Call with Vértice Real Estate');
    gcal.searchParams.set('dates', `${ymd(day)}T${start}/${ymd(day)}T${end}`);
    gcal.searchParams.set('ctz', 'America/Chicago');
    gcal.searchParams.set('details', `${mode} with a Vértice partner. (Showcase demo booking.)`);
    return (
      <div className="book">
        <div className="book__side book__done" style={{ gridColumn: '1 / -1', padding: 'clamp(2rem, 5vw, 4rem)' }}>
          <p className="eyebrow">Demo booking confirmed</p>
          <h3>See you {DOW[day.getDay()]} {day.getDate()} {MONTHS[day.getMonth()]}, at {label12(slot)}.</h3>
          <p className="muted">
            In the live version, {name.split(' ')[0]} would now get a calendar invite at {email}
            {mode === 'Google Meet' ? ' with a Google Meet link.' : ' and we would call the number on file.'}
          </p>
          <div className="iform__done-actions">
            <a className="btn btn--accent" href={gcal.toString()} target="_blank" rel="noopener">Add to Google Calendar <span className="arrow">↗</span></a>
            <button className="link" onClick={() => { setDone(false); setSlot(''); setDay(null); }}>Book another time</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book">
      <div className="book__cal">
        <div className="book__month">
          <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} disabled={!canPrev} aria-label="Previous month">←</button>
          <h3 aria-live="polite">{MONTHS[view.getMonth()]} {view.getFullYear()}</h3>
          <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} disabled={!canNext} aria-label="Next month">→</button>
        </div>
        <div className="book__grid" role="grid" aria-label="Choose a day">
          {DOW.map((d) => <span key={d} className="book__dow">{d.slice(0, 2)}</span>)}
          {cells.map((d, i) =>
            d ? (
              <button
                type="button"
                key={i}
                className="book__day"
                disabled={!isBookable(d, today)}
                aria-pressed={!!day && d.getTime() === day.getTime()}
                aria-label={`${DOW[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`}
                onClick={() => { setDay(d); setSlot(''); }}
              >
                {d.getDate()}
              </button>
            ) : <span key={i} />,
          )}
        </div>
      </div>

      <form className="book__side" onSubmit={confirm}>
        <p className="eyebrow">30-minute intro call</p>
        {!day && <p className="muted">Choose a day to see available times. Times are in Central Time.</p>}
        {day && (
          <>
            <p><strong>{DOW[day.getDay()]} {day.getDate()} {MONTHS[day.getMonth()]}</strong></p>
            <div className="book__slots" key={day.getTime()}>
              {slotsFor(day).map((s, i) => (
                <button type="button" key={s} className="book__slot" style={{ animationDelay: `${i * 40}ms` }} aria-pressed={slot === s} onClick={() => setSlot(s)}>
                  {label12(s)}
                </button>
              ))}
            </div>
          </>
        )}
        {slot && (
          <>
            <div className="pills" role="group" aria-label="Call type">
              {(['Google Meet', 'Phone call'] as const).map((m) => (
                <button type="button" key={m} className="pill" aria-pressed={mode === m} onClick={() => setMode(m)}>{m}</button>
              ))}
            </div>
            <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-label="Full name" />
            <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-label="Email" />
            {error && <p className="iform__error" role="alert">{error}</p>}
            <button type="submit" className="btn btn--accent">Confirm {label12(slot)} <span className="arrow">→</span></button>
          </>
        )}
        <div className="book__meet">
          <span className="book__meet-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="13" height="12" rx="2" /><path d="M15 10l6-3v10l-6-3" /></svg>
          </span>
          Video calls include a Google Meet link and a calendar invite.
        </div>
        <p className="book__demo">Demo: availability is simulated and nothing is sent. The live site will connect to Google Calendar.</p>
      </form>
    </div>
  );
}
