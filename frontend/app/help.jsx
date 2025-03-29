import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import AgricultureNews from '@/components/AgricultureNews';
import GovernmentSchemes from '@/components/GovernmentSchemes';

// Main App Component
export default function Help() {
    const [activeTab, setActiveTab] = useState('schemes');

    return (
        <SafeAreaView className="flex-1 bg-amber-100">
            {/* Tab Navigation */}
            <View className="flex-row justify-around py-3 bg-white shadow-md">
                <TouchableOpacity
                    className={`flex-1 items-center pb-2 ${activeTab === 'news' ? 'border-b-2 border-emerald-600' : ''}`}
                    onPress={() => setActiveTab('news')}
                >
                    <Text className={`text-lg font-semibold ${activeTab === 'news' ? 'text-emerald-600' : 'text-gray-500'}`}>
                        News
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 items-center pb-2 ${activeTab === 'schemes' ? 'border-b-2 border-emerald-600' : ''}`}
                    onPress={() => setActiveTab('schemes')}
                >
                    <Text className={`text-lg font-semibold ${activeTab === 'schemes' ? 'text-emerald-600' : 'text-gray-500'}`}>
                        Schemes
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content Area */}
            <ScrollView className="flex-1">
                {activeTab === 'news' ? <AgricultureNews /> : <GovernmentSchemes />}
            </ScrollView>
        </SafeAreaView>
    );
}