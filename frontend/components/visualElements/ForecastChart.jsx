import { BarChart } from "lucide-react-native";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ForecastChart = ({ forecastData }) => {
    if (!forecastData || forecastData.length === 0) {
        return <Text style={styles.errorText}>No Forecast Data Available</Text>;
    }

    const screenWidth = Dimensions.get("window").width - 40;

    // Prepare data for the chart
    const labels = forecastData.map((day) =>
        new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        })
    );
    const dataPoints = forecastData.map((day) => day.day.avgtemp_c);

    return (
        <View>
            <View className="flex gap-2 justify-center items-center flex-row">
                <View className="p-2.5 bg-orange-100 rounded-lg">
                    <BarChart className="color-orange-500" />
                </View>
                <Text className="text-xl font-semibold">Forecasting for 7 days</Text>
            </View>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [{ data: dataPoints }],
                }}
                width={330}
                height={250}
                yAxisSuffix="°C"
                fromZero
                withDots
                withShadow={false}
                withInnerLines={false}
                withOuterLines={true}
                chartConfig={{
                    backgroundGradientFrom: "#FFFBEB",
                    backgroundGradientTo: "#FFFBEB",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(85, 85, 85, ${opacity})`,
                    propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "#34D399",
                    },
                    propsForLabels: {
                        fontSize: 10,
                        rotation: 15,
                    },
                    propsForBackgroundLines: {
                        stroke: "#000",
                        strokeDasharray: "0",
                    },
                }}
                bezier
                formatXLabel={(label) => label.split(" ").join("\n")}
                style={{ borderRadius: 16 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    errorText: {
        fontSize: 16,
        color: "#ff0000",
        textAlign: "center",
        marginTop: 20,
    },
});

export default ForecastChart;