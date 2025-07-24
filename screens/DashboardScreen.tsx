import React from "react";
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";

interface Props {
  username: string; // Tambahkan agar bisa menyapa user
  onNavigate: (screen: "list" | "form" | "info") => void;
  onLogout: () => void;
}

export default function DashboardScreen({
  username,
  onNavigate,
  onLogout,
}: Props) {
  const handleLogout = () => {
    if (Platform.OS === "web") {
      onLogout();
    } else {
      Alert.alert("Konfirmasi", "Yakin ingin logout?", [
        { text: "Batal", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: onLogout },
      ]);
    }
  };

  const Button = ({
    title,
    onPress,
  }: {
    title: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Selamat datang, {username}!</Text>

      <Button title="Lihat Daftar Tanaman" onPress={() => onNavigate("list")} />
      <Button title="Tambah Tanaman Baru" onPress={() => onNavigate("form")} />
      <Button title="Informasi Aplikasi" onPress={() => onNavigate("info")} />

      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutContainer: {
    marginTop: 40,
  },
});
