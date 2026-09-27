interface IconProps {
  className?: string
}

/** WeChat Pay brand mark — demo placeholder icon (no real gateway connected). */
export default function WechatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="wechat-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2BD470" />
          <stop offset="1" stopColor="#07C160" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#wechat-bg)" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="'PingFang SC', 'Microsoft YaHei', sans-serif"
      >
        微
      </text>
    </svg>
  )
}
