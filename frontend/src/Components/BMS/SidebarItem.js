import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export const SidebarItem = [
  {
    title: "Dashboard",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Issue Backlog",
    path: "/issuebacklogbms",
    icon: <BsIcons.BsTable />,
    cName: "nav-text",
  },
  {
    title: "Sprint Backlog",
    path: "/sprintbacklog",
    icon: <FaIcons.FaRev />,
    cName: "nav-text",
  },
];


export const SidebarItemManager = [
  {
      title: 'Dashboard',
      path: '/home',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
  },
  {
      title: 'Issue Backlog',
      path: '/issuebacklogbms',
      icon: <BsIcons.BsTable />,
      cName: 'nav-text'
  },
  {
      title: 'Approved level tickets',
      path: '/bspapproval',
      icon: <BsIcons.BsCheckBox/>,
      cName: 'nav-text'
  },
  {
      title: 'Bug Solution Pool',
      path: '/bsp',
      icon: <BsIcons.BsBookmarksFill/>,
      cName: 'nav-text'
  },
  {
    title: "Sprint Backlog",
    path: "/sprintbacklog",
    icon: <FaIcons.FaRev />,
    cName: "nav-text",
  },
]

export const SidebarItemDeveloper = [
  {
      title: 'Dashboard',
      path: '/home',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
  },
  {
      title: 'Issue Backlog',
      path: '/issuebacklogbms',
      icon: <BsIcons.BsTable />,
      cName: 'nav-text'
  },
  {
      title: 'Bug Solution Pool',
      path: '/bsp',
      icon: <BsIcons.BsBookmarksFill/>,
      cName: 'nav-text'
  },
  {
    title: "Sprint Backlog",
    path: "/sprintbacklog",
    icon: <FaIcons.FaRev />,
    cName: "nav-text",
  },
]

export const SidebarItemQA = [
  {
      title: 'Dashboard',
      path: '/home',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
  },
  {
      title: 'Issue Backlog',
      path: '/issuebacklogbms',
      icon: <BsIcons.BsTable />,
      cName: 'nav-text'
  },
  {
      title: 'Bug Solution Pool',
      path: '/bsp',
      icon: <BsIcons.BsBookmarksFill/>,
      cName: 'nav-text'
  },
  {
    title: "Sprint Backlog",
    path: "/sprintbacklog",
    icon: <FaIcons.FaRev />,
    cName: "nav-text",
  },
]


export const SidebarItemDropManager = []
export const SidebarItemDropDeveloper = []
export const SidebarItemDropQA = []


// Below arrays represent the items BMS sidebar home

export const ManagerHomeSideBar = [
  {
    title: "Project Reports",
    path: "/reports",
    icon: <FaIcons.FaBuffer />,
    cName: "nav-text",
  },
];
export const DeveloperHomeSideBar = [];
export const QAHomeSideBar = [];
