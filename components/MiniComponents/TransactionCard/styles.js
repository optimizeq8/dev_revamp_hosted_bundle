import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    paddingVertical: 13,
    alignItems: "center",
  },
  amountContainer: {
    flexDirection: "column",
  },
  amountText: {
    fontSize: 26,
    paddingHorizontal: 0,
    color: "#FF8D04",
  },
  cardStyle: {
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 40,
    marginVertical: 9,
    paddingVertical: 18,
    paddingHorizontal: 25,
  },
  text: {
    color: "#FFF",
    fontFamily: "montserrat-bold",
    fontSize: 13,
    textAlign: "left",
    textTransform: "uppercase",
  },
  amountTextTitle: {
    color: "#FFF",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  dateText: {
    color: "#FF8D04",
    fontFamily: "montserrat-bold-english",
    fontSize: 18,
    textAlign: "left",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    textAlign: "left",
    color: "#FFFF",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 10,
    width: 200,
    textTransform: "uppercase",
  },
  subText: {
    fontFamily: "montserrat-regular-english",
    fontSize: 14,
    color: "#FFF",
    textAlign: "left",
    marginTop: 3,
    textTransform: "uppercase",
  },
  icon: {
    color: "#FFFF",
    fontSize: 35,
  },
  transactionText: {
    marginTop: 7,
  },
  instagramIcon: {
    marginRight: -25,
    marginLeft: -20,
    marginBottom: -25,
    marginTop: -20,
  },
});

export default styles;
