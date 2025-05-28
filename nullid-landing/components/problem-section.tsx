"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { AlertTriangle, HelpCircle, ShieldOff } from "lucide-react"

export default function ProblemSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const cards = [
    {
      icon: <HelpCircle className="h-12 w-12" />,
      title: "Fake Identities",
      description: "People impersonate employees to scam others.",
    },
    {
      icon: <ShieldOff className="h-12 w-12" />,
      title: "No Native Verification",
      description: "Telegram lacks a built-in way to verify identities.",
    },
    {
      icon: <AlertTriangle className="h-12 w-12" />,
      title: "High Risk",
      description: "Users lose trust and funds due to scams.",
    },
  ]

  return (
    <section id="features" ref={ref} className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Stop Telegram Impersonation Scams
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center hover:shadow-md hover:translate-y-[-5px] transition-all duration-300"
            >
              <div className="mb-4 text-primary">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
