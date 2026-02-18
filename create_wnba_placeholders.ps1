# PowerShell script to create placeholder WNBA images
$baseDir = "d:\lil jwrld\Sneakers\sneakers-react-app\public\assets\images\wnba"

# Create directories
$playerDir = Join-Path $baseDir "players"
if (!(Test-Path $playerDir)) { New-Item -ItemType Directory -Path $playerDir }

$sneakerBaseDir = Join-Path $baseDir "sneakers"
if (!(Test-Path $sneakerBaseDir)) { New-Item -ItemType Directory -Path $sneakerBaseDir }

# Define players and sneakers
$players = @(
    "breanna-stewart",
    "sabrina-ionescu",
    "aja-wilson",
    "kelsey-plum",
    "candace-parker"
)

$sneakers = @{
    "breanna-stewart" = @(
        "stewie-2-fly-high.jpg", "stewie-2-liberty.jpg", "stewie-1-quiet-fire.jpg", 
        "stewie-2-rose-gold.jpg", "stewie-1-storm.jpg", "stewie-2-championship-gold.jpg", 
        "stewie-1-midnight-navy.jpg", "stewie-2-sunset.jpg", "stewie-1-pure-white.jpg", 
        "stewie-2-all-star.jpg"
    )
    "sabrina-ionescu" = @(
        "sabrina-1-spark.jpg", "sabrina-1-sundial.jpg", "sabrina-1-oregon.jpg", 
        "sabrina-1-magnetic.jpg", "sabrina-1-barbie.jpg", "sabrina-1-midnight.jpg", 
        "sabrina-1-liberty.jpg", "sabrina-1-rose.jpg", "sabrina-1-triple-white.jpg", 
        "sabrina-1-championship.jpg"
    )
    "aja-wilson" = @(
        "aone-1-aces.jpg", "aone-1-south-carolina.jpg", "aone-1-mvp.jpg", 
        "aone-1-desert-storm.jpg", "aone-1-royal.jpg", "aone-1-neon-nights.jpg", 
        "aone-1-championship.jpg", "aone-1-ice.jpg", "aone-1-all-star.jpg", 
        "aone-1-black-panther.jpg"
    )
    "kelsey-plum" = @(
        "kp-1-lightning.jpg", "kp-1-aces-high.jpg", "kp-1-washington.jpg", 
        "kp-1-sunset-strip.jpg", "kp-1-chrome.jpg", "kp-1-championship.jpg", 
        "kp-1-mint.jpg", "kp-1-all-star.jpg", "kp-1-blackout.jpg", 
        "kp-1-record-breaker.jpg"
    )
    "candace-parker" = @(
        "cp-3-legacy.jpg", "cp-3-tennessee.jpg", "cp-3-mvp.jpg", 
        "cp-3-aces.jpg", "cp-3-sky-high.jpg", "cp-3-sparks.jpg", 
        "cp-3-all-star.jpg", "cp-3-championship.jpg", "cp-3-rose.jpg", 
        "cp-3-hall-of-fame.jpg"
    )
}

Add-Type -AssemblyName System.Drawing

function Create-Placeholder($filepath, $text) {
    if (Test-Path $filepath) { return }
    $dir = Split-Path $filepath
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir }

    $bitmap = New-Object System.Drawing.Bitmap(800, 800)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::FromArgb(240, 240, 240))
    
    $font = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(100, 100, 100))
    $textSize = $graphics.MeasureString($text, $font)
    $x = (800 - $textSize.Width) / 2
    $y = (800 - $textSize.Height) / 2
    $graphics.DrawString($text, $font, $brush, $x, $y)
    
    $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $graphics.Dispose()
    $bitmap.Dispose()
    Write-Host "Created: $filepath"
}

# Create player placeholders
foreach ($player in $players) {
    $filename = "$player.jpg"
    $filepath = Join-Path $playerDir $filename
    Create-Placeholder $filepath ($player -replace '-', ' ').ToUpper()
}

# Create sneaker placeholders
foreach ($player in $sneakers.Keys) {
    $pDir = Join-Path $sneakerBaseDir $player
    foreach ($shoe in $sneakers[$player]) {
        $filepath = Join-Path $pDir $shoe
        Create-Placeholder $filepath ($shoe -replace '\.jpg$', '' -replace '-', ' ').ToUpper()
    }
}
