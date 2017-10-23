'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "command-bug" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(
        disposable,
        vscode.commands.registerCommand('extension.clickMe', x => x.doClickMe()),
        vscode.window.registerTreeDataProvider('extension.view1', new View1Provider())
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class View1Provider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private onlyItem = new ClickItem();
    
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.TreeItem[] {
        if (element) {
            return undefined;
        }
        return [this.onlyItem];
    }
}

class ClickItem extends vscode.TreeItem {
    constructor() {
        super('Right-Click Me');
    }

    doClickMe(): void {
        vscode.window.showInformationMessage('You click it.');
    }
}
