import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  campaignAudienceListOuterView: {
    backgroundColor: "#f8f8f8",
    height: "100%",
  },
  cardView: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: RFValue(10, 414),
    paddingVertical: RFValue(7.5, 414),
    backgroundColor: "#fff",
    borderRadius: RFValue(15, 414),
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
    fontSize: RFValue(6, 414),
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
    marginHorizontal: RFValue(2.5, 414),
    borderWidth: 1,
    width: RFValue(15, 414),
    height: RFValue(15, 414),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(15, 414),
    backgroundColor: globalColors.purpleTran,
    borderColor: globalColors.purple,
  },
  deleteAudienceIcon: {
    marginHorizontal: RFValue(2.5, 414),
    borderWidth: 1,
    width: RFValue(15, 414),
    height: RFValue(15, 414),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(15, 414),
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
    marginHorizontal: RFValue(10, 414),
    marginVertical: RFValue(2.5, 414),
  },
  countryNames: {
    fontSize: 10,
    fontFamily: "montserrat-regular",
    color: globalColors.purple3,
    textAlign: "left",
  },
});

export default styles;
