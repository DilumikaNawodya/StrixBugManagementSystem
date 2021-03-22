import React, { useState } from "react"


function AccessControl(){

    return(

        <div class="container-fluid">
            <div class="row">
                <div class="col-sm">
                    <div class="todo-container">
                        <header>
                            <div class="date">
                                <span class="day-number">Manager</span>
                            </div>
                            <hr/>
                        </header>

                        <main class="todo-list">
                            <ul class="tasks-container">
                                <li class="task-container">
                                    <div class="notice notice-danger">
                                        <strong>Notice</strong> notice-danger
                                    </div>
                                </li>
                                <li class="task-container">
                                    <div class="notice notice-danger">
                                        <strong>Notice</strong> notice-danger
                                    </div>
                                </li>
                                
                            </ul>
                        </main>
                        <button class="add-task-btn">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="todo-container">
                        <header>
                            <div class="date">
                                <span class="day-number">Customer</span>
                            </div>
                            <hr/>
                        </header>

                        <main class="todo-list">
                            <ul class="tasks-container">
                                <li class="task-container">
                                    <div class="notice notice-danger">
                                        <strong>Notice</strong> notice-danger
                                    </div>
                                </li>
                                <li class="task-container">
                                    <div class="notice notice-danger">
                                        <strong>Notice</strong> notice-danger
                                    </div>
                                </li>
                                
                            </ul>
                        </main>
                        <button class="add-task-btn">
                            <span>+</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">
                    <div class="todo-container">
                        <header>
                            <div class="date">
                                <span class="day-number">Developers</span>
                            </div>
                            <hr/>
                        </header>

                        <main class="todo-list">
                            <ul class="tasks-container">
                                <li class="task-container">
                                    <div class="notice notice-danger">
                                        <strong>Notice</strong> notice-danger
                                    </div>
                                </li>
                                <li class="task-container">
                                    <div class="notice notice-danger">
                                        <strong>Notice</strong> notice-danger
                                    </div>
                                </li>
                                
                            </ul>
                        </main>
                        <button class="add-task-btn">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="todo-container">
                        <header>
                            <div class="date">
                                <span class="day-number">QAs</span>
                            </div>
                            <hr/>
                        </header>

                        <main class="todo-list">
                            <ul class="tasks-container">
                                <li class="task-container">
                                    <div class="notice notice-danger">
                                        <strong>Notice</strong> notice-danger
                                    </div>
                                </li>
                                <li class="task-container">
                                    <div class="notice notice-danger">
                                        <strong>Notice</strong> notice-danger
                                    </div>
                                </li>
                                
                            </ul>
                        </main>
                        <button class="add-task-btn">
                            <span>+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccessControl