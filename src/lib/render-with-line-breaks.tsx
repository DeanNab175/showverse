import { Fragment } from "react";

export function renderWithLineBreaks(value: string) {
  const parts = value.split("\n");
  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? <br /> : null}
    </Fragment>
  ));
}
