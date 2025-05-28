"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, Twitter } from "lucide-react"

export default function CtaSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="waitlist" ref={ref} className="py-20 px-4 md:px-6">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Verify Your Identity or Check Others Instantly
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground mb-10"
        >
          Start building trust and stopping scams on Telegram today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <Button size="lg" className="rounded-md px-8 py-6 text-lg font-medium hover:bg-primary/90 transition-all" data-tally-open="w8ydlA" data-tally-layout="modal" data-tally-align-left="1" data-tally-overlay="1" data-tally-emoji-text="🛡️" data-tally-emoji-animation="wave">
            Join Waitlist
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-md px-8 py-6 text-lg font-medium hover:bg-primary/10 transition-all"
          >
            Try Inline Bot
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground"
        >
          <div>© 2025 NullID</div>

          <div className="flex items-center gap-6 my-4 sm:my-0">
            <a href="#" className="hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>

          <ThemeToggle />
        </motion.div>
      </div>
    </section>
  )
}
