/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_S3_URL: string;
  readonly VITE_CSS_URL: string;
  readonly VITE_RECAPTCHA_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
