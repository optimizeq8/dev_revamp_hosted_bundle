import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: "space-between"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  backbutton: {
    marginLeft: 10
  },
  backbuttonicon: {
    justifyContent: "center",
    top: 25,
    marginLeft: 20
  },
  title: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    textAlign: "center",
    fontFamily: "montserrat-semibold"
  },
  phoneicon: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30
  },
  maincontent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 30
  },
  input1: {
    marginBottom: 10,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center"
  },
  subtext: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 12
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: "montserrat-medium",
    fontSize: 14,
    paddingHorizontal: 10
  },
  input2: {
    backgroundColor: "rgba(0, 0, 0, 0.16)",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50,
    marginTop: 10,
    marginBottom: 20
  },
  downicon: {
    color: "#fff",
    fontSize: 20,
    left: 25
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginVertical: 35
  },
  icon: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  popupOverlay: {
    height: "100%"
  },
  popupContent: {
    marginTop: 10,
    flexDirection: "column"
  },
  modaltitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-medium",
    marginVertical: 5
  },
  modalclosebtn: {
    marginRight: 30,
    alignSelf: "flex-end"
  },
  closeicon: {
    justifyContent: "center",
    top: 25
  }
});

export default styles;
