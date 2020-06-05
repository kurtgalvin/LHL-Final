import React, { useState } from 'react';
import './App.css';

import MapView from './views/Map';
import StatsView from './views/Stats';
import NewsView from './views/News';

enum Routes {
  Map,
  Stats,
  News
}

interface Links {
  toMap: () => void,
  toState: () => void,
  toNews: () => void
}

function App() {
  const [route, setRoute] = useState<Routes>(Routes.Map)

  const links: Links = {
    toMap: () => setRoute(Routes.Map),
    toState: () => setRoute(Routes.Stats),
    toNews: () => setRoute(Routes.News)
  }


  return (
    <div className="App">
      {route === Routes.Map && <MapView />}
      {route === Routes.Stats && <StatsView />}
      {route === Routes.News && <NewsView />}
    </div>
  );
}

export default App;
