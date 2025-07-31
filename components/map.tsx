'use client';

import { useState, useEffect, useRef } from 'react';
import { LatLngExpression } from 'leaflet';

// Lazy imports para reducir bundle inicial
const loadLeafletComponents = async () => {
  // Cargar CSS solo cuando sea necesario
  await import('./map.css');
  
  const [
    { MapContainer },
    { TileLayer },
    { Marker },
    { Popup },
    L
  ] = await Promise.all([
    import('react-leaflet').then(mod => ({ MapContainer: mod.MapContainer })),
    import('react-leaflet').then(mod => ({ TileLayer: mod.TileLayer })),
    import('react-leaflet').then(mod => ({ Marker: mod.Marker })),
    import('react-leaflet').then(mod => ({ Popup: mod.Popup })),
    import('leaflet')
  ]);

  // Configurar iconos solo cuando sea necesario
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  return { MapContainer, TileLayer, Marker, Popup };
};

const Map = () => {
  const [components, setComponents] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const position: LatLngExpression = [40.4168, -3.7038]; // Madrid, España

  // Intersection Observer para cargar solo cuando sea visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !components) {
          setIsVisible(true);
          loadLeafletComponents().then(setComponents);
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, [components]);

  // Mostrar placeholder mientras carga
  if (!components) {
    return (
      <div 
        ref={mapRef}
        className="h-full w-full rounded-2xl bg-zinc-800/50 flex items-center justify-center"
      >
        {isVisible ? (
          <div className="animate-pulse text-zinc-400">Cargando mapa...</div>
        ) : (
          <div className="text-zinc-500">📍 Madrid, España</div>
        )}
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = components;

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden">
      <MapContainer 
        center={position} 
        zoom={15} 
        className="h-full w-full"
        scrollWheelZoom={false}
        doubleClickZoom={true}
        zoomControl={true}
        attributionControl={false}
        preferCanvas={true} // Mejora rendimiento
        updateWhenZooming={false}
        updateWhenIdle={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
          tileSize={256}
          keepBuffer={1} // Reducido para mejor rendimiento
          updateWhenZooming={false}
          updateWhenIdle={true}
        />
        <Marker position={position}>
          <Popup closeButton={false} className="custom-popup">
            <div className="text-center p-1">
              <h3 className="font-semibold text-zinc-900 text-sm">Lumière Restaurant</h3>
              <p className="text-xs text-zinc-600 mt-1">
                Calle Gourmet 123, Madrid
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
