import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Icon } from "native-base";
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

export default Keyword = (props) => {
  let { _handler, keyword, type = "Keyword", uploading } = props;
  return (
    <TouchableOpacity
      style={
        type === "Edit"
          ? styles.editButton
          : [globalStyles.orangeBackgroundColor, styles.keywordButton]
      }
      onPress={() => {
        _handler(keyword);
      }}
      disabled={uploading}
    >
      <Text
        style={
          type === "Edit" ? styles.editButtonText : styles.keywordButtonText
        }
        numberOfLines={1}
      >
        {keyword}
      </Text>
      <Icon name="close" style={styles.xIcon} />
    </TouchableOpacity>
  );
};

Keyword.propTypes = {
  _handler: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  type: PropTypes.string,
};
