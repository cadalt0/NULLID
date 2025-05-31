"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink } from "lucide-react"

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const fullText = "@NullIDBot verify @Bitcoin"
  const typingSpeed = 100

  useEffect(() => {
    if (inView) {
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.substring(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          setTypingDone(true)
        }
      }, typingSpeed)

      return () => clearInterval(typingInterval)
    }
  }, [inView])

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-6 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              NullID — Verified Identity, Zero Exposure
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Verify your work email on Telegram using privacy-first zero-knowledge proofs. Instantly prove who you are
              — no data stored, no scams.
            </p>
            <Button
              size="lg"
              className="rounded-md px-6 py-6 text-lg font-medium hover:bg-primary/90 transition-all flex items-center gap-2"
              data-tally-open="w8ydlA"
              data-tally-layout="modal"
              data-tally-align-left="1"
              data-tally-overlay="1"
              data-tally-emoji-text="🛡️"
              data-tally-emoji-animation="wave"
            >
              Join Waitlist
            </Button>
          </motion.div>

          {/* Right side - Telegram UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border flex flex-col" style={{height: '600px'}}>
              {/* Telegram header */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">
                    E
                  </div>
                  <div>
                    <div className="font-medium">@Bitcoin</div>
                    <div className="text-xs text-muted-foreground">last seen recently</div>
                  </div>
                </div>
              </div>

              {/* Chat content */}
              <div className="p-4 space-y-4 pb-0 flex-1" style={{minHeight: 0}}>
                {/* Incoming message bubble */}
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold">E</div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm p-3 max-w-[85%] text-left">
                    <p className="text-sm">Hey! I'm from the Bitcoin team. Let me know if you have any questions.</p>
                    <div className="text-xs text-right mt-1 text-muted-foreground">12:42 PM</div>
                  </div>
                </div>
              </div>
              {/* Inline verification card above input box */}
              {typingDone && (
                <div className="px-4 pt-2 pb-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-[#18181b] rounded-lg p-4 border shadow flex flex-col gap-1 text-[15px] font-mono"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-500 text-lg">✅</span>
                      <span className="text-white">@Bitcoin <span className='text-blue-400 font-semibold'>is</span> verified</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400">🏢</span>
                      <span className="text-white">Company: Bitcoin.org</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-purple-400">🔗</span>
                      <span className="text-white">View proof: <a href="#" className="text-blue-400 hover:underline">[<span className='text-blue-300'>zk-generated</span> proof link]</a></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⚡</span>
                      <span className="text-white">Verified <span className='text-blue-400'>on</span> Bitcoin</span>
                    </div>
                  </motion.div>
                </div>
              )}
              {/* Telegram input box with typing animation, styled like Telegram */}
              <div className="px-4 pb-4 pt-2 bg-transparent flex items-end gap-2">
                <div className="flex items-center bg-[#23232a] dark:bg-[#23232a] rounded-2xl px-4 py-3 flex-1 gap-3 shadow border border-[#23232a]">
                  {/* Smiley icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#bdbdbd" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
                  <span className="text-base text-white font-mono tracking-wide whitespace-pre">{typedText}{typedText.length < fullText.length && <span className="animate-pulse">|</span>}</span>
                  <div className="flex-1" />
                  {/* Attach icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#bdbdbd" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.5V7a4.5 4.5 0 0 0-9 0v7a6 6 0 0 0 12 0V8.5"/></svg>
                </div>
                {/* Send button */}
                <button
                  className="ml-2 p-3 rounded-full bg-[#7c5cff] text-white opacity-50 cursor-not-allowed flex items-center justify-center"
                  disabled
                  aria-label="Send"
                  style={{height: '48px', width: '48px'}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
