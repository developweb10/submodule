import { React, useState, useEffect } from 'react';
import { ThemeContext, themes } from '../store/ThemeContext';

export function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(localStorage.getItem('theme-color'));

  function changeTheme(theme) {
    setTheme(theme);
    localStorage.setItem('theme-color', theme)
    console.log(localStorage.getItem('theme-color'))
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.getElementsByTagName('html')[0].setAttribute('class', 'dark');
        break;
      case themes.dark:
      default:
        document.getElementsByTagName('html')[0].setAttribute('class', '');
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

const scrollTop = ((event)=> {
  const body = document.getElementById('scrollTotop');

  body.scrollIntoView({
    top: 0,
    behavior: 'smooth'
  }, 1000)  
  // window.scrollTo(0, 0)
})

export function Themefooter() {
  const guide= 'https://layer.guide/';
  const legal= 'https://layer.guide/legal';
  const social= 'https://layer.guide/social';
  const about= 'https://layer.guide/about';

  return (
    <div className="flex justify-between p-[20px] h-[55px]">
    <div className="flex justify-between w-full">
      <div
      className="flex w-full bg-white dark:bg-[#1A1919] flex justify-center "
      ><a className="text-[#645F5B] dark:text-[#FFFFFF] text-[12px] mr-5 custom-hover"
      href={guide}
      >Guide</a>
       <a className="text-[#645F5B] dark:text-[#FFFFFF] text-[12px] mr-5 custom-hover"
       href={legal}
       >Legal</a>
        <a className="text-[#645F5B] dark:text-[#FFFFFF] text-[12px] mr-5 custom-hover"
        href={social}
        >Social</a>
         <a className="text-[#645F5B] dark:text-[#FFFFFF] text-[12px] custom-hover"
         href={about}
         >About</a>
        </div>
        <div 
        onClick={scrollTop}
        className="text-[#645F5B] dark:text-[#FFFFFF] text-[12px] pl-[20px] pr-[20px]"
        ><a href="javascript::void(0)">Top</a></div>
    </div>
   
      <div className=" w-40"></div>
  </div>
  )
}
