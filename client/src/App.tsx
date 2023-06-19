import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { classNames } from './utils'
import { Logo, NavBar, UserProfile } from './Components'
import { Outlet } from 'react-router-dom'



export function App() {
    return (
        <>
            <div>
                <div className="min-h-full bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Logo />
                                <NavBar />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <UserProfile />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1
                            className="h1">
                            Look before you leap
                        </h1>
                    </div>
                </header> */}
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 w-full"><Outlet /></div>
                </main>
            </div>
        </>
    )
}