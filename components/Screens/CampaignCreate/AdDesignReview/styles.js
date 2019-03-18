import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  inputtext: {
    fontFamily: "benton-sans-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50
  },
  buttonN: {
    padding: 10,
    paddingTop: 0,
    bottom: 15
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    alignSelf: "center",
    height: 50,
    width: 50,
    margin: 15
  },
  placeholder: { alignSelf: "center", height: 300, width: 300, margin: 0 },

  mainCard: {
    top: 15,

    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "#fff",
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  brand_name: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 40,
    fontFamily: "benton-sans-medium",
    fontSize: 18,
    paddingLeft: 20,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1
  },
  headline: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "benton-sans-medium",
    fontSize: 16,
    paddingLeft: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1
  },
  call_to_action: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "benton-sans-medium",
    fontSize: 16,
    top: "80%",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1
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
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000"
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginTop: 90,
    paddingHorizontal: 20,
    textAlign: "center"
  }
});

export default styles;
