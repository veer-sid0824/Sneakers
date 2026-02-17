# PowerShell script to create placeholder sneaker images
Add-Type -AssemblyName System.Drawing

$baseDir = "d:\lil jwrld\Sneakers\sneakers-react-app\public\assets\images\sneakers"

# Define all sneakers
$allSneakers = @{
    "anthony-edwards" = @("ae-1-with-love.jpg", "ae-1-velocity-blue.jpg", "ae-1-new-wave.jpg", "ae-1-best-of-adi.jpg", "ae-1-georgia-red-clay.jpg", "ae-1-ascent.jpg", "ae-1-mural.jpg", "ae-1-pre-loved-purple.jpg", "ae-1-stormtrooper.jpg", "ae-1-all-star.jpg")
    "stephen-curry" = @("curry-11-future.jpg", "curry-10-iron.jpg", "curry-11-dub-nation.jpg", "curry-9-elmo.jpg", "curry-4-flotro.jpg", "curry-10-northern-lights.jpg", "curry-1-mvp.jpg", "curry-11-bruce-lee.jpg", "curry-10-unicorn.jpg", "curry-11-mouthguard.jpg")
    "giannis-antetokounmpo" = @("freak-5-greece.jpg", "freak-4-knowledge.jpg", "freak-3-dutch-blue.jpg", "freak-2-bamo.jpg", "freak-1-america.jpg", "freak-5-sepolia.jpg", "freak-4-unbelievable.jpg", "freak-3-cherry.jpg", "freak-5-oreo.jpg", "freak-6-roses.jpg")
    "james-harden" = @("harden-7-black.jpg", "harden-8-white.jpg", "harden-6-lucky.jpg", "harden-5-natural.jpg", "harden-4-lemonade.jpg", "harden-7-cyan.jpg", "harden-8-flamingo.jpg", "harden-3-mission.jpg", "harden-1-pioneer.jpg", "harden-7-yellow.jpg")
    "kyrie-irving" = @("kyrie-8-infinity.jpg", "kyrie-7-soundwave.jpg", "kyrie-6-preheat.jpg", "kyrie-5-spongebob.jpg", "kyrie-4-confetti.jpg", "kyrie-low-5-community.jpg", "kyrie-7-daybreak.jpg", "kyrie-3-mamba.jpg", "kyrie-2-whatthe.jpg", "kyrie-1-red.jpg")
}

Write-Host "Creating Sneaker Placeholder Images..." -ForegroundColor Cyan

$totalCreated = 0
$totalSkipped = 0

foreach ($player in $allSneakers.Keys) {
    $playerDir = Join-Path $baseDir $player
    Write-Host "Processing $player..." -ForegroundColor Yellow
    
    foreach ($filename in $allSneakers[$player]) {
        $filepath = Join-Path $playerDir $filename
        
        if (Test-Path $filepath) {
            Write-Host "  Skipped: $filename" -ForegroundColor Gray
            $totalSkipped++
        } else {
            $bitmap = New-Object System.Drawing.Bitmap(800, 800)
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            $graphics.Clear([System.Drawing.Color]::FromArgb(240, 240, 240))
            
            $font = New-Object System.Drawing.Font("Arial", 20, [System.Drawing.FontStyle]::Bold)
            $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100, 100, 100))
            $text = $filename.Replace(".jpg", "").Replace("-", " ")
            $textSize = $graphics.MeasureString($text, $font)
            $x = (800 - $textSize.Width) / 2
            $y = (800 - $textSize.Height) / 2
            $graphics.DrawString($text, $font, $brush, $x, $y)
            
            $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            $graphics.Dispose()
            $bitmap.Dispose()
            
            Write-Host "  Created: $filename" -ForegroundColor Green
            $totalCreated++
        }
    }
}

Write-Host ""
Write-Host "Complete! Created: $totalCreated, Skipped: $totalSkipped" -ForegroundColor Green
Write-Host "Location: $baseDir" -ForegroundColor Cyan
