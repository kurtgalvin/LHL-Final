import React, { useEffect } from 'react'
import { LineChart, Line } from 'recharts'

interface IProps {

}

const StatsView: React.FC<IProps> = () => {
  return (
    <div className="Stats">
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
}

export default StatsView