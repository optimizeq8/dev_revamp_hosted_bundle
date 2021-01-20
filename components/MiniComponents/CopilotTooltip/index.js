import { Icon } from "native-base";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalColors } from "../../../GlobalStyles";

import styles from "./styles";

const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}) => (
  <View style={styles.tooltipContainer}>
    {!isLastStep ? (
      <TouchableOpacity
        style={[styles.tooltipCloseButton]}
        onPress={handleStop}
      >
        <Text>{labels.skip || <Icon type="AntDesign" name="close" />}</Text>
      </TouchableOpacity>
    ) : null}
    <View style={styles.tooltipTextContainer}>
      <Text testID="stepDescription" style={styles.tooltipText}>
        {currentStep.text}
      </Text>
    </View>

    <View style={[styles.bottomBar]}>
      {!isFirstStep ? (
        <TouchableOpacity
          style={[
            styles.tooltipButton,
            {
              backgroundColor: "#0000",
              borderWidth: 0.5,
              borderColor: globalColors.darkGray,
            },
          ]}
          onPress={handlePrev}
        >
          <Text style={[styles.tooltipButtonText, { color: globalColors.rum }]}>
            {labels.previous || "Previous"}
          </Text>
        </TouchableOpacity>
      ) : null}
      {!isLastStep ? (
        <TouchableOpacity style={styles.tooltipButton} onPress={handleNext}>
          <Text style={styles.tooltipButtonText}>{labels.next || "Next"}</Text>
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

export default Tooltip;
