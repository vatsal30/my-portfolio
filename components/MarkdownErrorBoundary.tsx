"use client";

import { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class MarkdownErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error("MarkdownRenderer failed to render:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    This note could not be rendered.
                </div>
            );
        }
        return this.props.children;
    }
}
