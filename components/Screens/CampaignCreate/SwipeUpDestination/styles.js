import { StyleSheet } from "react-native";
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
    backgroundColor: "black",
    overflow: "hidden",
    marginTop: 10,
    flexGrow: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingVertical: 0,
  },
  subtext: {
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingTop: 5,
    color: "#fff",
    textAlign: "left",
  },
  buttonN: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
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
