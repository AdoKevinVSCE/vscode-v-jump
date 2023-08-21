import {
  Range,
  Selection,
  TextEditorRevealType,
  commands,
  type DocumentSymbol,
  type TextEditor,
} from 'vscode';
import type { DocumentFocusCache } from '.';
import { JumpType, JumpTypeSymbolMap, getSymbolType, supportedLanguages } from './types';

export async function jumpTo(target: JumpType, textEditor: TextEditor, cache?: DocumentFocusCache) {
  if (supportedLanguages.some((s) => s === textEditor.document.languageId)) {
    let targetRange: Range | undefined;

    if (
      target === JumpType.ScriptStart ||
      target === JumpType.TemplateStart ||
      target === JumpType.StyleStart
    ) {
      targetRange = await findSymbolRange(textEditor, target);
    } else {
      const position = cache?.get(JumpTypeSymbolMap[target]);
      if (position) {
        targetRange = new Range(position, position);
      } else {
        targetRange = await findSymbolRange(textEditor, target);
      }
    }

    if (targetRange) {
      textEditor.revealRange(targetRange, TextEditorRevealType.InCenter);
      textEditor.selection = new Selection(targetRange.start, targetRange.start);
    }
  }
}
async function findSymbolRange(textEditor: TextEditor, target: JumpType) {
  const symbols = await commands.executeCommand<DocumentSymbol[]>(
    'vscode.executeDocumentSymbolProvider',
    textEditor.document.uri
  );
  return symbols.find((s) => getSymbolType(s) === JumpTypeSymbolMap[target])?.range;
}
