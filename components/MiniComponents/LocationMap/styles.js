import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  mapContainer: {
    height: "85%",
    justifyContent: "center",
    width: "100%",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    overflow: "hidden",
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    bottom: "20%",
  },
  mapButtons: {
    width: 40,
    height: 40,
    justifyContent: "center",
    backgroundColor: globalColors.orange,
  },
  buttonText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 40,
  },
});
