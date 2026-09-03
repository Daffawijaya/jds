import { CompanyInfo, Service, Project, CoreValue, CompanyStrength, JobPosting } from '@/types';

export const companyInfo: CompanyInfo = {
  officialName: 'Jaya Dinara Sukses',
  shortName: 'JDS',
  positioning: 'IT, Digital Solutions, Outsourcing & Professional Services',
  tagline: 'Mitra Solusi Teknologi, Digitalisasi, & Tenaga Ahli Profesional',
  overview: 'Jaya Dinara Sukses (JDS) adalah penyedia solusi IT terintegrasi, digitalisasi sistem, serta penyediaan jasa penyiapan dan pengelolaan tenaga ahli profesional. Kami berkomitmen membantu instansi pemerintah dan mitra bisnis dalam mempercepat transformasi digital secara efisien, efisien, dan handal.',
  address: 'Jalan Belimbing, Perum Manunggal Jaya No. 1 D1, Manunggal Jaya, Tenggarong Seberang, Kutai Kartanegara, Kalimantan Timur, Indonesia',
  village: 'Manunggal Jaya',
  district: 'Tenggarong Seberang',
  regency: 'Kutai Kartanegara',
  province: 'Kalimantan Timur',
  country: 'Indonesia',
  phone: '081928704503',
  whatsapp: '081928704503',
  whatsappUrl: 'https://wa.me/6281928704503',
  email: 'jayadinarasukses@gmail.com',
  instagram: '@jds_corp',
  instagramUrl: 'https://instagram.com/jds_corp',
};

export const siteNavLinks: { name: string; href: string }[] = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Layanan", href: "/services" },
  { name: "Proyek", href: "/projects" },
  { name: "Karir", href: "/career" },
  { name: "Kontak", href: "/contact" },
];

export const servicesData: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'development',
    shortDesc: 'Pengembangan situs web modern, responsif, dan teroptimasi untuk kebutuhan profil korporasi maupun portal publik.',
    fullDesc: 'Layanan web development Jaya Dinara Sukses mencakup pengerjaan website korporasi, portal informasi, hingga aplikasi berbasis web yang aman, cepat, dan mudah dikelola sesuai kebutuhan klien.',
    iconName: 'Globe',
    features: [
      'Desain modern & responsif (Mobile-first)',
      'Performa tinggi & integrasi SEO',
      'CMS / Sistem Manajemen Konten terstruktur',
      'Arsitektur keamanan web yang andal'
    ],
    deliverables: [
      'Website responsif siap pakai',
      'Dokumentasi teknis & manajemen',
      'Dukungan pasca-peluncuran'
    ]
  },
  {
    id: 'software-development',
    title: 'Software Development',
    category: 'development',
    shortDesc: 'Rancang bangun perangkat lunak custom skala kustom untuk otomatisasi proses bisnis dan manajemen data.',
    fullDesc: 'Kami mengembangkan solusi perangkat lunak yang disesuaikan dengan kebutuhan spesifik organisasi, mulai dari aplikasi manajemen internal hingga platform layanan publik.',
    iconName: 'Code2',
    features: [
      'Analisis kebutuhan sistem secara mendalam',
      'Arsitektur modular & scalable',
      'Pengujian fungsionalitas komprehensif',
      'Integrasi API & database modern'
    ],
    deliverables: [
      'Aplikasi software terinstal & teruji',
      'Source code & dokumentasi API',
      'Panduan penggunaan sistem'
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'development',
    shortDesc: 'Perancangan antarmuka intuitif dan pengalaman pengguna yang menarik untuk aplikasi web dan mobile.',
    fullDesc: 'Memastikan setiap produk digital mudah digunakan, fungsional, serta memberikan impresi visual profesional bagi para pengguna.',
    iconName: 'Layout',
    features: [
      'User Research & Wireframing',
      'Interactive Prototyping',
      'Design System & Component Library',
      'Usability Testing'
    ],
    deliverables: [
      'Figma prototype interaktif',
      'Design System aset digital',
      'Panduan panduan visual antarmuka'
    ]
  },
  {
    id: 'digitalization-solutions',
    title: 'Digitalization Solutions',
    category: 'solutions',
    shortDesc: 'Modernisasi alur kerja konvensional menjadi ekosistem digital terintegrasi untuk efisiensi operasional.',
    fullDesc: 'Membantu transformasi alur kerja manual menjadi sistem digital terpadu yang mempermudah pemantauan, pengelolaan data, dan pelayanan.',
    iconName: 'Cpu',
    features: [
      'Digitalisasi katalog & pendataan',
      'Otomatisasi alur kerja publik/internal',
      'Dashboard statistik & pemantauan data',
      'Integrasi antar-sistem organisasi'
    ],
    deliverables: [
      'Platform digital terintegrasi',
      'Dashboard manajemen data',
      'Pelatihan operasional tim'
    ]
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    category: 'consulting',
    shortDesc: 'Konsultasi strategis perencanaan teknologi informasi, arsitektur sistem, dan peta jalan digitalisasi.',
    fullDesc: 'Pendampingan konsultatif untuk menentukan arah pengembangan IT yang tepat, efisien, dan selaras dengan tujuan organisasi.',
    iconName: 'Lightbulb',
    features: [
      'Asesmen kebutuhan infrastruktur & IT',
      'Penyusunan Roadmap Transformasi Digital',
      'Rekomendasi arsitektur teknologi',
      'Evaluasi efisiensi sistem'
    ],
    deliverables: [
      'Dokumen rekomendasi IT & strategi',
      'Blueprint arsitektur sistem',
      'Laporan analisis kebutuhan'
    ]
  },
  {
    id: 'it-outsourcing',
    title: 'IT Outsourcing',
    category: 'outsourcing',
    shortDesc: 'Pengelolaan operasional teknologi informasi dan dukungan teknis secara terstruktur dan terukur.',
    fullDesc: 'Layanan alih daya pengelolaan IT bagi instansi atau perusahaan untuk memastikan keberlanjutan infrastruktur dan aplikasi tanpa beban operasional berlebih.',
    iconName: 'Server',
    features: [
      'Pengelolaan & pemeliharaan sistem',
      'Dukungan teknis berkala',
      'Pengawasan keandalan operasional',
      'Fleksibilitas skala alih daya'
    ],
    deliverables: [
      'Dukungan operasional IT terintegrasi',
      'Laporan pemeliharaan sistem',
      'SLA operasional yang terjamin'
    ]
  },
  {
    id: 'professional-staffing',
    title: 'Professional Staffing / Tenaga Ahli',
    category: 'outsourcing',
    shortDesc: 'Penyediaan dan penyiapan tenaga ahli IT profesional untuk penugasan program, pendampingan, dan pendukung proyek.',
    fullDesc: 'Jaya Dinara Sukses menyediakan SDM berkualitas dan berpengalaman di bidang IT dan pendampingan lapangan untuk memperkuat pelaksanaan kegiatan instansi maupun swasta.',
    iconName: 'Users',
    features: [
      'Seleksi & penyiapan tenaga ahli berkualifikasi',
      'Penyediaan tenaga pendamping teknis & UMKM',
      'Pengelolaan administrasi & kinerja SDM',
      'Penempatan fleksibel sesuai durasi program'
    ],
    deliverables: [
      'Tim tenaga ahli siap bertugas',
      'Pengawasan & laporan periodik kinerja SDM',
      'Dukungan koordinasi proyek'
    ]
  },
  {
    id: 'multimedia-digital-content',
    title: 'Multimedia & Digital Content',
    category: 'media',
    shortDesc: 'Pembuatan konten digital, desain grafis, dan materi komunikasi visual profesional untuk kebutuhan publikasi.',
    fullDesc: 'Dukungan kreasi media digital untuk menyampaikan informasi, promosi program, dan materi presentasi organisasi secara menarik dan berkualitas tinggi.',
    iconName: 'Film',
    features: [
      'Desain grafis & aset promosi digital',
      'Pembuatan video presentasi & profil',
      'Konten publikasi media sosial & web',
      'Materi publikasi event/kegiatan'
    ],
    deliverables: [
      'Aset grafis & multimedia berkualitas tinggi',
      'File master & format siap publikasi',
      'Aset pendukung promosi'
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: 'tenaga-ahli-umkm-2026',
    title: 'Penyedia Jasa Tenaga Ahli Pendamping UMKM 2026',
    client: 'Dinas Koperasi dan UKM Kabupaten Kutai Kartanegara',
    category: 'Professional Staffing & Digitalization',
    year: '2026',
    shortDesc: 'Penyediaan tenaga ahli IT dan digitalisasi profesional untuk mendukung kegiatan pendampingan serta transformasi digital UMKM.',
    fullDesc: 'Jaya Dinara Sukses bertindak sebagai penyedia jasa tenaga ahli profesional yang ditugaskan untuk melakukan pendampingan teknis dan digitalisasi bagi para pelaku UMKM di Kabupaten Kutai Kartanegara. Program ini fokus pada peningkatkan kapasitas SDM UMKM dalam mengadopsi teknologi digital.',
    scope: [
      'Penyiapan dan seleksi Tenaga Ahli IT & Pendamping UMKM',
      'Pendampingan teknis pemanfaatan platform digital',
      'Pengelolaan dan evaluasi kinerja tenaga pendamping',
      'Penyusunan laporan progres digitalisasi UMKM'
    ],
    tags: ['Professional Staffing', 'Tenaga Ahli', 'Digitalisasi UMKM', 'Dinas KUKM Kukar'],
    highlightBadge: 'Proyek Terverifikasi',
    imagePlaceholderText: 'Penyedia Jasa Tenaga Ahli Pendamping UMKM'
  },
  {
    id: 'etamhub',
    title: 'EtamHub',
    client: 'Dinas Koperasi dan UKM Kabupaten Kutai Kartanegara',
    category: 'Web Development & Digital Platform',
    year: '2026',
    shortDesc: 'Platform digital terpadu untuk katalog, informasi, dan promosi produk UMKM di Kabupaten Kutai Kartanegara.',
    fullDesc: 'EtamHub merupakan platform digital yang dirancang untuk menjadi wadah pusat informasi, katalog produk, dan sarana promosi UMKM lokal di Kabupaten Kutai Kartanegara. Platform ini memudahkan masyarakat dan instansi dalam menjelajahi serta mendukung produk-produk UMKM unggulan.',
    scope: [
      'Pengembangan sistem katalog digital UMKM',
      'Perancangan antarmuka pengguna (UI/UX) responsif',
      'Manajemen database produk & profil UMKM',
      'Fitur pencarian & kategori produk terstruktur'
    ],
    tags: ['Web Platform', 'Katalog UMKM', 'Digital Solutions', 'EtamHub'],
    highlightBadge: 'Platform Digital',
    imagePlaceholderText: 'Platform Digital EtamHub'
  }
];

export const coreValuesData: CoreValue[] = [
  {
    id: 'professionalism',
    title: 'Profesionalisme',
    desc: 'Menjalankan setiap penugasan dan proyek dengan standar kualitas tinggi, integritas, dan tanggung jawab penuh.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'innovation',
    title: 'Inovasi Tepat Guna',
    desc: 'Menghadirkan solusi teknologi dan digitalisasi yang praktis, efektif, serta memberikan manfaat nyata bagi pengguna.',
    iconName: 'Sparkles'
  },
  {
    id: 'collaboration',
    title: 'Kemitraan Handal',
    desc: 'Membangun hubungan kerja sama jangka panjang yang saling mempercayai dengan instansi pemerintah dan mitra bisnis.',
    iconName: 'Handshake'
  },
  {
    id: 'excellence',
    title: 'Kualitas SDM',
    desc: 'Menyiapkan tenaga ahli dan personel berkualitas yang kompeten serta berdedikasi tinggi di bidangnya.',
    iconName: 'UserCheck'
  }
];

export const companyStrengthsData: CompanyStrength[] = [
  {
    id: 'local-expertise',
    title: 'Pemahaman Kebutuhan Daerah & Lokal',
    desc: 'Berbasis di Kutai Kartanegara, Kalimantan Timur, JDS memiliki pemahaman mendalam terhadap karakter dan kebutuhan transformasi digital di daerah.',
    iconName: 'MapPin'
  },
  {
    id: 'integrated-services',
    title: 'Layanan Terintegrasi',
    desc: 'Menyediakan ekosistem solusi lengkap mulai dari software, web, desain UI/UX, konsultasi IT, hingga penyediaan tenaga ahli pendamping.',
    iconName: 'Layers'
  },
  {
    id: 'qualified-staff',
    title: 'Tenaga Ahli Berpengalaman',
    desc: 'Didukung oleh personel terampil dan profesional yang berpengalaman dalam pengelolaan proyek digitalisasi dan pendampingan program.',
    iconName: 'Award'
  },
  {
    id: 'adaptability',
    title: 'Pendekatan Fleksibel & Responsive',
    desc: 'Siap menyesuaikan kebutuhan spesifik instansi atau bisnis secara komunikatif dan tepat waktu.',
    iconName: 'Zap'
  }
];

export const jobPostingsData: JobPosting[] = [];
