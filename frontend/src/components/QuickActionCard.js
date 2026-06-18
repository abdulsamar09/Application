import React from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import colors from '../constants/colors';

export default function QuickActionCard({ id, title, description, iconName }) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2; // Responsive 2 column width

  // Determine backgrounds and borders based on card ID
  let cardBg = '#FFFBEB';
  let borderColor = '#EDDBB7';

  if (id === '2') {
    cardBg = '#F3FCFB';
    borderColor = '#D9E4E3';
  } else if (id === '3') {
    cardBg = '#F1FCF8';
    borderColor = '#D2EDE3';
  } else if (id === '4') {
    cardBg = '#F2F5FE';
    borderColor = '#DEE2ED';
  }

  // Map iconName to assets
  const getIconSource = () => {
    switch (iconName) {
      case 'Group 34712.png':
        return require('../../assets/Group 34712.png');
      case 'Group 34712 (1).png':
        return require('../../assets/Group 34712 (1).png');
      case 'Group 34712 (2).png':
        return require('../../assets/Group 34712 (2).png');
      case 'Group 34712 (3).png':
        return require('../../assets/Group 34712 (3).png');
      default:
        return require('../../assets/Group 34712.png');
    }
  };

  return (
    <View style={[styles.card, { width: cardWidth, backgroundColor: cardBg, borderColor: borderColor }]}>
      <Image source={getIconSource()} style={styles.icon} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20, // More rounded corners to match mockup
    padding: 16,
    marginBottom: 16,
    minHeight: 160,
    borderWidth: 1.5, // Custom border width (stroke) to match mockup
  },
  icon: {
    width: 44, // Larger icon size
    height: 44,
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 6,
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
  },
});

