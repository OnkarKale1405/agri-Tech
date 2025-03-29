import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return <Redirect href={'/(learning)/learn-main'} />
    }

    return <Stack screenOptions={{
        headerShown: false,
    }} >
        {/* <Stack.Screen
            name="index"
            options={{
                headerTitle: 'Login',
                headerShown: true,
            }}
        /> */}
        <Stack.Screen
            name='login'
            options={{
                headerTitle: '',
                headerShown: true,
                headerShadowVisible: false,
            }} />
        <Stack.Screen name='register'
            options={{
                headerTitle: '',
                headerShown: true,
                headerShadowVisible: false,
            }} />
        <Stack.Screen name='forgot-password'
            options={{
                headerTitle: '',
                headerShown: true,
                headerShadowVisible: false,
            }} />
    </Stack>
}