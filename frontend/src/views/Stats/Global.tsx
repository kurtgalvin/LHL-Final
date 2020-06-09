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
  'US'
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

// export default ({}: IProps) => {
//   const [provinces, toggleProvince] = useToggleArray(["Alberta", "British Columbia",  "Ontario", "Quebec"])

//   const selectedCodes = provinces.map(p => (provinceCodes as any)[p]);
//   const selectedTotal = provinces.reduce((total, prov) => {
//     return total + (canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[prov]}_confirmed`]
//   }, 0);

//   return (
//     <>
//       <Paper className="ButtonGroup" elevation={3}>
//         {Object.keys(provinceCodes).map(p => {
//           return <GridButton
//             key={p}
//             title={p}
//             onClick={() => toggleProvince(p)}
//             active={provinces.includes(p)}
//             percent={Math.round(((canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[p]}_confirmed`] / selectedTotal) * 100)}
//           >
//             {(provinceCodes as any)[p]}<br/>
//             {(canadaData as any)[canadaData.length - 1][`${(provinceCodes as any)[p]}_confirmed`]}
//           </GridButton>
//         })}
//       </Paper>

//       <Paper className="LineChart" elevation={3}>
//         <LineChart data={canadaData} regions={selectedCodes}/>
//       </Paper>

//       <Paper className="RadarChart" elevation={3}>
//         <RadarChart data={canadaData[canadaData.length - 1]}  regions={selectedCodes} total={selectedTotal}/>
//       </Paper>
//     </>
//   )
// }