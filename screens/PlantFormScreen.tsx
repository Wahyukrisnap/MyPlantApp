import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../components/atoms/InputField";
import ButtonPrimary from "../components/atoms/ButtonPrimary";
import { supabase } from "../utils/supabase";
import { Plant } from "../utils/data";

interface Props {
  userId: string | null; // UUID dari auth.users
  onBack: () => void;
  plantToEdit?: Plant;
}

export default function PlantFormScreen({
  userId,
  onBack,
  plantToEdit,
}: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (plantToEdit) {
      setName(plantToEdit.name);
      setType(plantToEdit.type);
      setDate(plantToEdit.date);
    }
  }, [plantToEdit]);

  const handleSave = async () => {
    if (!userId) {
      Alert.alert("Error", "User tidak terdeteksi. Silakan login ulang.");
      return;
    }
    if (!name || !type || !date) {
      Alert.alert("Error", "Semua field wajib diisi");
      return;
    }

    try {
      let response;
      if (plantToEdit) {
        // UPDATE data tanaman
        response = await supabase
          .from("plants")
          .update({ name, type, date })
          .eq("id", plantToEdit.id);
      } else {
        // INSERT data tanaman baru (wajib sertakan user_id)
        response = await supabase
          .from("plants")
          .insert([{ name, type, date, user_id: userId }]);
      }

      if (response.error) {
        console.error("Supabase Error:", response.error.message);
        Alert.alert("Gagal", response.error.message);
      } else {
        Alert.alert("Sukses", "Data tanaman berhasil disimpan", [
          { text: "OK", onPress: onBack },
        ]);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      Alert.alert("Error", "Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {plantToEdit ? "Edit Tanaman" : "Tambah Tanaman"}
      </Text>
      <InputField
        placeholder="Nama Tanaman"
        value={name}
        onChangeText={setName}
      />
      <InputField
        placeholder="Jenis Tanaman"
        value={type}
        onChangeText={setType}
      />
      <InputField
        placeholder="Tanggal Tanam (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <ButtonPrimary title="Simpan" onPress={handleSave} />
      <ButtonPrimary title="Batal" onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2E7D32",
  },
});
