import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Alert,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import colors from '../constants/colors';
import QuickActionCard from '../components/QuickActionCard';
import CoachCard from '../components/CoachCard';
import ResourceCard from '../components/ResourceCard';
import BottomTabs from '../components/BottomTabs';
import { getDashboard, setAuthToken } from '../services/api';

// Custom iOS style Status Bar sub-components
// Status Bar components using image assets
const SignalIcon = () => (
  <Image
    source={require('../../assets/Mobile Signal.png')}
    style={styles.statusBarIconImage}
    resizeMode="contain"
  />
);

const WifiIcon = () => (
  <Image
    source={require('../../assets/Wifi.png')}
    style={styles.statusBarIconImage}
    resizeMode="contain"
  />
);

const BatteryIcon = () => (
  <Image
    source={require('../../assets/Battery.png')}
    style={styles.statusBarIconImage}
    resizeMode="contain"
  />
);

const LocationPin = () => (
  <View style={styles.pinContainer}>
    <View style={styles.pinCircle}>
      <View style={styles.pinInnerCircle} />
    </View>
    <View style={styles.pinTriangle} />
  </View>
);

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);



  // Seed default fallback data in case backend is offline
  const fallbackData = {
    user: {
      name: 'Jacob Smith',
      location: 'Florida, US'
    },
    reflection: {
      label: 'DAILY REFLECTION',
      quote: '"You don\'t have to control your thoughts. You just have to stop letting them control you."',
      readTime: '5 min read'
    },
    quickActions: [
      {
        id: '1',
        title: "Athlete's Edge",
        description: 'Performance pressures &\nprofessional transitions',
        iconName: 'Group 34712.png'
      },
      {
        id: '2',
        title: 'Mental Wellness',
        description: 'Anxiety, situational stress &\ndaily regulation',
        iconName: 'Group 34712 (1).png'
      },
      {
        id: '3',
        title: 'Financial Peace',
        description: 'Asset security management\n& wealth anxieties',
        iconName: 'Group 34712 (2).png'
      },
      {
        id: '4',
        title: 'Family & Peers',
        description: 'Relational support\necosystems & team dynamics',
        iconName: 'Group 34712 (3).png'
      }
    ],
    coaches: [
      {
        id: '1',
        name: 'Michael Jennings',
        role: 'Pro Mind Strategist',
        quote: '“Mental strength is the\nreal game.”',
        author: 'Rashad Evans',
        imageName: 'Rectangle 36.png'
      },
      {
        id: '2',
        name: 'Rachel Gray',
        role: 'Mindset Coach',
        quote: '“Protect your inner\nfocus.”',
        author: 'Jacqueline Jackson',
        imageName: 'Rectangle 37.png'
      },
      {
        id: '3',
        name: 'Marcus Cole',
        role: 'Performance Advisor',
        quote: '“Resilience wins\nmatches.”',
        author: 'Jason Jackson',
        imageName: 'Rectangle 37 (2).png'
      }
    ],
    resources: [
      {
        id: '1',
        title: '5-Minute Breathwork',
        type: 'Audio Module',
        iconName: 'headphone.png'
      },
      {
        id: '2',
        title: 'Managing Overwhelms',
        type: 'Deep Analysis',
        iconName: 'document-text.png'
      }
    ]
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboard();
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      console.log('Backend connection failed, using fallback mock data:', err.message);
      setDashboardData(fallbackData);
      setLoading(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const { user, reflection, quickActions, coaches, resources } = dashboardData;

  // Capitalize name helper
  const formatName = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <View style={styles.outerContainer}>
      <StatusBar style="light" translucent={true} />
      
      {/* Scrollable Main Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner Header Section */}
        <LinearGradient
          colors={['#887232', '#5B481A']}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={styles.heroSection}
        >
          {/* Fake Status Bar */}
          <View style={styles.statusBarRow}>
            <Text style={styles.statusBarTime}>09:41</Text>
            <View style={styles.statusBarIcons}>
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </View>
          </View>

          {/* User Info & Notification Bell Row */}
          <View style={styles.headerRow}>
            <View style={styles.userInfoCol}>
              <Image
                source={require('../../assets/Avatar.png')}
                style={styles.avatarImage}
              />
              <View style={styles.userInfoText}>
                <Text style={styles.userName}>{formatName(user.name)}</Text>
                <View style={styles.locationRow}>
                  <LocationPin />
                  <Text style={styles.userLocation}>{user.location}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => Alert.alert('Notifications', 'No new notifications.')}
              activeOpacity={0.8}
            >
              <Image
                source={require('../../assets/Notification.png')}
                style={styles.notificationIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Hero Welcome Text and Brain Illustration Row */}
          <View style={styles.heroTextRow}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroGreeting}>Good morning.</Text>
              <Text style={styles.heroWelcome}>Welcome to ICU,</Text>
              <Text style={styles.heroQuestion}>How’s Your Mind{'\n'}Today?</Text>
            </View>
            <View style={styles.heroIllustrationContainer}>
              <Image
                source={require('../../assets/Group 34710.png')}
                style={styles.heroIllustrationImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </LinearGradient>

        {/* White Content Panel */}
        <View style={styles.contentPanel}>
          {/* Reflection Card (overlaps hero) */}
          <View style={styles.reflectionCardContainer}>
            <LinearGradient
              colors={['#FFF9E8', '#FCEEC6']}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
              style={styles.reflectionCard}
            >
              <View style={styles.reflectionLabelContainer}>
                <Text style={styles.reflectionLabel}>{reflection.label}</Text>
              </View>
              <Text style={styles.reflectionQuote}>{reflection.quote}</Text>
              <View style={styles.reflectionFooter}>
                <Text style={styles.reflectionReadTime}>{reflection.readTime}</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.exploreBtn}>
                  <Text style={styles.exploreText}>Explore →</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Action Grid */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>QUICK ACTION</Text>
            <View style={styles.gridContainer}>
              {quickActions.map((item) => (
                <QuickActionCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  iconName={item.iconName}
                />
              ))}
            </View>
          </View>

          {/* Championing Your Mind */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>CHAMPIONING YOUR MIND</Text>
              <View style={styles.arrowsRow}>
                <TouchableOpacity style={styles.arrowCircle} activeOpacity={0.7}>
                  <Text style={styles.arrowText}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowCircle} activeOpacity={0.7}>
                  <Text style={styles.arrowText}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollPadding}
            >
              {coaches.map((coach) => (
                <CoachCard
                  key={coach.id}
                  name={coach.name}
                  role={coach.role}
                  quote={coach.quote}
                  author={coach.author}
                  imageName={coach.imageName}
                />
              ))}
            </ScrollView>
          </View>

          {/* Daily Digital Resources */}
          <View style={[styles.sectionContainer, styles.lastSectionMargin]}>
            <Text style={styles.sectionTitle}>DAILY DIGITAL RESOURCES</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollPadding}
            >
              {resources.map((res) => (
                <ResourceCard
                  key={res.id}
                  title={res.title}
                  type={res.type}
                  iconName={res.iconName}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Navigation Tab Bar */}
      <BottomTabs
        activeTab="Home"
        onTabPress={(tab) => {
          if (tab === 'Profile') {
            Alert.alert('Sign Out', 'Would you like to log out?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Log Out',
                onPress: () => {
                  setAuthToken(null);
                  navigation.navigate('Login');
                }
              }
            ]);
          } else if (tab !== 'Home') {
            Alert.alert(tab, `${tab} section is under development.`);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF7EE',
  },
  container: {
    flex: 1,
    backgroundColor: '#887232', // Merges with top pull-down bounce background
  },
  scrollContent: {
    paddingBottom: 115, // Room for floating bottom tabs (height 72 + bottom 20 + cushion)
    backgroundColor: '#FFFFFF', // Covers rest of the scroll view below header
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 44 : 36,
    paddingBottom: 55, // Extra padding to overlap the card nicely
  },
  statusBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 4 : 2,
    paddingBottom: 12,
    width: '100%',
  },
  statusBarTime: {
    fontSize: 14,
    color: '#FFFFFF',
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
    tintColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  userInfoCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  userInfoText: {
    marginLeft: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  pinContainer: {
    width: 10,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  pinCircle: {
    width: 7.5,
    height: 7.5,
    borderRadius: 3.75,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinInnerCircle: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#7B6428',
  },
  pinTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopWidth: 3.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    marginTop: -1.5,
  },
  userLocation: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 40,
    height: 40,
  },
  heroTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 110,
  },
  heroTextContainer: {
    flex: 1.4,
  },
  heroGreeting: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontFamily: 'Inter-Light',
  },
  heroWelcome: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 24,
    marginTop: 2,
    fontFamily: 'Inter-Light',
  },
  heroQuestion: {
    color: '#FFFFFF',
    fontSize: 28,
    marginTop: 3,
    lineHeight: 33,
    fontFamily: 'Inter-Bold',
  },
  heroIllustrationContainer: {
    width: 95,
    height: 95,
    overflow: 'hidden', // Crops out bottom 'INTERNAL COUNSELING UNIT' text to match 1st image mockup
    alignSelf: 'center',
  },
  heroIllustrationImage: {
    width: 95,
    height: 135,
    marginTop: -3,
  },
  contentPanel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 24,
    flex: 1,
  },
  reflectionCardContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  reflectionCard: {
    backgroundColor: '#FDF1CE', // Rich warm cream/yellow bg
    borderRadius: 24, // More rounded corners
    padding: 20, // More generous padding
    borderWidth: 1.5,
    borderColor: '#EBDDB5', // Soft warm gold border
    shadowColor: '#8A7432', // Rich warm golden shadow
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  reflectionLabelContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5E8C4', // Darker warm pill badge bg
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  reflectionLabel: {
    color: '#8A7432', // dark gold text
    fontSize: 10,
    letterSpacing: 0.5,
    fontFamily: 'Inter-Bold',
  },
  reflectionQuote: {
    color: '#3A311A', // Dark warm charcoal/brown quote text
    fontSize: 16, // Slightly larger font size
    lineHeight: 22, // Better line height for reading
    fontStyle: 'italic',
    marginBottom: 18,
    fontFamily: 'Inter-Medium',
  },
  reflectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reflectionReadTime: {
    color: '#8C7A5C',
    fontSize: 12,
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Regular',
  },
  exploreBtn: {
    paddingVertical: 4,
  },
  exploreText: {
    color: '#3A311A', // matching dark warm text
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 14,
    letterSpacing: 1,
    fontFamily: 'Inter-Bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  arrowsRow: {
    flexDirection: 'row',
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    backgroundColor: colors.white,
  },
  arrowText: {
    fontSize: 16,
    lineHeight: 16,
    color: colors.textMuted,
    marginTop: -2,
  },
  horizontalScrollPadding: {
    paddingRight: 10,
  },
  lastSectionMargin: {
    marginBottom: 0, // Removed extra spacing before tab bar
  },
});
