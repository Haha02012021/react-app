import { useEffect, useState, useRef } from "react";
import "../styles/components/RangeInput.scss";

export default function RangeInput({
  min = 41,
  max = 250,
  defaultLeftNow = 41,
  defaultRightNow = 250,
  textPrefix = "$",
  onChange,
}) {
  const [leftNow, setLeftNow] = useState(defaultLeftNow);
  const [rightNow, setRightNow] = useState(defaultRightNow);

  const activeTrack = useRef();

  useEffect(() => {
    setLeftNow(defaultLeftNow);
  }, [defaultLeftNow]);

  useEffect(() => {
    setRightNow(defaultRightNow);
  }, [defaultRightNow]);

  useEffect(() => {
    activeTrack.current.style.marginRight = `calc(${
      ((max - rightNow + 1) / (max - min + 1)) * 100
    }% - 8px)`;
  }, [rightNow]);

  useEffect(() => {
    activeTrack.current.style.marginLeft = `calc(${
      ((leftNow - min + 1) / (max - min + 1)) * 100
    }% - 8px)`;
  }, [leftNow]);

  const handleChangeLeft = (event) => {
    const newValue = event.target.value;
    if (rightNow - newValue >= 0) {
      setLeftNow(newValue);
    }
  };

  const handleChangeRight = (event) => {
    const newValue = event.target.value;

    if (newValue - leftNow >= 0) {
      setRightNow(newValue);
    }
  };

  const handleStopUpdate = () => {
    onChange({
      priceGte: leftNow,
      priceLte: rightNow,
    });
  };

  return (
    <div className="range-input">
      <div className="range-input__rail">
        <div className="range-input__active" ref={activeTrack}></div>
      </div>
      <div>
        <input
          className="range-input__input"
          type="range"
          value={leftNow}
          min={min}
          max={max}
          onChange={handleChangeLeft}
          onMouseUp={handleStopUpdate}
          tabIndex={0}
        />
        <input
          className="range-input__input"
          type="range"
          value={rightNow}
          min={min}
          max={max}
          onChange={handleChangeRight}
          onMouseUp={handleStopUpdate}
          tabIndex={0}
        />
      </div>
      <div>
        <div className="range-input__tick">
          <span className="range-input__text-prefix">{textPrefix}</span>
          {leftNow}
        </div>
        <div className="range-input__tick">
          <span className="range-input__text-prefix">{textPrefix}</span>
          {rightNow}
        </div>
      </div>
    </div>
  );
}
