# DESIGN — Lumière (v2: cálido / artesanal)

Sistema visual: restaurante boutique cálido, foto-primero, crema-carbón con
acento terracota. Sustituye a la v1 (minimalismo b/n frío, retirada por feedback).

## Color

| Token | Valor | Uso |
| --- | --- | --- |
| `bone` | `#F2EDE3` | Fondo base (crema/hueso, nunca blanco puro) |
| `bone-deep` | `#E8E0D0` | Paneles y bandas alternas: el crema tiene dos profundidades |
| `char` | `#2A2420` | Texto principal (carbón cálido, nunca negro puro) |
| `char-deep` | `#211B16` | Bandas oscuras (chef, footer) y degradados sobre foto |
| `umber` | `#5C4F44` | Texto secundario (6:1 sobre bone) |
| `terracotta` | `#8A5A3C` | Acento (≤8%): subrayados activos, palabra itálica del titular, precios |
| `terracotta-deep` | `#6E4028` | Hover del acento y texto acento pequeño |
| `terracotta-light` | `#C98E5F` | Acento SOBRE fondos oscuros/foto (contraste) |
| `hairline` / `hairline-light` | `rgba(42,36,32,.18)` / `rgba(242,237,227,.22)` | Reglas 1px |

Prohibido: rojo, verde menta, blanco/negro puros, sombras, degradados fríos.
Overlays de foto siempre en `char-deep`, nunca `#000`.

## Textura

Grano de papel `feTurbulence` inline (`--grain-dark` / `--grain-light` en
globals.css): el body lo lleva por defecto; `.texture` para paneles crema,
`.band-char` para bandas carbón (incluye bg + grano claro). Cero peticiones.

## Tipografía

| Rol | Fuente | Spec |
| --- | --- | --- |
| Display + itálicas | **Vollkorn** (`--font-vollkorn`, variable + italic) | 500–600, clamp(2.25→6rem); una palabra clave del titular en itálica terracota; números old-style nativos; comillas « »; drop cap en bio del chef |
| Cuerpo + labels | **Alegreya Sans** (`--font-alegreya-sans`, 400/500/700 + italic) | Humanista caligráfica; labels uppercase `tracking-label` (0.14em) solo funcionales |
| Precios | Vollkorn (old-style) | en terracota-deep sobre crema, bone sobre foto |

## Layout y fotografía

- **La foto manda**: hero = foto viewport completo con texto superpuesto;
  cada sección tiene presencia fotográfica (collage solapado, foto lateral a
  sangre, foto ancha con pull-quote, retrato que rompe la banda, fondo atenuado).
- Capas: paneles crema texturizados solapados sobre fotos (`-mt` + z);
  fotos apiladas con marco `border-[10px] border-bone` (polaroid, no card).
- Hairlines como estructura; radius 0; sin sombras.
- Grid carta: destacados a doble celda con caption superpuesta sobre degradado
  cálido; normales 4:5 con caption de carta impresa; lista con miniaturas.

## Motion

- Hero/cabeceras: secuencia CSS `.hero-anim` (`hero-rise/fade/settle`), estado
  estático = final, anulada por `prefers-reduced-motion`.
- Scroll: `<Reveal>` (framer-motion), fade + 12px, once, `useReducedMotion`.

## Interacción

- Foco visible: `2px #8A5A3C` sobre crema; crema sobre `.band-char`.
- CTA primario: bloque terracota → terracotta-deep.
- Activo nav/filtros: subrayado 2px terracota.

## Prohibiciones

Gradient text · icon-in-circle · rounded-2xl · sombras · pills/badges ·
carruseles automáticos · partículas · glassmorphism · estrellas amarillas ·
overlays negros puros · secciones de tipografía flotando sin foto.
