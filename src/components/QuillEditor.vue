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

    highlightInvalidText() {
      // 获取当前编辑器的内容
      const contents = this.quill.getContents();
      // 获取当前的选择范围，如果没有选择范围，则range为null
      let range = this.quill.getSelection();

      // 如果没有有效的选择范围，并且内容为空，则设置为0
      if (!range) {
        range = { index: 0, length: 0 };
      }

      // 新的操作序列
      let newOps = [];
      // 遍历现有的内容
      contents.ops.forEach((op) => {
        if (typeof op.insert === "string") {
          // 分割字符串，保留换行符
          const splitText = op.insert.split(/(\n)/);
          splitText.forEach((piece) => {
            if (piece === "\n") {
              // 保留换行符
              newOps.push({ insert: piece });
            } else {
              // 对于文本片段，我们检查每个字符
              const chars = piece.split("");
              let formatText = "";
              chars.forEach((char) => {
                if (char.match(/[a-zA-Z0-9]/)) {
                  formatText += char;
                } else {
                  if (formatText) {
                    newOps.push({ insert: formatText });
                    formatText = "";
                  }
                  newOps.push({ insert: char, attributes: { color: "red" } });
                }
              });
              // 确保剩余的文本也被推入操作序列
              if (formatText) {
                newOps.push({ insert: formatText });
              }
            }
          });
        } else {
          // 对于其他类型的插入（例如图片），我们直接推入操作序列
          newOps.push(op);
        }
      });

      // 更新编辑器的内容
      this.quill.setContents(newOps, "silent");

      // 检查是否是第一个字符的输入
      if (this.quill.getLength() === 1) {
        // 使用 setTimeout 确保光标位置更新在内容更新后
        setTimeout(() => {
          this.quill.setSelection(1, 0, "silent");
        }, 0);
      } else {
        // 否则，恢复之前的选择范围
        setTimeout(() => {
          this.quill.setSelection(range, "silent");
        }, 0);
      }
    },
  },
};
</script>

<style>
.custom-quill-editor {
  /* 样式调整 */
}
</style>
