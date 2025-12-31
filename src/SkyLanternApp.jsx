import React, { useMemo, useState, useEffect } from 'react'
import { animated, useTransition } from '@react-spring/web'
import styles from './SkyLanternApp.module.css'

// Import Poppins font for background wish text
const poppinsFontLink = document.createElement('link');
poppinsFontLink.rel = 'stylesheet';
poppinsFontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
if (!document.head.querySelector('link[href*="fonts.googleapis.com/css2?family=Poppins"]')) {
  document.head.appendChild(poppinsFontLink);
}

const calculateFontSize = (text) => {
  const length = text.length
  if (length <= 5) return 32
  if (length <= 10) return 28
  if (length <= 20) return 22
  if (length <= 30) return 18
  if (length <= 40) return 16
  return 12
}

function isMobile() {
  return window.innerWidth <= 768
}

export default function SkyLanternApp() {
  // Smooth reload animation state
  const [visible, setVisible] = useState(true)

  // Listen for reload (F5 or Ctrl+R or programmatic)
  useEffect(() => {
    const beforeUnload = (e) => {
      setVisible(false)
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [])
  const stars = useMemo(() => {
    const starArray = []
    const starCount = 200
    const starSizes = ['starSmall', 'starMedium', 'starLarge']
    
    for (let i = 0; i < starCount; i++) {
      const sizeClass = starSizes[Math.floor(Math.random() * starSizes.length)]
      const top = Math.random() * 100
      const left = Math.random() * 100
      const delay = Math.random() * 4
      
      starArray.push({
        id: i,
        sizeClass,
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`
      })
    }
    
    return starArray
  }, [])

  const [inputValue, setInputValue] = useState('')
  const [floatingLanterns, setFloatingLanterns] = useState([])
  const [wishes, setWishes] = useState([])
  const [showWishesMobile, setShowWishesMobile] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      const newLantern = {
        id: `${Date.now()}-${Math.random()}`,
        text: inputValue.trim(),
        createdAt: Date.now(),
        x: window.innerWidth / 2,
        y: window.innerHeight - 200
      }
      
      setFloatingLanterns(current => {
        const updated = [...current, newLantern]
        if (updated.length > 20) {
          return updated.slice(-20)
        }
        return updated
      })
      
      setInputValue('')
    }
  }

  const floatingTransitions = useTransition(floatingLanterns, {
    keys: (item) => item.id,
    from: (item) => ({ 
      progress: 0,
      opacity: 1 
    }),
    enter: (item) => ({
      progress: 1,
      opacity: 0,
      config: { duration: 12000 }
    }),
    leave: { opacity: 0 },
    onRest: (result, spring, item) => {
      if (result.finished) {
        setWishes(current => [
          { id: item.id, text: item.text, timestamp: Date.now() },
          ...current
        ])
        
        setFloatingLanterns(current => 
          current.filter(lantern => lantern.id !== item.id)
        )
      }
    }
  })

  // Smooth fade on mount
  useEffect(() => {
    setVisible(false)
    setTimeout(() => setVisible(true), 30)
  }, [])

  return (
    <div className={styles.container} style={{
      opacity: visible ? 1 : 0,
      transition: 'opacity 1.2s cubic-bezier(.4,0,.2,1)'
    }}>
      {/* Loving, fulfilling background text */}
      <div className={styles.backgroundWishText}>
        <span className={styles.backgroundWishTextMain}>
          Make your wish and let it rise<br />may your hopes light up the sky and your dreams come true Misti❤️
        </span>
      </div>
      <div className={`${styles.nebula} ${styles.nebula1}`}></div>
      <div className={`${styles.nebula} ${styles.nebula2}`}></div>
      <div className={`${styles.nebula} ${styles.nebula3}`}></div>
      
      <div className={styles.backgroundStars}>
        {stars.map(star => (
          <div
            key={star.id}
            className={`${styles.star} ${styles[star.sizeClass]}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay
            }}
          />
        ))}
      </div>

      {floatingTransitions((style, item) => (
        <animated.div
          className={`${styles.lantern} ${styles.floatingLantern}`}
          style={{
            left: item.x,
            top: 0,
            transform: style.progress.to((p) => {
              const startY = item.y
              const endY = -200
              const y = startY + (endY - startY) * p
              // Smooth sinusoidal horizontal drift
              const x = Math.sin(p * Math.PI * 3) * 30 * (1 - p * 0.5)
              return `translate(${x}px, ${y}px)`
            }),
            opacity: style.opacity.to((o) => {
              // Keep full opacity until 70% of the journey, then fade out
              return o < 0.3 ? o / 0.3 : 1
            })
          }}
        >
          <div 
            className={styles.lanternText}
            style={{ fontSize: `${calculateFontSize(item.text)}px` }}
          >
            {item.text}
          </div>
        </animated.div>
      ))}

      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.input}
            placeholder="What is your hope for 2026?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>

      {/* Wishes sidebar for desktop, tooltip for mobile */}
      {wishes.length > 0 && (
        <>
          {/* Mobile: Tooltip button */}
          <div
            className={styles.wishesTooltip}
            style={{ display: isMobile() ? 'block' : 'none', top: 18, bottom: 'unset' }}
            onClick={() => setShowWishesMobile(true)}
          >
            <span className={styles.wishesIcon} role="img" aria-label="wishes">💫</span> Your Wishes
          </div>
          {/* Mobile: Modal wishes */}
          {isMobile() && showWishesMobile && (
            <div className={styles.mobileWishesModal} onClick={() => setShowWishesMobile(false)}>
              <div className={styles.sidebar} onClick={e => e.stopPropagation()}>
                <h3 className={styles.sidebarTitle}>Your Wishes</h3>
                <div className={styles.wishList}>
                  {wishes.map((wish) => (
                    <div key={wish.id} className={styles.wishItem}>
                      {wish.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Desktop: Sidebar */}
          {!isMobile() && (
            <div className={styles.sidebar}>
              <h3 className={styles.sidebarTitle}>Your Wishes</h3>
              <div className={styles.wishList}>
                {wishes.map((wish) => (
                  <div key={wish.id} className={styles.wishItem}>
                    {wish.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
