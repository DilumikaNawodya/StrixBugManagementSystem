import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import {BsFileEarmarkSpreadsheet} from 'react-icons/bs'
import {SiSprint} from 'react-icons/si'
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



// Manager, Developer and QA - Sidebar Dropdown (Except Report)

export let SidebarItemDropManager = []
export let SidebarItemDropDeveloper = []
export let SidebarItemDropQA = []


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


// Only for manager Manager Home sidebardrop and Report sidebar

export const ManagerReportSideBarDrop = [
    {
      title: "Project Reports",
      icon: <AiIcons.AiOutlinePushpin/>,
      cName: "nav-text",
      dropDown: [
          {
              name: 'Report Dashboard',
              path: '/reports',
              icon: <FaIcons.FaChartLine/>,
              cName: "nav-text"
          },
          {
              name: 'Timesheet Developer/Project',
              path: '/timesheet',
              icon: <BsFileEarmarkSpreadsheet/>,
              cName: "nav-text"
          },
          
          {
              name: 'Sprint Summary',
              path: '/sprint_summary',
              icon: <SiSprint/>,
              cName: "nav-text"
          },
          {
              name: 'Monthly Bug Summary',
              path: '/monthly_bug_summary',
              icon: <AiIcons.AiOutlineBug/>,
              cName: "nav-text"
          }
      ]
    },
  ]
  
  export const ManagerReportSideBar = [
   
    {
        title: 'Dashboard',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },  
    {
          title: 'Report Dashboard',
          path: '/reports',
          icon: <FaIcons.FaChartLine/>,
          cName: "nav-text"
      },
      {
          title: 'Timesheet Developer/Project',
          path: '/timesheet',
          icon: <BsFileEarmarkSpreadsheet/>,
          cName: "nav-text"
      },
      
      {
          title: 'Sprint Summary',
          path: '/sprint_summary',
          icon: <SiSprint/>,
          cName: "nav-text"
      },
      {
          title: 'Monthly Bug Summary',
          path: '/monthly_bug_summary',
          icon: <AiIcons.AiOutlineBug/>,
          cName: "nav-text"
      }
  ]