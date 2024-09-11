import 'swagger-editor-dist/swagger-editor.css'

window.onload = function() {
  // Build a system\
  const editor = SwaggerEditorBundle({
    dom_id: '#swagger-editor',
    layout: 'StandaloneLayout',
    presets: [
      SwaggerEditorStandalonePreset
    ]
  });

  window.editor = editor
}
