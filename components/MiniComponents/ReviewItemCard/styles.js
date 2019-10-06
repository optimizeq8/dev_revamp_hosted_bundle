import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  contentText: {
    color: "#FF9D00",
    fontSize: 12
  },
  listTitleText: {
    fontFamily: "montserrat-medium"
  },
  listView: {
    paddingLeft: 15
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 7
  },
  titleText: {
    textAlign: "left",
    color: "#fff",
    // paddingTop: 10,
    fontFamily: "montserrat-bold",
    fontSize: 18,
    paddingVertical: 0,
    textTransform: "uppercase"
  },
  subText: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingTop: 5,
    color: "#fff",
    textAlign: "left"
  },
  campaignButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    // flex: 1,
    marginHorizontal: 10,

    padding: 10
  },
  icon: {
    alignSelf: "flex-start",
    color: "#FF9D00",
    fontSize: 24
    // paddingVertical: 10,
    // paddingHorizontal: 7
  }
});

export default styles;
