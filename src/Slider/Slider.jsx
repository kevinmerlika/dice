import React, { useState,useRef , useEffect } from "react";
import "./Slider.scss";
import "../Style/grid.css"
import Cards from "./Cards";
import Data from '../Slider/LOL'
import lol from "../Slider/LOL";

function Slider() {

  let [value, setValue] = useState(50.000);
  let [randomNumber, setRandomNumber] = useState(0.00);
  let [total, setTotal] = useState(2000);
  const [amount, setAmount] = useState(0.00);
  const [won, setWon] = useState(false);
  const [allwinnings, setAllWinnings] = useState()


  const [bonus, setBonus] = useState(false)
  const [randomGamble, setRandomGamble] = useState(0)

  const multiplier = -1 / (value * 0.01 - 1.005).toFixed(3)
  const thumbOffset = value;
  const Winnings = (amount*multiplier) - amount;
  const BetWin =(Winnings + amount);
  const sliderContainerRef = useRef(null);

  useEffect(() => {
    
    const sliderContainerWidth = sliderContainerRef.current.offsetWidth;
    console.log(sliderContainerWidth);
  }, []);


  const gamble = () => {
    setTotal(parseFloat(total) - amount - Winnings)
    console.log(total);
    setBonus(true)
    setRandomGamble(Math.floor(Math.random() * lol.length));
    console.log(randomGamble);
    setWon(false)
  }

  const closebonus = () => {
    setBonus(false)
    setWon(false)
  }


  const handleGenerateClick = () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);
    checkOver(newRandomNumber);
  };
 
const handleAmountChange = (event) => {
  const inputValue = event.target.value.replace(/[^0-9.]/g, '');
  const parsedValue = parseFloat(inputValue);
  setAmount(isNaN(parsedValue) ? '' : parsedValue);
  setWon(false)
};

const decreaseAmount = () => {
  setAmount(parseFloat(amount) / 2);
};

const increaseAmount = () => {
    setAmount(parseFloat(amount) * 2);
  };

  const bet = () => {
    if(total >= amount && amount > 0){
        
      handleGenerateClick();
      
    }
    else{
      console.log('No money');
    }
  };



const checkUnder=() =>{
    
}





  const handleChange = (event) => {
    const newValue = parseFloat(event.target.value);
    if (newValue < 2) {
      setValue(2);
    } else if (newValue > 98) {
      setValue(98);
    } else if (Math.abs(newValue - value) >= 0.1) {
        setValue(newValue);
        const audio = new Audio("/dice.wav");
        audio.volume = 0.5;
        audio.play();
      } else {
        setValue(newValue);
      }
  };

    

  // Get the width of the slider container element
const sliderContainerWidth = sliderContainerRef?.current?.clientWidth;

// Calculate the percentage of the slider width that the current random number represents
const percentage = randomNumber / 105;

// Calculate the pixel value of the left position
const leftPosition = percentage * sliderContainerWidth;

// Add any necessary offsets to the pixel value
const labelLeftPosition = leftPosition; // for example
  
  const sliderLabelStyle = {
    position: "absolute",
    top: "210px",
    left: `calc(${labelLeftPosition}px)`,
    zIndex: 100,
  };

  

  function handleWinnings(winnings){
    setAllWinnings(winnings)
    console.log(winnings+"$")
  }

  const checkOver = (randomNumber) => {
    if (randomNumber >= value) {
        // get border color of slider label
const sliderLabel = document.querySelector('.slider-label');
const computedStyles = window.getComputedStyle(sliderLabel);
const borderColor = computedStyles.getPropertyValue('border-color');

// set new border color
sliderLabel.style.borderColor = 'green';
      setWon(true)
      setTotal(parseFloat(total) - amount);
      setTotal(Winnings+parseFloat(total));
      console.log('You win!');
      const audio = new Audio("/win.mp3");
      audio.volume = 0.5;
        audio.play();
      return true; // indicate that player won
    } else {
      setWon(false)
      console.log('You lose!');
      // get border color of slider label
const sliderLabel = document.querySelector('.slider-label');
const computedStyles = window.getComputedStyle(sliderLabel);
const borderColor = computedStyles.getPropertyValue('border-color');

// set new border color
sliderLabel.style.borderColor = 'red';

      setTotal(parseFloat(total) - amount);
      const audio = new Audio("/lose.mp3");
      audio.volume = 0.5;
        audio.play();
      return false; // indicate that player lost
    }
  };

  useEffect(() => {
  console.log(randomGamble);
}, [randomGamble]);

useEffect(() => {
    if(total < 0){
        setTotal(0)
    }
  }, [total]);

  

  return (
    
    
     <><div className="section">
          <div className="bet col-7">
              <div className="bet__container col-7">
                  <div className="bet__content col-11">
                      <p className="bet__paragraph">Bet Amount</p>
                      <p className="bet__paragraph">${total.toFixed(2)}</p>
                  </div>

                  <div className="bet__content col-11">
                      <input
                          className="bet__input col-8"
                          type="number"
                          value={amount}
                          id="money"
                          name="money"
                          step="0.01"
                          placeholder="$0.00"
                          onChange={handleAmountChange} />
                      <div className="bet__changer col-4">
                          <button className="bet__buttons" onClick={decreaseAmount}>1/2</button>
                          <button className="bet__buttons" onClick={increaseAmount}>2X</button>
                      </div>
                  </div>

                  <div className="bet__content col-11">
                      <p className="bet__paragraph">Expected Winnings: ${BetWin}</p>
                  </div>


                  <button className="bet__submit col-6" onClick={bet}>
                      BET
                  </button>
                  <button className={won? "bet__submit col-6" : "bet__submit--closed"} onClick={gamble}>
                      GAMBLE
                  </button>



              </div>


          </div>




          <div className="slider-container col-5" ref={sliderContainerRef}>
              <div>
                  <img className="rotating-image" width={'200px'} src="/log.png" alt="logo"></img>
              </div>
              <div className="slider-range"><input
                  type="range"
                  min={0.0}
                  max={100.0}
                  value={value}
                  step={0.1}
                  className="slider"
                  onChange={handleChange}
                  style={{
                      "--thumb-offset": `calc(${thumbOffset}% + 5px )`,
                      background: `linear-gradient(to right, rgb(95, 1, 87), rgb(95, 1, 87) ${thumbOffset}%,rgb(255, 132, 0) ${thumbOffset}%,rgb(255, 132, 0))`,
                      borderRadius: '20px',
                      paddingLeft: '0',
                      paddingRight: '0',
                  }} /></div>
              <label className="slider-label" style={sliderLabelStyle}>
                  {randomNumber}
              </label>
              <div className="slider-value">Value: {value}</div>
              <div className="slider-value">Multiplier: {multiplier.toFixed(4)}</div>
          </div>

             
      </div>
      <div className={ bonus? "bonus-container" : "bonus-container--closed" }>
                  <div onClick={closebonus} style={{zIndex:999, cursor: 'pointer'}}>Close</div>
                  <Cards won={won} bonus={bonus} Winnings={Winnings} randomGamble={randomGamble} setAmount={setAmount} total={total} setTotal={setTotal} amount={amount} allwinnings={handleWinnings}/>
                  <div className="game-result">Total Win : {allwinnings}</div>
        </div>
        </>
      
    
  );
}



export default Slider;
