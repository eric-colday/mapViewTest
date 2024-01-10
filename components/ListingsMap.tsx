import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { router, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 48.6059364,
    longitude: 7.7804396,
    latitudeDelta: 0.5206199232625792,
    longitudeDelta: 1.999997869133935
};

export default function ListingsMap({ listings }: Props) {
    const router = useRouter();
    const mapRef = useRef<any>(null);

    // When the component mounts, locate the user
    useEffect(() => {
        onLocateMe();
    }, []);

    // When a marker is selected, navigate to the listing page
    const onMarkerSelected = (event: any) => {
        router.push(`/listing/${event.properties.id}`);
    };

    // Focus the map on the user's location
    const onLocateMe = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 7,
            longitudeDelta: 7,
        };

        mapRef.current?.animateToRegion(region);
    };

    // Overwrite the renderCluster function to customize the cluster markers
    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;

        const points = properties.point_count;
        return (
            <Marker
                key={`cluster-${id}`}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
                onPress={onPress}>
                <View style={styles.marker}>
                    <Text
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'mon-sb',
                        }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        );
    };


    return (
        <View style={styles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                clusterColor="#fff"
                clusterTextColor="#000"
                initialRegion={INITIAL_REGION}
                renderCluster={renderCluster}
            >
                {/* Render all our marker as usual */}
                {listings.features.map((item: any) => (
                    <Marker
                        coordinate={{
                            latitude: item.properties.latitude,
                            longitude: item.properties.longitude,
                        }}
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}>
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>€ {item.properties.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
            <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
                <Ionicons name="navigate" size={24} color={Colors.dark} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        // fontFamily: 'mon-sb',
    },
    locateBtn: {
        position: 'absolute',
        top: 70,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
});