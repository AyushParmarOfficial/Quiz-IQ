import { motion } from "framer-motion"
import { Circle } from "lucide-react"
import { cn } from "../../../../lib/utils"

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]"
}) {
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0,
        rotate,
      }}
      className={cn("absolute", className)}
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}>
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        className="relative"
        style={{
          width,
          height,
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}>
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-black/[0.15] dark:border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_70%)] dark:after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )} />
      </motion.div>
    </motion.div>
  );
}

export function HeroGeometric({
  badge = "shadcn.io",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
  description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  className
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div
      className={cn(
        "relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-white/90 dark:bg-[#030303] transition-colors duration-300",
        className
      )}>
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          className="left-[-120%] xl:left-[-10%] lg:left-[-40%] md:left-[-60%] sm:left-[-65%] top-[8%] xl:top-[15%] lg:top-[15%] md:top-[12%] sm:top-[15%]"
          delay={0.3}
          gradient="from-indigo-500/[0.15]"
          height={140}
          rotate={12}
          width={600} />

        <ElegantShape
          className="right-[-85%] xl:right-[-5%] lg:right-[-30%] md:right-[-40%] sm:right-[-50%] top-[50%] lg:top-[65%] md:top-[65%] sm:top-[60%]"
          delay={0.5}
          gradient="from-rose-500/[0.15]"
          height={120}
          rotate={-15}
          width={500} />

        <ElegantShape
          className="left-[-30%] xl:left-[5%] lg:left-[-5%] md:left-[-8%] sm:left-[-12%] bottom-[20%] xl:bottom-[8%] lg:bottom-[8%] md:bottom-[6%] sm:bottom-[10%]"
          delay={0.4}
          gradient="from-violet-500/[0.15]"
          height={80}
          rotate={-8}
          width={300} />

        <ElegantShape
          className="right-[-8%] xl:right-[25%] lg:right-[20%] md:right-[15%] sm:right-[10%] top-[10%] xl:top-[10%] lg:top-[8%] md:top-[9%] sm:top-[12%]"
          delay={0.6}
          gradient="from-amber-500/[0.15]"
          height={60}
          rotate={20}
          width={200} />

      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">

          <motion.div animate="visible" custom={1} initial="hidden" variants={fadeUpVariants}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span
                className="bg-clip-text text-transparent bg-gradient-to-b from-black/90 dark:from-white to-black/70 dark:to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 dark:from-indigo-300 via-gray-800/90 dark:via-white/90 to-rose-700 dark:to-rose-300"
                )}>
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div animate="visible" custom={2} initial="hidden" variants={fadeUpVariants}>
            <p
              className="text-base sm:text-lg md:text-lg text-gray-700/60 dark:text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#030303] via-transparent to-white/80 dark:to-[#030303]/80 pointer-events-none" />
    </div>
  );
}
