import styles from '../../styles/Form.module.css'


const FormInput = ({id, inputType, label, placeholder}) => {
    return ( 
        <>

            <div className={"form-group " + styles.inputfield}>
                <label htmlFor={id} className={styles.label}>{label}</label>
                <input type={inputType} 
                    className={"form-control"} 
                    id={id} placeholder={placeholder} />
            </div>
        
        </> 
    );
}
 
export default FormInput;