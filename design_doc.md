# Terminal Portfolio - Design Specification Document

## Design Philosophy
Create a nostalgic yet modern terminal experience that balances retro aesthetics with contemporary web design principles. The design should be immersive, professional, and memorable.

---

## 1. Visual Design System

### 1.1 Color Themes

#### Theme 1: Dark (Default)
```css
Primary Background:   #0a0e27  (Deep Navy Blue)
Foreground Text:      #00ff41  (Matrix Green)
Accent Color:         #00d9ff  (Cyan)
Secondary Background: #1a1f3a  (Dark Blue-Gray)
```
**Usage**: Default theme, high contrast, professional hacker aesthetic

#### Theme 2: Light
```css
Primary Background:   #f5f5f5  (Off-White)
Foreground Text:      #2d3748  (Dark Gray)
Accent Color:         #3182ce  (Blue)
Secondary Background: #e2e8f0  (Light Gray)
```
**Usage**: Accessibility, readability in bright environments

#### Theme 3: Blue Matrix
```css
Primary Background:   #0d1b2a  (Dark Blue)
Foreground Text:      #00d9ff  (Cyan)
Accent Color:         #00ff41  (Green)
Secondary Background: #1b263b  (Navy)
```
**Usage**: Cyberpunk aesthetic, high tech feel

#### Theme 4: Espresso
```css
Primary Background:   #2b1d0e  (Dark Brown)
Foreground Text:      #e4c07a  (Light Brown/Gold)
Accent Color:         #d4976c  (Tan)
Secondary Background: #3d2817  (Medium Brown)
```
**Usage**: Warm, comfortable, coffee shop coding vibes

#### Theme 5: Green Goblin
```css
Primary Background:   #0f2027  (Dark Teal)
Foreground Text:      #39ff14  (Neon Green)
Accent Color:         #7fff00  (Chartreuse)
Secondary Background: #1a3a3a  (Dark Green-Gray)
```
**Usage**: High energy, neon aesthetic, hacker culture

#### Theme 6: Ubuntu
```css
Primary Background:   #300a24  (Ubuntu Purple)
Foreground Text:      #ffffff  (White)
Accent Color:         #e95420  (Ubuntu Orange)
Secondary Background: #5e2750  (Deep Purple)
```
**Usage**: Linux enthusiast appeal, recognizable brand

### 1.2 Typography

#### Font Hierarchy
```
Primary Font:    'JetBrains Mono' (Monospace)
Fallback Font:   'Fira Code' (Monospace)
System Fallback: 'Courier New', monospace

Font Weights:
- Regular: 400 (body text, commands)
- Medium:  500 (emphasis)
- SemiBold: 600 (headings)
- Bold:    700 (strong emphasis)
```

#### Font Sizes (Desktop)
```
Headings (h1):    2.5rem (40px)
Headings (h2):    2rem (32px)
Headings (h3):    1.5rem (24px)
Body Text:        1rem (16px)
Small Text:       0.875rem (14px)
Tiny Text:        0.75rem (12px)
```

#### Font Sizes (Mobile)
```
Headings (h1):    2rem (32px)
Headings (h2):    1.5rem (24px)
Headings (h3):    1.25rem (20px)
Body Text:        0.875rem (14px)
Small Text:       0.75rem (12px)
Tiny Text:        0.625rem (10px)
```

#### Line Height
```
Headings:  1.2
Body:      1.6
Code:      1.5
```

### 1.3 Spacing System (8px base unit)

```
xs:   0.25rem (4px)
sm:   0.5rem (8px)
md:   1rem (16px)
lg:   1.5rem (24px)
xl:   2rem (32px)
2xl:  3rem (48px)
3xl:  4rem (64px)
```

### 1.4 Border Radius
```
Small:  0.25rem (4px)  - Buttons, tags
Medium: 0.5rem (8px)   - Cards, inputs
Large:  0.75rem (12px) - Terminal window
```

### 1.5 Shadows
```
Terminal Window:
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 100px rgba(0, 255, 65, 0.1);

Cards:
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

Hover State:
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
```

---

## 2. Component Design Specifications

### 2.1 Terminal Window

#### Desktop Layout
```
┌─────────────────────────────────────────────┐
│ ⚫ 🟡 🟢  portfolio@terminal ~ zsh           │ ← Header (48px height)
├─────────────────────────────────────────────┤
│                                             │
│  > help                                     │ ← Output area
│  Available commands:                        │   (calc(100vh - 250px))
│  ...                                        │
│                                             │
│  guest@portfolio:~$ _                       │ ← Input line
│                                             │
└─────────────────────────────────────────────┘
  ↑                                         ↑
  24px padding                          24px padding
```

#### Specifications
- **Width**: max-width: 1400px, centered
- **Height**: Dynamic, min-height: 600px
- **Padding**: 24px (desktop), 16px (mobile)
- **Background**: Glassmorphism effect
  - `backdrop-blur-md`
  - Semi-transparent gradient overlay
  - Border: 1px solid with 20% opacity of foreground color

#### Header Design
- **Height**: 48px
- **Elements**: 
  - Traffic lights (⚫🟡🟢) - 12px circles, 8px gap
  - Terminal icon + title - 16px icon
- **Border**: Bottom border with 20% opacity

### 2.2 ASCII Banner

#### Specifications
```
Dimensions:     61 characters wide x 13 lines tall
Font Size:      12px (desktop), 10px (mobile)
Alignment:      Center
Animation:      Character-by-character reveal
Speed:          1ms per character (very fast)
Margin Bottom:  32px
```

#### Design Pattern
```
╔═══════════════════════════════════════════════════════════╗
║                    [YOUR NAME/BRAND]                      ║
║                    [TAGLINE/VERSION]                      ║
╚═══════════════════════════════════════════════════════════╝

System Booting...
```

### 2.3 Command Prompt

#### Design
```
guest@portfolio:~$ █
↑               ↑  ↑
User           Path Cursor
```

#### Specifications
- **Prompt Color**: 70% opacity of foreground
- **Input Color**: 100% foreground color
- **Cursor**: Blinking block, 1s interval
- **Arrow Icon**: ChevronRight from Lucide (accent color)
- **Spacing**: 8px gap between elements

### 2.4 Command Output

#### Layout Variations

**Text Output**:
```
> command
Output text here with streaming animation...
```

**Card Grid** (Projects, Skills):
```
> projects

Featured Projects
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Project │ │ Project │ │ Project │
│   #1    │ │   #2    │ │   #3    │
└─────────┘ └─────────┘ └─────────┘
```

**List Format** (Experience, Education):
```
> experience

Company Name | Role | Duration
• Achievement 1
• Achievement 2
```

### 2.5 Project Cards

#### Desktop Card Design (400px width)
```
┌────────────────────────────────────┐
│                                    │
│         [Project Image]            │ ← 16:9 aspect ratio
│                                    │
├────────────────────────────────────┤
│ Project Title                      │ ← 24px bold
│ Brief description of project...    │ ← 14px, 3 lines max
│                                    │
│ [tag] [tag] [tag]                  │ ← Tech stack tags
│                                    │
│ [GitHub] [Demo]                    │ ← Action links
└────────────────────────────────────┘
```

#### Specifications
- **Border**: 1px solid, current color
- **Border Radius**: 12px
- **Padding**: 16px
- **Hover Effect**: 
  - Scale: 1.05
  - Transition: 300ms ease
  - Shadow increase
- **Image**: 
  - Aspect ratio: 16:9
  - Object-fit: cover
  - Background: 10% opacity of foreground if no image

#### Tags Design
- **Padding**: 4px 12px
- **Border**: 1px solid, 70% opacity
- **Border Radius**: 4px
- **Font Size**: 12px
- **Spacing**: 8px gap

#### Links
- **Icons**: 16px Lucide icons
- **Hover**: Underline
- **Color**: Inherit from theme
- **Spacing**: 12px gap between links

### 2.6 PDF Viewer

#### Layout
```
┌────────────────────────────────────────────┐
│ 📄 resume.pdf                   [Download] │ ← Header
├────────────────────────────────────────────┤
│                                            │
│              [PDF Preview]                 │ ← Preview area
│              (Google-style)                │   600px min-height
│                                            │
└────────────────────────────────────────────┘
```

#### Specifications
- **Max Width**: 800px
- **Background**: White (for PDF contrast)
- **Text Color**: Black (for readability)
- **Border**: Same as cards
- **Download Button**: 
  - Border style
  - Hover: Background with 20% opacity

### 2.7 Help Command Table

#### Design
```
COMMAND           DESCRIPTION
help              Display all available commands
about             Learn more about me
education         View educational background
...
```

#### Specifications
- **Column 1 (Command)**: 
  - Min-width: 200px
  - Bold weight
  - 100% foreground color
- **Column 2 (Description)**:
  - Flex grow
  - 70% opacity
  - Regular weight
- **Row Spacing**: 8px gap
- **Heading**: 
  - 20px bottom margin
  - Normal weight

### 2.8 Neofetch Display

#### Layout (Desktop)
```
┌───────────────────────┬───────────────────────┐
│ yourusername@portfolio│ Tech Stack            │
│ ───────────────────── │ ──────────────────────│
│ OS: Platform          │ React / Next.js       │
│ Browser: Chrome       │ TypeScript            │
│ Resolution: 1920x1080 │ Tailwind CSS          │
│ Language: en-US       │ ...                   │
└───────────────────────┴───────────────────────┘
```

#### Specifications
- **Grid**: 2 columns on desktop, 1 on mobile
- **Gap**: 48px (desktop), 24px (mobile)
- **Divider**: 1px line, 30% opacity
- **Icon Size**: 16px (emoji or Lucide)
- **Label**: Bold
- **Value**: Regular, 90% opacity

### 2.9 Theme Selector

#### Layout
```
Available Themes:
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Dark     │ │ Light    │ │ Matrix   │
│ ●●●      │ │ ●●●      │ │ ●●●      │
└──────────┘ └──────────┘ └──────────┘
     ↑ Selected (highlighted)
```

#### Card Specifications
- **Size**: 150px width, auto height
- **Padding**: 16px
- **Border**: 1px solid
- **Selected State**: Background with 20% opacity
- **Hover**: Scale 1.05
- **Color Dots**: 16px circles showing theme colors
- **Grid**: 3 columns (desktop), 2 (tablet), 1 (mobile)

### 2.10 Mobile Quick Actions Bar

#### Layout
```
┌──────────┬──────────┬──────────┐
│   Help   │ Projects │  Contact │
└──────────┴──────────┴──────────┘
```

#### Specifications
- **Position**: Below terminal window
- **Margin Top**: 16px
- **Grid**: 3 equal columns
- **Gap**: 8px
- **Button**:
  - Padding: 12px
  - Border: 1px solid
  - Border Radius**: 8px
  - Font Size: 14px
  - Monospace font

---

## 3. Animation Specifications

### 3.1 Streaming Text Effect

```javascript
Animation: Character-by-character reveal
Speed: 20ms per character (default)
Easing: Linear
Usage: All command outputs
```

### 3.2 Boot Sequence

```
1. ASCII Banner appears (fast stream, 1ms/char)
2. "System Booting..." appears
3. 500ms delay
4. Fade to terminal interface (300ms)
```

### 3.3 Command Execution

```
1. User presses Enter
2. 100ms delay
3. Output begins streaming
4. Cursor returns to input
```

### 3.4 Theme Transition

```
Duration: 300ms
Easing: ease-in-out
Properties: background-color, color, border-color
```

### 3.5 Hover Effects

```
Cards/Buttons:
  Transform: scale(1.05)
  Duration: 300ms
  Easing: ease-out

Links:
  Transform: translateX(8px)
  Duration: 200ms
  Easing: ease-out
```

### 3.6 CRT Scanline Effect

```css
Animation: Continuous vertical movement
Speed: 8s linear infinite
Pattern: Repeating 4px lines
Opacity: 10% maximum
```

---

## 4. Visual Effects

### 4.1 Glassmorphism

```css
.terminal-window {
  backdrop-filter: blur(16px);
  background: linear-gradient(
    135deg,
    [secondary-color]99 0%,
    [background-color]cc 100%
  );
  border: 1px solid [foreground-color]33;
}
```

### 4.2 Text Glow (Optional)

```css
.glow-text {
  text-shadow: 
    0 0 10px [foreground-color],
    0 0 20px [foreground-color];
}
```

### 4.3 Scanline Overlay

```css
.scanline {
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  animation: scan 8s linear infinite;
}
```

### 4.4 Cursor Blink

```css
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.cursor {
  animation: blink 1s infinite;
}
```

---

## 5. Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  - Single column layouts
  - Quick action bar visible
  - Reduced font sizes
  - Reduced padding
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  - 2-column project grid
  - Medium padding
  - Standard font sizes
}

/* Desktop */
@media (min-width: 1024px) {
  - 3-column project grid
  - Full terminal experience
  - Larger padding
  - Optimal font sizes
}

/* Large Desktop */
@media (min-width: 1440px) {
  - Max-width: 1400px
  - Centered layout
  - Enhanced shadows
}
```

---

## 6. Accessibility Design

### 6.1 Color Contrast Ratios
- **Normal Text**: Minimum 4.5:1
- **Large Text**: Minimum 3:1
- **UI Elements**: Minimum 3:1

### 6.2 Focus Indicators
```css
*:focus {
  outline: 2px solid [accent-color];
  outline-offset: 2px;
}
```

### 6.3 Interactive Element Sizes
- **Minimum Touch Target**: 44x44px (mobile)
- **Minimum Click Target**: 32x32px (desktop)

---

## 7. Loading States

### 7.1 Boot Screen
- Full screen
- Centered content
- Background matches theme
- Streaming animation

### 7.2 Command Processing
- Input disabled
- Subtle loading indicator (optional)
- 300ms artificial delay for better UX

---

## 8. Error States

### 8.1 Command Not Found
```
> invalidcommand
Command not found: invalidcommand
Type 'help' for available commands.
```

**Styling**:
- Red color variant (theme-appropriate)
- Normal font weight
- Helpful suggestion included

### 8.2 Network Errors (PDF loading)
```
⚠️ Failed to load resume
Please try again or download directly.
```

---

## 9. Micro-interactions

### 9.1 Input Field
- Focus: Subtle glow
- Typing: Cursor visible
- Disabled: 50% opacity

### 9.2 Buttons
- Hover: Background tint + scale
- Active: Slight scale down
- Transition: 200ms ease

### 9.3 Links
- Hover: Underline + color shift
- Icon movement: 8px translateX
- Transition: 200ms ease

---

## 10. Design Assets Checklist

### Required Graphics
- [ ] ASCII art banner (custom)
- [ ] Project screenshots (3-6 images)
- [ ] Favicon (16x16, 32x32, 192x192)
- [ ] Open Graph image (1200x630)
- [ ] Resume PDF

### Image Specifications
```
Project Images:
  - Format: JPG or PNG
  - Dimensions: 1200x800px
  - Size: < 200KB
  - Aspect Ratio: 3:2 or 16:9

Favicon:
  - Format: PNG + ICO
  - Sizes: 16x16, 32x32, 192x192
  - Background: Transparent or theme color

OG Image:
  - Format: PNG or JPG
  - Dimensions: 1200x630px
  - Size: < 300KB
```

---

**Document Version**: 1.7 
**Last Updated**: 6th March 2026  
**Status**: Final for Development