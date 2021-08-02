import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pm",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NaveOptions = () => {
  return <FlatList data={data} />;
};

export default NaveOptions;

const styles = StyleSheet.create({});
