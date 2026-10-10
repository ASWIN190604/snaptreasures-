import React, { useRef, useState } from 'react';
import { FiUploadCloud, FiTrash2, FiImage, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export const ImageUploader = ({ onImageSelect, selectedImage, onImageRemove }) => {
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    setErrorMessage('');
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a JPG, PNG, or WebP image.');
      return;
    }

    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
      setErrorMessage('Image file size must be less than 25MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(e.target.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      {selectedImage ? (
        <div className="bg-white rounded-2xl border-2 border-[#F20D65]/40 p-4 relative flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FFF1F4] border border-[#F0DDE2] shrink-0">
              <img
                src={selectedImage}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <FiCheckCircle className="shrink-0" /> Photo Loaded Successfully
              </div>
              <p className="text-xs text-[#786D73] mt-0.5 truncate">
                Ready for high-resolution preview & print alignment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-[#FFF1F4] hover:bg-[#FCE5EC] text-[#F20D65] text-xs font-semibold rounded-lg transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={onImageRemove}
              aria-label="Remove image"
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <FiTrash2 className="text-base" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all duration-200 flex flex-col items-center justify-center ${
            dragActive
              ? 'border-[#F20D65] bg-[#FFF1F4]'
              : 'border-[#F0DDE2] hover:border-[#F20D65] bg-[#FFF9F4]/70 hover:bg-[#FFF9F4]'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#FFF1F4] text-[#F20D65] flex items-center justify-center mb-3 shadow-xs">
            <FiUploadCloud className="text-2xl" />
          </div>
          <h4 className="font-bold text-sm sm:text-base text-[#29212A] mb-1">
            Click to upload or drag & drop your photo
          </h4>
          <p className="text-xs text-[#786D73] max-w-sm">
            Supports JPG, PNG, and WebP (Max 25MB). Original high-res gallery shots yield the best prints!
          </p>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-white border border-[#F20D65] text-[#F20D65] hover:bg-[#F20D65] hover:text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Browse Photos
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="mt-2.5 flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl">
          <FiAlertCircle className="shrink-0 text-sm" />
          <span>{errorMessage}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
