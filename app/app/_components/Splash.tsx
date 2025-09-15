import { AnimatePresence, motion } from 'motion/react'

export function Splash({ show = true }: { show?: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-primary bg-gradient-to-r from-[#C47E09] to-[#CC5200]"
          exit={{ opacity: 0, scale: 1.3 }}
        >
          <img src="/assets/svgs/balancify-logo.svg" className="w-12 shrink-0 object-contain" alt="logo" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
