# swagger-editor-offline

[![Build Status](https://github.com/XuluWarrior/swagger-editor-offline/actions/workflows/build.yml/badge.svg)](https://github.com/XuluWarrior/swagger-editor-offline/actions)

**A cross-platform desktop version of swagger-editor**

## To run application locally
```bash
# Clone this repository
git clone https://github.com/XuluWarrior/swagger-editor-offline.git
# Go into the repository
cd swagger-editor-offline
# Install dependencies
npm install
# Run the app
npm run dev
```

## Installation
### npm* / yarn
```bash
# Install globally
# On Windows, npm works e.g. npm install -g swagger-editor-offline
yarn global add swagger-editor-offline

# Run the app
swagger-editor-offline
```
\* Windows only as on *nix, Electron doesn't install nicely in npm global repository even with sudo

### Windows

#### Installer
[swagger-editor-offline-setup-0.1.1.exe](https://github.com/XuluWarrior/swagger-editor-offline/releases/download/v0.1.1/swagger-editor-offline-0.1.1-setup.exe)
#### Portable EXE
[swagger-editor-offline-0.1.1.exe](https://github.com/XuluWarrior/swagger-editor-offline/releases/download/v0.1.1/Swagger.Editor.Offline.0.1.1.exe)

### Mac
#### Installer
[swagger-editor-offline-0.1.1.dmg](https://github.com/XuluWarrior/swagger-editor-offline/releases/download/v0.1.1/swagger-editor-offline-0.1.1.dmg) - Currently unsigned

### Linux
#### AppImage
[swagger-editor-offline-0.1.1.AppImage](https://github.com/XuluWarrior/swagger-editor-offline/releases/download/v0.1.1/swagger-editor-offline-0.1.1.AppImage)

## Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
