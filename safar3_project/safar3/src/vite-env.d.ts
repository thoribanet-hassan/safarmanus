/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Flight APIs
    readonly VITE_AMADEUS_API_KEY: string
    readonly VITE_AMADEUS_API_SECRET: string
    readonly VITE_SKYSCANNER_API_KEY: string
    readonly VITE_DUFFEL_API_KEY: string
    readonly VITE_AEROAPI_KEY: string

    // AI Model APIs
    readonly VITE_OPENAI_API_KEY: string
    readonly VITE_GEMINI_API_KEY: string
    readonly VITE_CLAUDE_API_KEY: string

    // Other Travel Data
    readonly VITE_TRAVEL_DATA_API_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
