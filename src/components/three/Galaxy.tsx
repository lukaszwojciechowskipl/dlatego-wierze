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
      {/* Subtle ambient + a single key light off to the side gives the
          standard-material spheres a real 3D shading gradient without
          flattening their emissive glow. */}
      <ambientLight intensity={0.35} />
      <pointLight position={[18, 12, 14]} intensity={1.1} color="#fff5ea" distance={120} decay={1.2} />
      <pointLight position={[-14, -8, -10]} intensity={0.4} color="#aab8ff" distance={100} decay={1.4} />
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

      {hovered && (
        <div
          className="pointer-events-none absolute bottom-6 right-4 sm:right-6 max-w-[340px] rounded-xl border-2 bg-background/95 backdrop-blur-md px-5 py-4 shadow-2xl"
          style={{ borderColor: `hsl(${hovered.hue} 70% 55% / 0.7)` }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.28em] mb-1.5"
            style={{ color: `hsl(${hovered.hue} 70% 70%)` }}
          >
            Argument {String(hovered.id).padStart(2, '0')} · kliknij, by otworzyć
          </p>
          <p className="font-serif text-lg leading-tight mb-2 text-foreground">
            {hovered.shortName}
          </p>
          <p className="text-sm text-foreground/85 leading-relaxed">
            {hovered.teaser}
          </p>
        </div>
      )}
    </div>
  );
}
