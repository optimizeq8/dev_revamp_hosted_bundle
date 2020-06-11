import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  messageText: {
    color: "white",
    alignSelf: "center",
  },
  messageView: {
    position: "relative",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "95%",
  },
  transparentTriangleView: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,

    transform: [{ rotate: "10deg" }],
  },
  orangeTriangleView: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
    transform: [{ rotate: "195deg" }],
  },
  messageBubbleOuterView: {
    marginLeft: 18,
    marginRight: 18,
    marginVertical: 5,
    flexDirection: "column",
    // alignSelf: align,
  },
  dateText: {
    color: "#A496AC",
    fontSize: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  messageFullView: {
    flexDirection: "row",
  },
  image: {
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: 150,
    height: 150,
    zIndex: 0,
    justifyContent: "center",
  },
});
export default styles;
