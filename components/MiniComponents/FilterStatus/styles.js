import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inactivebutton: {
    backgroundColor: "transparent",
    alignSelf: "center",
    borderColor: "#fff",
    borderWidth: 1,
    width: 23,
    height: 23,
    borderRadius: 11.5,
    marginBottom: 10
  },
  activebutton: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 23,
    height: 23,
    borderRadius: 11,
    marginBottom: 10
  },
  text: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    marginBottom: 10
  }
});
export default styles;
