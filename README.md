# VINCY THE PHANTOM CHASER

Game aksi 2D browser yang langsung membuka menu **Mulai Main**. Revisi ini menggunakan file HTML game pengguna sebagai dasar, dengan empat stage, sprite, senjata, dan boss dari lampiran.

## Jalankan lokal

Gunakan Node.js 20+ lalu `npm run dev` (atau `npm.cmd run dev` di PowerShell). Buka http://127.0.0.1:5173. CSS sudah dikompilasi dan semua gambar disimpan lokal; instalasi paket tidak diperlukan untuk memainkan game.

Untuk mengubah CSS: `npm ci`, lalu `npm run build:css`. Font Google opsional, dengan fallback sistem. Tidak ada CDN JavaScript yang diperlukan saat bermain.

## Kontrol

- A/D atau ←/→: bergerak.
- W atau ↑: lompat ganda; S atau ↓: turun dari platform.
- J atau Spasi: tembak. Klik/tahan arena untuk menembak ke arah penunjuk.
- Shift atau L: dash; E atau K: jurus Tasbih saat energi Roh penuh.
- Q atau 1/2/3: ganti senjata. Tombol Senjata juga tersedia di ponsel.
- Escape atau P: jeda/lanjut. Kontrol sentuh ada di bawah arena.

Kalahkan gelombang demit untuk memunculkan boss; kalahkan boss untuk menyelesaikan stage. Empat stage dapat dipilih dari peta: The Village, Banana Hollow, Hidden Forest, Ancient Temple. Gameplay mengikuti arena tempur dengan platform dari file pengguna, bukan lintasan panjang demo sebelumnya.

Lima nyawa, tiga senjata, pickup koin/jamu/energi, combo, dash, dan jurus area. Lanjutkan mempertahankan posisi dan skor. Mulai ulang atau memilih stage memulai skor baru; lanjut ke stage berikutnya membawa skor sebelumnya. Suara dan rekor disimpan lokal jika browser mengizinkan. Tab tersembunyi atau kehilangan fokus menjeda permainan. Posisi horizontal memberi ruang bermain lebih besar di ponsel.

## Struktur

- `index.html`: menu, HUD, arena, peta, hasil permainan, dan ensiklopedia.
- `js/arcade.js`: aturan game, simulasi tetap 60 Hz, rendering, AI, input, dan audio.
- `arcade.source.css`, `tailwind.config.cjs`: sumber tampilan; `arcade.css`: CSS siap pakai.
- `assets/arcade/`: 24 gambar unik yang diekstrak dari HTML lampiran tanpa mengubah file asli di Downloads.
- `server.mjs`: server HTTP lokal.

## Pengujian

`npm test` menguji engine aktual dengan DOM/audio/rendering tiruan: resume, reset, senjata, jurus, kekalahan, boss empat stage, dan konsistensi refresh rate. Pengujian boss mengisolasi tabrakan proyektil dan transisi hasil, bukan playthrough manual seluruh tingkat kesulitan.

`tests/browser-check.mjs` memeriksa Chrome desktop, ponsel, dan landscape. Membutuhkan Playwright, opsional melalui variabel `PLAYWRIGHT_PATH`. Screenshot disimpan di `artifacts/` yang diabaikan Git.

Referensi ilustrasi: [Raka — The Phantom Chaser / MVG Studio](https://www.behance.net/gallery/231265229/Raka-The-Phantom-Chaser-Game-Art). Adaptasi konsep lokal bernama Vincy, bukan situs resmi MVG Studio. HTML lampiran menjadi dasar implementasi revisi. Aset referensi versi sebelumnya tetap disimpan di `assets/`.
