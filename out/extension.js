"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const vscode = __importStar(require("vscode"));
//*********************TODO: bug fixed */
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    const disposable = vscode.commands.registerCommand('angular-component-generator.generateComponent', async (uri) => {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
        const angularJsonPath = path_1.default.join(workspaceFolder || '', 'angular.json');
        if (fs.existsSync(angularJsonPath)) {
            // const folderPath = await vscode.window.showInputBox({ prompt: 'Enter the path file'});
            const componentName = await vscode.window.showInputBox({ prompt: 'Enter the component name' });
            if (componentName) {
                const folderPath = uri.fsPath;
                const command = `ng generate component ${componentName} --path=${folderPath}`;
                (0, child_process_1.exec)(command, { cwd: workspaceFolder }, (err, stdout, stderr) => {
                    if (err) {
                        vscode.window.showErrorMessage(`Error: ${stderr}`);
                    }
                    else {
                        vscode.window.showInformationMessage(`Component ${componentName} created successfully in ${folderPath}!`);
                    }
                });
            }
            else {
                vscode.window.showErrorMessage('Component name is missing');
            }
        }
        else {
            vscode.window.showErrorMessage('you must run this command inside an angular workspace');
        }
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map