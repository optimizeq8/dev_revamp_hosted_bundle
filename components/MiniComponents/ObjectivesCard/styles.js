import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 15
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    // paddingTop: 6,
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingVertical: 0
  },
  subtext: {
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingTop: 5,
    color: "#fff",
    textAlign: "left",
    width: "80%",
    lineHeight: 18
  },
  campaignButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginHorizontal: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: "#FF9D00",
    padding: 10,
    height: 90,
    marginBottom: 10,
    bottom: 15
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 40,
    paddingVertical: 10,
    paddingHorizontal: 7
  }
});

export default styles;
