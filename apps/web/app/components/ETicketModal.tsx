'use client';
import React, { useState } from 'react';
import { Icons } from './Icons';
import { BookingTicket } from '../data/trainData';

interface ETicketModalProps {
  ticket: BookingTicket;
  onClose: () => void;
}

export const ETicketModal: React.FC<ETicketModalProps> = ({ ticket, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/tickets/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pnr: ticket.pnr,
          bookingId: ticket.bookingId,
          trainName: ticket.trainName,
          trainNumber: ticket.trainNumber,
          fromCity: ticket.fromCity,
          toCity: ticket.toCity,
          departureDate: ticket.departureDate,
          departureTime: ticket.departureTime,
          arrivalTime: ticket.arrivalTime,
          travelClass: ticket.travelClass,
          quota: ticket.quota,
          passengers: ticket.passengers,
          totalFare: ticket.totalFare,
          paymentMethod: ticket.paymentMethod,
          email: 'user@example.com',
          mobile: '9876543210',
        }),
      });
      const data = await response.json();
      if (data.success) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head><title>IRCTC E-Ticket - ${ticket.pnr}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; color: #1c1917; }
                .header { text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 10px; margin-bottom: 20px; }
                .header h1 { color: #f97316; margin: 0; font-size: 24px; }
                .header p { color: #78716c; margin: 5px 0 0 0; }
                .section { margin-bottom: 15px; }
                .section h3 { color: #6366f1; font-size: 14px; margin-bottom: 8px; border-bottom: 1px solid #e7e5e4; padding-bottom: 5px; }
                .info-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; }
                .info-label { color: #78716c; font-weight: bold; }
                .info-value { color: #1c1917; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #d6d3d1; padding: 8px; text-align: left; font-size: 12px; }
                th { background-color: #fafaf9; color: #44403c; font-weight: bold; }
                .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: bold; }
                .badge-success { background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
                .footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #e7e5e4; font-size: 11px; color: #78716c; text-align: center; }
                @media print { body { padding: 10px; } }
              </style>
              </head>
              <body>
                <div class="header">
                  <h1>IRCTC E-Ticket</h1>
                  <p>Official Railway Ticket Confirmation</p>
                </div>
                <div class="section">
                  <h3>Train Details</h3>
                  <div class="info-row"><span class="info-label">Train:</span><span class="info-value">${ticket.trainName} (#${ticket.trainNumber})</span></div>
                  <div class="info-row"><span class="info-label">Route:</span><span class="info-value">${ticket.fromCity} (${ticket.fromCode}) → ${ticket.toCity} (${ticket.toCode})</span></div>
                  <div class="info-row"><span class="info-label">Date:</span><span class="info-value">${ticket.departureDate}</span></div>
                  <div class="info-row"><span class="info-label">Departure:</span><span class="info-value">${ticket.departureTime}</span></div>
                  <div class="info-row"><span class="info-label">Arrival:</span><span class="info-value">${ticket.arrivalTime}</span></div>
                  <div class="info-row"><span class="info-label">Class:</span><span class="info-value">${ticket.travelClass}</span></div>
                  <div class="info-row"><span class="info-label">Quota:</span><span class="info-value">${ticket.quota}</span></div>
                </div>
                <div class="section">
                  <h3>Passengers</h3>
                  <table>
                    <thead><tr><th>#</th><th>Name</th><th>Age/Gender</th><th>Status</th><th>Seat</th></tr></thead>
                    <tbody>
                      ${ticket.passengers.map((p, i) => `
                        <tr>
                          <td>${i + 1}</td>
                          <td>${p.name}</td>
                          <td>${p.age} / ${p.gender}</td>
                          <td><span class="badge badge-success">${p.status || 'CNF'}</span></td>
                          <td>${p.seatAssigned}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
                <div class="section">
                  <h3>Payment Summary</h3>
                  <div class="info-row"><span class="info-label">Total Paid:</span><span class="info-value">₹${ticket.totalFare.toLocaleString('en-IN')}</span></div>
                  <div class="info-row"><span class="info-label">Method:</span><span class="info-value">${ticket.paymentMethod}</span></div>
                  <div class="info-row"><span class="info-label">PNR:</span><span class="info-value">${ticket.pnr}</span></div>
                  <div class="info-row"><span class="info-label">Booking ID:</span><span class="info-value">${ticket.bookingId}</span></div>
                </div>
                <div class="footer">
                  <p>Chart Status: ${ticket.chartStatus} | Valid with original government photo ID proof</p>
                  <p>Generated on ${new Date().toLocaleString()}</p>
                </div>
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
        }
      }
    } catch (error) {
      console.error('PDF download error:', error);
    }
    setIsDownloading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="relative w-full max-w-3xl rounded-3xl border border-stone-200 bg-white shadow-2xl animate-scale-in overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-4 py-3.5 sm:px-6 sm:py-4 flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-600 font-bold text-xs sm:text-sm">
            <Icons.check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> Official IRCTC E-Ticket Confirmed
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="btn-brand px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs flex items-center gap-1.5"
            >
              {isDownloading ? <Icons.arrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" /> : <Icons.download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={() => window.print()}
              className="btn-ghost px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs flex items-center gap-1.5"
            >
              <Icons.printer className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600" /> Print
            </button>
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 sm:p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all"
            >
              <Icons.x className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          {/* Email Confirmation Banner */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4 sm:p-5 flex items-start gap-3">
            <div className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-xl bg-purple-100 text-purple-600 flex-shrink-0">
              <Icons.mail className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-purple-800">
                Official E-Ticket details & PDF automatically sent to <span className="text-purple-900">{ticket.passengers[0]?.name || 'user'}@email.com</span>
              </p>
              <p className="text-[10px] sm:text-xs text-purple-600 mt-1">
                A confirmation email with the PDF ticket has been dispatched. You can also download it below.
              </p>
            </div>
          </div>

          {/* Ticket Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 sm:p-5 border bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg flex-shrink-0">
                <Icons.train className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-indigo-400">INDIAN RAILWAYS PASSENGER TICKET</p>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-0.5">{ticket.trainName}</h2>
                <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">#{ticket.trainNumber} • Quota: {ticket.quota} • {ticket.travelClass}</p>
              </div>
            </div>
            <div className="grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-xl bg-white p-1.5 shadow border border-stone-300">
              <Icons.qrCode className="h-10 w-10 sm:h-14 sm:w-14 text-stone-900" />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-4">
            {[
              { l: 'PNR Number', v: ticket.pnr, c: 'text-indigo-600 font-mono' },
              { l: 'Booking ID', v: ticket.bookingId, c: 'font-mono' },
              { l: 'Departure Date', v: ticket.departureDate, c: 'text-purple-600' },
              { l: 'Chart Status', v: ticket.chartStatus, c: 'text-emerald-600' },
            ].map(({ l, v, c }) => (
              <div key={l} className="rounded-2xl p-3 sm:p-4 bg-stone-50 border border-stone-200">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-400">{l}</span>
                <p className={`mt-1 text-xs sm:text-sm font-bold truncate ${c}`}>{v}</p>
              </div>
            ))}
          </div>

          {/* Boarding Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl p-4 sm:p-5 border bg-stone-50 border-stone-200">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase text-indigo-600">Boarding Station</span>
              <strong className="block text-base sm:text-lg font-bold text-stone-900 mt-0.5">{ticket.fromCity} ({ticket.fromCode})</strong>
              <span className="text-xs text-stone-500">Dep: {ticket.departureTime}</span>
            </div>
            <span className="badge-brand px-2.5 py-1 text-[11px] self-start sm:self-center">Express Route</span>
            <div className="text-left sm:text-right">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase text-indigo-600">Destination</span>
              <strong className="block text-base sm:text-lg font-bold text-stone-900 mt-0.5">{ticket.toCity} ({ticket.toCode})</strong>
              <span className="text-xs text-stone-500">Arr: {ticket.arrivalTime}</span>
            </div>
          </div>

          {/* Passenger Table (Touch Scroll Container) */}
          <div className="overflow-x-auto no-scrollbar touch-scroll rounded-2xl border border-stone-200">
            <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
              <thead className="border-b border-stone-200 bg-stone-50">
                <tr className="text-[11px] sm:text-xs font-bold text-stone-500">
                  <th className="p-3">#</th>
                  <th className="p-3">Passenger Name</th>
                  <th className="p-3">Age / Gender</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3">Coach / Seat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {ticket.passengers.map((p, i) => (
                  <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                    <td className="p-3 font-bold text-stone-500">{i + 1}</td>
                    <td className="p-3 font-bold text-stone-800">{p.name}</td>
                    <td className="p-3 text-stone-500">{p.age} / {p.gender}</td>
                    <td className="p-3">
                      <span className="badge-success inline-flex items-center gap-1 text-[10px] sm:text-xs">
                        <Icons.check className="h-3 w-3" /> {p.status || 'CNF'}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-indigo-600">{p.seatAssigned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl p-4 sm:p-5 border bg-stone-50 border-stone-200">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase text-stone-400">Total Amount Paid</span>
              <p className="text-lg sm:text-xl font-bold text-emerald-600 mt-0.5">₹{ticket.totalFare.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">{ticket.paymentMethod}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Icons.shieldCheck className="h-4 w-4 text-indigo-500 flex-shrink-0" /> Valid with original government photo ID proof
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};