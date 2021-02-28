import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Animated, { multiply } from "react-native-reanimated";
import { useValue } from "react-native-redash/src/v1/Hooks";
import { interpolateColor } from "react-native-redash/src/v1/Colors";
import { onScrollEvent } from "react-native-redash/src/v1/Gesture";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";

const BORDER_RADIUS = 75;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});
const slides = [
  {
    title: "Relaxed",
    subtitle: "AAAAA",
    description:
      "aaaaaa aaa aaaaa aaa aaaaa aa aaaa aaa aaa aaaaaa aaa aaaaa aaa aaaaa aa aaaa aaa aaa aaaaaa aaa aaaaa aaa aaaaa aa aaaa aaa aaa",
    color: "#BFEAF5",
  },
  {
    title: "Playful",
    subtitle: "BBBBB",
    description:
      "bbbb bbbbbbbbb bbbbbb bbbbbbbbb bbbbbb bbbb bbbbbbbbb bbbbbb bbbbbbbbb bbbbbb bbbb bbbbbbbbb bbbbbb bbbbbbbbb bbbbbb",
    color: "#BEECC4",
  },
  {
    title: "Excentric",
    subtitle: "CCCCC",
    description:
      "ccc ccc cccccc ccccc cccc cccc ccccccc ccc ccc cccccc ccccc cccc cccc ccccccc ccc ccc cccccc ccccc cccc cccc ccccccc",
    color: "#FFE4D9",
  },
  {
    title: "Funky",
    subtitle: "DDDDD",
    description:
      "ddddd dddd dddd dddddd ddd ddddd dddd dddd ddddd dddd dddd dddddd ddd ddddd dddd dddd ddddd dddd dddd dddddd ddd ddddd dddd dddd",
    color: "#FFDDDD",
  },
];

const Onboarding = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useValue(0);
  // TODO: scrollHandler useScrollHandler
  const onScroll = onScrollEvent({ x });
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{ onScroll }}
        >
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              flex: 1,
              transform: [{ translateX: multiply(x, -1) }],
            },
          ]}
        >
          {slides.map(({ subtitle, description }, index) => (
            <Subslide
              key={index}
              onPress={() => {
                if (scroll.current) {
                  scroll.current
                    .getNode()
                    .scrollTo({ x: width * (index + 1), animated: true });
                }
              }}
              last={index === slides.length - 1}
              {...{ subtitle, description }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;
