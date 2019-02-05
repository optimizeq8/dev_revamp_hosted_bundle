import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  mainCard: {
    top: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1
  },

  shadow: {
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flex: 1,
    marginVertical: 5
  },
  label: {
    color: "#258779",
    marginTop: 15,
    marginLeft: 40,
    marginRight: 40,
    textAlign: "center"
  },
  text: {
    textAlign: "center",
    color: "#BDA747",
    fontFamily: "benton-sans-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  contentContainer: {
    paddingTop: 30
  },

  header: {
    alignSelf: "center",
    color: "#258779",
    fontFamily: "benton-sans-regular",
    fontSize: 25
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
