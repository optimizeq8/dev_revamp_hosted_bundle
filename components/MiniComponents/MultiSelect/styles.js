import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";

export default (sectionStyle = {
  safeAreaContainer: {
    height: "100%"
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  dataContainer: {
    alignItems: "center",
    width: "100%"
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    // width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  slidercontainer: {
    paddingHorizontal: 40,
    width: "100%"
  },
  interestButton: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  scrollContainer: {
    height: 180,
    marginVertical: 10
  },
  indicator: {
    fontSize: 30,
    marginRight: 20,
    color: "#fff"
  },
  itemCircles: {
    fontSize: 30,
    color: globalColors.orange
  },
  button: {
    backgroundColor: "transparent",
    alignSelf: "center",
    borderRadius: 50,
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginVertical: 5
  },
  icon: {
    fontSize: 70,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 17,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 10
  },
  countryScrollContainer: {
    height: 250
  }
});
