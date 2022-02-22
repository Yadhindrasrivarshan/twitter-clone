import Link from 'next/link'
import React from 'react'

const SideBarLink = ({ text, Icon, active, url }) => {
  return (
    <Link href={url}>
      <div
        className={`hoverAnimation flex items-center justify-center space-x-3 text-xl text-[#d9d9d9] xl:justify-start ${
          active && 'font-bold'
        }`}
      >
        <Icon className="h-7 text-white" />
        <span className="hidden xl:inline">{text}</span>
      </div>
    </Link>
  )
}

export default SideBarLink
