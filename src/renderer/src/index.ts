import 'swagger-editor-dist/swagger-editor.css'
import SwaggerEditorBundle from "swagger-editor-dist/swagger-editor-bundle.js";
import SwaggerEditorStandalonePreset from "swagger-editor-dist/swagger-editor-standalone-preset.js";

import electronMenus from './plugins/electron-menus'

window.onload = function() {
  // Build a system\
  const editor = window.SwaggerEditorBundle({
    dom_id: '#swagger-editor',
    layout: 'StandaloneLayout',
    presets: [
      window.SwaggerEditorStandalonePreset
    ],
    plugins: [
      electronMenus
    ]
  });

  window.editor = editor
}

declare global {
  interface Window {
    SwaggerEditorBundle: typeof SwaggerEditorBundle;
    SwaggerEditorStandalonePreset: typeof SwaggerEditorStandalonePreset
    editor: ReturnType<SwaggerEditorBundle>
  }
}
