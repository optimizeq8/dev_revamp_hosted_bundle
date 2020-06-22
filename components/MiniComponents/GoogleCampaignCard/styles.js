import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 20,
    borderRadius: 30,
    marginVertical: 8,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: "#6268FF",
    shadowOffset: { height: 6, width: 0 },
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 0,
    alignItems: "center",
  },
  headerContent: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
    flex: 1,
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
  },
  titleText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    textAlign: "left",
  },
  campaignButton: {
    flex: 1,
    padding: 20,
    paddingVertical: 20,
  },
  reviewText: {
    fontFamily: "montserrat-bold",
    textAlign: "left",
    fontSize: 13,
    paddingHorizontal: 5,
    color: "#fff",
    textTransform: "uppercase",
  },
  adStatus: {
    borderRadius: 16,
    paddingTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  chartContainer: {
    flexDirection: "row",
    flex: 1,
  },

  circleIcon: {
    color: "#fff",
    fontSize: 16,
  },
  cardText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 12,
    textAlign: "right",
  },
  cardStatusDays: {
    flex: 0.5,
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 5,
  },
  horizontalLineView: {
    width: 3,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});

export default styles;
