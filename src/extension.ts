// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { exec } from 'child_process';
import path from 'path';
import * as fs from 'fs';
import { stderr, stdout } from 'process';
import * as vscode from 'vscode';


//*********************TODO: bug fixed */


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('angular-component-generator.generateComponent', async (uri: vscode.Uri) =>{
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
		const angularJsonPath = path.join(workspaceFolder || '', 'angular.json');
		if(fs.existsSync(angularJsonPath)){
			// const folderPath = await vscode.window.showInputBox({ prompt: 'Enter the path file'});
			const componentName = await vscode.window.showInputBox({ prompt: 'Enter the component name'});
			if(componentName) {
				const folderPath = uri.fsPath;
				const command = `ng generate component ${componentName} --path=${folderPath}`;
	
				exec(command, {cwd: workspaceFolder}, (err, stdout, stderr) => {
					if(err) {
						vscode.window.showErrorMessage(`Error: ${stderr}`);
					}else{
						vscode.window.showInformationMessage(`Component ${componentName} created successfully in ${folderPath}!`);
					}
				});
	
			}else{
				vscode.window.showErrorMessage('Component name is missing');
			}
		}else{
			vscode.window.showErrorMessage('you must run this command inside an angular workspace');
		}		
	});
	context.subscriptions.push(disposable);
	
}

// This method is called when your extension is deactivated
export function deactivate() {}
