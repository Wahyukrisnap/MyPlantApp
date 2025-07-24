import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../atoms/InputField";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { supabase } from "../../utils/supabase";

interface Props {
  onLoginSuccess: (userId: number) => void;
}

export default function LoginForm({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !user) {
      setError("Username atau password salah!");
    } else {
      setError("");
      onLoginSuccess(user.id);
    }
  };

  return (
    <View>
      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ButtonPrimary title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  error: { color: "red", marginTop: 5 },
});
