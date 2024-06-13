<template>
  <div class="custom-quill-editor">
    <div ref="editorContainer"></div>
  </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default {
  name: "CustomQuillEditor",
  mounted() {
    this.initializeEditor();
  },
  methods: {
    initializeEditor() {
      // 初始化Quill编辑器
      const editorContainer = this.$refs.editorContainer;
      this.quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: false, // 禁用工具栏
        },
      });

      // 监听编辑器的text-change事件
      this.quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          // 保存当前的光标位置
          const currentSelection = this.quill.getSelection();
          let cursorPosition = currentSelection ? currentSelection.index : 0;

          // 获取编辑器中的全部文本
          let text = this.quill.getText();

          // 正则表达式定义非法字符
          let illegalRegex = /[^\w\s,，]/g;

          // 遍历文本并检查非法字符
          this.quill.formatText(0, text.length, "color", false); // 移除所有颜色格式
          let match;
          while ((match = illegalRegex.exec(text)) !== null) {
            // 为非法字符应用红色格式
            this.quill.formatText(match.index, match[0].length, "color", "red");
          }

          // 恢复光标位置
          if (currentSelection) {
            this.quill.setSelection(cursorPosition, 0);
          }
        }
      });
    },
  },
};
</script>

<style>
.custom-quill-editor {
  /* 样式调整 */
}
</style>
