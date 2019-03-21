import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  title: {
    top: -15,
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    paddingTop: 10,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 18,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  mainCard: {
    top: 15,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "transparent",
    shadowColor: "transparent",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  activeBadege: {
    backgroundColor: "transparent",
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: "#FF9D00",
    borderWidth: 2
  },
  badge: {
    backgroundColor: "transparent",
    width: 35,
    height: 35,
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1
  },
  activeBadegeText: {
    color: "#FF9D00",
    fontSize: 12,
    fontFamily: "montserrat-medium"
  },
  dash: {
    width: 10,
    marginHorizontal: 5,
    borderBottomColor: "#fff",
    borderBottomWidth: 2
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-light"
  },
  keyboard: {
    marginTop: 30,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.9
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
