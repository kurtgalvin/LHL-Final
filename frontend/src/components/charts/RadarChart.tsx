import React from 'react'
import { ResponsiveContainer, RadarChart } from 'recharts'

export default () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart outerRadius={90}>

      </RadarChart>
    </ResponsiveContainer>
  )
}