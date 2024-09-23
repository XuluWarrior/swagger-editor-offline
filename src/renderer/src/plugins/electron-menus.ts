type System = {
  specActions: {
    updateSpec: (spec: string) => void
  }
}

class ElectronMenus {
  system!: System;

  constructor() {
    window.electron.ipcRenderer.on("update-spec", this.updateSpec);
    this.overridePrompt()
  }

  overridePrompt() {
    const originalPrompt = window.prompt;
    window.prompt = message => {
      if (message === "Enter the URL to import from:") {
        window.electron.ipcRenderer.invoke('import-url');
        return "";
      } else {
        return originalPrompt(message);
      }
    }
  }


  updateSpec = (_event, spec)  => {
    this.system.specActions.updateSpec(spec);
  }

  setupPlugin = (system) => {
    this.system = system;
    return {}
  }
};

const electronMenus = new ElectronMenus()

export default electronMenus.setupPlugin
