import Image from 'next/image'
import React from 'react'
import SideBarLink from './SideBarLink'
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <div className="fixed  hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start ">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        <SideBarLink text="Home" Icon={HomeIcon} active url="/" />
        <SideBarLink text="Explore" Icon={HashtagIcon} url="/explore" />
        <SideBarLink text="Notifications" Icon={BellIcon} url="/explore" />
        <SideBarLink text="Messages" Icon={InboxIcon} url="/messages" />
        <SideBarLink text="Bookmarks" Icon={BookmarkIcon} url="/bookmark" />
        <SideBarLink text="Lists" Icon={ClipboardListIcon} url="/lists" />
        <SideBarLink text="Profile" Icon={UserIcon} url="/userProfile" />
        <SideBarLink text="More" Icon={DotsCircleHorizontalIcon} url="/more" />
      </div>
      <button className="ml-auto hidden h-[52px] w-56 rounded-full bg-[#1d9bf0] text-lg font-bold text-white shadow-md hover:bg-[#1a8cd8] xl:inline">
        Tweet
      </button>
      <div
        className="hoverAnimation mt-auto flex items-center justify-center text-[#d9d9d9] xl:ml-auto xl:-mr-5"
        onClick={() => {
          router.push('/')
          signOut()
        }}
      >
        <img
          className="h-10 w-10 rounded-full xl:mr-2.5"
          src={session.user.image}
          alt="profile-img"
        />
        <div className="hidden leading-5 xl:inline">
          <h4 className="font-bold">{session.user.email}</h4>
          <p className="text-[#6e767d]">{session.user.name}</p>
        </div>
        {/* <LogoutIcon /> */}
        <DotsCircleHorizontalIcon className="ml-10 hidden h-5 xl:inline" />
      </div>
    </div>
  )
}

export default Sidebar
