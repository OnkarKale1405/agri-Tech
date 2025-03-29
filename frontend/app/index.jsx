import React, { useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Landing() {
    useWarmUpBrowser();


    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return <Redirect href={'/(learning)/learn-main'} />
    }

    return (
        <View className="flex-1 bg-white">
            {/* Topographic Background */}
            <View className=" absolute inset-0">
                <Image
                    source={{ uri: "https://plus.unsplash.com/premium_vector-1682298655646-498db28a123b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhcm18ZW58MHx8MHx8fDA%3D" }}
                    className="w-full h-full"
                    resizeMode="contain"
                />
            </View>

            {/* Content Container */}
            <View className="flex-1 px-6 pt-20 justify-between">
                {/* Title and Subtitle */}
                <View>
                    <Text className="text-4xl font-bold text-gray-800 mb-4">BOOST</Text>
                    <Text className="text-2xl font-semibold text-gray-700">
                        AGRICULTURE
                    </Text>
                    <Text className="text-lg text-gray-600 mt-2">
                        PRODUCTION THROUGH MECHANIZATION
                    </Text>
                </View>

                {/* Call to Action Button */}
                <View className="mb-12">
                    <Pressable
                        className="bg-green-500 rounded-full py-1 px-1 flex-row items-center justify-between"
                        asChild
                    >
                        <Text className="text-white text-xl ml-12 font-bold">GET STARTED</Text>
                        <View className="bg-green-800 rounded-full items-center justify-center">
                            <Link href="/(auth)/login" className='p-4'>
                                <ArrowRight size={32} color="#fff" />
                            </Link>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}