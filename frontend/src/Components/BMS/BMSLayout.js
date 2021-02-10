import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import styled from 'styled-components';
import NavBar from "../Common/Navbar/NavBar";

function BMSLayout({page}){

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
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="backlog">
                        <NavIcon>
                            <i class="fas fa-clipboard-list" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Issue Backlog
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="sprints">
                        <NavIcon>
                            <i className="fab fa-rev" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Sprints
                        </NavText>

                        <NavItem eventKey="sprints/sprint1">
                            <NavText>
                                Sprint1
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="sprints/sprint2">
                            <NavText>
                                Sprint2
                            </NavText>
                        </NavItem>
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
                                Line Chart
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="reports/Full bug summary">
                            <NavText>
                                Bar Chart
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

export default BMSLayout;