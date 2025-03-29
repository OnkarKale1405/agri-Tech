import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { useSignIn, useUser, useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session'
import { useRouter, Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Login() {
    const { startSSOFlow } = useSSO();
    const { signIn, isLoaded, setActive } = useSignIn();
    const { user } = useUser();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Email & Password Login
    const onLoginPress = useCallback(async () => {
        if (!isLoaded || loading) return;
        setError('');
        setLoading(true);

        try {
            const result = await signIn.create({ identifier: email, password });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                await user?.reload();
                router.replace('/(learning)/learn-main');
            } else {
                setError('Login failed. Try again.');
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Login failed. Try again.');
        } finally {
            setLoading(false);
        }
    }, [email, password, isLoaded, loading, signIn, router]);

    // Google OAuth Login
    const signInWithGoogle = async () => {
        try {
            const { createdSessionId } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: AuthSession.makeRedirectUri(),
            });

            if (createdSessionId) {
                await setActive({ session: createdSessionId });
                await user?.reload();
                if (user) {
                    router.replace("/(learning)/learn-main");
                }
            }
        } catch (err) {
            console.error("Google Sign-in Error:", err);
        }
    };

    if (!isLoaded) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white p-6 justify-center">
            <Text className="text-4xl font-bold text-emerald-600 text-center mb-4">Kisan AI</Text>
            <Text className="text-lg text-center text-gray-600 mb-6">Register or sign in and we'll get started.</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                className="border border-gray-300 rounded-lg p-4 mb-4 text-base"
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="border border-gray-300 rounded-lg p-4 mb-2 text-base"
            />

            <View className="flex-row justify-end mb-6">
                <Pressable asChild>
                    <Link href={"/(auth)/forgot-password"}>
                        <Text className="text-blue-600">Forgot password?</Text>
                    </Link>
                </Pressable>
            </View>

            <Pressable
                onPress={onLoginPress}
                disabled={loading}
                className="bg-green-600 rounded-lg p-4 mb-6"
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center text-lg font-bold">Sign in with email</Text>
                )}
            </Pressable>

            <View className="flex-row items-center mb-6">
                <View className="flex-1 h-[1px] bg-gray-300"></View>
                <Text className="mx-4 text-gray-600">or continue with</Text>
                <View className="flex-1 h-[1px] bg-gray-300"></View>
            </View>

            <View className="flex-row justify-center gap-2">
                <TouchableOpacity className="border rounded-full border-blue-600 p-3">
                    <AntDesign name="facebook-square" size={24} color="#2563eb" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={signInWithGoogle}
                    className="border rounded-full border-green-600 p-3"
                >
                    <AntDesign name="google" size={24} color="#16a34a" />
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-6">
                <Text className="text-gray-600">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                    <Text className="text-blue-600 font-bold">Register now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}