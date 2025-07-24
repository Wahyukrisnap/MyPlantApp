import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { supabase } from "../utils/supabase";

interface Props {
  onBackToLogin: () => void;
}

export default function RegisterScreen({ onBackToLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username dan password wajib diisi");
      return;
    }

    setLoading(true);

    // Cek apakah username sudah ada
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();

    if (existingUser) {
      Alert.alert("Gagal", "Username sudah terdaftar");
      setLoading(false);
      return;
    }

    // Simpan user baru
    const { error } = await supabase
      .from("users")
      .insert([{ username, password }]);

    setLoading(false);

    if (error) {
      Alert.alert("Registrasi Gagal", error.message);
    } else {
      Alert.alert("Sukses", "Registrasi berhasil. Silakan login.");
      onBackToLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Memproses..." : "Daftar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBackToLogin}>
        <Text style={styles.link}>Sudah punya akun? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { textAlign: "center", color: "#2196F3", marginTop: 10 },
});
