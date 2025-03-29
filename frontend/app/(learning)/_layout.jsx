import { router, Stack } from 'expo-router'
import { Pressable } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
// import { useAuth } from '@clerk/clerk-expo'

export default function LearningLayout() {

    return (
        <Stack>
            <Stack.Screen name='learn-main' options={{
                headerShown: true,
                headerTitle: "",
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='details' options={{
                headerShown: true,
                headerTitle: "",
                headerStyle: { backgroundColor: '#16A34A' },
                headerTintColor: 'white',
                headerTintStyle: { scale: 0.9 },
                headerShadowVisible: false,
                headerShown: false,
            }} />
            <Stack.Screen name='learn' options={{
                headerTitle: "",
                headerStyle: { backgroundColor: '#16A34A' },
                headerTintColor: 'white',
                headerLeft: () => {
                    return (
                        <Pressable className='w-12 h-12 rounded-full flex justify-center items-center backdrop-blur-xl bg-white/20 mt-4'
                            onPress={() => {
                                router.back();
                            }}>
                            < ArrowLeft size={22} color="white" />
                        </Pressable>
                    )
                },
                headerShadowVisible: false,
                headerShown: false,
            }} />
        </Stack >
    )

}