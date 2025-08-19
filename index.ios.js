/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component, createRef } from "react";
import { processColor, StyleSheet } from "react-native";

import NativeLinearGradient, { type Props } from "./src";
import { View } from "react-native";

const convertPoint = (name, point) => {
  if (Array.isArray(point)) {
    console.warn(
      `LinearGradient '${name}' property should be an object with fields 'x' and 'y', ` + "Array type is deprecated."
    );

    return {
      x: point[0],
      y: point[1],
    };
  }
  return point;
};

export default class LinearGradient extends Component<Props> {
  props: Props;
  gradientRef = createRef<NativeLinearGradient>();

  static defaultProps = {
    start: { x: 0.5, y: 0.0 },
    end: { x: 0.5, y: 1.0 },
  };

  setNativeProps(props: Props) {
    this.gradientRef.current.setNativeProps(props);
  }

  render() {
    const { children, start, end, colors, locations, useAngle, angleCenter, angle, style, ...otherProps } = this.props;
    if (colors && locations && colors.length !== locations.length) {
      console.warn("LinearGradient colors and locations props should be arrays of the same length");
    }
    return (
      <View style={StyleSheet.flatten([{ overflow: "hidden" }, style])}>
        <View style={styles.bg} pointerEvents="none">
          <NativeLinearGradient
            ref={this.gradientRef}
            // style={StyleSheet.flatten([{ overflow: "hidden" }, style])}
            style={{ flex: 1, overflow: "hidden" }}
            {...otherProps}
            startPoint={convertPoint("start", start)}
            endPoint={convertPoint("end", end)}
            // colors={colors.map(processColor)}
            colors={colors}
            locations={locations ? locations.slice(0, colors.length) : null}
            useAngle={useAngle}
            angleCenter={convertPoint("angleCenter", angleCenter)}
            angle={angle}
          />
        </View>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
