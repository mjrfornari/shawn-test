import { useEffect, useState } from 'react'
import { Icon } from 'react-icons-kit'
import {ic_nightlight_round} from 'react-icons-kit/md/ic_nightlight_round'
import {ic_wb_sunny} from 'react-icons-kit/md/ic_wb_sunny'

import '../../pages/styles/Themes.css';

import './index.css'


function ThemeToggler(props) {
    const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('shaw-test_theme') || 'theme-dark')

    useEffect(() => {
        document.documentElement.className = selectedTheme;
        localStorage.setItem('shaw-test_theme', selectedTheme);
    }, [selectedTheme])

    
    const handleChangeTheme = (e) => {
        e.preventDefault()
        if (selectedTheme === 'theme-dark') {
            setSelectedTheme('theme-light');
        } else {
            setSelectedTheme('theme-dark');
        }
    }

    return (
        <button className="theme-toggler-button" onClick={handleChangeTheme}>{selectedTheme === 'theme-dark' ? (<Icon size={24} icon={ic_wb_sunny}/>) : (<Icon size={24} icon={ic_nightlight_round}/>)}</button>
    )
}

export default ThemeToggler