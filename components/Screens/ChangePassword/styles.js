import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    // backgroundColor: "#0000"
    backgroundColor: globalColors.bluegem,
  },
  button: {
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  contentContainer: {
    // flex: 1,
    paddingTop: 15,

    paddingHorizontal: 30,
  },
});

export default styles;
