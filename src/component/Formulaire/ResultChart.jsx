// src/component/Formulaire/ResultChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  Distinction: "#378ADD",
  Pass:        "#1D9E75",
  Fail:        "#EF9F27",
  Withdrawn:   "#E24B4A",
};

export default function ResultChart({ predictions }) {
  const finalResult = predictions?.final_result;

  const donutData = finalResult?.detail_probas
    ? Object.entries(finalResult.detail_probas).map(([name, val]) => ({
        name,
        value: parseFloat(val),
      }))
    : null;

  const metriques = [
    {
      label: "Note moyenne",
      value: Math.round(predictions?.note_moyenne?.valeur_numerique ?? 0),
      max: 100,
      suffix: "/100",
      color: "#378ADD",
    },
    {
      label: "Participation",
      value: Math.round((predictions?.taux_participation?.valeur_numerique ?? 0) * 100),
      max: 100,
      suffix: "%",
      color: "#1D9E75",
    },
    {
      label: "Activité/session",
      value: parseFloat((predictions?.moyenne_clics_par_session?.valeur_numerique ?? 0).toFixed(1)),
      max: 10,
      suffix: " clics",
      color: "#EF9F27",
    },
  ];

  return (
    <div className="space-y-4">

      {/* Badge résultat */}
      {finalResult && (
        <div className="flex items-center gap-3 p-3 rounded-xl border"
          style={{ borderColor: COLORS[finalResult.label] + "40",
                   backgroundColor: COLORS[finalResult.label] + "10" }}>
          <span className="px-3 py-1 rounded-full text-white text-sm font-bold"
            style={{ backgroundColor: COLORS[finalResult.label] }}>
            {finalResult.label}
          </span>
          <span className="text-slate-600 text-sm">
            Résultat prédit — confiance <strong>{finalResult.confiance}</strong>
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">

        {/* Donut probabilités */}
        {donutData && (
          <div className="rounded-xl border border-blue-100 bg-white p-4">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-1">
              Probabilités
            </p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%"
                  innerRadius={40} outerRadius={60} dataKey="value">
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name] ?? "#ccc"} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1">
              {donutData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[d.name] ?? "#ccc" }} />
                  {d.name} {d.value}%
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Métriques en barres */}
        <div className="rounded-xl border border-blue-100 bg-white p-4">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-wide mb-3">
            Métriques clés
          </p>
          <div className="space-y-4">
            {metriques.map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>{m.label}</span>
                  <span className="font-bold">{m.value}{m.suffix}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min((m.value / m.max) * 100, 100)}%`,
                      backgroundColor: m.color,
                    }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}