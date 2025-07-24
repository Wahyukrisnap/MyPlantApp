import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../utils/supabase";

export interface Plant {
  id?: number;
  name: string;
  type?: string;
  date?: string;
}

interface Props {
  onBack: () => void;
  onViewDetail: (plant: Plant) => void;
  onEdit: (plant: Plant) => void;
}

export default function PlantListScreen({
  onBack,
  onViewDetail,
  onEdit,
}: Props) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);

  // Input states
  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [plantDate, setPlantDate] = useState("");

  // Ambil semua data tanaman
  const fetchPlants = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("plants")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Fetch Error:", error.message);
      Alert.alert("Error", "Gagal memuat data tanaman.");
      setPlants([]);
    } else {
      setPlants(data || []);
    }
    setLoading(false);
  }, []);

  // Tambah tanaman baru
  const handleAddPlant = async () => {
    if (!plantName.trim()) {
      Alert.alert("Error", "Nama tanaman wajib diisi");
      return;
    }

    const newPlant: Plant = {
      name: plantName,
      type: plantType || "Tidak Diketahui",
      date: plantDate || new Date().toISOString().split("T")[0],
    };

    const { error } = await supabase.from("plants").insert(newPlant);
    if (error) {
      console.error("Insert Error:", error.message);
      Alert.alert("Error", "Gagal menambahkan tanaman.");
    } else {
      setPlantName("");
      setPlantType("");
      setPlantDate("");
      fetchPlants(); // refresh data
    }
  };

  // Hapus tanaman
  const handleDelete = (id?: number) => {
    Alert.alert("Konfirmasi", `Yakin ingin menghapus tanaman ini?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.from("plants").delete().eq("id", id);
          if (error) {
            console.error("Delete Error:", error.message);
            Alert.alert("Error", "Gagal menghapus tanaman.");
            return;
          }
          setPlants((prev) => prev.filter((p) => p.id !== id));
        },
      },
    ]);
  };

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Tanaman</Text>

      {/* Form Input */}
      <TextInput
        style={styles.input}
        placeholder="Nama Tanaman"
        value={plantName}
        onChangeText={setPlantName}
      />
      <TextInput
        style={styles.input}
        placeholder="Jenis Tanaman (opsional)"
        value={plantType}
        onChangeText={setPlantType}
      />
      <TextInput
        style={styles.input}
        placeholder="Tanggal (YYYY-MM-DD)"
        value={plantDate}
        onChangeText={setPlantDate}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
        <Text style={styles.addButtonText}>Tambah Tanaman</Text>
      </TouchableOpacity>

      {loading && plants.length === 0 ? (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchPlants} />
          }
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => onViewDetail(item)}
              >
                <Text style={styles.itemText}>
                  {item.name} - {item.type} ({item.date})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => onEdit(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() =>
            !loading ? (
              <Text style={styles.empty}>Belum ada tanaman</Text>
            ) : null
          }
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#2E7D32",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  itemText: { fontSize: 16, flex: 1 },
  editButton: {
    backgroundColor: "#4CAFEB",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#E53935",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
    fontStyle: "italic",
  },
  backButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});
