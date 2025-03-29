import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import {
  Search,
  Wind,
  Gauge,
  Droplets,
  Sun,
  Moon,
  CircleUser,
  Database,
} from "lucide-react-native";
import * as Location from "expo-location";
import axios from "axios";
import Forecast from "@/components/visualElements/ForecastChart";
import AiInsights from "@/hooks/AiInsights";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Fetch both forecast and historical data
  const fetchWeatherData = async (query) => {
    try {
      setLoading(true);
      const apiKey = "e784b0936ca243aaabf41223252603";

      // Fetch 7-day forecast
      const forecastResponse = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json",
        {
          params: {
            key: apiKey,
            q: query,
            days: 7,
          },
        }
      );

      setWeatherData(forecastResponse.data);
      setLocationName(
        `${forecastResponse.data.location.name}, ${forecastResponse.data.location.region}, ${forecastResponse.data.location.country}`
      );

      // Fetch past 14 days of historical data
      const today = new Date();
      const historicalResults = [];

      for (let i = 1; i <= 14; i++) {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - i);
        const formattedDate = pastDate.toISOString().split("T")[0];

        const historyResponse = await axios.get(
          "https://api.weatherapi.com/v1/history.json",
          {
            params: {
              key: apiKey,
              q: query,
              dt: formattedDate,
            },
          }
        );
        historicalResults.push(historyResponse.data);
      }

      setHistoricalData(historicalResults);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      Alert.alert("Error", "Failed to fetch weather data.");
      setLoading(false);
    }
  };

  // Get location and fetch weather on mount
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location access is needed to fetch weather data."
          );
          setLoading(false);
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        fetchWeatherData(`${latitude},${longitude}`);
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Failed to get location.");
        setLoading(false);
      }
    })();
  }, []);

  // Handle search
  const handleSearch = () => {
    if (searchLocation.trim() === "") {
      Alert.alert("Error", "Please enter a valid location.");
      return;
    }
    fetchWeatherData(searchLocation);
    setSearchLocation("");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#34D399" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Failed to load weather data.</Text>
      </View>
    );
  }

  const { temp_c, humidity, wind_kph, pressure_mb } = weatherData.current;
  const { sunrise, sunset } = weatherData.forecast.forecastday[0].astro;
  const { maxtemp_c, mintemp_c } = weatherData.forecast.forecastday[0].day;
  const weatherText = weatherData.current.condition.text;
  const localTime = weatherData.location.localtime;
  const forecastData = weatherData.forecast.forecastday;

  return (
    <ScrollView className="flex-1 bg-[#E8F5E9] w-full space-y-8">
      {/* Header Section */}
      <View className="bg-green-600 pb-14 pt-8 px-4 w-full  rounded-b-3xl">
        <View className="mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-white text-xl font-bold">
              Hello, <Text className="font-normal">Good Morning</Text>
            </Text>
            <Text className="text-gray-300">Local Time: {localTime}</Text>
          </View>
        </View>

        {/* Search Input */}
        <View className="bg-white rounded-full p-3 flex-row items-center mb-5">
          <Search color="#555" size={20} />
          <TextInput
            placeholder="Search here..."
            value={searchLocation}
            onChangeText={setSearchLocation}
            className="ml-2 flex-1 text-gray-700 outline-none"
          />
          <Pressable onPress={handleSearch}>
            <Text className="text-green-700 font-semibold">Search</Text>
          </Pressable>
        </View>
      </View>

      {/* Weather Card */}
      <View className="m-4 -mt-10 bg-white rounded-2xl p-6 shadow-lg">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-semibold">{locationName}</Text>
            <Text className="text-gray-500">{weatherText}</Text>
          </View>
          <Image
            source={require("./../assets/images/cloud.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>

        <View className="flex-row items-center mt-4">
          <Text className="text-6xl font-bold text-green-700">{temp_c}°C</Text>
          <View className="ml-6">
            <Text className="text-gray-500 text-lg">High: {maxtemp_c}°C</Text>
            <Text className="text-gray-500 text-lg">Low: {mintemp_c}°C</Text>
          </View>
        </View>

        {/* Weather Details */}
        <View className="flex-row justify-between mt-8">
          <View className="items-center">
            <Wind size={24} className="color-gray-500" color="gray" />
            <Text className="text-gray-600">{wind_kph} km/h</Text>
            <Text className="text-gray-500 text-sm">Wind</Text>
          </View>
          <View className="items-center">
            <Gauge size={24} color="red" />
            <Text className="text-gray-600">{pressure_mb} hPa</Text>
            <Text className="text-gray-500 text-sm">Pressure</Text>
          </View>
          <View className="items-center">
            <Droplets size={24} className="color-blue-500" color="blue" />
            <Text className="text-gray-600">{humidity}%</Text>
            <Text className="text-gray-500 text-sm">Humidity</Text>
          </View>
        </View>

        {/* Sunrise and Sunset */}
        <View className="flex-row justify-between mt-8">
          <View className="flex-row items-center">
            <Sun size={24} className="color-yellow-400" color="orange" />
            <Text className="text-gray-600 text-lg ml-2">{sunrise}</Text>
          </View>
          <View className="flex-row items-center">
            <Moon size={24} color="#555" />
            <Text className="text-gray-600 text-lg ml-2">{sunset}</Text>
          </View>
        </View>
      </View>

      {/* Forecast Chart */}
      <View className="m-4 mt-5 bg-amber-50 rounded-2xl p-6 shadow-lg">
        <Forecast forecastData={forecastData} />
      </View>
      {/* {Insights} */}
      <View className=" bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg ">
        <AiInsights
          weatherData={weatherData}
          historicalData={historicalData}
          forecastData={forecastData}
        />
        <View className="inline-flex gap-2 items-center px-4 py-2 rounded-full border border-emerald-100 bg-white/50 flex-row mb-5">
          <Database className="text-emerald-400" />
          <Text className="text-sm text-gray-600">
            Powered by Agricultural Ministry of India APIs
          </Text>
        </View>
      </View>
      {/* Fotter */}
    </ScrollView>
  );
}
