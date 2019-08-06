import { StyleSheet, PixelRatio, Platform } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
const IsIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#0000"
  },
  container: {
    backgroundColor: "#0000"
  },
  contentContainer: {
    flex: 1
  },
  textInputContainer: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#F4F4F4",
    paddingVertical: 8
  },
  textInput: {
    paddingLeft: 10,
    fontSize: 17,
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: IsIOS ? 4 : 0,
    marginBottom: 17,
    marginHorizontal: 8
    // borderRadius: 80
  },
  submitButton: {
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginBottom: 17,
    marginRight: 5
    // bottom: heightPercentageToDP(bottom)
  }
});

export default styles;
