-- Make the service catalog, homepage hero, and KBLI references database-driven.
alter table public.services
  add column if not exists category_label text,
  add column if not exists kbli_codes jsonb not null default '[]'::jsonb,
  add column if not exists hero_tab_label text,
  add column if not exists hero_eyebrow text,
  add column if not exists hero_title text,
  add column if not exists hero_description text,
  add column if not exists hero_offer text,
  add column if not exists hero_cta_label text,
  add column if not exists hero_cta_href text,
  add column if not exists hero_video_url text,
  add column if not exists hero_icon_class text,
  add column if not exists show_in_hero boolean not null default true;

update public.services set
  slug = 'web-development', title = 'Web Development', category = 'development', category_label = 'Development',
  short_desc = 'Pengembangan website modern, responsif, cepat, dan mudah dikelola untuk kebutuhan organisasi maupun bisnis.',
  full_desc = 'Kami membangun website perusahaan, portal informasi, landing page, serta aplikasi berbasis web yang disesuaikan dengan proses dan tujuan organisasi.',
  icon_name = 'Globe', image_url = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85',
  features = '["Website responsif dan mobile-first","CMS dan pengelolaan konten","Integrasi API dan sistem pihak ketiga","Optimasi performa, SEO, dan keamanan"]'::jsonb,
  deliverables = '["Website siap digunakan","Source code dan dokumentasi teknis","Panduan pengelolaan konten","Dukungan peluncuran"]'::jsonb,
  kbli_codes = '["62019"]'::jsonb,
  hero_tab_label = 'Web development', hero_eyebrow = 'Web development', hero_title = 'Website yang bekerja untuk organisasi Anda.',
  hero_description = 'Bangun website dan aplikasi web yang cepat, responsif, aman, dan mudah dikembangkan.',
  hero_offer = 'Dari website perusahaan hingga portal layanan dan sistem berbasis web.', hero_cta_label = 'Lihat layanan', hero_cta_href = '/services',
  hero_video_url = '/hero-team.mp4', hero_icon_class = 'bg-blue-600', show_in_hero = true, sort_order = 1, updated_at = now()
where id = 'a1000000-0000-0000-0000-000000000001';

update public.services set
  slug = 'mobile-app-development', title = 'Mobile App Development', category = 'development', category_label = 'Development',
  short_desc = 'Pengembangan aplikasi mobile Android dan iOS yang praktis, stabil, dan terhubung dengan sistem bisnis.',
  full_desc = 'Kami merancang dan mengembangkan aplikasi mobile untuk layanan pelanggan, operasional lapangan, pelayanan publik, maupun kebutuhan internal organisasi.',
  icon_name = 'Smartphone', image_url = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85',
  features = '["Aplikasi Android dan iOS","Pengembangan cross-platform","Integrasi API, autentikasi, dan notifikasi","Pengujian perangkat dan optimasi performa"]'::jsonb,
  deliverables = '["Aplikasi mobile siap rilis","Source code dan dokumentasi","Build Android dan iOS","Dukungan publikasi aplikasi"]'::jsonb,
  kbli_codes = '["62019"]'::jsonb,
  hero_tab_label = 'Mobile development', hero_eyebrow = 'Mobile app development', hero_title = 'Layanan dalam genggaman pengguna.',
  hero_description = 'Hadirkan aplikasi mobile yang ringkas, intuitif, dan mendukung aktivitas pengguna di mana saja.',
  hero_offer = 'Solusi Android dan iOS yang terhubung dengan sistem serta data organisasi.', hero_cta_label = 'Lihat layanan', hero_cta_href = '/services',
  hero_video_url = '/hero-consult.mp4', hero_icon_class = 'bg-cyan-600', show_in_hero = true, sort_order = 2, updated_at = now()
where id = 'a1000000-0000-0000-0000-000000000002';

update public.services set
  slug = 'digital-platform-portal', title = 'Digital Platform & Portal', category = 'platform', category_label = 'Digital Platform',
  short_desc = 'Pengembangan dan pengoperasian portal serta platform digital komersial untuk mempertemukan layanan, informasi, dan pengguna.',
  full_desc = 'Kami membantu membangun ekosistem platform digital, portal konten, direktori, marketplace, dan layanan daring yang dapat dikelola serta dikembangkan secara berkelanjutan.',
  icon_name = 'Layout', image_url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
  features = '["Portal informasi dan layanan digital","Dashboard pengelolaan platform","Fitur transaksi atau intermediasi digital","Analitik, integrasi, dan manajemen pengguna"]'::jsonb,
  deliverables = '["Platform digital siap dioperasikan","Dashboard administrator","Dokumentasi alur dan pengelolaan","Pelatihan operator"]'::jsonb,
  kbli_codes = '["63122"]'::jsonb,
  hero_tab_label = 'Digital platform', hero_eyebrow = 'Digital platform & portal', hero_title = 'Satu platform untuk layanan yang terhubung.',
  hero_description = 'Satukan informasi, layanan, transaksi, dan pengguna dalam platform digital yang mudah dikelola.',
  hero_offer = 'Dibangun untuk tumbuh bersama kebutuhan bisnis dan organisasi.', hero_cta_label = 'Lihat layanan', hero_cta_href = '/services',
  hero_video_url = '/hero-team.mp4', hero_icon_class = 'bg-violet-600', show_in_hero = true, sort_order = 3, updated_at = now()
where id = 'a1000000-0000-0000-0000-000000000003';

update public.services set
  slug = 'outsourcing-managed-services', title = 'Outsourcing & Managed Services', category = 'outsourcing', category_label = 'Outsourcing',
  short_desc = 'Layanan alih daya umum untuk mendukung kebutuhan tenaga kerja, administrasi, dan fungsi operasional organisasi.',
  full_desc = 'Kami menyediakan dukungan outsourcing yang fleksibel dan terukur untuk fungsi sumber daya manusia serta administrasi kantor sesuai ruang lingkup penugasan.',
  icon_name = 'Server', image_url = 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85',
  features = '["Skema penugasan sesuai kebutuhan","Pengelolaan personel dan administrasi","Koordinasi dan pemantauan layanan","Pelaporan berkala dan standar layanan"]'::jsonb,
  deliverables = '["Tim atau fungsi pendukung siap berjalan","Dokumen ruang lingkup dan standar layanan","Laporan pelaksanaan berkala","Dukungan koordinasi operasional"]'::jsonb,
  kbli_codes = '["78300","82110"]'::jsonb,
  hero_tab_label = 'Outsourcing', hero_eyebrow = 'Outsourcing & managed services', hero_title = 'Dukungan operasional yang siap bergerak.',
  hero_description = 'Perkuat kegiatan organisasi melalui dukungan tenaga kerja dan fungsi administrasi yang terkelola.',
  hero_offer = 'Fleksibel untuk kebutuhan rutin, program, maupun penugasan berbasis proyek.', hero_cta_label = 'Diskusikan kebutuhan', hero_cta_href = '/contact',
  hero_video_url = '/hero-staff.mp4', hero_icon_class = 'bg-amber-600', show_in_hero = true, sort_order = 4, updated_at = now()
where id = 'a1000000-0000-0000-0000-000000000004';

update public.services set
  slug = 'hr-workforce-management', title = 'HR & Workforce Management', category = 'workforce', category_label = 'Workforce',
  short_desc = 'Penyediaan sumber daya manusia dan pengelolaan fungsi HR untuk mendukung kebutuhan tenaga kerja organisasi.',
  full_desc = 'Kami membantu proses penyediaan personel, administrasi ketenagakerjaan, pencatatan, pemantauan kinerja, serta koordinasi tenaga kerja sesuai kebutuhan pemberi kerja.',
  icon_name = 'Users', image_url = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85',
  features = '["Penyediaan dan penempatan personel","Administrasi dan dokumentasi SDM","Pemantauan kehadiran dan kinerja","Koordinasi kebutuhan tenaga kerja"]'::jsonb,
  deliverables = '["Personel sesuai kebutuhan penugasan","Dokumen administrasi tenaga kerja","Laporan kehadiran dan kinerja","Dukungan pengelolaan personel"]'::jsonb,
  kbli_codes = '["78300"]'::jsonb,
  hero_tab_label = 'Workforce', hero_eyebrow = 'HR & workforce management', hero_title = 'Tenaga kerja tepat, pengelolaan lebih tertata.',
  hero_description = 'Dukung program dan operasional dengan personel yang disiapkan serta dikelola secara terstruktur.',
  hero_offer = 'Mulai dari penyiapan personel hingga administrasi dan pemantauan kinerja.', hero_cta_label = 'Lihat layanan', hero_cta_href = '/services',
  hero_video_url = '/hero-staff.mp4', hero_icon_class = 'bg-emerald-600', show_in_hero = true, sort_order = 5, updated_at = now()
where id = 'a1000000-0000-0000-0000-000000000005';

update public.services set
  slug = 'office-administration-services', title = 'Office Administration Services', category = 'administration', category_label = 'Administration',
  short_desc = 'Dukungan gabungan administrasi kantor sehari-hari agar proses kerja lebih rapi, konsisten, dan terdokumentasi.',
  full_desc = 'Layanan mencakup dukungan surat-menyurat, pemeliharaan catatan, administrasi tagihan, penerimaan tamu, serta fungsi administrasi kantor lainnya.',
  icon_name = 'FileText', image_url = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
  features = '["Pengelolaan surat dan dokumen","Pemeliharaan catatan administrasi","Dukungan tagihan dan pencatatan","Penerimaan tamu dan koordinasi kantor"]'::jsonb,
  deliverables = '["Dokumen administrasi yang tertata","Rekap catatan dan aktivitas","Laporan dukungan administrasi","Prosedur kerja administratif"]'::jsonb,
  kbli_codes = '["82110"]'::jsonb,
  hero_tab_label = 'Administration', hero_eyebrow = 'Office administration services', hero_title = 'Administrasi rapi, pekerjaan lebih terkendali.',
  hero_description = 'Serahkan pekerjaan administratif harian kepada tim pendukung yang bekerja secara sistematis.',
  hero_offer = 'Dukungan pencatatan, dokumen, korespondensi, dan kebutuhan kantor lainnya.', hero_cta_label = 'Lihat layanan', hero_cta_href = '/services',
  hero_video_url = '/hero-consult.mp4', hero_icon_class = 'bg-slate-600', show_in_hero = true, sort_order = 6, updated_at = now()
where id = 'a1000000-0000-0000-0000-000000000006';

update public.services set
  slug = 'multimedia-production', title = 'Multimedia Production', category = 'media', category_label = 'Creative & Media',
  short_desc = 'Produksi video dan karya audiovisual profesional untuk profil, promosi, dokumentasi, dan komunikasi organisasi.',
  full_desc = 'Kami menangani proses produksi audiovisual mulai dari pengembangan konsep, persiapan produksi, pengambilan gambar, hingga penyusunan materi video siap tayang, tidak termasuk animasi.',
  icon_name = 'Film', image_url = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85',
  features = '["Konsep dan perencanaan produksi","Produksi video profil dan promosi","Dokumentasi kegiatan dan program","Penyusunan materi audiovisual siap tayang"]'::jsonb,
  deliverables = '["Video final sesuai format publikasi","File master produksi","Materi video versi pendek","Arsip footage terpilih sesuai kesepakatan"]'::jsonb,
  kbli_codes = '["59112"]'::jsonb,
  hero_tab_label = 'Multimedia', hero_eyebrow = 'Multimedia production', hero_title = 'Cerita yang bergerak dan meninggalkan kesan.',
  hero_description = 'Produksi video profesional untuk memperkenalkan program, organisasi, produk, dan kegiatan Anda.',
  hero_offer = 'Dari konsep kreatif dan pengambilan gambar hingga materi siap dipublikasikan.', hero_cta_label = 'Lihat layanan', hero_cta_href = '/services',
  hero_video_url = '/hero-media.mp4', hero_icon_class = 'bg-fuchsia-600', show_in_hero = true, sort_order = 7, updated_at = now()
where id = 'a1000000-0000-0000-0000-000000000007';

update public.services set
  slug = 'digital-content-visual-design', title = 'Digital Content & Visual Design', category = 'media', category_label = 'Creative & Media',
  short_desc = 'Pembuatan konten digital dan desain komunikasi visual untuk memperkuat identitas, informasi, dan promosi.',
  full_desc = 'Kami merancang identitas visual, materi media sosial, infografik, presentasi, publikasi digital, serta aset promosi yang konsisten dengan karakter organisasi atau jenama.',
  icon_name = 'Palette', image_url = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=85',
  features = '["Branding dan identitas visual","Konten grafis media sosial","Infografik dan materi presentasi","Desain publikasi dan materi promosi"]'::jsonb,
  deliverables = '["Aset visual siap publikasi","File master desain","Panduan penggunaan aset","Ekspor format digital dan cetak"]'::jsonb,
  kbli_codes = '["74130"]'::jsonb,
  hero_tab_label = 'Digital content', hero_eyebrow = 'Digital content & visual design', hero_title = 'Komunikasi visual yang kuat dan konsisten.',
  hero_description = 'Hadirkan desain dan konten digital yang membantu pesan organisasi lebih mudah dikenali dan dipahami.',
  hero_offer = 'Dari identitas visual hingga materi publikasi yang siap digunakan.', hero_cta_label = 'Lihat layanan', hero_cta_href = '/services',
  hero_video_url = '/hero-media.mp4', hero_icon_class = 'bg-rose-600', show_in_hero = true, sort_order = 8, updated_at = now()
where id = 'a1000000-0000-0000-0000-000000000008';
