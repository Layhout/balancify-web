import { AnimatePresence, motion } from 'motion/react'

export function Splash({ show = true }: { show?: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black"
          exit={{ opacity: 0, scale: 1.3 }}
        >
          <h1 className="text-4xl font-bold text-white">B</h1>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
