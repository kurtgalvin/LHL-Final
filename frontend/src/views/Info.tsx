import React from 'react';
import { Paper } from '@material-ui/core';
import '../styles/Info.scss';

interface IProps {

}

const InfoView: React.FC<IProps> = () => {
  return (
  <Paper elevation={1} className= "Container">
    <h1 className="Title"> Info You Need To Know
    </h1>
    <Paper elevation={3} className="coughing" >
      <img src='/info-images/coughing.png' alt='coughing' width="300" />
      <div className='text'>
        Stay home if you're sick or showing any flu like symptoms.
      </div>
    </Paper>
    <Paper elevation={3} className="distancing">
      <img src='/info-images/social-distancing.png' alt='distance' width="300" />
      <div className="text">
        {/* 2. Physical distancing:   */}
        Stay at least 2 m away from others outside your home.
      </div>
    </Paper>
    <Paper elevation={3} className="Gathering">
      <img src='/info-images/gathering.png' alt='gather' width="300" />
      <div className='text'>
        Avoid any gatherings of people on private property, at work, or in parks.
      </div>
    </Paper>
    <Paper elevation={3} className="Work">
      <img src='/info-images/work.png' alt='work' width="300" />
      <div className= "text">
        {/* 4. Work at home if you can. */}
        If your business or organization isn't an essential service, you must ensure 2 m distancing for customers or staff.
      </div>
    </Paper>
    <Paper elevation={3} className="Essential">
      <img src='/info-images/essential.png' alt='essential' width="300" />
      <div className="text">
        {/* 5. Avoid non-essential outings. */}
        Only go out for groceries, medical needs, or exercise. Exercise alone or with members of your household.
      </div>
    </Paper>
    <Paper elevation={3} className="Logo">
      <a href="https://vancouver.ca/home-property-development/covid-19-coronavirus-within-vancouver.aspx" target="_blank" rel="noopener noreferrer">
      <img src='/info-images/logo.png' alt='logo' width="300" />
      <div className="text">
        Read More @Vancouver.ca
      </div>
      </a>
    </Paper>
  </Paper>
  )
}

export default InfoView