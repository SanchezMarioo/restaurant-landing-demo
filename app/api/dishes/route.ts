import { NextResponse } from 'next/server'
import { allDishes } from '@/data/dishes'

export async function GET() {
  try {
    const dishes = allDishes.map((dish) => ({
      id: dish.id,
      name: dish.name,
      subtitle: dish.category,
      description: dish.description,
      technique: dish.description,
      price: dish.price,
      image: {
        id: dish.id,
        url: dish.image,
        alt: dish.name,
        width: 800,
        height: 600,
      },
      rating: dish.rating,
      featured: dish.featured,
      category: dish.category,
      dietary: dish.dietary,
      prepTime: dish.prepTime,
      ingredients: dish.ingredients || [],
    }))

    return NextResponse.json(dishes, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error serving dishes API:', error)
    return NextResponse.json({ error: 'Unable to load dishes' }, { status: 500 })
  }
}
