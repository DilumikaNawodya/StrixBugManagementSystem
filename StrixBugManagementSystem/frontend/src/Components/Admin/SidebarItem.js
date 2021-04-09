import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

export const SidebarItem = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'External Users',
    path: '/externalusers',
    icon: <AiIcons.AiOutlineUserAdd/>,
    cName: 'nav-text'
  },
  {
    title: 'Internal Users',
    path: '/internalusers',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
  },
  {
    title: 'Blocked Users',
    path: '/blockedusers',
    icon: <BiIcons.BiUserX />,
    cName: 'nav-text'
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <FaIcons.FaRegEdit />,
    cName: 'nav-text'
  },
  {
    title: 'Access Control',
    path: '/permissions',
    icon: <AiIcons.AiOutlinePartition />,
    cName: 'nav-text'
  }
]

export const SidebarItemDrop = []

// Below array represents the items Admin sidebar home

export const AdminHomeSideBar = []