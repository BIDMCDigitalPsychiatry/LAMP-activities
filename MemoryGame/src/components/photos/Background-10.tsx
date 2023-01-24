import React from "react";
const Background10 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="160"
      height="160"
      viewBox="0 0 160 160"
    >
      <image
        id="lily"
        width="160"
        height="160"
        xlinkHref="data:image/jpeg;base64,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"
      />
    </svg>
  );
};
export default Background10;