# Video Compression Script for Player Banner Videos
# PowerShell version for Windows users
# Requires FFmpeg to be installed

param(
    [string]$InputVideo,
    [string]$Quality = "medium"
)

# Configuration
$OutputDir = "public/assets/videos/players"
$CRF = 28
$Resolution = 1920

# Function to display usage
function Show-Usage {
    Write-Host "Usage: .\compress-videos.ps1 -InputVideo <path> [-Quality <low|medium|high>]"
    Write-Host ""
    Write-Host "Quality Settings:"
    Write-Host "  low     - CRF 30 (smaller file, lower quality)"
    Write-Host "  medium  - CRF 28 (balanced) [DEFAULT]"
    Write-Host "  high    - CRF 26 (larger file, higher quality)"
    Write-Host ""
    Write-Host "Example:"
    Write-Host "  .\compress-videos.ps1 -InputVideo C:\Downloads\anthony-edwards.mp4 -Quality medium"
    exit 1
}

# Check if input video is provided
if ([string]::IsNullOrEmpty($InputVideo)) {
    Show-Usage
}

# Set quality settings
switch ($Quality) {
    "low" { $CRF = 30; $QualityName = "low" }
    "medium" { $CRF = 28; $QualityName = "medium" }
    "high" { $CRF = 26; $QualityName = "high" }
    default { 
        Write-Host "Invalid quality: $Quality"
        Show-Usage
    }
}

# Check if FFmpeg is installed
try {
    ffmpeg -version 2>&1 | Out-Null
}
catch {
    Write-Host "Error: FFmpeg is not installed or not in PATH"
    Write-Host "Install FFmpeg from: https://ffmpeg.org/download.html"
    exit 1
}

# Check if input file exists
if (-not (Test-Path $InputVideo)) {
    Write-Host "Error: Input file not found: $InputVideo"
    exit 1
}

# Create output directory
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

# Generate output filename
$BaseName = [System.IO.Path]::GetFileNameWithoutExtension($InputVideo)
$OutputVideo = Join-Path $OutputDir "$BaseName-banner.mp4"

# Display info
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Video Compression Settings" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Input:      $InputVideo"
Write-Host "Output:     $OutputVideo"
Write-Host "Quality:    $QualityName (CRF: $CRF)"
Write-Host "Resolution: $Resolution"
Write-Host "Format:     MP4 (H.264)"
Write-Host ""

# Get input video info
Write-Host "Analyzing input video..."
$FileInfo = Get-Item $InputVideo
$InputSize = [math]::Round($FileInfo.Length / 1MB, 2)
Write-Host "Input file size: $InputSize MB"
Write-Host ""

# Compress video
Write-Host "Compressing video (this may take a while)..." -ForegroundColor Yellow
ffmpeg -i "$InputVideo" `
    -c:v libx264 `
    -preset medium `
    -crf $CRF `
    -vf "scale=$Resolution:-1" `
    -c:a aac `
    -b:a 128k `
    -y `
    "$OutputVideo"

# Check if compression was successful
if ($LASTEXITCODE -eq 0) {
    $OutputInfo = Get-Item $OutputVideo
    $OutputSize = [math]::Round($OutputInfo.Length / 1MB, 2)
    
    Write-Host ""
    Write-Host "=========================================" -ForegroundColor Green
    Write-Host "Compression Complete!" -ForegroundColor Green
    Write-Host "=========================================" -ForegroundColor Green
    Write-Host "Output file: $OutputVideo"
    Write-Host "Output size: $OutputSize MB"
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Verify the video quality by opening it"
    Write-Host "2. Check the file size is reasonable (2-4 MB ideal)"
    Write-Host "3. Update nbaData.json or wnbaData.json with:"
    Write-Host "   `"bannerVideo`": `"/assets/videos/players/$BaseName-banner.mp4`""
    Write-Host ""
    
    # Optional: Create a test HTML file
    $Response = Read-Host "Create a test HTML file to preview the video? (y/n)"
    if ($Response -eq "y" -or $Response -eq "Y") {
        $TestHTML = "public\test-video-$BaseName.html"
        $HTMLContent = @"
<!DOCTYPE html>
<html>
<head>
    <title>Video Preview - $BaseName</title>
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
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        }
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .info {
            color: #ccc;
            background: #2a2a2a;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4f46e5;
        }
        .info p {
            margin: 8px 0;
            line-height: 1.6;
        }
        .info strong {
            color: #fff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Video Preview: $BaseName</h1>
        <div class="video-preview">
            <video autoplay muted loop controls>
                <source src="/assets/videos/players/$BaseName-banner.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="info">
            <p><strong>File:</strong> /assets/videos/players/$BaseName-banner.mp4</p>
            <p><strong>File Size:</strong> $OutputSize MB</p>
            <p><strong>Codec:</strong> H.264 (MP4)</p>
            <p><strong>Resolution:</strong> $Resolution (scaled)</p>
            <p><strong>Quality Setting:</strong> CRF $CRF (medium)</p>
            <p><strong>Notes:</strong> Quality looks good? File size acceptable? If satisfied, add this video path to the player's JSON data.</p>
        </div>
    </div>
</body>
</html>
"@
        Set-Content -Path $TestHTML -Value $HTMLContent
        Write-Host "Test HTML created: $TestHTML" -ForegroundColor Green
    }
}
else {
    Write-Host "Error: Compression failed" -ForegroundColor Red
    exit 1
}
