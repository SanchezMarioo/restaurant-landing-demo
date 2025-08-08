// lib/api.ts
export interface Dish {
  id: number
  name: string
  subtitle: string
  description: string
  technique: string
  price: string
  image: {
    id: number
    url: string
    alt?: string
    width?: number
    height?: number
  }
  rating: number
  featured: boolean
  category: string
}

export interface ApiResponse {
  docs: Dish[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

export async function getSignatureDishes(): Promise<Dish[]> {
  try {
    const response = await fetch('https://api.mariosanchez.store/api/DishedFeatures', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 5 minutes (300 seconds) for better performance
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    
    // Transform the data to match our component's expected format
    return data.docs.map(dish => ({
      ...dish,
      image: {
        ...dish.image,
        // Ensure we have the full URL for the image
        url: dish.image.url.startsWith('http') 
          ? dish.image.url 
          : `https://api.mariosanchez.store${dish.image.url}`
      }
    }))
  } catch (error) {
    console.error('Error fetching signature dishes:', error)
    
    // Fallback data in case API fails
    return [
      {
        id: 1,
        name: "Solomillo Wellington",
        subtitle: "Especialidad de la Casa",
        description: "Solomillo de ternera envuelto en hojaldre con duxelle de setas y foie gras, acompañado de salsa de vino tinto",
        technique: "Técnica tradicional francesa",
        price: "42€",
        image: {
          id: 6,
          url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
          alt: "Solomillo Wellington"
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
          id: 7,
          url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
          alt: "Lubina en Costra de Sal"
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
          id: 8,
          url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3",
          alt: "Tarta Tatin de Manzana"
        },
        rating: 4.9,
        featured: true,
        category: "Postre Clásico",
      }
    ]
  }
}
