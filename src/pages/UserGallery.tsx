import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText, Film, ImageIcon } from 'lucide-react';
import { GalleryFile } from '@/types';

const UserGallery: React.FC = () => {
  const [files, setFiles] = useState<GalleryFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: GalleryFile[] = Array.from(fileList).map(f => {
      let type: GalleryFile['type'] = 'image';
      if (f.type.startsWith('video/')) type = 'video';
      else if (f.type === 'application/pdf') type = 'pdf';

      return {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: f.name,
        type,
        size: f.size,
        url: URL.createObjectURL(f),
        createdAt: new Date().toISOString(),
      };
    });
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
  };

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const typeIcon = (type: GalleryFile['type']) => {
    if (type === 'video') return <Film className="w-8 h-8 text-info" />;
    if (type === 'pdf') return <FileText className="w-8 h-8 text-destructive" />;
    return <ImageIcon className="w-8 h-8 text-accent" />;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gallery</h1>
        <p className="text-muted-foreground mt-1">Upload and manage your files</p>
      </div>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className={`w-10 h-10 mx-auto mb-3 ${dragActive ? 'text-primary' : 'text-muted-foreground'}`} />
        <p className="text-foreground font-medium">Drop files here or click to upload</p>
        <p className="text-sm text-muted-foreground mt-1">Images, PDFs, and videos supported</p>
        <input ref={inputRef} type="file" multiple accept="image/*,video/*,.pdf" className="hidden" onChange={handleChange} />
      </div>

      {/* File Grid */}
      {files.length === 0 ? (
        <div className="empty-state card-glass py-16">
          <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground">No files uploaded</h3>
          <p className="text-muted-foreground mt-1">Upload files to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.map(file => (
            <div key={file.id} className="card-glass overflow-hidden group">
              <div className="relative h-40 bg-muted flex items-center justify-center">
                {file.type === 'image' ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  typeIcon(file.type)
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute top-2 right-2 p-1.5 bg-card/80 backdrop-blur rounded-lg text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGallery;
