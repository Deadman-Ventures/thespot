import React, { useEffect, useState } from "react";
import { classNames } from "../../utils";
import { useNavigate } from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate()
    const [tabs, setTabs] = useState([
        { name: 'Explore', current: true, link: '/' },
        { name: 'Itineraries', current: false, link: '/itineraries' },
        { name: 'Find A Guide', current: false, link: '/guides' },
    ])

    useEffect(() => {
        console.log('in useeffect')
        for (let t of tabs) {
            if (window.location.href.includes(t.link)) {
                tabs.forEach(a => a.name === t.name ? a.current = true : a.current = false)
                setTabs([...tabs])
            }
        }
    }, [])

    const changeTab = (item) => {
        tabs.forEach(a => a.name === item.name ? a.current = true : a.current = false)
        setTabs([...tabs])
        navigate(item.link)
    }

    return (
        <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
                {tabs.map((item) => (
                    <a
                        onClick={() => changeTab(item)}
                        key={item.name}
                        className={classNames(
                            item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </div>
    )
}