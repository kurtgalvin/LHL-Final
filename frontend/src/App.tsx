import React, { useState } from 'react';
import './App.css';

import Map from './views/Map';

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
      {route === Routes.Map && <Map />}
    </div>
  );
}

export default App;
