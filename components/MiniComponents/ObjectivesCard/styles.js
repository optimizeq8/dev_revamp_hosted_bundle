import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 15,
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    // paddingTop: 6,
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingVertical: 0,
  },
  subtext: {
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    fontSize: 11,
    paddingTop: 5,
    color: "#fff",
    textAlign: "left",
    //  width: "80%", // Removed was cutting the sentence
    lineHeight: 18,
  },
  campaignButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
    padding: 10,
    height: 80,
    marginBottom: 10,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 8,
    borderWidth: 2.5,
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 40,
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
});

export default styles;
