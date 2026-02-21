# Banner Video Setup Guide

## Overview
The player collection pages now support background videos in the hero banner section. The implementation includes:

✅ **Video Features:**
- Full-width, full-height background video
- Automatic playback with muted audio
- Responsive design (mobile and desktop)
- Dark overlay for text readability
- Fallback to banner image if video fails
- Optimized loading with metadata preload
- No layout shift

## How Videos Work

### Conditional Rendering
- If a player has a `bannerVideo` property, the video is displayed
- If no video is provided, the existing `bannerImage` is used as a fallback
- This ensures backward compatibility with existing data

### Image Element Hierarchy
1. **Video element** (if `bannerVideo` exists) - plays as background
2. **Dark overlay** (bg-black/50) - improves text contrast
3. **Gradient overlay** - smooth transition to content
4. **Hero text** - positioned above everything with z-10

## Adding Videos to Player Data

### JSON Structure
Add the `bannerVideo` property to any player in `nbaData.json` or `wnbaData.json`:

```json
{
    "id": 1,
    "name": "Anthony Edwards",
    "team": "Minnesota Timberwolves",
    "position": "Shooting Guard",
    "profileImage": "/assets/images/players/anthony-edwards.jpg",
    "bannerImage": "/assets/images/players/anthony-edwards.jpg",
    "bannerVideo": "/assets/videos/players/anthony-edwards-banner.mp4",
    "bio": "...",
    "shoes": [...]
}
```

### Video File Placement
Place video files in: `/public/assets/videos/players/`

Example structure:
```
public/
└── assets/
    └── videos/
        └── players/
            ├── anthony-edwards-banner.mp4
            ├── lebron-james-banner.mp4
            └── kobe-bryant-banner.mp4
```

## Video Optimization Guidelines

### Format & Codec
- **Format:** MP4 (H.264 codec)
- **Audio:** Excluded (muted attribute applied)
- **Container:** MPEG-4 (.mp4)

### File Size Recommendations
- **Maximum:** 5-8 MB per video
- **Target:** 2-4 MB for optimal loading
- **Duration:** 8-15 seconds loops recommended

### Compression Settings
Use FFmpeg for optimal compression:

```bash
# Basic compression
ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 28 -c:a aac -b:a 128k output.mp4

# Aggressive compression (larger file reduction)
ffmpeg -i input.mp4 -c:v libx264 -preset fast -crf 30 -c:a aac -b:a 64k output.mp4

# With resolution scaling (recommended for web)
ffmpeg -i input.mp4 -vf scale=1920:-1 -c:v libx264 -preset medium -crf 28 output.mp4
```

### Optional Encoding Settings
- **Bitrate:** 500-1000 kbps (video only)
- **Resolution:** 1920x1080 or 1280x720 (scales down for mobile)
- **Frame rate:** 24-30 fps
- **CRF:** 26-30 (quality scale, higher = more compression)

## Performance Considerations

### Loading
- Videos use `preload="metadata"` - only metadata loads until play
- Minimal impact on initial page load
- Video buffer depends on user's connection

### Mobile Optimization
- Videos use `playsInline` attribute for mobile browsers
- `object-cover` ensures proper scaling on all screen sizes
- No layout shift since container height is fixed (40vh/60vh)

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Fallback to image for older browsers or video loading failures
- Poster attribute shows banner image while video loads

## Text Readability

### Dark Overlay
- Semi-transparent black (bg-black/50) provides 50% opacity overlay
- Ensures text is readable over any video

### Text Styling
- White text (text-white) 
- Drop shadow for additional contrast (drop-shadow-lg)
- Gradient text for secondary text (from-white to-slate-200)

### Mobile Responsiveness
- Text size: 5xl on mobile, 8xl on desktop
- Padding: 2rem (8px) on mobile, 4rem (16px) on desktop
- Full-width container ensures text never gets cut off

## Testing Checklist

- [ ] Video plays automatically on desktop
- [ ] Video is muted
- [ ] Video loops smoothly
- [ ] Video doesn't cause layout shift
- [ ] Text is readable over video
- [ ] Video scales properly on mobile
- [ ] Video pauses on mobile (if desired)
- [ ] Fallback image displays if video fails to load
- [ ] Page still works for players without bannerVideo
- [ ] Dark theme overlay is visible
- [ ] No console errors related to video loading

## Troubleshooting

### Video Not Playing
1. Check file path in JSON matches actual file location
2. Verify file format is MP4 (H.264)
3. Test in different browsers
4. Check console for CORS errors
5. Verify video file is not corrupted

### Video Looks Stretched
- Ensure `object-cover` class is applied
- Video should maintain aspect ratio
- Container height (40vh/60vh) is intentional

### Text Not Readable
- Check overlay opacity (should be bg-black/50)
- Verify text color is text-white
- Ensure z-index is z-10 for text container

### Performance Issues
- Reduce video file size further
- Reduce resolution
- Increase CRF value (more compression)

## Future Enhancements

Potential improvements for video playback:
- Pause video on mobile (save bandwidth)
- Add play button overlay
- Create custom video selection logic
- Implement video analytics
- Add transition effects between videos
