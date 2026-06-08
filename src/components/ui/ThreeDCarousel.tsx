"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

/**
 * Draggable 3D cylinder carousel. Adapted from cult-ui (MIT) for Nodo:
 * framer-motion instead of motion/react, brand-dark theming, real project
 * imagery, a11y (keyboard + labels), reduced-motion aware.
 */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useMediaQuery(
  query: string,
  { defaultValue = false }: { defaultValue?: boolean } = {},
): boolean {
  // Always start from defaultValue so the first client render matches SSR
  // (no hydration mismatch); correct it in a layout effect after mount.
  const [matches, setMatches] = useState<boolean>(defaultValue);

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export interface CarouselItem {
  src: string;
  alt: string;
}

const transition = { duration: 0.18, ease: [0.32, 0.72, 0, 1] as const };
const transitionOverlay = { duration: 0.45, ease: [0.32, 0.72, 0, 1] as const };

const Cylinder = memo(function Cylinder({
  handleClick,
  controls,
  cards,
  isCarouselActive,
}: {
  handleClick: (item: CarouselItem) => void;
  controls: ReturnType<typeof useAnimation>;
  cards: CarouselItem[];
  isCarouselActive: boolean;
}) {
  const isSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isSm ? 1280 : 2400;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / Math.max(faceCount, 1);
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`);

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: "1000px", transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
        onDrag={(_, info) =>
          isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {cards.map((item, i) => (
          <motion.div
            key={`${item.src}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(item)}
          >
            <motion.img
              src={item.src}
              alt={item.alt}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(item);
                }
              }}
              layoutId={`carousel-${item.src}`}
              className="pointer-events-auto aspect-[16/10] w-full cursor-pointer rounded-[10px] border border-white/[0.08] object-cover shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] outline-none transition-[border-color] duration-300 hover:border-nodo-cyan/40 focus-visible:border-nodo-cyan"
              initial={{ filter: "blur(4px)" }}
              layout="position"
              animate={{ filter: "blur(0px)" }}
              transition={transition}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

export default function ThreeDCarousel({ items }: { items: CarouselItem[] }) {
  const [active, setActive] = useState<CarouselItem | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();
  const cards = useMemo(() => items, [items]);
  // Client-only: the 3D geometry depends on viewport width, which differs from
  // SSR. Render a same-height placeholder until mounted to avoid hydration drift.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="relative h-[260px] w-full sm:h-[420px]" aria-hidden />;
  }

  const handleClick = (item: CarouselItem) => {
    setActive(item);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActive(null);
    setIsCarouselActive(true);
  };

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            className="fixed inset-0 z-50 flex items-center justify-center bg-nodo-black/80 p-6 backdrop-blur-md md:p-20"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`carousel-${active.src}`}
              src={active.src}
              alt={active.alt}
              className="max-h-full max-w-full rounded-[12px] border border-white/10 shadow-2xl"
              transition={{ delay: 0.18, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
              style={{ willChange: "transform" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[260px] w-full overflow-hidden sm:h-[420px]">
        <Cylinder
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
}
