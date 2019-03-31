import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 7
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingVertical: 0
  },
  subtext: {
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingTop: 5,
    color: "#fff",
    textAlign: "left"
  },
  campaignButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: "#FF9D00",
    padding: 10,
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
