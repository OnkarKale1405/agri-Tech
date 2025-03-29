import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
} from "react-native";
import axios from "axios";
import { AlertCircle, Sprout, CloudRain, Calendar } from "lucide-react-native";

const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const AiInsights = ({ weatherData, historicalData, forecastData }) => {
    const [insights, setInsights] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchInsights = useCallback(async () => {
        setLoading(true);
        try {
            const promptText = `
Based on the current, forecasted, and historical weather data provided below, generate agricultural insights. Provide recommendations for:
1. Crop-Specific Alerts
2. Extreme Weather Warnings
3. Irrigation Management
4. Historical Weather Analysis

Return the response in a valid JSON format with the following keys:
"crop_alerts", "weather_warnings", "irrigation_management", and "historical_analysis".

CURRENT_DATA: ${JSON.stringify(weatherData?.current || {})}
FORECAST_DATA: ${JSON.stringify(forecastData || {})}
HISTORICAL_DATA: ${JSON.stringify(historicalData || {})}
      `;

            const response = await axios.post(
                API_URL,
                { contents: [{ parts: [{ text: promptText }] }] },
                { headers: { "Content-Type": "application/json" } }
            );

            const resultText =
                response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!resultText) throw new Error("Invalid response from AI.");

            const parsedData = parseAIResponse(resultText);
            setInsights(parsedData);
        } catch (error) {
            console.error("Error fetching AI insights:", error);
            Alert.alert("Error", "Failed to fetch AI insights.");
            setInsights({}); // Reset insights to an empty object on error
        } finally {
            setLoading(false);
        }
    }, [weatherData, forecastData, historicalData]);

    useEffect(() => {
        fetchInsights();
    }, [fetchInsights]);

    const parseAIResponse = (text) => {
        try {
            let cleanText = text.replace(/```/g, "").trim();
            if (cleanText.toLowerCase().startsWith("json")) {
                cleanText = cleanText.slice(4).trim();
            }
            const parsed = JSON.parse(cleanText);
            return {
                crop_alerts: parsed.crop_alerts || [],
                weather_warnings: parsed.weather_warnings || [],
                irrigation_management: parsed.irrigation_management || [],
                historical_analysis: parsed.historical_analysis || [],
            };
        } catch (error) {
            console.error("JSON Parse Error:", error, text);
            throw new Error("Invalid JSON received from AI.");
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" />;
    }

    if (!insights || Object.keys(insights).length === 0) {
        return <Text style={styles.errorText}>No insights available.</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.headerText}>AI-Based Agricultural Insights</Text>
            </View>
            {Object.entries(insights)
                .filter(([_, items]) => Array.isArray(items) && items.length > 0)
                .map(([key, items]) => (
                    <InsightSection
                        key={key}
                        title={key.replace(/_/g, " ")}
                        items={items}
                        Icon={getIcon(key)}
                    />
                ))}
        </ScrollView>
    );
};

const InsightSection = ({ title, items, Icon }) => (
    <View style={styles.insightSection}>
        <View style={styles.insightHeader}>
            <View style={styles.iconContainer}>
                <View style={styles.iconBackground}>
                    <View style={styles.innerIconBackground} />
                </View>
            </View>
            <Icon size={24} color="#8b5cf6" style={styles.icon} />
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {Array.isArray(items) && items.length > 0 ? (
            items.map((item, index) => <InsightCard key={index} data={item} />)
        ) : (
            <Text style={styles.noDataText}>No data available</Text>
        )}
    </View>
);

const InsightCard = ({ data }) => (
    <View style={styles.insightCard}>
        {Object.entries(data).map(([key, value]) => (
            <View key={key} style={styles.cardRow}>
                <Text style={styles.cardLabel}>{formatKey(key)}:</Text>
                <Text style={styles.cardValue}>{String(value)}</Text>
            </View>
        ))}
    </View>
);

const getIcon = (key) =>
({
    crop_alerts: Sprout,
    weather_warnings: AlertCircle,
    irrigation_management: CloudRain,
    historical_analysis: Calendar,
}[key] || AlertCircle);

const formatKey = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        borderRadius: 25,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
        color: "black",
    },
    errorText: {
        fontSize: 16,
        color: "#ff0000",
        textAlign: "center",
        marginTop: 20,
    },
    insightSection: {
        marginBottom: 24,
        position: "relative",
    },
    insightHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        position: "relative",
    },
    iconContainer: {
        position: "absolute",
        left: 0,
        top: 8,
        width: 16,
        height: 16,
        backgroundColor: "#E9D5FF", // purple-200
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    iconBackground: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#8b5cf6", // purple-500
        borderRadius: 8,
    },
    innerIconBackground: {
        position: "absolute",
        top: 2,
        bottom: 2,
        left: 2,
        right: 2,
        backgroundColor: "#8b5cf6",
        borderRadius: 8,
    },
    icon: {
        marginLeft: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 8,
        color: "#7C3AED", // purple-600
    },
    insightCard: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#E5E7EB", // gray-200
    },
    cardRow: {
        marginBottom: 8,
    },
    cardLabel: {
        fontWeight: "600",
        color: "#1F2937", // gray-800
    },
    cardValue: {
        fontSize: 14,
        color: "#4B5563", // gray-600
    },
    noDataText: {
        color: "#4B5563",
        fontSize: 14,
    },
});

export default AiInsights;
