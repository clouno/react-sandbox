import React, { Component } from 'react';

class Course extends Component {
    render () {
        console.log('parsed');
        
        const id = this.props.match.params.id;
        const title = new URLSearchParams(this.props.location.search).get('title');
        
        return (
            <div>
                <h1>{title}</h1>
                <p>You selected the Course with ID: {id}</p>
            </div>
        );
    }
}

export default Course;