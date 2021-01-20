import { Icon } from "native-base";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import CopilotStepNumber from "./CopilotStepNumber";

import styles from "./styles";

const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}) => {
  let { translate } = currentStep.target.props.children.props.screenProps;
  return (
    <View style={styles.tooltipContainer}>
      <View style={styles.tooltipTextContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CopilotStepNumber currentStepNumber={currentStep.order} />
          <Text style={styles.tooltipHeaderText}>
            {translate(currentStep.name)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.tooltipCloseButton]}
          onPress={handleStop}
        >
          <Text>{labels.skip || <Icon type="AntDesign" name="close" />}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.tooltipText}>{translate(currentStep.text)}</Text>
      <View style={[styles.bottomBar]}>
        {!isFirstStep ? (
          <TouchableOpacity
            style={[
              styles.tooltipButton,
              {
                backgroundColor: "#0000",
                borderWidth: 0.5,
                borderColor: globalColors.mist,
              },
            ]}
            onPress={handlePrev}
          >
            <Text
              style={[styles.tooltipButtonText, { color: globalColors.mist }]}
            >
              {labels.previous || translate("Previous")}
            </Text>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity style={styles.tooltipButton} onPress={handleNext}>
            <Text style={styles.tooltipButtonText}>
              {labels.next || translate("Next")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.tooltipButton} onPress={handleStop}>
            <Text style={styles.tooltipButtonText}>
              {labels.finish || "Finish"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Tooltip;
