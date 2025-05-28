"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Mail, Shield, MessageCircle } from "lucide-react"

export default function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const steps = [
    {
      icon: <Mail className="h-10 w-10" />,
      title: "Verify Work Email",
      description: "User confirms their professional email address.",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Generate Zero-Knowledge Proof",
      description: "A privacy-preserving proof is created without exposing details.",
    },
    {
      icon: <MessageCircle className="h-10 w-10" />,
      title: "Instant Telegram Verification",
      description: "Anyone can verify identity instantly via inline bot.",
    },
  ]

  return (
    <section id="how-it-works" ref={ref} className="py-20 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          How It Works
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-primary/20 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="bg-card rounded-full p-5 shadow-md border mb-6 z-10 relative">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
