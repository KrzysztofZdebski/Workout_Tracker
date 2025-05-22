import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const { name, showBlog, showResume } = data;

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
        <Popover className="block mt-5 tablet:hidden">
            {({ open }) => (
            <>
                <div className="flex items-center justify-between p-2 laptop:p-0">
                <h1
                    onClick={() => router.push("/")}
                    className="p-2 font-medium laptop:p-0 link"
                >
                    WorkoutTracker
                </h1>

                <div className="flex items-center">
                    {data.darkMode && (
                    <Button
                        onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                        }
                    >
                        <img
                        className="h-6"
                        src={`/images/${
                            theme === "dark" ? "moon.svg" : "sun.svg"
                        }`}
                        ></img>
                    </Button>
                    )}

                    <Popover.Button>
                    <img
                        className="h-5"
                        src={`/images/${
                        !open
                            ? theme === "dark"
                            ? "menu-white.svg"
                            : "menu.svg"
                            : theme === "light"
                            ? "cancel.svg"
                            : "cancel-white.svg"
                        }`}
                    ></img>
                    </Popover.Button>
                </div>
                </div>
                <Popover.Panel
                className={`absolute right-0 z-10 w-11/12 p-4 ${
                    theme === "dark" ? "bg-slate-800" : "bg-white"
                } shadow-md rounded-md`}
                >
                {!isBlog ? (
                    <div className="grid grid-cols-1">
                    <Button onClick={handleWorkScroll}>Work</Button>
                    <Button onClick={handleAboutScroll}>About</Button>
                    {showBlog && (
                        <Button onClick={() => router.push("/blog")}>Blog</Button>
                    )}
                    {showResume && (
                        <Button
                        onClick={() =>
                            window.open("mailto:hello@chetanverma.com")
                        }
                        >
                        Resume
                        </Button>
                    )}

                    <Button
                        onClick={() => window.open("mailto:hello@chetanverma.com")}
                    >
                        Contact
                    </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1">
                    <Button onClick={() => router.push("/")} classes="first:ml-1">
                        Home
                    </Button>
                    {showBlog && (
                        <Button onClick={() => router.push("/blog")}>Blog</Button>
                    )}
                    {showResume && (
                        <Button
                        onClick={() => router.push("/resume")}
                        classes="first:ml-1"
                        >
                        Resume
                        </Button>
                    )}

                    <Button
                        onClick={() => window.open("mailto:hello@chetanverma.com")}
                    >
                        Contact
                    </Button>
                    </div>
                )}
                </Popover.Panel>
            </>
            )}
        </Popover>
        {mounted && (
          <div
            className={
              `mt-10 hidden flex-row items-center justify-between sticky top-0 z-10 tablet:flex bg-white ${theme === "dark" ? "bg-neutral-900" : "bg-white"} dark:text-white py-4 px-8 rounded-2xl`
            }
          >
            <h1
            onClick={() => router.push("/")}
            className="text-5xl font-medium cursor-pointer mob:p-2 laptop:p-0"
            >
            WorkoutTracker
            </h1>
            <div className="flex">
                {/* <Button onClick={handleWorkScroll}>Work</Button>
                <Button onClick={handleAboutScroll}>About</Button>
                {showBlog && (
                <Button onClick={() => router.push("/blog")}>Blog</Button>
                )}
                {showResume && (
                <Button
                    onClick={() => router.push("/resume")}
                    classes="first:ml-1"
                >
                    Resume
                </Button>
                )}

                <Button onClick={() => window.open("mailto:hello@chetanverma.com")}>
                Contact
                </Button> */}
                {router.pathname !== "/" ? 
                    <Button onClick={() => router.push("/")}>
                    Home
                    </Button> 
                    : null
                }
                <Button onClick={() => router.push("/caloretracker")}>
                Calorie Tracker
                </Button>
                <Button onClick={() => router.push("/workouttracker")}>
                Workout Tracker
                </Button>
                {mounted && theme && (
                <Button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    <img
                    className="h-6"
                    src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                    ></img>
                </Button>
                )}
            </div>
          </div>
        )}
        </>
    );
};

export default Header;
