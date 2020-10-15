import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000",
  },
  businessView: {
    paddingBottom: "30%",
    paddingTop: 13,
    paddingHorizontal: 20,
  },
  bottomCard: {
    justifyContent: "center",
    alignSelf: "center",
    height: 54,
    width: widthPercentageToDP(90),
    marginHorizontal: 26,
    // marginBottom: 30
  },
  subHeading: {
    fontSize: 19,
    color: "#FFF",
    fontFamily: "montserrat-bold",
    marginLeft: 16,
    textTransform: "uppercase",
  },
  subHeadView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 26,
    marginVertical: 15,
  },
});

export default styles;
