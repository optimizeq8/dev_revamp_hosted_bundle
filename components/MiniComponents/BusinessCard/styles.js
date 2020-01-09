import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  subtext: {
    fontFamily: "montserrat-bold-english",
    fontSize: 12,
    color: "#fff"
  },
  businessButton: {
    flexDirection: "row",
    paddingVertical: 15,
    bottom: 15
  },
  businessIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5F5F5F"
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 7
  },
  titletext: {
    textAlign: "left",
    paddingTop: 5,
    fontFamily: "montserrat-bold",
    fontSize: 18,
    paddingVertical: 0,
    textTransform: "uppercase"
  }
});

export default styles;
