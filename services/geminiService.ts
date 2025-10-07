
// --- SECURITY WARNING ---
// The original implementation exposed an API key on the client-side.
// This has been updated to proxy requests through a secure backend endpoint.
// The client now calls our own backend (e.g., /api/gemini), which then securely
// calls the Google Gemini API.
// --------------------

export const generatePostSuggestion = async (topic: string): Promise<string> => {
    // TODO: This function now calls a backend proxy.
    // Ensure the Windsurf backend has a '/api/gemini' endpoint
    // that accepts a POST request with a JSON body like { "topic": "..." }
    // and returns a JSON response like { "suggestion": "..." }.
    
    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Gemini proxy server error:", errorData);
            throw new Error(`API returned status ${response.status}`);
        }
        
        const data = await response.json();
        return data.suggestion || "No suggestion received from the server.";
    } catch (error) {
        console.error("Error generating content via proxy:", error);
        return "Failed to generate content. Please check the connection and try again.";
    }
};
