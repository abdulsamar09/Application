import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';

export default function BottomTabs({ activeTab = 'Home', onTabPress }) {
  const tabs = [
    { name: 'Home', icon: require('../../assets/home 1.png'), isImage: true },
    { name: 'Assignment', icon: require('../../assets/bi_ui-checks-grid.png'), isImage: true },
    { name: 'Directory', icon: require('../../assets/list 1.png'), isImage: true },
    { name: 'Profile', icon: require('../../assets/add 1.png'), isImage: true },
  ];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => {
        const isActive = tab.name === activeTab;
        const tintColor = isActive ? colors.primary : colors.textMuted;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => onTabPress && onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Image
              source={tab.icon}
              style={[styles.tabIcon, { tintColor: tintColor }]}
              resizeMode="contain"
            />
            <Text style={[styles.tabLabel, { color: tintColor, fontFamily: isActive ? 'Inter-SemiBold' : 'Inter-Regular' }]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: colors.white,
    borderRadius: 36, // Fully rounded capsule shape
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20, // Floating above the bottom of the screen
    left: 20, // Margins on left
    right: 20, // Margins on right
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    width: 24, // Matches the mockup size
    height: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
});
