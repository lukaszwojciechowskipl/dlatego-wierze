import { useEffect, useRef, type PropsWithChildren } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps the page in a Lenis smooth-scroll context, synced with GSAP's ticker
 * so ScrollTrigger updates land on the correct frame. Bails out entirely on
 * `prefers-reduced-motion: reduce` and on touch devices with low CPU.
 */
export default function LenisProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd = (navigator.hardwareConcurrency ?? 4) < 4;
    if (reduceMotion || lowEnd) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      autoResize: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
