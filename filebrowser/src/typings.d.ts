/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare var window: Window;

interface Window {
  fs: any;
  os: any;
  electron: any;
}
