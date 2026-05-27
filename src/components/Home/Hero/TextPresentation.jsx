import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const TextPresentation = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["conseil", "aide", "guidance", "orientation"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-10 py-20 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4 cursor-pointer" onClick={() => window.location.href = "/documentation"}>
              Lire notre documentation <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-6xl max-w-3xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Donnons vie à vos ambitions</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Nous offrons une orientation académique sur-mesure, des 
              conseils de carrière stratégiques, des recommandations de filières ciblées et 
              des opportunités professionnelles adaptées afin de transformer vos ambitions en 
              un avenir radieux et sécurisé.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4 cursor-pointer transition-colors" variant="outline" onClick={() => window.location.href = "/contact"}>
              Nous contacter <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4 cursor-pointer transition-colors" onClick={() => window.location.href = "/formulaire"}>
              Demander une orientation <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextPresentation;
