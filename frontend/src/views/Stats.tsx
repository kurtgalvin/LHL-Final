import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, YAxis, Tooltip, Brush, Line } from 'recharts';
import { ButtonGroup, Button, Tooltip as MaterialTooltip, Paper, LinearProgress } from '@material-ui/core'

import './Stats.scss'
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

const totalToday = Object.keys(provincesCode).reduce((total, prov) => {
  return total + (canadaData as any)[canadaData.length - 1][`${(provincesCode as any)[prov]}_confirmed`]
}, 0)

interface IProps {

}

const randomColour = () => {
  const random = () => Math.floor(Math.random() * 255)
  return `rgb(${random()}, ${random()}, ${random()})`
}

const StatsView = ({}: IProps) => {
  const [provinces, setProvinces] = useState<string[]>(["Alberta", "British Columbia",  "Ontario", "Quebec"])
  const [lines, setLines] = useState<React.ReactElement[]>([])

  let totalOfSelected = provinces.reduce((total, prov) => {
    return total + (canadaData as any)[canadaData.length - 1][`${(provincesCode as any)[prov]}_confirmed`]
  }, 0);

  useEffect(() => {
    setLines(provinces.map((p) => {
      return <Line type="monotone" dataKey={`${(provincesCode as any)[p]}_confirmed`} stroke={randomColour()} dot={false} strokeWidth={3} />
    }))
  }, [provinces])

  return (
    <div className="Stats">
      <Paper className="ButtonGroup" elevation={3}>
        {Object.keys(provincesCode).map(p => {
          return (
            <MaterialTooltip title={p}>
              <Button 
                color="primary"
                onClick={() => setProvinces(pArr => pArr.includes(p) ? pArr.filter(i => i !== p) : [...pArr, p])} 
                variant={provinces.includes(p) ? 'contained' : 'text'}
              >
                {(provincesCode as any)[p]}<br/>
                {(canadaData as any)[canadaData.length - 1][`${(provincesCode as any)[p]}_confirmed`]}<br/>
                {provinces.includes(p) && <LinearProgress 
                  className="Progress" 
                  color="secondary" 
                  variant="buffer" 
                  value={Math.round(((canadaData as any)[canadaData.length - 1][`${(provincesCode as any)[p]}_confirmed`] / totalOfSelected) * 100)}
                />}
              </Button>
            </MaterialTooltip>
          )
        })}
      </Paper>

      <Paper className="Chart" elevation={3}>
        {/* <h1>Provinces</h1> */}
        <ResponsiveContainer width="100%" height={300} >
          <LineChart data={canadaData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            {/* <YAxis/> */}
            <Tooltip/>
            {lines}
            <Brush dataKey="date" startIndex={50}>
              <LineChart>
                {lines.map(line => React.cloneElement(line, {stroke: "rgb(82, 189, 242)"}))}
              </LineChart>
            </Brush>
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  )
}

export default StatsView