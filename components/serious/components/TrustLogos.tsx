import React from 'react';

const TrustLogos: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h3 className="text-center text-lg font-bold text-gray-500 uppercase tracking-wider mb-6">
          موثوق به من قبل
        </h3>
        <div className="flex justify-center items-center space-x-8 space-x-reverse">
          <div className="flex items-center">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/320px-Flag_of_Iraq.svg.png" 
                alt="IHEC Logo" 
                className="h-8 w-auto" 
            />
            <span className="font-bold text-gray-700 mr-2">IHEC Data Partner</span>
          </div>
          <div className="flex items-center grayscale opacity-60">
             <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/United_Nations_logo_logotype.svg" 
                alt="United Nations" 
                className="h-8 w-auto" 
            />
          </div>
          <div className="flex items-center grayscale opacity-60">
             <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/International_Foundation_for_Electoral_Systems_logo.svg/512px-International_Foundation_for_Electoral_Systems_logo.svg.png" 
                alt="IFES" 
                className="h-10 w-auto" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustLogos;