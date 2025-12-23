/// <reference types="vite/client" />
/// <reference types="vite-plugin-convention-route/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_PORT: string
    readonly VITE_APP_BUILD_TIME: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
