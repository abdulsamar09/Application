import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';

export default function SocialButton({ provider, title, onPress }) {
  const isGoogle = provider.toLowerCase() === 'google';

  const renderIcon = () => {
    if (isGoogle) {
      return (
        <Image
          source={require('../../assets/icon_google.png')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Image
          source={require('../../assets/tik-tok 2.png')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
      );
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        {renderIcon()}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.textDark,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 10,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
});
