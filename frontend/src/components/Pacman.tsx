import React from 'react';
import useEventListener from '@use-it/event-listener'

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
  
  const handler = function (event: any) {
    const tmpMap = [...map];
    if (event.keyCode === 37){ // PACMAN MOVE LEFT
			if ( map[pacmanPos.y][pacmanPos.x-1] !== 1){
        tmpMap[pacmanPos.y][pacmanPos.x] = 3;
        tmpMap[pacmanPos.y][pacmanPos.x - 1] = 5;
        setMap(tmpMap);
        setPacmanPos({ ...pacmanPos, x: pacmanPos.x - 1});
        
        
			}
		}
		else if (event.keyCode === 38){ // PACMAN MOVE UP
			if ( map[pacmanPos.y-1][pacmanPos.x] !== 1){
        tmpMap[pacmanPos.y][pacmanPos.x] = 3;
        tmpMap[pacmanPos.y - 1][pacmanPos.x] = 5;
        setMap(tmpMap);
        setPacmanPos( {...pacmanPos, y: pacmanPos.y -1 });
				
			}
		}
		else if (event.keyCode === 39){ // PACMAN MOVE RIGHT
			if ( map[pacmanPos.y][pacmanPos.x+1] !== 1){
				tmpMap[pacmanPos.y][pacmanPos.x] = 3;
        tmpMap[pacmanPos.y][pacmanPos.x + 1] = 5;
        setMap(tmpMap);
        setPacmanPos({...pacmanPos, x:pacmanPos.x + 1});
			}
		}
		else if (event.keyCode === 40){ // PACMAN MOVE DOWN
			if ( map[pacmanPos.y+1][pacmanPos.x] !== 1){
				tmpMap[pacmanPos.y][pacmanPos.x] = 3;
        tmpMap[pacmanPos.y + 1][pacmanPos.x] = 5;
				setMap(tmpMap);
        setPacmanPos({...pacmanPos, y:pacmanPos.y + 1});
				
			}


  }
}

  useEventListener('keydown', handler);

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