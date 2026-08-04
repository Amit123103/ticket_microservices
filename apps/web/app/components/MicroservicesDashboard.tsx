'use client';

import React, { useState } from 'react';
import { Activity, Server, Cpu, RefreshCw, CheckCircle2, ShieldCheck, Terminal, Search, Zap, Code, X } from 'lucide-react';
import { MICROSERVICES_LIST, MicroserviceItem } from '../data/microservicesData';

export const MicroservicesDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectService, setInspectService] = useState<MicroserviceItem | null>(null);

  const filteredServices = MICROSERVICES_LIST.filter((s) => {
    const matchesCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const avgLatency = Math.round(
    MICROSERVICES_LIST.reduce((acc, curr) => acc + curr.latencyMs, 0) / MICROSERVICES_LIST.length
  );

  const totalRps = MICROSERVICES_LIST.reduce((acc, curr) => acc + curr.requestsPerSec, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 mb-2">
            <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Real-time System Topology</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">28 Microservices Architecture Monitor</h2>
          <p className="mt-1 text-xs text-slate-400">
            Live telemetry, service discovery status, RPC latencies, and Spring Cloud / Docker mesh logs.
          </p>
        </div>

        {/* Global Stats Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 px-4 py-2 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-slate-400">Services Active</span>
            <strong className="text-sm font-black text-emerald-400">28 / 28 ONLINE</strong>
          </div>
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/30 px-4 py-2 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-slate-400">Avg Latency</span>
            <strong className="text-sm font-black text-indigo-400">{avgLatency} ms</strong>
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-sky-950/30 px-4 py-2 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-slate-400">Throughput</span>
            <strong className="text-sm font-black text-sky-400">{totalRps.toLocaleString()} req/s</strong>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service by name or ID (e.g. pnr, search, auth)..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-2 text-xs font-bold text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'Core', 'Booking', 'Data & AI', 'Support & Comms', 'Platform'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Microservices Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-md transition hover:border-indigo-500 hover:bg-slate-900"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-indigo-400" />
                <span className="font-mono text-xs font-extrabold text-white">{service.name}</span>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-400 border border-emerald-500/30">
                :{service.port}
              </span>
            </div>

            <p className="text-xs text-slate-400 min-h-[36px]">{service.description}</p>

            <div className="my-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-950/60 p-3 border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Latency</span>
                <p className="font-mono font-bold text-indigo-400">{service.latencyMs} ms</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">RPS Rate</span>
                <p className="font-mono font-bold text-emerald-400">{service.requestsPerSec} r/s</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-bold text-slate-500">Uptime: {service.uptime}</span>
              <button
                onClick={() => setInspectService(service)}
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:underline"
              >
                <Code className="h-3.5 w-3.5" />
                <span>Inspect API Payload</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Payload Modal */}
      {inspectService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">API Telemetry: {inspectService.name}</h3>
              </div>
              <button
                onClick={() => setInspectService(null)}
                className="rounded-full bg-slate-800 p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
              <pre>{JSON.stringify({
                serviceId: inspectService.id,
                name: inspectService.name,
                port: inspectService.port,
                status: inspectService.status,
                metrics: {
                  latency_ms: inspectService.latencyMs,
                  requests_per_sec: inspectService.requestsPerSec,
                  uptime_pct: inspectService.uptime,
                  cpu_usage: '2.4%',
                  memory_allocated: '342MB / 512MB',
                },
                healthCheckEndpoint: `http://localhost:${inspectService.port}/actuator/health`,
                timestamp: new Date().toISOString(),
              }, null, 2)}</pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectService(null)}
                className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700"
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
