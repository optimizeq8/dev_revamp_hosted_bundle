import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: RFValue(7.5, 414),
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    // paddingTop: 6,
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    paddingVertical: 0,
  },
  subtext: {
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    fontSize: RFValue(5.5, 414),
    paddingTop: RFValue(2.5, 414),
    color: "#fff",
    textAlign: "left",
    //  width: "80%", // Removed was cutting the sentence
    lineHeight: RFValue(9, 414),
  },
  campaignButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginHorizontal: RFValue(10, 414),
    borderRadius: RFValue(15, 414),
    backgroundColor: "#fff",
    padding: RFValue(5, 414),
    height: RFValue(40, 414),
    marginBottom: RFValue(5, 414),
    bottom: RFValue(7.5, 414),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 8,
    borderWidth: RFValue(1.25, 414),
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 40,
    paddingVertical: RFValue(5, 414),
    paddingHorizontal: 7,
  },
});

export default styles;
