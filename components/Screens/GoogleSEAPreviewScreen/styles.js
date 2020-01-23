import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%",
    flex: 1
  },
  container: {
    backgroundColor: "#0000"
  },
  mainContent: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "flex-start"
  },
  container1: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "space-around"
  },
  searchResult: {
    width: "100%",
    height: "100%"
  },
  searchBar: {
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    shadowColor: "#000"
  },
  searchImage: {
    width: 322,
    height: 43,
    alignSelf: "center"
  },
  phoneImage: {
    width: 276,
    height: 551,
    alignSelf: "center"
  }
});

export default styles;
