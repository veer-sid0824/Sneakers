"""
Automated Sneaker Image Downloader
Downloads high-quality sneaker images from Unsplash API
"""

import os
import requests
import time
from pathlib import Path

# Unsplash API Access Key (Free tier: 50 requests/hour)
# Get your free key at: https://unsplash.com/developers
UNSPLASH_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"  # Replace with your key

# Base directory for images
BASE_DIR = Path(r"d:\lil jwrld\Sneakers\sneakers-react-app\public\assets\images\sneakers")

# Sneaker data structure
SNEAKERS = {
    "anthony-edwards": [
        ("ae-1-with-love.jpg", "Adidas AE 1 With Love orange sneaker"),
        ("ae-1-velocity-blue.jpg", "Adidas AE 1 Velocity Blue sneaker"),
        ("ae-1-new-wave.jpg", "Adidas AE 1 New Wave navy sneaker"),
        ("ae-1-best-of-adi.jpg", "Adidas AE 1 white black sneaker"),
        ("ae-1-georgia-red-clay.jpg", "Adidas AE 1 coral red sneaker"),
        ("ae-1-ascent.jpg", "Adidas AE 1 grey carbon sneaker"),
        ("ae-1-mural.jpg", "Adidas AE 1 orange purple sneaker"),
        ("ae-1-pre-loved-purple.jpg", "Adidas AE 1 purple gold sneaker"),
        ("ae-1-stormtrooper.jpg", "Adidas AE 1 white black sneaker"),
        ("ae-1-all-star.jpg", "Adidas AE 1 silver metallic sneaker"),
    ],
    "stephen-curry": [
        ("curry-11-future.jpg", "Under Armour Curry 11 cyan gold sneaker"),
        ("curry-10-iron.jpg", "Under Armour Curry 10 grey orange sneaker"),
        ("curry-11-dub-nation.jpg", "Under Armour Curry 11 blue yellow sneaker"),
        ("curry-9-elmo.jpg", "Under Armour Curry 9 red black sneaker"),
        ("curry-4-flotro.jpg", "Under Armour Curry 4 pink purple sneaker"),
        ("curry-10-northern-lights.jpg", "Under Armour Curry 10 purple green sneaker"),
        ("curry-1-mvp.jpg", "Under Armour Curry 1 white gold sneaker"),
        ("curry-11-bruce-lee.jpg", "Under Armour Curry 11 yellow black sneaker"),
        ("curry-10-unicorn.jpg", "Under Armour Curry 10 white iridescent sneaker"),
        ("curry-11-mouthguard.jpg", "Under Armour Curry 11 translucent blue sneaker"),
    ],
    "giannis-antetokounmpo": [
        ("freak-5-greece.jpg", "Nike Zoom Freak 5 blue white gold sneaker"),
        ("freak-4-knowledge.jpg", "Nike Zoom Freak 4 grey purple mint sneaker"),
        ("freak-3-dutch-blue.jpg", "Nike Zoom Freak 3 blue lime sneaker"),
        ("freak-2-bamo.jpg", "Nike Zoom Freak 2 green black orange sneaker"),
        ("freak-1-america.jpg", "Nike Zoom Freak 1 gold animal print sneaker"),
        ("freak-5-sepolia.jpg", "Nike Zoom Freak 5 black white multicolor sneaker"),
        ("freak-4-unbelievable.jpg", "Nike Zoom Freak 4 neon green pink sneaker"),
        ("freak-3-cherry.jpg", "Nike Zoom Freak 3 pink red white sneaker"),
        ("freak-5-oreo.jpg", "Nike Zoom Freak 5 black white speckled sneaker"),
        ("freak-6-roses.jpg", "Nike Zoom Freak 6 red white green sneaker"),
    ],
    "james-harden": [
        ("harden-7-black.jpg", "Adidas Harden Vol 7 black white sneaker"),
        ("harden-8-white.jpg", "Adidas Harden Vol 8 white black blue sneaker"),
        ("harden-6-lucky.jpg", "Adidas Harden Vol 6 mint green yellow sneaker"),
        ("harden-5-natural.jpg", "Adidas Harden Vol 5 white multicolor sneaker"),
        ("harden-4-lemonade.jpg", "Adidas Harden Vol 4 pink lemonade sneaker"),
        ("harden-7-cyan.jpg", "Adidas Harden Vol 7 cyan blue sneaker"),
        ("harden-8-flamingo.jpg", "Adidas Harden Vol 8 pink flamingo sneaker"),
        ("harden-3-mission.jpg", "Adidas Harden Vol 3 silver black sneaker"),
        ("harden-1-pioneer.jpg", "Adidas Harden Vol 1 black red sneaker"),
        ("harden-7-yellow.jpg", "Adidas Harden Vol 7 yellow black sneaker"),
    ],
    "kyrie-irving": [
        ("kyrie-8-infinity.jpg", "Nike Kyrie 8 royal blue gold sneaker"),
        ("kyrie-7-soundwave.jpg", "Nike Kyrie 7 yellow coral blue sneaker"),
        ("kyrie-6-preheat.jpg", "Nike Kyrie 6 multicolor navy sneaker"),
        ("kyrie-5-spongebob.jpg", "Nike Kyrie 5 yellow brown SpongeBob sneaker"),
        ("kyrie-4-confetti.jpg", "Nike Kyrie 4 multicolor confetti sneaker"),
        ("kyrie-low-5-community.jpg", "Nike Kyrie Low 5 black white volt sneaker"),
        ("kyrie-7-daybreak.jpg", "Nike Kyrie 7 daybreak citron sneaker"),
        ("kyrie-3-mamba.jpg", "Nike Kyrie 3 yellow black red sneaker"),
        ("kyrie-2-whatthe.jpg", "Nike Kyrie 2 multicolor glow white sneaker"),
        ("kyrie-1-red.jpg", "Nike Kyrie 1 crimson red black blue sneaker"),
    ],
}


def download_image_from_unsplash(query, filepath):
    """Download an image from Unsplash based on search query"""
    
    if UNSPLASH_ACCESS_KEY == "YOUR_ACCESS_KEY_HERE":
        print("❌ Please set your Unsplash API key in the script!")
        print("   Get a free key at: https://unsplash.com/developers")
        return False
    
    url = "https://api.unsplash.com/search/photos"
    headers = {"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"}
    params = {
        "query": query,
        "per_page": 1,
        "orientation": "squarish"
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data["results"]:
            image_url = data["results"][0]["urls"]["regular"]
            
            # Download the image
            img_response = requests.get(image_url)
            img_response.raise_for_status()
            
            # Save the image
            with open(filepath, "wb") as f:
                f.write(img_response.content)
            
            print(f"✅ Downloaded: {filepath.name}")
            return True
        else:
            print(f"⚠️  No results for: {query}")
            return False
            
    except Exception as e:
        print(f"❌ Error downloading {filepath.name}: {str(e)}")
        return False


def create_placeholder_image(filepath, text):
    """Create a simple placeholder image using PIL"""
    try:
        from PIL import Image, ImageDraw, ImageFont
        
        # Create a white background image
        img = Image.new('RGB', (800, 800), color='white')
        draw = ImageDraw.Draw(img)
        
        # Add text
        try:
            font = ImageFont.truetype("arial.ttf", 40)
        except:
            font = ImageFont.load_default()
        
        # Center the text
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        
        position = ((800 - text_width) // 2, (800 - text_height) // 2)
        draw.text(position, text, fill='black', font=font)
        
        # Save the image
        img.save(filepath)
        print(f"📝 Created placeholder: {filepath.name}")
        return True
        
    except ImportError:
        print("⚠️  PIL not installed. Install with: pip install Pillow")
        return False


def main():
    print("🏀 NBA Sneaker Image Downloader")
    print("=" * 50)
    
    # Check if requests is installed
    try:
        import requests
    except ImportError:
        print("❌ 'requests' library not found!")
        print("   Install with: pip install requests")
        return
    
    # Ask user for download method
    print("\nChoose download method:")
    print("1. Download from Unsplash (requires API key)")
    print("2. Create placeholder images (requires Pillow)")
    
    choice = input("\nEnter choice (1 or 2): ").strip()
    
    total_images = sum(len(sneakers) for sneakers in SNEAKERS.values())
    downloaded = 0
    
    for player, sneakers in SNEAKERS.items():
        player_dir = BASE_DIR / player
        player_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"\n📁 Processing {player}...")
        
        for filename, query in sneakers:
            filepath = player_dir / filename
            
            # Skip if file already exists
            if filepath.exists():
                print(f"⏭️  Skipped (exists): {filename}")
                downloaded += 1
                continue
            
            if choice == "1":
                success = download_image_from_unsplash(query, filepath)
                if success:
                    downloaded += 1
                    time.sleep(1)  # Rate limiting
            elif choice == "2":
                success = create_placeholder_image(filepath, filename.replace('.jpg', '').replace('-', ' ').title())
                if success:
                    downloaded += 1
            
    print("\n" + "=" * 50)
    print(f"✨ Complete! Downloaded {downloaded}/{total_images} images")
    print(f"📂 Location: {BASE_DIR}")


if __name__ == "__main__":
    main()
