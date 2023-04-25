/* config-overrides.js */

module.exports = function override(config, env) {
    // 參數中的config 就是預設的 webpack config

    // 對config 進行修改
    config.mode = 'development';

    // do stuff with the webpack config...  

    // 最後一定要 Return 新的 Config
    return config;
}