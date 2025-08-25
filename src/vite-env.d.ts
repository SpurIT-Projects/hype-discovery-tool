/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_STRIPE_PRICING_TABLE_ID: string
    readonly VITE_STRIPE_PUBLISHABLE_KEY: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
