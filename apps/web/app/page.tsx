const highlights = [
  'Low-latency search orchestration',
  'Strongly consistent seat booking flows',
  'Real-time notifications and live availability',
  'Multi-region, zero-downtime deployment model',
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">Train Ticket Booking Platform</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          Enterprise rail commerce architecture for massive scale.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          A production-ready foundation for train search, booking, payments, seat inventory, ticketing, and operations.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
