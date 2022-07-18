import styles from '../../styles/Form.module.css'

const FormButton = ({type, buttonText}) => {
    return ( 

        <>
            <button type={type} className={"btn btn-primary btn-block " + styles.button_style}> 
                {buttonText} 
            </button>
        
        </>

    );
}
 
export default FormButton;