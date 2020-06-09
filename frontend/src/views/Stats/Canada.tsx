import React from 'react';
import { Paper } from '@material-ui/core'

import canadaData from '../../data/canada.json'
import GridButton from '../../components/GridButton'
import LineChart from '../../components/charts/LineChart'
import RadarChart from '../../components/charts/RadarChart'
import useToggleArray from '../../hooks/useToggleArray'

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
  const [provinces, toggleProvince] = useToggleArray(["Alberta", "British Columbia",  "Ontario", "Quebec"])

  const selectedCodes = provinces.map(p => (provinceCodes as any)[p]);
  const selectedTotal = provinces.reduce((total, prov) => {
    return total + (canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[prov]}_confirmed`]
  }, 0);

  return (
    <>
      <Paper className="ButtonGroup" elevation={3}>
        {Object.keys(provinceCodes).map(p => {
          return <GridButton
            title={p}
            onClick={() => toggleProvince(p)}
            active={provinces.includes(p)}
            percent={Math.round(((canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[p]}_confirmed`] / selectedTotal) * 100)}
          >
            {(provinceCodes as any)[p]}<br/>
            {(canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[p]}_confirmed`]}
          </GridButton>
        })}
      </Paper>

      <Paper className="LineChart" elevation={3}>
        <LineChart data={canadaData} regions={selectedCodes}/>
      </Paper>

      <Paper className="RadarChart" elevation={3}>
        <RadarChart data={canadaData[canadaData.length - 1]}  regions={selectedCodes} total={selectedTotal}/>
      </Paper>
    </>
  )
}