import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");
const chartWidth = width - 80; // Reduced width

// Define color palette
const palette = ["#FF5733", "#33A1FF", "#28A745", "#FFC107", "#8E44AD"];

const TrendPlot = ({ selectedCommodities, data }) => {
    if (!selectedCommodities || selectedCommodities.length === 0 || !data) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No data available.</Text>
            </View>
        );
    }

    // Filter data based on selected commodities
    const filteredData = data.filter((item) =>
        selectedCommodities.includes(item.Commodity)
    );

    // Extract unique years and sort them
    const uniqueYears = [
        ...new Set(filteredData.map((item) => item.Year)),
    ].sort();

    // Prepare dataset for Line Chart
    const datasets = selectedCommodities.map((commodity, index) => {
        const commodityData = filteredData.filter(
            (item) => item.Commodity === commodity
        );

        const dataPoints = uniqueYears.map((year) => {
            const record = commodityData.find((item) => item.Year === year);
            return record ? record["AveragePrice (Rs/Qtl)"] : 0; // Default to 0 for missing data
        });

        return {
            data: dataPoints,
            color: (opacity = 1) => palette[index % palette.length], // Color per commodity
            strokeWidth: 2,
        };
    });

    return (
        <View style={styles.chartContainer}>
            <Text style={styles.subheader}>Selected Commodities Trend</Text>
            <Text style={styles.subheader}> in Price (Rs/Qtl)</Text>
            <View style={styles.chartWithLabel}>
                <Text style={styles.yAxisLabel}>Price (Rs/Qtl)</Text>
                <LineChart
                    data={{
                        labels: uniqueYears.map(String),
                        datasets: datasets,
                    }}
                    width={350}
                    height={280}
                    chartConfig={{
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: {
                            r: "4",
                            strokeWidth: "2",
                            stroke: "#ffa726",
                        },
                    }}
                    bezier
                    style={styles.chartStyle}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 16,
        padding: 8,
        alignSelf: "center",
    },
    subheader: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
        color: "#333",
        overflowWrap: "break-word",
        textAlign: "center",
    },
    noDataContainer: {
        height: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    noDataText: {
        fontSize: 16,
        color: "#888",
    },
    chartStyle: {
        borderRadius: 12,
    },
    chartWithLabel: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
    },
    yAxisLabel: {
        transform: [{ rotate: "-90deg" }],
        position: "absolute",
        left: 100,
        top: "50%",
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
});

export default TrendPlot;
