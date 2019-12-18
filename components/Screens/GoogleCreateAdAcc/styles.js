import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    // height: heightPercentageToDP("100%")
    // flex: 1
    paddingBottom: 50
  },
  scrollViewContainer: {
    height: heightPercentageToDP(40)
  },
  htmlContainer: {
    width: widthPercentageToDP(85),
    alignSelf: "center"
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 10
  },
  imageSlide: {
    height: 250,
    width: 250
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  container: {
    // marginTop: 30,
    backgroundColor: "#0000"
  },
  media: {
    alignSelf: "center",
    height: heightPercentageToDP(13),
    width: heightPercentageToDP(13),
    margin: 15
  },
  mainCard: {
    // bottom: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    // height: heightPercentageToDP(90),
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttontext: {
    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  button: {
    // top: "3%",
    backgroundColor: "#5F5F5F",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export const htmlStyles = {
  h1: {
    fontSize: 30 / PixelRatio.getFontScale()
  },
  a: {
    fontWeight: "300",
    color: globalColors.purple // make links coloured pink
  },
  ul: {
    marginBottom: -50
  },
  div: {
    marginTop: 10,
    paddingBottom: 10
  },
  p: {
    marginBottom: -50
  },
  h4: {
    marginBottom: -30,
    fontSize: 20 / PixelRatio.getFontScale()
  },
  img: {
    width: 75,
    height: 75
  },
  h2: {
    marginBottom: -40,
    fontSize: 25 / PixelRatio.getFontScale()
  }
};
export default styles;
function newFunction() {
  return "#751AFF";
}
