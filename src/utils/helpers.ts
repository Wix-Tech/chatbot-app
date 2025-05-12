export function formatMessage(user: string, message: string): string {
    return `${user}: ${message}`;
}

export function logMessage(message: string): void {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
}