import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';

import bc_data from '../data/bc_data.json'

interface IProps {

}

const StatsView: React.FC<IProps> = () => {

  return (
    <div className="Stats">
      <LineChart width={window.innerWidth} height={300} data={bc_data}>
        <XAxis dataKey="date"/>
        <YAxis/>
        <Tooltip/>
        <Line type="monotone" dataKey="confirmed" stroke="#8884d8" dot={false} onClick={() => console.log('here')} />
        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" dot={false} />
      </LineChart>
    </div>
  )
}

export default StatsView