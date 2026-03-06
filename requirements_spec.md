# Terminal Portfolio - Requirements Specification Document

## Project Overview
A professional, interactive terminal-themed portfolio website that showcases skills, projects, and experience through a retro command-line interface.

---

## 1. Technical Stack Requirements

### Core Framework
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **Package Manager**: npm/pnpm/yarn

### Styling & UI
- **CSS Framework**: Tailwind CSS v3.4+
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: JetBrains Mono (primary), Fira Code (fallback)

### Build & Deployment
- **Build Tool**: Next.js built-in (Turbopack for dev)
- **Deployment Target**: Vercel, Netlify, or any Node.js hosting
- **Static Export**: Optional support for static hosting

---

## 2. Functional Requirements

### 2.1 Core Terminal Features

#### Command System
- **Command Parser**: Case-insensitive command recognition
- **Command History**: Full history navigation using ↑/↓ arrow keys
- **Command Auto-complete**: Optional tab completion for commands
- **Error Handling**: Clear error messages for invalid commands

#### Available Commands
1. `help` - Display all available commands with descriptions
2. `about` - Show personal bio and introduction
3. `education` - Display educational background (college, CGPA)
4. `experience` - Show work experience and internships
5. `projects` - Interactive project showcase with filters
6. `skills` - Display technical skills categorized
7. `contact` - Display contact information and social links
8. `resume` / `cv` - Open interactive PDF viewer or download
9. `neofetch` - Display system information in neofetch style
10. `themes` - List available color themes
11. `themes set <name>` - Change active color theme
12. `clear` - Clear terminal history
13. `gui` - Transition to graphical portfolio (optional future feature)

### 2.2 Boot Sequence
- **ASCII Art Banner**: Custom ASCII art with name/branding
- **Loading Animation**: "System Booting..." with streaming text effect
- **Welcome Message**: Brief introduction after boot
- **Initial Prompt**: Suggest typing 'help' to get started

### 2.3 Visual Effects

#### Core Effects
- **Streaming Text**: Character-by-character typing animation (LLM-style)
- **CRT Scanlines**: Authentic retro monitor scanline overlay
- **Glassmorphism**: Frosted glass effect on terminal window
- **Cursor Blink**: Animated terminal cursor
- **Glow Effect**: Subtle text glow for enhanced retro feel

#### Animations
- **Command Entry**: Smooth command submission animation
- **Output Rendering**: Staggered content reveal
- **Theme Transition**: Smooth color scheme transitions
- **Hover States**: Interactive hover effects on clickable elements

### 2.4 Theme System

#### Required Themes
1. **Dark** (Default) - Classic terminal green on dark
2. **Light** - Clean white background for accessibility
3. **Blue Matrix** - Cyan/blue cyberpunk aesthetic
4. **Espresso** - Warm coffee/brown tones
5. **Green Goblin** - Neon green hacker vibes
6. **Ubuntu** - Classic Ubuntu purple theme

#### Theme Features
- Persistent theme selection (localStorage)
- Instant theme switching without reload
- All themes accessible via `themes set <name>` command
- Theme preview in `themes` command output

### 2.5 Content Display Requirements

#### Education Section
- University/College name
- Degree and major
- CGPA with total scale
- Duration (start - end year)

#### Experience Section
- **Internship**: Company, role, duration

#### Projects Section
- **Project Cards**: Visual cards with images
- **Project Details**: Title, description, tech stack
- **Links**: GitHub repository
- **Filtering**: Filter by technology/category (optional)
- **Additional Instructions**: Some project screenshots (Voices-Unheard, Remembron, TravelShield) are mobile app UIs, while others (Floatchat, Justice.ai) are web dashboards. Handle differing aspect ratios without cropping or cutting corners. Create a consistent 1200×800 showcase layout that elegantly frames mobile and web screenshots (e.g., device/browser mockups or padded containers), maintains uniform spacing, shadows, and border radius, and remains fully responsive and visually balanced across all screen sizes.


#### Publications Section
- **Patents**: Patent title, number, date, co-authors

#### Skills Section
- **Categorized Display**: 
  - Programming Languages
  - Development
  - Cloud Technologies
  - Cybersecurity Skills

#### Contact Section
- Email (clickable mailto link)
- GitHub profile
- LinkedIn profile
- LeetCode profile
- Other social media (Twitter, portfolio site, etc.)
- All links open in new tab

### 2.6 Resume/CV Feature
- **PDF Viewer**: In-browser PDF preview
- **Download Button**: Direct download option
- **Responsive**: Works on mobile devices
- **Alternative**: If PDF viewer not feasible, direct download link

---

## 3. Non-Functional Requirements

### 3.1 Performance
- **Initial Load**: < 3 seconds on 3G
- **Command Response**: < 100ms for command execution
- **Animation Performance**: 60fps for all animations
- **Bundle Size**: < 500KB initial JavaScript bundle

### 3.2 Responsive Design
- **Desktop**: Full terminal experience (1024px+)
- **Tablet**: Optimized layout (768px - 1023px)
- **Mobile**: Quick action buttons instead of typing (< 768px)
- **Mobile Quick Actions**: Buttons for: help, projects, contact, resume

### 3.3 Accessibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Semantic HTML, ARIA labels
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respect prefers-reduced-motion
- **Color Contrast**: WCAG AA compliance for all themes

### 3.4 Browser Compatibility
- **Chrome/Edge**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Mobile Browsers**: iOS Safari, Chrome Android

### 3.5 SEO & Meta
- **Title**: Optimized page title
- **Description**: Clear meta description
- **Open Graph**: Social media preview cards
- **Favicon**: Custom favicon
- **Structured Data**: JSON-LD for person schema

---

## 4. User Experience Requirements

### 4.1 First-Time User Experience
1. Impressive boot sequence captures attention
2. Clear welcome message explains how to use
3. Suggestion to type 'help' for commands
4. Intuitive command discovery

### 4.2 Returning User Experience
1. Skip boot animation option (localStorage flag)
2. Remember theme preference
3. Fast command execution
4. Command history persists in session

### 4.3 Mobile User Experience
1. Quick action bar for common commands
2. Virtual keyboard friendly
3. Touch-optimized interactions
4. No typing required for basic navigation

---

## 5. Content Requirements

### 5.1 Copy Requirements
- Professional, concise bio (2-3 paragraphs)
- Clear project descriptions (50-100 words each)
- Achievement-focused experience bullets
- Error messages that are helpful and friendly

### 5.2 Media Requirements
- **Project Images**: 1200x800px, optimized (< 200KB each)
- **Resume PDF**: Accessible, < 2MB
- **Favicon**: 16x16, 32x32, 192x192 PNG
- **Open Graph Image**: 1200x630px

### 5.3 Links Requirements
- All external links open in new tab
- All links include rel="noopener noreferrer"
- GitHub links point to actual repositories
- Email and phone use appropriate protocols

---

## 6. Security Requirements

### 6.1 Data Protection
- No sensitive data in client code
- Environment variables for any API keys
- No PII exposed unnecessarily

### 6.2 External Links
- All external links sanitized
- No inline scripts in user content
- CSP headers configured

---

## 7. Development Requirements

### 7.1 Code Quality
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier configured
- **Type Safety**: No 'any' types without justification

### 7.2 Component Structure
- Modular, reusable components
- Clear separation of concerns
- Single Responsibility Principle
- Component composition over inheritance

### 7.3 State Management
- React hooks for local state
- No global state library needed (unless complexity grows)
- LocalStorage for theme and preferences

### 7.4 File Organization
```
app/
  ├── page.tsx              # Main terminal component
  ├── layout.tsx            # Root layout
  ├── globals.css           # Global styles
  └── components/
      ├── Terminal/         # Terminal-specific components
      ├── Commands/         # Command output components
      └── UI/               # Reusable UI components
lib/
  ├── commands.ts           # Command definitions
  ├── themes.ts             # Theme configurations
  └── utils.ts              # Utility functions
types/
  └── index.ts              # TypeScript types
public/
  ├── resume.pdf
  └── projects/             # Project images
```

---

## 8. Testing Requirements

### 8.1 Manual Testing Checklist
- [ ] All commands execute correctly
- [ ] Arrow key navigation works
- [ ] Theme switching works
- [ ] Mobile quick actions work
- [ ] All links are functional
- [ ] PDF viewer/download works
- [ ] Responsive on all screen sizes
- [ ] No console errors

### 8.2 Performance Testing
- [ ] Lighthouse score > 90
- [ ] No layout shifts (CLS < 0.1)
- [ ] Fast initial render (FCP < 2s)

---

## 9. Deployment Requirements

### 9.1 Build Process
- Successful production build
- No TypeScript errors
- No ESLint errors
- Optimized assets

### 9.2 Deployment Checklist
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] Analytics integrated (optional)
- [ ] Error tracking configured (optional)
- [ ] HTTPS enabled

---

## 10. Future Enhancements (Optional)

### Phase 2 Features
- Command auto-complete with tab
- Command aliases (e.g., 'ls' for 'help')
- Easter eggs (hidden commands)
- Visitor analytics command
- Blog integration
- Dark/light mode auto-detect from system

### Phase 3 Features
- GUI mode with smooth transition
- Interactive project demos in terminal
- Terminal-based games
- Code editor integration for live coding demos
- Real-time chat/contact form

---

## Success Criteria

### Must Have
✅ All 15 commands working  
✅ 6 themes implemented  
✅ Fully responsive design  
✅ Resume accessible  
✅ All personal information displayed  
✅ Professional visual polish  
✅ Fast load times (< 3s)  

### Should Have
✅ Mobile quick actions  
✅ Command history working  
✅ Streaming text animations  
✅ CRT effects  
✅ Accessibility compliance  

### Nice to Have
⭐ Command auto-complete  
⭐ Skip boot option  
⭐ Social media integration  
⭐ Analytics tracking  

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Status**: Final for Development