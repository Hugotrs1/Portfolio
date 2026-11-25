'use client';

import { useEffect, useState, type FormEvent } from 'react';

import type { Dictionary } from '@/i18n';
import { sendContactEmail, type ContactPayload } from '@/lib/contact';

import { Check } from './icons';

type Feedback = { kind: 'success' | 'error'; message: string } | null;

const emptyForm: ContactPayload = { name: '', email: '', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  'dark-field mt-2 w-full rounded-[10px] border border-white/10 bg-ink-raised px-4 py-3 text-paper transition-colors duration-150 hover:border-white/25 focus:border-paper';
const labelClass = 'label text-on-ink-soft';

export function ContactForm({ t }: { t: Dictionary['contact']['form'] }) {
  const [form, setForm] = useState<ContactPayload>(emptyForm);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sent) return;
    const timeout = setTimeout(() => setSent(false), 4000);
    return () => clearTimeout(timeout);
  }, [sent]);

  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 5000);
    return () => clearTimeout(timeout);
  }, [feedback]);

  const update = (key: keyof ContactPayload) => (value: string) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Champ caché anti-robot : un humain ne le voit pas et le laisse vide
    const website = new FormData(event.currentTarget).get('website')?.toString() ?? '';
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setFeedback({ kind: 'error', message: t.missing });
      return;
    }
    if (!emailPattern.test(payload.email)) {
      setFeedback({ kind: 'error', message: t.invalidEmail });
      return;
    }

    setSending(true);
    try {
      await sendContactEmail({ ...payload, website });
      setForm(emptyForm);
      setSent(true);
      setFeedback({ kind: 'success', message: t.success });
    } catch {
      setFeedback({ kind: 'error', message: t.error });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{t.name}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(event) => update('name')(event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>{t.email}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) => update('email')(event.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>{t.message}</span>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(event) => update('message')(event.target.value)}
          className={`${fieldClass} block resize-none`}
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={sending || sent}
          className="bg-paper text-ink inline-flex h-12 items-center gap-2 rounded-[10px] px-5 text-base font-medium transition-[background-color,transform] duration-150 hover:bg-white active:scale-[0.98] disabled:opacity-70"
        >
          {sent ? <Check className="h-4 w-4" /> : null}
          {sent ? t.sent : sending ? t.sending : t.send}
        </button>

        <p
          role="status"
          className={
            feedback
              ? feedback.kind === 'error'
                ? 'text-[#f0a58a]'
                : 'text-paper'
              : 'label text-on-ink-muted'
          }
        >
          {feedback ? feedback.message : t.hint}
        </p>
      </div>
    </form>
  );
}
