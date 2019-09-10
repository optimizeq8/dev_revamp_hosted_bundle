import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: hp("10"),
    alignItems: "center",
    flexDirection: "column",
    opacity: 1,
    elevation: 0,
    marginLeft: 0,
    marginRight: 0
  },
  headerContainer: {
    justifyContent: "flex-start",
    marginTop: 10,
    alignItems: "center"
  },
  transactionFilterContainer: {
    justifyContent: "space-between"
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  titleStatus: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: 150,
    paddingTop: 20,
    alignSelf: "center",
    paddingBottom: 20
  },
  titleDate: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: 150,
    paddingTop: 20,
    alignSelf: "center",
    paddingBottom: 10
  },
  subtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingTop: 25,
    color: "#fff",
    textAlign: "center"
  },
  clearFilterText: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingTop: 25,
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 20,
    textDecorationColor: "#fff"
  },
  dateInput: {
    marginBottom: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    alignSelf: "center",
    width: 270,
    height: hp(7.9),
    justifyContent: "center"
  },
  categories: {
    textAlign: "center",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-regular",
    fontSize: 16,
    paddingHorizontal: 10
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingHorizontal: 10
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  startColumn: {
    flexDirection: "column",
    textAlign: "center"
  },
  middleColumn: {
    flexDirection: "column",
    justifyContent: "center"
  },
  endColumn: {
    flexDirection: "column"
  },
  bottomView: {
    bottom: "10%"
  },
  fontSize12: {
    fontSize: 12
  }
});

export default styles;
