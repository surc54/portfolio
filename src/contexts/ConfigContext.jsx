import React from "react";

export const ConfigContext = React.createContext({
    status: "loading",
});

export const withConfig = AnotherElement => {
    return props => (
        <ConfigContext.Consumer>
            {data => <AnotherElement config={data} {...props} />}
        </ConfigContext.Consumer>
    );
};
