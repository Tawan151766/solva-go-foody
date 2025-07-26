import React from "react";
import ModernButton from "./ModernButton";

const NavigationButtons = () => {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <ModernButton onClick={() => window.history.back()} value={"Prev"} />
      <ModernButton onClick={() => window.history.forward()} value={"Next"} />
    </div>
  );
};

export default NavigationButtons;
