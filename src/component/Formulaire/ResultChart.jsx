// src/component/Formulaire/ResultChart.jsx
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

const COLORS = {
  Distinction: "#378ADD",
  Pass:        "#1D9E75",
  Fail:        "#EF9F27",
  Withdrawn:   "#E24B4A",
};

// ── Jauge demi-cercle ─────────────────────────────────────────────
function Gauge({ percentage, label, color = "#1D9E75" }) {
  const val = Math.min(Math.max(percentage, 0), 100);
  const data = [{ value: val }, { value: 100 - val }];
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 130, height: 70 }}>
        <PieChart width={130} height={70}>
          <Pie data={data} cx={65} cy={65}
            startAngle={180} endAngle={0}
            innerRadius={45} outerRadius={60}
            dataKey="value" strokeWidth={0}>
            <Cell fill={color} />
            <Cell fill="#f3f4f6" />
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="text-lg font-black text-slate-800">{val}%</span>
        </div>
      </div>
      <p className="text-xs text-slate-500 font-medium text-center mt-1">{label}</p>
    </div>
  );
}

// ── Barre de progression simple ───────────────────────────────────
function ProgressBar({ label, value, max, color, suffix = "" }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-600 mb-1">
        <span>{label}</span>
        <span className="font-bold">{value}{suffix}</span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function ResultChart({ predictions_actuelles, predictions_cible, est_bon_resultat }) {
  const p1 = predictions_actuelles ?? {};
  const p2 = predictions_cible ?? {};

  const fr       = p1?.final_result ?? {};
  const probas   = fr?.detail_probas;
  const note1    = Math.round(p1?.note_moyenne?.valeur_numerique ?? 0);
  const part1    = Math.round((p1?.taux_participation?.valeur_numerique ?? 0) * 100);
  const clics1   = parseFloat((p1?.moyenne_clics_par_session?.valeur_numerique ?? 0).toFixed(1));
  const note2    = Math.round(p2?.note_moyenne?.valeur_numerique ?? 0);
  const part2    = Math.round((p2?.taux_participation?.valeur_numerique ?? 0) * 100);
  const clics2   = parseFloat((p2?.moyenne_clics_par_session?.valeur_numerique ?? 0).toFixed(1));

  const donutData = probas
    ? Object.entries(probas).map(([name, val]) => ({ name, value: parseFloat(val) }))
    : null;

  // Données comparaison pour BarChart
  const comparaisonData = predictions_cible ? [
    { metric: "Note /100", actuel: note1, cible: note2 },
    { metric: "Participation %", actuel: part1, cible: part2 },
    { metric: "Clics/session ×10", actuel: clics1 * 10, cible: clics2 * 10 },
  ] : null;

  // Forces et faiblesses
  const SEUIL_FORCE = 0.8;
  const forcesData = comparaisonData?.map(d => ({
    ...d,
    statut: d.actuel >= d.cible * SEUIL_FORCE ? "force" : "faiblesse",
  })) ?? [];

  return (
    <div className="space-y-5">

      {/* ── Badge résultat principal ── */}
      {fr.label && (
        <div className="flex items-center gap-3 p-3 rounded-xl border"
          style={{
            borderColor: (COLORS[fr.label] ?? "#ccc") + "50",
            backgroundColor: (COLORS[fr.label] ?? "#ccc") + "15",
          }}>
          <span className="px-3 py-1.5 rounded-full text-white text-sm font-black"
            style={{ backgroundColor: COLORS[fr.label] }}>
            {fr.label}
          </span>
          <div>
            <p className="text-sm font-bold text-slate-700">Résultat prédit</p>
            <p className="text-xs text-slate-500">Confiance : {fr.confiance}</p>
          </div>
        </div>
      )}

      {/* ── Jauges principales ── */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3">
          Indicateurs clés
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Gauge percentage={note1} label="Note moy." color="#378ADD" />
          <Gauge percentage={part1} label="Participation" color="#1D9E75" />
          <Gauge
            percentage={Math.round(parseFloat(fr.confiance ?? "0"))}
            label="Confiance ML"
            color={COLORS[fr.label] ?? "#ccc"}
          />
        </div>
      </div>

      {/* ── Probabilités donut ── */}
      {donutData && (
        <div className="rounded-xl border border-blue-100 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">
            Distribution des probabilités
          </p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%"
                  innerRadius={35} outerRadius={55} dataKey="value">
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name] ?? "#ccc"} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {donutData.map((d) => (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: COLORS[d.name] ?? "#ccc" }} />
                      {d.name}
                    </span>
                    <span className="font-bold">{d.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full"
                      style={{ width: `${d.value}%`, backgroundColor: COLORS[d.name] ?? "#ccc" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Comparaison actuel vs Pass (si mauvais résultat) ── */}
      {!est_bon_resultat && comparaisonData && (
        <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-4">
          <p className="text-xs font-black uppercase tracking-widest text-orange-400 mb-3">
            Écart actuel → Pass
          </p>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={comparaisonData} layout="vertical"
              margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis dataKey="metric" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="actuel" name="Actuel" fill="#EF9F27" radius={[0, 4, 4, 0]} />
              <Bar dataKey="cible"  name="Objectif Pass" fill="#1D9E75" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Forces / Faiblesses ── */}
      {forcesData.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-green-100 bg-green-50/40 p-3">
            <p className="text-xs font-black uppercase tracking-widest text-green-500 mb-2">
              ✓ Points forts
            </p>
            {forcesData.filter(d => d.statut === "force").map(d => (
              <p key={d.metric} className="text-xs text-slate-600 flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                {d.metric}
              </p>
            ))}
            {forcesData.filter(d => d.statut === "force").length === 0 && (
              <p className="text-xs text-slate-400 italic">À développer</p>
            )}
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50/40 p-3">
            <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-2">
              ✗ À améliorer
            </p>
            {forcesData.filter(d => d.statut === "faiblesse").map(d => (
              <p key={d.metric} className="text-xs text-slate-600 flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {d.metric}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}