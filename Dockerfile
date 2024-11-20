# GPU-Enabled TensorFlow Image
FROM tensorflow/tensorflow:2.16.2-gpu

# Path to extracted Foxhole files
ARG WAR_LOCATION
ENV WAR_LOCATION=${WAR_LOCATION}

# Update apt to ensure all packages are available
RUN apt-get update --allow-insecure-repositories

# Setup node and npm with nvm to run all javascript files
SHELL ["/bin/bash", "--login", "-c", "-i"]
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
RUN nvm install 20.10
RUN nvm use 20.10

# Install pipenv for python
RUN pip3 install pipenv

# Install dependencies for image manipulation
RUN apt-get install -y --allow-unauthenticated imagemagick
RUN apt-get install -y --allow-unauthenticated optipng

# Run the build script
CMD sh build.sh ${WAR_LOCATION}
