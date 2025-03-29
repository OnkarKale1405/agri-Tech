import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import { cities, crops } from "../assets/data/marketConstants";
import {
    Activity,
    BarChart3,
    Cpu,
    Database,
    Scale,
    TrendingUp,
    Info,
} from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchMarketAnalysis } from "../hooks/fetchMarketAnalysis";

export default function CropAdvisory() {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCrop, setSelectedCrop] = useState("");
    const [result, setResult] = useState(null);
    const [rerror, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // const data = [
    //     {
    //         "forecastMetrics": {
    //             "priceProjection": {
    //                 "confidence": 85,
    //                 "nextMonth": 2250,
    //                 "nextWeek": 2300
    //             },
    //             "supplyOutlook": {
    //                 "factors": [],
    //                 "trend": "Increasing"
    //             }
    //         },
    //         "marketAnalysis": {
    //             "insights": [
    //                 "Barley prices in Chandrapur have experienced a slight dip in the last week due to increased local harvest.",
    //                 "Demand from breweries remains stable, but increased supply is putting downward pressure on prices.",
    //                 "Quality is a key factor differentiating premium grades from standard and substandard barley."
    //             ],
    //             "summary": {
    //                 "currentPrice": 2350,
    //                 "marketSentiment": "Slightly Bearish due to increased supply.",
    //                 "priceChange": -2.5,
    //                 "tradingVolume": 450
    //             },
    //             "visualizations": []
    //         },
    //         "qualityMetrics": {
    //             "gradeDistribution": {
    //                 "premium": 0.25,
    //                 "standard": 0.6,
    //                 "substandard": 0.15
    //             },
    //             "qualityParameters": [
    //                 "Moisture content: Optimal levels are crucial for storage and malting.",
    //                 "Protein content: Higher protein content is preferred by some brewers.",
    //                 "Germination rate: High germination rate is essential for malting quality."
    //             ]
    //         }
    //     }
    // ];

    const fetchData = async () => {
        console.log("Fetching Data...");
        setLoading(true);
        try {
            const data = await fetchMarketAnalysis(selectedCity, selectedCrop);
            setResult(data);
            console.log("Data:", data);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.message
                : "Unknown error";
            setError(errorMessage);
            console.error("Failed to fetch data:", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if (selectedCity.trim() === "" && selectedCrop.trim() === "") {
    //         fetchData();
    //     }
    // }, [selectedCity, selectedCrop]);

    const onSubmit = async () => {
        if (selectedCity.trim() !== "" && selectedCrop.trim() !== "") {
            await fetchData();
        } else {
            ToastAndroid.show("Please select both city and crop", ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="flex-1 bg-green-100">
                <View className="px-4 py-6">
                    <View className="relative">
                        {/* Page Header - 10% Emerald Accent (emerald-600) */}
                        <View className="mb-8 text-center md:mb-16">
                            <View className="inline-flex flex-row gap-2 items-center justify-center px-2 py-2 mb-4 bg-emerald-100 rounded-full border border-emerald-200">
                                <View className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                                <Text className="text-sm font-medium text-emerald-600">
                                    Live Market Data
                                </Text>
                            </View>
                            <Text className="text-3xl font-extrabold text-emerald-600 md:text-4xl text-center">
                                Crop Intelligence
                            </Text>
                            <Text className="mt-3 text-sm text-emerald-700 md:mt-4 md:text-base text-center">
                                Advanced agricultural insights and predictive analytics
                            </Text>
                        </View>

                        {/* Form - 30% Green Accent (green-600) */}
                        <View className="mb-8 max-w-xl w-[90%] mx-auto">
                            <View className="p-4 rounded-xl border border-green-200 shadow-sm bg-green-200">
                                <View className="grid gap-4 md:grid-cols-2">
                                    <View className="">
                                        <Text className="block text-sm font-medium text-green-700">
                                            City
                                        </Text>
                                        <View className="w-full px-2 py-0.5 rounded-lg border border-green-200 bg-white/70">
                                            <Picker
                                                selectedValue={selectedCity}
                                                onValueChange={(itemValue) => setSelectedCity(itemValue)}
                                            >
                                                {cities.map((ele, id) => (
                                                    <Picker.Item label={ele} value={ele} key={id} />
                                                ))}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View className="space-y-2">
                                        <Text className="block text-sm font-medium text-green-700">
                                            Crop
                                        </Text>
                                        <View className="w-full px-2 py-0.5 rounded-lg border border-green-200 bg-white/70">
                                            <Picker
                                                selectedValue={selectedCrop}
                                                onValueChange={(itemValue) => setSelectedCrop(itemValue)}
                                            >
                                                {crops.map((ele, id) => (
                                                    <Picker.Item label={ele} value={ele} key={id} />
                                                ))}
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    className="mt-4 w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 flex-row"
                                    onPress={onSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator size={20} color="white" />
                                    ) : (
                                        <Activity size={20} color="white" />
                                    )}
                                    <Text className="text-white">
                                        {loading ? "Analyzing..." : "Analyze Crop Data"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Market Overview - 60% Base Color (green-100) */}
                        {result && !loading && (
                            <View className="p-6 rounded-xl bg-emerald-600 shadow-lg mb-4">
                                <View className="flex gap-3 items-center mb-4 justify-center flex-row">
                                    <BarChart3 size={24} color="#fff" />
                                    <Text className="text-xl font-semibold text-white">
                                        Market Overview
                                    </Text>
                                </View>

                                <View className=" flex-col gap-2">
                                    <View className="flex justify-between flex-row items-center p-3 rounded-lg border bg-white/80 border-green-200">
                                        <Text className="text-gray-600">Current Price</Text>
                                        <Text className="font-semibold">
                                            ₹{result.marketAnalysis.summary.currentPrice}/quintal
                                        </Text>
                                    </View>

                                    <View className="flex justify-between items-center p-3 flex-row rounded-lg border bg-white/80 border-green-200">
                                        <Text className="text-gray-600">Price Change</Text>
                                        <Text className="font-semibold">
                                            {result.marketAnalysis.summary.priceChange}%
                                        </Text>
                                    </View>

                                    <View className="flex justify-between items-center p-3 flex-row rounded-lg border bg-white/80 border-green-200">
                                        <Text className="text-gray-600">Trading Volume</Text>
                                        <Text className="font-semibold">
                                            {result.marketAnalysis.summary.tradingVolume} quintals
                                        </Text>
                                    </View>

                                    {/* <View className="flex justify-between items-center p-3 flex-row rounded-lg border bg-white/80 border-green-200">
                                        <Text className="text-gray-600">Market Sentiment</Text>
                                        <Text className="font-semibold text-green-600">
                                            {result.marketAnalysis.summary.marketSentiment}
                                        </Text>
                                    </View> */}
                                </View>

                                {/* Market Insights */}
                                <View className="mt-4 p-3 rounded-lg bg-white/80 border border-green-200">
                                    <View className="flex flex-row items-center mb-2">
                                        <Info size={20} color="#16A34A" className="mr-2" />
                                        <Text className="ml-1 text-lg font-semibold text-green-600">Market Insights</Text>
                                    </View>
                                    {result.marketAnalysis.insights.map((insight, index) => (
                                        <Text key={index} className="text-gray-600 w-[90%] text-justify my-1">
                                            • {insight}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* Quality Metrics - Similar Design */}
                        {result && !loading && (
                            <View className="p-6 rounded-xl bg-emerald-600 shadow-lg mb-4">
                                <View className="flex flex-row items-center gap-3 mb-4 justify-center">
                                    <Scale size={24} color="#fff" />
                                    <Text className="text-xl font-semibold text-white ">
                                        Quality Metrics
                                    </Text>
                                </View>

                                <View className="flex-col gap-2">
                                    <View className="flex flex-row justify-between items-center p-3 rounded-lg border bg-white/80 border-green-200">
                                        <Text className="text-gray-600 capitalize">Premium</Text>
                                        <Text className="font-semibold text-green-600">
                                            {(result.qualityMetrics.gradeDistribution.premium).toFixed(1)}%
                                        </Text>
                                    </View>

                                    <View className="flex flex-row justify-between items-center p-3 rounded-lg border bg-white/80 border-green-200">
                                        <Text className="text-gray-600 capitalize">Standard</Text>
                                        <Text className="font-semibold text-green-600">
                                            {(result.qualityMetrics.gradeDistribution.standard * 100).toFixed(1)}%
                                        </Text>
                                    </View>

                                    <View className="flex flex-row justify-between items-center p-3 rounded-lg border bg-white/80 border-green-200">
                                        <Text className="text-gray-600 capitalize">Substandard</Text>
                                        <Text className="font-semibold text-green-600">
                                            {(result.qualityMetrics.gradeDistribution.substandard * 100).toFixed(1)}%
                                        </Text>
                                    </View>

                                    {/* Quality Parameters */}
                                    {/* <View className="mt-4 p-3 rounded-lg bg-white/80 border border-green-200">
                                        <View className="flex flex-row items-center mb-2">
                                            <Info size={20} color="#16A34A" className="mr-2" />
                                            <Text className="text-lg w-[80%] font-semibold text-green-600">Quality Parameters</Text>
                                        </View>
                                        {result.qualityMetrics.qualityParameters.map((param, index) => (
                                            <Text key={index} className="text-gray-600 text-justify mb-1">
                                                • {param}
                                            </Text>
                                        ))}
                                    </View> */}
                                </View>
                            </View>
                        )}

                        {/* Forecast - Similar Design */}
                        {result && !loading && (
                            <View className="p-6 rounded-xl bg-emerald-600 shadow-lg">
                                <View className="flex flex-row gap-3 items-center mb-4 justify-center">
                                    <TrendingUp size={24} color="#fff" />
                                    <Text className="text-xl font-semibold text-white">
                                        Price Forecast
                                    </Text>
                                </View>

                                <View className="space-y-4">
                                    <View className="p-3 rounded-lg border bg-white/80 border-green-200">
                                        <View className="flex flex-row justify-between items-center mb-2">
                                            <Text className="text-gray-600">Next Week</Text>
                                            <Text className="font-semibold">
                                                <Text className="text-lg text-green-600">₹{result.forecastMetrics.priceProjection.nextWeek}</Text>/quintal
                                            </Text>
                                        </View>

                                        <View className="flex flex-row justify-between items-center">
                                            <Text className="text-gray-600">Next Month</Text>
                                            <Text className="font-semibold">
                                                <Text className="text-lg text-green-600">₹{result.forecastMetrics.priceProjection.nextMonth}</Text>
                                                /quintal
                                            </Text>
                                        </View>

                                        <Text className="mt-3 text-base text-gray-500">
                                            Confidence:{" "}
                                            {result.forecastMetrics.priceProjection.confidence}%
                                        </Text>

                                        {/* Supply Outlook */}
                                        <View className="pt-3 mt-4 border-t border-green-200">
                                            <View className="flex flex-row gap-2 items-center mb-2">
                                                <Cpu size={16} color="#16A34A" />
                                                <Text className="text-sm font-semibold text-green-600">Supply Outlook</Text>
                                            </View>
                                            <View className="flex flex-row justify-between items-center">
                                                <Text className="text-gray-600">Supply Trend</Text>
                                                <Text className="font-semibold text-green-600">
                                                    {result.forecastMetrics.supplyOutlook.trend}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* <View className="pt-3 mt-2 border-t border-green-200">
                                            <View className="flex flex-row gap-2 items-center text-xs text-gray-500 ">
                                                <Cpu size={16} color="#16A34A" />
                                                <Text>Forecast generated by Gemini 2.0 Advanced</Text>
                                            </View>
                                        </View> */}
                                    </View>
                                </View>
                            </View>
                        )}

                        <View className="inline-flex gap-2 items-center px-4 py-2 rounded-full border border-green-200 bg-white/50 flex-row mt-2 mb-16">
                            <Database className="text-emerald-400" />
                            <Text className="text-sm text-gray-600">
                                Powered by Agricultural Ministry of India APIs
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}