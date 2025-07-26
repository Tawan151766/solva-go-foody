import React from "react";

const NavigationButtons = () => {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        onClick={() => window.history.back()}
        style={{
          padding: "8px 16px",
          borderRadius: 4,
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Prev
      </button>
      <button
        onClick={() => window.history.forward()}
        style={{
          padding: "8px 16px",
          borderRadius: 4,
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
