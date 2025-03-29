import { ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, Pressable } from 'react-native';
import { router } from 'expo-router';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const ExpandableCourseItem = ({ course }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        // Animate the layout change
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <Pressable
            onPress={toggleExpand}
            className="bg-amber-400 rounded-2xl mb-3 border border-green-200 overflow-hidden"
        >
            {/* Main Course Header */}
            <View className="flex-row items-center bg-pink-400 p-4">
                <View className={`w-12 h-12 rounded-full ${course.color} items-center justify-center mr-4`}>
                    <Text className="text-xl">{course.icon}</Text>
                </View>

                <View className="flex-1">
                    <Text className="text-base font-semibold text-green-600">
                        {course.title}
                    </Text>
                    <Text className="text-sm text-gray-600">
                        {course.category}
                    </Text>
                </View>

                {isExpanded ? (
                    <ChevronUp size={24} color="#16a34a" />
                ) : (
                    <ChevronDown size={24} color="#16a34a" />
                )}
            </View>

            {/* Expanded Details */}
            {isExpanded && (
                <View className="p-4 bg-green-50">
                    {/* Description */}
                    <Text className="text-sm text-gray-700 mb-4 italic">
                        {course.description}
                    </Text>

                    {/* Ratings and Difficulty Container */}
                    <View className="flex-row justify-between items-center mb-3">
                        {/* Ratings */}
                        <View className="flex-row items-center">
                            <Text className="text-base text-yellow-600 mr-1">⭐⭐⭐⭐⭐</Text>
                            <Text className="text-base text-gray-800 ml-1">{course.rating}/5</Text>
                        </View>

                        {/* Difficulty Capsule */}
                        <View className={`px-3 py-1 rounded-full ${course.difficulty === 'Beginner' ? 'bg-green-200' :
                            course.difficulty === 'Intermediate' ? 'bg-yellow-200' :
                                'bg-red-200'
                            }`}>
                            <Text className={`text-xs font-semibold ${course.difficulty === 'Beginner' ? 'text-green-800' :
                                course.difficulty === 'Intermediate' ? 'text-yellow-800' :
                                    'text-red-800'
                                }`}>
                                {course.difficulty}
                            </Text>
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View className="mb-3">
                        <View className="flex-row justify-between mb-1">
                            <Text className="text-xs text-gray-600">Progress</Text>
                            <Text className="text-xs text-gray-600">{course.progress}%</Text>
                        </View>
                        <View className="h-2 bg-gray-200 rounded-full">
                            <View
                                className={`h-2 rounded-full ${course.color}`}
                                style={{ width: `${course.progress}%` }}
                            />
                        </View>
                    </View>

                    {/* Lessons */}
                    <View className="mb-3">
                        <Text className="text-xs text-gray-600">
                            Total Lessons: {course.lessons}
                        </Text>
                    </View>

                    {/* Start Course Button */}
                    <TouchableOpacity
                        className="bg-green-600 rounded-lg py-3 items-center"
                        onPress={() => router.push({
                            pathname: "/(learning)/details",
                            params: {
                                learn_id: `${course.id}`
                            }
                        })}
                    >
                        <Text className="text-white font-semibold text-base">Start Course</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Pressable>
    );
};