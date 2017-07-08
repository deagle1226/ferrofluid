import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import PropTypes from 'prop-types'
import concat from 'lodash/concat'

function Fluid(props) {
    return (
        <circle {...props} />
    )
}

function fluid(dim, polarity) {
    return {
        cx: dim / 2,
        cy: dim / 2,
        r: dim * 2 * polarity
    }
}

class Ferro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            polarity: 0.5
        }
    }
    
    render() {
        return this.props.children(this.state.polarity)
    }
}

Ferro.propTypes = {
    children: PropTypes.func.isRequired
}

class Ferrofluid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pole: 0
        }
        this.reverse = this.reverse.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    reverse() {
        this.setState({ pole: (this.state.pole + 1) % 2 })
    }
    
    handleClick() {
        this.reverse()
    }
    
    render() {
        const { pole } = this.state
        const { color, springConfig, ...props } = this.props
        const dim = 100
        return (
            <Motion style={{ polarity: spring(pole, springConfig) }}>
                {({ polarity }) => (
                    <svg viewBox={`0 0 ${dim} ${dim}`} onClick={this.handleClick} {...props}>
                        <Fluid {...fluid(dim, polarity)} fill={`rgba(${color}, ${1 - polarity}`} />
                    </svg>
                )}
            </Motion>
        )
    }
}

Ferrofluid.propTypes = {
    color: PropTypes.string,
    springConfig: PropTypes.shape({
        stiffness: PropTypes.number,
        damping: PropTypes.number
    })
}

Ferrofluid.defaultProps = {
    color: "255, 96, 96",
    springConfig: {
        stiffness: 170,
        damping: 26
    }
}

export function Polarize({ children, ...props }) {
    const ff = <Ferrofluid {...props} />
    children.props.children = concat([ff], children.props.children)
    return children
}

export default Ferrofluid