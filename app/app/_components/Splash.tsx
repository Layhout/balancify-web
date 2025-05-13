import { AnimatePresence, motion } from 'motion/react'

export function Splash({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.3 }}
        >
          <h1 className="text-4xl font-bold">B</h1>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
