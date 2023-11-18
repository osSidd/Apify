import React from "react";

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state = {error:null, errorInfo: null}

        //use try-catch block for event handlers

    }

    // static getDerivedStateFromError(error){
    //     // update state so the next render will show the fallback ui
    // }

    componentDidCatch(error, errorInfo){

        //you can also log the error to an error reporting service

        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render(){
        if(this.state.error) return <FallbackUI error={this.state.error} errorInfo={this.state.errorInfo}/>

        return this.props.children
    }
}

function FallbackUI({error, errorInfo}){
    return (
        <div>
            <h2>Something went wrong</h2>
            <details>
                {error && error.toString()}
                <br/>
                {errorInfo.componentStack}
            </details>
        </div>
    )
}

export default ErrorBoundary
