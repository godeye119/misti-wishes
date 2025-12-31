# Feature Specification: Virtual Sky Lantern New Year Wishing App

## User Stories

### User Story 1 - Submit a New Year Wish

**As a** user visiting the app,  
**I want to** type a wish or hopeful word and watch it transform into a glowing lantern that floats into the night sky,  
**So that** I can experience a calming, hopeful ritual for the New Year.

**Acceptance Scenarios**:

1. **Given** I am on the Sky Lantern app, **When** I type a word in the input field and press Enter, **Then** a new glowing lantern appears at the bottom center with my word visible inside, and begins floating upward with physics-based wobbling motion.
2. **Given** a lantern is floating upward, **When** it reaches the top of the screen, **Then** it disappears from view and appears in the wishes list sidebar.
3. **Given** I type a very long word or phrase, **When** I submit it, **Then** the text automatically resizes to fit inside the lantern while remaining readable.

### User Story 2 - Experience a Living Night Sky

**As a** user visiting the app,  
**I want to** see an atmospheric night sky with pre-existing lanterns gently hovering,  
**So that** I feel immersed in a warm, hopeful environment rather than an empty void.

**Acceptance Scenarios**:

1. **Given** I open the app for the first time, **When** the page loads, **Then** I see 5-7 pre-existing lanterns scattered in the upper half with wholesome words (Hope, Joy, Health, Love, Peace) gently bobbing and swaying.
2. **Given** pre-existing lanterns have been visible for a while, **When** time passes, **Then** they slowly fade out and eventually disappear from the sky.
3. **Given** the app is running, **When** I observe the background, **Then** I see subtle slow-moving stars or faint nebula clouds creating a dynamic atmosphere.

### User Story 3 - View My Submitted Wishes

**As a** user who has submitted wishes,  
**I want to** see a list of all the wishes I've sent into the sky,  
**So that** I can reflect on my hopes and see a record of what I've wished for.

**Acceptance Scenarios**:

1. **Given** I have submitted lanterns that have floated off screen, **When** I look at the wishes list sidebar, **Then** I see all my submitted wishes displayed in order.
2. **Given** the wishes list sidebar exists, **When** I'm using a mobile device, **Then** the sidebar is accessible and doesn't obstruct the main lantern experience.

### User Story 4 - Use the App on Any Device

**As a** mobile or desktop user,  
**I want to** interact with the Sky Lantern app seamlessly on any screen size,  
**So that** I can experience the feature regardless of my device.

**Acceptance Scenarios**:

1. **Given** I open the app on a mobile phone, **When** the page renders, **Then** the glassmorphism input, lanterns, and wishes sidebar are properly sized and positioned for touch interaction.
2. **Given** I am on a desktop browser, **When** I resize the window, **Then** the sky, lanterns, and UI elements adapt responsively without breaking the layout.

---

## Requirements

### Functional Requirements

**FR1 - Input & Submission**
- FR1.1: Provide a glassmorphism-styled input field at the bottom center with placeholder text "What is your hope for 2026?"
- FR1.2: Accept text input of any length (single word or phrase)
- FR1.3: Submit wish on Enter key or Send button click
- FR1.4: Clear input field immediately after submission
- FR1.5: Auto-resize text dynamically to fit inside lantern while maintaining readability

**FR2 - Lantern Creation & Animation**
- FR2.1: Create a new lantern at the bottom center when user submits a wish
- FR2.2: Display the user's text clearly inside the lantern with warm glow effect
- FR2.3: Animate lantern upward using react-spring with physics parameters (mass, tension, friction)
- FR2.4: Apply gentle wobbling motion (left-right sway) as lantern rises to simulate thermal breeze
- FR2.5: Remove lantern from view when it exits the top of the screen
- FR2.6: Limit total active lanterns to 20 maximum for performance

**FR3 - Pre-existing Lanterns**
- FR3.1: Initialize sky with 5-7 pre-existing lanterns at different heights in upper half
- FR3.2: Display wholesome default words (Hope, Joy, Health, Love, Peace, Dream, Unity)
- FR3.3: Animate pre-existing lanterns with gentle hover (slow up-down bob and side-to-side sway)
- FR3.4: Keep pre-existing lanterns within screen bounds (never leave viewport)
- FR3.5: Slowly fade out pre-existing lanterns over time until they disappear

**FR4 - Wishes List Sidebar**
- FR4.1: Provide a visible sidebar to display all submitted wishes
- FR4.2: Add wishes to the list when they float off the top of the screen
- FR4.3: Display wishes in chronological order (newest first or oldest first)
- FR4.4: Ensure sidebar is accessible on both mobile and desktop

**FR5 - Atmospheric Background**
- FR5.1: Display a full-screen deep night sky gradient (midnight blue to dark purple)
- FR5.2: Add subtle slow-moving distant stars or faint nebula clouds for dynamic atmosphere
- FR5.3: Ensure background elements do not distract from lanterns

### Non-Functional Requirements

**NFR1 - Visual Aesthetics**
- NFR1.1: Lanterns must have warm, incandescent appearance using oranges, soft golds, and warm yellows
- NFR1.2: Implement "bloom" glow effect using layered box-shadows and drop-shadow filters with high blur radii
- NFR1.3: Text inside lanterns should appear to emit light
- NFR1.4: Glassmorphism input must use backdrop-filter: blur(10px), translucent background, and subtle border
- NFR1.5: Overall design should evoke calm, hope, and warmth

**NFR2 - Performance**
- NFR2.1: Limit active animated lanterns to 20 to maintain smooth frame rates
- NFR2.2: Ensure animations run at 60fps on modern devices
- NFR2.3: Optimize CSS animations and react-spring configurations for smoothness

**NFR3 - Responsiveness**
- NFR3.1: App must be fully responsive and functional on mobile, tablet, and desktop
- NFR3.2: Touch interactions must work seamlessly on mobile devices
- NFR3.3: Layout must adapt gracefully to different screen sizes and orientations

**NFR4 - Styling Architecture**
- NFR4.1: Use CSS Modules exclusively (filename: SkyLanternApp.module.css)
- NFR4.2: Ensure scoped styling for bloom and glow effects using pure CSS
- NFR4.3: Maintain clean, organized CSS class structure

### Technical Requirements

**TR1 - Technology Stack**
- TR1.1: Framework: React (Functional Components with Hooks)
- TR1.2: Animation Library: react-spring (useSpring, useTransition hooks)
- TR1.3: Styling: CSS Modules strictly
- TR1.4: No additional state management libraries (use React useState/useEffect)

**TR2 - Component Architecture**
- TR2.1: Deliver SkyLanternApp.jsx as the main React component
- TR2.2: Deliver SkyLanternApp.module.css for all styling
- TR2.3: Component should be self-contained and ready to run

---

## Success Criteria

**SC1**: When a user types a wish and presses Enter, a glowing lantern appears at the bottom with the text clearly visible and floats upward with natural wobbling motion.

**SC2**: The lantern animation uses react-spring physics (not linear easing) and creates a warm, airy, non-mechanical floating experience.

**SC3**: The night sky background features a deep gradient with subtle animated elements (stars or nebulae) that enhance atmosphere without distraction.

**SC4**: Pre-existing lanterns gently hover in the upper half of the screen, bobbing and swaying naturally, and slowly fade out over time.

**SC5**: The glassmorphism input field at the bottom looks like frosted glass with backdrop blur, translucent background, and subtle border.

**SC6**: Lanterns exhibit a strong warm "bloom" glow effect using CSS box-shadows and filters with oranges, golds, and yellows.

**SC7**: Text inside lanterns automatically resizes to fit regardless of word length or phrase while remaining readable.

**SC8**: After a lantern floats off the top of the screen, it appears in a visible wishes list sidebar.

**SC9**: The app limits active lanterns to a maximum of 20 for performance stability.

**SC10**: The app is fully responsive and functional on mobile, tablet, and desktop devices with appropriate touch and click interactions.

**SC11**: The overall experience evokes feelings of calm, hope, and warmth, suitable for a New Year reflection ritual.
