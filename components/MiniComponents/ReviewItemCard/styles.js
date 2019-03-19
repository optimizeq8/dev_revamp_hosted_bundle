import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  title: { color: "#000", fontSize: 48 },
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  image: {
    alignSelf: "center",
    height: 120,
    width: 120,
    margin: 15
  },
  imageIcon: {
    alignSelf: "center",
    height: 50,
    width: 50
  },
  text: {
    textAlign: "center",
    color: "#5F5F5F",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "benton-sans-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttontext: {
    fontFamily: "benton-sans-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "benton-sans-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  button: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#5F5F5F",
    alignSelf: "center"
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#5F5F5F",
    fontFamily: "benton-sans-regular",
    fontSize: 20
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },

  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 7
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "benton-sans-medium",
    fontSize: 16,
    paddingVertical: 0
  },
  subtext: {
    fontFamily: "benton-sans-regular",
    fontSize: 12,
    paddingTop: 5,
    color: "#fff",
    textAlign: "left"
  },
  campaignButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 10,

    padding: 10
  },
  icon: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 40,
    paddingVertical: 10,
    paddingHorizontal: 7
  },
  contentContainer: {
    paddingTop: 30
  }
});

export default styles;
