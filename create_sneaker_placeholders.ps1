# PowerShell script to create placeholder sneaker images
# Creates simple colored rectangles as placeholders

$baseDir = "d:\lil jwrld\Sneakers\sneakers-react-app\public\assets\images\sneakers"

# Define sneakers for each player
$sneakers = @{
    "anthony-edwards" = @(
        "ae-1-with-love.jpg",
        "ae-1-velocity-blue.jpg",
        "ae-1-new-wave.jpg",
        "ae-1-best-of-adi.jpg",
        "ae-1-georgia-red-clay.jpg",
        "ae-1-ascent.jpg",
        "ae-1-mural.jpg",
        "ae-1-pre-loved-purple.jpg",
        "ae-1-stormtrooper.jpg",
        "ae-1-all-star.jpg"
    )
    "stephen-curry" = @(
        "curry-11-future.jpg",
        "curry-10-iron.jpg",
        "curry-11-dub-nation.jpg",
        "curry-9-elmo.jpg",
        "curry-4-flotro.jpg",
        "curry-10-northern-lights.jpg",
        "curry-1-mvp.jpg",
        "curry-11-bruce-lee.jpg",
        "curry-10-unicorn.jpg",
        "curry-11-mouthguard.jpg"
    )
    "giannis-antetokounmpo" = @(
        "freak-5-greece.jpg",
        "freak-4-knowledge.jpg",
        "freak-3-dutch-blue.jpg",
        "freak-2-bamo.jpg",
        "freak-1-america.jpg",
        "freak-5-sepolia.jpg",
        "freak-4-unbelievable.jpg",
        "freak-3-cherry.jpg",
        "freak-5-oreo.jpg",
        "freak-6-roses.jpg"
    )
    "james-harden" = @(
        "harden-7-black.jpg",
        "harden-8-white.jpg",
        "harden-6-lucky.jpg",
        "harden-5-natural.jpg",
        "harden-4-lemonade.jpg",
        "harden-7-cyan.jpg",
        "harden-8-flamingo.jpg",
        "harden-3-mission.jpg",
        "harden-1-pioneer.jpg",
        "harden-7-yellow.jpg"
    )
    "kyrie-irving" = @(
        "kyrie-8-infinity.jpg",
        "kyrie-7-soundwave.jpg",
        "kyrie-6-preheat.jpg",
        "kyrie-5-spongebob.jpg",
        "kyrie-4-confetti.jpg",
        "kyrie-low-5-community.jpg",
        "kyrie-7-daybreak.jpg",
        "kyrie-3-mamba.jpg",
        "kyrie-2-whatthe.jpg",
        "kyrie-1-red.jpg"
    )
}

Write-Host "🏀 Creating Sneaker Placeholder Images..." -ForegroundColor Cyan
Write-Host "=" * 50

$totalCreated = 0
$totalSkipped = 0

foreach ($player in $sneakers.Keys) {
    $playerDir = Join-Path $baseDir $player
    
    Write-Host "`n📁 Processing $player..." -ForegroundColor Yellow
    
    foreach ($filename in $sneakers[$player]) {
        $filepath = Join-Path $playerDir $filename
        
        if (Test-Path $filepath) {
            Write-Host "  ⏭️  Skipped (exists): $filename" -ForegroundColor Gray
            $totalSkipped++
        } else {
            # Create a simple 1x1 pixel image (will be replaced with actual images)
            # Using .NET to create a minimal valid JPEG
            Add-Type -AssemblyName System.Drawing
            
            $bitmap = New-Object System.Drawing.Bitmap(800, 800)
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            
            # Fill with light gray background
            $graphics.Clear([System.Drawing.Color]::FromArgb(240, 240, 240))
            
            # Add text
            $font = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Bold)
            $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100, 100, 100))
            $text = $filename -replace '\.jpg$', '' -replace '-', ' '
            $textSize = $graphics.MeasureString($text, $font)
            $x = (800 - $textSize.Width) / 2
            $y = (800 - $textSize.Height) / 2
            $graphics.DrawString($text, $font, $brush, $x, $y)
            
            # Save the image
            $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            
            $graphics.Dispose()
            $bitmap.Dispose()
            
            Write-Host "  ✅ Created: $filename" -ForegroundColor Green
            $totalCreated++
        }
    }
}

Write-Host "`n" + ("=" * 50)
Write-Host "✨ Complete!" -ForegroundColor Green
Write-Host "   Created: $totalCreated images" -ForegroundColor Cyan
Write-Host "   Skipped: $totalSkipped images" -ForegroundColor Yellow
Write-Host "📂 Location: $baseDir" -ForegroundColor Cyan
