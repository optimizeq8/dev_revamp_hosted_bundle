import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeAreaView: {
    height: "100%"
  },
  customBackdrop: {
    flex: 1,
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
    marginTop: 20
  },
  contentStyle: {
    // width: "90%",
    alignSelf: "center",
    backgroundColor: "#0007",
    borderRadius: 35
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
  modal: {
    margin: 0,
    justifyContent: "flex-start"
  },
  customButton: {
    borderRadius: 25,
    height: 50
  }
});

export default styles;
