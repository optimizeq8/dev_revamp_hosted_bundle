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
    fontFamily: "benton-sans-medium",
    fontSize: 16,
    paddingVertical: 0
  },
  subtext: {
    alignSelf: "center",
    fontFamily: "benton-sans-regular",
    fontSize: 12,
    paddingTop: 5,
    marginBottom: 10,

    color: "#fff",
    textAlign: "left"
  },
  buttonN: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: "#FF9D00",
    padding: 10,
    marginBottom: 20,
    bottom: 15
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 100,
    paddingVertical: 10,
    paddingHorizontal: 7
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 70,
    width: 70,
    margin: 15
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
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "benton-sans-medium",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10
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
    ...StyleSheet.absoluteFillObject
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#5D1CD8",
    paddingHorizontal: 50,
    borderRadius: 10,
    borderColor: "#5D1CD8",
    alignSelf: "center",
    width: 300,
    height: 50
  },
  inputtext: {
    fontFamily: "benton-sans-light",
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
    fontSize: 25,
    color: "#000000"
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
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default styles;
