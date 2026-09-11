import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'micro';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'micro' ? styles.micro :undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily:"Poppins"
  },
  defaultSemiBold: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: 'bold',
    fontFamily:"Poppins"
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 32,
    fontFamily:"Poppins"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: "Poppins",
  },
  link: {
    lineHeight: 30,
    fontSize: 12,
    fontFamily: "Poppins",
    fontWeight:"300"
  },
  micro: {
    fontSize: 10,
    fontFamily: "Poppins",
    fontWeight: "600",
    marginBottom:5
  }
});
