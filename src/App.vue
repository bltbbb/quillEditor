<!--
 * @Author: baolingtao baolingtao@weiling.cn
 * @Date: 2024-06-13 14:26:35
 * @LastEditors: baolingtao baolingtao@weiling.cn
 * @LastEditTime: 2024-06-13 14:58:14
 * @FilePath: \my-vue-project\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${baolingtao}, All Rights Reserved. 
-->
<template>
  <div id="app">
    <quill-editor></quill-editor>
  </div>
</template>

<script>
import QuillEditor from "./components/QuillEditor.vue";

export default {
  name: "App",
  components: {
    QuillEditor,
  },
};
</script>
