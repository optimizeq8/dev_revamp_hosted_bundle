import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentageToDP("4"),
    backgroundColor: "#751AFF"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  contentContainer: {
    paddingBottom: heightPercentageToDP(30),
    marginBottom: heightPercentageToDP(50)
  },
  activebutton: {
    backgroundColor: "#fff",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 50,
    elevation: 0,
    marginRight: 10
  }
});

export default styles;
