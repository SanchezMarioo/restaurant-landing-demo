# Lumière — Restaurante gastronómico en Madrid

register: brand

## Qué es

Landing de un restaurante de alta gastronomía en Madrid (cocina de autor, menú
degustación, producto de temporada). Dos superficies: home (narrativa de marca +
reserva) y carta (18 platos con filtros y orden). El deliverable ES el diseño:
la web debe transmitir el nivel de la casa antes de que el visitante lea una línea.

## Audiencia y escena

Una pareja reserva desde el sofá un martes por la noche; también conserjes de
hotel y prensa gastronómica. La web se lee como un restaurante boutique real:
luz baja, lino crudo, madera con años de sobremesa — no como una plantilla.

## Voz de marca (palabras físicas)

Masa madre · barro cocido · lino crudo bajo luz de vela.

## Dirección visual (v2, fijada por el cliente)

Cálido / artesanal, foto-primero. La v1 (minimalismo blanco/negro con acento
burdeos) se retiró por feedback: fría, vacía, tipografía sin carácter.

- Paleta crema-carbón: fondo `#F2EDE3` (nunca blanco puro), texto `#2A2420`
  (nunca negro puro), acento terracota quemado `#8A5A3C` con moderación.
  PROHIBIDO rojo y verde menta.
- Textura de papel/lino sutil en fondos (grano feTurbulence inline).
- Tipografía con carácter: Vollkorn (serif "de pan integral", old-style,
  itálicas caligráficas) + Alegreya Sans (humanista cálida). Nada de serif
  elegante de stock ni sans utilitaria fría.
- LA FOTOGRAFÍA ES LO PRINCIPAL: fotos grandes a sangre en cada sección clave;
  composición en capas (foto + panel crema solapado, marcos bone tipo polaroid).
- El espacio se usa, no se deja en blanco: siempre hay algo que mirar.

## Anti-referencias (prohibido volver)

Blanco/negro puros · rojo o verde menta · serif de plantilla · secciones
vacías de solo tipografía · icon-in-circle de colores · cards rounded-2xl con
sombra · gradient text · badges pill · carruseles automáticos · partículas ·
glassmorphism · overlays negros puros sobre foto.

## Restricciones técnicas

Next.js 15 App Router · Tailwind 3.4 · Framer Motion · next/font (Google Fonts).
Mantener intactos: metadata/SEO, JSON-LD, ids de sección para scroll-spy
(`hero`, `menu`, `experience`, `chef`, `testimonials`, `contact`), datos de
`data/dishes.ts` y la API de props de los componentes de carta.
