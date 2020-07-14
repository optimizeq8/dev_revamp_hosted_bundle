import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  mapContainer: {
    height: "80%",
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
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 30,
    alignSelf: "center",
    height: 40,
  },
  autoCompleteResaults: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 0.3,
    width: "100%",
    alignSelf: "center",
    flexDirection: "column",
  },
  autoCompleteResaultText: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
  },
  autoCompleteResaultTextSecondery: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
  },
});
