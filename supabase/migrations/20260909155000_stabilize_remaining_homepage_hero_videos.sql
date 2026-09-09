-- Use steady, horizontal footage for the remaining homepage service slides.
update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/5876327/5876327-hd_1920_1080_30fps.mp4',
    updated_at = now()
where slug = 'mobile-app-development';

update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/16328807/16328807-hd_1920_1080_25fps.mp4',
    updated_at = now()
where slug = 'digital-content-visual-design';

update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/35898044/15226557_1920_1080_24fps.mp4',
    updated_at = now()
where slug = 'multimedia-production';

update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/37824568/16044314_1920_1080_60fps.mp4',
    updated_at = now()
where slug = 'outsourcing-managed-services';
