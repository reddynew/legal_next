"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundaryInner extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <ErrorFallback
                    error={this.state.error}
                    resetError={() => this.setState({ hasError: false, error: undefined })}
                    customFallback={this.props.fallback}
                />
            );
        }

        return this.props.children;
    }
}

interface FallbackProps {
    error?: Error;
    resetError: () => void;
    customFallback?: ReactNode;
}

const ErrorFallback = ({ error, resetError, customFallback }: FallbackProps) => {
    if (customFallback) {
        return <>{customFallback}</>;
    }

    const handleReset = () => {
        resetError();
        window.location.reload();
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 text-center bg-white  border border-red-100 shadow-xl animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <AlertCircle className="w-10 h-10 text-red-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                Oops! Something went wrong
            </h2>

            <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
                An unexpected error occurred while loading this section. Our team has been notified, and we're working to fix it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={handleReset}
                    className="bg-gray-900 hover:bg-black text-white px-8 h-12 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-[0.98]"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </Button>

                <Button
                    variant="outline"
                    onClick={() => window.location.href = '/'}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50 px-8 h-12 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-[0.98]"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

const ErrorBoundary = ({ children, fallback }: Props) => {
    return (
        <ErrorBoundaryInner fallback={fallback}>
            {children}
        </ErrorBoundaryInner>
    );
};

export default ErrorBoundary;
