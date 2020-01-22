import { StyleSheet } from "react-native";

import { globalColors } from "../../../GlobalStyles";
import { widthPercentageToDP } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    color: globalColors.white,
    fontSize: 30
  },
  safeAreaView: {
    height: "100%"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 17,
    paddingVertical: 10,
    marginBottom: 5
  },
  button: {
    width: widthPercentageToDP(70),
    height: 55,
    alignSelf: "center",
    marginVertical: 10
  },
  textButton: {
    fontFamily: "montserrat-bold",
    color: globalColors.white,
    textAlign: "center",
    fontSize: 16
  },
  wrongEmailText: {
    fontFamily: "montserrat-regular",
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    marginVertical: 10
    // paddingVertical: 10
    // bottom: 5
  },
  containerView: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    paddingTop: 50
  },
  joinText: {
    fontFamily: "montserrat-regular",
    width: 250
  },
  businessName: {
    fontFamily: "montserrat-bold",
    width: 250
  }
});

export default styles;
