import React from 'react';
import { Paper } from '@material-ui/core'

import globalData from '../../data/global.json'
import GridButton from '../../components/GridButton'
import LineChart from '../../components/charts/LineChart'
import RadarChart from '../../components/charts/RadarChart'
import useToggleArray from '../../hooks/useToggleArray'

const countryNames = [
  'Canada', 
  'Austria', 
  'US', 
  'Russia', 
  'Italy', 
  'Iran', 
  'New Zealand', 
  'South Africa', 
  'Mexico', 
  'UK', 
  'France', 
  'Germany'
]

interface IProps {}

export default ({}: IProps) => {
  const [countries, toggleCountries] = useToggleArray(["Canada"])

  const selectedTotal = countries.reduce((total, c) => {
    return total + (globalData as any)[globalData.length - 1][`${c}_confirmed`]
  }, 0);

  return (
    <>
      <Paper className="ButtonGroup" elevation={3}>
        {countryNames.map(c => {
          return <GridButton
            key={c}
            title={c}
            onClick={() => toggleCountries(c)}
            active={countries.includes(c)}
            percent={Math.round(((globalData as any)[globalData.length - 1][`${c}_confirmed`] / selectedTotal) * 100)}
          >
            {c}<br/>
            {(globalData as any)[globalData.length - 1][`${c}_confirmed`]}
          </GridButton>
        })}
      </Paper>

      <Paper className="LineChart" elevation={3}>
        <LineChart data={globalData} regions={countries}/>
      </Paper>

      <Paper className="RadarChart" elevation={3}>
        <RadarChart data={globalData[globalData.length - 1]}  regions={countries} total={selectedTotal}/>
      </Paper>
    </>
  )
}
