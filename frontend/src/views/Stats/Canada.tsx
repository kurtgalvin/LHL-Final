import React, { useState, useEffect } from 'react';
// import { ResponsiveContainer, LineChart, Tooltip, Brush, Line } from 'recharts';
import { Paper } from '@material-ui/core'

import canadaData from '../../data/canada.json'
import GridButton from '../../components/GridButton'
import LineChart from '../../components/charts/LineChart'
import RadarChart from '../../components/charts/RadarChart'

const provinceCodes = {
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

interface IProps {}

export default ({}: IProps) => {
  const [provinces, setProvinces] = useState<string[]>(["Alberta", "British Columbia",  "Ontario", "Quebec"])

  let totalOfSelected = provinces.reduce((total, prov) => {
    return total + (canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[prov]}_confirmed`]
  }, 0);

  return (
    <>
      <Paper className="ButtonGroup" elevation={3}>
        {Object.keys(provinceCodes).map(p => {
          return <GridButton
            title={p}
            onClick={() => setProvinces(pArr => pArr.includes(p) ? pArr.filter(i => i !== p) : [...pArr, p])}
            active={provinces.includes(p)}
            percent={Math.round(((canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[p]}_confirmed`] / totalOfSelected) * 100)}
          >
            {(provinceCodes as any)[p]}<br/>
            {(canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[p]}_confirmed`]}
          </GridButton>
        })}
      </Paper>

      <Paper className="LineChart" elevation={3}>
        <LineChart data={canadaData} regions={provinces} regionCodes={provinceCodes} />
      </Paper>

      <Paper className="RadarChart" elevation={3}>
        <RadarChart />
      </Paper>
    </>
  )
}