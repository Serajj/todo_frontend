import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router';
import {register} from '../service/api';
import LoaderModal from './Modal';
import './style/register.scss';

export default function Register(props) {
	const navigation = useNavigate();

	useEffect(() => {
		if (props.user) {
			navigation("/");
		}
	},);

    const [isLoading, setLoading] = useState(false);
	const [form, setForm] = useState({
		username: "",
		password: "",
		email: "",
		fullname: "",
		mobile: ""
	});

	const [errors, setError] = useState(null);
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async () => { 
        setLoading(true);
        // when submit called all errors will be wiped
		setError(null);
		const response = await register(form);
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

				<h1 className="h3">Register</h1>

				<form action="">


					<div className="form-floating">
						<label for="floatingInput1">Username</label>
						<input type="text" className="form-control" id="floatingInput" placeholder=" eg : happy1" name='username'
							onChange={handleChange}
							required/> {
						errors?.username && <span>{
							errors.username.msg
						}</span>
					} </div>
					<div className="form-floating">
						<label for="floatingInput2">Fullname</label>
						<input type="text" className="form-control" id="floatingInput" placeholder=" eg : Seraj Alam" name='fullname'
							onChange={handleChange}
							required/> {
						errors?.fullname && <span>{
							errors.fullname.msg
						}</span>
					} </div>
					<div className="form-floating">
						<label for="floatingInput3">Email</label>
						<input type="email" className="form-control" id="floatingInput" placeholder="seraj@mail.com" name='email'
							onChange={handleChange}
							required/> {
						errors?.email && <span>{
							errors.email.msg
						}</span>
					} </div>
					<div className="form-floating">
						<label for="floatingInput">Mobile</label>
						<input type="number" className="form-control" id="floatingInput" placeholder="Number" name='mobile'
							onChange={handleChange}
							required/> {
						errors?.mobile && <span>{
							errors.mobile.msg
						}</span>
					} </div>
					<div className="form-floating">
						<label for="floatingPassword">Password</label>
						<input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password'
							onChange={handleChange}
							required/> {
						errors?.password && <span>{
							errors.password.msg
						}</span>
					} </div>
					<div className="form-floating remeber">
						<div className="form-check form-switch">
							<input className="form-check-input" type="checkbox" value="1" name="remember_me" id="rememberMeSwitch" required/>
							<label className="form-check-label" for="rememberMeSwitch">
								On clicking signup , I agree terms and conditions.</label>
						</div>

					</div>
					<div className='signin-btn'>
						<button className="w-100 btn btn-lg" type="button"
							onClick={handleSubmit}>Sign Up</button>
					</div>
				</form>
				<p className="copyright">&copy; 2023</p>
			</main>
            {isLoading && <LoaderModal isOpen={true} title={"Registering please wait..."} />}
		</div>
	)
}
