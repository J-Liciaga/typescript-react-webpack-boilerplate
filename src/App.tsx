import * as React from "react";
import { hot } from "react-hot-loader/root";

export interface AppProps {}

const App: React.FC<AppProps> = (): React.ReactElement => {
    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <h1>Hello World</h1>
        </div>
    );
};

export default hot(App);
