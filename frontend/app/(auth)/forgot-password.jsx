import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
    const { signIn, isLoaded } = useSignIn();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState('requestReset'); // 'requestReset' | 'enterCode' | 'resetPassword'

    const onRequestResetPress = async () => {
        if (!isLoaded || loading) return;
        setError('');
        setLoading(true);

        try {
            // Step 1: Create a sign-in attempt
            const signInAttempt = await signIn.create({
                identifier: email,
            });

            // Step 2: Get the email address ID from the response
            const emailAddressId = signInAttempt.supportedFirstFactors.find(
                (factor) => factor.strategy === 'reset_password_email_code'
            )?.emailAddressId;

            if (!emailAddressId) {
                throw new Error('No email address found for password reset.');
            }

            // Step 3: Start password reset with the emailAddressId
            await signInAttempt.prepareFirstFactor({
                strategy: 'reset_password_email_code',
                emailAddressId: emailAddressId,
            });

            setStep('enterCode'); // Move to code entry step
        } catch (err) {
            console.error('Password reset error:', err);

            if (err.errors && err.errors.length > 0) {
                const clerkError = err.errors[0];

                switch (clerkError.code) {
                    case 'form_identifier_not_found':
                    case 'identifier_not_found':
                        setError('No account found with this email address.');
                        break;
                    default:
                        setError(clerkError.message || 'Password reset request failed. Try again.');
                }
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    const onVerifyCodePress = async () => {
        if (!isLoaded || loading) return;
        setError('');
        setLoading(true);

        try {
            await signIn.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code: resetCode
            });

            setStep('resetPassword');
        } catch (err) {
            console.error('Code verification error:', err);
            setError(err.errors?.[0]?.message || 'Verification failed. Check the code and try again.');
        } finally {
            setLoading(false);
        }
    };

    const onResetPasswordPress = async () => {
        if (!isLoaded || loading) return;
        setError('');
        setLoading(true);

        try {
            await signIn.resetPassword({
                password
            });

            // Navigate to login or home screen after successful password reset
            router.replace('/(auth)/login');
        } catch (err) {
            console.error('Password reset error:', err);
            setError(err.errors?.[0]?.message || 'Password reset failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    // Request Reset Password Screen
    if (step === 'requestReset') {
        return (
            <View className="flex-1 bg-white p-6 justify-center">
                <Text className="text-4xl font-bold text-emerald-600 text-center mb-4">Reset Password</Text>
                <Text className="text-lg text-center text-gray-600 mb-6">
                    Enter your email to reset your password
                </Text>

                <TextInput
                    value={email}
                    placeholder="Email"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="border border-gray-300 rounded-lg p-4 mb-4 text-base"
                />

                {error ? <Text className="text-red-500 text-center mb-3">{error}</Text> : null}

                <TouchableOpacity
                    onPress={onRequestResetPress}
                    disabled={loading || !email}
                    className={`rounded-lg p-4 mb-6 ${email ? 'bg-green-600' : 'bg-gray-300'}`}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-center text-lg font-bold">Send Reset Code</Text>
                    )}
                </TouchableOpacity>

                <View className="flex-row justify-center">
                    <Text className="text-gray-600">Remember your password? </Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                        <Text className="text-blue-600 font-bold">Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Verify Reset Code Screen
    if (step === 'enterCode') {
        return (
            <View className="flex-1 bg-white p-6 justify-center">
                <Text className="text-4xl font-bold text-emerald-600 text-center mb-4">Verify Code</Text>
                <Text className="text-lg text-center text-gray-600 mb-6">
                    Enter the 6-digit code sent to your email
                </Text>

                <TextInput
                    value={resetCode}
                    placeholder="Reset Code"
                    onChangeText={setResetCode}
                    keyboardType="numeric"
                    maxLength={6}
                    className="border border-gray-300 rounded-lg p-4 mb-4 text-base text-center"
                />

                {error ? <Text className="text-red-500 text-center mb-3">{error}</Text> : null}

                <TouchableOpacity
                    onPress={onVerifyCodePress}
                    disabled={loading || resetCode.length !== 6}
                    className={`rounded-lg p-4 mb-6 ${resetCode.length === 6 ? 'bg-green-600' : 'bg-gray-300'}`}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-center text-lg font-bold">Verify Code</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setStep('requestReset')}
                    className="items-center"
                >
                    <Text className="text-blue-600 text-lg">Resend Code</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white p-6 justify-center">
            <Text className="text-4xl font-bold text-emerald-600 text-center mb-4">Reset Password</Text>
            <Text className="text-lg text-center text-gray-600 mb-6">
                Enter your email to reset your password
            </Text>

            <TextInput
                value={email}
                placeholder="Email"
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                className="border border-gray-300 rounded-lg p-4 mb-4 text-base"
            />

            {error ? <Text className="text-red-500 text-center mb-3">{error}</Text> : null}

            <TouchableOpacity
                onPress={onRequestResetPress}
                disabled={loading || !email}
                className={`rounded-lg p-4 mb-6 ${email ? 'bg-green-600' : 'bg-gray-300'}`}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center text-lg font-bold">Send Reset Code</Text>
                )}
            </TouchableOpacity>

            <View className="flex-row justify-center">
                <Text className="text-gray-600">Remember your password? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                    <Text className="text-blue-600 font-bold">Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}