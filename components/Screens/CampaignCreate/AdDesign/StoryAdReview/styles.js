import { StyleSheet } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  safeAreaContainer: {
    // backgroundColor: "black",
    height: "100%"
  },
  container: {
    backgroundColor: "#0000",
    height: "100%",
    flex: 1,
    width: "100%"
  },

  content: {
    flex: 1,
    margin: 0,
    padding: 0,
    top: 10
    // height: "100%"
  },
  mainCard: {
    borderRadius: 15,
    justifyContent: "center",
    height: "100%"
    // margin: 0,
    // padding: 0
  },

  tiles: {
    height: "95%",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "rgba(150,150,150,0.1)",
    width: "47%"
  },
  cover: {
    width: "100%",
    position: "absolute",
    height: "100%"
  },
  logo: {
    width: "100%",
    height: "50%"
  },
  tilesGrid: {
    height: "40%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  heading: {
    fontFamily: "montserrat-bold",
    color: "#9E58CD",
    fontSize: 15,
    left: "5%",
    marginVertical: 5
  },
  discoverArea: {
    height: "95%",
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
    width: "85%",
    backgroundColor: "#1A1A1A"
  },
  friendsArea: {
    height: "20%",
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: "#9E4CDD"
  },
  logoStyle: {
    width: "100%",
    height: "30%",
    justifyContent: "flex-start",
    top: 10
  },
  headlineStyle: {
    left: 10,
    position: "absolute",
    width: "100%",
    bottom: 0
  },
  headlineTextStyle: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: 16,
    width: "90%"
  },
  sponsoredText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 14
  }
});

export default styles;
