# SecureSight - CCTV Monitoring Dashboard

A comprehensive CCTV monitoring software dashboard built with Next.js 15, featuring AI-powered incident detection and real-time monitoring capabilities.

## 🚀 Features

### Mandatory Features ✅
- **Navbar**: Modern navigation with user profile and menu items
- **Incident Player**: Video playback interface with camera thumbnails and controls
- **Incident List**: Real-time incident management with resolve functionality
- **Database Integration**: Prisma with SQLite for data persistence
- **RESTful API**: Complete CRUD operations for incidents

### Optional Features ✅
- **Interactive Timeline**: 24-hour SVG timeline with draggable scrubber
- **Real-time Updates**: Optimistic UI updates for incident resolution
- **Responsive Design**: Mobile-friendly interface
- **Modern UI/UX**: Dark theme with professional styling

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd securesight-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup the database**
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🗄️ Database Schema

### Camera Model
```prisma
model Camera {
  id        String   @id @default(cuid())
  name      String
  location  String
  incidents Incident[]
}
```

### Incident Model
```prisma
model Incident {
  id           String   @id @default(cuid())
  cameraId     String
  type         String   // "Unauthorised Access", "Gun Threat", etc.
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String
  resolved     Boolean  @default(false)
  camera       Camera   @relation(fields: [cameraId], references: [id])
}
```

## 🔌 API Endpoints

### GET /api/incidents
Fetch incidents with optional filtering
```bash
# Get all incidents
GET /api/incidents

# Get only unresolved incidents
GET /api/incidents?resolved=false
```

### PATCH /api/incidents/:id/resolve
Toggle incident resolution status
```bash
PATCH /api/incidents/cm123abc/resolve
```

## 🎯 Key Components

### IncidentPlayer
- Large video display area with mock footage
- Camera thumbnail strip
- Playback controls (play, pause, skip)
- Timeline scrubber
- Current time display

### IncidentList
- Scrollable list of unresolved incidents
- Color-coded incident types
- One-click resolution with optimistic UI
- Auto-selection of next incident after resolution

### IncidentTimeline
- 24-hour SVG timeline ruler
- Draggable time scrubber
- Visual incident markers
- Camera status indicators

## 🎨 Design Features

- **Dark Theme**: Professional security monitoring interface
- **Color-Coded Incidents**: Easy visual identification of threat types
- **Responsive Grid**: Adapts to different screen sizes
- **Smooth Animations**: Enhanced user experience with transitions
- **Loading States**: Proper feedback during async operations

## 📊 Seed Data

The project includes a comprehensive seed script that creates:
- 3 cameras (Shop Floor A, Vault, Entrance)
- 15+ incidents across 5 different threat types
- Realistic timestamps spanning 24 hours
- Placeholder thumbnails and mock data

## 🔧 Development Commands

```bash
# Development
npm run dev

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema to database
npm run db:seed       # Seed the database
npm run db:studio     # Open Prisma Studio

# Build and production
npm run build
npm start
```

## 🌟 Future Enhancements

- **Real Video Integration**: Connect to actual CCTV feeds
- **WebSocket Support**: Real-time incident notifications
- **User Authentication**: Role-based access control
- **Export Features**: Generate incident reports
- **Mobile App**: React Native companion app
- **AI Integration**: Advanced threat detection algorithms

## 📱 Responsive Design

The dashboard is fully responsive and works across:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- **Data Validation**: Input sanitization and validation
- **Error Handling**: Comprehensive error boundaries
- **SQL Injection Protection**: Prisma ORM safety
- **XSS Prevention**: React built-in protections

## 📝 License

This project is created for educational and assessment purposes.

---

**SecureSight** - Advanced CCTV Monitoring Made Simple 🔒📹
