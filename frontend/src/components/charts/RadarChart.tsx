import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts'

const args: any = {
  confirmed: {
    dataKey: "Confirmed",
    color: "#8884d8"
  },
  deaths: {
    dataKey: "Deaths",
    color: "#fd613e"
  },
  active: {
    dataKey: "Active",
    color: "#73b2e8"
  },
  recovered: {
    dataKey: "Recovered",
    color: "#8deca2"
  }
}

interface IProps {
  data: any
  regions: string[]
  dataArgs: string[]
  total: number
}

export default ({ data, regions, dataArgs, total }: IProps) => {
  const chartData = regions.map(r => ({
    region: r,
    Confirmed: data[`${r}_confirmed`],
    Deaths: data[`${r}_deaths`],
    Active: data[`${r}_active`],
    Recovered: data[`${r}_recovered`],
    fullMark: total
  }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius={90} data={chartData}>
        {dataArgs.length && <PolarGrid />}
        {dataArgs.length && <PolarAngleAxis dataKey="region" />}
        <Legend />
        {dataArgs.map(a => <Radar key={a} dataKey={args[a].dataKey} stroke={args[a].color} fill={args[a].color} fillOpacity={0.6} />)}
      </RadarChart>
    </ResponsiveContainer>
  )
}