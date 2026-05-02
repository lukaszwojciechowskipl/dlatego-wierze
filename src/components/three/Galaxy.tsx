import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { CONSTELLATIONS, type Constellation } from '@/lib/constants';
import ConstellationNode from './ConstellationNode';

interface GalaxyState {
  isMobile: boolean;
  reducedMotion: boolean;
  ready: boolean;
}

function useViewportState(): GalaxyState {
  const [state, setState] = useState<GalaxyState>({
    isMobile: false,
    reducedMotion: false,
    ready: false,
  });
  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () =>
      setState({
        isMobile: mqMobile.matches,
        reducedMotion: mqReduce.matches,
        ready: true,
      });
    update();
    mqMobile.addEventListener('change', update);
    mqReduce.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqReduce.removeEventListener('change', update);
    };
  }, []);
  return state;
}

function GalaxyScene({
  isMobile,
  reducedMotion,
  onHover,
  hovered,
}: {
  isMobile: boolean;
  reducedMotion: boolean;
  onHover: (c: Constellation | null) => void;
  hovered: Constellation | null;
}) {
  const radius = 10;
  const handleSelect = (c: Constellation) => {
    window.location.href = `/argumenty/${c.slug}`;
  };

  return (
    <>
      <color attach="background" args={['#0a0e27']} />
      <Stars
        radius={300}
        depth={60}
        count={isMobile ? 1500 : 3500}
        factor={4}
        fade
        speed={reducedMotion ? 0 : 1}
        saturation={0}
      />
      {CONSTELLATIONS.map((c) => (
        <ConstellationNode
          key={c.id}
          constellation={c}
          radius={radius}
          onSelect={handleSelect}
          onHover={onHover}
          active={hovered?.id === c.id}
          showLabels
          reducedSparkles={isMobile}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.35}
        rotateSpeed={0.4}
        enableDamping
        dampingFactor={0.08}
      />
      {!isMobile && !reducedMotion && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom intensity={0.65} luminanceThreshold={0.35} luminanceSmoothing={0.2} mipmapBlur />
        </EffectComposer>
      )}
    </>
  );
}

export default function Galaxy() {
  const { isMobile, reducedMotion, ready } = useViewportState();
  const [hovered, setHovered] = useState<Constellation | null>(null);

  // While media-queries resolve we render nothing — the parent provides a
  // matching CSS fallback so the user never sees a flash of background.
  if (!ready) return null;

  return (
    <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [0, 0, 22], fov: 50 }}
      >
        <Suspense fallback={null}>
          <GalaxyScene
            isMobile={isMobile}
            reducedMotion={reducedMotion}
            onHover={setHovered}
            hovered={hovered}
          />
        </Suspense>
      </Canvas>

      {/* Hover preview — pinned to the bottom-right corner so it never collides
          with the headline overlay in the bottom-left. */}
      {hovered && (
        <div
          className="pointer-events-none absolute bottom-6 right-4 sm:right-6 max-w-[280px] rounded-xl border border-border/60 bg-background/90 backdrop-blur px-4 py-3 shadow-2xl"
          style={{ borderColor: `hsl(${hovered.hue} 70% 55% / 0.55)` }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            Konstelacja {String(hovered.id).padStart(2, '0')} · kliknij, by przeczytać
          </p>
          <p className="font-serif text-base mt-0.5" style={{ color: `hsl(${hovered.hue} 70% 70%)` }}>
            {hovered.shortName}
          </p>
          <p className="text-xs text-muted-foreground mt-1.5 leading-snug line-clamp-3">
            {hovered.teaser}
          </p>
        </div>
      )}
    </div>
  );
}
