import { StyleSheet } from "react-native";
import globalStyles from "../../../GlobalStyles";

export default StyleSheet.create({
  filledButton: {
    ...globalStyles.orangeBackgroundColor,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 5,
    width: "65%",
    height: "18%"
  },
  emptyButton: {
    ...globalStyles.transparentBackgroundColor,
    ...globalStyles.orangeBorderColor,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 5,
    width: "65%",
    height: "18%"
  },
  contentStyle: {
    ...globalStyles.whiteTextColor,
    ...globalStyles.buttonText
  }
});
