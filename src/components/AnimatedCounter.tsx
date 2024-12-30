import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface AnimatedCounterProps {
  targetValue: number; // The target value to animate towards.
  duration?: number; // Total animation duration in milliseconds.
  increment?: number; // Increment step for the animation.
  style?: TextStyle; // Style for the animated text.
  prefix?: string; // Text to display before the number.
  suffix?: string; // Text to display after the number.
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  duration = 2000, // Default animation duration.
  increment = 50, // Default increment value.
  style = {},
  prefix = '$ ',
  suffix = '',
}) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const totalSteps = Math.ceil(duration / (increment * 2)); // Calculate total steps based on duration and increment.
    const valueIncrement = targetValue / totalSteps; // Amount to add at each step.

    const interval = setInterval(() => {
      setCurrentValue((prev) => {
        if (prev >= targetValue) {
          clearInterval(interval);
          return targetValue;
        }
        return Math.min(prev + valueIncrement, targetValue);
      });
    }, increment);

    return () => clearInterval(interval);
  }, [targetValue, duration, increment]);

  const formatCurrency = (value: number) =>
    `${prefix}${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${suffix}`;

  return <Text style={[styles.defaultText, style]}>{formatCurrency(currentValue)}</Text>;
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default AnimatedCounter;
