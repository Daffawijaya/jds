-- Supply the database-driven homepage carousel with final project copy and imagery.
update public.projects
set title = 'Membangun etamhub sebagai rumah digital UMKM Kutai Kartanegara.',
    image_url = '/image/etamhub.png',
    updated_at = now()
where slug = 'etamhub';

update public.projects
set title = 'Menghadirkan tenaga ahli pendamping UMKM yang siap bertugas.',
    image_url = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80',
    updated_at = now()
where slug = 'tenaga-ahli-umkm-2026';
