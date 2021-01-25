import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: globalColors.offWhite,
    paddingTop: "10%",
  },
  alertIconContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  alertIcon: { width: "100%", height: "70%" },
  alertTitle: {
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    color: globalColors.rum,
    textAlign: "center",
  },
  alertTextContainer: {
    height: "40%",
    padding: 28,
    alignItems: "center",
    justifyContent: "space-between",
  },

  alertText: {
    fontFamily: "montserrat-regular",
    color: globalColors.rum,
    fontSize: 13,
    textAlign: "center",
    padding: 8,
  },
  alertExtraText: {
    fontFamily: "montserrat-regular",
    color: globalColors.rum,
    fontSize: 11,
    textAlign: "center",
  },

  popUpContainer: {
    backgroundColor: globalColors.white,
    width: "90%",
    height: "60%",
    alignSelf: "center",
    borderRadius: 35,
    alignItems: "center",
    marginBottom: "10%",
    // shadowColor: "#fff",
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.6,
    // shadowRadius: 5,
  },
  alertGradientButton: {
    height: 40,
    width: "80%",
    alignSelf: "center",
  },
});
