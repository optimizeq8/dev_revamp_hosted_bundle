import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
export default StyleSheet.create({
  input1: {
    marginBottom: 30,
    alignSelf: "center",
    width: 300,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
    paddingHorizontal: 15
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: -10
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    // textAlign: "center",
    width: "100%",
    paddingVertical: 10,
    borderBottomColor: "transparent",
    height: 50
  },
  labelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 10,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  toggleStyle: {
    width: widthPercentageToDP("13"),
    height: heightPercentageToDP("2.7"),
    borderRadius: 25,
    padding: 0
  },
  toggleCircle: {
    width: widthPercentageToDP("5"),
    height: heightPercentageToDP("2.4"),
    borderRadius: 50
  },
  membersTypes: {
    width: "60%",
    height: "25%",
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  meberTypeStyle: {
    fontFamily: "montserrat-bold",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    textAlign: "left"
  },
  memberDescription: {
    fontFamily: "montserrat-regular",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    textAlign: "left"
  },
  deleteTeamMember: {
    marginBottom: 10,
    width: "70%",

    borderRadius: 50,
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    justifyContent: "center"
  },
  deleteText: {
    fontFamily: "montserrat-bold",
    fontSize: 14
  }
});
