import React, { useState, useEffect } from "react";
import {
    ScrollView,
    View,
    Text,
    Animated,
    StyleSheet,
    Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import cropData from "../assets/data/production_state";
// import DonutChart from "../components/visualElements/DonutChart";
import { ChartBarBig, Database, TrendingUp, TrendingUpIcon } from "lucide-react-native";
import TrendPlot from "../components/visualElements/TrendPlot";
import TrendData from "../assets/data/constants";

const MarketInsights = () => {
    // Production section state
    const uniqueStates = [...new Set(cropData.map((item) => item.statename))];
    const [selectedState, setSelectedState] = useState(""); // initial empty
    const [heightAnim] = useState(new Animated.Value(0)); // initial height = 0

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: selectedState ? 600 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [selectedState]);

    // Trend Analysis Section state
    const [selectedCommodities, setSelectedCommodities] = useState([]);
    const [selectedCommodity, setSelectedCommodity] = useState("");

    const handleAddCommodity = () => {
        if (selectedCommodity && selectedCommodities.length < 4) {
            if (!selectedCommodities.includes(selectedCommodity)) {
                setSelectedCommodities([...selectedCommodities, selectedCommodity]);
                setSelectedCommodity("");
            } else {
                alert(`${selectedCommodity} is already selected.`);
            }
        } else {
            alert("You can only select up to 4 commodities.");
        }
    };

    const handleResetTrend = () => {
        setSelectedCommodities([]);
        setSelectedCommodity("");
    };

    return (
        <ScrollView className="bg-amber-50 px-1 py-4">
            <View className="items-center my-4">
                <View className="items-center">
                    <View className="flex flex-row items-center bg-emerald-100 px-2 py-1 rounded-full mb-2">
                        <View className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                        <Text className="text-emerald-600 font-medium">Live Market Data</Text>
                    </View>
                    <Text className="text-3xl font-bold text-amber-500">Market Insights</Text>
                    <Text className="text-lg text-gray-600">Get Insights for Markets</Text>
                </View>
            </View>
            {/* 
            <View className="bg-white p-4 rounded-lg shadow-md w-11/12 mx-auto">
                <View className="flex flex-row items-center mb-2">
                    <ChartBarBig className="mr-2 text-gray-700" />
                    <Text className="text-lg font-semibold">Production State Wise</Text>
                </View>
                <View className="border border-gray-300 rounded-lg overflow-hidden">
                    <Picker selectedValue={selectedState} onValueChange={(itemValue) => setSelectedState(itemValue)}>
                        <Picker.Item label="Select a State" value="" />
                        {uniqueStates.map((state, index) => (
                            <Picker.Item key={index} label={state} value={state} />
                        ))}
                    </Picker>
                </View>
                <Animated.View style={{ width: "100%", height: heightAnim }}>
                    {selectedState && <DonutChart selectedState={selectedState} />}
                </Animated.View>
            </View> */}

            <View className="bg-white p-6 rounded-lg shadow-md w-11/12 mx-auto">
                <View className="flex flex-row items-center mb-4">
                    <TrendingUpIcon className="mr-2 text-gray-700" />
                    <Text className="text-xl font-semibold">Trend Analysis</Text>
                </View>
                <View className="mb-4 bg-white p-3 rounded-lg shadow-sm">
                    <Picker selectedValue={selectedCommodity} onValueChange={(itemValue) => setSelectedCommodity(itemValue)}>
                        <Picker.Item label="Select a Commodity" value="" />
                        {Array.from(new Set(TrendData.map((item) => item.Commodity)))
                            .filter((commodity) => !selectedCommodities.includes(commodity))
                            .map((commodity, index) => (
                                <Picker.Item key={index} label={commodity} value={commodity} />
                            ))}
                    </Picker>
                    <Pressable className="mt-3 bg-blue-500 px-4 py-2 rounded-lg items-center" onPress={handleAddCommodity} disabled={!selectedCommodity}>
                        <Text className="text-white text-base">Add Commodity</Text>
                    </Pressable>
                    <Pressable className="mt-3 bg-red-500 px-4 py-2 rounded-lg items-center" onPress={handleResetTrend}>
                        <Text className="text-white text-base">Reset Trend</Text>
                    </Pressable>
                </View>
                {selectedCommodities.length > 0 && (
                    <View className="flex flex-wrap gap-2">
                        {selectedCommodities.map((commodity, index) => (
                            <View key={index} className="bg-gray-200 px-3 py-1 rounded-full">
                                <Text className="text-gray-700">{commodity}</Text>
                            </View>
                        ))}
                    </View>
                )}
                {selectedCommodities.length > 0 ? (
                    <TrendPlot selectedCommodities={selectedCommodities} data={TrendData} />
                ) : (
                    <Text className="text-gray-500 text-center mt-4">Please select up to 4 commodities for trend analysis.</Text>
                )}
            </View>

            <View className="flex flex-row items-center gap-2 px-4 py-2 rounded-full border border-emerald-100 bg-white/50 w-fit mx-auto mt-4">
                <Database className="text-emerald-400" />
                <Text className="text-sm text-gray-600">Powered by Agricultural Ministry of India APIs</Text>
            </View>
        </ScrollView>
    );
};


export default MarketInsights;