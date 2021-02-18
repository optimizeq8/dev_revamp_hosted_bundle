import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  contentText: {
    color: "#FF9D00",
    fontSize: RFValue(6, 414),
  },
  listTitleText: {
    fontFamily: "montserrat-medium",
  },
  listView: {
    paddingLeft: RFValue(7.5, 414),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: RFValue(7, 414),
  },
  titleText: {
    textAlign: "left",
    color: "#fff",
    // paddingTop: 10,
    fontFamily: "montserrat-bold",
    fontSize: RFValue(9, 414),
    paddingVertical: 0,
    textTransform: "uppercase",
  },
  subText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    paddingTop: 5,
    color: "#fff",
    textAlign: "left",
  },
  campaignButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    // flex: 1,
    marginHorizontal: RFValue(5, 414),

    padding: RFValue(5, 414),
  },
  icon: {
    alignSelf: "flex-start",
    color: "#FF9D00",
    fontSize: RFValue(12, 414),
    // paddingVertical: 10,
    // paddingHorizontal: 7
  },
});

export default styles;
