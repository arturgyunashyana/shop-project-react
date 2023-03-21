import { Link, NavLink, useNavigate } from "react-router-dom"
import HeaderStyles from "./header.module.scss"
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"
import { HiOutlineChartSquareBar } from "react-icons/hi"
import { FaTimes } from "react-icons/fa"
import { useEffect, useState } from "react"
import { auth } from "../../firebase/config"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { SET__ACTIVE__USER, REMOVE__ACTIVE__USER } from "../../redux/slice/authSlice"
import Showonlogin, { Showonlogout } from "../Showonlogin"

const logo = (
    <div className={HeaderStyles.logo}>
        <Link to="/">
            <h2>
                e<span>Shop</span>.
            </h2>
        </Link>
    </div>
)

const cart = (
    <span className={HeaderStyles.cart}>
        <Link to="/cart">
            Cart
            <FaShoppingCart
                size={20}
            />
            <p>0</p>
        </Link>
    </span>
)

const activeLink = (
    ({ isActive }) => isActive ? `${HeaderStyles.active}` : ""
)

export const Header = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [displayName, setDisplayName] = useState("")

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user)
                if (user.displayName === null) {
                    const u1 = user.email.substring(0, user.email.indexOf("@"))
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    setDisplayName(uName)
                } else {
                    setDisplayName(user.displayName)
                }

                dispatch(SET__ACTIVE__USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userId: user.uid
                }))
            } else {
                setDisplayName("")
                dispatch(REMOVE__ACTIVE__USER())
            }
        });
    }, [dispatch, displayName])

    const toggleMenu = () => {
        setShowMenu(!showMenu)
        console.log("click");
    }

    const hideMenu = () => {
        setShowMenu(false)
    }

    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Logout successfully...");
            navigate("/")
        }).catch((error) => {
            toast.error(error.message)
        });
    }



    return (
        <header>
            <div className={HeaderStyles.header}>
                {logo}
                <nav className={showMenu ? `${HeaderStyles["show-menu"]}` : `${HeaderStyles["hide-nav"]}`}>
                    <ul onClick={hideMenu}>
                        <li className={HeaderStyles["logo-menu"]}>
                            {logo}
                            <FaTimes
                                className={HeaderStyles.close}
                                size={22}
                                color="#fff"
                                onClick={hideMenu}
                            />
                        </li>
                        <li>
                            <NavLink to="/"
                                className={activeLink}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={activeLink}>
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                    <div className={HeaderStyles["header-right"]}
                        onClick={hideMenu}
                    >
                        <span className={HeaderStyles.links}>
                            <Showonlogout>
                                <NavLink to="/login" className={activeLink}>
                                    Login
                                </NavLink>
                            </Showonlogout>
                            <Showonlogin>
                                <a href="#home" style={{color: "#ff7722"}}>
                                    <FaUserCircle />
                                    &nbsp;
                                    Hi, &nbsp; {displayName}
                                </a>
                            </Showonlogin>
                            {/* <NavLink to="/register" className={activeLink}>
                                Register
                            </NavLink> */}
                            <Showonlogin>
                                <NavLink to="/order-history" className={activeLink}>
                                    My Orders
                                </NavLink>
                            </Showonlogin>
                            <Showonlogin>
                                <NavLink
                                    to="/"
                                    className={activeLink}
                                    onClick={logoutUser}
                                >
                                    Logout
                                </NavLink>
                            </Showonlogin>

                        </span>
                        {cart}
                    </div>
                </nav>

                <div className={HeaderStyles["menu-icon"]}>
                    {cart}
                    <HiOutlineChartSquareBar
                        onClick={toggleMenu}
                    />
                </div>
            </div>
        </header>
    )
}