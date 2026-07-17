import React, { useState } from "react";
import {
  FileText, Shuffle, Columns, Bell, BarChart2, Truck, Settings,
  Search, Plus, Clock, CheckCircle2, TrendingUp,
} from "lucide-react";

const NAVY = "#1E3A5F";
const GOLD = "#C9A24B";
const INK = "#1B2A33";

const NAV_ITEMS = [
  { key: "registro", label: "Registro de Solicitudes", icon: FileText },
  { key: "clasificacion", label: "Clasificación y Asignación", icon: Shuffle },
  { key: "tablero", label: "Tablero de Seguimiento", icon: Columns },
  { key: "notificaciones", label: "Notificaciones", icon: Bell },
  { key: "indicadores", label: "Indicadores y Reportes", icon: BarChart2 },
  { key: "proveedores", label: "Proveedores", icon: Truck },
  { key: "administracion", label: "Administración", icon: Settings },
];

const URGENCIA_STYLES = {
  Alta: { bg: "#FBE7E4", fg: "#B5432E", dot: "#C9503A" },
  Media: { bg: "#FBF1DC", fg: "#8A6A1E", dot: GOLD },
  Baja: { bg: "#E4EFE7", fg: "#3D6B4A", dot: "#4F8B62" },
};

const COLUMNS = [
  {
    name: "Recibido",
    cards: [
      { id: "SC-2026-0148", item: "Resmas de papel A4", area: "Administrativa", urgencia: "Baja" },
      { id: "SC-2026-0149", item: "Repuesto compresor línea 2", area: "Mantenimiento", urgencia: "Alta" },
    ],
  },
  {
    name: "Clasificado",
    cards: [
      { id: "SC-2026-0145", item: "EPP guantes nitrilo", area: "Producción", urgencia: "Media" },
    ],
  },
  {
    name: "Asignado",
    cards: [
      { id: "SC-2026-0141", item: "Servicio mantenimiento HVAC", area: "Operaciones", urgencia: "Media", resp: "J.R." },
      { id: "SC-2026-0143", item: "Licencias software diseño", area: "Comercial", urgencia: "Baja", resp: "M.T." },
    ],
  },
  {
    name: "En proceso",
    cards: [
      { id: "SC-2026-0138", item: "Materia prima resina", area: "Producción", urgencia: "Alta", resp: "A.P." },
    ],
  },
  {
    name: "Aprobado",
    cards: [
      { id: "SC-2026-0130", item: "Uniformes de dotación", area: "RRHH", urgencia: "Baja", resp: "L.G." },
      { id: "SC-2026-0132", item: "Sensores de línea", area: "Mantenimiento", urgencia: "Media", resp: "J.R." },
    ],
  },
  {
    name: "Cerrado",
    cards: [
      { id: "SC-2026-0121", item: "Kit señalización seguridad", area: "Sostenibilidad", urgencia: "Baja", resp: "L.G." },
    ],
  },
];

const KPIS = [
  { label: "Tiempo promedio de asignación", value: "4.1 h", icon: Clock, note: "Meta ≤ 4 h" },
  { label: "Solicitudes registradas (mes)", value: "128", icon: FileText, note: "+12 vs. mes anterior" },
  { label: "Nivel de servicio", value: "92 %", icon: TrendingUp, note: "Meta ≥ 90 %" },
  { label: "Trazabilidad completa", value: "100 %", icon: CheckCircle2, note: "Meta 100 %" },
];

function initialsOf(name) {
  return name || "—";
}

function RequestCard({ card }) {
  const style = URGENCIA_STYLES[card.urgencia];
  return (
    <div className="relative bg-white rounded-lg border border-slate-200 shadow-sm p-3 mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[11px] tracking-tight text-slate-400">{card.id}</span>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: style.bg, color: style.fg }}
        >
          {card.urgencia}
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-800 leading-snug mb-1">{card.item}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[11px] text-slate-400">{card.area}</span>
        {card.resp && (
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: NAVY }}
          >
            {card.resp}
          </span>
        )}
      </div>
      {/* perforated edge motif — evoca un vale de compra */}
      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
      <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
    </div>
  );
}

export default function ComprasDashboardMockup() {
  const [active, setActive] = useState("tablero");
  const activeLabel = NAV_ITEMS.find((n) => n.key === active)?.label;

  return (
    <div className="w-full h-full min-h-[720px] bg-slate-50 flex text-slate-800" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-64 shrink-0 flex flex-col" style={{ backgroundColor: NAVY }}>
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center font-black text-sm"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            VC
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-none tracking-wide">Vive Claro</p>
            <p className="text-[11px] text-white/50 leading-none mt-1">Gestión de Compras</p>
          </div>
        </div>
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors"
                style={{
                  backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  borderLeft: isActive ? `3px solid ${GOLD}` : "3px solid transparent",
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)",
                }}
              >
                <Icon size={16} strokeWidth={2} />
                <span className="text-[13px] font-medium">{label}</span>
              </button>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[11px] text-white/40 leading-snug">
            Bosquejo visual — solución de referencia, sin funcionalidad activa.
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-80 max-w-full">
            <Search size={15} className="text-slate-400" />
            <input
              disabled
              placeholder="Buscar por N° de solicitud, ítem o área..."
              className="bg-transparent text-[13px] outline-none w-full placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative text-slate-500">
              <Bell size={19} />
              <span
                className="absolute -top-1 -right-1 text-[9px] font-bold text-white rounded-full w-4 h-4 flex items-center justify-center"
                style={{ backgroundColor: "#C9503A" }}
              >
                3
              </span>
            </button>
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold text-white"
              style={{ backgroundColor: NAVY }}
            >
              <Plus size={15} />
              Nueva Solicitud
            </button>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
              style={{ backgroundColor: GOLD }}
            >
              AS
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-6 py-5">
          <div className="mb-5">
            <h1 className="text-lg font-bold text-slate-800">{activeLabel}</h1>
            <p className="text-[13px] text-slate-400">Vista de referencia — módulo del aplicativo de Gestión de Compras</p>
          </div>

          {/* KPI strip — always visible for context */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {KPIS.map(({ label, value, icon: Icon, note }) => (
              <div key={label} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-slate-400">{label}</span>
                  <Icon size={15} style={{ color: GOLD }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>{value}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{note}</p>
              </div>
            ))}
          </div>

          {active === "tablero" ? (
            <div className="grid grid-cols-6 gap-3">
              {COLUMNS.map((col) => (
                <div key={col.name} className="bg-slate-100/70 rounded-xl p-2.5 min-w-0">
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="text-[12px] font-bold text-slate-600">{col.name}</span>
                    <span className="text-[11px] text-slate-400 bg-white rounded-full w-5 h-5 flex items-center justify-center">
                      {col.cards.length}
                    </span>
                  </div>
                  {col.cards.map((card) => (
                    <RequestCard key={card.id} card={card} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-16 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "#EAF1F6" }}>
                {React.createElement(NAV_ITEMS.find((n) => n.key === active).icon, { size: 20, color: NAVY })}
              </div>
              <p className="text-sm font-semibold text-slate-600">Vista de "{activeLabel}"</p>
              <p className="text-[12px] text-slate-400 mt-1 max-w-xs">
                Este es un bosquejo de referencia — el módulo de {activeLabel.toLowerCase()} se vería
                dentro de este mismo layout. Selecciona "Tablero de Seguimiento" para ver el detalle.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
