#!/bin/bash
# Video Compression Script for Player Banner Videos
# This script compresses videos to optimal sizes for web display

# Configuration
INPUT_VIDEO=$1
OUTPUT_DIR="public/assets/videos/players"
QUALITY="medium"
CRF=28
RESOLUTION=1920

# Function to display usage
usage() {
    echo "Usage: $0 <input_video> [quality: low|medium|high]"
    echo ""
    echo "Quality Settings:"
    echo "  low     - CRF 30 (smaller file, lower quality)"
    echo "  medium  - CRF 28 (balanced)"
    echo "  high    - CRF 26 (larger file, higher quality)"
    echo ""
    echo "Example:"
    echo "  $0 ~/Downloads/anthony-edwards.mp4 medium"
    exit 1
}

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: FFmpeg is not installed"
    echo "Install it with: brew install ffmpeg (macOS) or apt install ffmpeg (Linux)"
    exit 1
fi

# Check arguments
if [ -z "$INPUT_VIDEO" ]; then
    usage
fi

if [ "$INPUT_VIDEO" = "--help" ] || [ "$INPUT_VIDEO" = "-h" ]; then
    usage
fi

# Set quality settings
if [ ! -z "$2" ]; then
    case $2 in
        low)
            CRF=30
            QUALITY="low"
            ;;
        medium)
            CRF=28
            QUALITY="medium"
            ;;
        high)
            CRF=26
            QUALITY="high"
            ;;
        *)
            echo "Invalid quality: $2"
            usage
            ;;
    esac
fi

# Check if input file exists
if [ ! -f "$INPUT_VIDEO" ]; then
    echo "Error: Input file not found: $INPUT_VIDEO"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Generate output filename
BASE_NAME=$(basename "$INPUT_VIDEO" | sed 's/\.[^.]*$//')
OUTPUT_VIDEO="$OUTPUT_DIR/${BASE_NAME}-banner.mp4"

# Display info
echo "========================================="
echo "Video Compression Settings"
echo "========================================="
echo "Input:      $INPUT_VIDEO"
echo "Output:     $OUTPUT_VIDEO"
echo "Quality:    $QUALITY (CRF: $CRF)"
echo "Resolution: $RESOLUTION"
echo "Format:     MP4 (H.264)"
echo ""

# Get input video info
echo "Analyzing input video..."
INPUT_SIZE=$(du -h "$INPUT_VIDEO" | cut -f1)
echo "Input file size: $INPUT_SIZE"
echo ""

# Compress video
echo "Compressing video (this may take a while)..."
ffmpeg -i "$INPUT_VIDEO" \
    -c:v libx264 \
    -preset medium \
    -crf $CRF \
    -vf "scale=$RESOLUTION:-1" \
    -c:a aac \
    -b:a 128k \
    -y \
    "$OUTPUT_VIDEO"

# Check if compression was successful
if [ $? -eq 0 ]; then
    OUTPUT_SIZE=$(du -h "$OUTPUT_VIDEO" | cut -f1)
    echo ""
    echo "========================================="
    echo "Compression Complete!"
    echo "========================================="
    echo "Output file: $OUTPUT_VIDEO"
    echo "Output size: $OUTPUT_SIZE"
    echo ""
    echo "Next steps:"
    echo "1. Verify the video quality by opening it"
    echo "2. Check the file size is reasonable (2-4 MB ideal)"
    echo "3. Update nbaData.json or wnbaData.json with:"
    echo "   \"bannerVideo\": \"/assets/videos/players/${BASE_NAME}-banner.mp4\""
    echo ""
else
    echo "Error: Compression failed"
    exit 1
fi

# Optional: Create a test HTML file
read -p "Create a test HTML file to preview the video? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    TEST_HTML="public/test-video-${BASE_NAME}.html"
    cat > "$TEST_HTML" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Video Preview</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #1a1a1a;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: white;
            margin-bottom: 20px;
        }
        .video-preview {
            position: relative;
            width: 100%;
            height: 60vh;
            background: #000;
            overflow: hidden;
            margin-bottom: 20px;
        }
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .info {
            color: #ccc;
            background: #2a2a2a;
            padding: 15px;
            border-radius: 8px;
        }
        .info p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Video Preview</h1>
        <div class="video-preview">
            <video autoplay muted loop>
                <source src="REPLACE_WITH_VIDEO_PATH" type="video/mp4">
            </video>
        </div>
        <div class="info">
            <p><strong>File:</strong> REPLACE_WITH_VIDEO_PATH</p>
            <p><strong>Codec:</strong> H.264 (MP4)</p>
            <p><strong>Settings:</strong> 1920x1080, 24-30fps, CRF 28</p>
            <p><strong>Notes:</strong> Quality looks good? File size acceptable?</p>
        </div>
    </div>
</body>
</html>
EOF
    echo "Test HTML created: $TEST_HTML"
fi
