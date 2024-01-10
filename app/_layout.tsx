import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => (
	<Stack
        initialRouteName="index"
        screenOptions={{ headerShown: false }}
    >
		<Stack.Screen name="index" options={{ title: 'Home' }} />
	</Stack>
);

export default Layout;