import React from 'react';

const initialMap = [ 
  [1,1,1,1,1,1,1,1,1,1,1,1,1], 
  [1,2,2,2,2,2,1,2,2,2,2,2,1], 
  [1,2,1,1,1,2,1,2,1,1,1,2,1], 
  [1,2,1,2,2,2,2,2,2,2,1,2,1], 
  [1,2,2,2,1,1,5,1,1,2,2,2,1], 
  [1,2,1,2,2,2,2,2,2,2,1,2,1], 
  [1,2,1,1,2,2,1,2,2,1,1,2,1], 
  [1,2,2,2,2,2,1,2,2,2,2,2,1], 
  [1,1,1,1,1,1,1,1,1,1,1,1,1]
]
const divClass = ["placeholder", "wall", "coin", "ground", "ghost", "pacman"]

const Pacman = function() {
  
  const [map, setMap] = React.useState(initialMap);
  const [pacmanPos, setPacmanPos] = React.useState({x:6, y: 4});

  return (
    <div className="pacman-game">
      {map.map( row => 
        <React.Fragment>
          {row.map( cell => <div className={divClass[cell]}></div>)}
          <br/>
        </React.Fragment>
      )}  
    </div> 
  )


}

export default Pacman;