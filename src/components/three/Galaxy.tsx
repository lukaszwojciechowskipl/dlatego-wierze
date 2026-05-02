import { Suspense, useEffect, useRef, useState, type RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { CONSTELLATIONS, type Constellation } from '@/lib/constants';
import ConstellationNode from './ConstellationNode';

// Minimal shape we use from the OrbitControls instance — avoids pulling in
// `three-stdlib` just for the type.
interface OrbitControlsLike {
  addEventListener(event: 'start' | 'end' | 'change', handler: () => void): void;
  removeEventListener(event: 'start' | 'end' | 'change', handler: () => void): void;
}

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
  isDraggingRef,
}: {
  isMobile: boolean;
  reducedMotion: boolean;
  onHover: (c: Constellation | null) => void;
  hovered: Constellation | null;
  isDraggingRef: RefObject<boolean>;
}) {
  const radius = 10;
  const orbitRef = useRef<OrbitControlsLike>(null);

  // Wire the OrbitControls 'start' / 'end' events into our shared drag flag
  // so a drag-then-release on a constellation isn't mistaken for a click.
  useEffect(() => {
    const controls = orbitRef.current;
    if (!controls) return;
    const onStart = () => { isDraggingRef.current = true; };
    const onEnd = () => {
      // Clear on the next macrotask so any pointerup that arrives at a
      // constellation in the same flush still sees the drag flag set.
      window.setTimeout(() => { isDraggingRef.current = false; }, 80);
    };
    controls.addEventListener('start', onStart);
    controls.addEventListener('end', onEnd);
    return () => {
      controls.removeEventListener('start', onStart);
      controls.removeEventListener('end', onEnd);
    };
  }, [isDraggingRef]);

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
          isDraggingRef={isDraggingRef}
        />
      ))}
      <OrbitControls
        ref={orbitRef as never}
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.3}
        rotateSpeed={0.35}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.68}
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
  const isDraggingRef = useRef(false);

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
            isDraggingRef={isDraggingRef}
          />
        </Suspense>
      </Canvas>

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
