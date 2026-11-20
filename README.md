# PALM OS Enterprise — PWA (GitHub Pages)

**Integrated Oil Palm Plantation Management System**
*One Company. One Data. One Integrated Plantation Ecosystem.*

Repositori ini berisi **cangkang PWA** untuk PALM OS Enterprise. Aplikasi utama berjalan di Google Apps Script + Google Sheets (milik pelanggan); PWA ini membuatnya bisa di-*install* di Android/PC dan menyediakan **Mode Lapangan offline**.

## Isi repositori (5 berkas)

| Berkas | Fungsi |
|---|---|
| `index.html` | Memuat Web App Apps Script layar penuh saat online; beralih otomatis ke **Mode Lapangan** saat offline (absensi, hasil panen, hama, K3 + GPS + foto) yang disimpan di IndexedDB lalu disinkronkan ke server |
| `manifest.json` | Manifest PWA (nama, ikon, warna tema, mode standalone) |
| `sw.js` | Service Worker: cache cangkang aplikasi, network-first untuk halaman, tidak pernah meng-cache request sinkronisasi |
| `icon-512.png` | Ikon aplikasi (any + maskable) |
| `README.md` | Dokumen ini |

## Cara pasang

1. Deploy Apps Script sebagai **Web app** (Execute as: *Me*, Who has access: *Anyone*). Salin URL `.../exec`.
2. Atur URL Web App dengan salah satu cara: (a) buka aplikasi → layar **Atur URL** → tempel URL → Simpan (tersimpan di perangkat); (b) isi `content` pada tag `<meta name="palmos-gas-url">` di `index.html` (berlaku untuk semua pengguna); atau (c) bagikan tautan `https://<username>.github.io/palm-os/?gas=<URL_WEB_APP>`.
3. Upload 5 berkas ke repositori GitHub, mis. `palm-os`, lalu **Settings → Pages → Deploy from branch → main / root**.
4. Buka `https://<username>.github.io/palm-os/` → menu browser → **Install app / Tambahkan ke layar utama**.

## Cara kerja offline

- Data yang disimpan offline berstatus **"Tersimpan di perangkat — belum terkirim"** dan **tidak dianggap diterima server** sampai sinkronisasi berhasil.
- Setiap data memakai ID unik dari perangkat, sehingga pengiriman ulang **tidak membuat duplikat** (idempotensi di server).
- Data yang ditolak validasi server (mis. blok bukan milik afdeling, duplikat) tetap di antrean dengan pesan kesalahan agar dapat diperbaiki.
- Tombol **Back** di Android/browser kembali ke tampilan sebelumnya; menekan Back dua kali cepat di layar utama baru keluar dari aplikasi.

## Bila tidak terbuka

Jika server tidak merespons dalam 20 detik, layar menampilkan tombol **Buka di tab baru**, **Mode Lapangan**, **Atur URL**, dan **Coba lagi**. Setelah memperbarui berkas di GitHub, muat ulang dengan Ctrl+F5 (Service Worker memakai versi cache `palmos-pwa-v1.0.2`).

## Catatan teknis

- Login di dalam iframe memakai penyimpanan pihak ketiga (`*.googleusercontent.com`). Bila browser memblokirnya (mis. Safari), "Ingat saya" mungkin tidak bertahan; buka langsung URL Web App sebagai alternatif.
- Endpoint publik `doPost` hanya mengizinkan aksi `login`, `ping`, `publicInfo`, `me`, `refs`, `list`, `batch`, dan semuanya tetap memeriksa token, RBAC, dan scope organisasi.

## Lisensi

Kode cangkang PWA ini adalah bagian dari produk komersial **PALM OS Enterprise**. Penggunaan memerlukan kunci lisensi yang sah dari penyedia. Komponen pihak ketiga: Leaflet (BSD-2-Clause), data peta © kontributor OpenStreetMap (ODbL).

© 2026 PALM OS Enterprise. Versi 1.0.0.
