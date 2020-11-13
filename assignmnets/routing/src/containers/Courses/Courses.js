import React, { Component } from 'react';

import { Route, NavLink } from 'react-router-dom';

import './Courses.css';

import Course from '../Course/Course';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    selectCourceHandler = () => {
        this.props.history.push("/course");
    }

    render () {   
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return (
                                <NavLink className="Link" activeClassName="selected" key={course.id}
                                    to={{
                                        pathname: "/courses/" + course.id,
                                        search: "?title=" + course.title
                                    }}
                                >
                                    <article className="Course" >{course.title}</article>
                                </NavLink>
                            );
                        } )
                    }
                </section>
                <Route path="/courses/:id" exact component={Course}/>
            </div>
        );
    }
}

export default Courses;