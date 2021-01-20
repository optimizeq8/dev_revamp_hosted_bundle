import React, { Component } from "react";
import { widthPercentageToDP } from "react-native-responsive-screen";
import CopilotTooltip from "./";
export default TooltipComponent = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}) => (
  <CopilotTooltip
    isFirstStep={isFirstStep}
    isLastStep={isLastStep}
    handleNext={handleNext}
    handlePrev={handlePrev}
    handleStop={handleStop}
    currentStep={currentStep}
    labels={labels}
  />
);

export const circleSvgPath = ({ position, size, canvasSize, step }) => {
  if (step && step.name === "Media")
    return `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${
      position.x._value - 3
    },${position.y._value + 47}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;
  else
    return `M0 0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${
      position.y._value
    }H${widthPercentageToDP(85)}C${canvasSize.x} ${position.y._value} ${
      canvasSize.x
    } ${position.y._value + size.y._value} ${widthPercentageToDP(85)} ${
      position.y._value + size.y._value
    }H${widthPercentageToDP(15)}C0 ${position.y._value + size.y._value} 0 ${
      position.y._value
    } ${widthPercentageToDP(15)} ${position.y._value}Z`;
};
