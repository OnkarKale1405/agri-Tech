import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { cropData } from "../../assets/data/production_state";

const categoryColors = {
  "Food Grains": "#3498db",
  Oilseeds: "#f39c12",
  "Commercial Crops": "#e74c3c",
};

const DonutChart = ({ selectedState }) => {
  if (!selectedState || !cropData) return null;

  const filteredData = cropData?.filter(
    (item) => item.statename === selectedState
  );

  if (!filteredData || filteredData.length === 0) {
    return (
      <Text style={{ textAlign: 'center', color: 'gray' }}>
        No data available.
      </Text>
    );
  }

  const categoryData = filteredData.reduce((acc, item) => {
    acc[item.cropcategoryname] = acc[item.cropcategoryname] || {
      production: 0,
    };
    acc[item.cropcategoryname].production += item["Production (Lakh Tonnes)"];
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map((category) => ({
    name: category,
    population: categoryData[category].production,
    color: categoryColors[category] || "#95a5a6",
    legendFontColor: "#222",
    legendFontSize: 14,
  }));

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
      <View style={{ width: screenWidth * 0.9, alignItems: 'center', justifyContent: 'center' }}>
        <PieChart
          data={pieData}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[0, 0]}
          absolute
          hasLegend={false}
        />
      </View>

      {/* Custom Legend Container */}
      <View style={{
        width: screenWidth * 0.9,
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 16
      }}>
        {pieData.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8
            }}
          >
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: item.color
              }}
            />
            <Text style={{
              marginLeft: 8,
              fontSize: 16,
              fontWeight: '600',
              color: '#333'
            }}>
              {item.name}: {item.population.toFixed(2)} Lakh Tonnes
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DonutChart;