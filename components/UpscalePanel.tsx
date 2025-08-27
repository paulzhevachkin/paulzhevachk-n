/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface UpscalePanelProps {
  onApplyUpscale: () => void;
  isLoading: boolean;
}

const UpscalePanel: React.FC<UpscalePanelProps> = ({ onApplyUpscale, isLoading }) => {
  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col items-center gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-center text-gray-300">Enhance & Upscale Image</h3>
      <p className="text-sm text-center text-gray-400 max-w-md">
        Increase the resolution and clarity of your image using AI. This works best for restoring details in lower-quality photos. The process may take a moment.
      </p>
      <button
        onClick={onApplyUpscale}
        className="w-full max-w-xs mt-2 bg-gradient-to-br from-purple-600 to-indigo-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-purple-800 disabled:to-indigo-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
        disabled={isLoading}
      >
        Apply Upscale
      </button>
    </div>
  );
};

export default UpscalePanel;
