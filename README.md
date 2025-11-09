# 🤖 AI Chat Demo

A modern, responsive chat application built with Vue 3, TypeScript, and Vite that simulates AI conversations with realistic word-by-word streaming responses.

## ✨ Features

- **🎯 Real-time Streaming**: AI responses appear word-by-word with realistic typing delays
- **🌙 Dark/Light Mode**: Toggle between themes with smooth transitions
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🔧 Type-Safe**: Full TypeScript support for better development experience
- **🎨 Modern UI**: Clean, minimalist design with smooth animations
- **🧪 Comprehensive Testing**: Full test coverage with Vitest and Vue Test Utils

## 🚀 Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Testing**: Vitest with Vue Test Utils
- **Styling**: Native CSS with CSS custom properties
- **Utilities**: VueUse for common composables
- **Code Quality**: ESLint with TypeScript rules

## 📦 Installation

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aiChat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint and fix code issues
- `npm run test` - Run all tests once
- `npm run test:unit` - Run tests in watch mode

## 🏗️ Project Structure

```
src/
├── components/           # Reusable Vue components
│   ├── ChatWindow.vue   # Main chat interface
│   ├── ChatInput.vue    # Message input component
│   └── __tests__/       # Component unit tests
├── services/            # Business logic and API calls
│   └── chatService.ts   # AI response simulation
├── stores/              # Pinia state management
│   ├── messages.ts      # Chat messages store
│   └── __tests__/       # Store unit tests
├── types/               # TypeScript type definitions
│   └── Message.ts       # Message interface
├── views/               # Page components
│   ├── ChatView.vue     # Main chat page
│   └── __tests__/       # View unit tests
├── router/              # Vue Router configuration
│   ├── index.ts         # Route definitions
│   └── __tests__/       # Router unit tests
├── test/                # Test utilities and integration tests
│   ├── testUtils.ts     # Common testing utilities
│   └── chatFlowTest.spec.ts # Chat flow tests
├── assets/              # Static assets
│   └── main.css         # Global styles
├── App.vue              # Root component
└── main.ts              # Application entry point
```

## 🎨 Features Deep Dive

### Word-by-Word Streaming
The AI responses use a sophisticated streaming simulation that:
- Splits responses into words
- Sends each word with a realistic 150ms delay
- Updates the UI reactively as each word arrives
- Maintains smooth scrolling to keep new content visible

### Auto-Focus Management
After each AI response completes:
- The input field automatically receives focus
- Users can immediately type the next message
- No need to click back into the input field

### Responsive Design
- Mobile-first approach with flexible layouts
- Touch-friendly interface elements
- Optimized typography for all screen sizes

### Theme System
- CSS custom properties for consistent theming
- Smooth transitions between light and dark modes
- System preference detection with manual override

## 🔧 Customization

### Adding New AI Responses
Edit `src/services/chatService.ts` to add more response variations:

```typescript
const responses = [
  "Your new AI response here...",
  // Add more responses
];
```

### Adjusting Streaming Speed
Modify the delay in `chatService.ts`:

```typescript
await new Promise((res) => setTimeout(res, 150)); // Change 150ms to desired speed
```

### Styling Customization
All styles use CSS custom properties defined in `src/assets/main.css`:

```css
:root {
  --primary: #007bff;     /* Primary color */
  --surface: #ffffff;     /* Card backgrounds */
  --bg: #f8f9fa;         /* Page background */
  /* ... more variables */
}
```

## 🧪 Testing

### Testing Tools
- **Vitest**: Fast and modern test runner
- **Vue Test Utils**: Official Vue.js testing utilities
- **JSDOM**: DOM simulation for component testing
- **Custom Test Builder**: Simplified component testing setup

## 🌟 Code Quality

This project follows best practices:

- **TypeScript**: Full type safety across the entire codebase
- **ESLint**: Strict linting rules with comprehensive rule sets
- **Vue 3 Composition API**: Modern, maintainable component architecture
- **Reactive State**: Pinia for predictable state management
- **Test-Driven Development**: Comprehensive test coverage
- **Clean Architecture**: Clear separation of concerns

## 🚀 Deployment

### Build for Production
```bash
# Run type checking and build
npm run build

# Preview the production build locally
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deploy to Netlify/Vercel
1. Connect your repository to your preferred hosting service
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Ensure Node.js version is `^20.19.0` or `>=22.12.0`

## 🙋‍♂️ Support

If you have any questions or run into issues:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs
