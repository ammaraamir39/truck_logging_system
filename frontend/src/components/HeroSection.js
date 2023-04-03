import React,{useEffect,useState} from 'react';
import '../App.css';
import { Button } from './Button';
import { Button1 } from './Button1';
import './HeroSection.css';

function HeroSection() {
  const [token, setToken]=useState('')
  useEffect(()=>{
    setToken(localStorage.getItem('accessToken'))
  },[])
  return (
    <div className='hero-container'>
      <video src='/videos/my4.mp4' autoPlay loop muted />
      <h1>WelcomE To TransportatioN</h1>
      <p>We are happy to help you</p>
      <div className='hero-btns'>
        {
          token ? (
            <Button1
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            REGISTER VEHICLE
          </Button1>
          ) : (<></>)
        }
    
        {
          !token ? (  <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={console.log('hey')}
          >
            GET STARTED
          </Button>) : (<></>)
        }
      
      </div>
    </div>
  );
}

export default HeroSection;
