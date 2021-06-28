// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("catCoding.start", () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        "catCoding", // Identifies the type of the webview. Used internally
        "Cat Coding", // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
          enableScripts: true,
        } // Webview options. More on these later.
      );

      panel.webview.html = getWebviewContent();

      // Handle messages from the webview
      panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case "alert":
              vscode.window.showErrorMessage(message.text);
              return;
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Cat Coding</title>
	</head>
	<body>
	 <iframe id="iframe"
	      height="650px"
	      width="100%"
	      src="http://localhost:3001/"
	      allowfullscreen='true' 
	      frameborder="0"
	      >
	 </iframe>
	</body>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
