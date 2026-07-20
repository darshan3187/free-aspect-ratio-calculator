import React, { useState } from 'react';
import { UploadCloud, X, CheckCircle, FileImage } from 'lucide-react';

export default function ImageInspector({
  uploadedImage, setUploadedImage,
  onImageLoaded
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileProcess = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const imageDetails = {
          name: file.name,
          sizeKb: (file.size / 1024).toFixed(1),
          width: img.naturalWidth,
          height: img.naturalHeight,
          previewUrl: e.target.result
        };
        setUploadedImage(imageDetails);
        onImageLoaded(img.naturalWidth, img.naturalHeight);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  return (
    <div className="studio-card p-4 sm:p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-neutral-300 flex-shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider font-sans">Image Inspector</h2>
        </div>
        <span className="text-[10px] sm:text-[11px] text-[#888888] font-mono">Client-Side Private</span>
      </div>

      {!uploadedImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border border-dashed rounded-xl p-5 sm:p-6 text-center transition-all cursor-pointer relative overflow-hidden ${
            isDragOver
              ? 'border-white bg-[#171717]'
              : 'border-white/10 hover:border-white/20 bg-[#000000]'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            aria-label="Upload image to inspect dimensions"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <FileImage className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-400 mx-auto mb-2 opacity-80" />
          <p className="text-xs font-semibold text-white mb-0.5 leading-snug font-sans">
            Drop image file here or tap to select
          </p>
          <p className="text-[10px] text-[#888888] font-mono">PNG, JPG, WebP, SVG (100% Client-Side Memory)</p>
        </div>
      ) : (
        <div className="bg-[#000000] rounded-xl p-3 sm:p-3.5 border border-white/[0.08] flex items-center justify-between gap-3 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <img src={uploadedImage.previewUrl} alt={uploadedImage.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-white/10 flex-shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs font-semibold text-white truncate max-w-[130px] sm:max-w-[200px] font-sans">{uploadedImage.name}</span>
                <CheckCircle className="w-3.5 h-3.5 text-white flex-shrink-0" />
              </div>
              <span className="text-[11px] font-mono text-white font-bold block mt-0.5">
                {uploadedImage.width} × {uploadedImage.height} px
              </span>
            </div>
          </div>

          <button
            onClick={() => setUploadedImage(null)}
            aria-label="Remove uploaded image"
            className="p-1.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 text-xs transition-all flex-shrink-0 active:scale-95 cursor-pointer"
            title="Remove uploaded image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
