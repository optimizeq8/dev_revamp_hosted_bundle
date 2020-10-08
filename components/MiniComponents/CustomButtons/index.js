import React from "react";
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";
import GradientButton from "../GradientButton";

export default (props) => {
  const { translate } = props.screenProps;
  let { content, filled, onPressFunction, buttonStyle, textStyle } = props;
  return (
    <GradientButton
      uppercase={true}
      textStyle={[
        styles.contentStyle,
        !filled ? { color: globalColors.orange } : {},
        textStyle,
      ]}
      transparent={!filled}
      orangeDark={filled}
      text={translate(content)}
      onPressAction={() => onPressFunction()}
      style={[filled ? styles.filledButton : styles.emptyButton, buttonStyle]}
    />
  );
};
