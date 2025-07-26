import React from 'react';
import { IncidentWithCamera } from '@/lib/types';
import Image from 'next/image';

interface IncidentPlayerProps {
  incident: IncidentWithCamera | null;
}

export const IncidentPlayer: React.FC<IncidentPlayerProps> = ({ incident }) => {
  return (
    <div className="bg-black rounded-lg p-4 flex flex-col h-full">
      <div className="relative aspect-video w-full bg-gray-900 rounded-md mb-4 flex items-center justify-center">
        {incident ? (
          <Image
            src={incident.thumbnailUrl}
            alt="Incident"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        ) : (
          <Image
            src="/Overlay.png"
            alt="Select an incident"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        )}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-white">
          {incident ? incident.camera.location : 'No Incident Selected'}
        </h3>
        <p className="text-sm text-gray-400">{incident ? incident.camera.name : '...'}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <div className="aspect-video bg-gray-800 rounded flex items-center justify-center">
          <p className="text-xs text-gray-500">CAM-02</p>
        </div>
        <div className="aspect-video bg-gray-800 rounded flex items-center justify-center">
          <p className="text-xs text-gray-500">CAM-03</p>
        </div>
      </div>
    </div>
  );
};
