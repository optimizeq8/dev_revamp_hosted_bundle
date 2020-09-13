import { StyleSheet, Platform, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  campaignAudienceListOuterView: {
    backgroundColor: "#f8f8f8",
    height: "100%",
  },
  cardView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 7,
    shadowColor: "#000",
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
    fontSize: 16,
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    color: globalColors.gray,
  },
  flexAddEdit: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  editAudienceIcon: {
    marginHorizontal: 5,
  },
  deleteAudienceIcon: {
    marginHorizontal: 5,
  },
});

export default styles;
