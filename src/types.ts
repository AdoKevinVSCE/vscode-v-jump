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

export const memoScopeSymbolMap: Partial<Record<JumpType, VueSymbolType>> = {
  [JumpType.ScriptFocus]: VueSymbolType.Script,
  [JumpType.TemplateFocus]: VueSymbolType.Template,
  [JumpType.StyleFocus]: VueSymbolType.Style,
};

export const memoScopeLanguages = ['vue'];

export type Nullable<T> = T | null | undefined;
