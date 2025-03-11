//deleted the old code, as it was copy-pasted and bad
//this version is much cleaner and simpler to understand

//read all the comments, read the "REQUIRED READING" and then tinker with the code on your own

//good luck

/*
***** REQUIRED READING *****
useState
https://react.dev/reference/react/useState
or
https://www.w3schools.com/react/react_usestate.asp (if you prefer)

Ternary/Conditional Operators
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator

React Conditional Rendering
https://react.dev/learn/conditional-rendering#logical-and-operator- (specifically the "Logical AND operator (&&)" part)
*/

// use client is required when "use hooks" are used in the code, as they are rendered on client side (the user can interact with it)
"use client";

import { useState } from "react";

// the dropdown menu is rendered in the exported function component, this function component is rendered on the page via projects/page.jsx
// see it on localhost:3000/projects/whatever
export const FrontNavbar = () => {
    return <DropdownMenu />;
};

// i have created the drop down menu in a separate function component, to make it easier for you to alter it
// also, i intentionally made it very ugly, and only made slight CSS changes, so it's up to you guys to make it nicer
const DropdownMenu = () => {
    // here the 'expanded' state is created with the 'setExpanded' function to alter it
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            {/* this button changes the expanded useState between 'true' and 'false' */}
            <button
                className="border-2 border-red-800 px-2 text-black bg-white hover:bg-white/80"
                onClick={() => {
                    expanded ? setExpanded(false) : setExpanded(true);
                }}
            >
                Menu
            </button>
            {/* this div is conditionally rendered based on the state of 'expanded' (this is our actual dropdown part) */}
            <div
                className={
                    (expanded ? "scale-100" : "scale-0") +
                    " bg-white text-black border-red-800 border-2 w-36 transition-all duration-400"
                }
            >
                <p className="hover:underline">test</p>
                <p className="hover:underline">test 2</p>
                <p className="hover:underline">test 3</p>
                <p className="hover:underline">test 4</p>
                <p className="hover:underline">test 5</p>
            </div>
        </div>
    );
};
