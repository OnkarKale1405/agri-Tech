import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {
  Sprout,
  Sun,
  TrendingUp,
  BookOpen,
  ShieldCheck
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState('english');

  const languages = {
    english: {
      slides: [
        {
          title: 'Welcome to SmartKrishi',
          subtitle: 'Your Farming Revolution',
          description: 'Transforming agricultural insights with cutting-edge technology',
          icon: Sprout,
          illustration: (
            <Svg width={width * 0.8} height={height * 0.3} viewBox="0 0 400 300">
              <Path d="M200 50 C250 100, 300 150, 200 250 C100 150, 150 100, 200 50Z" fill="#4CAF50" opacity="0.6" />
              <Circle cx="200" cy="150" r="80" fill="#81C784" opacity="0.4" />
              <Path d="M180 100 L220 100 L200 50Z" fill="#1B5E20" />
            </Svg>
          )
        },
        {
          title: 'Weather Intelligence',
          subtitle: 'Predictive Crop Insights',
          description: 'Real-time weather forecasts and personalized crop recommendations',
          icon: Sun,
          illustration: (
            <Svg width={width * 0.8} height={height * 0.3} viewBox="0 0 400 300">
              <Circle cx="200" cy="150" r="100" fill="#FFC107" opacity="0.3" />
              <Path d="M200 50 L220 100 L270 110 L230 150 L250 200 L200 170 L150 200 L170 150 L130 110 L180 100Z" fill="#FF9800" />
              <Path d="M180 230 Q200 250, 220 230" stroke="#FF5722" strokeWidth="4" fill="none" />
            </Svg>
          )
        },
        {
          title: 'Market Insights',
          subtitle: 'Live Agricultural Economics',
          description: 'Comprehensive market trends and pricing intelligence',
          icon: TrendingUp,
          illustration: (
            <Svg width={width * 0.8} height={height * 0.3} viewBox="0 0 400 300">
              <Path d="M50 250 L150 150 L250 200 L350 100" fill="none" stroke="#2196F3" strokeWidth="6" />
              <Circle cx="50" cy="250" r="20" fill="#03A9F4" />
              <Circle cx="150" cy="150" r="20" fill="#00BCD4" />
              <Circle cx="250" cy="200" r="20" fill="#009688" />
              <Circle cx="350" cy="100" r="20" fill="#4CAF50" />
            </Svg>
          )
        },
        {
          title: 'Learning Hub',
          subtitle: 'Knowledge Empowerment',
          description: 'Expert-led courses and innovative farming techniques',
          icon: BookOpen,
          illustration: (
            <Svg width={width * 0.8} height={height * 0.3} viewBox="0 0 400 300">
              <Rect x="100" y="80" width="200" height="140" fill="#9C27B0" opacity="0.2" />
              <Path d="M100 80 L200 150 L300 80" fill="none" stroke="#673AB7" strokeWidth="6" />
              <Rect x="120" y="100" width="160" height="100" fill="#E1BEE7" opacity="0.5" />
            </Svg>
          )
        },
        {
          title: 'Crop Health',
          subtitle: 'Advanced Disease Detection',
          description: 'AI-powered plant health monitoring and treatment recommendations',
          icon: ShieldCheck,
          illustration: (
            <Svg width={width * 0.8} height={height * 0.3} viewBox="0 0 400 300">
              <Path d="M200 50 L350 100 L350 200 L200 250 L50 200 L50 100Z" fill="#8BC34A" opacity="0.3" />
              <Path d="M200 100 L250 150 L200 200 L150 150Z" fill="#4CAF50" />
              <Circle cx="200" cy="150" r="50" fill="#2E7D32" opacity="0.2" />
            </Svg>
          )
        }
      ],
      buttons: {
        next: 'Next',
        skip: 'Skip',
        start: 'Get Started'
      }
    },
    hindi: {
      slides: [
        {
          title: 'स्मार्ट कृषि में आपका स्वागत',
          subtitle: 'आपका कृषि क्रांति',
          description: 'अत्याधुनिक तकनीक के साथ कृषि अंतर्दृष्टि को बदलना',
          icon: Sprout,
          illustration: null
        },
        {
          title: 'मौसम बुद्धिमत्ता',
          subtitle: 'पूर्वानुमानित फसल अंतर्दृष्टि',
          description: 'रीयल-टाइम मौसम पूर्वानुमान और व्यक्तिगत फसल सिफारिशें',
          icon: Sun,
          illustration: null
        },
        {
          title: 'बाजार अंतर्दृष्टि',
          subtitle: 'लाइव कृषि अर्थशास्त्र',
          description: 'व्यापक बाजार रुझान और मूल्य बुद्धिमत्ता',
          icon: TrendingUp,
          illustration: null
        },
        {
          title: 'सीखने का केंद्र',
          subtitle: 'ज्ञान सशक्तिकरण',
          description: 'विशेषज्ञ-नेतृत्व वाले पाठ्यक्रम और नवीन कृषि तकनीकें',
          icon: BookOpen,
          illustration: null
        },
        {
          title: 'फसल स्वास्थ्य',
          subtitle: 'उन्नत रोग पहचान',
          description: 'AI-संचालित पौधा स्वास्थ्य निगरानी और उपचार सिफारिशें',
          icon: ShieldCheck,
          illustration: null
        }
      ],
      buttons: {
        next: 'अगला',
        skip: 'छोड़ें',
        start: 'शुरू करें'
      }
    }
  };

  const currentLanguageData = languages[language];
  const currentSlideData = currentLanguageData.slides[currentSlide];

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev < currentLanguageData.slides.length - 1 ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev > 0 ? prev - 1 : prev);
  };

  return (
    <LinearGradient
      colors={['#B7E4C7', '#95D5B2']}
      style={styles.container}
    >
      {/* Language Toggle */}
      <TouchableOpacity
        style={styles.languageToggle}
        onPress={toggleLanguage}
      >
        <Text style={styles.languageToggleText}>
          {language === 'english' ? 'हिन्दी' : 'English'}
        </Text>
      </TouchableOpacity>

      {/* Slide Content */}
      <SafeAreaView style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            {currentSlideData.illustration}
          </View>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <currentSlideData.icon
              color="#2E7D32"
              size={80}
              strokeWidth={1.5}
            />
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              {currentSlideData.title}
            </Text>
            <Text style={styles.subtitleText}>
              {currentSlideData.subtitle}
            </Text>
            <Text style={styles.descriptionText}>
              {currentSlideData.description}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        {/* Progress Dots */}
        <View style={styles.progressDotsContainer}>
          {currentLanguageData.slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentSlide
                  ? styles.activeDot
                  : styles.inactiveDot
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonsContainer}>
          {currentSlide > 0 && (
            <TouchableOpacity
              onPress={prevSlide}
              style={styles.backButton}
            >
              <Sprout color="#2E7D32" size={24} style={styles.backIcon} />
            </TouchableOpacity>
          )}

          {currentSlide < currentLanguageData.slides.length - 1 ? (
            <TouchableOpacity
              onPress={nextSlide}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>
                {currentLanguageData.buttons.next}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.startButton}
            >
              <Text style={styles.startButtonText}>
                {currentLanguageData.buttons.start}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 10,
  },
  languageToggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  illustrationContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    maxWidth: 400,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
  },
  navigationContainer: {
    paddingBottom: 30,
  },
  progressDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressDot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 30,
    backgroundColor: '#2E7D32',
  },
  inactiveDot: {
    width: 10,
    backgroundColor: '#81C784',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  nextButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default OnboardingScreen;