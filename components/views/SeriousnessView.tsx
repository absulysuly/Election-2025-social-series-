import React from 'react';
import { Governorate } from '../../types.ts';
import SeriousExperience from '../serious/SeriousExperience';

interface SeriousnessViewProps {
    selectedGovernorate: Governorate | 'All';
}

const SeriousnessView: React.FC<SeriousnessViewProps> = () => {
    return (
        <div className="rounded-xl overflow-hidden shadow-inner bg-white dark:bg-gray-900">
            <SeriousExperience initialPath="/" />
        </div>
    );
};

export default SeriousnessView;
