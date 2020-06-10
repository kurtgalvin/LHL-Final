import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

interface IProps {
  data: any
  regions: string[]
}

export default ({ data, regions }: IProps) => {
  const prepedData = regions.map(r => ({
    region: r,
    Deaths: data[`${r}_deaths`],
    // Active: data[`${r}_confirmed`] - (data[`${r}_deaths`] + data[`${r}_recovered`]),
    Active: data[`${r}_active`],
    Recovered: data[`${r}_recovered`]
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={prepedData}>
        <XAxis dataKey="region" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Deaths" stackId="a" fill="#fd613e" />
        <Bar dataKey="Active" stackId="a" fill="#73b2e8" />
        <Bar dataKey="Recovered" stackId="a" fill="#8deca2" />
      </BarChart>
    </ResponsiveContainer>
  )
}