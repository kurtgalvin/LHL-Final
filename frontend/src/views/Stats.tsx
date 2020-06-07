import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, YAxis, Tooltip, Brush, Line } from 'recharts';

import canadaData from '../data/canada.json'

const provincesCode = {
  "Alberta": "AB",
  "British Columbia": "BC",
  "Manitoba": "MB",
  "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL",
  "Nova Scotia": "NS",
  "Northwest Territories": "NT",
  "Ontario": "ON",
  "Prince Edward Island": "PE",
  "Quebec": "QC",
  "Saskatchewan": "SK",
  "Yukon": "YT"
}

interface IProps {

}

const StatsView = ({}: IProps) => {
  const [provinces, setProvinces] = useState<string[]>(["British Columbia", "Alberta"])
  const [lines, setLines] = useState<React.ReactElement[]>([])

  useEffect(() => {
    setLines(provinces.map((p) => {
      return <Line type="monotone" dataKey={`${(provincesCode as any)[p]}_confirmed`} stroke="#8884d8" dot={false} strokeWidth={3} />
    }))
  }, [provinces])

  return (
    <div className="Stats">
      <ResponsiveContainer width="45%" height={300} >
        <LineChart data={canadaData}>
          <YAxis/>
          <Tooltip/>
          {lines}
          <Brush dataKey="date" startIndex={50}>
            <LineChart>
              {lines.map(line => React.cloneElement(line, {stroke: "#82ca9d"}))}
            </LineChart>
          </Brush>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatsView