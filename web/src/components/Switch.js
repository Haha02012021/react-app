import { useEffect, useState } from "react";
import "../styles/components/Switch.scss";

export default function Switch({ id, onSwitch, defaultChecked = false }) {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const hanldeSwitch = (e) => {
    setChecked(!isChecked);

    onSwitch(e);
  };
  return (
    <input
      id={id}
      className="switch"
      type="checkbox"
      onChange={hanldeSwitch}
      checked={isChecked}
    ></input>
  );
}
