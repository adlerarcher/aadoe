import { asset } from './basePath.js'
/** Site mark with pulsing glow behind transparent sky in logo.png */
export default function BrandLogo({ variant = 'nav', className = '', alt = '' }) {
  const sizeClass = {
    nav: 'brand-logo--nav',
    hero: 'brand-logo--hero',
    splash: 'brand-logo--splash',
  }[variant] || 'brand-logo--nav'

  const dimensions = {
    nav: { width: 40, height: 40 },
    hero: { width: 120, height: 120 },
    splash: { width: 168, height: 168 },
  }[variant] || { width: 40, height: 40 }

  const animated = variant === 'hero' || variant === 'splash'

  return (
    <span className={`brand-logo ${sizeClass}${animated ? ' brand-logo--animated' : ''}${className ? ` ${className}` : ''}`.trim()} aria-hidden={alt ? undefined : true}>
      {animated && (
        <>
          <span className="brand-logo-glow" aria-hidden="true" />
          <span className="brand-logo-glow brand-logo-glow--outer" aria-hidden="true" />
        </>
      )}
      <img
        src={asset('logo.png')}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className="brand-logo-mark"
        decoding="async"
      />
    </span>
  )
}
