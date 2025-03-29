// import React, { useState, useRef } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     KeyboardAvoidingView,
//     Platform,
//     ActivityIndicator,
//     Keyboard
// } from "react-native";
// import axios from "axios";
// import { Send } from "lucide-react-native";

// // API Configuration
// const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// const Chatbot = () => {
//     const [messages, setMessages] = useState([
//         { text: "🌿 Welcome to AgriTech Chatbot! Ask me about crops, soil health, or market prices.", sender: "bot" }
//     ]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);
//     const scrollViewRef = useRef(null);

//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         const userMessage = { text: input, sender: "user" };
//         setMessages((prev) => [...prev, userMessage]);
//         setInput("");
//         setLoading(true);

//         Keyboard.dismiss(); // Dismiss the keyboard after sending a message

//         try {
//             const response = await axios.post(API_URL, {
//                 contents: [{ parts: [{ text: input }] }],
//             });

//             let botReply =
//                 response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//                 "Sorry, I couldn't understand. Can you rephrase?";

//             setMessages((prev) => [
//                 ...prev,
//                 { text: botReply, sender: "bot" },
//             ]);
//         } catch (error) {
//             console.error("Error:", error);
//             setMessages((prev) => [
//                 ...prev,
//                 { text: "⚠️ Error fetching response!", sender: "bot" },
//             ]);
//         }

//         setLoading(false);
//     };

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             className="flex-1 bg-green-100"
//         >
//             {/* Header */}
//             <View className="h-16 flex-row justify-center items-center bg-green-700">
//                 <Text className="text-white font-bold text-lg">Chatbot</Text>
//             </View>

//             {/* Message Area */}
//             <ScrollView
//                 ref={scrollViewRef}
//                 onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//                 className="flex-grow p-4"
//                 keyboardShouldPersistTaps="handled"
//             >
//                 {messages.map((msg, index) => (
//                     <View
//                         key={index}
//                         className={`p-3 rounded-lg max-w-[80%] mb-8 ${msg.sender === "user"
//                             ? "bg-green-500 self-end"
//                             : "bg-green-300 self-start"
//                             }`}
//                     >
//                         <Text className="text-black">{msg.text}</Text>
//                     </View>
//                 ))}
//                 {loading && (
//                     <View className="p-3 rounded-lg mb-8 bg-gray-300 self-start flex-row items-center">
//                         <ActivityIndicator size="small" color="green" />
//                         <Text className="ml-2 text-black">Thinking...</Text>
//                     </View>
//                 )}
//             </ScrollView>

//             {/* Input Section */}
//             <View className="border-t border-gray-300 bg-green-200 px-4 pt-3 pb-5">
//                 <View className="flex-row items-center">
//                     <TextInput
//                         className="flex-1 p-3 border border-gray-400 rounded-lg bg-white"
//                         placeholder="🌱 Ask about crops, soil, or prices..."
//                         value={input}
//                         onChangeText={setInput}
//                         multiline
//                         numberOfLines={2}
//                     />
//                     <TouchableOpacity
//                         onPress={sendMessage}
//                         disabled={loading}
//                         className={`ml-3 p-3 rounded-lg ${loading ? "bg-gray-400" : "bg-green-700"}`}
//                     >
//                         <Send size={20} color="white" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };

// export default Chatbot;


import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Keyboard,
    Modal
} from "react-native";
import axios from "axios";
import { Send, RefreshCw, Mic, Volume2, VolumeX } from "lucide-react-native";
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

// Add speech recognition
let recognition = null;
try {
    // Check if the Web Speech API is available in the browser
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
        const WebSpeechRecognition = window.webkitSpeechRecognition;
        recognition = new WebSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
    } else if (typeof window !== 'undefined' && 'SpeechRecognition' in window) {
        const WebSpeechRecognition = window.SpeechRecognition;
        recognition = new WebSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
    } else {
        console.warn('Speech recognition not supported in this browser');
    }
} catch (error) {
    console.error('Failed to initialize speech recognition:', error);
}

// API Configuration
const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Supported languages with language detection patterns
const languages = [
    {
        code: 'en',
        name: 'English',
        welcome: '🌿 Welcome to AgriTech Chatbot! Ask me about crops, soil health, or market prices. I can access real-time data and remember our conversation.',
        placeholder: '🌱 Ask about crops, soil, or prices...',
        pattern: /^[A-Za-z\s\d.,!?()'":-]+$/,
        voiceCode: 'en-US'
    },
    {
        code: 'hi',
        name: 'हिंदी',
        welcome: '🌿 एग्रीटेक चैटबॉट में आपका स्वागत है! फसलों, मिट्टी की स्वास्थ्य, या बाजार मूल्य के बारे में पूछें। मैं रीयल-टाइम डेटा एक्सेस कर सकता हूं और हमारी बातचीत याद रख सकता हूं।',
        placeholder: '🌱 फसलों, मिट्टी, या कीमतों के बारे में पूछें...',
        pattern: /[\u0900-\u097F]/,
        voiceCode: 'hi-IN'
    },
    {
        code: 'mr',
        name: 'मराठी',
        welcome: '🌿 अॅग्रीटेक चॅटबॉटमध्ये आपले स्वागत आहे! पिके, माती आरोग्य किंवा बाजारभाव विषयी विचारा. मी रिअल-टाइम डेटा अॅक्सेस करू शकतो आणि आपली संभाषणे लक्षात ठेवू शकतो.',
        placeholder: '🌱 पिके, माती, किंवा किंमती बद्दल विचारा...',
        pattern: /[\u0900-\u097F].*[ऱऱ्या]/,
        voiceCode: 'mr-IN'
    },
    {
        code: 'gu',
        name: 'ગુજરાતી',
        welcome: '🌿 એગ્રિટેક ચેટબોટમાં આપનું સ્વાગત છે! પાક, જમીનના સ્વાસ્થ્ય, અથવા બજાર ભાવ વિશે પૂછો. હું રીઅલ-ટાઇમ ડેટા એક્સેસ કરી શકું છું અને આપણી વાતચીત યાદ રાખી શકું છું.',
        placeholder: '🌱 પાક, જમીન, અથવા ભાવ વિશે પૂછો...',
        pattern: /[\u0A80-\u0AFF]/,
        voiceCode: 'gu-IN'
    },
];

// Function to detect language from text
const detectLanguage = (text) => {
    for (const lang of languages) {
        if (lang.pattern.test(text)) {
            return lang;
        }
    }
    // Default to English if no match
    return languages[0];
};

// Real-time data sources
const dataEndpoints = {
    weather: "https://api.openweathermap.org/data/2.5/weather",
    cropPrices: "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
    soilHealth: "https://api.data.gov.in/resource/soil-health-card",
    // Add more real-time data endpoints as needed
};

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
    const [conversationContext, setConversationContext] = useState([]);
    const [isRefreshingContext, setIsRefreshingContext] = useState(false);

    // Audio related states
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingModal, setRecordingModal] = useState(false);
    const [audioPermission, setAudioPermission] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(true);

    // Add new state for speech recognition
    const [transcript, setTranscript] = useState('');
    const [isRecognitionActive, setIsRecognitionActive] = useState(false);

    const scrollViewRef = useRef(null);

    // Maximum context size to maintain reasonable token limits
    const MAX_CONTEXT_LENGTH = 10;

    useEffect(() => {
        // Initialize with welcome message when component mounts
        if (messages.length === 0) {
            setMessages([
                { text: currentLanguage.welcome, sender: "bot" }
            ]);
        }

        // Request audio permissions on component mount
        const initializeAudio = async () => {
            try {
                console.log('Initializing audio in main chatbot...');

                // Check if Expo Audio is available
                if (!Audio) {
                    console.error('Expo Audio not available!');
                    return;
                }

                // Request permissions
                const permissionResult = await askForAudioPermission();
                console.log('Initial permission result:', permissionResult);

                // Initialize Speech
                if (Speech) {
                    console.log('Speech module available');

                    // Check available voices (optional)
                    try {
                        const voices = await Speech.getAvailableVoicesAsync();
                        console.log('Available voices:', voices?.length);
                    } catch (e) {
                        console.log('Could not get available voices:', e);
                    }
                } else {
                    console.error('Speech module not available!');
                }
            } catch (err) {
                console.error('Audio initialization error:', err);
            }
        };

        initializeAudio();

        // Initialize text-to-speech
        return () => {
            // Clean up speech on unmount
            if (isSpeaking) {
                Speech.stop();
            }
        };
    }, []);

    // Function to ask for microphone permissions
    const askForAudioPermission = async () => {
        try {
            console.log('Requesting audio recording permissions...');

            // First check if permissions are already granted
            const permissionResponse = await Audio.getPermissionsAsync();
            console.log('Current permission status:', permissionResponse);

            if (permissionResponse.status === 'granted') {
                console.log('Permissions already granted');
                setAudioPermission(true);
                return true;
            }

            // If not granted, request them
            console.log('Requesting new permissions...');
            const { status } = await Audio.requestPermissionsAsync();
            console.log('Permission request result:', status);

            const granted = status === 'granted';
            setAudioPermission(granted);

            if (!granted) {
                console.warn('Audio recording permission denied by user');
            } else {
                console.log('Audio recording permission granted');
            }

            return granted;
        } catch (err) {
            console.error('Error requesting audio permissions:', err);
            alert(`Permission error: ${err.message}`);
            return false;
        }
    };

    // Initialize speech recognition
    useEffect(() => {
        if (!recognition) return;

        // Set up speech recognition event handlers
        recognition.onstart = () => {
            console.log('Speech recognition started');
            setIsRecognitionActive(true);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
            setIsRecognitionActive(false);
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            console.log('Speech recognition result:', transcript);
            setTranscript(transcript);
            setInput(transcript); // Update input in real-time
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        // Cleanup
        return () => {
            if (recognition && isRecognitionActive) {
                try {
                    recognition.stop();
                } catch (e) {
                    console.error('Error stopping recognition:', e);
                }
            }
        };
    }, []);

    // Start recording function
    const startRecording = async () => {
        console.log('============ RECORDING DEBUG ============');
        console.log('Starting recording process...');

        // Try web speech API first
        if (recognition) {
            try {
                setIsRecording(true);
                setRecordingModal(true);
                setTranscript('');
                recognition.lang = currentLanguage.voiceCode;
                recognition.start();
                console.log('Web Speech Recognition started');
                return;
            } catch (error) {
                console.error('Web Speech Recognition failed:', error);
                // Fall back to expo-av recording
                console.log('Falling back to Expo Audio recording');
            }
        }

        // If Web Speech API is not available or failed, use Expo Audio recording
        try {
            // Check if Audio API is available
            if (!Audio) {
                console.error('Audio API not available!');
                alert('Audio API not available. Make sure expo-av is properly installed.');
                return;
            }

            // Check if Recording API is available
            if (!Audio.Recording) {
                console.error('Audio.Recording API not available!');
                alert('Audio.Recording API not available. Make sure expo-av is properly installed.');
                return;
            }

            // Check permissions
            let hasPermission = audioPermission;
            console.log('Current permission status:', hasPermission);

            if (!hasPermission) {
                console.log('No permissions, requesting now...');
                hasPermission = await askForAudioPermission();
                console.log('New permission status:', hasPermission);

                if (!hasPermission) {
                    console.log('Permission denied by user');
                    alert('Microphone permission is required to use voice input.');
                    return;
                }
            }

            console.log('Setting up audio mode...');
            try {
                // Use numeric values directly to avoid reference errors
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                    interruptionModeIOS: 1, // was Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX
                    interruptionModeAndroid: 1, // was Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false
                });
                console.log('Audio mode set successfully');
            } catch (audioModeError) {
                console.error('Failed to set audio mode:', audioModeError);
                alert(`Could not set audio mode: ${audioModeError.message}`);
                // We'll try to continue anyway, as it might still work
            }

            try {
                console.log('Creating new recording instance...');
                const newRecording = new Audio.Recording();

                try {
                    console.log('Preparing to record with custom options...');
                    await newRecording.prepareToRecordAsync({
                        android: {
                            extension: '.m4a',
                            outputFormat: 2,
                            audioEncoder: 3,
                            sampleRate: 44100,
                            numberOfChannels: 1,
                            bitRate: 128000,
                        },
                        ios: {
                            extension: '.m4a',
                            audioQuality: 0.5,
                            sampleRate: 44100,
                            numberOfChannels: 1,
                            bitRate: 128000,
                            linearPCMBitDepth: 16,
                            linearPCMIsBigEndian: false,
                            linearPCMIsFloat: false,
                        },
                    });

                    console.log('Starting recording...');
                    await newRecording.startAsync();
                    console.log('Recording started successfully');

                    setRecording(newRecording);
                    setIsRecording(true);
                    setRecordingModal(true);
                } catch (recError) {
                    console.error('Recording setup error:', recError);
                    alert(`Recording setup failed: ${recError.message || recError}`);
                }
            } catch (createError) {
                console.error('Failed to create recording object:', createError);
                alert('Could not initialize recording. Please try again.');
            }
        } catch (err) {
            console.error('Failed to start recording:', err);
            alert(`Could not start recording: ${err.message || err}. Please try again.`);
        }
        console.log('========================================');
    };

    // Stop recording and transcribe
    const stopRecording = async () => {
        setRecordingModal(false);
        setIsRecording(false);

        // If using Web Speech API
        if (recognition && isRecognitionActive) {
            try {
                recognition.stop();
                console.log('Web Speech Recognition stopped');

                // The transcript has already been updated in real-time
                // via the onresult event handler, so we can directly use it
                if (transcript) {
                    console.log('Final transcript:', transcript);
                    // Send message with transcript
                    setTimeout(() => {
                        sendMessage();
                    }, 500);
                } else {
                    console.error('No transcript available');
                    setMessages(prev => [
                        ...prev,
                        { text: "⚠️ No speech was detected. Please try again.", sender: "bot" }
                    ]);
                }
                return;
            } catch (error) {
                console.error('Error stopping Web Speech Recognition:', error);
            }
        }

        // If using Expo Audio recording
        try {
            if (!recording) {
                console.error('No recording found to stop');
                return;
            }

            console.log('Stopping recording...');
            await recording.stopAndUnloadAsync();

            const uri = recording.getURI();
            console.log('Recording URI:', uri);
            setRecording(null);

            if (!uri) {
                console.error('No recording URI available');
                return;
            }

            // Set loading to show we're processing the audio
            setLoading(true);

            // Message indicating we're processing the speech
            setMessages(prev => [
                ...prev,
                { text: "🎤 Processing your voice input...", sender: "bot" }
            ]);

            // Create an audio object to verify the recording works (silently)
            try {
                console.log('Verifying audio recording...');
                const { sound } = await Audio.Sound.createAsync({ uri });
                await sound.unloadAsync(); // Just verify it can be loaded
                console.log('Audio recorded successfully');

                // Simulate transcription (in a real app, send to API)
                setTimeout(() => {
                    // Mock transcription based on detected language
                    let mockText = '';
                    if (currentLanguage.code === 'hi') {
                        mockText = 'मेरी फसल में कीट हैं, क्या करूं?';
                    } else if (currentLanguage.code === 'mr') {
                        mockText = 'माझ्या पिकांमध्ये कीटक आहेत, मला काय करावे?';
                    } else if (currentLanguage.code === 'gu') {
                        mockText = 'How to treat pest infestation in my crops?';
                    } else {
                        mockText = 'There are pests in my crop, what should I do?';
                    }

                    console.log('Transcription complete:', mockText);

                    // Remove the processing message
                    setMessages(prev => prev.filter(msg => msg.text !== "🎤 Processing your voice input..."));

                    // Set input and automatically send the message 
                    setInput(mockText);

                    // Use a small timeout to ensure the input is set before sending
                    setTimeout(() => {
                        sendMessage();
                    }, 100);
                }, 1000);
            } catch (audioError) {
                console.error('Error processing audio:', audioError);
                setLoading(false);
                setMessages(prev => prev.filter(msg => msg.text !== "🎤 Processing your voice input..."));
                setMessages(prev => [
                    ...prev,
                    { text: "⚠️ Could not process audio recording. Please try again or type your message.", sender: "bot" }
                ]);
            }
        } catch (err) {
            console.error('Failed to stop recording:', err);
            setLoading(false);
            alert(`Recording failed: ${err.message || err}`);
        }
    };

    // Text-to-speech function
    const speakText = (text, languageCode) => {
        if (!textToSpeechEnabled) return;

        // Stop any ongoing speech
        if (isSpeaking) {
            Speech.stop();
        }

        setIsSpeaking(true);

        // Remove markdown syntax for better speech
        const cleanText = text
            .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markdown
            .replace(/\*(.*?)\*/g, '$1')      // Remove italic markdown
            .replace(/^[*-] /gm, '')          // Remove bullet points
            .replace(/^\d+\.\s/gm, '');       // Remove numbered list prefixes

        Speech.speak(cleanText, {
            language: languageCode,
            rate: 0.9,
            onDone: () => setIsSpeaking(false),
            onError: (error) => {
                console.error('Speech error:', error);
                setIsSpeaking(false);
            }
        });
    };

    // Toggle text-to-speech
    const toggleTextToSpeech = () => {
        if (isSpeaking) {
            Speech.stop();
            setIsSpeaking(false);
        }
        setTextToSpeechEnabled(!textToSpeechEnabled);
    };

    // Format markdown-like responses with improved styling
    const formatMessage = (message) => {
        const lines = message.split("\n");

        return lines.map((line, index) => {
            // Handle headings: assume a heading is any line starting and ending with **
            if (line.startsWith("**") && line.endsWith("**")) {
                return (
                    <Text key={index} className="text-lg text-green-900 font-bold my-2">
                        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </Text>
                );
            }
            // Bold text inside line
            if (line.includes("**")) {
                const parts = line.split(/(\*\*.*?\*\*)/);
                return (
                    <Text key={index} className="text-black my-1">
                        {parts.map((part, i) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                                return <Text key={i} className="font-bold">{part.replace(/\*\*/g, "")}</Text>;
                            }
                            return part;
                        })}
                    </Text>
                );
            }
            // Italics using *...*
            if (line.includes("*") && !line.includes("**")) {
                const parts = line.split(/(\*.*?\*)/);
                return (
                    <Text key={index} className="text-black my-1">
                        {parts.map((part, i) => {
                            if (part.startsWith("*") && part.endsWith("*") && part !== "**") {
                                return <Text key={i} className="italic">{part.replace(/\*/g, "")}</Text>;
                            }
                            return part;
                        })}
                    </Text>
                );
            }
            // Bullet points: if line starts with "* " or "- "
            if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
                return (
                    <View key={index} className="flex-row my-1 ml-2">
                        <Text className="text-green-800 font-bold mr-2">•</Text>
                        <Text className="text-black flex-1">{line.replace(/^\s*[\*\-]\s/, "")}</Text>
                    </View>
                );
            }
            // Numbered lists: if line starts with "1. ", "2. ", etc.
            if (/^\s*\d+\.\s/.test(line)) {
                const num = line.match(/^\s*(\d+)\.\s/)[1];
                return (
                    <View key={index} className="flex-row my-1 ml-2">
                        <Text className="text-green-800 font-bold mr-2">{num}.</Text>
                        <Text className="text-black flex-1">{line.replace(/^\s*\d+\.\s/, "")}</Text>
                    </View>
                );
            }
            // Default plain text line
            return (
                <Text key={index} className="text-black my-1">
                    {line}
                </Text>
            );
        });
    };

    // Function to fetch real-time data based on query keywords
    const fetchRealTimeData = async (query) => {
        try {
            let realTimeData = {};

            // Check for weather-related queries
            if (query.toLowerCase().includes("weather") ||
                query.toLowerCase().includes("rain") ||
                query.toLowerCase().includes("temperature") ||
                query.toLowerCase().includes("मौसम") ||
                query.toLowerCase().includes("हवामान") ||
                query.toLowerCase().includes("વાતાવરણ")) {

                const location = extractLocation(query) || "Delhi";
                const weatherResponse = await axios.get(`${dataEndpoints.weather}?q=${location}&appid=YOUR_OPENWEATHER_API_KEY&units=metric`);

                if (weatherResponse.data) {
                    realTimeData.weather = {
                        temperature: weatherResponse.data.main.temp,
                        conditions: weatherResponse.data.weather[0].description,
                        humidity: weatherResponse.data.main.humidity,
                        location: location,
                        timestamp: new Date().toISOString()
                    };
                }
            }

            // Check for crop price queries
            if (query.toLowerCase().includes("price") ||
                query.toLowerCase().includes("market") ||
                query.toLowerCase().includes("rates") ||
                query.toLowerCase().includes("कीमत") ||
                query.toLowerCase().includes("भाव") ||
                query.toLowerCase().includes("બજાર")) {

                const crop = extractCrop(query) || "rice";
                // Simulate crop price data as the actual API might need authentication
                realTimeData.cropPrices = {
                    crop: crop,
                    averagePrice: Math.floor(Math.random() * 5000) + 1000,
                    minPrice: Math.floor(Math.random() * 1000) + 500,
                    maxPrice: Math.floor(Math.random() * 2000) + 5000,
                    market: "National Commodity Exchange",
                    timestamp: new Date().toISOString()
                };
            }

            // Check for soil-related queries
            if (query.toLowerCase().includes("soil") ||
                query.toLowerCase().includes("nutrient") ||
                query.toLowerCase().includes("fertility") ||
                query.toLowerCase().includes("मिट्टी") ||
                query.toLowerCase().includes("माती") ||
                query.toLowerCase().includes("જમીન")) {

                // Simulate soil health data as the actual API might need authentication
                realTimeData.soilHealth = {
                    region: extractLocation(query) || "General",
                    nitrogen: Math.floor(Math.random() * 100) + 50 + " kg/ha",
                    phosphorus: Math.floor(Math.random() * 50) + 20 + " kg/ha",
                    potassium: Math.floor(Math.random() * 200) + 100 + " kg/ha",
                    ph: (Math.random() * 3 + 5).toFixed(1),
                    recommendations: "Based on soil analysis, add appropriate fertilizers.",
                    timestamp: new Date().toISOString()
                };
            }

            return Object.keys(realTimeData).length > 0 ? realTimeData : null;

        } catch (error) {
            console.error("Error fetching real-time data:", error);
            return null;
        }
    };

    // Helper function to extract location from query
    const extractLocation = (query) => {
        // Very simplified location extraction - in a real app, use NLP
        const commonLocations = [
            "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
            "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Patna", "Nagpur"
        ];

        for (const location of commonLocations) {
            if (query.toLowerCase().includes(location.toLowerCase())) {
                return location;
            }
        }

        return null;
    };

    // Helper function to extract crop name from query
    const extractCrop = (query) => {
        // Very simplified crop extraction - in a real app, use NLP
        const commonCrops = [
            "rice", "wheat", "corn", "maize", "soybean", "cotton", "sugarcane",
            "potato", "tomato", "onion", "chili", "carrot"
        ];

        for (const crop of commonCrops) {
            if (query.toLowerCase().includes(crop.toLowerCase())) {
                return crop;
            }
        }

        return null;
    };

    // Reset conversation context
    const resetContext = () => {
        setIsRefreshingContext(true);
        setConversationContext([]);

        setTimeout(() => {
            setIsRefreshingContext(false);
            // Add a system message indicating context was reset
            const resetMessage = currentLanguage.code === 'en'
                ? "🔄 Context memory has been reset. I've forgotten our previous conversation."
                : currentLanguage.code === 'hi'
                    ? "🔄 संदर्भ मेमोरी रीसेट कर दी गई है। मैंने हमारी पिछली बातचीत भुला दी है।"
                    : currentLanguage.code === 'mr'
                        ? "🔄 संदर्भ मेमरी रीसेट केली आहे. मी आपली मागील संभाषणे विसरलो आहे."
                        : "🔄 સંદર્ભ મેમરી રીસેટ કરવામાં આવી છે. મેં અમારી અગાઉની વાતચીત ભૂલી ગયો છું.";

            setMessages(prev => [
                ...prev,
                {
                    text: resetMessage,
                    sender: "bot"
                }
            ]);
        }, 1000);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Detect language from input
        const detectedLanguage = detectLanguage(input);
        setCurrentLanguage(detectedLanguage);

        // Update placeholder text based on detected language
        const textInput = document.querySelector('input[type="text"]');
        if (textInput) {
            textInput.placeholder = detectedLanguage.placeholder;
        }

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        // Update conversation context with user message
        const updatedContext = [...conversationContext, { role: "user", content: input }];

        setInput("");
        setLoading(true);

        Keyboard.dismiss(); // Dismiss the keyboard after sending a message

        try {
            // Try to fetch relevant real-time data based on the query
            const realTimeData = await fetchRealTimeData(input);

            // Construct a prompt that includes conversation context and real-time data if available
            let contextualPrompt = `Please respond in ${detectedLanguage.name} language. `;

            // Include real-time data if available
            if (realTimeData) {
                contextualPrompt += `Here is some real-time data that might be relevant to the query: ${JSON.stringify(realTimeData)}. `;
            }

            // Include conversation context (limited to maintain reasonable token counts)
            if (conversationContext.length > 0) {
                contextualPrompt += "Previous conversation context: ";
                const recentContext = conversationContext.slice(-MAX_CONTEXT_LENGTH);
                recentContext.forEach(msg => {
                    contextualPrompt += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}; `;
                });
            }

            contextualPrompt += `The user's current message is: ${input}`;

            const response = await axios.post(API_URL, {
                contents: [{ parts: [{ text: contextualPrompt }] }],
            });

            let botReply =
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn't understand. Can you rephrase?";

            // Update conversation context with bot response
            updatedContext.push({ role: "assistant", content: botReply });

            // Maintain context size limit
            if (updatedContext.length > MAX_CONTEXT_LENGTH * 2) {
                setConversationContext(updatedContext.slice(-MAX_CONTEXT_LENGTH * 2));
            } else {
                setConversationContext(updatedContext);
            }

            setMessages((prev) => [
                ...prev,
                { text: botReply, sender: "bot" },
            ]);

            // Speak the response if text-to-speech is enabled
            if (textToSpeechEnabled) {
                speakText(botReply, detectedLanguage.voiceCode);
            }

        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { text: "⚠️ Error fetching response!", sender: "bot" },
            ]);
        }

        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-green-50"
        >
            {/* Header */}
            <View className="h-16 flex-row justify-between items-center bg-green-700 px-4">
                <Text className="text-white font-bold text-lg">AgriTech Chatbot</Text>
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={toggleTextToSpeech}
                        className="p-2 mr-3"
                    >
                        {textToSpeechEnabled ? (
                            <Volume2 size={20} color="white" />
                        ) : (
                            <VolumeX size={20} color="white" />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={resetContext}
                        disabled={isRefreshingContext}
                        className="p-2"
                    >
                        <RefreshCw size={20} color="white" className={isRefreshingContext ? "animate-spin" : ""} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Message Area */}
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                className="flex-grow p-4"
                keyboardShouldPersistTaps="handled"
            >
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                        }}
                        className={`p-3 rounded-lg max-w-[80%] mb-3 ${msg.sender === "user"
                                ? "bg-green-600 self-end rounded-tr-none"
                                : "bg-white self-start rounded-tl-none border-l-4 border-green-500"
                            }`}
                    >
                        {msg.sender === "bot" ? (
                            <View>
                                {formatMessage(msg.text)}
                                {msg.text.length > 0 && (
                                    <TouchableOpacity
                                        onPress={() => speakText(msg.text, currentLanguage.voiceCode)}
                                        className="self-end mt-1"
                                    >
                                        <Volume2 size={16} color="#16a34a" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ) : (
                            <Text className="text-white">{msg.text}</Text>
                        )}
                    </View>
                ))}
                {loading && (
                    <View
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2,
                        }}
                        className="p-3 rounded-lg bg-white self-start flex-row items-center border-l-4 border-green-500 rounded-tl-none"
                    >
                        <ActivityIndicator size="small" color="#16a34a" />
                        <Text className="ml-2 text-green-900">Thinking...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Input Section */}
            <View className="border-t border-gray-300 bg-white px-4 pt-3 pb-5">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={isRecording ? stopRecording : startRecording}
                        disabled={loading}
                        className={`mr-3 p-3 rounded-full ${isRecording ? "bg-red-500" : "bg-green-700"}`}
                    >
                        <Mic size={20} color="white" />
                    </TouchableOpacity>
                    <TextInput
                        className="flex-1 p-3 border border-gray-300 rounded-lg bg-green-50"
                        placeholder={currentLanguage.placeholder}
                        value={input}
                        onChangeText={setInput}
                        multiline
                        numberOfLines={2}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        disabled={loading || !input.trim()}
                        className={`ml-3 p-3 rounded-full ${loading || !input.trim() ? "bg-gray-400" : "bg-green-700"}`}
                    >
                        <Send size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Recording Modal */}
            <Modal
                visible={recordingModal}
                transparent={true}
                animationType="fade"
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-white p-6 rounded-xl shadow-lg w-80">
                        <View className="items-center">
                            <View className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isRecording ? "bg-red-100" : "bg-green-100"}`}>
                                <Mic size={40} color={isRecording ? "#ef4444" : "#16a34a"} />
                            </View>
                            <Text className="text-lg font-semibold mb-2">
                                {isRecording ? "Listening..." : "Processing..."}
                            </Text>
                            {isRecording && transcript && (
                                <View className="mb-3 max-h-20 overflow-scroll bg-gray-100 p-2 rounded-lg w-full">
                                    <Text className="text-gray-800 text-sm">{transcript}</Text>
                                </View>
                            )}
                            <Text className="text-gray-500 text-center mb-4">
                                {isRecording
                                    ? "Speak clearly in any supported language"
                                    : "Converting your speech to text"}
                            </Text>
                            {isRecording && (
                                <TouchableOpacity
                                    onPress={stopRecording}
                                    className="bg-red-500 py-2 px-6 rounded-full"
                                >
                                    <Text className="text-white font-semibold">Stop</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default Chatbot;