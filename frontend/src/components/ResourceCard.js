import React from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import colors from '../constants/colors';

export default function ResourceCard({ title, type, iconName }) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 40) / 2; // Split screen width for 2 horizontal cards

  // Map iconName to assets
  const getIconSource = () => {
    switch (iconName) {
      case 'headphone.png':
        return require('../../assets/headphone.png');
      case 'document-text.png':
        return require('../../assets/document-text.png');
      default:
        return require('../../assets/headphone.png');
    }
  };

  return (
    <View style={[styles.cardContainer, { width: cardWidth - 2 }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.metaRow}>
          <Image source={getIconSource()} style={styles.metaIcon} resizeMode="contain" />
          <Text style={styles.metaText}>{type}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 85,
    backgroundColor: colors.white,
    // Explicit borders on each side to ensure perfect cross-platform rendering
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 6,
    borderTopColor: '#F5F5F5',
    borderRightColor: '#F5F5F5',
    borderBottomColor: '#F5F5F5',
    borderLeftColor: colors.primary,
    borderRadius: 18, // More rounded corners matching the mockup
    marginRight: 12,
    overflow: 'hidden',
    // Soft shadow for premium look
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 18, // Generous spacing from the green left border
    paddingRight: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    color: '#111111',
    fontFamily: 'Inter-Medium', // Cleaner, matching the mockup
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaIcon: {
    width: 13,
    height: 13,
    marginRight: 6,
    tintColor: colors.primary, // Keeps the icon green matching the design
  },
  metaText: {
    fontSize: 11,
    color: '#333333',
    fontFamily: 'Inter-Regular',
  },
});

