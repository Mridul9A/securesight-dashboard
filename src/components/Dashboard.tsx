'use client';

import React, { useState, useTransition } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { IncidentPlayer } from './IncidentPlayer';
import { IncidentList } from './IncidentList';
import { IncidentWithCamera } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Dashboard = () => {
  const { data: incidents, error } = useSWR<IncidentWithCamera[]>('/api/incidents?resolved=false', fetcher, {
    revalidateOnFocus: true,
  });
  const { mutate } = useSWRConfig();
  const [isPending, startTransition] = useTransition();

  const [selectedIncident, setSelectedIncident] = useState<IncidentWithCamera | null>(null);

  const handleSelectIncident = (incident: IncidentWithCamera) => {
    setSelectedIncident(incident);
  };

  const handleResolveIncident = async (id: string) => {
    if (!incidents) return;

    // Optimistic UI: remove the item from the list immediately
    const optimisticData = incidents.filter((inc) => inc.id !== id);

    // We use a transition to apply a "fade-out" effect via CSS
    startTransition(async () => {
      await mutate('/api/incidents?resolved=false', optimisticData, false);

      // API call to resolve the incident
      await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' });

      // Revalidate to ensure data is consistent with the server
      mutate('/api/incidents?resolved=false');
    });

    // If the resolved incident was the selected one, clear the player
    if (selectedIncident?.id === id) {
        setSelectedIncident(null);
    }
  };

  if (error) return <div>Failed to load incidents.</div>;
  if (!incidents) return <div>Loading...</div>;

  return (
    <main className={`grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 flex-grow transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
      <div className="lg:col-span-2">
        <IncidentPlayer incident={selectedIncident || incidents[0]} />
      </div>
      <div>
        <IncidentList
          incidents={incidents}
          onSelectIncident={handleSelectIncident}
          onResolveIncident={handleResolveIncident}
        />
      </div>
    </main>
  );
};