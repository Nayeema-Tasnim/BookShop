#!/bin/bash

# Download and install .NET 8 SDK locally
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --version 8.0.100 --install-dir ./dotnet

# Add the installed .NET SDK to PATH
export PATH="$(pwd)/dotnet:$PATH"

# Confirm .NET version
./dotnet/dotnet --version

# Build and publish your .NET project
./dotnet/dotnet publish -c Release -o out
