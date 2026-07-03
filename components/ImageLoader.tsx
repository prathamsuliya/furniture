'use client'

import { useEffect } from 'react'

interface ImageLoaderProps {
  urls: string[]
}

/**
 * Preloads all images in the background using the browser Image API.
 * Renders nothing visible — pure side-effect component.
 */
export default function ImageLoader({ urls }: ImageLoaderProps) {
  useEffect(() => {
    urls.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [urls])

  return null
}
