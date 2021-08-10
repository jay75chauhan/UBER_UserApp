import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAP_KEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    //Zoom & fit to marker

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 200, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  //distance matrix
  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin?.description}&destinations=${destination?.description}&key=${GOOGLE_MAP_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAP_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1 `}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          lineDashPattern={[0]}
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAP_KEY}
          strokeColor="black"
          strokeWidth={5}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        >
          {/* <Image
            source={require("../assets/images/red.png")}
            style={{ width: 60, height: 60, resizeMode: "contain" }}
          /> */}
        </Marker>
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        >
          {/* <Image
            source={require("../assets/images/top-UberX.png")}
            style={{ width: 70, height: 70, resizeMode: "contain" }}
          /> */}
        </Marker>
      )}
    </MapView>
  );
};

export default Map;
