import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { sprintService } from "../../Services/SprintService";
import { authenticationService } from "../../Services/LoginService";

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


export let SidebarItemDropManager = []
export let SidebarItemDropDeveloper = []
export let SidebarItemDropQA = []


// Below arrays represent the items BMS sidebar home

export const ManagerHomeSideBar = [
  {
    title: "Project Reports",
    path: "/reports",
    icon: <FaIcons.FaBuffer />,
    cName: "nav-text",
  },
]

export const DeveloperHomeSideBar = []
export const QAHomeSideBar = []


function SetDropDown(){
    if(authenticationService.userRole == "Manager"){
        SidebarItemDropManager = [{
            title: "Pinned Sprints",
            icon: <AiIcons.AiOutlinePushpin/>,
            cName: "nav-text",
            dropDown: JSON.parse(sprintService.getPinnedSprints())
        }]
    }
    else if(authenticationService.userRole == "QA"){
        SidebarItemDropQA = [{
            title: "Pinned Sprints",
            icon: <AiIcons.AiOutlinePushpin/>,
            cName: "nav-text",
            dropDown: JSON.parse(sprintService.getPinnedSprints())
        }]
    }
    else if(authenticationService.userRole == "Developer"){
        SidebarItemDropDeveloper = [{
            title: "Pinned Sprints",
            icon: <AiIcons.AiOutlinePushpin/>,
            cName: "nav-text",
            dropDown: JSON.parse(sprintService.getPinnedSprints())
        }]
    }
}


export default SetDropDown