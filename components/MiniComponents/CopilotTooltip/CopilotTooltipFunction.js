import React, { Component } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
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
  else if (step && step.name === "Audience targeting")
    return `M0 0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${
      position.y._value
    }H${widthPercentageToDP(95)}C${canvasSize.x} ${position.y._value} ${
      canvasSize.x
    } ${
      (position.y._value + size.y._value) / heightPercentageToDP(0.18)
    } ${widthPercentageToDP(95)} ${
      (position.y._value + size.y._value) / heightPercentageToDP(0.18)
    }H${widthPercentageToDP(6)}C0 ${
      (position.y._value + size.y._value) / heightPercentageToDP(0.18)
    } 0 ${position.y._value} ${widthPercentageToDP(6)} ${position.y._value}Z`;
  else
    return `M0 0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${
      position.y._value
    }H${widthPercentageToDP(
      step && step.name === "Daily budget"
        ? 95
        : step && step.name === "Audience preset"
        ? 97
        : 85
    )}C${canvasSize.x} ${position.y._value} ${canvasSize.x} ${
      position.y._value + size.y._value
    } ${widthPercentageToDP(
      step && step.name === "Daily budget"
        ? 95
        : step && step.name === "Audience preset"
        ? 97
        : 85
    )} ${position.y._value + size.y._value}H${widthPercentageToDP(
      step && step.name === "Daily budget"
        ? 6
        : step && step.name === "Audience preset"
        ? 4
        : 15
    )}C0 ${position.y._value + size.y._value} 0 ${
      position.y._value
    } ${widthPercentageToDP(
      step && step.name === "Daily budget"
        ? 6
        : step && step.name === "Audience preset"
        ? 4
        : 15
    )} ${position.y._value}Z`;
};
