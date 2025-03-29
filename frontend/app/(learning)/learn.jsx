import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av";
import { useFarming } from "@/hooks/FarmingContext";
import { useLocalSearchParams } from "expo-router";

export default function CourseLearningPage() {
    const [selectedTimestamp, setSelectedTimestamp] = useState(0);
    const [courseData, setCourseData] = useState(null);
    const videoRef = useRef(null);
    const { course_id, module_id } = useLocalSearchParams();
    const { getModuleById } = useFarming();
    // const data = getModuleById(parseInt(course_id), parseInt(module_id));
    // console.log("courese outside eddfe: ", data);
    // setCourseData(data);

    useEffect(() => {
        if (!course_id || !module_id) return;

        // console.log("Fetching Data...");
        const data = getModuleById(parseInt(course_id), parseInt(module_id));

        if (!data) {
            console.warn("Module not found or data still loading...");
            return;
        }

        // console.log("Fetched Data:", data);
        setCourseData(data);
    }, [course_id, module_id]); // Ensure useEffect runs when IDs change


    const handleTimestampPress = (timestamp) => {
        const [minutes, seconds] = timestamp.split(":").map(Number);
        const timeInSeconds = minutes * 60 + seconds;

        if (videoRef.current) {
            videoRef.current.setPositionAsync(timeInSeconds * 1000);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-amber-50">
            <ScrollView>
                {/* Video Player */}
                {
                    courseData && (
                        <View className="bg-[#16A34A] h-80 items-center justify-center">
                            <Video
                                ref={videoRef}
                                source={{ uri: courseData.video }}
                                style={{
                                    width: Dimensions.get("window").width,
                                    height: "100%",
                                    borderRadius: 12,
                                }}
                                resizeMode="cover"
                                useNativeControls
                                shouldPlay={true}
                            />
                        </View>
                    )
                }

                {/* Course Details */}
                <View>
                    {
                        courseData && (
                            <View className="bg-white p-4">
                                {/* <Text className="text-2xl font-bold text-gray-800">{courseData.video}</Text> */}
                                <Text className="text-2xl font-bold text-gray-800">{courseData.title}</Text>
                                <Text className="text-sm text-gray-600 mb-4 mt-2">{courseData.description}</Text>
                            </View>
                        )
                    }

                    {/* Timestamps and Learnings */}
                    <View className="mt-4 p-4">
                        {courseData && courseData.learnings.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                className="bg-white rounded-2xl p-4 mb-4 shadow"
                                onPress={() => handleTimestampPress(item.timestamp)}
                            >
                                <View className="flex-row items-center mb-2">
                                    <Text className="text-lg font-bold text-wrap mr-16 text-gray-800 flex-1">
                                        {item.title}
                                    </Text>
                                    <Text className="text-xs bg-green-100 px-2 py-1 rounded mr-2">
                                        {item.timestamp}
                                    </Text>
                                </View>
                                <Text className="text-sm text-gray-600">{item.learning}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}
