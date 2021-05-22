import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../Routes/Home";

export default () => (
    <Router>
        <>
            <Header />
            <Switch> {/* Switch : 한 번에 오직 하나의 Route만 render */}
                <Route path="/" exact component={Home} /> {/*해당 path로 가면 Home 출력 */}
                {/* <Route path="/community" component={Community} />
                <Route path="/editorial" component={Editorial} />
                <Route path="/about" component={About} />
                <Route path="/store" component={Store} /> */}
                <Redirect from="*" to="/" /> {/* 일치하는 Route가 없으면 무조건 Home(/)으로 보냄 */}
            </Switch>
            <Footer />
        </>
    </Router>
);