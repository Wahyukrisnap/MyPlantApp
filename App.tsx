import React, { useState } from "react";
import { Alert } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PlantListScreen from "./screens/PlantListScreen";
import PlantFormScreen from "./screens/PlantFormScreen";
import PlantDetailScreen from "./screens/PlantDetailScreen";
import InfoScreen from "./screens/InfoScreen";
import { Plant } from "./utils/data";
import { supabase } from "./utils/supabase";

export default function App() {
  const [screen, setScreen] = useState<
    | "splash"
    | "login"
    | "register"
    | "dashboard"
    | "list"
    | "form"
    | "detail"
    | "info"
  >("splash");

  const [userId, setUserId] = useState<number | null>(null);
  const [plantDetail, setPlantDetail] = useState<Plant | null>(null);
  const [editPlant, setEditPlant] = useState<Plant | null>(null);

  // Fungsi logout
  const handleLogout = async () => {
    // Logout dari Supabase (jika pakai email/password auth)
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Gagal Logout", error.message);
      return;
    }

    // Reset semua state aplikasi
    setUserId(null);
    setPlantDetail(null);
    setEditPlant(null);
    setScreen("login");

    Alert.alert("Logout", "Logout berhasil!");
  };

  // Splash Screen
  if (screen === "splash") {
    return <SplashScreen onFinish={() => setScreen("login")} />;
  }

  // Login Screen
  if (screen === "login") {
    return (
      <LoginScreen
        onLoginSuccess={(id) => {
          setUserId(id);
          setScreen("dashboard");
        }}
        onRegister={() => setScreen("register")}
      />
    );
  }

  // Register Screen
  if (screen === "register") {
    return <RegisterScreen onBackToLogin={() => setScreen("login")} />;
  }

  // Dashboard Screen
  if (screen === "dashboard") {
    return (
      <DashboardScreen
        onNavigate={(target) => setScreen(target)}
        onLogout={handleLogout}
      />
    );
  }

  // Daftar Tanaman
  if (screen === "list") {
    return (
      <PlantListScreen
        userId={userId}
        onBack={() => setScreen("dashboard")}
        onAdd={() => {
          setEditPlant(null);
          setScreen("form");
        }}
        onViewDetail={(plant) => {
          setPlantDetail(plant);
          setScreen("detail");
        }}
        onEdit={(plant) => {
          setEditPlant(plant);
          setScreen("form");
        }}
      />
    );
  }

  // Form tambah/edit
  if (screen === "form") {
    return (
      <PlantFormScreen
        userId={userId}
        onBack={() => setScreen("list")}
        plantToEdit={editPlant || undefined}
      />
    );
  }

  // Detail tanaman
  if (screen === "detail" && plantDetail) {
    return (
      <PlantDetailScreen plant={plantDetail} onBack={() => setScreen("list")} />
    );
  }

  // Info Screen
  if (screen === "info") {
    return <InfoScreen onBack={() => setScreen("dashboard")} />;
  }

  return null;
}
