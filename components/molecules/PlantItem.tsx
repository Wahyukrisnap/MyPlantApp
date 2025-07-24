import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Plant } from "../../utils/data";

interface Props {
  plant: Plant;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PlantItem({ plant, onView, onEdit, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{plant.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onView}>
          <Text style={styles.action}>Lihat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.action}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontWeight: "bold" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  action: { color: "blue" },
  delete: { color: "red" },
});
