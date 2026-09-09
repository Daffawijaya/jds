-- Use the Pexels videos selected for the service hero slides.
update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/7989672/7989672-hd_1920_1080_25fps.mp4',
    updated_at = now()
where slug = 'web-development';

update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/17512951/17512951-uhd_3840_2160_25fps.mp4',
    updated_at = now()
where slug = 'mobile-app-development';

update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/6563874/6563874-hd_1920_1080_25fps.mp4',
    updated_at = now()
where slug = 'outsourcing-managed-services';

update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/7963111/7963111-uhd_3840_2160_25fps.mp4',
    updated_at = now()
where slug = 'multimedia-production';

update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/5474810/5474810-hd_1920_1080_30fps.mp4',
    updated_at = now()
where slug = 'digital-content-visual-design';
