import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Linking,
  RefreshControl,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { getAgricultureNews, NewsResult } from "@/services/agriNewsService"

const { width } = Dimensions.get('window');

export default function AgricultureNews() {
  const [newsData, setNewsData] = useState<NewsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTopic, setSearchTopic] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (topic?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAgricultureNews(topic);
      setNewsData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load agricultural news. Please try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = () => {
    if (searchTopic.trim()) {
      fetchNews(searchTopic);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews(searchTopic);
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch(err => {
      console.error('Error opening URL:', err);
      setError('Could not open the link. Please try again.');
    });
  };

  const toggleArticleExpansion = (articleUrl: string) => {
    if (expandedArticle === articleUrl) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(articleUrl);
    }
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={styles.loadingText}>Fetching latest agricultural news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchNews()}>
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
            placeholder="Explore stories, topics..."
            value={searchTopic}
            onChangeText={setSearchTopic}
            placeholderTextColor="#9ca3af"
            onSubmitEditing={handleSearch}
          />
        </View>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicsScroll}>
          <TouchableOpacity style={styles.topicBtnActive}>
            <Text style={styles.topicBtnTextActive}>Stories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topicBtn}>
            <Text style={styles.topicBtnText}>Topics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topicBtn}>
            <Text style={styles.topicBtnText}>Authors</Text>
          </TouchableOpacity>
        </ScrollView> */}
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
        {newsData && (
          <>
            {newsData.articles.map((article, index) => (
              <TouchableOpacity
                key={article.url + index}
                style={styles.articleCard}
                onPress={() => toggleArticleExpansion(article.url)}
                activeOpacity={0.7}
              >
                {article.imageUrl ? (
                  <Image
                    source={{ uri: article.imageUrl }}
                    style={styles.articleImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.articleImage, styles.imagePlaceholder]}>
                    <Ionicons name="newspaper-outline" size={30} color="#059669" />
                  </View>
                )}

                <View style={styles.articleMeta}>
                  {article.source && (
                    <Text style={styles.articleAuthor}>{article.source}</Text>
                  )}
                  <Text style={styles.articleTitle} numberOfLines={expandedArticle === article.url ? undefined : 2}>
                    {article.title}
                  </Text>

                  <View style={styles.articleFooter}>
                    <Text style={styles.articleTime}>
                      {article.date || '1 hour ago'} • 5 min read
                    </Text>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        // Add bookmark functionality here
                      }}
                    >
                      <Ionicons name="bookmark-outline" size={18} color="#9ca3af" />
                    </TouchableOpacity>
                  </View>

                  {expandedArticle === article.url && (
                    <>
                      <Text style={styles.articleSummary}>{article.summary}</Text>
                      <TouchableOpacity
                        style={styles.readMoreButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleOpenLink(article.url);
                        }}
                      >
                        <Text style={styles.readMoreButtonText}>Read Full Article</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
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
  topicsScroll: {
    marginBottom: 8,
  },
  topicBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
  },
  topicBtnActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#111827',
  },
  topicBtnText: {
    fontSize: 14,
    color: '#6b7280',
  },
  topicBtnTextActive: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingTop: 8,
  },
  articleCard: {
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  articleImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  imagePlaceholder: {
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleMeta: {
    paddingHorizontal: 4,
  },
  articleAuthor: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '500',
    marginBottom: 4,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  articleTime: {
    fontSize: 13,
    color: '#6b7280',
  },
  articleSummary: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
    marginVertical: 12,
  },
  readMoreButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  readMoreButtonText: {
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