import { useState} from "react";
import FormInput from "../format-input/form-input.component";
import Button from "../button/button.component";


import { signInWithEmailAndPasswordAuth } from "../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";
import './sign-in-form.styles.scss';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();        
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const resertFormFields = () => {
        setFormFields(defaultFormFields)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const {user} = await signInWithEmailAndPasswordAuth(email, password)
            
            resertFormFields();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("incorrect password")
                    break;

                case 'auth/user-not-found':
                    alert("incorrect email")
                    break;
                default:
                    console.log(error.code)
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label="password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Sign in with google</Button>
                </div>

            </form>

        </div>

    )
}

export default SignInForm;