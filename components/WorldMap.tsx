"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const WorldMap = () => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null)

  const countries = [
    { id: 'US', name: 'United States', d: "M...", cx: 200, cy: 220 },
    { id: 'CA', name: 'Canada', d: "M...", cx: 230, cy: 180 },
    { id: 'GB', name: 'United Kingdom', d: "M...", cx: 470, cy: 200 },
    { id: 'IN', name: 'India', d: "M...", cx: 680, cy: 320 },
    { id: 'AU', name: 'Australia', d: "M...", cx: 850, cy: 480 },
    // Add more countries as needed
  ]

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
      >
        {countries.map((country) => (
          <motion.path
            key={country.id}
            d={country.d}
            fill={activeCountry === country.id ? "#3b82f6" : "#e2e8f0"}
            stroke="#fff"
            strokeWidth="0.5"
            onMouseEnter={() => setActiveCountry(country.id)}
            onMouseLeave={() => setActiveCountry(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        ))}
        {countries.map((country) => (
          <motion.circle
            key={`dot-${country.id}`}
            cx={country.cx}
            cy={country.cy}
            r="4"
            fill="#ef4444"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          />
        ))}
      </svg>
      {activeCountry && (
        <div className="absolute top-0 left-0 bg-white p-2 rounded shadow">
          {countries.find(c => c.id === activeCountry)?.name}
        </div>
      )}
    </div>
  )
}

export default WorldMap
