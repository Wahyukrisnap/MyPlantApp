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
  onLoginSuccess: (userId: number) => void;
  onRegister: () => void;
}

export default function LoginScreen({ onLoginSuccess, onRegister }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username dan password wajib diisi");
      return;
    }

    setLoading(true);

    // Cek user di tabel users
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single(); // Hanya ambil satu user

    setLoading(false);

    if (error || !data) {
      Alert.alert("Login Gagal", "Username atau password salah");
      return;
    }

    // Kirim userId ke App.tsx
    onLoginSuccess(data.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Memproses..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRegister}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
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
