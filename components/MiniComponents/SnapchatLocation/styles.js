import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7.5, 414),
    color: globalColors.gray,
    textTransform: "uppercase",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: RFValue(25, 414),
  },
  addLocationStyle: {
    backgroundColor: globalColors.purpleTran,
    height: RFValue(30, 414),
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25, 414),
    borderWidth: 1,
    borderColor: "rgba(147,4,255,1)",
    flexDirection: "row",
    marginVertical: RFValue(10, 414),
  },
  buttonText: {
    fontFamily: "montserrat-bold",
    color: globalColors.purple,
    textTransform: "uppercase",
    fontSize: RFValue(5, 414),
  },
  iconStyle: {
    color: globalColors.purple,
    fontSize: RFValue(10, 414),
  },
  locationRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    // justifyContent: "space-between",
    marginVertical: RFValue(5, 414),
  },
  mapButtonStyle: {
    backgroundColor: globalColors.purpleTran,
    height: RFValue(15, 414),
    width: RFValue(35, 414),
    padding: RFValue(2.5, 414),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: RFValue(25, 414),
    borderColor: globalColors.purple,
    borderWidth: 0.5,
  },
  deleteLocationStyle: {
    backgroundColor: globalColors.purpleTran,
    height: RFValue(15, 414),
    width: RFValue(15, 414),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: RFValue(25, 414),
    borderColor: globalColors.purple,
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "40%",
    flex: 1,
  },
  locationName: {
    fontFamily: "montserrat-bold",
    textTransform: "capitalize",
    flex: 2,
    paddingLeft: RFValue(5, 414),
    fontSize: RFValue(8, 414),
  },
  locationSearchContainer: {
    backgroundColor: "#fff",
    height: "100%",
    borderTopEndRadius: RFValue(20, 414),
    borderTopStartRadius: RFValue(20, 414),
  },
  proceedButton: {
    width: "20%",
    height: "10%",
    alignSelf: "flex-end",
    right: RFValue(15, 414),
  },
});
