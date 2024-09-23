type System = {
  specActions: {
    updateSpec: (spec: string) => void
  }
}

class ElectronMenus {
  system!: System;

  constructor() {
    window.electron.ipcRenderer.on("update-spec", this.updateSpec);
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
