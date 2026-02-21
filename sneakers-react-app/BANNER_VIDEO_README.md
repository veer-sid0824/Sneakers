# Banner Video Implementation - Complete Guide

## ✨ What's New

The player collection pages now feature **background video support** in the hero banner section instead of static images. This creates a more dynamic and engaging experience.

### Features Implemented

✅ **Video Background**
- Full-width, full-height video playback
- Automatic playback with muted audio
- Smooth looping for seamless experience
- Mobile-optimized with `playsInline` attribute

✅ **Text Readability**
- Dark overlay (50% black opacity) over video
- Gradient overlay for smooth transitions
- White text with shadow for maximum contrast
- Responsive text sizing (5xl mobile, 8xl desktop)

✅ **Reliability**
- Fallback to static image if video fails to load
- Fallback image serves as poster while video loads
- Graceful degradation for older browsers
- No layout shift or performance issues

✅ **Optimization**
- Compressed MP4 format (H.264 codec)
- Metadata preload only (faster initial load)
- Reasonable file sizes (2-4 MB recommended)
- Responsive scaling on all devices

✅ **Backward Compatibility**
- Players without `bannerVideo` use `bannerImage` instead
- No code changes needed for existing player data
- Gradual rollout possible

## 📁 Project Structure

```
sneakers-react-app/
├── src/
│   ├── pages/
│   │   └── PlayerCollectionPage.tsx  (UPDATED)
│   └── types/
│       └── index.ts                   (UPDATED)
├── public/
│   └── assets/
│       └── videos/
│           └── players/               (NEW - for video files)
├── BANNER_VIDEO_SETUP.md              (NEW - comprehensive guide)
├── BANNER_VIDEO_EXAMPLE.json          (NEW - example configuration)
├── compress-videos.ps1                (NEW - PowerShell compression script)
└── compress-videos.sh                 (NEW - Bash compression script)
```

## 🚀 Quick Start

### Step 1: Prepare Your Video
1. Have a video file ready (any format that FFmpeg supports)
2. Ideally: 8-15 seconds long, 1920x1080 resolution

### Step 2: Compress Video (Windows)
```powershell
# Navigate to project root
cd d:\lil jwrld\Sneakers\sneakers-react-app

# Run compression script
.\compress-videos.ps1 -InputVideo "C:\path\to\video.mp4" -Quality medium

# Output: public/assets/videos/players/video-banner.mp4
```

### Step 3: Compress Video (Mac/Linux)
```bash
# Navigate to project root
cd ~/path/to/sneakers-react-app

# Run compression script
bash compress-videos.sh ~/path/to/video.mp4 medium

# Output: public/assets/videos/players/video-banner.mp4
```

### Step 4: Update Player Data
Edit `src/data/nbaData.json` or `src/data/wnbaData.json`:

```json
{
    "id": 1,
    "name": "Anthony Edwards",
    // ... existing fields ...
    "bannerImage": "/assets/images/players/anthony-edwards.jpg",
    "bannerVideo": "/assets/videos/players/anthony-edwards-banner.mp4"  // ADD THIS
}
```

### Step 5: Test
1. Run the app: `npm run dev`
2. Navigate to a player's collection page
3. Verify video plays, text is readable, and fallback works

## 🎬 Video Specifications

### Recommended Settings
| Property | Value |
|----------|-------|
| Format | MP4 (H.264) |
| Resolution | 1920x1080 or 1280x720 |
| Frame Rate | 24-30 fps |
| Bitrate | 500-1000 kbps (video only) |
| Duration | 8-15 seconds |
| File Size | 2-4 MB |
| Audio | None (muted) |

### Compression Commands

**Standard (Balanced Quality)**
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 28 -vf scale=1920:-1 -c:a aac -b:a 128k output.mp4
```

**Aggressive (Smaller File)**
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset fast -crf 30 -vf scale=1920:-1 -c:a aac -b:a 64k output.mp4
```

**High Quality (Larger File)**
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 26 -vf scale=1920:-1 -c:a aac -b:a 128k output.mp4
```

## 🎨 Customization

### Text Color
The hero text automatically adjusts text color for readability:
- **Light text** (text-white) for visibility over videos
- **Drop shadow** for additional contrast
- **Gradient text** for secondary text

### Overlay Opacity
To adjust overlay darkness, edit [PlayerCollectionPage.tsx](src/pages/PlayerCollectionPage.tsx):

```tsx
// Current: 50% opacity
<div className="absolute inset-0 bg-black/50 z-5" />

// Options:
// bg-black/30  - 30% opacity (lighter)
// bg-black/40  - 40% opacity
// bg-black/50  - 50% opacity (current)
// bg-black/60  - 60% opacity
// bg-black/70  - 70% opacity (darker)
```

### Video Height
To adjust banner height, edit [PlayerCollectionPage.tsx](src/pages/PlayerCollectionPage.tsx):

```tsx
// Current: 40vh on mobile, 60vh on desktop
<div className="relative h-[40vh] md:h-[60vh] overflow-hidden">

// Options:
// h-[30vh]   - 30% viewport height
// h-[40vh]   - 40% viewport height (current mobile)
// h-[60vh]   - 60% viewport height (current desktop)
// h-[80vh]   - 80% viewport height
// h-screen   - Full viewport height
```

## 🔧 Technical Details

### Component Implementation

**Location:** [src/pages/PlayerCollectionPage.tsx](src/pages/PlayerCollectionPage.tsx#L122-L160)

**Rendering Logic:**
```tsx
{player.bannerVideo ? (
    // Render video element
    <motion.video autoPlay muted loop playsInline ... />
) : (
    // Fallback to image
    <motion.img ... />
)}
```

**Overlays (z-index order):**
1. Video/Image (z-0/implicit)
2. Dark overlay (z-5) - bg-black/50
3. Gradient overlay (z-5) - bg-gradient-to-t
4. Text container (z-10) - "relative z-10"

**Styling Classes:**
- Container: `relative h-[40vh] md:h-[60vh] overflow-hidden`
- Video/Image: `absolute top-0 left-0 w-full h-full object-cover`
- Overlay: `absolute inset-0 bg-black/50 z-5`
- Text: `absolute bottom-0 left-0 w-full z-10 relative`

### Type Definitions

**Location:** [src/types/index.ts](src/types/index.ts)

**New Field:**
```typescript
export interface Player {
    // ... existing fields ...
    bannerVideo?: string;  // NEW - optional video path
}
```

## 📊 Performance Considerations

### Loading Strategy
- **Preload Mode:** Metadata only (`preload="metadata"`)
- **Initial Load Impact:** Minimal (only metadata downloads)
- **Playback:** Buffers as user watches
- **Fallback:** Image loads if video fails

### Mobile Optimization
- Uses `playsInline` for mobile support
- `object-cover` ensures proper scaling
- Fixed container height prevents layout shift
- Video size can be adjusted via CSS height property

### Browser Support
| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| IE 11 | ⚠️ Fallback to image |

## 🐛 Troubleshooting

### Video Not Playing
1. **Check file path:** Verify path matches exactly in JSON
2. **Check format:** Ensure file is MP4 with H.264 codec
3. **Test file:** Try opening in browser directly
4. **Check console:** Look for CORS or loading errors

### Text Not Readable
1. **Check overlay:** Verify `bg-black/50` class is applied
2. **Check z-index:** Text container should have `z-10`
3. **Increase opacity:** Try `bg-black/60` or `bg-black/70`

### Video Looks Stretched/Distorted
1. **Check object-fit:** Should be `object-cover`
2. **Check container:** Should be `overflow-hidden`
3. **Check aspect ratio:** Video should match or exceed 16:9

### Large File Size
1. **Reduce resolution:** Scale down to 1280x720
2. **Reduce duration:** Trim to 8-10 seconds
3. **Increase CRF:** Use CRF 30 instead of 28
4. **Reduce bitrate:** Lower audio bitrate to 64k

## ✅ Testing Checklist

- [ ] Video plays on desktop
- [ ] Video plays on mobile (with playsInline)
- [ ] Video is muted
- [ ] Video loops smoothly
- [ ] Text is readable over video
- [ ] No layout shift when video loads
- [ ] Fallback image shows if video fails
- [ ] Players without video still work
- [ ] Dark theme overlay visible
- [ ] No console errors

## 📚 Related Files

- [BANNER_VIDEO_SETUP.md](BANNER_VIDEO_SETUP.md) - Detailed setup guide
- [BANNER_VIDEO_EXAMPLE.json](BANNER_VIDEO_EXAMPLE.json) - Configuration examples
- [compress-videos.ps1](compress-videos.ps1) - Windows compression script
- [compress-videos.sh](compress-videos.sh) - Mac/Linux compression script
- [src/pages/PlayerCollectionPage.tsx](src/pages/PlayerCollectionPage.tsx) - Implementation
- [src/types/index.ts](src/types/index.ts) - Type definitions

## 🎯 Next Steps

1. **Add Videos:** Use compression scripts to prepare player videos
2. **Update Data:** Add `bannerVideo` paths to player JSON files
3. **Test:** Verify on multiple browsers and devices
4. **Optimize:** Adjust compression settings based on quality/size trade-offs
5. **Monitor:** Track performance in production
6. **Enhance:** Consider adding video pause on mobile, captions, etc.

## 📝 Notes

- Videos are **optional** - existing setup works without them
- Fallback is **automatic** - no code changes needed
- Performance **optimized** - metadata preload minimizes impact
- Mobile **friendly** - fully responsive design
- **No breaking changes** - backward compatible

## 🆘 Need Help?

Refer to:
1. [BANNER_VIDEO_SETUP.md](BANNER_VIDEO_SETUP.md) - Comprehensive technical guide
2. FFmpeg docs: https://ffmpeg.org/documentation.html
3. Browser video support: https://caniuse.com/video
4. Tailwind CSS: https://tailwindcss.com/
