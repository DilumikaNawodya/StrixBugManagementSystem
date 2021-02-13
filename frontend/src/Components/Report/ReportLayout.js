import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import styled from 'styled-components';
import NavBar from '../Common/Navbar/NavBar';
import { NavLink } from "react-router-dom";



function ReportLayout({page}) {
    const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;


if(localStorage.getItem("projectID")){
    const pid = localStorage.getItem("projectID")
    console.log(pid)
}else{
    const pid = null
    console.log(pid)
}



const [expan, setExpan] = useState(false)

const onExpand = () => {
    if(expan){
        setExpan(false)
    }else{
        setExpan(true)
    }
}

return(
    <>
        <NavBar/>
        <SideNav style={{top: 55 , background: 'black'}}
            onToggle = {onExpand}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="backlog">

                <NavItem eventKey="home">
                    <NavIcon>
                    <NavLink to={"/Manager"}>  <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></NavLink>
                    </NavIcon>
                    <NavText>
                    <NavLink to={"/Manager"}> Home</NavLink>
                    </NavText>
                </NavItem>


                <NavItem eventKey="reports">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Reports
                      </NavText>

                    <NavItem eventKey="reports/Report Dashboard">
                        <NavText>
                        <NavLink to={"/Manager/DeveloperTimesheeet"}> Developer Timesheet</NavLink>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="reports/Full bug summary">
                        <NavText>
                            Project Timesheet
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="reports/Full bug summary">
                        <NavText>
                           Sprint Summary
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="reports/Full bug summary">
                        <NavText>
                            Full Bug Summary
                        </NavText>
                    </NavItem>

                </NavItem>
            </SideNav.Nav>
        </SideNav>
        <Main expanded={expan} style={{top: 55}}>
            {page}
        </Main>
    </>
)
}

export default ReportLayout
