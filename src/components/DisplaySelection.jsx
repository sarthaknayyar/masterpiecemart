import React from "react";

const DisplaySelection = ({ selectedOption }) => {
  return (
    <div className="mt-4">
      {selectedOption ? (
        <p>Selected Option: {selectedOption}</p>
      ) : (
        <p>No option selected</p>
      )}
    </div>
  );
};

export default DisplaySelection;
