import React from "react";

import { Text, View } from "react-native";
import { Container } from "native-base";
import Swiper from "./Swiper";
import styles, { colors } from "./styles";

const Example = () => (
  <View style={{ height: 100 }}>
    <Swiper
      dots
      dotsColor="rgba(255, 255, 255, 0.25)"
      dotsColorActive="rgba(255, 255, 255, 0.75)"
      style={{ height: 50 }}
    >
      <Slide title="Lorem" />
      <Slide title="ipsum" />
      <Slide title="dolor" />
      <Slide title="sit" />
    </Swiper>
  </View>
);

const Slide = ({ title }) => (
  <View style={styles.slide}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default Example;
