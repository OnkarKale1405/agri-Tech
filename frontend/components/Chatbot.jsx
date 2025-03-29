import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { X, Send, Leaf, Sparkle } from "lucide-react-native";

// API Configuration
const API_KEY = "AIzaSyCztjmipRapoDY1gp-VcMD0WF0YkO6fTiY"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);

    useEffect(() => {
        Animated.timing(scaleAnim, {
            toValue: open ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [open]);

    useEffect(() => {
        if (open && messages.length === 0) {
            // Initial welcome message
            setMessages([
                {
                    text: "🌿 Welcome to AgriTech Chatbot! Ask me about crops, soil health, or market prices.",
                    sender: "bot",
                },
            ]);
        }
    }, [open]);

    // Format markdown-like responses
    const formatMessage = (message) => {
        const lines = message.split("\n");

        return lines.map((line, index) => {
            // Handle headings and bold text: assume a heading is any line starting and ending with **
            if (line.startsWith("**") && line.endsWith("**")) {
                return (
                    <Text key={index} className="text-lg text-black font-bold my-1">
                        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </Text>
                );
            }
            // Bold text inside line
            if (line.includes("**")) {
                return (
                    <Text key={index} className="text-black font-bold">
                        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </Text>
                );
            }
            // Italics using *...*
            if (line.includes("*")) {
                return (
                    <Text key={index} className="text-black italic">
                        {line.replace(/\*(.*?)\*/g, "$1")}
                    </Text>
                );
            }
            // Bullet points: if line starts with "* "
            if (line.trim().startsWith("* ")) {
                return (
                    <View key={index} className="flex-row my-1">
                        <Text className="text-black">• </Text>
                        <Text className="text-black flex-1">{line.replace("* ", "")}</Text>
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

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        // Show temporary thinking message
        setMessages((prev) => [...prev, { text: "🤔 Thinking...", sender: "bot" }]);

        try {
            const response = await axios.post(API_URL, {
                contents: [{ parts: [{ text: input }] }],
            });

            let botReply =
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn't understand. Can you rephrase?";

            // Replace the "Thinking..." message with the actual response
            setMessages((prev) => [
                ...prev.slice(0, -1),
                { text: botReply, sender: "bot" },
            ]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev.slice(0, -1),
                { text: "⚠️ Error fetching response!", sender: "bot" },
            ]);
        }

        setLoading(false);
    };

    return (
        <View className="absolute bottom-5 right-5">
            {/* Floating Chat Button */}
            {!open && (
                <TouchableOpacity
                    onPress={() => setOpen(true)}
                    className="bg-green-700 p-4 rounded-full shadow-lg"
                >
                    <Leaf size={24} color="white" />
                </TouchableOpacity>
            )}

            {/* Chat Window (fixed 450px height) */}
            {open && (
                <Animated.View
                    style={{
                        transform: [{ scale: scaleAnim }],
                        overflow: "hidden",
                    }}
                    className="w-96 h-[450px] bg-green-100 rounded-xl shadow-lg"
                >
                    {/* Header */}
                    <View className="h-16 flex-row justify-between items-center bg-green-700 p-4 rounded-t-xl">
                        <Text className="text-white font-bold flex justify-center  items-center gap-2">
                            <Sparkle />
                            Chatbot
                        </Text>
                        <TouchableOpacity onPress={() => setOpen(false)}>
                            <X size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Message Area */}
                    <View style={{ height: 322 }}>
                        <ScrollView
                            ref={scrollViewRef}
                            onContentSizeChange={() =>
                                scrollViewRef.current?.scrollToEnd({ animated: true })
                            }
                            className="p-4 bg-green-50"
                        >
                            {messages.map((msg, index) => (
                                <View
                                    key={index}
                                    className={`p-3 rounded-lg max-w-[80%] mb-2 ${msg.sender === "user"
                                        ? "bg-green-500 text-black self-end"
                                        : "bg-green-300 text-black self-start"
                                        }`}
                                >
                                    {msg.sender === "bot" ? (
                                        formatMessage(msg.text)
                                    ) : (
                                        <Text className="text-black">{msg.text}</Text>
                                    )}
                                </View>
                            ))}
                            {loading && (
                                <View className="p-3 rounded-lg bg-gray-300 self-start flex-row items-center">
                                    <ActivityIndicator size="small" color="green" />
                                    <Text className="ml-2 text-black">Thinking...</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>

                    {/* Input Section */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <View className="h-16 flex-row items-center p-3 border-t border-gray-300 bg-green-200">
                            <TextInput
                                className="flex-1 p-2 border border-gray-400 rounded-lg bg-white overflow-hidden"
                                placeholder="🌱 Ask about crops, soil, or prices..."
                                value={input}
                                onChangeText={setInput}
                                multiline
                                numberOfLines={2}
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                                disabled={loading}
                                className={`ml-3 p-3 rounded-lg ${loading ? "bg-gray-400" : "bg-green-700"
                                    }`}
                            >
                                <Send size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Animated.View>
            )}
        </View>
    );
};

export default Chatbot;