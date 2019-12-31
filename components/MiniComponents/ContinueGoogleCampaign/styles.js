import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeAreaView: {
    height: "100%",
    backgroundColor: "#0000"
  },
  popupOverlay: {
    height: "100%"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 17,
    alignSelf: "center"
  },
  warningText: {
    fontFamily: "montserrat-light",
    width: 300,
    fontSize: 16,
    paddingBottom: 25
  },
  footerButtons: {
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    top: 20
  },
  contentStyle: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#0005",
    borderRadius: 35,
    padding: 25
  },
  sections: {
    marginVertical: 10,
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: "15%"
  },
  contentContainer: {
    paddingBottom: "20%",
    alignItems: "center"
  },
  icon: {
    alignSelf: "center",
    marginBottom: 10
  },
  container: {
    height: "50%"
  },
  previewContainer: {
    width: "80%",
    marginHorizontal: 10
  }
});

export default styles;
