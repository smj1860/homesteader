// src/app/api/contractors/route.ts
import { NextRequest, NextResponse } from "next/server"

const GOOGLE_KEY = process.env.GOOGLE_MAPS_API_KEY

// Maps our UI tab values to good Places search keywords
const SERVICE_KEYWORD: Record<string, string> = {
  all:        "homestead contractor",
  plumbing:   "plumber",
  electrical: "electrician",
  handyman:   "handyman",
  septic:     "septic service",
  welldrill:  "well drilling",
  fencing:    "fencing contractor",
}

async function zipToLatLng(zip: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${GOOGLE_KEY}`
  const res  = await fetch(url)
  const data = await res.json()
  if (data.status !== "OK" || !data.results[0]) return null
  return data.results[0].geometry.location
}

async function searchContractors(lat: number, lng: number, keyword: string) {
  // 50km radius — wide enough for rural areas
  const url = [
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
    `?location=${lat},${lng}`,
    `&radius=50000`,
    `&keyword=${encodeURIComponent(keyword)}`,
    `&type=general_contractor`,
    `&key=${GOOGLE_KEY}`,
  ].join("")

  const res  = await fetch(url)
  const data = await res.json()

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(`Places API error: ${data.status}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.results || []).slice(0, 9).map((place: any) => ({
    id:       place.place_id,
    name:     place.name,
    rating:   place.rating ?? null,
    reviews:  place.user_ratings_total ?? 0,
    address:  place.vicinity ?? "",
    open:     place.opening_hours?.open_now ?? null,
    keywords: (place.types || [])
      .filter((t: string) => !["point_of_interest", "establishment"].includes(t))
      .slice(0, 4)
      .map((t: string) => t.replace(/_/g, " ")),
    mapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
  }))
}

export async function GET(req: NextRequest) {
  if (!GOOGLE_KEY) {
    return NextResponse.json(
      { error: "Google Maps API key not configured." },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(req.url)
  const zip     = searchParams.get("zip")?.trim()
  const service = searchParams.get("service") || "all"

  if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { error: "Please enter a valid 5-digit zip code." },
      { status: 400 }
    )
  }

  try {
    const coords = await zipToLatLng(zip)
    if (!coords) {
      return NextResponse.json(
        { error: "Couldn't find that zip code. Double-check it and try again." },
        { status: 404 }
      )
    }

    const keyword     = SERVICE_KEYWORD[service] ?? "contractor"
    const contractors = await searchContractors(coords.lat, coords.lng, keyword)

    return NextResponse.json({ contractors, coords })
  } catch (err) {
    console.error("[contractors API]", err)
    return NextResponse.json(
      { error: "Something went wrong fetching contractors. Try again in a moment." },
      { status: 500 }
    )
  }
}
