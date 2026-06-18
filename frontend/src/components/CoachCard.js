import React from 'react';
import { StyleSheet, Text, View, ImageBackground, useWindowDimensions } from 'react-native';
import colors from '../constants/colors';

export default function CoachCard({ name, role, quote, author, imageName }) {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.45; // Approximately 45% of screen width to show partial cards

  // Map imageName to assets
  const getImageSource = () => {
    switch (imageName) {
      case 'Rectangle 36.png':
        return require('../../assets/Rectangle 36.png');
      case 'Rectangle 37.png':
        return require('../../assets/Rectangle 37.png');
      case 'Rectangle 37 (2).png':
        return require('../../assets/Rectangle 37 (2).png');
      default:
        return require('../../assets/Rectangle 36.png');
    }
  };

  return (
    <View style={[styles.cardContainer, { width: cardWidth }]}>
      <ImageBackground
        source={getImageSource()}
        style={styles.imageBg}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text style={styles.quoteText}>{quote}</Text>
          <Text style={styles.authorText}>- {author}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 220,
    borderRadius: 24, // Slightly more rounded to match the mockup
    marginRight: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF', // Ensures any transparent margins display as pure white instead of grey
  },
  imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
  imageStyle: {
    borderRadius: 24,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  quoteText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500', // Medium weight matching the mockup
    lineHeight: 16,
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  authorText: {
    color: 'rgba(255, 255, 255, 0.85)', // Clean semi-transparent white
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
});


