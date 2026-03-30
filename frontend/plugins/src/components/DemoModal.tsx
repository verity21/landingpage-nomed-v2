import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useDemo } from "@/contexts/DemoContext";
import axios from "axios";
import { Clock, Video, MapPin, ChevronLeft, Check } from "lucide-react";
import type { DemoFormState } from "@/types";

const API = `/api`;

const TIME_SLOTS: string[] = [];
for (let h = 9; h <= 17; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 17) TIME_SLOTS.push(`${String(h).padStart(2, "0")}:30`);
}

const PRODUCTOS = [
  "Botbee",
  "Cert",
  "Blog IA",
  "ED Master",
  "ED Teach",
  "ED Math",
  "Desarrollo a Medida",
  "Consultoría",
];

function formatDate(date: Date | null): string {
  if (!date) return "";
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]}`;
}

function formatDateShort(date: Date | null): string {
  if (!date) return "";
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

interface LeftPanelProps {
  selectedDate: Date | null;
  selectedTime: string | null;
}

function LeftPanel({ selectedDate, selectedTime }: LeftPanelProps) {
  return (
    <div className="bg-[#003b72] text-white p-8 flex flex-col gap-6 w-60 min-w-[220px] shrink-0">
      <div className="text-2xl font-bold flex items-center gap-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>
        <span style={{ background: "linear-gradient(135deg, #fc5e5f, #e8902f, #009ee7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>N</span>
        <span>omed</span>
      </div>

      <div>
        <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Nomed</p>
        <h3 className="text-xl font-bold">Agenda una llamada</h3>
      </div>

      <div className="flex flex-col gap-3 text-sm text-white/70">
        <div className="flex items-center gap-2.5">
          <Clock size={15} className="text-[#009ee7] shrink-0" />
          <span>30 minutos</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Video size={15} className="text-[#009ee7] shrink-0" />
          <span>Videoconferencia</span>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin size={15} className="text-[#009ee7] shrink-0" />
          <span className="text-xs">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
        </div>
      </div>

      {selectedDate && (
        <div className="border-t border-white/15 pt-4 text-sm space-y-2">
          <p className="text-white/50 text-xs uppercase tracking-widest">Seleccionado</p>
          <p className="text-white/90 leading-snug">{formatDate(selectedDate)}</p>
          {selectedTime && (
            <p className="text-[#009ee7] font-bold text-xl">{selectedTime}</p>
          )}
        </div>
      )}

      <div className="mt-auto text-xs text-white/30 leading-relaxed">
        Gratuito · Sin compromisos · Respuesta en &lt;24h
      </div>
    </div>
  );
}

export default function DemoModal() {
  const { isOpen, closeDemo } = useDemo();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<DemoFormState>({ nombre: "", apellido: "", email: "", empresa: "", producto: "", desafio: "" });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setStep(1); setSelectedDate(null); setSelectedTime(null);
    setForm({ nombre: "", apellido: "", email: "", empresa: "", producto: "", desafio: "" });
    setLoading(false); setConfirmed(false); setError("");
  };

  const handleClose = () => { closeDemo(); setTimeout(reset, 300); };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date ?? null);
    setSelectedTime(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      await axios.post(`${API}/demo`, { ...form, fecha: selectedDate ? formatDateShort(selectedDate) : "", hora: selectedTime || "", tipo: "contacto" });
      setConfirmed(true);
    } catch { setError("Ocurrió un error. Por favor intenta de nuevo."); }
    setLoading(false);
  };

  const isDisabled = (date: Date) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      {/* @ts-ignore - DialogContent types from generated Shadcn component */}
      <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-2xl" data-testid="demo-booking-modal">
        <div className="flex min-h-[520px]">
          <LeftPanel selectedDate={selectedDate} selectedTime={selectedTime} />

          <div className="flex-1 p-8 overflow-y-auto bg-white">
            {confirmed ? (
              <div data-testid="demo-confirmed" className="flex flex-col items-center justify-center h-full text-center gap-5 py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check size={30} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#003b72]">¡Llamada confirmada!</h3>
                  <p className="text-gray-500 mt-2">Recibirás un correo de confirmación pronto.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 text-sm text-left w-full max-w-sm space-y-1.5">
                  {selectedDate && <p><span className="font-medium text-gray-700">Fecha:</span> <span className="text-gray-600">{formatDate(selectedDate)}</span></p>}
                  {selectedTime && <p><span className="font-medium text-gray-700">Hora:</span> <span className="text-gray-600">{selectedTime}</span></p>}
                  <p><span className="font-medium text-gray-700">Email:</span> <span className="text-gray-600">{form.email}</span></p>
                </div>
                <button onClick={handleClose} className="px-8 py-3 bg-[#fc5e5f] text-white rounded-full font-semibold hover:bg-[#e04e4f] transition-colors" data-testid="demo-close-confirmed-btn">
                  Cerrar
                </button>
              </div>
            ) : step === 1 ? (
              <div data-testid="demo-step-1">
                <h3 className="text-xl font-bold text-[#003b72] mb-1">Selecciona una fecha</h3>
                <p className="text-sm text-gray-500 mb-5">Solo días hábiles (lunes a viernes)</p>
                <Calendar mode="single" selected={selectedDate ?? undefined} onSelect={handleDateSelect} disabled={isDisabled} className="rounded-xl border border-gray-100 w-full" classNames={{}} />
              </div>
            ) : step === 2 ? (
              <div data-testid="demo-step-2">
                <button onClick={() => { setStep(1); setSelectedTime(null); }} className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#003b72] transition-colors mb-5" data-testid="demo-back-step1-btn">
                  <ChevronLeft size={15} /> Cambiar fecha
                </button>
                <h3 className="text-xl font-bold text-[#003b72] mb-1">Selecciona un horario</h3>
                <p className="text-sm text-gray-500 mb-5">{formatDate(selectedDate)}</p>
                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                  {TIME_SLOTS.map((slot) => (
                    <div key={slot}>
                      {selectedTime === slot ? (
                        <div className="flex gap-2">
                          <span className="flex-1 text-center py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500">{slot}</span>
                          <button onClick={() => setStep(3)} className="flex-1 py-2.5 px-4 bg-[#009ee7] text-white rounded-xl text-sm font-semibold hover:bg-[#008ad1] transition-colors" data-testid="demo-time-next-btn">Siguiente</button>
                        </div>
                      ) : (
                        <button onClick={() => setSelectedTime(slot)} className="w-full py-2.5 px-4 border border-[#009ee7] text-[#009ee7] rounded-xl text-sm font-medium hover:bg-[#009ee7] hover:text-white transition-all" data-testid={`demo-slot-${slot}`}>{slot}</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-testid="demo-step-3" className="flex flex-col gap-4">
                <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#003b72] transition-colors mb-1" data-testid="demo-back-step2-btn">
                  <ChevronLeft size={15} /> Cambiar horario
                </button>
                <h3 className="text-xl font-bold text-[#003b72]">Tus datos</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input required className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} data-testid="demo-input-nombre" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} data-testid="demo-input-apellido" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} data-testid="demo-input-email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7]" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} data-testid="demo-input-empresa" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué producto te interesa?</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7] bg-white" value={form.producto} onChange={(e) => setForm({ ...form, producto: e.target.value })} data-testid="demo-select-producto">
                    <option value="">Seleccionar...</option>
                    {PRODUCTOS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">¿Cuál es tu principal desafío?</label>
                  <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#009ee7] resize-none" value={form.desafio} onChange={(e) => setForm({ ...form, desafio: e.target.value })} placeholder="Cuéntanos sobre tu necesidad..." data-testid="demo-textarea-desafio" />
                </div>
                {error && <p className="text-red-500 text-sm" data-testid="demo-error">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 bg-[#fc5e5f] text-white rounded-full font-semibold hover:bg-[#e04e4f] transition-colors disabled:opacity-60 shadow-lg shadow-[#fc5e5f]/20" data-testid="demo-submit-btn">
                  {loading ? "Confirmando..." : "Confirmar llamada"}
                </button>
                <p className="text-xs text-center text-gray-400">Al continuar aceptas nuestra <a href="#" className="underline">política de privacidad</a>.</p>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
