import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Stack, useNavigation } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { markers } from '../../assets/markets';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';

const INITIAL_REGION = {
  latitude: 48.6059364,
  longitude: 7.7804396,
  latitudeDelta: 0.5206199232625792,
  longitudeDelta: 1.999997869133935
};

export default function TabOneScreen() {
  const items = useMemo(() => listingsData as any, []);

  const mapRef = useRef<any>(null);
  const navigation = useNavigation();
  const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>('Tiny homes');

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity onPress={focusMap}>
  //         <View style={{ padding: 10 }}>
  //           <Text>Focus</Text>
  //         </View>
  //       </TouchableOpacity>
  //     )
  //   });
  // }, []);

  // const focusMap = () => {
  //   const GreenBayStadium = {
  //     latitude: 44.5013,
  //     longitude: -88.0622,
  //     latitudeDelta: 0.1,
  //     longitudeDelta: 0.1
  //   };
  //   mapRef.current?.animateToRegion(GreenBayStadium);

  //   // Or change the camera with a duration
  //   // mapRef.current?.animateCamera({ center: GreenBayStadium, zoom: 10 }, { duration: 2000 });
  // };

  // const onRegionChange = (region: Region) => {
  //   console.log(region);
  // };

  // const onMarkerSelected = (marker: any) => {
	// 	Alert.alert(marker.name);
	// };

	// const calloutPressed = (ev: any) => {
	// 	console.log(ev);
	// };

  return (
    <View style={styles.container}>
      {/* Define pour custom header */}
      {/* <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      /> */}
      {/* <MapView style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
				ref={mapRef}
        onRegionChangeComplete={onRegionChange}
        >
          {markers.map((marker, index) => (
					<Marker
						key={index}
						title={marker.name}
						coordinate={marker}
						onPress={() => onMarkerSelected(marker)}
					>
						<Callout onPress={calloutPressed}>
							<View style={{ padding: 10 }}>
								<Text style={{ fontSize: 24 }}>Hello Éric</Text>
							</View>
						</Callout>
					</Marker>
				))}
      </MapView> */}
      <ListingsMap listings={getoItems}/>
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
