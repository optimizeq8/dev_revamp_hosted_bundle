import React from "react";
import { Button, Text } from "native-base";
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

export default props => {
  let { content, filled, onPressFunction } = props;
  return (
    <Button
      rounded
      onPress={() => onPressFunction()}
      style={filled ? styles.filledButton : styles.emptyButton}
    >
      <Text
        uppercase
        style={[
          styles.contentStyle,
          !filled ? { color: globalColors.orange } : {}
        ]}
      >
        {content}
      </Text>
    </Button>
  );
};
