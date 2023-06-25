import DarkModeToggle from "../DarkModeToggle";
import "./header.scss";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
function Header(props) {
	const navigation = useNavigate();

	const handleLogout = () => {
		try {
			localStorage.removeItem("user");
		} catch (error) {
			console.log(error);
		}
		
		navigation("/login");
	}
	return (
		<>

			<nav className="header-container">
				<ul>
					<li>
						<a href="/">Todo List</a>
					</li>
					<li>
						<Link to="/">Welcome {
							props.user && props.user.fullname
						}</Link>
					</li>
					<li>{
						props.user ? <a href="/login"
							onClick={handleLogout}>Logout</a> : <Link to="/login">Login</Link>
					}</li>
					{
					!props.user && <li>
						<Link to="/register">Register</Link>
					</li>
				} </ul>
			</nav>
			<DarkModeToggle/>

		</>
	);
}

export default Header;
