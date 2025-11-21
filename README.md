# Wedding Anniversary Card Generator

I built this **Wedding Anniversary Card Generator** to help people create luxurious, cinematic, and personalized anniversary invitations for their loved ones. It's designed to be visually stunning and incredibly interactive.

## Why I Built This

I wanted to create a way to send a digital anniversary invitation that feels premium and special, not just a static image. This project allows users to:
- **Create a personalized invitation** with event details, couple photos, and a heartfelt message.
- **Cinematic Gate Opening**: I implemented a beautiful gate transition animation that opens to reveal the invitation.
- **Premium Aesthetics**: I focused heavily on smooth animations, elegant typography, and rich color palettes with gold accents.
- **Background Music**: Auto-playing romantic music enhances the experience (with mute option).
- **Continuous Confetti**: Celebration effects with colorful confetti rain throughout the experience.
- **Multiple Themes**: Switch between cinematic and gallery views to showcase memories.

## How It Works

1. **Create**: Enter the anniversary event details and upload couple photos.
2. **Customize**: Add gallery photos and a special message.
3. **Share**: Generate a unique link to send to guests.

## Tech Stack

I used the following technologies to bring this to life:
- **Next.js**: For the framework and routing.
- **Tailwind CSS**: For rapid, beautiful styling.
- **Framer Motion**: To add those buttery smooth animations.
- **Canvas Confetti**: For the celebration effects.
- **Prisma**: For database management.
- **Vercel Blob**: For image storage.

## Getting Started

If you want to run my project locally:

1. Clone the repo.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (`.env` file):
   ```
   DATABASE_URL="your-database-url"
   BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
   ```
4. Run database migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) to see it in action.

## Features

- **Elegant Gate Animation**: A cinematic opening sequence that sets the mood
- **Couple Photo Entrance**: Beautiful side-by-side photo reveal with elegant frames
- **Theme Switching**: Toggle between cinematic and gallery views
- **Responsive Design**: Works beautifully on all devices
- **Audio Controls**: Background music with easy mute/unmute toggle
- **Photo Gallery**: Showcase multiple memories in a beautiful grid layout

I hope you enjoy using this tool as much as I enjoyed building it!
# Anniversary-Page-Builder
