#!/usr/bin/env sh
# /usr/bin/env bash

ARGS=("$@")

ENVIROMENT="dev"
PLATFORM="android"
MODE="debug"
EXTENSION="apk"
CLEAN="no"
SIGNED="install"
SIGNED_BUILD_MODE="Debug"

for arg in "${ARGS[@]}"
do
  case "$arg" in
    "--help")
      echo "\n=====> Command for building the application:\n"
      echo "./builder [env: [--]dev|staging|prod] [platform: [--]android|ios] [mode: [--]debug|release] [extension: [--]apk|aab] [clean: [--]clean] [signed: [--]signed] \n"
      echo "\n=====> Example:\n"
      echo "./builder --prod --android --release --apk --signed --clean"
      exit
      ;;
    "--prod")
      ENVIROMENT="prod"
      ;;
    "prod")
      ENVIROMENT="prod"
      ;;
    "--staging")
      ENVIROMENT="staging"
      ;;
    "staging")
      ENVIROMENT="staging"
      ;;
    "--android")
      PLATFORM="android"
      ;;
    "android")
      PLATFORM="android"
      ;;
    "--ios")
      PLATFORM="ios"
      ;;
    "ios")
      PLATFORM="ios"
      ;;
    "--debug")
      MODE="debug"
      ;;
    "debug")
      MODE="debug"
      ;;
    "--release")
      MODE="release"
      SIGNED_BUILD_MODE="Release"
      ;;
    "release")
      MODE="release"
      SIGNED_BUILD_MODE="Release"
      ;;
    "--apk")
      EXTENSION="apk"
      ;;
    "apk")
      EXTENSION="apk"
      ;;
    "--aab")
      EXTENSION="aab"
      ;;
    "aab")
      EXTENSION="aab"
      ;;
    "--clean")
      CLEAN="yes"
      ;;
    "clean")
      CLEAN="yes"
      ;;
    "--signed")
      SIGNED="assemble"
      ;;
    "signed")
      SIGNED="assemble"
      ;;
  esac

  if [[ "$EXTENSION" == 'aab' ]]; then
    SIGNED="bundle"
  fi
done

# Short command for building application (release, apk|aab)
if [[ "${ARGS[0]}" == "deploy" ]]; then
  ENVIROMENT="prod"
  MODE="release"
  SIGNED_BUILD_MODE="Release"
  if [[ "$EXTENSION" == 'aab' ]]; then
    SIGNED="bundle"
  else
    SIGNED="assemble"
  fi
fi

echo "=====> Switching To Environment: $ENVIROMENT"
./setenv "$ENVIROMENT"

if [[ "$CLEAN" == 'yes' ]]; then
  OS=$(uname)
  echo "=====> Waiting for cleaning..."
  rm -rf "package-lock.json" && 
  rm -rf node_modules && 
  npm install && 
  cd android && 
  ./gradlew clean
  if [[ "$OS" != CYGWIN* && "$OS" != MINGW* && "$OS" != MSYS* && "$OS" != WIN* ]] ; then
    cd .. && 
    cd ios && 
    rm -rf Pods && 
    rm -rf Podfile.lock && 
    pod install
  fi
  cd ..
  echo "=====> Cleaned success"
fi

echo "=====> Building: $PLATFORM $MODE $EXTENSION"

if [[ "$PLATFORM" == 'android' ]]; then
  # This builds an apk for your project using the debug variant (signed with the debug key)
  #  assembleDebug

  # This builds an apk for your project using the debug variant and then installs it on a connected device
  #  installDebug

  # To build an apk that I want to share with other people (signed with the release key)
  #  assembleRelease

  # To upload app to the Play Store
  # include all compiled code and resources, but defer APK generation and signing to Google Play.
  # Unlike an APK, you can't deploy an app bundle directly to a device
  #  bundleRelease

  # It is the same as the installDebug but it creates a signed release variant and installs it on a connected device
  #  installRelease

  BUILD_CMD="./gradlew $SIGNED$SIGNED_BUILD_MODE"

  echo "=====> Running: $BUILD_CMD";

  # Build application
  cd android && $BUILD_CMD
fi

echo "=====> Build success"
