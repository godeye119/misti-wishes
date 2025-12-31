# Technical Specification: Virtual Sky Lantern New Year Wishing App

## Technical Context

**Language/Framework**: React 18+ (JavaScript, Functional Components with Hooks)  
**Primary Dependencies**:
- `react`: ^18.0.0
- `react-dom`: ^18.0.0
- `@react-spring/web`: ^9.7.0 (for physics-based animations)

**Build Tool**: Vite (recommended for fast development and modern React setup)  
**Styling**: CSS Modules (`.module.css` convention)  
**Target Browsers**: Modern browsers with CSS backdrop-filter support (Chrome 76+, Safari 14+, Edge 79+, Firefox 103+)

**Project Status**: This is a greenfield implementation. No existing codebase.

---

## Technical Implementation Brief

### Key Technical Decisions

1. **Component Architecture**: Single self-contained component (`SkyLanternApp.jsx`) with all logic encapsulated. This ensures portability and ease of integration.

2. **Animation Strategy**:
   - Use `@react-spring/web`'s `useSpring` for individual floating lantern animations
   - Use `useTransition` for managing multiple user-submitted lanterns with enter/exit animations
   - Use `useSpring` with loop config for pre-existing hovering lanterns
   - Leverage spring physics parameters: `mass`, `tension`, `friction` to create natural motion

3. **State Management**:
   - `useState` for user-submitted lanterns array (max 20 items)
   - `useState` for wishes list (all submitted wishes)
   - `useState` for input value
   - `useState` for pre-existing lanterns (with fade-out timer logic)
   - No external state management needed

4. **CSS Bloom/Glow Strategy**:
   - Layer multiple `box-shadow` declarations with increasing blur radii
   - Use `filter: drop-shadow()` for additional outer glow
   - Apply warm color palette: `rgba(255, 150, 50, X)`, `rgba(255, 200, 100, X)`
   - Combine CSS `filter: brightness()` on text for inner glow effect

5. **Responsive Design**:
   - Use CSS Grid/Flexbox for main layout
   - Sidebar as fixed position on desktop, collapsible or bottom sheet on mobile
   - Media queries at 768px and 480px breakpoints
   - Use `vw`/`vh` units for lantern sizing to scale naturally

6. **Performance Optimizations**:
   - Limit active floating lanterns to 20 (enforce in state)
   - Use `will-change: transform` on animated elements
   - Cleanup lanterns from state once off-screen using animation callbacks
   - Use CSS `transform` and `opacity` for animations (GPU-accelerated)

7. **Text Sizing**:
   - Dynamically calculate font size based on text length
   - Use JavaScript to measure and adjust `fontSize` style inline
   - Min/max font size constraints (e.g., 12px - 32px)

---

## Source Code Structure

```
lantern/
├── src/
│   ├── SkyLanternApp.jsx          # Main React component
│   ├── SkyLanternApp.module.css   # All styles (bloom, glow, glassmorphism)
│   ├── main.jsx                   # React entry point (renders SkyLanternApp)
│   └── index.html                 # HTML shell
├── package.json                    # Dependencies
├── vite.config.js                 # Vite configuration
└── .gitignore                     # Ignore node_modules, dist
```

**File Descriptions**:

- **SkyLanternApp.jsx**: Contains all component logic including:
  - Initial state setup for pre-existing lanterns
  - User input handling
  - Lantern creation and animation logic
  - Wishes list management
  - react-spring animation hooks

- **SkyLanternApp.module.css**: Contains all styling:
  - `.container`: Full-screen night sky gradient background
  - `.stars`: Animated background stars/nebulae
  - `.lantern`: Base lantern styling with bloom/glow effects
  - `.hoveringLantern`: Variant for pre-existing lanterns
  - `.floatingLantern`: Variant for user-submitted lanterns
  - `.glassmorphismInput`: Frosted glass input container
  - `.sidebar`: Wishes list sidebar
  - Responsive media queries

---

## Contracts

### Data Models

**Lantern Object** (User-submitted):
```javascript
{
  id: string,           // Unique identifier (e.g., Date.now() + random)
  text: string,         // User's wish text
  createdAt: number,    // Timestamp
  x: number,            // Initial x position (center)
  y: number             // Initial y position (bottom)
}
```

**Hovering Lantern Object** (Pre-existing):
```javascript
{
  id: string,
  text: string,
  x: number,            // Random x position (within bounds)
  y: number,            // Random y position (upper half)
  opacity: number       // For fade-out animation (1 to 0)
}
```

**Wish Object** (Archived):
```javascript
{
  id: string,
  text: string,
  timestamp: number
}
```

### Component Props

**SkyLanternApp Component**:
```javascript
// No props needed - fully self-contained
export default function SkyLanternApp() { ... }
```

### CSS Module Exports

**SkyLanternApp.module.css** exports:
- `.container` - Main app container
- `.backgroundStars` - Animated star layer
- `.lantern` - Base lantern class
- `.hoveringLantern` - Pre-existing lantern modifier
- `.floatingLantern` - User-submitted lantern modifier
- `.lanternText` - Text inside lantern
- `.inputContainer` - Glassmorphism input wrapper
- `.input` - Input field
- `.sendButton` - Submit button
- `.sidebar` - Wishes list sidebar
- `.wishItem` - Individual wish in sidebar

### Animation Configurations

**Floating Lantern Spring Config**:
```javascript
{
  from: { y: window.innerHeight - 200, x: window.innerWidth / 2, opacity: 1 },
  to: { y: -200, opacity: 0 },
  config: { mass: 1, tension: 20, friction: 10 }
}
```

**Hovering Lantern Spring Config** (loop):
```javascript
{
  loop: true,
  from: { y: initialY, x: initialX },
  to: [
    { y: initialY - 20, x: initialX + 10 },
    { y: initialY, x: initialX }
  ],
  config: { mass: 2, tension: 20, friction: 30 }
}
```

---

## Delivery Phases

### Phase 1: Project Setup & Basic Structure
**Deliverable**: React project initialized with Vite, dependencies installed, basic component renders "Hello World"

**Tasks**:
- Initialize Vite React project
- Install `@react-spring/web`
- Create `SkyLanternApp.jsx` and `.module.css` files
- Set up basic component structure with full-screen container
- Render basic night sky gradient background

**Verification**: Run `npm run dev`, open browser, see gradient background filling screen

---

### Phase 2: Atmospheric Background & Stars
**Deliverable**: Night sky with animated stars/nebulae, fully responsive

**Tasks**:
- Implement deep night gradient (midnight blue → dark purple) in CSS
- Create subtle animated stars using CSS keyframe animations or react-spring
- Add faint nebula clouds (semi-transparent radial gradients)
- Test responsiveness on different screen sizes

**Verification**: Visual inspection - background should feel dynamic and atmospheric, stars should move slowly

---

### Phase 3: Pre-existing Hovering Lanterns
**Deliverable**: 5-7 lanterns with default words hovering in upper half, with glow effects and gentle animation

**Tasks**:
- Initialize state with pre-existing lantern objects at random positions
- Implement lantern bloom/glow CSS (layered box-shadows, drop-shadow filters)
- Use react-spring `useSpring` with loop to create bobbing/swaying motion
- Add fade-out logic using `useEffect` timer to gradually reduce opacity
- Ensure lanterns stay within viewport bounds

**Verification**: 
- Visual: Lanterns should glow warmly with orange/gold halo
- Animation: Should bob and sway smoothly without jerky motion
- Fade: After ~30-60 seconds, lanterns should slowly fade out

---

### Phase 4: Glassmorphism Input Interface
**Deliverable**: Frosted glass input field at bottom center with Send button

**Tasks**:
- Create glassmorphism container with CSS backdrop-filter blur
- Add input field with placeholder "What is your hope for 2026?"
- Style with translucent background, subtle border, proper spacing
- Handle Enter key and button click to submit
- Make responsive for mobile (ensure keyboard doesn't obscure input)

**Verification**:
- Visual: Input should look like frosted glass over background
- Interaction: Type text, press Enter or click Send, input should clear

---

### Phase 5: User-Submitted Lantern Creation & Float Animation
**Deliverable**: Submitting a wish creates a glowing lantern that floats upward with physics-based wobble

**Tasks**:
- On submit, create new lantern object with user text
- Add to state array (enforce max 20 limit)
- Use react-spring `useTransition` to animate lantern from bottom to top
- Apply wobble effect (oscillating x position during ascent)
- Implement dynamic text sizing based on text length
- Remove lantern from state when animation completes (off-screen)

**Verification**:
- Submit word → lantern appears at bottom center with text
- Lantern floats upward with gentle left-right wobble
- Text is readable regardless of length
- Lantern disappears at top of screen
- Submit 20+ lanterns → oldest removed to maintain limit

---

### Phase 6: Wishes List Sidebar
**Deliverable**: Sidebar showing all submitted wishes, responsive on mobile

**Tasks**:
- Create sidebar component/section in JSX
- Add wishes to list when lantern exits screen (use animation `onRest` callback)
- Style sidebar with semi-transparent background
- Display wishes in chronological order
- Make sidebar collapsible or repositioned on mobile (e.g., bottom sheet or slide-in)

**Verification**:
- Submit multiple wishes
- Each wish appears in sidebar after floating off screen
- Sidebar is accessible and doesn't block main view on mobile
- Wishes list persists during session

---

### Phase 7: Polish, Performance & Cross-Device Testing
**Deliverable**: Fully polished, performant app working on mobile, tablet, desktop

**Tasks**:
- Optimize CSS (ensure GPU acceleration with `will-change`)
- Test on multiple devices and screen sizes
- Ensure 60fps animations on target devices
- Fine-tune glow intensity, colors, spring configs
- Add any micro-interactions (hover effects on buttons, etc.)
- Cross-browser testing (Chrome, Safari, Firefox, Edge)

**Verification**:
- Performance: Animations run smoothly at 60fps with 20 lanterns
- Responsiveness: App works well on 320px (mobile) to 1920px+ (desktop)
- Visual: Glow effects render correctly across browsers
- UX: Overall experience feels calm, hopeful, and warm

---

## Verification Strategy

### Verification Tools & Commands

**Linting/Type Checking**: 
- Run `npm run lint` (if ESLint configured)
- No linter required for MVP - visual verification sufficient

**Development Server**:
- Run `npm run dev` to start Vite dev server
- Open browser to `http://localhost:5173` (or specified port)

**Build Verification**:
- Run `npm run build` to ensure production build succeeds
- Run `npm run preview` to test production build locally

### Manual Verification Checklist (Per Phase)

**Phase 1**:
- [ ] Dev server starts without errors
- [ ] Browser shows full-screen gradient background
- [ ] No console errors

**Phase 2**:
- [ ] Stars/nebulae visible and subtly animated
- [ ] Background gradient smooth and atmospheric
- [ ] Responsive on resize (use browser dev tools)

**Phase 3**:
- [ ] 5-7 lanterns appear on load in upper half
- [ ] Lanterns have visible warm glow (orange/gold halo)
- [ ] Lanterns bob and sway smoothly
- [ ] Lanterns fade out after ~60 seconds
- [ ] No lanterns leave viewport bounds during hover

**Phase 4**:
- [ ] Input visible at bottom center
- [ ] Glassmorphism effect visible (frosted blur)
- [ ] Type text and press Enter → input clears
- [ ] Click Send button → input clears
- [ ] On mobile: input is accessible and keyboard doesn't hide it

**Phase 5**:
- [ ] Type wish, submit → lantern appears at bottom
- [ ] Lantern displays text clearly
- [ ] Lantern floats upward with wobble (not straight line)
- [ ] Try short word (e.g., "Joy") → text is large
- [ ] Try long phrase (e.g., "May all my dreams come true") → text auto-sizes to fit
- [ ] Lantern disappears at top of screen
- [ ] Submit 25 lanterns rapidly → only 20 active at once

**Phase 6**:
- [ ] Submit wish → after lantern exits, wish appears in sidebar
- [ ] Multiple wishes appear in order
- [ ] Sidebar doesn't block main view
- [ ] On mobile: sidebar is accessible (slide-in or visible)

**Phase 7**:
- [ ] Open Chrome DevTools Performance tab, record, verify 60fps
- [ ] Test on physical mobile device (if available)
- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Resize browser window → layout adapts smoothly
- [ ] Overall UX feels polished and intentional

### Helper Scripts

**Performance Test Script** (`test-performance.html`):
Create a simple HTML page that loads the app and uses Performance API to log FPS:

```html
<!DOCTYPE html>
<html>
<head><title>Lantern Performance Test</title></head>
<body>
  <div id="root"></div>
  <div id="fps" style="position:fixed;top:10px;right:10px;color:white;background:rgba(0,0,0,0.5);padding:10px;"></div>
  <script type="module" src="/src/main.jsx"></script>
  <script>
    let lastTime = performance.now();
    let frames = 0;
    function measureFPS() {
      frames++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime));
        document.getElementById('fps').textContent = `FPS: ${fps}`;
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(measureFPS);
    }
    measureFPS();
  </script>
</body>
</html>
```

**Usage**: Open this file in browser, submit 20 lanterns, check FPS counter stays near 60.

### MCP Servers

No additional MCP servers required for this project. All verification can be done via:
- Visual inspection in browser
- Browser DevTools (Performance, Responsive Design Mode)
- Manual interaction testing

### Sample Input Artifacts

**Test Wishes** (for verification):
1. Short words: "Hope", "Joy", "Love", "Peace"
2. Medium phrases: "Health and happiness", "New beginnings"
3. Long phrases: "May all my dreams come true this year"
4. Edge cases: Single letter "A", Very long "Supercalifragilisticexpialidocious"

**Responsive Testing Dimensions**:
- Mobile: 375x667 (iPhone SE), 360x740 (Android)
- Tablet: 768x1024 (iPad), 820x1180 (iPad Air)
- Desktop: 1920x1080, 2560x1440

These can be tested using browser DevTools → Responsive Design Mode. No external artifacts needed - agent can generate all test inputs.

---

## Success Metrics

- **Visual Quality**: Warm glow effect clearly visible on lanterns, glassmorphism effect renders properly
- **Animation Smoothness**: 60fps maintained with up to 20 active lanterns
- **Responsiveness**: Functional and visually appealing on 320px to 2560px+ widths
- **Physics Realism**: Floating motion feels natural, not mechanical (visible wobble, non-linear easing)
- **User Experience**: Input → lantern creation → float → sidebar flow works seamlessly
- **Code Quality**: Clean, readable component code; well-organized CSS module
