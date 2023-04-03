import React from 'react';
import './Cards.css';
import CardItem from './CardItem';



function Cards() {
  return (
    <div className='cards'>
      <h1>VEHICLEs</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/dumper.jpg'
              text='Full Load Services'
              label='HYDRAULIC TRUCKS'
          
            />
            <CardItem
              src='images/Piaggio-Ape.jpg'
              text='Low load and 3 wheels'
              label='APE MINI'
             
            />
          {/* </ul>
          <ul className='cards__items'> */}
            <CardItem
              src='images/tempo.jpg'
              text='Medium load'
              label='TEMPO'
             
            />
            <CardItem
              src='images/tractor.jpg'
              text='For all farming servicess'
              label='TRACTOR'
            
            />
            <CardItem
              src='images/mini.jpg'
              text='Medium load carring capacity'
              label='PICK UP'
           
            />
              <CardItem
              src='images/iceare.jpg'
              text='Full load without hydraulic '
              label='EICHER'
           
            />
          </ul>
        </div>
      </div>
    
    </div>
  );
}

export default Cards;
