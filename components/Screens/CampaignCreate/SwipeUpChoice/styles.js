import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  container: {
    backgroundColor: "transparent",
    height: heightPercentageToDP(100)
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 7,
    marginBottom: 30
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingVertical: 0
  },
  subtext: {
    alignSelf: "center",
    fontFamily: "montserrat-regular",
    fontSize: 12,
    paddingTop: 5,
    marginBottom: 10,
    color: "#fff",
    textAlign: "left"
  },
  appTexts: {
    alignSelf: "center",
    fontFamily: "montserrat-medium",
    fontSize: widthPercentageToDP(3.2),
    marginBottom: 6,

    color: "#fff",
    textAlign: "left"
  },
  icon: {
    alignSelf: "center",
    paddingVertical: heightPercentageToDP(8),
    paddingHorizontal: 7
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  video: {
    // height: 95,
    // width: 95,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 30
  },
  placeholder: {
    borderRadius: 13,
    overflow: "hidden",
    alignSelf: "center",
    width: "90%",
    height: "35%",
    zIndex: 0,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#fff",
    justifyContent: "center"
  },
  mainCard: {
    top: 15,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "#fff",
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    color: "white",
    paddingBottom: 10,
    fontFamily: "montserrat-semibold",
    fontSize: widthPercentageToDP(4),
    alignSelf: "center"
  },

  deepLinkError: {
    color: "white",
    // paddingBottom: 10,
    fontFamily: "montserrat-semibold",
    fontSize: widthPercentageToDP(3),
    alignSelf: "center",
    width: widthPercentageToDP(75),
    top: heightPercentageToDP(5)
  },
  activeBadege: {
    backgroundColor: "#5F5F5F",
    width: 40,
    height: 40,
    borderRadius: 20
  },
  badge: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#5F5F5F",
    borderWidth: 2
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: heightPercentageToDP(105)
  },
  input: {
    marginTop: 20,
    backgroundColor: "#5D1CD8",
    paddingHorizontal: 50,
    borderRadius: 10,
    borderColor: "#5D1CD8",
    alignSelf: "center",
    width: 300,
    height: 50
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center",
    color: "#fff"
  },
  root: {
    marginTop: 20,
    padding: 10
  },
  titleContainer: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "#DCDCDC",
    padding: 10
  },
  title: {
    textAlign: "center",
    color: "white",
    paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: widthPercentageToDP(5),
    // paddingHorizontal: 20,
    width: widthPercentageToDP(55)
  },
  // container: {
  //   paddingVertical: 12,
  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   flexDirection: "row",
  //   alignItems: "flex-start"
  // },
  content: {
    marginLeft: 16,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: widthPercentageToDP(11.5),
    height: widthPercentageToDP(11.5),
    borderRadius: 13,
    marginHorizontal: 20
  },
  time: {
    fontSize: 11,
    color: "#808080"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  campaignButton: {
    flexDirection: "row",
    marginHorizontal: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: "#FF9D00",
    height: heightPercentageToDP(7.3)
  },
  OS: {
    padding: widthPercentageToDP(4),
    marginHorizontal: widthPercentageToDP(2),
    borderRadius: 90,
    height: parseInt(heightPercentageToDP(7.2)),
    width: parseInt(widthPercentageToDP(16)),
    justifyContent: "center"
  },
  OSText: {
    fontSize: widthPercentageToDP(2.9),
    fontFamily: "montserrat-semibold",
    alignSelf: "center"
  },
  toggleStyle: {
    alignSelf: "center",
    marginTop: 10,
    width: widthPercentageToDP("13"),
    height: heightPercentageToDP("2.7"),
    borderRadius: 25,
    padding: 0
  },
  toggleCircle: {
    width: widthPercentageToDP("5"),
    height: heightPercentageToDP("2.4"),
    borderRadius: 50
  }
});

export default styles;
