import { useRef, useState, useCallback, useEffect } from 'react';

import './rangeSliderStyle.css';

function RangeSlider({ step, min, max }) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minRef = useRef(null);
  const maxRef = useRef(null);
  const range = useRef(null);
  
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxRef.current?.value);

      if (range.current) {
        if (minValue < min || minValue > max) {
          range.current.style.left = `${0}%`;
          range.current.style.width = `${100}%`;          
        } else {
          range.current.style.left = `${minPercent}%`;
          range.current.style.width = `${maxPercent - minPercent}%`;
        }
      }
    }
  }, [minValue, getPercent]);

  useEffect(() => {
    if (minRef.current) {
      const minPercent = getPercent(+minRef.current?.value);
      const maxPercent = getPercent(maxValue);

      if (range.current) {
        if (maxValue > max || maxValue <= min) {
          range.current.style.width = `${100}%`;
        } else {
          range.current.style.width = `${maxPercent - minPercent}%`;
        }
      }
    }
  }, [maxValue, getPercent]);

  const handleMinChange = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    const newMinValue = Math.min(value, maxValue - step);
    setMinValue(newMinValue);
  };

  const handleMaxChange = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    const newMaxValue = Math.max(value, minValue + step);
    setMaxValue(newMaxValue);
  };

  const handleMinInput = (event) => {
    const newInputValue = event.target.value;;
    if (newInputValue) {
      setMinValue(event.target.value);      
    }
  };

  const handleMaxInput = (event) => {
    const newInputValue = event.target.value;
    if (newInputValue) {
      setMaxValue(newInputValue);
    }    
  };
  
  const handleKeyDownMin = (event) => {
    if (event.key === 'Enter') {
      if (!minValue || (minValue < min) || (minValue >= max)) {
        setMinValue(min);
      } 
    }
  };

  const handleKeyDownMax = (event) => {
    if (event.key === 'Enter') {
      if (!maxValue || (maxValue <= min) || (maxValue > max)) {
        setMaxValue(max);
      }
    }
  };

  const handleBlurMin = () => {
    if (!minValue || (minValue < min) || (minValue >= max)) {
      setMinValue(min);
    } 
  };

  const handleBlurMax = () => {
    if (!maxValue || (maxValue <= min) || (maxValue >= max)) {
      setMaxValue(max);
    }
  };

  return (
    <div className='container' >
      <div className='price-block' >
        <div className='price-container'>
          <input 
            className='price-input' 
            type="number" 
            value={minValue} 
            onChange={handleMinInput} 
            onBlur={handleBlurMin}
            onKeyDown={handleKeyDownMin}
          />
          <div className='price-text'>₽</div>
        </div>
        <div className='price-container'>
          <input 
            className='price-input' 
            type="number" 
            value={maxValue} 
            onChange={handleMaxInput} 
            onBlur={handleBlurMax}
            onKeyDown={handleKeyDownMax}
          />
          <div className='price-text'>₽</div>
        </div>
      </div>
      <div className='slider'>
        <div className='progress' ref={range} />
      </div>
      <div className='range-input'>
        <input
          className='range-min'
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          ref={minRef}
          onChange={handleMinChange}
        />
        <input
          className='range-max'
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          ref={maxRef}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}

export default RangeSlider;