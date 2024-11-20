
# 🌍 Real-Time Temperature Management App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), designed to showcase **real-time data handling** using **Server-Sent Events (SSE)** and HTTP API interactions.

## 🚀 Getting Started

First, install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action.

## ✨ Features

- 🌡️ **Real-time Temperature Updates**: Receive live updates about temperatures and countries every 5 seconds using SSE.
- 🖋️ **Dynamic Submissions**: Submit new temperatures and countries through the app interface via HTTP POST.
- 🔄 **Switch Initial Data**: Dynamically switch between predefined temperature sets using HTTP PUT.
- 🌓 **Dark Mode Ready**: Supports system-level dark mode with smooth transitions.
- 🎨 **Styled with Tailwind CSS**: Responsive and modern design.
- 🛠️ **Development**: Easy to set up and extend.

## 📁 File Structure

- **Frontend**: Located in `src/app/page.tsx`, implements real-time data fetching and UI interactions.
- **Backend**: API routes are in `src/app/api/sse/route.ts`, handling GET, POST, and PUT requests.

## 🔑 Key Scripts

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm start
```

## 📚 Learn More

To dive deeper into the tools and technologies used in this project, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about utility-first styling with Tailwind CSS.
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) - Learn how SSE works.

## 🚢 Deploy on Vercel

The easiest way to deploy your Next.js app is through the Vercel Platform. Follow these steps:

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Connect your repository to Vercel.
3. Deploy your application with one click!

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
