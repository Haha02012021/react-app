import { DISPLAY_TEXT_MAX_LENGTH } from "../constants";
import "../styles/components/TextWithMark.scss";

export default function TextWithMark({
  text = "",
  markText = "",
  maxLength = DISPLAY_TEXT_MAX_LENGTH,
}) {
  if (!markText.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(
    `${markText}|${markText.toLowerCase()}|${markText.toUpperCase()}`,
  );
  const coreRegex = new RegExp(markText);
  const upperRegex = new RegExp(markText.toUpperCase());
  const lowerRegex = new RegExp(markText.toLowerCase());
  const parts = text
    .split(coreRegex)
    .join(`!@#${markText}!@#`)
    .split(upperRegex)
    .join(`!@#${markText.toUpperCase()}!@#`)
    .split(lowerRegex)
    .join(`!@#${markText.toLowerCase()}!@#`)
    .split("!@#");

  let length = 0;

  return (
    <span className="text-with-mark">
      {parts.map((part, i) => {
        if (length < maxLength) {
          if (regex.test(part)) {
            length += part.length;
            return (
              <mark className="text-with-mark__mark" key={i}>
                {part}
              </mark>
            );
          } else {
            if (part.length > maxLength - length) {
              if (i < parts.length - 1) {
                const newPart = part.substring(
                  part.length - (maxLength - length) / parts.length,
                  part.length,
                );
                length += newPart.length;
                return <span key={i}> ... {newPart}</span>;
              } else {
                const newPart = part.substring(0, maxLength - length + 1);
                length += newPart.length;

                return <span key={i}>{newPart} ...</span>;
              }
            }

            length += part.length;
            return <span key={i}>{part}</span>;
          }
        }
      })}
    </span>
  );
}
