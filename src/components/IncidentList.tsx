import React from 'react';
import { IncidentWithCamera } from '@/lib/types';
import Image from 'next/image';
import { format } from 'date-fns';

const threatColors: { [key: string]: string } = {
  'Unauthorised Access': 'bg-yellow-500',
  'Gun Threat': 'bg-red-600',
  'Face Recognised': 'bg-blue-500',
  'Fire Hazard': 'bg-orange-500',
  'Vandalism': 'bg-purple-500',
};

interface IncidentListProps {
  incidents: IncidentWithCamera[];
  onSelectIncident: (incident: IncidentWithCamera) => void;
  onResolveIncident: (id: string) => Promise<void>;
}

export const IncidentList: React.FC<IncidentListProps> = ({ incidents, onSelectIncident, onResolveIncident }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 h-full overflow-y-auto">
      <h2 className="text-white text-lg font-bold mb-4">Active Incidents</h2>
      <ul className="space-y-3">
        {incidents.map((incident) => (
          <li
            key={incident.id}
            className="bg-gray-800 p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => onSelectIncident(incident)}
          >
            <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
              <Image src={incident.thumbnailUrl} alt={incident.type} layout="fill" objectFit="cover" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${threatColors[incident.type] || 'bg-gray-400'}`}></span>
                <p className="font-semibold text-white">{incident.type}</p>
              </div>
              <p className="text-sm text-gray-400">{incident.camera.location}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(incident.tsStart), 'HH:mm')} - {format(new Date(incident.tsEnd), 'HH:mm')}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent li onClick from firing
                onResolveIncident(incident.id);
              }}
              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              Resolve
            </button>
          </li>
        ))}
         {incidents.length === 0 && (
            <p className="text-gray-400 text-center py-8">No unresolved incidents. Great job! ✨</p>
         )}
      </ul>
    </div>
  );
};