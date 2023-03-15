import React, { useEffect } from 'react'
import '../Slider/Cards.scss'
import Data from '../Slider/LOL'



function Cards({ won, bonus, Winnings, randomGamble, setAmount, total,setTotal, amount, allwinnings }) {

    let firstItem = 0
    if( bonus == 1){
         firstItem = Data[randomGamble];
         
    } 


    
  useEffect(() => {
    const winnings = (Winnings + amount) * (firstItem?.multiplier || 0);
    setTotal(total + winnings);
    allwinnings(winnings.toFixed(2) - Winnings)
    
  }, [firstItem]);
    
    console.log(Winnings);
    console.log(total);
    console.log(firstItem.multiplier);
   
  if(firstItem.multiplier > 0){
    const audio = new Audio("/jackpot.mp3");
      audio.volume = 0.8;
        audio.play();
  }
  else if(firstItem.multiplier <= 0){
    const audio = new Audio("/error.mp3");
    audio.volume = 0.8;
      audio.play();
  }
    
    

  return (
    <div className={bonus? 'wrapper' : 'wrapper--closed'}>
        <div className="clash-card">
            <div className="clash-card__image clash-card__image" style={{backgroundImage: `url('background.png')`}} >
                <img width={firstItem.width} height={firstItem.height} src={firstItem.src}/>
            </div>
            <div className="clash-card__level clash-card__level " style={{color: firstItem.color}}>{firstItem.level}</div>
            <div className="clash-card__unit-name">{firstItem.name}</div>
            <div className="clash-card__unit-description">{firstItem.description}
                </div>

            <div className="clash-card__unit-stats clash-card__unit-stats clearfix" style={{background: firstItem.color}}>
                <div className="one-third" style={{borderRight: firstItem.color}}>
                    <div className="stat">{firstItem.rp}</div>
                    <div className="stat-value">RP</div>
                </div>

                <div className="one-third">
                    <div className="stat" >{firstItem.type}</div>
                    <div className="stat-value">Blue Essence</div>
                </div>

                <div className="one-third no-border">
                    <div className="stat">{firstItem.multiplier}x</div>
                    <div className="stat-value">Multiplier</div>
                </div>
            </div>
        </div>


      </div> 
  )
}

export default Cards