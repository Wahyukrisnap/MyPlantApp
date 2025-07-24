import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonPrimary from "../components/atoms/ButtonPrimary";

interface Props {
  onBack: () => void;
}

export default function InfoScreen({ onBack }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang MyPlant App</Text>
      <Text style={styles.description}>
        MyPlant App adalah aplikasi sederhana yang membantu kamu mencatat
        tanaman hias kesayangan. Kamu bisa menambah, mengedit, melihat detail,
        dan menghapus data tanaman dengan mudah.
      </Text>

      <ButtonPrimary title="Kembali ke Dashboard" onPress={onBack} />
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
    marginBottom: 16,
    color: "#2E7D32",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
    lineHeight: 22,
  },
});
