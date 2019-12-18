import { StyleSheet } from "react-native";
import { globalColors } from "../../../../GlobalStyles";

export default StyleSheet.create({
  adRejectedTitle: {
    fontSize: 18,
    fontFamily: "montserrat-bold",
    color: "#EA514B",
    paddingVertical: 5
  },
  rejectedReasonContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 10
  },
  reasonTitle: {
    color: globalColors.orange,
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    fontSize: 15
  },
  rejectedReasonText: {
    fontSize: 11,
    fontFamily: "montserrat-regular",
    color: "#fff",
    width: 200
  },
  rejectedModalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "70%"
  },
  rejectedModalReasonText: {
    fontFamily: "montserrat-regular",
    fontSize: 15,
    color: "#fff",
    width: "70%",
    alignSelf: "center"
  }
});
