/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface AsciiPanelProps {
  onApplyAsciiArt: (prompt: string) => void;
  isLoading: boolean;
}

type RenderStyle = 'outlines' | 'solid';

const AsciiPanel: React.FC<AsciiPanelProps> = ({ onApplyAsciiArt, isLoading }) => {
  const [selectedPresetPrompt, setSelectedPresetPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [renderStyle, setRenderStyle] = useState<RenderStyle>('solid');

  const presets = [
    { name: 'Monochrome', prompt: 'A detailed, high-contrast monochrome ASCII art. Use a wide range of characters to create deep shadows and bright highlights.' },
    { name: 'Neonwave', prompt: 'A vibrant 80s synthwave aesthetic. Use ASCII characters to create glowing neon lines in magenta and cyan on a dark background.' },
    { name: 'Terminal Green', prompt: 'A classic green-on-black terminal/matrix style. The art should look like it is displayed on an old CRT monitor.' },
    { name: 'Color Pop', prompt: 'A mostly monochrome ASCII art, but with one or two key colors highlighted dramatically for a pop-art effect.' },
    { name: 'Pixel Art', prompt: 'Recreate the image as pixelated ASCII art, using block characters (like █, ▓, ▒, ░) to simulate a low-resolution, 8-bit video game look.' },
    { name: 'Sketch', prompt: 'Convert the image into an ASCII sketch. Use characters like /, \\, -, |, and . to create the appearance of hand-drawn pencil lines, cross-hatching, and stippling for shading.' },
    { name: 'Halftone', prompt: 'Simulate a halftone printing effect using ASCII characters. Use characters of varying density (like @, #, %, *, o, ., and space) to represent different tones and create a retro, printed look.' },
    { name: 'Blueprint', prompt: 'Create a blueprint-style ASCII art. Use characters like +, -, |, and corner pieces to outline the subject against a blue background, resembling a technical schematic or architectural plan.' },
    { name: 'Glitch Art', prompt: 'Generate a glitch art version of the image using ASCII characters. Introduce random characters, misplaced lines, and blocky artifacts to create a chaotic, digital distortion effect.' },
    { name: 'Dot Matrix', prompt: 'Render the image in a style reminiscent of a 9-pin dot matrix printer. Use a limited character set (like ., o, +, *) with noticeable spacing to simulate a low-resolution printed output.' },
  ];
  
  const activePrompt = selectedPresetPrompt || customPrompt;

  const handlePresetClick = (prompt: string) => {
    setSelectedPresetPrompt(prompt);
    setCustomPrompt('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedPresetPrompt(null);
  };
  
  const handleApply = () => {
    if (activePrompt) {
      let finalPrompt = activePrompt;
      if (renderStyle === 'outlines') {
        finalPrompt += ' The art should primarily use characters to define the outlines and contours of the subjects, leaving the interiors relatively sparse or using minimal characters for shading.';
      } else { // 'solid'
        finalPrompt += ' The art should focus on using dense blocks of characters to create solid, filled-in shapes, emphasizing form over fine lines.';
      }
      onApplyAsciiArt(finalPrompt);
    }
  };

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-center text-gray-300">Generate ASCII Art</h3>

      <div className="flex items-center justify-center gap-4">
        <span className="text-sm font-medium text-gray-400">Render Style:</span>
        <div className="flex items-center gap-1 rounded-lg bg-gray-900/70 p-1">
          <button
            onClick={() => setRenderStyle('outlines')}
            disabled={isLoading}
            className={`w-28 text-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 disabled:opacity-50 active:scale-95 ${
              renderStyle === 'outlines' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            Outlines
          </button>
          <button
            onClick={() => setRenderStyle('solid')}
            disabled={isLoading}
            className={`w-28 text-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 disabled:opacity-50 active:scale-95 ${
              renderStyle === 'solid' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            Solid Fill
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {presets.map(preset => (
          <button
            key={preset.name}
            onClick={() => handlePresetClick(preset.prompt)}
            disabled={isLoading}
            className={`w-full text-center bg-white/10 border border-transparent text-gray-200 font-semibold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/20 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed ${selectedPresetPrompt === preset.prompt ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500' : ''}`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="flex items-center my-1">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-xs font-semibold">OR</span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>

      <input
        type="text"
        value={customPrompt}
        onChange={handleCustomChange}
        placeholder="Describe your own custom ASCII art style..."
        className="flex-grow bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60 text-base"
        disabled={isLoading}
        aria-label="Custom ASCII art style prompt"
      />
      
      {activePrompt && (
        <div className="animate-fade-in flex flex-col gap-4 pt-2">
          <button
            onClick={handleApply}
            className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
            disabled={isLoading || !activePrompt.trim()}
          >
            Apply ASCII Art
          </button>
        </div>
      )}
    </div>
  );
};

export default AsciiPanel;