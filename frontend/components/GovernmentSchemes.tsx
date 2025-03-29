import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Linking,
  RefreshControl,
  Dimensions,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { getGovernmentSchemes, SchemeResult } from '../services/agriNewsService';

const { width } = Dimensions.get('window');

export default function GovernmentSchemes() {
  const [schemesData, setSchemesData] = useState<SchemeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  // Fetch schemes on component mount
  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async (schemeType?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getGovernmentSchemes(schemeType);
      setSchemesData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load government schemes. Please try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchSchemes(searchQuery);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchSchemes(searchQuery);
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(err => {
      console.error('Error opening URL:', err);
      setError('Could not open the link. Please try again.');
    });
  };

  const toggleSchemeExpansion = (schemeTitle: string) => {
    if (expandedScheme === schemeTitle) {
      setExpandedScheme(null);
    } else {
      setExpandedScheme(schemeTitle);
    }
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={styles.loadingText}>Fetching government schemes and subsidies...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchSchemes()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View 
        style={styles.header}
        entering={FadeIn.duration(500)}
      >
        <Text style={styles.title}>Explore</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search schemes, subsidies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
            onSubmitEditing={handleSearch}
          />
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#16a34a']}
            tintColor="#16a34a"
          />
        }
      >
        {schemesData && schemesData.schemes.map((scheme, index) => (
          <TouchableOpacity 
            key={scheme.title + index}
            style={styles.schemeCard}
            onPress={() => toggleSchemeExpansion(scheme.title)}
            activeOpacity={0.7}
          >
            <View style={styles.schemeIconContainer}>
              <Ionicons name="briefcase-outline" size={24} color="#059669" />
            </View>
            
            <View style={styles.schemeContent}>
              <Text style={styles.schemeName}>{scheme.title}</Text>
              
              <View style={styles.schemeMetaRow}>
                {scheme.deadline && (
                  <View style={styles.deadlineTag}>
                    <Text style={styles.deadlineText}>{scheme.deadline}</Text>
                  </View>
                )}
                <Text style={styles.readTime}>5 min read</Text>
              </View>
              
              {expandedScheme === scheme.title && (
                <View style={styles.expandedContent}>
                  <Text style={styles.schemeDescription}>{scheme.description}</Text>
                  
                  {scheme.benefits && (
                    <View style={styles.infoSection}>
                      <Text style={styles.infoSectionTitle}>Benefits</Text>
                      <Text style={styles.infoSectionText}>{scheme.benefits}</Text>
                    </View>
                  )}
                  
                  {scheme.eligibility && (
                    <View style={styles.infoSection}>
                      <Text style={styles.infoSectionTitle}>Who Can Apply</Text>
                      <Text style={styles.infoSectionText}>{scheme.eligibility}</Text>
                    </View>
                  )}
                  
                  {scheme.applicationProcess && (
                    <View style={styles.infoSection}>
                      <Text style={styles.infoSectionTitle}>How to Apply</Text>
                      <Text style={styles.infoSectionText}>{scheme.applicationProcess}</Text>
                    </View>
                  )}
                  
                  <TouchableOpacity 
                    style={styles.applyButton}
                    onPress={() => handleOpenLink(scheme.url)}
                  >
                    <Text style={styles.applyButtonText}>Visit Official Website</Text>
                  </TouchableOpacity>
                </View>
              )}
              
              {!expandedScheme && (
                <View style={styles.schemeFooter}>
                  <Ionicons 
                    name="chevron-down" 
                    size={16} 
                    color="#9ca3af" 
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  searchContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 32,
  },
  schemeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  schemeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  schemeContent: {
    flex: 1,
  },
  schemeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  schemeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deadlineTag: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  deadlineText: {
    fontSize: 12,
    color: '#d97706',
    fontWeight: '500',
  },
  readTime: {
    fontSize: 13,
    color: '#6b7280',
  },
  schemeFooter: {
    alignItems: 'center',
    marginTop: 8,
  },
  expandedContent: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  schemeDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
  },
  infoSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 6,
  },
  infoSectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4b5563',
  },
  applyButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#16a34a',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
}); 