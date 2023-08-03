# V Jump

[![PRS Welcome](https://img.shields.io/badge/PRs-welcome-blue)](https://github.com/AdoKevin/vscode-v-jump/pulls)
[![Stars Welcome](https://img.shields.io/badge/Stars%20Welcome-8A2BE2)](https://github.com/AdoKevin/vscode-v-jump)

<p align="center">
  <a href="https://github.com/adokevin/vscode-v-jump">
    <img width="200" src="https://raw.githubusercontent.com/AdoKevin/vscode-v-jump/main/res/icon.png">
  </a>
</p>

一个方便你在写Vue SFC时，能快速在 _\<template\>_, _\<script\>_ 和 _\<style\>_ 代码块中跳转的Visual Studio Code 插件.

An awesome Visual Studio Code extension that allows you to swiftly navigate between _\<template\>_, _\<script\>_, and _\<style\>_ in Vue SFC, saving your mouse wheel for a smoother coding experience

## 使用方法

提供两类快捷命令用于跳转, 按 _F1_ 键 或者 _Ctrl + Shift + P_，调出命令选项板，输入关键字即可跳转，比如要跳转到前一次*template*中的光标位置，可以输入 `jump to template focus`, 或者简写 `jttf`。。当然，设置为 _Ctrl + 1_, _Ctrl + 2_ 这样的快捷键会更加高效。

1. 跳转到代码块起始位置：
   - **Jump to template**: 跳转到 \<template> 代码块开始位置
   - **Jump to script**: 跳转到 \<script> 代码块开始位置
   - **Jump to style**: 跳转到 \<style> 代码块开始位置
2. 插件记录了你在每个模块中上一次的鼠标位置，方便切换了代码块后跳转到上一个代码块中的光标位置
   - **Jump to template Focus**: 跳转到前一次 \<template> 代码块中的鼠标焦点位置
   - **Jump to script Focus**: 跳转到前一次 \<script> 代码块中的鼠标焦点位置
   - **Jump to style Focus**: 跳转到前一次 \<style> 代码块中的鼠标焦点位置

## Usage

We provide two types of quick navigation: Press the _F1_ key or _Ctrl + Shift + P_ to bring up the command palette, and then type one of following keyword likes `jump to template focus` or even `jttf` to jump. Alternatively, setting shortcuts like _Ctrl + 1_, _Ctrl + 2_, etc., would be more efficient.

1. Jumping to the beginning of code blocks:

   - **Jump to template**: Jump to the beginning of the _\<template>_ code block.
   - **Jump to script**: Jump to the beginning of the _\<script>_ code block.
   - **Jump to style**: Jump to the beginning of the _\<style>_ code block.

2. The extension records your last mouse position in each module, making it convenient to jump to the previous code block's focus position after switching between code blocks:

   - **Jump to template Focus**: Jump to the previous focus position in the _\<template>_ code block.
   - **Jump to script Focus**: Jump to the previous focus position in the _\<script>_ code block.
   - **Jump to style Focus**: Jump to the previous focus position in the _\<style>_ code block.

## License

[MIT](./LICENSE) License © 2022 [Kevin Law](https://github.com/adokevin)
