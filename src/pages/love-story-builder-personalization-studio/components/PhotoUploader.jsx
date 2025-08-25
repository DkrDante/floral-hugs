import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const PhotoUploader = ({ photoData, onPhotoUpdate }) => {
  const [photos, setPhotos] = useState(photoData?.photos || []);
  const [selectedFilter, setSelectedFilter] = useState(photoData?.filter || 'none');
  const [arrangement, setArrangement] = useState(photoData?.arrangement || 'grid');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);

  const filterOptions = [
    { value: 'none', label: 'Original' },
    { value: 'romantic', label: 'Romantic Glow' },
    { value: 'vintage', label: 'Vintage Love' },
    { value: 'soft', label: 'Soft Dreams' },
    { value: 'warm', label: 'Warm Embrace' },
    { value: 'sepia', label: 'Sepia Memories' },
    { value: 'black-white', label: 'Classic B&W' }
  ];

  const arrangementOptions = [
    { value: 'grid', label: 'Grid Layout' },
    { value: 'collage', label: 'Romantic Collage' },
    { value: 'heart', label: 'Heart Shape' },
    { value: 'timeline', label: 'Timeline Story' },
    { value: 'polaroid', label: 'Polaroid Stack' }
  ];

  const mockPhotos = [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop'
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newPhotos = files?.map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      name: file?.name,
      size: file?.size
    }));

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    updatePhotoData(updatedPhotos, selectedFilter, arrangement);
  };

  const addMockPhoto = (mockUrl) => {
    const newPhoto = {
      id: Date.now(),
      url: mockUrl,
      name: `Sample Photo ${photos?.length + 1}`,
      size: 0,
      isMock: true
    };

    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    updatePhotoData(updatedPhotos, selectedFilter, arrangement);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos?.filter(photo => photo?.id !== photoId);
    setPhotos(updatedPhotos);
    updatePhotoData(updatedPhotos, selectedFilter, arrangement);
  };

  const updatePhotoData = (newPhotos, filter, arr) => {
    onPhotoUpdate({
      photos: newPhotos,
      filter: filter,
      arrangement: arr,
      count: newPhotos?.length
    });
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    updatePhotoData(photos, filter, arrangement);
  };

  const handleArrangementChange = (arr) => {
    setArrangement(arr);
    updatePhotoData(photos, selectedFilter, arr);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    if (draggedIndex === null) return;

    const newPhotos = [...photos];
    const draggedPhoto = newPhotos?.[draggedIndex];
    newPhotos?.splice(draggedIndex, 1);
    newPhotos?.splice(dropIndex, 0, draggedPhoto);

    setPhotos(newPhotos);
    setDraggedIndex(null);
    updatePhotoData(newPhotos, selectedFilter, arrangement);
  };

  const getFilterClass = () => {
    const filterClasses = {
      none: '',
      romantic: 'sepia-[0.2] saturate-110 brightness-105',
      vintage: 'sepia-[0.4] contrast-110 brightness-95',
      soft: 'blur-[0.5px] brightness-110 saturate-90',
      warm: 'sepia-[0.1] saturate-120 brightness-105 hue-rotate-[10deg]',
      sepia: 'sepia-[0.8] contrast-105',
      'black-white': 'grayscale-[1] contrast-110'
    };
    return filterClasses?.[selectedFilter] || '';
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-romantic border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-romantic-gradient rounded-full flex items-center justify-center">
          <Icon name="Camera" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-playfair text-xl font-semibold text-foreground">Photo Memories</h3>
          <p className="text-sm text-muted-foreground">Create a beautiful visual story</p>
        </div>
      </div>
      {/* Upload Section */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors duration-300">
          <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="font-inter font-medium text-foreground mb-2">Upload Your Photos</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Drag & drop photos here, or click to browse
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="default"
              iconName="Upload"
              iconPosition="left"
              onClick={() => fileInputRef?.current?.click()}
              className="bg-romantic-gradient-dark"
            >
              Choose Photos
            </Button>
            <span className="text-sm text-muted-foreground">or</span>
            <Button
              variant="outline"
              iconName="Image"
              iconPosition="left"
              onClick={() => addMockPhoto(mockPhotos?.[Math.floor(Math.random() * mockPhotos?.length)])}
              className="hover:bg-primary/10"
            >
              Add Sample Photo
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
      {/* Photo Grid */}
      {photos?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-inter font-medium text-foreground">
              Your Photos ({photos?.length})
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="Shuffle"
              iconPosition="left"
              onClick={() => {
                const shuffled = [...photos]?.sort(() => Math.random() - 0.5);
                setPhotos(shuffled);
                updatePhotoData(shuffled, selectedFilter, arrangement);
              }}
              className="text-muted-foreground hover:text-secondary"
            >
              Shuffle
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos?.map((photo, index) => (
              <div
                key={photo?.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="relative group cursor-move"
              >
                <div className="aspect-square overflow-hidden rounded-lg border border-border">
                  <Image
                    src={photo?.url}
                    alt={photo?.name}
                    className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${getFilterClass()}`}
                  />
                </div>
                
                {/* Photo Controls */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePhoto(photo?.id)}
                      className="w-8 h-8 bg-white/20 hover:bg-error/80 text-white"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 bg-white/20 hover:bg-white/40 text-white"
                    >
                      <Icon name="Move" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Photo Info */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black/70 rounded px-2 py-1">
                    <p className="text-xs text-white truncate">{photo?.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Photo Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Select
          label="Photo Filter"
          options={filterOptions}
          value={selectedFilter}
          onChange={handleFilterChange}
          description="Apply romantic filters to enhance your photos"
        />

        <Select
          label="Photo Arrangement"
          options={arrangementOptions}
          value={arrangement}
          onChange={handleArrangementChange}
          description="Choose how your photos will be displayed"
        />
      </div>
      {/* Sample Photos */}
      {photos?.length === 0 && (
        <div className="border-t border-border pt-6">
          <h4 className="font-inter font-medium text-foreground mb-4">Try Sample Photos</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockPhotos?.map((mockUrl, index) => (
              <button
                key={index}
                onClick={() => addMockPhoto(mockUrl)}
                className="aspect-square overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <Image
                  src={mockUrl}
                  alt={`Sample photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Icon name="Plus" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Photo Tips */}
      <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Camera" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-inter font-medium text-foreground mb-1">Photo Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use high-quality images for the best results</li>
              <li>• Include photos that tell your love story</li>
              <li>• Mix close-ups and wider shots for variety</li>
              <li>• Drag photos to reorder them in your preferred sequence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploader;