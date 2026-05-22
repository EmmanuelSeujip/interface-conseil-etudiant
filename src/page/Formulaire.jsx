import { useState } from "react";
import Header from "../component/header";
import { CheckBox, RadioBtn, InputField } from "../component/typeInput";
import {stepIcons, ResultBadge} from "../component/iconic";
import Popup from "../component/Formulaire/reponsePopup";
import { methodesLabels, exerciceLabels, filieresDictionnaire, diplomesEntree, filieresCategoriesLabels } from "../utils/allEntry";
import sender from "../utils/sender";
const STEPS = ["Profil", "Formation", "Résultat"];

const initialForm = {
  nomComplet: "",
  age: "",
  sexe: "",
  situationLogement: "",
  handicap: "",
  diplomActuel: "",
  filieresouhaitee: "",
  methodesApprentissage: [],
  methodesExercice: [],
  travailleur: false,
};

export default function FormulaireProfil() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [navActive, setNavActive] = useState("accueil");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const toggleArray = (field, value) => {
    const arr = form[field];
    setForm({
      ...form,
      [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.nomComplet.trim()) e.nomComplet = "Requis";
      if (!form.age || isNaN(form.age) || form.age < 1) e.age = "Âge invalide";
      if (!form.sexe) e.sexe = "Requis";
      if (!form.situationLogement) e.situationLogement = "Requis";
      if (!form.handicap) e.handicap = "Requis";
    }
    if (step === 1) {
      if (!form.diplomActuel.trim()) e.diplomActuel = "Requis";
      if (!form.filieresouhaitee) e.filieresouhaitee = "Requis";
      if (!form.methodesApprentissage.length) e.methodesApprentissage = "Choisissez au moins une méthode";
      if (!form.methodesExercice.length) e.methodesExercice = "Choisissez au moins un mode";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, 2)); };
  const prev = () => { setStep((s) => Math.max(s - 1, 0)); setErrors({}); };
  const [messages,setMessages]=useState(null);
  // Dans Formulaire.jsx
  const [apiData, setApiData] = useState(null);  // ← nouveau state

  const submit = () => {
      setIsLoad(true);
      setIsPopupOpen(true);
      sender(form, "http://127.0.0.1:8000/forest_predict/")
          .then(res => res.json())
          .then(data => {
              setApiData(data);   // ← stocker la réponse
              setIsLoad(false);
          })
          .catch(err => {
              console.log(err);
              setIsLoad(false);
          });
  };



const reset = () => { 
    setForm(initialForm); 
    setStep(0); 
    setErrors({});
    // ← plus d'envoi ici
};


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  
  return (
    <div className="min-h-screen bg-blue-50/50">
      <Header navActive={navActive} setNavActive={setNavActive} />
      {/* MAIN */}
      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* Page title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-blue-900 mb-2">Profil d'apprentissage</h1>
          <p className="text-blue-500 text-sm font-medium">Complétez ce formulaire pour recevoir votre recommandation personnalisée</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8 gap-0">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
                  ${i < step ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-200"
                    : i === step ? "bg-white border-blue-500 text-blue-600 shadow-lg shadow-blue-100 ring-4 ring-blue-100"
                    : "bg-white border-blue-200 text-blue-300"}`}>
                  {i < step
                    ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    : stepIcons[i]}
                </div>
                <span className={`mt-1.5 text-xs font-bold tracking-wide transition-colors duration-200
                  ${i === step ? "text-blue-600" : i < step ? "text-blue-400" : "text-blue-200"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-20 h-0.5 mb-5 mx-1 rounded transition-all duration-500 ${i < step ? "bg-blue-500" : "bg-blue-100"}`} />
              )}
            </div>
          ))}
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-100 border border-blue-50 overflow-hidden">

          {/* Card header stripe */}
          <div className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400" />

          <div className="p-7">

            {/* ─── ÉTAPE 1 : Profil personnel ─── */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-black text-blue-900">Informations personnelles</h2>
                  <p className="text-blue-400 text-sm mt-0.5">Dites-nous qui vous êtes</p>
                </div>

                <InputField label="Nom complet" value={form.nomComplet} onChange={set("nomComplet")} placeholder="Jean Dupont" required />
                {errors.nomComplet && <p className="text-red-500 text-xs -mt-4">{errors.nomComplet}</p>}

                <InputField label="Âge" type="number" value={form.age} onChange={set("age")} placeholder="25" required />
                {errors.age && <p className="text-red-500 text-xs -mt-4">{errors.age}</p>}

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-blue-900 tracking-wide">Sexe <span className="text-blue-500">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {[["Homme", "homme"], ["Femme", "femme"]].map(([l, v]) => (
                      <RadioBtn key={v} label={l} value={v} name="sexe" checked={form.sexe === v} onChange={set("sexe")} />
                    ))}
                  </div>
                  {errors.sexe && <p className="text-red-500 text-xs">{errors.sexe}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-blue-900 tracking-wide">Situation de logement <span className="text-blue-500">*</span></label>
                  <div className="grid grid-cols-1 gap-2">
                    {[["Seul(e)", "seul"], ["En colocation", "colocation"], ["En famille", "famille_dense"]].map(([l, v]) => (
                      <RadioBtn key={v} label={l} value={v} name="logement" checked={form.situationLogement === v} onChange={set("situationLogement")} />
                    ))}
                  </div>
                  {errors.situationLogement && <p className="text-red-500 text-xs">{errors.situationLogement}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-blue-900 tracking-wide">Avez-vous un handicap ? <span className="text-blue-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    {[["Oui", "oui"], ["Non", "non"]].map(([l, v]) => (
                      <RadioBtn key={v} label={l} value={v} name="handicap" checked={form.handicap === v} onChange={set("handicap")} />
                    ))}
                  </div>
                  {errors.handicap && <p className="text-red-500 text-xs">{errors.handicap}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-blue-900 tracking-wide">Travailleur ? <span className="text-blue-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    {[["Oui", true], ["Non", false]].map(([l, v]) => (
                      <RadioBtn key={v} label={l} value={v} name="travailleur" checked={form.travailleur === v} onChange={set("travailleur")} />
                    ))}
                  </div>
                  {errors.handicap && <p className="text-red-500 text-xs">{errors.handicap}</p>}
                </div>
              </div>
            )}

            {/* ─── ÉTAPE 2 : Formation ─── */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-black text-blue-900">Parcours & Méthodes</h2>
                  <p className="text-blue-400 text-sm mt-0.5">Parlez-nous de votre formation</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-blue-900 tracking-wide">
                    Diplôme actuel <span className="text-blue-500">*</span>
                  </label>
                  <select
                    value={form.diplomActuel}
                    onChange={set("diplomActuel")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 bg-white text-slate-700 text-sm
                      focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200">
                    <option value="">-- Sélectionnez votre diplôme --</option>
                    {diplomesEntree.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.diplomActuel && <p className="text-red-500 text-xs">{errors.diplomActuel}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-blue-900 tracking-wide">
                    Filière souhaitée <span className="text-blue-500">*</span>
                  </label>
                  <select
                    value={form.filieresouhaitee}
                    onChange={set("filieresouhaitee")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 bg-white text-slate-700 text-sm
                      focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200">
                    <option value="">-- Sélectionnez une filière --</option>
                    {Object.entries(filieresDictionnaire).map(([cat, filieres]) => (
                      <optgroup key={cat} label={filieresCategoriesLabels[cat]}>
                        {filieres.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.filieresouhaitee && <p className="text-red-500 text-xs">{errors.filieresouhaitee}</p>}
                </div>


                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-blue-900 tracking-wide">
                    Méthodes d'apprentissage préférées <span className="text-blue-500">*</span>
                    <span className="ml-2 text-xs font-normal text-blue-300">(plusieurs choix possibles)</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(methodesLabels).map(([v, l]) => (
                      <CheckBox key={v} label={l} value={v}
                        checked={form.methodesApprentissage.includes(v)}
                        onChange={() => toggleArray("methodesApprentissage", v)} />
                    ))}
                  </div>
                  {errors.methodesApprentissage && <p className="text-red-500 text-xs">{errors.methodesApprentissage}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-blue-900 tracking-wide">
                    Modes d'exercice <span className="text-blue-500">*</span>
                    <span className="ml-2 text-xs font-normal text-blue-300">(plusieurs choix possibles)</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(exerciceLabels).map(([v, l]) => (
                      <CheckBox key={v} label={l} value={v}
                        checked={form.methodesExercice.includes(v)}
                        onChange={() => toggleArray("methodesExercice", v)} />
                    ))}
                  </div>
                  {errors.methodesExercice && <p className="text-red-500 text-xs">{errors.methodesExercice}</p>}
                </div>
              </div>
            )}

            {/* ─── ÉTAPE 3 : Résultat ─── */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-blue-900">Récapitulatif</h2>
                    <p className="text-blue-400 text-sm">Voici les informations que vous avez renseignées</p>
                  </div>
                </div>

                {/* Section 1 */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-black">1</span>
                    Profil personnel
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ResultBadge label="Nom complet" value={form.nomComplet} />
                    <ResultBadge label="Âge" value={form.age ? `${form.age} ans` : ""} />
                    <ResultBadge label="Sexe" value={form.sexe && (form.sexe.charAt(0).toUpperCase() + form.sexe.slice(1))} />
                    <ResultBadge label="Logement" value={form.situationLogement && (form.situationLogement.charAt(0).toUpperCase() + form.situationLogement.slice(1))} />
                  </div>
                  <ResultBadge label="Handicap" value={form.handicap === "oui" ? "Oui" : form.handicap === "non" ? "Non" : ""} />
                </div>

                {/* Section 2 */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-black">2</span>
                    Parcours & formation
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ResultBadge label="Diplôme actuel" value={form.diplomActuel} />
                    <ResultBadge label="Filière souhaitée" value={form.filieresouhaitee} />
                  </div>
                  <ResultBadge label="Méthodes d'apprentissage"
                    value={form.methodesApprentissage.map((v) => methodesLabels[v]).join(", ")} />
                  <ResultBadge label="Modes d'exercice"
                    value={form.methodesExercice.map((v) => exerciceLabels[v]).join(", ")} />
                </div>
              </div>
            )}
          </div>

          {/* FOOTER BUTTONS */}
          <div className="px-7 pb-7 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button onClick={prev}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                Retour
              </button>
            ) : <div />}

          {step < 2 ? (
              <button onClick={next}>
                  Suivant
              </button>
          ) : (
              <div className="flex gap-3">
                  {/* Bouton Soumettre */}
                  <button onClick={submit}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm ...">
                      Obtenir ma recommandation
                  </button>

                  {/* Bouton Recommencer */}
                  <button onClick={reset}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm ...">
                      Recommencer
                  </button>
              </div>
          )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="w-full max-w-xs h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }} />
          </div>
          <p className="text-xs text-blue-400 font-medium">Étape {step + 1} sur {STEPS.length}</p>
        </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup} isLoad={isLoad} data={apiData}>
      </Popup>
      </main>
    </div>
  );
}
