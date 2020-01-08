import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    top: 5,
    backgroundColor: "#0000"
  },
  loadingText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#FFF",
    fontFamily: "montserrat-regular",
    textAlign: "center",
    width: "60%",
    marginVertical: 20
  },
  loadingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
