import React, { useState } from "react";

export default function Thumb({ file }) {
  const [thumb, setThumb] = useState(undefined);

  let reader = new FileReader();
  reader.onloadend = () => {
    setThumb(reader.result);
  };

  reader.readAsDataURL(file);

  return (
    <>
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail"
        height={200}
        width={200}
      />
    </>
  );
}
