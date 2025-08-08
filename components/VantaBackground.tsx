'use client'
import { useState, useEffect, useRef } from 'react'

// Define the types for the Vanta and p5 objects on the window
declare global {
  interface Window {
    VANTA: any
    p5: any
  }
}

interface VantaBackgroundProps {}

const VantaBackground = (props: VantaBackgroundProps) => {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    let effect = null
    if (window.VANTA) {
      effect = window.VANTA.TRUNK({
        el: vantaRef.current,
        p5: window.p5,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1,
        scaleMobile: 1,
        color: 0x98465F, // Rose Mauve
        backgroundColor: 0x222426, // Charcoal
        spacing: 1,
        chaos: 6.0,
      })
      setVantaEffect(effect)
    }

    return () => {
      if (effect) (effect as any).destroy()
    }
  }, [])

  return <div ref={vantaRef} className="absolute inset-0 z-0" />
}

export default VantaBackground