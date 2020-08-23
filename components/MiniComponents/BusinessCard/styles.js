import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  subtext: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff",
  },
  businessButton: {
    flexDirection: "row",
    paddingVertical: 15,
    bottom: 15,
  },
  businessIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c6c6c6",
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 7,
  },
  titletext: {
    textAlign: "left",
    paddingTop: 5,
    fontFamily: "montserrat-bold",
    fontSize: 18,
    paddingVertical: 0,
    textTransform: "uppercase",
    color: globalColors.rum,
  },
});

export default styles;
