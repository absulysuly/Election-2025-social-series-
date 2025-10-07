// Fix: Populating components/views/DebateRoomView.tsx with a placeholder component.
import React from 'react';

const DebateRoomView: React.FC = () => {
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold">Debate Room</h1>
            <div className="mt-4 bg-mocha-white dark:bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-neutral-gray-dark dark:text-gray-400">This feature is under construction.</p>
                <p>Live debates will be available here soon!</p>
            </div>
        </div>
    );
};

export default DebateRoomView;
