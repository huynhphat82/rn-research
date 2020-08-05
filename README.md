# rn-research

# Cleaning build folders for android and ios
    rm -rf ios/build android/app/build

# Cleaning cache
    npm start --reset-cache

    watchman watch-del-all && rm -rf $TMPDIR/react-* && rm -rf node_modules/ && npm cache verify && npm install && npm start -- --reset-cache
