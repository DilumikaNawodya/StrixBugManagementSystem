import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';

export const SidebarItem = [
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
    }
]

export const SidebarItemDrop = []


// Below arrays represent the items BMS sidebar home

export const ManagerHomeSideBar = [
    {
        title: 'Project Reports',
        path: '/reports',
        icon: <FaIcons.FaBuffer />,
        cName: 'nav-text'
    }
]
export const DeveloperHomeSideBar = []
export const QAHomeSideBar = []