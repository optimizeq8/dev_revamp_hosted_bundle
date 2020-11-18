import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  campaignAudienceListOuterView: {
    backgroundColor: "#f8f8f8",
    height: "100%",
  },
  cardView: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    width: "70%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 5,
  },
  activeCardView: {
    borderColor: globalColors.purple,
    borderWidth: 3,
  },
  audienceName: {
    fontSize: 12,
    // textTransform: "uppercase",
    fontFamily: "montserrat-medium",
    color: globalColors.purple,
    textAlign: "left",
  },
  flexAddEdit: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  editAudienceIcon: {
    marginHorizontal: 5,
    borderWidth: 1,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: globalColors.purpleTran,
    borderColor: globalColors.purple,
  },
  deleteAudienceIcon: {
    marginHorizontal: 5,
    borderWidth: 1,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: globalColors.purpleTran,
    borderColor: globalColors.purple,
  },
  rightViewStyle: {
    width: widthPercentageToDP("12%"),
  },
  cardViewOut: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  countryNames: {
    fontSize: 10,
    fontFamily: "montserrat-regular",
    color: globalColors.purple3,
    textAlign: "left",
  },
});

export default styles;
