import React from 'react';
import {navLinks} from "../constants ";

const NavBar = () => {
  return (
    <header>
        <nav>
            <img src="/logo.svg" alt='Apple logo' />
            <ul>
                {navLinks.map(({label}) => {
                    // without ()=>{return ()}  direct approach () => ()
                    return(
                        <li key={label} >
                            <a href={label} >{label}</a>
                        </li>
                    )
                })
                }
            </ul>

            <div className='flex-center gap-3' >
                <button>
                    <img src='/search.svg' alt='search' />
                </button>
                <button>
                    <img src='/cart.svg' alt='cart logo' />
                </button>
            </div>
        </nav>
    </header>
  );
};

export default NavBar;