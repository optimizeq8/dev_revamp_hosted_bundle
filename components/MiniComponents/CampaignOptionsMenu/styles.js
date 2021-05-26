import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  menuContainer: {
    backgroundColor: globalColors.white,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: 250,
    height: "25%",
    borderColor: globalColors.rum,
    borderWidth: 0.5,
    padding: 10,
  },
  menuHeaderText: {
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
