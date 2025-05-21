type BunnyCallConfig = {
    method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
    body?: Record<string, unknown>;
    headers?: HeadersInit;
    tries?: number;
};

export abstract class BunnyRoot<ElementType extends HTMLElement> {
    element: ElementType;
    private _onCallHandler?: (
        self: this,
        state: "ok" | "error" | "loading",
        data: unknown
    ) => void;

    constructor(element: ElementType) {
        this.element = element;
    }

    onCall(
        handler: (
            self: this,
            state: "ok" | "error" | "loading",
            data: unknown
        ) => void
    ) {
        this._onCallHandler = handler;
    }

    async call(url: string, config: BunnyCallConfig) {
        if (this._onCallHandler) this._onCallHandler(this, "loading", undefined);

        try {
            const response = await fetch(url, {
                method: config.method,
                headers: {
                    "Content-Type": "application/json",
                    ...config.headers,
                },
                body: config.method !== "GET" ? JSON.stringify(config.body) : undefined,
            });

            const data = await response.json();

            this._onCallHandler!(this, "ok", data);
        } catch (error) {
            const { tries } = config;

            if (!tries) {
                this._onCallHandler!(this, "error", error);
                return;
            }

            if (tries > 0) this.call(url, { ...config, tries: tries - 1 });

            if (tries <= 0) {
                this._onCallHandler!(this, "error", error);
                return;
            }
        }
    }

    ready(callback: () => void): void {
        if (
            document.readyState === "complete" ||
            document.readyState === "interactive"
        ) {
            setTimeout(callback, 1);
        } else {
            document.addEventListener("DOMContentLoaded", callback);
        }
    }
}
