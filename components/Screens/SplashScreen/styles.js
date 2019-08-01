import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000
  },
  media: {
    alignSelf: "center",
    height: 180,
    width: 180
  },
  contentContainer: {
    paddingVertical: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default styles;
