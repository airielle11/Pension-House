import React, { useState } from "react";

const ImageWithLoader = ({ src, alt, placeholder = "N/A", ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {!loaded && !error && <span>Loading...</span>}
      {error ? (
        <span>{placeholder}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          style={{ display: loaded ? "block" : "none" }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          {...props}
        />
      )}
    </>
  );
};

export default ImageWithLoader;
