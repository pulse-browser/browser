FROM sickcodes/docker-osx:latest

# Setup environment variables
ENV SHELL=/bin/sh
ENV MACH_USE_SYSTEM_PYTHON=true
ENV BUILD_SCRIPT=/worker/configs/macos/build_macos.sh

# Mount working directory
RUN mkdir /worker
WORKDIR /worker/build
VOLUME /worker/build

# Make build script executable
RUN chmod +x $BUILD_SCRIPT

# Switch to worker user for build
USER worker

CMD $BUILD_SCRIPT