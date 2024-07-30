import { Position, Range, Selection, TextEditorRevealType, type TextEditor } from 'vscode';
import type { DocumentFocusCache } from '.';
import { findInsertImportPosition, findSymbolPosition } from './positionHelper';
import { JumpType, JumpTypeSymbolMap, type Nullable } from './types';

export async function jumpTo(target: JumpType, textEditor: TextEditor, cache?: DocumentFocusCache) {
  let targetPosition: Nullable<Position>;

  if (textEditor.document.languageId === 'vue') {
    if (
      target === JumpType.ScriptStart ||
      target === JumpType.TemplateStart ||
      target === JumpType.StyleStart
    ) {
      targetPosition = await findSymbolPosition(textEditor, target);
    } else if (target === JumpType.ScriptImports) {
      targetPosition = await findSymbolPosition(textEditor, JumpType.ScriptStart);
      if (targetPosition) {
        const position = await findInsertImportPosition(textEditor.document, true);
        if (position) {
          targetPosition = new Position(position.line, 0);
        }
      }
    } else {
      const position = cache?.get(JumpTypeSymbolMap[target]);
      if (position) {
        targetPosition = position;
      } else {
        targetPosition = await findSymbolPosition(textEditor, target);
      }
    }
  } else {
    targetPosition = await findInsertImportPosition(textEditor.document, false);
  }

  if (targetPosition) {
    textEditor.revealRange(
      new Range(targetPosition, targetPosition),
      TextEditorRevealType.InCenter
    );
    textEditor.selection = new Selection(targetPosition, targetPosition);
  }
}
