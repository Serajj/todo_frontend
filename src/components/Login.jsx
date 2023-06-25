import React from 'react'
import { useEffect } from 'react';
import {useState} from 'react';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router';
import {login} from '../service/api';
import LoaderModal from './Modal';
import './style/login.scss';
export default function Login(props) {

	const [form, setForm] = useState({login: "", password: ""});
    

	const [errors, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      
      if(props.user){
        navigation("/");
      }
    }, []);
    

	const navigation = useNavigate();
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async () => { 
        // when submit called all errors will be wiped
        setLoading(true);
		setError(null);
		const response = await login(form);
		if (response.status === 200) {
			setLoading(false);
			if (response.data.status) {
                const user = response.data.data;
				localStorage.setItem('user', JSON.stringify(user));
                props.setUser(user);
				navigation("/");
				return;
			} else {
				if (response.data.code === 200) {
                    toast.error(response.data.message);
                }

				if (response.data.code === 201) {
					setError(response.data.data);
				}
				return;
			}
		}
        setLoading(false);

	};

	return (
		<div className='login-container'>
			
			<main className="form-signin">

				<h1 className="h3">Login</h1>

				<form action="">


					<div className="form-floating">
						<label for="floatingInput">Email/Username/Mobile</label>
						<input type="text" className="form-control" name="login" id="floatingInput"
							onChange={handleChange}
							placeholder=" eg : happy1"
							required/> {
						errors?.login && <span>{
							errors.login.msg
						}</span>
					} </div>
					<div className="form-floating">
						<label for="floatingPassword">Password</label>

						<input type="password" name="password" className="form-control" id="floatingPassword"
							onChange={handleChange}
							placeholder="Password"
							required/>
                            {
						errors?.password && <span>{
							errors.password.msg
						}</span>
					}
					</div>

					<div className="form-floating remeber">
						<div className="form-check form-switch">
							<input className="form-check-input" type="checkbox" value="1" name="remember_me" id="rememberMeSwitch"/>
							<label className="form-check-label" for="rememberMeSwitch">
								Remember me</label>
						</div>

					</div>

					<div className='signin-btn'>
						<button className="w-100 btn btn-lg"
							onClick={handleSubmit}
							type="button">Sign in</button>
					</div>
				</form>
				<p className="copyright">&copy; 2023</p>
			</main>
            {isLoading && <LoaderModal isOpen={true} title={"Authenticating..."} />}
		</div>
	)
}
