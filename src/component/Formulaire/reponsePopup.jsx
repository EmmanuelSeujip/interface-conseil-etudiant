// src/component/Formulaire/reponsePopup.jsx
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import ResultChart from "./ResultChart";

export default function Popup({ isOpen, onClose, isLoad, data }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-t-2xl" />

            <div className="p-6 space-y-5">
              {isLoad ? (
                <div className="flex flex-col items-center justify-center min-h-60 gap-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
                  <p className="text-blue-400 text-sm font-medium animate-pulse">
                    Analyse de votre profil en cours...
                  </p>
                </div>
              ) : data ? (
                <>
                  {/* Graphique */}
                  <ResultChart predictions={data.predictions} />

                  {/* Message LLM en Markdown */}
                  {data.message && (
                    <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                      <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3">
                        Votre recommandation personnalisée
                      </p>
                      <div className="prose prose-sm prose-blue max-w-none text-slate-700
                        [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-4 [&>strong]:text-blue-700">
                        <ReactMarkdown>{data.message}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            <div className="px-6 pb-6">
              <button onClick={onClose}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}