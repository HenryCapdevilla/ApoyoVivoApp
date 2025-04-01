/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_AXIOS_BACKED: string;
    readonly VITE_HF_TOKEN: string;
    readonly VITE_SERVER_FRONTEND_PORT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
