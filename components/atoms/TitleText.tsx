import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TitleTextProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const TitleText: React.FC<TitleTextProps> = ({
  children,
  size = 'medium',
  color = '#333',
  align = 'left',
}) => {
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 18;
      case 'medium':
        return 24;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };

  return (
    <Text
      style={[
        styles.title,
        { fontSize: getFontSize(), color, textAlign: align },
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default TitleText;