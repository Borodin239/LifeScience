import React, {ErrorInfo} from "react";
import {developmentLog} from "../../infrastructure/common/developmentLog";
import DescriptionBlock from "../../elements/temporary/DescriptionBlock/DescriptionBlock";

class UnhandledErrorBoundary extends React.Component<any, {hasError: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        developmentLog(`Unhandled error: ${error.name} ${error.message}`);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{marginLeft: "auto"}}>
                    <DescriptionBlock type="warning" message="Unknown error. Refresh the page"/>
                </div>
            );
        }

        return this.props.children;
    }
}

export default React.memo(UnhandledErrorBoundary);
