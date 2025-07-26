import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clean up existing data
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  // Create Cameras
  const camera1 = await prisma.camera.create({
    data: { name: 'CAM-01', location: 'Shop Floor A' },
  });
  const camera2 = await prisma.camera.create({
    data: { name: 'CAM-02', location: 'Vault' },
  });
  const camera3 = await prisma.camera.create({
    data: { name: 'CAM-03', location: 'Main Entrance' },
  });

  console.log(`Created cameras...`);

  // Create Incidents
  const now = new Date();
  const incidentsData = [
    // Unauthorised Access
    { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 2 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 118 * 60 * 1000), cameraId: camera3.id, thumbnailUrl: '/thumbnails/thumb1.jpg' },
    { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 5 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 299 * 60 * 1000), cameraId: camera3.id, thumbnailUrl: '/thumbnails/thumb2.jpg' },
    { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 8 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 478 * 60 * 1000), cameraId: camera1.id, thumbnailUrl: '/thumbnails/thumb3.jpg' },

    // Gun Threat
    { type: 'Gun Threat', tsStart: new Date(now.getTime() - 1 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 59 * 60 * 1000), cameraId: camera2.id, thumbnailUrl: '/thumbnails/thumb4.jpg', resolved: true },
    { type: 'Gun Threat', tsStart: new Date(now.getTime() - 10 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 598 * 60 * 1000), cameraId: camera3.id, thumbnailUrl: '/thumbnails/thumb5.jpg' },

    // Face Recognised
    { type: 'Face Recognised', tsStart: new Date(now.getTime() - 3 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 179 * 60 * 1000), cameraId: camera1.id, thumbnailUrl: '/thumbnails/thumb6.jpg' },
    { type: 'Face Recognised', tsStart: new Date(now.getTime() - 12 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 719 * 60 * 1000), cameraId: camera3.id, thumbnailUrl: '/thumbnails/thumb7.jpg' },

    // Fire Hazard
    { type: 'Fire Hazard', tsStart: new Date(now.getTime() - 4 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 239 * 60 * 1000), cameraId: camera1.id, thumbnailUrl: '/thumbnails/thumb8.jpg' },
    { type: 'Fire Hazard', tsStart: new Date(now.getTime() - 20 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 1199 * 60 * 1000), cameraId: camera2.id, thumbnailUrl: '/thumbnails/thumb9.jpg' },

    // Vandalism
    { type: 'Vandalism', tsStart: new Date(now.getTime() - 6 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 358 * 60 * 1000), cameraId: camera1.id, thumbnailUrl: '/thumbnails/thumb10.jpg', resolved: true },
    { type: 'Vandalism', tsStart: new Date(now.getTime() - 15 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 898 * 60 * 1000), cameraId: camera3.id, thumbnailUrl: '/thumbnails/thumb11.jpg' },
    { type: 'Vandalism', tsStart: new Date(now.getTime() - 22 * 60 * 60 * 1000), tsEnd: new Date(now.getTime() - 1318 * 60 * 1000), cameraId: camera2.id, thumbnailUrl: '/thumbnails/thumb12.jpg' },
  ];

  for (const data of incidentsData) {
    await prisma.incident.create({ data });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });