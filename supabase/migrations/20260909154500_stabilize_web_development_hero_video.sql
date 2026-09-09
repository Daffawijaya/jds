-- Replace the handheld web-development footage with a steadier professional coding shot.
update public.services
set hero_video_url = 'https://videos.pexels.com/video-files/36328473/15406850_1920_1080_25fps.mp4',
    updated_at = now()
where slug = 'web-development';
