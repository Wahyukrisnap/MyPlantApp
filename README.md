# My Plant App

Aplikasi mobile untuk membantu pengguna mengelola dan merawat tanaman mereka.

## Fitur

- Pelacakan tanaman dengan detail lengkap
- Pengingat penyiraman
- Informasi perawatan tanaman
- Manajemen koleksi tanaman

## Struktur Proyek

```
/MyPlantApp
  /app
    App.tsx (entry utama)
  /components
    /atoms
      ButtonPrimary.tsx
      InputField.tsx
      TitleText.tsx
    /molecules
      LoginForm.tsx
      PlantItem.tsx
    /organisms
      PlantList.tsx
  /screens
    SplashScreen.tsx
    LoginScreen.tsx
    DashboardScreen.tsx
    PlantListScreen.tsx
    PlantFormScreen.tsx
    PlantDetailScreen.tsx
    InfoScreen.tsx
  /utils
    data.ts (sementara untuk simpan data array)
  /assets
    (berbagai ikon dan gambar)
```

## Teknologi yang Digunakan

- React Native
- Expo
- React Navigation
- TypeScript

## Cara Menjalankan

1. Pastikan Node.js dan npm sudah terinstal
2. Install Expo CLI: `npm install -g expo-cli`
3. Clone repositori ini
4. Jalankan `npm install` untuk menginstal dependensi
5. Jalankan `npm start` untuk memulai server pengembangan
6. Gunakan aplikasi Expo Go di perangkat mobile atau emulator untuk menjalankan aplikasi

## Akun Demo

- Email: user@example.com
- Password: password123

## Pengembangan Selanjutnya

- Implementasi backend untuk penyimpanan data
- Fitur notifikasi untuk pengingat penyiraman
- Penambahan fitur identifikasi tanaman dengan kamera
- Integrasi dengan sensor kelembaban tanah