import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

export default StyleSheet.create({
  background: {
    position: "absolute",
    opacity: 0.5,
    top: 230,
    alignSelf: "center"
  },
  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontFamily: "montserrat-medium-english",
    marginBottom: "5%"
  },
  businessNameStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "montserrat-medium"
    // bottom: "21%"
  },
  brandNameStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 31,
    fontFamily: "montserrat-bold"
  },
  backDrop: {
    position: "absolute",
    top: -heightPercentageToDP("35%"),
    alignSelf: "center",
    zIndex: -1,
    elevation: 0
  },
  mainButtonView: {
    height: "25%",
    top: "35%",
    justifyContent: "space-between"
  },
  campaignButton: {
    backgroundColor: globalColors.orange,
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    width: "35%"
  },
  campaignButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-bold"
  },
  mainText: {
    textAlign: "center",
    alignSelf: "center",
    color: "#fff",
    fontSize: 15,
    width: "70%",
    fontFamily: "montserrat-regular"
  }
});
