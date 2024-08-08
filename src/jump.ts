import { Position, Range, Selection, TextEditorRevealType, type TextEditor } from 'vscode';
import type { FocusScopeMemo } from '.';
import { findInsertImportPosition, findSymbolPosition } from './positionHelper';
import { JumpType, memoScopeSymbolMap, type Nullable } from './types';

export async function jumpTo(jumpType: JumpType, textEditor: TextEditor, cache?: FocusScopeMemo) {
  let targetPosition: Nullable<Position>;

  if (textEditor.document.languageId === 'vue') {
    if (
      jumpType === JumpType.ScriptStart ||
      jumpType === JumpType.TemplateStart ||
      jumpType === JumpType.StyleStart
    ) {
      targetPosition = await findSymbolPosition(textEditor, jumpType);
    } else if (jumpType === JumpType.ScriptImports) {
      const position = await findInsertImportPosition(textEditor.document, true);
      if (position) {
        targetPosition = new Position(position.line, 0);
      }
    } else {
      const position = memoScopeSymbolMap[jumpType]
        ? cache?.get(memoScopeSymbolMap[jumpType])
        : null;
      if (position) {
        targetPosition = position;
      } else {
        targetPosition = await findSymbolPosition(textEditor, jumpType);
      }
    }
  } else if (jumpType === JumpType.ScriptImports) {
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
