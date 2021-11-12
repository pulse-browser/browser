set -e

echo "Building Dot Browser for Linux"
echo ""
echo "This will take 10 to 60 minutes to complete."
echo ""

echo "━━━━━━━━━  Setting up roles...  ━━━━━━━━━"
echo ""

sudo usermod -aG wheel worker
sudo chown -R worker:worker /worker

echo ""
echo "━━━━━━━━━  Setting up Rust...  ━━━━━━━━━"
echo ""

rustup install stable
rustup default stable

echo ""
echo "━━━━━━━━━  Installing dependencies...  ━━━━━━━━━"
echo ""

sudo pacman -Syu --noconfirm
    
echo ""
echo "━━━━━━━━━  Bootstrapping...  ━━━━━━━━━"
echo ""

./mach bootstrap --application-choice browser --no-interactive

echo ""
echo "━━━━━━━━━  Building...  ━━━━━━━━━"
echo ""

MOZCONFIG=/worker/build/mozconfig ./mach build

echo ""
echo "━━━━━━━━━  Packaging...  ━━━━━━━━━"
echo ""

./mach package

echo ""
echo "Dot Browser was successfully built!"
echo "To take your build for a test drive, run: |melon run|"
echo ""