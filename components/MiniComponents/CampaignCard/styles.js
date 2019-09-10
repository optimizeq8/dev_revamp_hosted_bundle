import { StyleSheet } from "react-native";
import { isRTL } from "expo-localization";
import { Dimensions } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 20,
    borderRadius: 30,
    marginVertical: 8,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: "#6268FF",
    shadowOffset: { height: 6, width: 0 },
    elevation: 5
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 0
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  titleText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: "70%",
    left: 5,
    textAlign: "left"
  },

  subtext: {
    paddingTop: 5,
    fontFamily: "montserrat-semibold",
    fontSize: 10,
    color: "#fff"
  },
  campaignButton: {
    flex: 1,
    padding: 20,
    paddingVertical: 15
  },
  chart: {
    paddingHorizontal: 5,
    top: 15
  },
  chartText: {
    color: globalColors.orange,
    fontFamily: "montserrat-medium",
    fontSize: 12,
    marginLeft: 10
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 17,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff",
    fontFamily: "montserrat-semibold"
  },
  containerStyle: {
    position: "absolute",
    left: "80%",
    // left: isRTL ? 0 : '80%',
    // right: isRTL ? '0%' : 0,
    top: "87%",
    backgroundColor: "transparent",
    borderRadius: 20
  },
  toggleStyle: {
    width: 65,
    height: 20,
    borderRadius: 20,
    padding: 0
  },
  icon: {
    position: "absolute",
    color: "#fff",
    left: "88%",
    fontSize: 40,
    top: "-3%"
  },
  reviewText: {
    fontFamily: "montserrat-regular",
    fontSize: 13,
    padding: 3,
    color: "#fff"
  },
  campaignInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: widthPercentageToDP(40),
    left: 10
  },
  campaignIcons: {
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  campaignNumbers: {
    top: 6,
    fontFamily: "montserrat-medium",
    right: 10
  },
  toggleTextLeft: {
    fontSize: 11,
    position: "absolute",
    top: -7,
    left: 12,
    fontFamily: "montserrat-light",
    color: "#fff"
  },
  toggleTextRight: {
    fontSize: 9.5,
    position: "absolute",
    top: -7,
    // left: 12,
    fontFamily: "montserrat-light",
    color: "#fff"
  },
  adStatus: {
    borderRadius: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
    top: 5
  },
  circleStyle: {
    width: 17,
    height: 17,
    borderRadius: 50
  },
  chartContainer: {
    flexDirection: "row"
  },
  iconImpression: {
    bottom: 3
  }
});

export default styles;
