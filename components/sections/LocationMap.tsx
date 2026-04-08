'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { LocationData } from '@/lib/locations/data';

interface LocationMapProps {
  locations: LocationData[];
}

const FILTER_OPTIONS = [
  { value: 'all', label: 'All locations' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'supply-chain', label: 'Supply Chain' },
  { value: 'storage', label: 'Storage' },
];

const SERVICE_LABELS: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  'supply-chain': 'Supply Chain',
  'data-center': 'Data Center',
  storage: 'Storage',
  warehousing: 'Warehousing',
};

export function LocationMap({ locations }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [mapReady, setMapReady] = useState(false);

  const filteredLocations =
    filter === 'all' ? locations : locations.filter((l) => l.services.includes(filter));

  const activeLocation = activeSlug ? locations.find((l) => l.slug === activeSlug) : null;

  // Init Leaflet once
  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return;

    // Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    void import('leaflet').then((L) => {
      if (!mapRef.current || leafletRef.current) return;

      const map = L.map(mapRef.current, {
        center: [38.5, -96],
        zoom: 4,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      leafletRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, []);

  // Update markers when filter or active changes
  useEffect(() => {
    if (!mapReady || !leafletRef.current) return;

    void import('leaflet').then((L) => {
      const map = leafletRef.current;

      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      filteredLocations.forEach((location) => {
        if (!location.coordinates) return;
        const { lat, lng } = location.coordinates;
        const isActive = location.slug === activeSlug;

        const markerHtml = `
          <div style="
            width:${isActive ? 18 : 14}px;
            height:${isActive ? 18 : 14}px;
            background:${isActive ? '#00263F' : '#00a4eb'};
            border:2.5px solid white;
            border-radius:50%;
            box-shadow:0 2px 6px rgba(0,0,0,0.35);
            cursor:pointer;
            transition:all 0.15s;
          "></div>`;

        const icon = L.divIcon({
          html: markerHtml,
          className: '',
          iconSize: [isActive ? 18 : 14, isActive ? 18 : 14],
          iconAnchor: [isActive ? 9 : 7, isActive ? 9 : 7],
        });

        const marker = L.marker([lat, lng], { icon })
          .addTo(map)
          .on('click', () => {
            setActiveSlug((prev) => (prev === location.slug ? null : location.slug));
          });

        marker.bindTooltip(`<strong>${location.city}, ${location.state}</strong>`, {
          direction: 'top',
          offset: [0, -8],
          className: 'armstrong-tooltip',
        });

        markersRef.current.push(marker);
      });
    });
  }, [mapReady, filteredLocations, activeSlug]);

  // Pan to active location
  useEffect(() => {
    if (!mapReady || !leafletRef.current || !activeLocation?.coordinates) return;
    leafletRef.current.panTo([activeLocation.coordinates.lat, activeLocation.coordinates.lng], {
      animate: true,
      duration: 0.5,
    });
  }, [mapReady, activeLocation]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Map panel */}
      <div className="lg:col-span-2">
        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                filter === opt.value
                  ? 'bg-armstrong-blue text-white'
                  : 'border-armstrong-grey-3 text-armstrong-grey-1 hover:border-armstrong-blue hover:text-armstrong-blue border',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Map container */}
        <div
          ref={mapRef}
          className="border-armstrong-grey-3 relative overflow-hidden rounded-xl border shadow-sm"
          style={{ height: '480px' }}
          aria-label={`Map of Armstrong locations — ${filteredLocations.length} shown`}
        />

        <p className="text-armstrong-grey-2 mt-2 text-center text-xs">
          {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} · click a
          pin for details
        </p>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col">
        {activeLocation ? (
          <LocationDetail location={activeLocation} onClose={() => setActiveSlug(null)} />
        ) : (
          <LocationList locations={filteredLocations} onSelect={setActiveSlug} />
        )}
      </div>

      {/* Tooltip styles injected once */}
      <style>{`
        .armstrong-tooltip {
          background: #00263F;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 12px;
          padding: 4px 10px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
        .armstrong-tooltip::before {
          border-top-color: #00263F !important;
        }
        .leaflet-tooltip-top.armstrong-tooltip::before {
          border-top-color: #00263F;
        }
      `}</style>
    </div>
  );
}

function LocationDetail({ location, onClose }: { location: LocationData; onClose: () => void }) {
  return (
    <div className="border-armstrong-blue rounded-xl border bg-white p-6 shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-armstrong-dark-blue text-xl font-semibold">
            {location.city}, {location.state}
          </h3>
          <a
            href={`tel:${location.phone.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '+1$1$2$3')}`}
            className="text-armstrong-blue mt-1 block text-sm font-medium hover:underline"
          >
            {location.phone}
          </a>
        </div>
        <button
          onClick={onClose}
          className="text-armstrong-grey-2 hover:text-armstrong-dark-blue ml-2"
          aria-label="Close location detail"
        >
          ✕
        </button>
      </div>

      {location.address.street && (
        <address className="text-armstrong-grey-1 mb-4 text-sm not-italic">
          {location.address.street}
          <br />
          {location.address.city}, {location.address.state} {location.address.zip}
        </address>
      )}

      <div className="mb-4">
        <p className="text-armstrong-grey-1 mb-2 text-xs font-semibold tracking-wider uppercase">
          Services
        </p>
        <ul className="flex flex-wrap gap-2">
          {location.services.map((s) => (
            <li
              key={s}
              className="bg-armstrong-grey-3 text-armstrong-dark-blue rounded-full px-3 py-1 text-xs font-medium"
            >
              {SERVICE_LABELS[s] ?? s}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/locations/${location.slug}`}
          className="bg-armstrong-blue block rounded-md px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#0090d0]"
        >
          View {location.city} office
        </Link>
        <Link
          href={`/get-moving-with-armstrong?city=${location.slug}`}
          className="border-armstrong-grey-3 text-armstrong-dark-blue hover:bg-armstrong-grey-3 block rounded-md border px-4 py-2.5 text-center text-sm font-semibold"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}

function LocationList({
  locations,
  onSelect,
}: {
  locations: LocationData[];
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="border-armstrong-grey-3 max-h-[480px] overflow-y-auto rounded-xl border bg-white">
      <div className="border-armstrong-grey-3 sticky top-0 border-b bg-white px-4 py-3">
        <p className="text-armstrong-dark-blue text-sm font-semibold">
          {locations.length} location{locations.length !== 1 ? 's' : ''}
        </p>
      </div>
      <ul>
        {locations.map((location) => (
          <li key={location.slug}>
            <button
              onClick={() => onSelect(location.slug)}
              className="border-armstrong-grey-3 hover:bg-armstrong-grey-3 flex w-full items-center justify-between border-b px-4 py-3 text-left last:border-0"
            >
              <div>
                <p className="text-armstrong-dark-blue text-sm font-medium">
                  {location.city}, {location.state}
                </p>
                <p className="text-armstrong-grey-1 text-xs">{location.phone}</p>
              </div>
              <span className="text-armstrong-grey-2" aria-hidden="true">
                ›
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
