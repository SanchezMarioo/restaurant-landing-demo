import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Intentar obtener datos de Payload CMS
    const response = await fetch('https://api.mariosanchez.store/api/DishedFeatures', {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // Cache por 5 minutos
    })
    
    if (response.ok) {
      const data = await response.json()
      
      // Transformar los datos de Payload CMS al formato esperado
      const dishes = data.docs?.map((dish: any) => ({
        id: dish.id,
        name: dish.name,
        subtitle: dish.subtitle || 'Especialidad',
        description: dish.description,
        technique: dish.technique || 'Técnica tradicional',
        price: dish.price,
        image: {
          id: dish.image?.id || 1,
          url: dish.image?.url?.startsWith('http') 
            ? dish.image.url 
            : `https://api.mariosanchez.store${dish.image?.url || '/api/media/placeholder.jpg'}`,
          alt: dish.image?.alt || dish.name,
          width: dish.image?.width || 800,
          height: dish.image?.height || 600
        },
        rating: dish.rating || 4.8,
        featured: dish.featured || true,
        category: dish.category || 'Especialidad de la Casa',
      })) || []

      return NextResponse.json(dishes)
    }
  } catch (error) {
    console.error('Error fetching from Payload CMS:', error)
  }

  // Datos de fallback
  const fallbackDishes = [
    {
      id: 1,
      name: "Solomillo Wellington",
      subtitle: "Especialidad de la Casa",
      description: "Solomillo de ternera envuelto en hojaldre con duxelle de setas y foie gras, acompañado de salsa de vino tinto",
      technique: "Técnica tradicional francesa",
      price: "42€",
      image: {
        id: 1,
        url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        alt: "Solomillo Wellington",
        width: 800,
        height: 600
      },
      rating: 4.9,
      featured: true,
      category: "Especialidad de la Casa",
    },
    {
      id: 2,
      name: "Lubina en Costra de Sal",
      subtitle: "Pescado Fresco",
      description: "Lubina fresca del Mediterráneo cocinada en costra de sal con hierbas aromáticas y aceite de oliva virgen extra",
      technique: "Cocción tradicional mediterránea",
      price: "38€",
      image: {
        id: 2,
        url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
        alt: "Lubina en Costra de Sal",
        width: 800,
        height: 600
      },
      rating: 4.8,
      featured: true,
      category: "Pescado Fresco",
    },
    {
      id: 3,
      name: "Tarta Tatin de Manzana",
      subtitle: "Postre Clásico",
      description: "Tarta invertida de manzana caramelizada con masa quebrada artesanal, servida con helado de vainilla bourbon",
      technique: "Repostería francesa tradicional",
      price: "16€",
      image: {
        id: 3,
        url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3",
        alt: "Tarta Tatin de Manzana",
        width: 800,
        height: 600
      },
      rating: 4.9,
      featured: true,
      category: "Postre Clásico",
    }
  ]

  return NextResponse.json(fallbackDishes)
}
