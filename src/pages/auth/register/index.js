import { Link, useNavigate } from "react-router-dom"
import { Card } from "../../../components/Card"
import styles from "../auth.module.scss"
import registerImg from "../../../assets/register.png"
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config"
import { Loader } from "../../../components/Loader"
// import { Toast } from "react-toastify/dist/components"

export const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault();
        console.log(email, password, cPassword);
        if (password !== cPassword) {
            toast.error("Passwords do not match.")
        }
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                setIsLoading(false)
                toast.success("Registration Successful...")
                navigate("/login")
            })
            .catch((error) => {
                toast.error(error.message);
                setIsLoading(false)
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.field}>
                    <Card>
                        <div className={styles.form}>
                            <h2>Register</h2>
                            <form onSubmit={registerUser}>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={cPassword}
                                    onChange={(e) => setCPassword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className={styles.btn}
                                >
                                    Register
                                </button>
                            </form>
                            <div className={styles.register}>
                                <p>Already an account</p>
                                <Link to="/login">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </Card>
                    <div className={styles.img}>
                        <img
                            src={registerImg}
                            alt="login-img"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}