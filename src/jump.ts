import {
  commands,
  type DocumentSymbol,
  Range,
  type TextEditor,
  TextEditorRevealType,
} from 'vscode';
import { getSymbolType, JumpType, JumpTypeSymbolMap } from './jumpType';
import type { DocumentFocusCache } from '.';

export async function jumpTo(target: JumpType, textEditor: TextEditor, cache?: DocumentFocusCache) {
  if (textEditor.document.languageId === 'vue') {
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
        findSymbolRange(textEditor, target);
      }
    }

    if (targetRange) {
      textEditor.revealRange(targetRange, TextEditorRevealType.InCenter);
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
