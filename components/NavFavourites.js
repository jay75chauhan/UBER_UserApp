import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street , Gujrat , INDIA",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Code Street , Adipur ,INDIA",
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      style={tw`overflow-hidden mt-3`}
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, icon, destination } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center py-3 px-5 bg-gray-100 rounded-xl   mb-5 shadow-sm`}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}> {destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
