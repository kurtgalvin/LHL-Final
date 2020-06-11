import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core'

import './App.scss';
import MapView from './views/Map';
import StatsView from './views/Stats';
import NewsView from './views/News';
import InfoView from './views/Info'
import DistractionView from './views/Distraction';

enum Routes {
  Map,
  Stats,
  News,
  Info,
  Distraction
}

interface Link {
  label: string,
  to: () => void
}

function App() {
  const [route, setRoute] = useState<Routes>(Routes.Stats)

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
      label: "Distraction",
      to: () => setRoute(Routes.Distraction)
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
          <img src="/virus.svg"/>
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
      {route === Routes.Distraction && <DistractionView />}
    </div>
  );
}

export default App;
