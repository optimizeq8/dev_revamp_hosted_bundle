import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  headerBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  placeholder1: {
    opacity: 0.4,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    zIndex: 0,
    justifyContent: "center",
    position: "absolute"
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  headerTitle: {
    // flex: 1,
    fontSize: 14,
    color: "#fff",
    fontFamily: "montserrat-medium",
    textAlign: "center",
    alignSelf: "center"
  },
  container: {
    // marginTop: 30,
    backgroundColor: "black",
    height: "100%",
    flex: 1,
    width: "100%"
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    // paddingTop: 10,
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingVertical: 0
  },
  subtext: {
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingTop: 5,
    color: "#fff",
    textAlign: "left"
  },
  buttonN: {
    justifyContent: "space-between",
    flexDirection: "row",
    // flex: 1,
    marginHorizontal: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    // backgroundColor: "#FF9D00",
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: "center"
    // bottom: 15
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 40,
    paddingVertical: 10,
    paddingHorizontal: 7
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    alignSelf: "center",
    height: 70,
    width: 70,
    margin: 15
  },
  mainCard: {
    top: 15,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "#fff",
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  activeBadege: {
    backgroundColor: "#5F5F5F",
    width: 40,
    height: 40,
    borderRadius: 20
  },
  badge: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#5F5F5F",
    borderWidth: 2
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
