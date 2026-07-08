"use client"

import { useState } from "react"
import Reveal from "@/components/reveal"
import type { Dish } from "@/data/dishes"

interface MenuGridProps {
  dishes: Dish[]
  viewMode: "grid" | "list"
}

/**
 * La carta foto-primero: los platos destacados ocupan doble celda con el
 * nombre superpuesto sobre la fotografía (degradado de carbón cálido); el
 * resto, fotos 4:5 generosas con caption de carta impresa. La vista lista
 * conserva miniaturas: la foto nunca desaparece.
 */
export default function MenuGrid({ dishes, viewMode }: MenuGridProps) {
  if (dishes.length === 0) {
    return (
      <div className="border-t border-hairline py-20">
        <p className="font-serif text-2xl italic text-char">Ningún plato coincide con los filtros.</p>
        <p className="mt-3 text-base text-umber">Pruebe con otra categoría u otra opción de dieta.</p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="border-t border-hairline">
        {dishes.map((dish, index) => (
          <DishRow key={dish.id} dish={dish} index={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-flow-dense grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
      {dishes.map((dish, index) =>
        dish.featured ? (
          <FeaturedDishCard key={dish.id} dish={dish} index={index} />
        ) : (
          <DishCard key={dish.id} dish={dish} index={index} />
        ),
      )}
    </div>
  )
}

function DietaryLabels({ dish }: { dish: Dish }) {
  if (dish.dietary.length === 0) return null
  return <span>{dish.dietary.join(" · ")}</span>
}

function DishImage({ dish }: { dish: Dish }) {
  const [src, setSrc] = useState(dish.image)
  return (
    <img
      src={src}
      alt={`${dish.name} — ${dish.description}`}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      onError={() => setSrc("/placeholder.jpg")}
    />
  )
}

/** Destacado: doble celda, la foto manda y el texto vive sobre ella. */
function FeaturedDishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <Reveal delay={(index % 4) * 0.06} className="col-span-2">
      <article className="on-photo group relative overflow-hidden">
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <DishImage dish={dish} />
          <div
            className="absolute inset-0 bg-gradient-to-t from-char-deep/90 via-char-deep/30 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
          <p className="text-xs font-medium uppercase tracking-label text-terracotta-light">
            Especialidad de la casa
          </p>
          <div className="mt-2 flex items-baseline">
            <h3 className="font-serif text-2xl font-medium text-bone lg:text-[1.75rem]">{dish.name}</h3>
            <span className="leaders" aria-hidden="true" />
            <span className="font-serif text-xl text-bone">{dish.price}</span>
          </div>
          <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-bone/85">{dish.description}</p>
          <p className="mt-2.5 text-[0.6875rem] uppercase tracking-label text-bone/60">
            {dish.category}
            {dish.dietary.length > 0 && " · "}
            <DietaryLabels dish={dish} />
          </p>
        </div>
      </article>
    </Reveal>
  )
}

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <Reveal delay={(index % 4) * 0.06}>
      <article className="group">
        <div className="relative aspect-[4/5] overflow-hidden">
          <DishImage dish={dish} />
        </div>

        <div className="mt-4 flex items-baseline">
          <h3 className="font-serif text-xl font-medium text-char">{dish.name}</h3>
          <span className="leaders" aria-hidden="true" />
          <span className="font-serif text-lg text-terracotta-deep">{dish.price}</span>
        </div>

        <p className="mt-1.5 text-sm leading-relaxed text-umber">{dish.description}</p>

        <p className="mt-2.5 text-[0.6875rem] uppercase tracking-label text-umber">
          {dish.category}
          {dish.dietary.length > 0 && " · "}
          <DietaryLabels dish={dish} />
        </p>
      </article>
    </Reveal>
  )
}

function DishRow({ dish, index }: { dish: Dish; index: number }) {
  return (
    <Reveal delay={(index % 6) * 0.04}>
      <article className="group flex gap-5 border-b border-hairline py-6 sm:gap-7">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden sm:h-28 sm:w-28">
          <DishImage dish={dish} />
        </div>

        <div className="min-w-0 flex-1">
          {dish.featured && (
            <p className="mb-1 text-[0.6875rem] font-medium uppercase tracking-label text-terracotta">
              Especialidad de la casa
            </p>
          )}
          <div className="flex items-baseline">
            <h3 className="font-serif text-xl font-medium text-char sm:text-2xl">{dish.name}</h3>
            <span className="leaders" aria-hidden="true" />
            <span className="font-serif text-lg text-terracotta-deep">{dish.price}</span>
          </div>
          <p className="mt-1.5 max-w-[65ch] text-sm leading-relaxed text-umber">{dish.description}</p>
          <p className="mt-2 text-[0.6875rem] uppercase tracking-label text-umber">
            {dish.category}
            {dish.dietary.length > 0 && " · "}
            <DietaryLabels dish={dish} />
          </p>
        </div>
      </article>
    </Reveal>
  )
}
