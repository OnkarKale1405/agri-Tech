import { useFonts } from 'expo-font';
import { Stack, Link, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import "../global.css";
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { View, Pressable, Text } from 'react-native';
import { BookOpen, Store, Wheat, Activity, CloudMoon, Leaf, Rss, Cloud } from 'lucide-react-native';
import { SignedIn } from '@clerk/clerk-expo';
import { FarmingProvider } from '@/hooks/FarmingContext';

SplashScreen.preventAutoHideAsync();

const allowedPaths = ["/weather", "/crop-advisory", "/market-insights", "/smart-farming", "/help", "/plant-disease", "/learn-main"]

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const pathname = usePathname();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    );
  }

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <FarmingProvider>
          <LayoutContent pathname={pathname} />
        </FarmingProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function LayoutContent({ pathname }) {
  const { isSignedIn } = useAuth();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "hello",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            headerTitle: "hello",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chatbot"
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="satellite"
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="help"
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: "#16a34a",
            headerShown: true,
            headerShadowVisible: false
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerTitle: "auth",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(learning)"
          options={{
            headerTitle: "learn",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="crop-advisory"
          options={{
            headerTitle: "",
            headerShown: true,
            headerStyle: { backgroundColor: "#dcfce7" },
            headerShadowVisible: false,
            headerTintColor: "#059669"
          }}
        />
        <Stack.Screen
          name="weather"
          options={{
            headerTitle: "weather",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="market-insights"
          options={{
            headerTitle: "market insights",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="smart-farming"
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "#F8FAFC" },
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: '#16a34a'
          }}
        />
        <Stack.Screen
          name="plant-disease"
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "#059669" },
            headerShown: true,
            headerShadowVisible: false,
            headerTintColor: 'white'
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* Bottom Tab and Chatbot Button */}
      {isSignedIn && allowedPaths.includes(pathname) && (
        <>
          <BottomNavigation pathname={pathname} />
          <View className="absolute top-2 right-2">
            <Pressable
              className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              asChild
            >
              <Link href={'/chatbot'}>
                <Leaf color="white" size={28} />
              </Link>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
}

const BottomNavigation = ({ pathname }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Navigation items configuration
  const navItems = [
    {
      href: '/weather',
      icon: CloudMoon,
      label: 'Weather'
    },
    {
      href: '/crop-advisory',
      icon: Wheat,
      label: 'Crop Advisory'
    },
    {
      href: '/help',
      icon: Rss,
      label: 'Help'
    },
    {
      href: '/learn-main',
      icon: BookOpen,
      label: 'Learning'
    },
    {
      href: '/smart-farming',
      icon: Leaf,
      label: 'Smart Farming'
    },
    {
      href: '/plant-disease',
      icon: Activity,
      label: 'Plant Disease'
    },
    {
      href: '/market-insights',
      icon: Store,
      label: 'Market Insights'
    },
    {
      href: '/satellite',
      icon: Cloud,
      label: 'Satellite',
    }
  ];

  return (
    <View className="relative">
      {/* Floating Tooltip */}
      {hoveredItem && (
        <View
          className="absolute z-50 w-full items-center"
          style={{ bottom: 'calc(100% + 10px)' }}
        >
          <View className="bg-black/80 px-3 py-2 rounded-md">
            <Text className="text-white text-xs">
              {navItems.find(item => item.href === hoveredItem)?.label}
            </Text>
          </View>
        </View>
      )}

      {/* Bottom Navigation */}
      <View className="flex-row absolute bottom-0 mb-2 rounded-full justify-evenly items-center bg-green-600 px-2 py-2 self-center">
        {navItems.map((item) => (
          <Pressable
            key={item.href}
            className={`items-center justify-center w-14 h-14 rounded-full ${pathname === item.href ? 'bg-gray-100' : ''}`}
            onPressIn={() => setHoveredItem(item.href)}
            onPressOut={() => setHoveredItem(null)}
          >
            <Link href={item.href}>
              <item.icon
                size={22}
                color={pathname === item.href ? '#16a34a' : 'white'}
              />
            </Link>
          </Pressable>
        ))}
      </View>
    </View>
  );
};