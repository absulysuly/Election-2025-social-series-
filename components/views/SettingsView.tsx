
import React, { useState } from 'react';

interface SettingsViewProps {
    isHighContrast: boolean;
    onToggleContrast: () => void;
}

const ToggleSwitch: React.FC<{
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}> = ({ label, description, checked, onChange }) => {
    return (
        <div className="flex justify-between items-center py-4 border-b border-neutral-gray-medium dark:border-gray-700">
            <div>
                <h4 className="font-semibold">{label}</h4>
                <p className="text-sm text-neutral-gray-dark dark:text-gray-400">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-action-blue"></div>
            </label>
        </div>
    );
};

const SettingsView: React.FC<SettingsViewProps> = ({ isHighContrast, onToggleContrast }) => {
    const [largeText, setLargeText] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(true);

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Accessibility Settings</h2>
            <div className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-sm border border-neutral-gray-medium dark:border-gray-700 p-6">
                <ToggleSwitch
                    label="High Contrast Mode"
                    description="Increases text contrast for better readability."
                    checked={isHighContrast}
                    onChange={onToggleContrast}
                />
                <ToggleSwitch
                    label="Large Text"
                    description="Increases the font size across the app."
                    checked={largeText}
                    onChange={() => setLargeText(p => !p)}
                />
                 <ToggleSwitch
                    label="Text-to-Speech (TTS)"
                    description="Enable 'Read Content' button on long posts."
                    checked={ttsEnabled}
                    onChange={() => setTtsEnabled(p => !p)}
                />
            </div>
        </div>
    );
};

export default SettingsView;
