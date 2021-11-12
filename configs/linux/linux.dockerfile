FROM archlinux:latest

# Setup environment variables
ENV SHELL=/bin/sh
ENV MACH_USE_SYSTEM_PYTHON=true
ENV BUILD_SCRIPT=/worker/configs/linux/build_linux.sh

# Mount working directory
RUN mkdir /worker
WORKDIR /worker/build
VOLUME /worker/build

# Remove password prompt for worker
RUN useradd -m worker
RUN usermod --append --groups wheel worker
RUN echo 'worker ALL=(ALL) NOPASSWD: ALL' >> \
/etc/sudoers

# Install dependencies
RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm base-devel git mercurial python2 python3 make wget tar zip yasm libpulse rustup python-pip
RUN rustup install stable && rustup default stable 
RUN cargo install cbindgen

# Switch to worker user for build
USER worker

CMD sudo chmod +x $BUILD_SCRIPT && $BUILD_SCRIPT