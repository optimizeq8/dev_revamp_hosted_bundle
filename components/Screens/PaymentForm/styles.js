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
    flex: 1
  },
  errortext: {
    marginTop: 5,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-light",
    textAlign: "center",
    lineHeight: 18
  },
  image: {
    alignSelf: "center",
    height: 170,
    width: 170
  },

  mainCard: {
    top: 20,
    borderColor: "#FF9D00",
    backgroundColor: "#FF9D00",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    height: 45,
    width: 200,
    marginLeft: 0,
    marginRight: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  boldtext: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    alignSelf: "center"
  },

  snapbutton: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingHorizontal: 10,
    lineHeight: 15
  },
  header: {
    fontFamily: "montserrat-medium",
    paddingHorizontal: 50,
    paddingVertical: 30,
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  headerview: {
    justifyContent: "center",
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "flex-start"
  },
  bottomCard: {
    paddingBottom: 15,
    top: 15,
    borderColor: "#FF9D00",
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: 130,
    marginLeft: 0,
    marginRight: 0,
    shadowRadius: 5,
    shadowOpacity: 0.2
  },
  button: {
    marginTop: 15,
    backgroundColor: "#FF9D00",
    borderRadius: 0,
    alignSelf: "center",
    justifyContent: "center"
  },
  buttontext: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-medium"
  },
  whitebutton: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 0,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    alignSelf: "center",
    justifyContent: "center"
  },
  whitebutton2: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 0,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
    alignSelf: "center",
    justifyContent: "center"
  },
  whitebuttontext: {
    color: "#751AFF",
    fontSize: 12,
    fontFamily: "montserrat-medium",
    textAlign: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
