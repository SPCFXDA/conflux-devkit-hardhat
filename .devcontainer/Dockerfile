# Define the base image for the build, specifying the Node.js version
ARG BASE_IMAGE=ubuntu:latest
ARG DEVKIT_VERSION=v0.3.4
FROM spcfxda/devkit-cli:${DEVKIT_VERSION} AS devkit-cli
FROM ${BASE_IMAGE} AS devkit

# Define the directory path for Conflux node data
ARG CONFLUX_NODE_ROOT="/opt/conflux"

# Install necessary system dependencies and clean up the apt cache to reduce image size
RUN apt-get update && apt-get install -y --no-install-recommends \ 
        git \               
        sudo \    
        ca-certificates \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Create the Conflux node root directory
RUN mkdir -p ${CONFLUX_NODE_ROOT} /workspaces

# Set environment variable for the Conflux node root directory path
ENV CONFLUX_NODE_ROOT=${CONFLUX_NODE_ROOT}

# Define arguments for creating a new user with a specified UID and GID
ARG USERNAME=ubuntu
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create a new user if it doesn't already exist, with the specified UID and GID
RUN id -u $USERNAME >/dev/null 2>&1 || (groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USERNAME -m -s /bin/bash $USERNAME)

# Configure passwordless sudo access for the created user
RUN echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Change ownership of the Conflux node directory to the created user
RUN chown -R ${USERNAME}:${USERNAME} ${CONFLUX_NODE_ROOT} /workspaces

# Download and extract the devkit CLI tool from the specified release
COPY --from=devkit-cli /bin/devkit /bin/devkit
COPY --from=devkit-cli /bin/conflux /bin/conflux
COPY --from=devkit-cli /bin/cfxkey /bin/cfxkey
COPY --from=devkit-cli /bin/pos-genesis-tool /bin/pos-genesis-tool
COPY --from=devkit-cli /bin/cfx-gen-dot /bin/cfx-gen-dot
COPY --from=devkit-cli /bin/cfxstore /bin/cfxstore

# Switch to the newly created user context
USER $USERNAME  

RUN printf '%s\n' \
'if [ -t 0 ] && [ -z "${HARDHAT_VAR_DEPLOYER_MNEMONIC}" ]; then' \
'    echo HARDHAT_VAR_DEPLOYER_MNEMONIC is not set, enter password to load the mnemonic or ctrl+c to abort' \
'    HARDHAT_VAR_DEPLOYER_MNEMONIC=$(devkit wallet mnemonic print)' \
'    if [ $? -eq 0 ] && [ -n "${HARDHAT_VAR_DEPLOYER_MNEMONIC}" ]; then' \
'        export HARDHAT_VAR_DEPLOYER_MNEMONIC' \
'    else' \
'        echo "Failed to retrieve mnemonic or mnemonic is empty" >&2' \
'    fi' \
'fi' >> /home/${USERNAME}/.bashrc


# Set the working directory for the user
WORKDIR /workspaces/

# Expose ports required for Conflux node operations and related services
EXPOSE 3000 12535 12537 8545 8546

# Set environment variables for locale settings and editor configurations
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    EDITOR=code \
    VISUAL=code \
    GIT_EDITOR="code --wait"

# Define the entry point for the container, starting the Conflux node
ENTRYPOINT ["/bin/bash","-c","devkit start --scan"]

FROM devkit AS devkit-nvm
USER root
RUN mkdir /opt/nvm
ENV NVM_DIR /opt/nvm
ENV NODE_VERSION v20.16.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH
RUN npm install -g npm@latest
USER ubuntu

FROM devkit-nvm AS devkit-hardhat
RUN npm install --global hardhat-shorthand \
    && yes | hardhat-completion install


