import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, Home as HomeScreen, Search, Cloud } from 'lucide-react-native';
import { router, Link } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { useClerk } from "@clerk/clerk-react";
import { ExpandableCourseItem } from '@/components/learning/ExpandableCourseItem';
import { useFarming } from '@/hooks/FarmingContext';

export default function LearningHome() {
    const { user, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const { farmingCourses } = useFarming();

    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const completedDays = ["Mon", "Tue", "Wed"];

    // Get unique categories
    const uniqueCategories = [...new Set(farmingCourses.map(course => course.category))];

    // Weekly statistics data
    const weeklyStats = [15, 25, 30, 10, 5, 0, 0];

    const maxStat = Math.max(...weeklyStats);

    const handleLogout = async () => {
        await signOut();
        router.replace("/");
    };

    return (
        <SafeAreaView className="relative flex-1 justify-center items-center">
            <ScrollView className="px-4 py-4 bg-white" showsVerticalScrollIndicator={false}>
                {/* Header section */}
                <View className="flex-row justify-between items-center mb-2">
                    <View>
                        <Text className="text-xl text-gray-600">Hello, {user?.publicMetadata?.username}</Text>
                        <Text className="text-4xl font-bold text-green-800 my-1">Welcome back</Text>
                    </View>
                    <Pressable onPress={handleLogout} className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
                        <Text className="text-lg">👨‍🌾</Text>
                    </Pressable>
                </View>

                {/* Search Bar */}
                {/* <View className="flex flex-row bg-white rounded-3xl px-4 py-2.5 justify-start items-center my-2 shadow-md border border-green-100">
                    <Search size={20} color="#16a34a" />
                    <TextInput
                        placeholder="Search for farming techniques..."
                        className="flex-1 ml-2 text-base text-gray-700"
                    />
                </View> */}

                {/* Continue learning section */}
                <View className="flex-row justify-between items-center mt-8 mb-4">
                    <Text className="text-2xl ml-2 font-semibold text-green-900">Categories</Text>
                </View>

                {/* Scrollable categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 8
                    }}
                    className="mb-4"
                >
                    {uniqueCategories.map((category, index) => {
                        const course = farmingCourses.find(c => c.category === category);
                        return (
                            <TouchableOpacity
                                key={index}
                                className={`w-60 h-60 rounded-2xl ${course.color} py-4 px-3 flex flex-col justify-between items-start`}
                                onPress={() => {
                                    router.replace({
                                        pathname: "/(learning)/details",
                                        params: {
                                            learn_id: course.id,
                                        }
                                    });
                                }}
                            >
                                <View className="w-12 h-12 rounded-full bg-white/30 items-center justify-center mb-2">
                                    <Text className="text-xl">{course.icon}</Text>
                                </View>

                                <View className='flex flex-col justify-evenly px-1 mb-4 w-full'>
                                    <View className='mb-2'>
                                        <Text className="text-2xl font-bold text-white mb-1">
                                            {category}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Course List */}
                <Text className="text-xl font-bold text-green-900 my-4">
                    Your Farming Courses
                </Text>

                {farmingCourses.map(course => (
                    <ExpandableCourseItem key={course.id} course={course} />
                ))}

                {/* <Pressable asChild>
                    <Link href={"/(learning)/schemes"}>
                        <Text>View Scheme</Text>
                    </Link>
                </Pressable> */}

                {/* Weekly Statistics */}
                <View className="mb-6 mt-4">
                    <Text className="text-lg font-semibold text-green-900 mb-3">
                        Weekly Learning Stats
                    </Text>

                    <View className="bg-white rounded-2xl p-4 shadow-md border border-green-50">
                        <View className="flex-row justify-between items-end">
                            {weeklyStats.map((value, index) => (
                                <View key={index} className="items-center flex-1 mx-1">
                                    {/* Background representing 100% height */}
                                    <View className="w-full h-44 bg-green-100 rounded-full relative">
                                        {/* Actual progress bar */}
                                        <View
                                            className={`absolute bottom-0 w-full rounded-full ${value === 0 ? "bg-green-200" : "bg-emerald-600"
                                                }`}
                                            style={{
                                                height: value === 0 ? 4 : (value / maxStat) * 96, // Adjusted for padding
                                            }}
                                        />
                                    </View>
                                    <Text className="text-xs text-gray-600 mt-1">{weekdays[index]}</Text>
                                </View>
                            ))}
                        </View>

                        <Text className="text-center text-xs text-gray-600 mt-2">
                            {weeklyStats.reduce((a, b) => a + b, 0)} minutes this week
                        </Text>
                    </View>
                </View>

                <View className="flex-row invisible justify-evenly mb-2 items-center rounded-full px-2 py-2">
                    <TouchableOpacity className="items-center justify-center w-16 h-16 rounded-full bg-green-100">
                        <HomeScreen size={25} color="#16a34a" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
