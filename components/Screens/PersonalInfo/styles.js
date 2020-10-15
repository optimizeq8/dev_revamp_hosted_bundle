import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";

const styles = StyleSheet.create({
  safeAreaViewContainer: { flex: 1, backgroundColor: "#0000" },
  mainCard: {
    flex: 1,
  },
  phoneInput: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 10,
    marginTop: 10,
  },
  flagIcon: {
    fontSize: 12,
    paddingLeft: 0,
    paddingRight: 0,
  },
  flagStyle: {
    height: 15,
  },
  businessView: {
    paddingBottom: "30%",
    paddingTop: 13,
    paddingHorizontal: 20,
    // flex: 1
  },
});

export default styles;
