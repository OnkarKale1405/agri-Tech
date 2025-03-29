import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';

export default function Register() {
    const { signUp, isLoaded, setActive } = useSignUp();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);

    const handleCodeChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Move to next input field if available
        if (text && index < code.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Collapse the keyboard when all digits are filled
        if (newCode.every(digit => digit !== "")) {
            Keyboard.dismiss();
        }
    };

    const onSignUpPress = async () => {
        if (!isLoaded || loading) return;
        setError('');
        setLoading(true);

        try {
            await signUp.create({
                emailAddress: email,
                publicMetadata: { username },
                password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Sign-up failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded || loading) return;
        setError('');
        setLoading(true);

        const verificationCode = code.join('');

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verificationCode
            });

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/(auth)/login');
            } else {
                setError('Verification failed. Check the code and try again.');
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Verification failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const onResendCode = async () => {
        if (!isLoaded) return;
        setError('');

        try {
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Failed to resend code.');
        }
    };

    if (pendingVerification) {
        return (
            <View className="flex-1 bg-white p-6 justify-center">
                <Text className="text-4xl font-bold text-emerald-600 text-center mb-4">Verify Email</Text>
                <Text className="text-lg text-center text-gray-600 mb-6">
                    Enter the 6-digit code we emailed
                </Text>
                <Text className="text-sm text-center text-gray-600 mb-6">
                    This helps us keep your account secure by verifying that it's really you.
                </Text>

                <View className="flex-row justify-center space-x-2 mb-6">
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => inputRefs.current[index] = ref}
                            value={digit}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            className={`w-12 h-16 border rounded-lg text-center text-2xl 
                                ${digit ? 'border-emerald-600' : 'border-gray-300'}`}
                        />
                    ))}
                </View>

                {error ? <Text className="text-red-500 text-center mb-3">{error}</Text> : null}

                <TouchableOpacity
                    onPress={onVerifyPress}
                    disabled={loading || code.some(digit => digit === '')}
                    className={`rounded-lg p-4 mb-4 ${code.every(digit => digit !== '')
                        ? 'bg-green-600'
                        : 'bg-gray-300'
                        }`}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-center text-lg font-bold">Verify</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onResendCode}
                    className="items-center"
                >
                    <Text className="text-blue-600 text-lg">Resend Code</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white p-6 justify-center">
            <Text className="text-4xl font-bold text-emerald-600 text-center mb-4">Kisan AI</Text>
            <Text className="text-lg text-center text-gray-600 mb-6">Create your account</Text>

            <TextInput
                value={email}
                placeholder="Email"
                onChangeText={setEmail}
                autoCapitalize="none"
                className="border border-gray-300 rounded-lg p-4 mb-4 text-base"
            />

            <TextInput
                value={username}
                placeholder="Username"
                onChangeText={setUsername}
                className="border border-gray-300 rounded-lg p-4 mb-4 text-base"
            />

            <TextInput
                value={password}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                className="border border-gray-300 rounded-lg p-4 mb-4 text-base"
            />

            {error ? <Text className="text-red-500 text-center mb-3">{error}</Text> : null}

            <TouchableOpacity
                onPress={onSignUpPress}
                disabled={loading}
                className="bg-green-600 rounded-lg p-4 mb-6"
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center text-lg font-bold">Sign Up</Text>
                )}
            </TouchableOpacity>

            <View className="flex-row justify-center">
                <Text className="text-gray-600">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                    <Text className="text-blue-600 font-bold">Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}