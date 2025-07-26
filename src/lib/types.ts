import { Camera, Incident } from '@prisma/client';

export type IncidentWithCamera = Incident & {
  camera: Camera;
};