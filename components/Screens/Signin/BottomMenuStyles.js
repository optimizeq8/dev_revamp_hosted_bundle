import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  menuContainer: {
    backgroundColor: globalColors.white,
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 250,
  },
  menuHeaderText: {
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
    fontSize: 16,
    textTransform: "uppercase",
    flex: 1,
  },
  menuHeader: {
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: "row",
    flex: 1,
  },
  menuButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  menuButtonText: {
    color: globalColors.rum,
    fontFamily: "montserrat-regular",
    fontSize: 16,
  },
});
