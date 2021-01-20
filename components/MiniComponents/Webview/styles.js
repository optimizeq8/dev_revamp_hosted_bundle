import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
const styles = StyleSheet.create({
  mainSafeArea: {
    height: "100%",
    backgroundColor: "#0000",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  contentContainer: {
    alignSelf: "center",
    height: "98%",
    width: "100%",
    marginTop: hp(3),
    padding: 0,
  },
  companyNameText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
    color: globalColors.rum,
    marginVertical: 10,
  },
});

export default styles;
