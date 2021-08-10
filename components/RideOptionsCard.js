import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import "intl";

import "intl/locale-data/jsonp/en";
import { useSelector } from "react-redux";

import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber-X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber-XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber-LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];
//If have SURGE priceing gors up

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`   `}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigationCard")}
          style={tw`absolute  left-8 top-1 top-3   rounded-full z-50`}
        >
          <Icon
            name="chevron-left"
            type="fontawesome"
            color="black"
            size={37}
          />
        </TouchableOpacity>
        <Text
          style={tw`text-center py-4 text-xl bg-gray-50 text-black font-normal`}
        >
          {" "}
          Select a Ride - {travelTimeInformation?.distance?.text}{" "}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between  mb-1 px-2 rounded-2xl  ${
              id === selected?.id && "bg-gray-200"
            } `}
          >
            <Image
              style={{
                width: 89,
                height: 80,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6 pl-2`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text style={tw`text-gray-600`}>
                {travelTimeInformation?.duration?.text} Travel Time{" "}
              </Text>
            </View>
            <View>
              <Text style={tw`text-xl  `}>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  (travelTimeInformation?.duration?.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100
                )}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 rounded-xl ${
            !selected && "bg-gray-300"
          } `}
        >
          <Text style={tw`text-center text-white text-xl`}>
            {!selected && "Choos"} {selected && ` Go With ${selected?.title}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
