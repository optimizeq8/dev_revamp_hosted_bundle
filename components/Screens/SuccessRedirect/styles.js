import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    backgroundColor: "#0000",
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  media: {
    alignSelf: "center",
    height: heightPercentageToDP(20),
    width: "100%",
    margin: 10,
    justifyContent: "flex-start",
  },
  errortext: {
    marginTop: 5,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    lineHeight: 18,
  },
  text: {
    marginTop: 3,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    textAlign: "center",
  },
  details: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 250,
  },
  button: {
    marginTop: 25,
    borderRadius: 25,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },

  buttontext: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-bold",
  },

  title: {
    marginTop: 15,
    color: "#fff",
    fontSize: 41,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
  },
  codeSentText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#909090",
    textAlign: "center",
  },
  mobileDetailCard: {
    backgroundColor: globalColors.white,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 35,
  },
  verifyButton: {
    width: widthPercentageToDP(30),
    height: 40,
    alignSelf: "center",
  },
  bottomText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textDecorationLine: "underline",
    color: globalColors.orange,
    paddingTop: 20,
  },
  headingText: {
    textAlign: "center",
    color: globalColors.white,
    fontSize: 14,
    fontFamily: "montserrat-regular",
    width: "80%",
    alignSelf: "center",
    marginBottom: 24,
  },
  detail: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: globalColors.orange,
    textAlign: "center",
  },
});

export default styles;
