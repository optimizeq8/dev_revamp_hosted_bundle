import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#0000"
  },
  searchContainer: {
    height: 50,
    width: "80%",
    zIndex: 10
  },
  headerBlock: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container: {
    backgroundColor: "#0000",
    width: "100%",
    height: "100%"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  contentContainer: {
    paddingBottom: heightPercentageToDP(30)
    // marginBottom: heightPercentageToDP(50)
  },
  activebutton: {
    justifyContent: "center",
    width: 55,
    height: 55
  },
  mainContainer: {
    width: "100%",
    height: "100%"
  },
  noTranText: {
    alignSelf: "center",
    fontSize: 18,
    color: "#FFF",
    fontFamily: "montserrat-regular",
    paddingVertical: 20
  }
});

export default styles;
