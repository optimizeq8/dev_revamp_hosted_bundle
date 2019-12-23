import React from "react";
import { Button, Text } from "native-base";
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

export default props => {
  const { translate } = props.screenProps;
  let { content, filled, onPressFunction, buttonStyle, textStyle } = props;
  return (
    <Button
      rounded
      block
      onPress={() => onPressFunction()}
      style={[filled ? styles.filledButton : styles.emptyButton, buttonStyle]}
    >
      <Text
        uppercase
        style={[
          styles.contentStyle,
          !filled ? { color: globalColors.orange } : {},
          textStyle
        ]}
      >
        {translate(content)}
      </Text>
    </Button>
  );
};
