/*
 * @Author: baolingtao baolingtao@weiling.cn
 * @Date: 2024-06-13 14:26:35
 * @LastEditors: baolingtao baolingtao@weiling.cn
 * @LastEditTime: 2024-06-13 16:44:10
 * @FilePath: \my-vue-project\vue.config.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${baolingtao}, All Rights Reserved. 
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 5000
  },
  transpileDependencies: true
})
