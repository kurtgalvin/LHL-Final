import React from 'react';
// import { Paper } from '@material-ui/core';
import '../styles/Info.scss';

interface IProps {

}

const InfoView: React.FC<IProps> = () => {
  return (
  <div className= "Container">
    <h1 className="Title"> Info
    </h1>
    <div className="coughing" >
      <img src='../../docs/coughing.png' alt='coughing' width="300" />
      <div>
        1. Stay home if you're sick or showing symptoms.
      </div>
    </div>
    <div className="distancing">
      <img src='../../docs/coughing.png' alt='distance' width="300" />
      <div>
        2. Physical distancing:  
        Stay at least 2 m away from others outside your home.
      </div>
    </div>
    <div className="Gathering">
      <img src='../../docs/coughing.png' alt='gather' width="300" />
      <div>
        3. Avoid any gatherings of people on private property, at work, or in parks.
      </div>
    </div>
    <div className="Work">
      <img src='../../docs/coughing.png' alt='work' width="300" />
      <div>
        4. Work at home if you can.

        If your business or organization isn't an essential service, opens in new tab, you must ensure 2 m distancing for customers or staff. If 2 m isn't possible, you must close.
      </div>
    </div>
    <div className="Essential">
      <img src='../../docs/coughing.png' alt='essential' width="300" />
      <div>
        5. Avoid non-essential outings.
        Only go out for groceries, medical needs, or exercise. Exercise alone or with members of your household.
      </div>
    </div>
  </div>
  )
}

export default InfoView