import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Preloader extends Component {
    constructor(props){
        super(props);

        this.state = {
            time: props.time
        }
    }

    Timer(time){
        let interval = setInterval(() => {
            if(time === 0) {
                clearInterval(interval);
                this.props.end();
                return;
            }
            time = time - 1;
            this.setState({time});
        }, 1000);
        return this.state.time;
    }

    render(){
        let {title = 'Подождите...', desc, time = 0} = this.props;

        if(time > 0){
            desc = 'Повторить можно через ' + this.Timer(this.state.time);
        }

        return(
            <div className="preloader">
                {desc 
                    ? <span>{desc}</span>
                    : ''
                }
                <span className="preloader__title">{title}</span>
            </div>
        );
    }
};

Preloader.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    time: PropTypes.number,
    end: PropTypes.func,
  };

export default Preloader;