import React from "react";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";

const PlaceRow = ({ data }) => {
  return (
    <View style={tw`flex-row items-center `}>
      <Icon name="location-outline" type="ionicon" color="black" size={22} />

      <Text>{data.description || data.vicinity}</Text>
    </View>
  );
};

export default PlaceRow;
