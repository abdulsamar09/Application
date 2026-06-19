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
import { login, setAuthToken } from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const data = await login(email, password);
      setAuthToken(data.token);
      setLoading(false);
      navigation.navigate('Home');
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || 'Failed to log in. Please try again.';
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
            Welcome To <Text style={styles.goldText}>Internal</Text>
          </Text>
          <Text style={styles.heading}>Counseling Unit</Text>
          <Text style={styles.subHeading}>Glad To See You Again!</Text>
        </View>

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        {/* Form Fields */}
        <AuthInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <AuthInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        {/* Remember Me & Forgot Password Row */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Alert.alert('Reset Password', 'Password reset flow is not configured.')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Log In Button */}
        <PrimaryButton title="Log In" onPress={handleLogin} loading={loading} />

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
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign Up Now</Text>
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
  subHeading: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.inputBg,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: 'Inter-Regular',
  },
  forgotPassword: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: 'Inter-SemiBold',
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
