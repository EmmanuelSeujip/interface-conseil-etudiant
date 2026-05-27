import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import image from "@/assets/image/contact.svg"
import { useHeaderStore } from "@/store/useHeaderStore";
import { useEffect } from "react";

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const infoVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const contactItems = [
  { icon: MapPin, text: "Yaoundé, Cameroun" },
  { icon: Phone, text: "+237 6XX XXX XXX" },
  { icon: Mail, text: "contact@orientationplus.cm" },
];

const ContactPage = () => {
  const setNavActive = useHeaderStore((state) => state.setNavActive);
  useEffect(() => {
    setNavActive("contact");
  }, []);
  return (
    <div className="relative flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20 overflow-hidden">

      {/* Fond splitté — horizontal sur desktop, vertical sur mobile */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        <div className="h-1/2 md:h-auto md:w-1/2 bg-white" />
        <div className="h-1/2 md:h-auto md:w-1/2 bg-picton-blue-600" />
      </div>

      {/* Rectangles décoratifs */}
      <div className="absolute bottom-16 right-[44%] w-20 h-12 rounded-lg border border-white/20 bg-white/10 rotate-6" />
      <div className="absolute bottom-8 right-[40%] w-28 h-10 rounded-lg border border-white/15 bg-white/5 -rotate-3" />
      <div className="absolute bottom-28 right-[38%] w-14 h-14 rounded-lg border border-white/10 bg-white/5 rotate-12" />

      {/* Carte principale */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Colonne gauche — Formulaire */}
          <motion.div
            className="p-6 sm:p-10 flex flex-col gap-6"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-picton-blue-600 mb-2">
                Conctatez-nous
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Nous sommes là pour vous. Comment pouvons-nous vous aider ?
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Input
                placeholder="Votre nom complet"
                className="py-3 bg-picton-blue-50/50 border-0 rounded-xs focus-visible:ring-picton-blue-400 placeholder:text-black/60"
              />
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="py-3 bg-picton-blue-50/50 border-0 rounded-xs focus-visible:ring-picton-blue-400 placeholder:text-black/60"
              />
              <Textarea
                rows={5}
                placeholder="Allez-y, nous vous écoutons..."
                className="resize-none py-3 bg-picton-blue-50/50 border-0 rounded-xs focus-visible:ring-picton-blue-400 placeholder:text-black/60"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button className="w-full rounded-xl bg-picton-blue-600 hover:bg-picton-blue-700 text-white font-semibold py-5 gap-2">
                <Send size={15} />
                Envoyer
              </Button>
            </motion.div>
          </motion.div>

          {/* Colonne droite — Illustration + infos */}
          <motion.div
            className="bg-picton-blue-50 flex flex-col justify-between p-6 sm:p-8"
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="flex-1 flex items-center justify-center">
                <img src={image} alt="" />
            </div>

            <div className="flex flex-col gap-3 mt-6">
              {contactItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-picton-blue-200 bg-white text-picton-blue-600">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <span className="text-sm text-picton-blue-900">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;