import { type DocumentSymbol } from 'vscode';

export enum JumpType {
  TemplateStart = 'v-jump.jumpToTemplate',
  TemplateFocus = 'v-jump.jumpToTemplateFocus',
  ScriptStart = 'v-jump.jumpToScript',
  ScriptFocus = 'v-jump.jumpToScriptFocus',
  ScriptImports = 'v-jump.jumpToScriptImports',
  StyleStart = 'v-jump.jumpToStyle',
  StyleFocus = 'v-jump.jumpToStyleFocus',
}

export enum VueSymbolType {
  Template = 'template',
  Script = 'script',
  Style = 'style',
}

export function getSymbolType(symbol: DocumentSymbol) {
  return Object.values(VueSymbolType).find((v) => symbol.name.startsWith(v));
}

export const JumpTypeSymbolMap = {
  [JumpType.ScriptFocus]: VueSymbolType.Script,
  [JumpType.ScriptStart]: VueSymbolType.Script,
  [JumpType.ScriptImports]: VueSymbolType.Script,
  [JumpType.TemplateFocus]: VueSymbolType.Template,
  [JumpType.TemplateStart]: VueSymbolType.Template,
  [JumpType.StyleFocus]: VueSymbolType.Style,
  [JumpType.StyleStart]: VueSymbolType.Style,
};

export const memoScopeLanguages = ['vue', 'svelte'];

export type Nullable<T> = T | null | undefined;
