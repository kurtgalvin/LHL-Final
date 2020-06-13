import React, { useState } from 'react'
import { Paper, Button } from '@material-ui/core'

import '../styles/Stats.scss'
import canadaData from '../data/canada.json'
import globalData from '../data/global.json'
import useToggleArray from '../hooks/useToggleArray'
import GridButton from '../components/GridButton'
import LineChart from '../components/charts/LineChart'
import StackedBarChart from '../components/charts/StackedBarChart'

interface IParam {
  title: string,
  value: string
}

const args: IParam[] = [
  {
    title: "Confirmed",
    value: "confirmed"
  },
  {
    title: "Deaths",
    value: "deaths"
  },
  {
    title: "Recovered",
    value: "recovered"
  },
  {
    title: "Active",
    value: "active"
  }
]

const provinces: IParam[] = [
  {
    title: "Alberta",
    value: "AB"
  },
  {
    title: "British Columbia",
    value: "BC"
  },
  {
    title: "Manitoba",
    value: "MB"
  },
  {
    title: "New Brunswick",
    value: "NB"
  },
  {
    title: "Newfoundland and Labrador",
    value: "NL"
  },
  {
    title: "Nova Scotia",
    value: "NS"
  },
  {
    title: "Northwest Territories",
    value: "NT"
  },
  {
    title: "Ontario",
    value: "ON"
  },
  {
    title: "Prince Edward Island",
    value: "PE"
  },
  {
    title: "Quebec",
    value: "QC"
  },
  {
    title: "Saskatchewan",
    value: "SK"
  },
  {
    title: "Yukon",
    value: "YT"
  }
]

const countries: IParam[] = [
  {
    title: "Canada",
    value: "Canada"
  },
  {
    title: "Austria",
    value: "Austria"
  },
  {
    title: "US",
    value: "US"
  },
  {
    title: "Russia",
    value: "Russia"
  },
  {
    title: "Italy",
    value: "Italy"
  },
  {
    title: "Iran",
    value: "Iran"
  },
  {
    title: "New Zealand",
    value: "New Zealand"
  },
  {
    title: "South Africa",
    value: "South Africa"
  },
  {
    title: "Mexico",
    value: "Mexico"
  },
  {
    title: "UK",
    value: "UK"
  },
  {
    title: "France",
    value: "France"
  },
  {
    title: "Germany",
    value: "Germany"
  }
]

enum DailyRange {
  Week,
  Month,
  ThreeMonths,
  All
}

export default () => {
  const [canada, setCanada] = useState<boolean>(true)
  const [argsSelected, toggleArg] = useToggleArray(["confirmed"])
  const [provincesSelected, toggleProvince] = useToggleArray(["AB", "BC",  "ON", "QC"])
  const [countriesSelected, toggleCountry] = useToggleArray(["Canada", "Iran", "France", "Russia"])
  const [dailyRangeSelection, setDailyRangeSelection] = useState(DailyRange.Month)

  const dataLastIndex = canada ? (canadaData as any)[canadaData.length - 1] : (globalData as any)[globalData.length - 1]
  const currSelected = canada ? provincesSelected : countriesSelected
  const currToggle = canada ? toggleProvince : toggleCountry
  const currSelectedTotal = currSelected.reduce((total, prov) => {
    return total + dataLastIndex[`${prov}_confirmed`]
  }, 0)
  
  let currData: any[] | undefined
  if (dailyRangeSelection === DailyRange.Week) {
    currData = canada ? canadaData.slice(-7) : globalData.slice(-7)
  } else if (dailyRangeSelection === DailyRange.Month) {
    currData = canada ? canadaData.slice(-30) : globalData.slice(-30)
  } else if (dailyRangeSelection === DailyRange.ThreeMonths) {
    currData = canada ? canadaData.slice(-90) : globalData.slice(-90)
  } else if (dailyRangeSelection === DailyRange.All) {
    currData = canada ? canadaData : globalData
  }

  return (
    <div className="Stats">
      <Paper className="CanadaGlobalToggle" elevation={3}>
        <Button 
          color="primary" 
          variant={canada ? 'contained' : 'outlined'}
          onClick={() => setCanada(true)}
        >Canada</Button>
        <Button 
          color="primary" 
          variant={canada ? 'outlined' : 'contained'}
          onClick={() => setCanada(false)}
        >Global</Button>
      </Paper>
      <Paper className="CaseTypeSelectors" elevation={3}>
        <div className="CaseTypeSelectors__ButtonGroup">
          {args.map(i => <Button 
              key={i.value}
              color="primary" 
              variant={argsSelected.includes(i.value) ? 'contained' : 'outlined'}
              onClick={() => toggleArg(i.value)}
            >
              {i.title}
            </Button>
          )}
        </div>
        <h1>Cumulative</h1>
      </Paper>
      
      <Paper className="ButtonGroup" elevation={3}>
        {(canada ? provinces : countries).map(pObj => {
          return <GridButton
            key={pObj.value}
            title={pObj.title}
            onClick={() => currToggle(pObj.value)}
            active={currSelected.includes(pObj.value)}
            percent={Math.round((dataLastIndex[`${pObj.value}_confirmed`] / currSelectedTotal) * 100)}
          >
            {pObj.value}<br/>
            {dataLastIndex[`${pObj.value}_confirmed`]}
          </GridButton>
        })}
      </Paper>

      <Paper className="CumulativeLineChart" elevation={3}>
        <LineChart data={(currData as any)} regions={currSelected} dataArgs={argsSelected} brush={false} syncId="sync-me-up" />
      </Paper>

      <Paper className="BarChartTitle" elevation={3}>
        <h1>Cumulative</h1>
      </Paper>

      <Paper className="DailyLineChartTitle" elevation={3}>
        <div className="DailyLineChartTitle__ButtonGroup">
          <Button 
            color="primary" 
            variant={dailyRangeSelection === DailyRange.Week ? 'contained' : 'outlined'}
            onClick={() => setDailyRangeSelection(DailyRange.Week)}
          >Week</Button>
          <Button 
            color="primary" 
            variant={dailyRangeSelection === DailyRange.Month ? 'contained' : 'outlined'}
            onClick={() => setDailyRangeSelection(DailyRange.Month)}
          >Month</Button>
          <Button 
            color="primary" 
            variant={dailyRangeSelection === DailyRange.ThreeMonths ? 'contained' : 'outlined'}
            onClick={() => setDailyRangeSelection(DailyRange.ThreeMonths)}
          >3 Months</Button>
          <Button 
            color="primary" 
            variant={dailyRangeSelection === DailyRange.All ? 'contained' : 'outlined'}
            onClick={() => setDailyRangeSelection(DailyRange.All)}
          >All</Button>
        </div>
        <h1>Daily</h1>
      </Paper>

      <Paper className="StackedBarChart" elevation={3}>
        <StackedBarChart data={dataLastIndex} regions={currSelected} />
      </Paper>

      <Paper className="DailyLineChart" elevation={3}>
        <LineChart data={(currData as any)} regions={currSelected} dataArgs={argsSelected} brush={false} syncId="sync-me-up" prefix="daily_" />
      </Paper>
    </div>
  )
}