import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaViewRegionsAndAreas: {
    flex: 1,
    justifyContent: "space-around"
  },
  submitButton: {
    elevation: -1,
    height: 0,
    backgroundColor: "transparent",
    top: "5%"
  },
  addIconButton: { elevation: -1 },
  areaText: { marginTop: 30 },
  headerComponent: {
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
    paddingHorizontal: 30
  },
  topView: {
    //   marginTop: 40,
    alignItems: "center"
  },
  container: {
    flex: 1
  },

  headerBlock: {
    marginBottom: 10
  },

  addressIcon: {
    alignSelf: "center",
    marginTop: 20
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 16,
    width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  interestButton: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    borderRadius: 50,
    // top: "30%",
    marginTop: 30,
    height: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    marginTop: 15,
    flex: 1,
    paddingTop: 30
    // maxHeight: "100%"
    // flexDirection: "column",
    //justifyContent:""
  },

  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    bottom: 45,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    paddingVertical: 7,
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  closeIcon: {
    zIndex: 10,
    elevation: 5
  },
  required: { fontSize: 10, color: "#717171" },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 40
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
    height: 40
  },
  input: {
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    width: 100,
    borderColor: "#7039FF",
    flexDirection: "row",
    borderBottomWidth: 1.5
  },
  selector: {
    alignSelf: "center",
    justifyContent: "center",
    width: 250,
    height: 40,
    borderColor: "#7039FF",
    flexDirection: "row",
    borderBottomWidth: 1.5,
    marginBottom: 20
  },
  indicator: {
    fontSize: 30,
    marginRight: 20,
    color: "#fff"
  },
  itemCircles: {
    fontSize: 30,
    color: globalColors.orange
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  flex: {
    flex: 1,
    bottom: 9
  },
  blockAndBuildingView: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: 250,
    marginBottom: 15
  },
  streetItem: {
    width: 250
  },
  officeAndAvenueView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    marginTop: 20,
    alignSelf: "center"
  },
  bottom5: {
    bottom: 5
  },
  contentScrollViewContainer: {
    paddingBottom: 50,
    flex: 1
  }
});

export default styles;
