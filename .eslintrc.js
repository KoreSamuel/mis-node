module.exports = {
    "env": {
        "browser": false,
        "mocha": false,
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb/base",
    "rules": {
        "semi": [0, "always"],
        "no-console": 0,
        "class-methods-use-this": 0,
        "no-param-reassign": 0
    }
};