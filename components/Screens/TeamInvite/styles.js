import { StyleSheet } from "react-native";

import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  slide: {
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: "montserrat-bold",
    color: globalColors.white,
    fontSize: 30
  },
  contentContainer: {
    marginTop: 15,
    paddingTop: 15,
    marginBottom: 15
  },
  popupOverlay: {
    height: "100%"
  },
  slideIcon: {
    top: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  iconTitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    bottom: 1.5,
    textAlign: "center",
    fontFamily: "montserrat-bold"
  },
  safeAreaView: {
    height: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: "#0000"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 17,
    paddingVertical: 10,
    bottom: 5
  },
  slidTitle: {
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold"
  },
  placeholder: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: "90%",
    zIndex: 0,
    marginTop: 10,
    backgroundColor: "black",
    justifyContent: "center"
  },
  slideText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    zIndex: 10
  },
  typeCardContainer: {
    top: "0%",
    width: "100%",
    height: "95%",
    bottom: "5%",
    paddingTop: 10,
    alignSelf: "center"
  },
  media: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: globalColors.orange,
    width: "70%",
    height: "23%",
    alignSelf: "center",
    top: "40%",
    borderRadius: 30
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
    fontSize: 17
    // paddingVertical: 10
    // bottom: 5
  }
});

export default styles;
