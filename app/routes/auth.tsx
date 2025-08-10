import React, {useEffect} from 'react';
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    {title: "ResumeAI | Auth"},
    {name: 'description', content: 'Log in to your account'},
])


function Auth() {
    // you’re reading the isLoading property from the Zustand store you defined in puter.ts
    /*
    usePuterStore is your Zustand store hook (probably created in puter.ts).
    From it, you grab:
        isLoading → whether some async auth check is happening (like verifying a token).
        auth → an object that holds authentication-related state.
    Likely contains isAuthenticated (true if user is logged in).
    */
    const {isLoading, auth} = usePuterStore();

    const location = useLocation();
    // useLocation() gives you the current URL info from React Router.

    const next = location.search.split('next=')[1];
    //If the URL is /login?next=/dashboard, next will be "/dashboard"

    const navigate = useNavigate();
    // Gives you the navigate() function to programmatically change routes


    // Runs whenever auth.isAuthenticated or next changes.
    useEffect(() => {
        // allows navigation to next page only if user is authenticated
        if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className={"bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center"}>
            <div className="gradient-border shadow-lg">
                <section className={"flex flex-col gap-8 bg-white rounded-2xl p-10"}>
                    <div className={"flex flex-col items-center gap-2 text-center"}>
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>

                    <div>
                        {isLoading ? (
                            <button className={"auth-button animate-in"}>
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className={"auth-button"} onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className={"auth-button"} onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Auth;