import React, { useState } from 'react';
import { Shield, Upload, Camera, FileCheck, AlertTriangle, CheckCircle, XCircle, Info, Lock, Fingerprint, Eye, History, Share2, Download } from 'lucide-react';

const VeriMedia = () => {
  const [activeTab, setActiveTab] = useState('verify');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedFile(url);
      setVerificationResult(null);
    }
  };

  const handleRemoveFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile);
    }
    setUploadedFile(null);
    setVerificationResult(null);
  };

  const analyzeMedia = async () => {
    setIsAnalyzing(true);
    
    // TODO: Replace with actual API call to verification service
    // Example: const result = await verificationAPI.analyze(uploadedFile);
    
    // Simulated analysis for demo purposes
    setTimeout(() => {
      const trustScore = Math.floor(Math.random() * 40) + 60;
      const hasWatermark = Math.random() > 0.3;
      const layers = [
        { name: 'C2PA Watermark', status: hasWatermark ? 'pass' : 'fail', confidence: hasWatermark ? 98 : 0 },
        { name: 'Metadata Analysis', status: 'pass', confidence: 92 },
        { name: 'AI Detection', status: trustScore > 70 ? 'pass' : 'warning', confidence: trustScore },
        { name: 'Blockchain Verification', status: hasWatermark ? 'pass' : 'unknown', confidence: hasWatermark ? 95 : 0 },
        { name: 'Source Attribution', status: 'pass', confidence: 88 }
      ];
      
      setVerificationResult({
        trustScore,
        hasWatermark,
        layers,
        timestamp: new Date().toISOString(),
        source: hasWatermark ? 'Canon EOS R5' : 'Unknown',
        creator: hasWatermark ? 'John Photographer' : 'Unknown',
        modifications: Math.floor(Math.random() * 3)
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const TrustScoreMeter = ({ score }) => {
    const getColor = (s) => {
      if (s >= 85) return 'text-green-600';
      if (s >= 70) return 'text-yellow-600';
      return 'text-red-600';
    };

    const getLabel = (s) => {
      if (s >= 85) return 'Highly Trusted';
      if (s >= 70) return 'Moderately Trusted';
      return 'Low Trust';
    };

    const strokeColor = score >= 85 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444';

    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle 
              cx="64" 
              cy="64" 
              r="56" 
              stroke={strokeColor}
              strokeWidth="8" 
              fill="none"
              strokeDasharray={`${(score / 100) * 352} 352`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getColor(score)}`}>{score}</span>
            <span className="text-xs text-gray-500">Trust Score</span>
          </div>
        </div>
        <span className={`text-sm font-semibold ${getColor(score)}`}>{getLabel(score)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VeriMedia</h1>
                <p className="text-sm text-gray-500">Trust & Provenance Ecosystem</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition">
                <History className="w-4 h-4" />
                <span>History</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
                <Lock className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition ${
              activeTab === 'verify' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileCheck className="w-5 h-5" />
            <span>Verify Media</span>
          </button>
          <button
            onClick={() => setActiveTab('watermark')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition ${
              activeTab === 'watermark' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Fingerprint className="w-5 h-5" />
            <span>Add Watermark</span>
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md font-medium transition ${
              activeTab === 'about' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Info className="w-5 h-5" />
            <span>Swiss Cheese Model</span>
          </button>
        </div>

        {/* Verify Tab */}
        {activeTab === 'verify' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Media for Verification</h2>
                
                {!uploadedFile ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, MP4, or WebM</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img src={uploadedFile} alt="Uploaded" className="w-full h-64 object-cover rounded-lg" />
                      <button
                        onClick={handleRemoveFile}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button
                      onClick={analyzeMedia}
                      disabled={isAnalyzing}
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-5 h-5" />
                          <span>Verify Authenticity</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Multi-Layer</h3>
                  </div>
                  <p className="text-sm text-blue-700">5+ verification layers for maximum accuracy</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Blockchain</h3>
                  </div>
                  <p className="text-sm text-purple-700">Immutable provenance tracking</p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {verificationResult ? (
                <>
                  {/* Trust Score */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Verification Results</h2>
                    <div className="flex justify-center mb-6">
                      <TrustScoreMeter score={verificationResult.trustScore} />
                    </div>
                    
                    {/* Provenance Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Source Device</p>
                        <p className="text-sm font-semibold text-gray-900">{verificationResult.source}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Creator</p>
                        <p className="text-sm font-semibold text-gray-900">{verificationResult.creator}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Timestamp</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(verificationResult.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Modifications</p>
                        <p className="text-sm font-semibold text-gray-900">{verificationResult.modifications}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                        <Download className="w-4 h-4" />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>

                  {/* Layer Analysis */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Layer-by-Layer Analysis</h3>
                    <div className="space-y-3">
                      {verificationResult.layers.map((layer, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {layer.status === 'pass' && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {layer.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                            {layer.status === 'fail' && <XCircle className="w-5 h-5 text-red-600" />}
                            {layer.status === 'unknown' && <Info className="w-5 h-5 text-gray-400" />}
                            <span className="text-sm font-medium text-gray-900">{layer.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-gray-700">
                              {layer.confidence > 0 ? `${layer.confidence}%` : 'N/A'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-200 flex flex-col items-center justify-center h-full">
                  <Shield className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Media Uploaded</h3>
                  <p className="text-sm text-gray-500 text-center max-w-sm">
                    Upload an image or video to verify its authenticity using our multi-layer Swiss Cheese Model
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Watermark Tab */}
        {activeTab === 'watermark' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-lg">
                  <Fingerprint className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Add C2PA Watermark</h2>
                  <p className="text-sm text-gray-500">Establish provenance for your content</p>
                </div>
              </div>

              <div className="space-y-6">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Upload your original content</span>
                    </p>
                    <p className="text-xs text-gray-500">We'll embed a cryptographic watermark</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*,video/*" />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <Lock className="w-6 h-6 text-purple-600 mb-2" />
                    <h4 className="font-semibold text-purple-900 mb-1">Cryptographic</h4>
                    <p className="text-xs text-purple-700">Tamper-proof digital signature</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <History className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-blue-900 mb-1">Chain of Custody</h4>
                    <p className="text-xs text-blue-700">Track every modification</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                    <h4 className="font-semibold text-green-900 mb-1">Standards Based</h4>
                    <p className="text-xs text-green-700">C2PA & IPTC compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Swiss Cheese Model</h2>
              <p className="text-gray-600 mb-6">
                No single defense is perfect, but multiple overlapping layers create a robust system. 
                Each layer catches what others might miss.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                  <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Fingerprint className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Layer 1: Watermarking</h3>
                  <p className="text-sm text-blue-700">
                    C2PA cryptographic watermarks embedded at creation. Immutable provenance data.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                  <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">Layer 2: AI Detection</h3>
                  <p className="text-sm text-purple-700">
                    Neural networks trained to identify synthetic patterns and AI-generated artifacts.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                  <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">Layer 3: Metadata Analysis</h3>
                  <p className="text-sm text-green-700">
                    Deep inspection of EXIF, IPTC, and XMP data for inconsistencies and tampering.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
                  <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-yellow-900 mb-2">Layer 4: Blockchain</h3>
                  <p className="text-sm text-yellow-700">
                    Decentralized ledger for immutable timestamp verification and ownership tracking.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
                  <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <History className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">Layer 5: Source Attribution</h3>
                  <p className="text-sm text-red-700">
                    Cross-reference with trusted databases and verify creator credentials.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
                  <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">Layer 6: Behavioral</h3>
                  <p className="text-sm text-indigo-700">
                    Pattern recognition for distribution behavior typical of misinformation campaigns.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-3">Why Multiple Layers?</h3>
              <p className="mb-4 opacity-90">
                Deepfakes are evolving rapidly. A single detection method will eventually be bypassed. 
                The Swiss Cheese Model ensures that even if one layer fails, others catch the threat.
              </p>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded mb-4">
                <p className="text-sm font-semibold">⚠️ Demo Mode</p>
                <p className="text-xs mt-1">Statistics shown are simulated. Connect real verification APIs for production use.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VeriMedia;