import { useEffect, useRef, useState } from 'react';
import cytoscape, { type ElementDefinition } from 'cytoscape';
// @ts-expect-error — cytoscape-fcose ships no types; treated as plugin module
import fcose from 'cytoscape-fcose';

cytoscape.use(fcose as never);

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'argument' | 'testimony' | 'saint' | 'miracle' | 'famousPerson';
  slug: string;
  hue?: number;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
}

interface Props {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

const TYPE_COLORS: Record<KnowledgeNode['type'], string> = {
  argument: '#f4d03f',     // gold
  testimony: '#7dd3fc',    // sky
  saint: '#f0abfc',        // fuchsia
  miracle: '#fda4af',      // rose
  famousPerson: '#a7f3d0', // emerald
};

const TYPE_LABELS: Record<KnowledgeNode['type'], string> = {
  argument: 'argument',
  testimony: 'świadectwo',
  saint: 'święty',
  miracle: 'cud',
  famousPerson: 'sławna osoba',
};

const TYPE_PATHS: Record<KnowledgeNode['type'], string> = {
  argument: '/argumenty',
  testimony: '/swiadectwa',
  saint: '/swieci',
  miracle: '/cuda-eucharystyczne',
  famousPerson: '/slawne-osoby',
};

export default function KnowledgeMap({ nodes, edges }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<KnowledgeNode | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements: ElementDefinition[] = [
      ...nodes.map(n => ({
        data: {
          id: n.id,
          label: n.label,
          type: n.type,
          slug: n.slug,
          color: n.hue !== undefined ? `hsl(${n.hue}, 70%, 65%)` : TYPE_COLORS[n.type],
          size: n.type === 'argument' ? 36 : 18,
        },
      })),
      ...edges.map(e => ({ data: { id: `${e.source}->${e.target}`, source: e.source, target: e.target } })),
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label': 'data(label)',
            'color': '#f5f1e8',
            'font-size': '10px',
            'font-family': 'Inter Variable, system-ui, sans-serif',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'text-outline-width': 2,
            'text-outline-color': '#0a0e27',
            'text-outline-opacity': 0.85,
            'width': 'data(size)',
            'height': 'data(size)',
            'border-width': 2,
            'border-color': '#0a0e27',
            'overlay-padding': 8,
          },
        },
        {
          selector: 'node:selected, node:active',
          style: { 'border-width': 3, 'border-color': '#f4d03f' },
        },
        {
          selector: 'edge',
          style: {
            'width': 1,
            'line-color': 'rgba(244, 208, 63, 0.25)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'none',
          },
        },
        {
          selector: 'node[type="argument"]',
          style: {
            'font-size': '12px',
            'font-weight': 600,
            'border-width': 3,
          },
        },
      ],
      layout: ({
        name: 'fcose',
        animate: true,
        animationDuration: 600,
        nodeRepulsion: 8000,
        idealEdgeLength: 80,
        edgeElasticity: 0.3,
        gravity: 0.15,
        randomize: true,
        quality: 'default',
        packComponents: true,
      } as never),
      wheelSensitivity: 0.2,
      minZoom: 0.3,
      maxZoom: 3,
    });

    cy.on('mouseover', 'node', (evt) => {
      const n = evt.target;
      setHovered({
        id: n.id(),
        label: n.data('label'),
        type: n.data('type'),
        slug: n.data('slug'),
      });
      containerRef.current!.style.cursor = 'pointer';
    });
    cy.on('mouseout', 'node', () => {
      setHovered(null);
      containerRef.current!.style.cursor = '';
    });
    cy.on('tap', 'node', (evt) => {
      const n = evt.target;
      const path = TYPE_PATHS[n.data('type') as KnowledgeNode['type']];
      const slug = n.data('slug');
      if (path && slug) {
        window.location.href = `${path}/${slug}`;
      }
    });

    return () => cy.destroy();
  }, [nodes, edges]);

  return (
    <div className="relative w-full h-[80vh] min-h-[500px] rounded-xl border border-border/40 bg-card/30 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 rounded-lg border border-border/40 bg-background/85 backdrop-blur p-3 text-xs space-y-1.5 max-w-[12rem]">
        <p className="font-mono uppercase tracking-widest opacity-60 text-[10px] mb-1">Legenda</p>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full border border-background" style={{ background: color }} />
            <span className="capitalize">{TYPE_LABELS[type as KnowledgeNode['type']]}</span>
          </div>
        ))}
      </div>

      {/* Hover tooltip */}
      {hovered && (
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border border-primary/40 bg-background/90 backdrop-blur text-sm text-center max-w-[88vw]">
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            {TYPE_LABELS[hovered.type]}
          </p>
          <p className="font-medium">{hovered.label}</p>
        </div>
      )}

      <p className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-muted-foreground/60">
        Kółko myszy — zoom · klik — przejdź
      </p>
    </div>
  );
}
