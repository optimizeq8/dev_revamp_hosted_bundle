import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "black",
    height: "100%"
  },
  container: {
    backgroundColor: "black",
    height: "100%",
    flex: 1,
    width: "100%"
  },
  header: {
    backgroundColor: "transparent",
    borderBottomWidth: 0
  },
  headerBody: {
    alignItems: "flex-start"
  },
  brandName: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingLeft: 10
  },
  headline: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 12,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingLeft: 10
  },
  content: {
    flexGrow: 1,
    margin: 0,
    padding: 0
  },
  mainCard: {
    borderRadius: 15,
    flex: 1,
    margin: 0,
    padding: 0
  },
  video: {
    width: "100%",
    height: "100%"
  },
  placeholder: {
    borderRadius: 15,
    width: "100%",
    minHeight: 300,
    flex: 1,
    zIndex: 0,
    backgroundColor: "black",
    justifyContent: "center"
  },
  callToActionContainer: {
    bottom: "10%",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  callToActionText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 20,
    flex: 1,
    width: "100%",
    paddingLeft: 50
  },
  AD: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1.5 },
    textShadowRadius: 10,
    textAlign: "right",
    paddingRight: 20
  }
});

export default styles;
