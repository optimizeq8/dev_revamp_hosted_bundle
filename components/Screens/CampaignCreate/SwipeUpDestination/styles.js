import { StyleSheet } from "react-native";
import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000",
  },
  contentContainer: {
    backgroundColor: "#fff",
    overflow: "hidden",
    marginTop: 10,
    flexGrow: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
  },
  media: {
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
  content: {
    marginTop: 30,
  },
  placeholder1: {
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    zIndex: 0,
    justifyContent: "center",
    position: "absolute",
    borderBottomLeftRadius: 0,
  },
  container: {
    backgroundColor: "#0000",
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  titletext: {
    textAlign: "left",
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingVertical: 0,
  },
  subtext: {
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingTop: 5,
    color: globalColors.rum,
    textAlign: "left",
  },
  buttonN: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    width: "100%",
    borderWidth: 1,
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 40,
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
});

export default styles;
