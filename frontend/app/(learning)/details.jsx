import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Modal, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, FileText, Star, Users, Check, X } from 'lucide-react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useFarming } from '@/hooks/FarmingContext';
import { Image } from 'react-native';

export default function CourseDetails() {

    const [selectedModule, setSelectedModule] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const { learn_id } = useLocalSearchParams();
    const { getCourseById } = useFarming();
    const course = getCourseById(parseInt(learn_id));

    const openModule = (module) => {
        setSelectedModule(module);
        setIsVisible(true);
    };

    const slideAnim = useRef(new Animated.Value(Dimensions.get("window").height)).current;
    useEffect(() => {
        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: Dimensions.get("window").height,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: Dimensions.get("window").height * 0.3,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsVisible(false));
    };


    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} size={16} fill="#16a34a" color="#16a34a" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Star key={i} size={16} fill="#16a34a" color="#16a34a" />);
            } else {
                stars.push(<Star key={i} size={16} color="#D1D5DB" />);
            }
        }

        return (
            <View className="flex-row flex items-center justify-center">
                {stars}
                <Text className="ml-1 text-sm text-gray-600">{rating}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-green-100">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="bg-white shadow overflow-hidden">
                    <View className="h-56 bg-green-600 items-center justify-center">
                        <Image
                            source={{ uri: course.image }}
                            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                        />
                    </View>
                    <View className="p-4">
                        <Text className="text-2xl mb-1 font-bold text-green-900">{course.title}</Text>
                        <View className="flex-row space-x-4 items-center mt-2">
                            {renderStars(course.rating)}
                            <View className="ml-8 text-sm flex-row justify-between items-center text-green-700">
                                <Users size={14} color="#16a34a" className="inline" />
                                <Text className="ml-1 font-semibold text-sm">{course.students} students</Text>
                            </View>
                        </View>
                        <Text className="mt-3 text-base text-justify text-green-800">{course.description}</Text>
                        <View className="flex-row flex-wrap mt-4">
                            {/* <View className="flex-row items-center mr-4 mb-2">
                                <Clock size={16} color="#16a34a" />
                                <Text className="ml-1 text-sm text-green-700">{course.duration}</Text>
                            </View> */}
                            <View className="flex-row items-center bg-emerald-600 px-4 py-1 rounded-full mr-4 mb-2">
                                {/* <FileText size={16} color="#16a34a" /> */}
                                <Text className="ml-1 text-sm text-white">{course.difficulty}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-8 px-4">
                    {/* <Text className="text-2xl font-bold text-green-900 mb-6">Content</Text> */}

                    <View className="relative">
                        {course.modules.map((module, index) => (
                            <Pressable key={module.id} className="flex-row mb-6 relative"
                                onPress={() => openModule(module)}
                            >
                                {/* Timeline Line */}
                                {index !== course.modules.length - 1 && (
                                    <View
                                        className={`absolute left-3.5 top-2 h-[110%] bottom-0 w-1 ${module.completed ? 'bg-green-600' : 'bg-green-300'}`}
                                    />
                                )}

                                {/* Timeline Dot */}
                                <View className={`h-8 w-8 rounded-full ${index === 0 && course.modules[index].completed
                                    ? "bg-green-600"
                                    : course.modules[index]?.completed
                                        ? "bg-green-600"
                                        : course.modules[index - 1]?.completed
                                            ? "bg-green-600"
                                            : "bg-green-300"
                                    } items-center justify-center z-10`}>
                                    {module.completed ? (
                                        <Check size={16} color="#fff" />
                                    ) : (
                                        <Text className="text-white font-bold">{index + 1}</Text>
                                    )}
                                </View>


                                {/* Module Card */}
                                < View className="flex-1 bg-white rounded-2xl p-4 ml-4 shadow" >
                                    <View className='w-[95%]'>
                                        <Text className="text-lg font-bold text-green-900 my-2">{module.title}</Text>
                                        <Text className="text-sm text-justify text-green-800 mb-1">{module.description}</Text>
                                        <View className="flex-row w-[60%] mt-3 justify-between">
                                            <View className="flex-row items-center">
                                                <Clock size={14} color="#16a34a" />
                                                <Text className="ml-1 text-xs text-green-700">{module.duration}</Text>
                                            </View>
                                            <View className='h-full w-0.5 bg-green-500' />
                                            <View className="flex-row items-center">
                                                <FileText size={14} color="#16a34a" />
                                                <Text className="ml-1 text-xs text-green-700">{module.questions} Questions</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView >

            <Modal transparent={true} visible={isVisible} animationType="none">
                {/* Background Overlay - Static */}
                <Pressable style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "flex-end",
                }}
                >
                    {/* Modal Content - Slides Up */}
                    <Animated.View style={{
                        backgroundColor: "white",
                        padding: 20,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: Dimensions.get("window").height * 0.50,
                        transform: [{ translateY: slideAnim }],

                    }}
                        className="h-full flex flex-col justify-evenly items-center"
                    >
                        {/* Close Button (X) */}
                        <Pressable onPress={() => setIsVisible(false)}
                            style={{ position: "absolute", top: 10, right: 10, padding: 5 }}>
                            <X size={24} color="black" />
                        </Pressable>

                        {/* Modal Content */}
                        <Text className="text-2xl w-[80%] text-center font-bold my-4 text-green-900">{selectedModule?.title}</Text>

                        <View className='flex flex-col justify-between'>
                            <Text className="text-sm text-green-800 mb-4">{selectedModule?.description}</Text>

                            <View className="flex-row mt-3 flex justify-evenly text-green-600">
                                <View className="flex-row items-center">
                                    <Clock size={14} color="#16a34a" />
                                    <Text className="ml-1 text-xs text-green-700">{selectedModule?.duration}</Text>
                                </View>
                                <View className='h-full w-0.5 bg-green-500' />
                                <View className="flex-row items-center">
                                    <FileText size={14} color="#16a34a" />
                                    <Text className="ml-1 text-xs text-green-700">{selectedModule?.questions} Questions</Text>
                                </View>
                            </View>
                        </View>

                        {/* Close Button */}
                        <Pressable className="bg-green-600 p-3 rounded-lg w-full mt-4"
                            onPress={() => router.replace({
                                pathname: "/(learning)/learn",
                                params: {
                                    course_id: `${learn_id}`,
                                    module_id: `${selectedModule.id}`,
                                }
                            })}
                        >
                            <Text className="text-white text-center">Start now</Text>
                        </Pressable>
                    </Animated.View>
                </Pressable>
            </Modal>

        </SafeAreaView >
    );
}