import {
  Range,
  commands,
  window,
  type DocumentSymbol,
  type ExtensionContext,
  type Position,
  type TextEditorSelectionChangeEvent,
} from 'vscode';
import { jumpTo } from './jump';
import { JumpType, getSymbolType, memoScopeLanguages, type VueSymbolType } from './types';
import { debounce } from './util';

export type FocusScopeMemo = Map<VueSymbolType, Position>;

export function activate(context: ExtensionContext) {
  const focusPositionCache = new Map<string, FocusScopeMemo>();

  const disposables = Object.values(JumpType).map((type) =>
    commands.registerTextEditorCommand(type, (textEditor) => {
      const documentCache = focusPositionCache.get(textEditor.document.uri.toString());
      jumpTo(type, textEditor, documentCache);
    })
  );

  context.subscriptions.push(...disposables);

  const debounceSelectionChangeHandler = debounce(async (event: TextEditorSelectionChangeEvent) => {
    const { textEditor, selections } = event;
    const docId = textEditor.document.uri;
    let documentCache = focusPositionCache.get(docId.toString());

    if (!documentCache) {
      documentCache = new Map<VueSymbolType, Position>();
      focusPositionCache.set(docId.toString(), documentCache);
    }

    const symbols = await commands.executeCommand<DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      textEditor.document.uri
    );

    selections.forEach((selection) => {
      const cursor = selection.anchor;

      const currentSymbol = symbols.find((f) => f.range.intersection(new Range(cursor, cursor)));

      if (currentSymbol) {
        const symbol = getSymbolType(currentSymbol);

        if (symbol && documentCache) {
          documentCache.set(symbol, cursor);
        }
      }
    });
  }, 300);

  window.onDidChangeTextEditorSelection((event) => {
    if (memoScopeLanguages.some((l) => l === event.textEditor.document.languageId)) {
      debounceSelectionChangeHandler(event);
    }
  });
}
