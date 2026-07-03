// Types for the furniture showroom application

export interface Product {
  id: string
  name: string
  price: string
  description: string
  image: string
  category: string
}

export interface Hotspot {
  id: string
  label: string
  x: number  // percentage from left
  y: number  // percentage from top
  product: Product
}

export interface Room {
  id: number
  name: string
  roomImg: string
  windowImg: string
  hotspots: Hotspot[]
}

export type Phase = 'window' | 'entering' | 'exiting' | 'room'
