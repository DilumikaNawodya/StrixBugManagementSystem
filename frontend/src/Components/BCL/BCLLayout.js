import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import IssueBacklogBCL from "./IssueBacklog/IssueBacklogBCL";
import styled from 'styled-components';
import NavBar from "../Common/Navbar/NavBar";

function BCLLayout(){

    const Main = styled.main`
        position: relative;
        overflow: hidden;
        transition: all .15s;
        padding: 0 20px;
        margin-left: ${props => (props.expanded ? 240 : 64)}px;
    `;

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
                </SideNav.Nav>
            </SideNav>
            <Main expanded={expan} style={{top: 55}}>
                <IssueBacklogBCL/>
            </Main>
        </>
    )
}

export default BCLLayout;