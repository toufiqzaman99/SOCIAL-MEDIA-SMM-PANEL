interface IconProps {
  className?: string
}

/** Alipay brand mark — demo placeholder icon (no real gateway connected). */
export default function AlipayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="alipay-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B9BF7" />
          <stop offset="1" stopColor="#1677FF" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#alipay-bg)" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="'PingFang SC', 'Microsoft YaHei', sans-serif"
      >
        支
      </text>
    </svg>
  )
}
