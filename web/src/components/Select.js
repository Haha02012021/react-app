import { ChevronDownRegularIcon } from "./icons";
import "../styles/components/Select.scss";

export default function Select({ options, onChange }) {
  return (
    <div className="select">
      <select className="select__select" onChange={onChange}>
        {options.map((option, index) => {
          return (
            <option key={index} className="select__option" value={option.value}>
              {option.content}
            </option>
          );
        })}
      </select>
      <ChevronDownRegularIcon />
    </div>
  );
}
