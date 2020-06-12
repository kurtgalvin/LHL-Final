import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core'

import './App.scss';
import MapView from './views/Map';
import StatsView from './views/Stats';
import NewsView from './views/News';
import InfoView from './views/Info'


enum Routes {
  Map,
  Stats,
  News,
  Info
}

interface Link {
  label: string,
  to: () => void
}

function App() {
  const [route, setRoute] = useState<Routes>(Routes.Map)

  const links: Link[] = [
    {
      label: "Map",
      to: () => setRoute(Routes.Map)
    },
    {
      label: "Stats",
      to: () => setRoute(Routes.Stats)
    },
    {
      label: "News",
      to: () => setRoute(Routes.News)
    },
    {
      label: "Info",
      to: () => setRoute(Routes.Info)
    }
  ]

  return (
    <div className="App">
      <Paper className="PaperHeader" elevation={3}>
        <div className="logo">
          <img src="/virus.svg" alt="virus"/>
          <h2>VanCovid</h2>
        </div>
        <Tabs 
          className="tabs"
          value={route}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {links.map((link, i) => <Tab key={i} label={link.label} onClick={link.to} />)}
        </Tabs>
      </Paper>

      {route === Routes.Map && <MapView />}
      {route === Routes.Stats && <StatsView />}
      {route === Routes.News && <NewsView />}   
      {route === Routes.Info && <InfoView />}
    </div>
  );
}

export default App;
