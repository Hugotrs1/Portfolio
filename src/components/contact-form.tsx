'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';

import type { Dictionary } from '@/i18n';
import { initEmailJs, sendContactEmail, type ContactPayload } from '@/lib/emailjs';

import { ArrowUpRight } from './icons';

type Feedback = { kind: 'success' | 'error'; message: string } | null;

const emptyForm: ContactPayload = { name: '', email: '', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  'dark-field peer w-full border-b border-paper/25 bg-transparent pb-3 pt-6 text-lg text-paper outline-none transition-colors duration-300 placeholder:text-transparent focus:border-paper';
const labelClass =
  'label pointer-events-none absolute left-0 top-6 text-paper/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-paper peer-autofill:top-0 peer-[:not(:placeholder-shown)]:top-0';

export function ContactForm({ t }: { t: Dictionary['contact']['form'] }) {
  const [form, setForm] = useState<ContactPayload>(emptyForm);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    initEmailJs();
  }, []);

  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 5000);
    return () => clearTimeout(timeout);
  }, [feedback]);

  const update = (key: keyof ContactPayload) => (value: string) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      await sendContactEmail(payload);
      setForm(emptyForm);
      setFeedback({ kind: 'success', message: t.success });
    } catch {
      setFeedback({ kind: 'error', message: t.error });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="relative block">
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            placeholder={t.name}
            value={form.name}
            onChange={(event) => update('name')(event.target.value)}
            className={fieldClass}
          />
          <span className={labelClass}>{t.name}</span>
        </label>
        <label className="relative block">
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder={t.email}
            value={form.email}
            onChange={(event) => update('email')(event.target.value)}
            className={fieldClass}
          />
          <span className={labelClass}>{t.email}</span>
        </label>
      </div>

      <label className="relative block">
        <textarea
          name="message"
          required
          rows={4}
          placeholder={t.message}
          value={form.message}
          onChange={(event) => update('message')(event.target.value)}
          className={`${fieldClass} resize-none`}
        />
        <span className={labelClass}>{t.message}</span>
      </label>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <button
          type="submit"
          disabled={sending}
          className="group bg-paper text-ink hover:bg-accent hover:text-paper inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-base transition-colors duration-300 disabled:opacity-60"
        >
          {sending ? t.sending : t.send}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        <AnimatePresence mode="wait">
          {feedback ? (
            <motion.p
              key={feedback.message}
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`text-base ${feedback.kind === 'error' ? 'text-[#f0a58a]' : 'text-paper'}`}
            >
              {feedback.message}
            </motion.p>
          ) : (
            <p className="label text-paper/50">{t.hint}</p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
