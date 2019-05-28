import React from "react";

import { Animated, Dimensions, View } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
const Swiper = React.forwardRef((props, ref) => {
  const {
    children,
    dots,
    dotsBottom,
    dotsColor,
    dotsColorActive,
    dotsStyle,
    driver,
    onSwipe,
    ...rest
  } = props;

  const slides = Array.isArray(children) ? children : [children];

  const position = Animated.divide(driver, width);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: driver } } }],
    { useNativeDriver: true }
  );

  const onMomentumScrollEnd = e => {
    if (onSwipe) {
      onSwipe(e, e.nativeEvent.contentOffset.x / width);
    }
  };

  const dotsContainerStyle = [styles.dotsContainer];

  const dotStyle = [dotsStyle, { backgroundColor: dotsColor }];
  const dotActiveStyle = [dotsStyle, { backgroundColor: dotsColorActive }];

  return (
    <View style={styles.container}>
      {dots && (
        <View style={dotsContainerStyle}>
          {slides.map((slide, index) => (
            <View key={`dot-${index}`} style={dotStyle} />
          ))}
        </View>
      )}

      {dots && (
        <View style={dotsContainerStyle}>
          {slides.map((slide, index) => (
            <Animated.View
              key={`dot-active-${index}`}
              style={[
                dotActiveStyle,
                {
                  opacity: position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0, 1, 0],
                    extrapolate: "clamp"
                  })
                }
              ]}
            />
          ))}
        </View>
      )}
      <Animated.ScrollView
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={onScroll}
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        {...rest}
        horizontal
        ref={ref}
      >
        {slides.map((slide, index) => (
          <View key={`slide-${index}`} style={styles.slide}>
            {slide}
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
});

Swiper.defaultProps = {
  dotsBottom: 40,
  dotsColor: "rgba(0, 0, 0, 0.25)",
  dotsColorActive: "#000",
  dotsStyle: {
    borderRadius: 7,
    height: 14,
    marginHorizontal: 10,
    width: 14
  },
  driver: new Animated.Value(0)
};

const styles = {
  container: { flex: 1 },
  slide: {
    width,
    // marginBottom: 35,
    height
  },
  dotsContainer: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    top: heightPercentageToDP("2%"),
    zIndex: 80,
    position: "absolute"
  }
};

export default Swiper;
