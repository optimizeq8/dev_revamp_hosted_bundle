import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#fff", fontSize: 48 },
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

    borderRadius: 15,
    flex: 1
  },

  circle: {
    marginHorizontal: 15,
    alignSelf: "flex-start",
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: "#258779",
    borderColor: "#fff",
    justifyContent: "center"
  },
  number: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    fontFamily: "benton-sans-regular",
    fontSize: 30,
    paddingBottom: 60
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

  h3: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "benton-sans-regular",
    textShadowColor: "#7f7f7f",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    paddingTop: 10
  },
  buttontext: {
    paddingTop: 10,
    paddingHorizontal: 5,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "benton-sans-regular",
    fontSize: 20,
    paddingBottom: 40
  },
  text: {
    textAlign: "center",
    color: "#BDA747",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  contentContainer: {
    paddingTop: 30
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 40,
    shadowColor: "#a0a0a0",
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 7 }
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10
  },

  inputs: {
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    height: 40,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5
  },
  greenbutton: {
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#258779",
    paddingHorizontal: 50,
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    paddingBottom: 13
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#BDA747",
    paddingHorizontal: 50,
    shadowColor: "#2b2b2b",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 5,
    shadowOffset: { width: 3, height: 5 },
    paddingBottom: 13
  },
  closeButton: {
    marginTop: 20,
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 10,
    marginVertical: 10,
    backgroundColor: "#BA2D17",
    paddingHorizontal: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    borderRadius: 20,
    shadowOffset: { width: 3, height: 3 }
  },
  remove: {
    alignSelf: "flex-end"
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
