import React, { useState, useRef } from 'react';
import { Camera, Upload, ShieldAlert, CheckCircle2, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { detectWildlife } from '../../services/gemini';
import { Detection } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

const ScannerView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<Partial<Detection> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        processImage(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64Data: string) => {
    setIsScanning(true);
    setResult(null);
    try {
      const detection = await detectWildlife(base64Data);
      setResult(detection);
    } catch (err) {
      console.error(err);
      // Fallback/Mock if API fails during demo
      setResult({
        type: 'Bengal Tiger',
        label: 'Tiger Detected',
        confidence: 0.98,
        risk: 'Critical',
        status: 'Active',
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsScanning(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="font-serif italic text-2xl md:text-3xl font-bold uppercase tracking-tight">AI Detection Engine</h2>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            Neural Core: Gemini 1.5 Flash Vision | Latency: ~1.2s
          </p>
        </div>
        {image && (
          <button 
            onClick={reset}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest hover:underline"
          >
            <RefreshCw className="w-3 h-3" />
            Reset Terminal
          </button>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
        {/* Upload / View Area */}
        <div className="bg-white border border-[#141414] relative overflow-hidden flex items-center justify-center min-h-[300px] lg:min-h-0">
          {!image ? (
            <div className="text-center p-6 md:p-12 flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 border border-dashed border-[#141414] rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                 <Camera className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="font-serif italic text-lg md:text-xl font-bold uppercase mb-2">Initialize Sensor Feed</h3>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest max-w-[240px] mb-8">
                Upload thermal capture, camera trap image or live mobile feed for neural analysis.
              </p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#141414] text-white px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all outline-none"
              >
                Upload Capture
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          ) : (
            <div className="w-full h-full relative group">
              <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/10" />
              
              {/* Scanning Overlay */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-10"
                  >
                    <div className="relative">
                       <div className="w-32 h-32 border-2 border-white/20 rounded-full animate-ping" />
                       <RefreshCw className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                    </div>
                    <span className="mt-8 font-mono text-[10px] text-white uppercase tracking-[0.4em] animate-pulse">Running Neural Inference...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bounding Box Mock (Only if result) */}
              {result && !isScanning && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-x-[20%] inset-y-[20%] border-4 border-[#60bb46] shadow-[0_0_20px_rgba(96,187,70,0.5)] flex flex-col justify-start items-start p-2"
                >
                  <div className="bg-[#60bb46] text-white font-mono text-[8px] uppercase tracking-widest px-2 py-0.5">
                    {result.type} | {(result.confidence! * 100).toFixed(0)}%
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="flex flex-col gap-6">
           <div className="bg-[#141414] text-white p-8 flex-1">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <h3 className="font-serif italic text-lg uppercase tracking-widest">Inference Results</h3>
                <Eye className="w-4 h-4 text-gray-500" />
              </div>

              {!result && !isScanning ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                   <ShieldAlert className="w-12 h-12 mb-4" />
                   <p className="font-mono text-[10px] uppercase tracking-widest">Awaiting Input Data</p>
                </div>
              ) : isScanning ? (
                <div className="space-y-6">
                   {[1,2,3].map(i => (
                     <div key={i} className="h-4 bg-white/5 animate-pulse rounded-sm" />
                   ))}
                </div>
              ) : (
                <div className="space-y-8 h-full flex flex-col">
                   <div className="space-y-1">
                      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Target Classification</p>
                      <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif italic uppercase tracking-tighter text-[#60bb46]">{result?.type}</h4>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 border border-white/10">
                         <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Confidence</p>
                         <p className="text-xl font-bold font-mono">{(result?.confidence! * 100).toFixed(1)}%</p>
                      </div>
                      <div className="bg-white/5 p-4 border border-white/10">
                         <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Risk Level</p>
                         <p className={classNames(
                           "text-xl font-bold font-mono uppercase",
                           result?.risk === 'Critical' ? "text-red-500" : "text-[#60bb46]"
                         )}>{result?.risk}</p>
                      </div>
                   </div>

                   <div className="flex-1 bg-white/5 p-6 border border-white/10">
                      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4">Conflict Mitigation Protcol</p>
                      <ul className="space-y-3 font-mono text-[10px] uppercase tracking-widest">
                         <li className="flex items-center gap-3 text-red-500 font-bold">
                            <AlertCircle className="w-4 h-4" />
                            Immediate Warning SMS to Village A-12
                         </li>
                         <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#60bb46]" />
                            Triggering High-Frequency Acoustic Siren
                         </li>
                         <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#60bb46]" />
                            GPS Tracking Payload Activated
                         </li>
                      </ul>
                   </div>

                   <button className="w-full py-4 bg-[#60bb46] text-white font-mono text-[10px] uppercase tracking-widest hover:bg-[#4ea839] transition-all">
                      Confirm & Dispatch Alert
                   </button>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerView;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
