import { forwardRef } from "react";
import "../styles/components/Checkbox.scss";

function Checkbox({ name = "", id, onCheck }, ref) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        name={name}
        id={id}
        className="checkbox__input"
        ref={ref}
        onClick={onCheck}
      />
      <span className="checkbox__mask"></span>
    </div>
  );
}

export default forwardRef(Checkbox);
