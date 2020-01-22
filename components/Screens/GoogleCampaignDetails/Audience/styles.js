import { StyleSheet } from "react-native";

import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    flex: 1,
    backgroundColor: "#0000"
  },
  mainContainer: {
    backgroundColor: "#0000"
  },
  container: {
    backgroundColor: "#0000",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingVertical: 10
  },

  targetList: {
    flexDirection: "column",
    marginHorizontal: 40,
    paddingBottom: 50
  },
  targetTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8
  },
  icon: {
    alignSelf: "center",
    color: globalColors.orange,
    fontSize: 30
  },
  menutext: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "montserrat-bold",
    textAlign: "left",
    color: "#fff"
  },
  menudetails: {
    textAlign: "left",
    paddingHorizontal: 15,
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#FF9D00"
  },
  keywordsColumn: {
    flexDirection: "column",
    alignItems: "center"
  },
  editButton: {
    overflow: "hidden",
    justifyContent: "center",
    height: 26,
    backgroundColor: "#0000",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    borderColor: "#fff",
    borderWidth: 1
  },
  editButtonText: {
    marginRight: 0,
    paddingHorizontal: 20,
    fontSize: 12,
    fontFamily: "montserrat-regular",
    alignSelf: "center",
    color: "#fff",
    textAlign: "center"
  },
  keywordButton: {
    overflow: "hidden",
    justifyContent: "center",
    height: 26,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  keywordButtonText: {
    marginRight: 0,
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "montserrat-bold",
    alignSelf: "center",
    color: "#fff",
    textAlign: "center"
  },
  xIcon: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10
  },
  keywordScrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15
    // marginHorizontal: 40
    // marginBottom: heightPercentageToDP(35)
    // height: "10%"
  },
  keywordsAddButton: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: -1
  },
  popupOverlay: {
    height: "100%"
  },
  proceedButtonRTL: {
    width: 65,
    height: 65,
    backgroundColor: globalColors.orange,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 4
    // padding: 20
  }
});

export default styles;
