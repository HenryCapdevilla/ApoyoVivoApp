/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_AXIOS_BACKED: string;
    readonly VITE_HF_TOKEN: string;
    readonly SERVER_FRONTEND_PORT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
