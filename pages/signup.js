import FormInput from "../components/Form/FormInput";
import FormTitle from "../components/Form/FormTitle";
import FormButton from "../components/Form/FormButton";
import FormSelect from "../components/Form/FormSelect";
import FormDatePicker from "../components/Form/FormDatePicker";

const Signup = () => {

    let options = [
        {
            'id': 1,
            'name': 'Male'
        },
        {
            'id': 2,
            'name': 'Female'
        }
    ]

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("hello world");
    }

    return ( 

        <>
        
        <FormTitle title="Sign up" />

        <form onSubmit={handleSubmit}>

            <FormInput id="name" inputType="text" label="Name" placeholder="Enter your name" />
            <FormInput id="email" inputType="email" label="Email" placeholder="Enter email" />
            <FormInput id="password" inputType="password" label="Password" placeholder="Enter password" />

            <FormSelect id="gender" label="Gender" options={options}/>
            <FormDatePicker id="dob" />

            <FormButton type="submit" buttonText="Sign up" />

        </form>
        
        </>

    );
}
 
export default Signup;