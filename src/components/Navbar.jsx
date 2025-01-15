import React from 'react'
import logo from '../../public/logo.png'

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className='nav-image'>
        <img src={logo} width={100} alt="" />
      </div>
      <div className="nav-desc">
        <p className="nav-lorem">Assalomu aleykum xurmatli foydalanuvchi. Saytimiz test rejimda <a href="https://t.me/iphone_sticker">Iphone emoji</a> kanali uchun maxsus yaratildi va test rejimda ishlamoqda. Emojilardan bemalol tekinga foydalanishingiz mumkin</p>
      </div>
    </nav>
  )
}

export default Navbar