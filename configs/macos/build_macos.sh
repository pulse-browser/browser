set -e

echo "Building Dot Browser for macOS"
echo ""
echo "This will take 10 to 60 minutes to complete."
echo ""

echo "━━━━━━━━━  Setting up roles...  ━━━━━━━━━"
echo ""

sudo usermod -aG wheel worker
sudo chown -R worker:worker /worker

echo "━━━━━━━━━  Setting up Rust...  ━━━━━━━━━"
echo ""

rustup install stable
rustup default stable

echo "━━━━━━━━━  Installing dependencies...  ━━━━━━━━━"
echo ""

sudo pacman -Syu --noconfirm
    
echo "━━━━━━━━━  Bootstrapping...  ━━━━━━━━━"
echo ""

./mach bootstrap --application-choice browser --no-interactive

echo "━━━━━━━━━  Building...  ━━━━━━━━━"
echo ""

MOZCONFIG=/worker/build/mozconfig ./mach build

echo "━━━━━━━━━  Packaging...  ━━━━━━━━━"
echo ""

./mach package

echo ""
echo "Dot Browser was successfully built!"
echo "To take your build for a test drive, run: |melon run|"
echo ""