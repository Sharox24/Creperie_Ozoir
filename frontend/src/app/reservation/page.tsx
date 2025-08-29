'use client';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
}

export default function ReservationPage() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', date: '', time: '', guests: 1 });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'guests' ? Number(value) : value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'success' : 'error');
    if (res.ok) setForm({ name: '', email: '', date: '', time: '', guests: 1, message: '' });
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl mb-4">Réserver une table</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border p-2" name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
        <input className="w-full border p-2" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="w-full border p-2" type="date" name="date" value={form.date} onChange={handleChange} required />
        <input className="w-full border p-2" type="time" name="time" value={form.time} onChange={handleChange} required />
        <input className="w-full border p-2" type="number" min="1" name="guests" value={form.guests} onChange={handleChange} required />
        <textarea className="w-full border p-2" name="message" placeholder="Message" value={form.message || ''} onChange={handleChange} />
        <button className="bg-[var(--color-yellow)] text-[var(--color-black)] px-4 py-2" type="submit">Réserver</button>
      </form>
      {status === 'success' && <p className="mt-4 text-green-600">Réservation envoyée !</p>}
      {status === 'error' && <p className="mt-4 text-red-600">Une erreur est survenue.</p>}
    </main>
  );
}
