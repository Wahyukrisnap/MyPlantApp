import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.center}>
      {/* Gambar lokal */}
      <Image
        source={require("../assets/splashscreen.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>MyPlant App</Text>
      <Text style={styles.subtitle}>Mencatat Tanamanmu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9", // warna hijau muda
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#388E3C",
  },
  subtitle: {
    fontSize: 16,
    color: "#4CAF50",
  },
});
