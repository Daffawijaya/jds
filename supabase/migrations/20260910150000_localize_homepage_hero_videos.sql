-- Serve the five homepage hero clips locally. Each file keeps the source
-- video stream unchanged and is trimmed to six seconds, without audio.
update public.services
set hero_video_url = '/videos/hero/web-development.mp4',
    updated_at = now()
where slug = 'web-development';

update public.services
set hero_video_url = '/videos/hero/mobile-app-development.mp4',
    updated_at = now()
where slug = 'mobile-app-development';

update public.services
set hero_video_url = '/videos/hero/digital-content-visual-design.mp4',
    updated_at = now()
where slug = 'digital-content-visual-design';

update public.services
set hero_video_url = '/videos/hero/multimedia-production.mp4',
    updated_at = now()
where slug = 'multimedia-production';

update public.services
set hero_video_url = '/videos/hero/outsourcing-managed-services.mp4',
    updated_at = now()
where slug = 'outsourcing-managed-services';
