import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

export interface WorldMapMarker {
  id: string;
  name: string;
  slug: string;
  place?: string;
  year?: number;
  kind?: string;
  lat: number;
  lng: number;
}

interface Props {
  markers: WorldMapMarker[];
}

// Public Natural Earth dataset of country boundaries — fetched from a CDN.
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

const COSMOS_DEEP = '#0a0e27';
const COSMOS_FOG = '#3a4878';
const COSMOS_GOLD = '#f4d03f';

export default function WorldMap({ markers }: Props) {
  const [hovered, setHovered] = useState<WorldMapMarker | null>(null);

  return (
    <div className="relative w-full">
      <div className="aspect-[16/9] rounded-xl border border-border/40 bg-card/30 overflow-hidden">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 170 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup zoom={1} maxZoom={6} minZoom={0.7} center={[10, 30]}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: COSMOS_FOG, stroke: COSMOS_DEEP, strokeWidth: 0.4, outline: 'none' },
                      hover:   { fill: COSMOS_FOG, stroke: COSMOS_GOLD, strokeWidth: 0.6, outline: 'none' },
                      pressed: { fill: COSMOS_FOG, stroke: COSMOS_GOLD, strokeWidth: 0.6, outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map((m) => (
              <Marker
                key={m.id}
                coordinates={[m.lng, m.lat]}
                onMouseEnter={() => setHovered(m)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => { window.location.href = `/cuda-eucharystyczne/${m.slug}`; }}
                style={{ default: { cursor: 'pointer' }, hover: { cursor: 'pointer' }, pressed: { cursor: 'pointer' } }}
              >
                <circle r={5} fill={COSMOS_GOLD} fillOpacity={0.9} stroke={COSMOS_DEEP} strokeWidth={1} />
                <circle r={10} fill={COSMOS_GOLD} fillOpacity={0.18} className="pulse-dot" />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {hovered && (
        <div
          className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border border-primary/40 bg-background/90 backdrop-blur text-sm text-center max-w-[88vw] shadow-lg"
        >
          <p className="font-medium">{hovered.name}</p>
          {(hovered.place || hovered.year) && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {[hovered.place, hovered.year].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      )}

      <style>{`
        .pulse-dot {
          animation: pulse-grow 2.4s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        @keyframes pulse-grow {
          0%, 100% { transform: scale(1);   opacity: 0.18; }
          50%      { transform: scale(2.2); opacity: 0;    }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}
