import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonPrimary from "../components/atoms/ButtonPrimary";
import { Plant } from "../utils/data";

interface Props {
  plant: Plant;
  onBack: () => void;
}

export default function PlantDetailScreen({ plant, onBack }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Tanaman</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>Nama Tanaman:</Text>
        <Text style={styles.value}>{plant.name}</Text>

        <Text style={styles.label}>Jenis:</Text>
        <Text style={styles.value}>{plant.type || "-"}</Text>

        <Text style={styles.label}>Tanggal Tanam:</Text>
        <Text style={styles.value}>{plant.date || "-"}</Text>
      </View>

      <ButtonPrimary title="Kembali ke Daftar" onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#2E7D32",
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
});
