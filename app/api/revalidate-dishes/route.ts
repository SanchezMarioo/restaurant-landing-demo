import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  try {
    const secret = process.env.REVALIDATE_SECRET
    if (secret) {
      const provided = new URL(request.url).searchParams.get('secret') || ''
      if (provided !== secret) {
        return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
      }
    }
    revalidateTag('dishes')
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'error' }, { status: 500 })
  }
}

export async function GET() {
  // opcional: permitir GET para prueba manual
  try {
    revalidateTag('dishes')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
