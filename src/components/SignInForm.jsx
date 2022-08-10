import { useState, useContext } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import { UserContext } from "../contexts/User";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../utils/firebaseUtils";
import "./SignUpForm.scss";

const SignInForm = () => {
  const initializeFields = {
    email: '',
    password: '',
  };

  const { setCurrentUser } = useContext(UserContext);
  
  const [formFields, setFormFields] = useState(initializeFields);
  const { email, password } = formFields;

  const resetForm = () => {
    setFormFields(initializeFields);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormFields({...formFields, [name]: value});
  };

  // authenticate existing user with credentials
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      
      setCurrentUser(user);
      resetForm();
      
    } catch(err) {
      switch(err.code) {
        case 'auth/wrong-password':
          alert("Incorrect password for this account. Try again.");
          break;
        
        case 'auth/user-not-found':
          alert("No user associated with this email. Sign up instead.");
          break;
    
        default:
          console.log('Encountered an error with user sign in', err.message);
          break;
      };
    };
  };

  // authenticate user with google sign in
  const googleSignIn = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      setCurrentUser(user);
      await createUserDocumentFromAuth(user);
    } catch(err) {
      console.log("Encountered an error with Google sign in", err.message);
    };
  };

  const inputAttributes = [
    {
      required: true,
      label: "Email",
      type: "email",
      name: "email",
      value: email,
      onChange: onChangeHandler,
    },
    {
      required: true,
      label: "Password",
      type: "password",
      name: "password",
      value: password,
      onChange: onChangeHandler,
    },
  ];

  const inputForms = inputAttributes.map((a, index) => <FormInput key={index} {...a}/>);

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={onSubmitHandler}>
        {inputForms}

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={googleSignIn} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>

  );
};

export default SignInForm;