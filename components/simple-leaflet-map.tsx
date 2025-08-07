'use client'

import { useEffect, useRef } from 'react'

const SimpleLeafletMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('SimpleLeafletMap montado')
    
    if (!mapRef.current) {
      console.log('No hay referencia al contenedor')
      return
    }

    console.log('Inicializando mapa simple...')

    // Función para cargar CSS
    const loadCSS = () => {
      return new Promise<void>((resolve) => {
        if (document.querySelector('link[href*="leaflet"]')) {
          resolve()
          return
        }

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.onload = () => resolve()
        link.onerror = () => resolve() // Continuar incluso si falla
        document.head.appendChild(link)
        
        // Timeout de seguridad
        setTimeout(resolve, 1000)
      })
    }

    // Función para inicializar el mapa
    const initMap = async () => {
      try {
        console.log('Cargando CSS de Leaflet...')
        await loadCSS()
        
        console.log('Importando Leaflet...')
        const L = (await import('leaflet')).default

        const container = mapRef.current
        if (!container) {
          console.log('Contenedor no disponible')
          return
        }

        // Limpiar contenedor
        container.innerHTML = ''
        
        // Verificar dimensiones del contenedor
        console.log('Dimensiones del contenedor:', {
          width: container.offsetWidth,
          height: container.offsetHeight,
          clientWidth: container.clientWidth,
          clientHeight: container.clientHeight
        })

        if (container.offsetWidth === 0 || container.offsetHeight === 0) {
          console.log('Contenedor sin dimensiones, esperando...')
          setTimeout(() => initMap(), 100)
          return
        }

        console.log('Creando mapa...')
        const map = L.map(container).setView([40.4168, -3.7038], 15)

        console.log('Agregando tiles...')
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        console.log('Agregando marcador...')
        L.marker([40.4168, -3.7038])
          .addTo(map)
          .bindPopup('🍽️ Lumière Restaurant<br>Calle Gourmet 123, Madrid')
          .openPopup()

        console.log('Mapa creado exitosamente')

        // Forzar redimensionamiento
        setTimeout(() => {
          map.invalidateSize()
          console.log('Mapa redimensionado')
        }, 100)

      } catch (error) {
        console.error('Error al crear el mapa:', error)
        
        // Mostrar fallback
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="
              height: 100%;
              background: linear-gradient(135deg, #374151 0%, #1F2937 100%);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: white;
              text-align: center;
              padding: 2rem;
              font-family: system-ui, -apple-system, sans-serif;
            ">
              <div style="font-size: 2rem; margin-bottom: 1rem;">📍</div>
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1.2rem; color: #10B981;">Lumière Restaurant</h3>
              <p style="margin: 0 0 0.5rem 0; color: #D1D5DB;">Calle Gourmet 123, Madrid</p>
              <p style="margin: 0; color: #9CA3AF; font-size: 0.9rem;">Error al cargar el mapa</p>
            </div>
          `
        }
      }
    }

    // Inicializar con delay
    const timeoutId = setTimeout(initMap, 100)

    return () => {
      clearTimeout(timeoutId)
      if (mapRef.current) {
        mapRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div 
      ref={mapRef}
      style={{
        height: '100%',
        width: '100%',
        minHeight: '300px',
        borderRadius: '1rem',
        overflow: 'hidden',
        background: '#374151'
      }}
    />
  )
}

export default SimpleLeafletMap
