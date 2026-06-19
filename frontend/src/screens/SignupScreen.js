import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import colors from '../constants/colors';
import AuthInput from '../components/AuthInput';
import PrimaryButton from '../components/PrimaryButton';
import SocialButton from '../components/SocialButton';
import { signup, setAuthToken } from '../services/api';

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async () => {
    if (!firstName || !email || !phone || !password || !confirmPassword) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const data = await signup(firstName, email, phone, password, confirmPassword);
      setAuthToken(data.token);
      setLoading(false);
      navigation.navigate('Home');
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || 'Failed to create account. Please try again.';
      setErrorMsg(msg);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Fake Mobile Status Bar */}
      <View style={styles.statusBarRow}>
        <Text style={styles.statusBarTime}>09:41</Text>
        <View style={styles.statusBarIcons}>
          <Image
            source={require('../../assets/Mobile Signal.png')}
            style={styles.statusBarIconImage}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/Wifi.png')}
            style={styles.statusBarIconImage}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/Battery.png')}
            style={styles.statusBarIconImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/loginsingupscrenlogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Text */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Create Your <Text style={styles.goldText}>Account</Text>
          </Text>
        </View>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        {/* Form Fields */}
        <AuthInput
          label="First Name"
          placeholder="Enter first name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <AuthInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <AuthInput
          label="Phone"
          placeholder="Enter last name" // SPECIFIED IN PROMPT EXACTLY
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <AuthInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <AuthInput
          label="Confirm Password"
          placeholder="Re-Enter your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        {/* Create Account Button */}
        <PrimaryButton title="Create Account" onPress={handleSignup} loading={loading} />

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or Login With</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Buttons */}
        <SocialButton
          provider="google"
          title="Sign up with Google"
          onPress={() => navigation.navigate('Home')}
        />
        <SocialButton
          provider="tiktok"
          title="Sign up with Tiktok"
          onPress={() => navigation.navigate('Home')}
        />

        {/* Bottom Redirect */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgAuth,
  },
  statusBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 12,
    paddingBottom: 6,
  },
  statusBarTime: {
    fontSize: 14,
    color: colors.textDark,
    fontFamily: 'Inter-SemiBold',
  },
  statusBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBarIconImage: {
    width: 17,
    height: 12,
    marginLeft: 6,
    tintColor: colors.textDark,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    color: colors.textDark,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: 'Inter-Bold',
  },
  goldText: {
    color: colors.goldText,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderColor,
  },
  dividerText: {
    fontSize: 12,
    color: colors.textMuted,
    paddingHorizontal: 12,
    fontFamily: 'Inter-Regular',
  },
  footerRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'Inter-Regular',
  },
  footerLink: {
    fontSize: 12,
    color: colors.goldText,
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Bold',
  },
});
