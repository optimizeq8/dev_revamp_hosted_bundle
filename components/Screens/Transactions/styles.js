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
    justifyContent: "space-evenly",
    paddingVertical: widthPercentageToDP(5)
  },
  container: {
    backgroundColor: "#0000"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  contentContainer: {
    paddingBottom: heightPercentageToDP(30)
    // marginBottom: heightPercentageToDP(50)
  },
  activebutton: {
    backgroundColor: "#fff",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 50,
    elevation: 0,
    marginRight: 10
  },
  mainContainer: {
    backgroundColor: "#F4F4F4",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    width: "100%",
    height: "100%",
    marginTop: 10
  }
});

export default styles;
