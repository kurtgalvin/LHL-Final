import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'

interface IProps {
  data: any
  regions: string[]
  total: number
}

export default ({ data, regions, total }: IProps) => {
  const chartData = regions.map(r => ({
    region: r,
    A: data[`${r}_confirmed`],
    fullMark: total
  }))
  console.log(chartData)
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart outerRadius={90} data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="region" />
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}