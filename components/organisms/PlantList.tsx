import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Interface Plant langsung di sini
interface Plant {
  id: number;
  name: string;
  type: string;
  date: string;
}

// Data awal (dummy)
const initialPlants: Plant[] = [
  { id: 1, name: "Aglonema Red", type: "Aglonema", date: "2025-07-20" },
  { id: 2, name: "Monstera Deliciosa", type: "Monstera", date: "2025-07-18" },
  { id: 3, name: "Calathea Orbifolia", type: "Calathea", date: "2025-07-15" },
];

interface Props {
  onBack: () => void;
  onAdd: () => void;
  onViewDetail: (plant: Plant) => void;
  onEdit: (plant: Plant) => void;
}

export default function PlantListScreen({
  onBack,
  onAdd,
  onViewDetail,
  onEdit,
}: Props) {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);

  // Fungsi hapus data
  const handleDelete = (id: number) => {
    Alert.alert("Konfirmasi", "Yakin hapus tanaman ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          console.log("Deleting plant with ID:", id);
          setPlants((prev) => prev.filter((p) => p.id !== id));
        },
      },
    ]);
  };

  // Komponen tombol sederhana (inline)
  const Button = ({
    title,
    onPress,
    color = "#4CAF50",
  }: {
    title: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  // Komponen item tanaman
  const PlantItem = ({ plant }: { plant: Plant }) => (
    <View style={styles.itemRow}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onViewDetail(plant)}>
        <Text style={styles.itemText}>{plant.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={() => onEdit(plant)}>
        <Text style={styles.buttonSmall}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(plant.id)}
      >
        <Text style={styles.buttonSmall}>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Tambah Tanaman" onPress={onAdd} />

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PlantItem plant={item} />}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada tanaman</Text>}
      />

      <Button title="Kembali" onPress={onBack} color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#E53935",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  buttonSmall: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    color: "#888",
  },
});
