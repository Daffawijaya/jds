-- =============================================================
-- SEED: services (8 layanan)
-- =============================================================
insert into public.services (id, slug, title, category, short_desc, full_desc, icon_name, features, deliverables, sort_order) values
('a1000000-0000-0000-0000-000000000001', 'web-development', 'Web Development', 'development',
 'Pengembangan situs web modern, responsif, dan teroptimasi untuk kebutuhan profil korporasi maupun portal publik.',
 'Layanan web development Jaya Dinara Sukses mencakup pengerjaan website korporasi, portal informasi, hingga aplikasi berbasis web yang aman, cepat, dan mudah dikelola sesuai kebutuhan klien.',
 'Globe',
 '["Desain modern & responsif (Mobile-first)","Performa tinggi & integrasi SEO","CMS / Sistem Manajemen Konten terstruktur","Arsitektur keamanan web yang andal"]'::jsonb,
 '["Website responsif siap pakai","Dokumentasi teknis & manajemen","Dukungan pasca-peluncuran"]'::jsonb,
 1),

('a1000000-0000-0000-0000-000000000002', 'software-development', 'Software Development', 'development',
 'Rancang bangun perangkat lunak custom skala kustom untuk otomatisasi proses bisnis dan manajemen data.',
 'Kami mengembangkan solusi perangkat lunak yang disesuaikan dengan kebutuhan spesifik organisasi, mulai dari aplikasi manajemen internal hingga platform layanan publik.',
 'Code2',
 '["Analisis kebutuhan sistem secara mendalam","Arsitektur modular & scalable","Pengujian fungsionalitas komprehensif","Integrasi API & database modern"]'::jsonb,
 '["Aplikasi software terinstal & teruji","Source code & dokumentasi API","Panduan penggunaan sistem"]'::jsonb,
 2),

('a1000000-0000-0000-0000-000000000003', 'ui-ux-design', 'UI/UX Design', 'development',
 'Perancangan antarmuka intuitif dan pengalaman pengguna yang menarik untuk aplikasi web dan mobile.',
 'Memastikan setiap produk digital mudah digunakan, fungsional, serta memberikan impresi visual profesional bagi para pengguna.',
 'Layout',
 '["User Research & Wireframing","Interactive Prototyping","Design System & Component Library","Usability Testing"]'::jsonb,
 '["Figma prototype interaktif","Design System aset digital","Panduan panduan visual antarmuka"]'::jsonb,
 3),

('a1000000-0000-0000-0000-000000000004', 'digitalization-solutions', 'Digitalization Solutions', 'solutions',
 'Modernisasi alur kerja konvensional menjadi ekosistem digital terintegrasi untuk efisiensi operasional.',
 'Membantu transformasi alur kerja manual menjadi sistem digital terpadu yang mempermudah pemantauan, pengelolaan data, dan pelayanan.',
 'Cpu',
 '["Digitalisasi katalog & pendataan","Otomatisasi alur kerja publik/internal","Dashboard statistik & pemantauan data","Integrasi antar-sistem organisasi"]'::jsonb,
 '["Platform digital terintegrasi","Dashboard manajemen data","Pelatihan operasional tim"]'::jsonb,
 4),

('a1000000-0000-0000-0000-000000000005', 'it-consulting', 'IT Consulting', 'consulting',
 'Konsultasi strategis perencanaan teknologi informasi, arsitektur sistem, dan peta jalan digitalisasi.',
 'Pendampingan konsultatif untuk menentukan arah pengembangan IT yang tepat, efisien, dan selaras dengan tujuan organisasi.',
 'Lightbulb',
 '["Asesmen kebutuhan infrastruktur & IT","Penyusunan Roadmap Transformasi Digital","Rekomendasi arsitektur teknologi","Evaluasi efisiensi sistem"]'::jsonb,
 '["Dokumen rekomendasi IT & strategi","Blueprint arsitektur sistem","Laporan analisis kebutuhan"]'::jsonb,
 5),

('a1000000-0000-0000-0000-000000000006', 'it-outsourcing', 'IT Outsourcing', 'outsourcing',
 'Pengelolaan operasional teknologi informasi dan dukungan teknis secara terstruktur dan terukur.',
 'Layanan alih daya pengelolaan IT bagi instansi atau perusahaan untuk memastikan keberlanjutan infrastruktur dan aplikasi tanpa beban operasional berlebih.',
 'Server',
 '["Pengelolaan & pemeliharaan sistem","Dukungan teknis berkala","Pengawasan keandalan operasional","Fleksibilitas skala alih daya"]'::jsonb,
 '["Dukungan operasional IT terintegrasi","Laporan pemeliharaan sistem","SLA operasional yang terjamin"]'::jsonb,
 6),

('a1000000-0000-0000-0000-000000000007', 'professional-staffing', 'Professional Staffing / Tenaga Ahli', 'outsourcing',
 'Penyediaan dan penyiapan tenaga ahli IT profesional untuk penugasan program, pendampingan, dan pendukung proyek.',
 'Jaya Dinara Sukses menyediakan SDM berkualitas dan berpengalaman di bidang IT dan pendampingan lapangan untuk memperkuat pelaksanaan kegiatan instansi maupun swasta.',
 'Users',
 '["Seleksi & penyiapan tenaga ahli berkualifikasi","Penyediaan tenaga pendamping teknis & UMKM","Pengelolaan administrasi & kinerja SDM","Penempatan fleksibel sesuai durasi program"]'::jsonb,
 '["Tim tenaga ahli siap bertugas","Pengawasan & laporan periodik kinerja SDM","Dukungan koordinasi proyek"]'::jsonb,
 7),

('a1000000-0000-0000-0000-000000000008', 'multimedia-digital-content', 'Multimedia & Digital Content', 'media',
 'Pembuatan konten digital, desain grafis, dan materi komunikasi visual profesional untuk kebutuhan publikasi.',
 'Dukungan kreasi media digital untuk menyampaikan informasi, promosi program, dan materi presentasi organisasi secara menarik dan berkualitas tinggi.',
 'Film',
 '["Desain grafis & aset promosi digital","Pembuatan video presentasi & profil","Konten publikasi media sosial & web","Materi publikasi event/kegiatan"]'::jsonb,
 '["Aset grafis & multimedia berkualitas tinggi","File master & format siap publikasi","Aset pendukung promosi"]'::jsonb,
 8);

-- =============================================================
-- SEED: projects (2 proyek)
-- =============================================================
insert into public.projects (id, slug, title, client, category, year, short_desc, full_desc, scope, tags, highlight_badge, sort_order) values
('b1000000-0000-0000-0000-000000000001', 'tenaga-ahli-umkm-2026',
 'Penyedia Jasa Tenaga Ahli Pendamping UMKM 2026',
 'Dinas Koperasi dan UKM Kabupaten Kutai Kartanegara',
 'Professional Staffing & Digitalization',
 '2026',
 'Penyediaan tenaga ahli IT dan digitalisasi profesional untuk mendukung kegiatan pendampingan serta transformasi digital UMKM.',
 'Jaya Dinara Sukses bertindak sebagai penyedia jasa tenaga ahli profesional yang ditugaskan untuk melakukan pendampingan teknis dan digitalisasi bagi para pelaku UMKM di Kabupaten Kutai Kartanegara. Program ini fokus pada peningkatan kapasitas SDM UMKM dalam mengadopsi teknologi digital.',
 '["Penyiapan dan seleksi Tenaga Ahli IT & Pendamping UMKM","Pendampingan teknis pemanfaatan platform digital","Pengelolaan dan evaluasi kinerja tenaga pendamping","Penyusunan laporan progres digitalisasi UMKM"]'::jsonb,
 '["Professional Staffing","Tenaga Ahli","Digitalisasi UMKM","Dinas KUKM Kukar"]'::jsonb,
 'Proyek Terverifikasi',
 1),

('b1000000-0000-0000-0000-000000000002', 'etamhub',
 'etamhub',
 'Dinas Koperasi dan UKM Kabupaten Kutai Kartanegara',
 'Web Development & Digital Platform',
 '2026',
 'Platform digital terpadu untuk katalog, informasi, dan promosi produk UMKM di Kabupaten Kutai Kartanegara.',
 'EtamHub merupakan platform digital yang dirancang untuk menjadi wadah pusat informasi, katalog produk, dan sarana promosi UMKM lokal di Kabupaten Kutai Kartanegara. Platform ini memudahkan masyarakat dan instansi dalam menjelajahi serta mendukung produk-produk UMKM unggulan.',
 '["Pengembangan sistem katalog digital UMKM","Perancangan antarmuka pengguna (UI/UX) responsif","Manajemen database produk & profil UMKM","Fitur pencarian & kategori produk terstruktur"]'::jsonb,
 '["Web Platform","Katalog UMKM","Digital Solutions","EtamHub"]'::jsonb,
 'Platform Digital',
 2);

-- =============================================================
-- SEED: testimonials (3 testimoni)
-- =============================================================
insert into public.testimonials (id, name, role, title, quote, image_url, sort_order) values
('c1000000-0000-0000-0000-000000000001', 'Andi Pratama', 'Mitra Dinas KUKM Kukar', 'Program tepat sasaran.',
 'Program pendampingan berjalan tertib, terdokumentasi, dan tepat sasaran. Koordinasi dengan tim tenaga ahli juga sangat komunikatif.',
 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
 1),

('c1000000-0000-0000-0000-000000000002', 'Hj. Ratna', 'Pelaku UMKM Kuliner', 'Pembeli datang dari luar kecamatan.',
 'Sejak usaha saya masuk etamhub, pembeli dari luar kecamatan mulai berdatangan. Sekarang produk saya dikenal lebih luas tanpa harus buka cabang.',
 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80',
 2),

('c1000000-0000-0000-0000-000000000003', 'Samsul', 'Pelaku UMKM Kriya', 'Promosi mandiri lewat HP.',
 'Pendampingannya praktis dan mudah diikuti. Sekarang saya bisa promosi lewat HP sendiri dan pesanan masuk lebih rutin.',
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
 3);

-- =============================================================
-- SEED: career_roles (6 posisi)
-- =============================================================
insert into public.career_roles (id, slug, title, group_name, group_label, education, majors, location, engagement, summary, qualifications, sort_order) values
('d1000000-0000-0000-0000-000000000001', 'web-developer', 'Web Developer', 'technology', 'Teknologi',
 'D3 / D4 / S1', 'Informatika, Sistem Informasi, RPL, atau bidang terkait',
 'Fleksibel, sesuai proyek', 'Talent Pool / Berbasis proyek',
 'Membangun antarmuka dan fitur web yang cepat, mudah digunakan, serta terintegrasi dengan kebutuhan sistem mitra.',
 '["Memahami pengembangan web modern dan integrasi API.","Mampu menerjemahkan desain menjadi pengalaman yang responsif.","Nyaman bekerja kolaboratif dengan desainer dan tim backend."]'::jsonb,
 1),

('d1000000-0000-0000-0000-000000000002', 'software-developer', 'Software & Backend Developer', 'technology', 'Teknologi',
 'D4 / S1', 'Informatika, Sistem Informasi, Teknik Komputer, atau setara',
 'Fleksibel, sesuai proyek', 'Talent Pool / Berbasis proyek',
 'Merancang dan membangun backend, API, serta logika aplikasi yang stabil untuk mendukung sistem mitra.',
 '["Menguasai salah satu bahasa backend (Node.js, Python, atau setara).","Paham model data, API, dan keamanan dasar aplikasi.","Mampu menulis kode yang teruji dan terdokumentasi."]'::jsonb,
 2),

('d1000000-0000-0000-0000-000000000003', 'ui-ux-designer', 'UI/UX Designer', 'creative', 'Desain & Konten',
 'D3 / D4 / S1', 'Desain Komunikasi Visual, Desain Produk, Informatika, atau bidang kreatif terkait',
 'Fleksibel, sesuai proyek', 'Talent Pool / Berbasis proyek',
 'Merancang antarmuka dan pengalaman pengguna yang jelas, konsisten, dan mudah diakses untuk produk digital.',
 '["Mampu melakukan riset pengguna dan menyusun wireframe.","Terbiasa membuat prototipe interaktif menggunakan Figma atau alat sejenis.","Memahami prinsip desain responsif dan aksesibilitas."]'::jsonb,
 3),

('d1000000-0000-0000-0000-000000000004', 'digital-content', 'Digital Content & Multimedia', 'creative', 'Desain & Konten',
 'D3 / D4 / S1', 'DKV, Ilmu Komunikasi, Multimedia, atau bidang kreatif terkait',
 'Fleksibel, sesuai proyek', 'Talent Pool / Berbasis proyek',
 'Menghasilkan konten visual, video, dan materi publikasi digital untuk kebutuhan komunikasi dan promosi program.',
 '["Mampu membuat konten grafis dan video untuk kebutuhan digital.","Memahami alur produksi konten publikasi dan media sosial.","Bisa bekerja dengan permintaan yang berubah-ubah secara efisien."]'::jsonb,
 4),

('d1000000-0000-0000-0000-000000000005', 'it-support', 'IT Support & Technical Staff', 'technology', 'Teknologi',
 'D3 / SMK Teknologi / S1', 'Teknik Informatika, Teknik Komputer, atau bidang terkait',
 'Lokasi mitra / Fleksibel', 'Talent Pool / Berbasis proyek',
 'Menyediakan dukungan teknis, pemeliharaan sistem, serta bantuan operasional TI di lokasi mitra atau secara daring.',
 '["Memahami pemeliharaan perangkat keras dan perangkat lunak dasar.","Mampu merespons kendala teknis dengan komunikasi yang jelas.","Siap bekerja di lokasi mitra sesuai jadwal penugasan."]'::jsonb,
 5),

('d1000000-0000-0000-0000-000000000006', 'program-facilitator', 'Program Facilitator & Pendamping UMKM', 'program', 'Program & Operasional',
 'D3 / D4 / S1', 'Ilmu Sosial, Administrasi Bisnis, Kewirausahaan, atau bidang terkait',
 'Lokasi mitra / Kutai Kartanegara', 'Talent Pool / Berbasis proyek',
 'Mendampingi pelaku UMKM dalam pemanfaatan platform digital, pengelolaan data usaha, serta peningkatan kapasitas operasional.',
 '["Mampu berkomunikasi langsung dengan pelaku UMKM.","Memahami penggunaan platform digital sederhana.","Terbiasa bekerja lapangan dan membuat laporan kegiatan."]'::jsonb,
 6);

-- =============================================================
-- SEED: core_values (4 nilai)
-- =============================================================
insert into public.core_values (title, description, icon_name, sort_order) values
('Profesionalisme', 'Menjalankan setiap penugasan dan proyek dengan standar kualitas tinggi, integritas, dan tanggung jawab penuh.', 'ShieldCheck', 1),
('Inovasi Tepat Guna', 'Menghadirkan solusi teknologi dan digitalisasi yang praktis, efektif, serta memberikan manfaat nyata bagi pengguna.', 'Sparkles', 2),
('Kemitraan Handal', 'Membangun hubungan kerja sama jangka panjang yang saling mempercayai dengan instansi pemerintah dan mitra bisnis.', 'Handshake', 3),
('Kualitas SDM', 'Menyiapkan tenaga ahli dan personel berkualitas yang kompeten serta berdedikasi tinggi di bidangnya.', 'UserCheck', 4);

-- =============================================================
-- SEED: about_cards (3 kartu)
-- =============================================================
insert into public.about_cards (label, title, description, image_url, button_label, button_href, sort_order) values
('Pengalaman', 'Pengalaman', 'Beroperasi sejak 2026, melayani berbagai sektor industri.', '/image/Codex Image Sep 5, 2026, 10_30_52 PM.png', 'Tentang Kami', '/about', 1),
('Proyek Tercapai', 'Proyek Tercapai', 'Portofolio proyek untuk instansi pemerintah dan mitra bisnis.', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80', 'Lihat Proyek', '/projects', 2),
('Jangkauan Lokal', 'Jangkauan Lokal', 'Berpusat di Kalimantan Timur, melayani sekitarnya.', 'https://image.idn.media/post/20200903/samarinda-abd9320964ad6c73846427ed0a6896aa.jpg', 'Lihat Lokasi', '/contact', 3);

-- =============================================================
-- SEED: faqs (kontak + karir)
-- =============================================================
insert into public.faqs (page, question, answer, sort_order) values
-- Contact FAQs
('contact', 'Belum punya brief lengkap. Bisa konsultasi dulu?', 'Tentu. Mulai dengan gambaran singkat mengenai kebutuhan atau tantangan Anda. Tim kami dapat membantu mendiskusikan arah solusi sebelum menentukan ruang lingkup proyek.', 1),
('contact', 'Layanan apa saja yang bisa saya diskusikan?', 'Anda dapat berdiskusi tentang website, software, UI/UX, digitalisasi sistem, konsultasi IT, outsourcing, tenaga ahli profesional, serta multimedia dan konten digital.', 2),
('contact', 'Kapan tim JDS akan menanggapi pesan saya?', 'Tim JDS akan mempelajari konteks yang Anda kirimkan dan berupaya memberikan tanggapan awal dalam satu sampai dua hari kerja.', 3),
('contact', 'Bagaimana cara mengirim proposal atau dokumen proyek?', 'Kirimkan dokumen melalui email jayadinarasukses@gmail.com. Sertakan nama, instansi, serta gambaran kebutuhan agar diskusi lebih terarah.', 4),
('contact', 'Apakah konsultasi awal dikenakan biaya?', 'Tidak. Percakapan awal digunakan untuk memahami kebutuhan dan melihat kecocokan ruang lingkup sebelum ada komitmen pekerjaan apa pun.', 5),
('contact', 'Apakah JDS menerima proyek di luar Kalimantan Timur?', 'Ya. Sebagian besar proses diskusi, koordinasi, dan pengerjaan dapat dilakukan secara daring, lalu disesuaikan dengan kebutuhan proyek dan lokasi mitra.', 6),
('contact', 'Saya tertarik bergabung sebagai tenaga ahli. Mulai dari mana?', 'Kunjungi halaman Karir untuk melihat peluang dan mendaftarkan profil Anda ke Talent Pool JDS.', 7),

-- Career FAQs
('career', 'Apakah ada posisi yang sedang dibuka saat ini?', 'Kami membuka Talent Pool untuk berbagai posisi. Peluang penugasan akan muncul sesuai kebutuhan proyek mitra.', 1),
('career', 'Keterampilan utama yang dicari?', 'Pengembangan web/software, desain UI/UX, multimedia, IT support, serta kemampuan pendampingan dan komunikasi lapangan.', 2),
('career', 'Apakah harus berdomisili di Kalimantan Timur?', 'Tidak wajib. Banyak penugasan yang bisa dilakukan secara fleksibel, sesuai kebutuhan proyek mitra.', 3),
('career', 'Bagaimana cara mendaftar?', 'Kirim profil singkat atau CV ke email kami, lalu sertakan posisi yang diminati. Tim JDS akan menghubungi jika ada kecocokan.', 4),
('career', 'Kapan saya bisa menghubungi untuk pertanyaan lebih lanjut?', 'Anda bisa menghubungi kami melalui WhatsApp atau email pada hari kerja. Tim kami akan merespons sesegera mungkin.', 5);
