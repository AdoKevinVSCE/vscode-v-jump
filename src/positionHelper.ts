import { NodeTypes, parse, type BaseElementNode } from '@vue/compiler-dom';
import ts, { getLineAndCharacterOfPosition, isImportDeclaration, type Node } from 'typescript';
import {
  commands,
  Position,
  type DocumentSymbol,
  type TextDocument,
  type TextEditor,
} from 'vscode';
import { getSymbolType, JumpTypeSymbolMap, type JumpType, type Nullable } from './types';

export async function findInsertImportPosition(document: TextDocument, isVue: boolean) {
  let importPosition: Nullable<Position> = new Position(0, 0);
  if (isVue) {
    const sfc = parse(document.getText(), {
      parseMode: 'sfc',
    });

    const scriptNode = sfc.children.find(
      (c) => c.type === NodeTypes.ELEMENT && c.tag === 'script'
    ) as Nullable<BaseElementNode>;
    if (scriptNode && scriptNode.innerLoc) {
      // compiler-dom row start index starts from 1, vscode row index starts from 0
      const tsStartLine = scriptNode.innerLoc.start.line - 1;
      const lastImportPosition = findLastImport(document.fileName, scriptNode.innerLoc.source);
      if (lastImportPosition) {
        importPosition = new Position(lastImportPosition.line + tsStartLine, 0);
      }
    }
  } else {
    importPosition = findLastImport(document.fileName, document.getText());
  }

  return new Position(importPosition.line + 1, 0);
}

function findLastImport(fileName: string, sourceText: string) {
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest);

  const lastImport = traverseNode(sourceFile);
  if (lastImport) {
    const tsPosition = getLineAndCharacterOfPosition(sourceFile, lastImport.end);
    return new Position(tsPosition.line, 0);
  }

  return new Position(0, 0);
}

function traverseNode(root: Node) {
  let lastImportNode: Node | undefined;
  root.forEachChild((n) => {
    if (isImportDeclaration(n)) {
      lastImportNode = n;
    }
    return false;
  });

  return lastImportNode;
}

export async function findSymbolPosition(textEditor: TextEditor, target: JumpType) {
  const symbols = await commands.executeCommand<DocumentSymbol[]>(
    'vscode.executeDocumentSymbolProvider',
    textEditor.document.uri
  );
  return symbols.find((s) => getSymbolType(s) === JumpTypeSymbolMap[target])?.range?.start;
}
