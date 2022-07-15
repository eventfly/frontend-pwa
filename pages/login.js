import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";


const Login = () => {

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("hello world");
    }

    return ( 

        <>

            <FormTitle title="Login" />

            <form onSubmit={handleSubmit}>
                <FormInput id="email" inputType="email" label="Email" placeholder="Enter email" />
                <FormInput id="password" inputType="password" label="Password" placeholder="Enter password" />

                <FormButton type="submit" buttonText="Log in" />

            </form>


        </>

    );
}
 
export default Login;