"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Download, Lock, Zap, Globe, Layers } from "lucide-react"

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <Download className="h-6 w-6" />,
      title: "No Downloads Needed",
      description: "Use the inline bot directly in Telegram without installing anything else.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Fully Privacy-Preserving",
      description: "Zero-knowledge proofs ensure your data stays private.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Verification",
      description: "Check anyone's verified status in seconds, right inside Telegram.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Universal Access",
      description: "Works seamlessly across devices and Telegram clients.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Optional Public Profile",
      description: "Mint a soulbound NFT to showcase your verified identity publicly.",
    },
  ]

  return (
    <section id="telegram" ref={ref} className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Telegram-Native & Privacy-First
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto h-full lg:h-[680px]">
          {/* Left side - Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-lg shadow-md border p-6 flex items-center justify-center h-full"
          >
            <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 rounded-lg p-8 sm:p-4 md:p-8 h-full flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  G
                </div>
                <div>
                  <div className="font-medium">Crypto Group Chat</div>
                  <div className="text-xs text-muted-foreground">1,245 members</div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Normal chat message 1 */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-sm">
                    Anyone here into meme coins?
                  </div>
                </div>

                {/* Normal chat message 2 */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-sm">
                    Haha, not really, but I keep seeing new ones every day.
                  </div>
                </div>

                {/* Message from coin.eth */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-sm">
                    Hey! I'm from the Ethereum team. We're launching a new meme coin soon. Stay tuned!
                    <div className="text-xs text-muted-foreground mt-1">@coin.eth</div>
                  </div>
                </div>

                {/* More group chat messages */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-sm">
                    huh?
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 text-sm">
                    Looks suspicious!
                  </div>
                </div>

                {/* Inline verification disclaimer below input box */}
                <div className="ml-11 mt-4 sm:ml-2">
                  <div className="bg-[#18181b] rounded-lg p-4 sm:p-2 border border-red-500 shadow flex flex-col gap-1 text-[15px] sm:text-[13px] font-mono">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-500 text-base">❌</span>
                      <span className="text-white">@coin.eth <span className='text-red-500 font-semibold'>is not verified</span></span>
                    </div>
                    <div className="text-white mt-2">
                      <span className="text-red-400 font-semibold">Disclaimer:</span> This user could not be verified. Please exercise caution and do not trust claims of affiliation without proof.
                    </div>
                  </div>
                </div>
                {/* Telegram inline input box */}
                <div className="mt-6 flex items-center bg-[#23232a] rounded-2xl px-4 py-3 sm:px-2 sm:py-2 gap-3 shadow border border-[#23232a] w-full max-w-md sm:max-w-full font-mono text-white text-base sm:text-sm">
                  {/* Smiley icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#bdbdbd" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
                  <span className="whitespace-pre">@NullIDBot verify @coin.eth</span>
                  <div className="flex-1" />
                  {/* Attach icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#bdbdbd" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.5V7a4.5 4.5 0 0 0-9 0v7a6 6 0 0 0 12 0V8.5"/></svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Features */}
          <div className="space-y-6 h-full flex flex-col justify-between">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="bg-primary/10 rounded-full p-2 text-primary">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
