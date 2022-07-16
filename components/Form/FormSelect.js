import styles from '../../styles/Form.module.css'

const FormSelect = ({id, label, options, onChange}) => {

    return ( 

        <>
        
            <div className={"form-group " + styles.selectfield}>

                <label htmlFor={id} className={styles.label}>{label}</label>

                <select id={id} className={"form-select"} onChange={onChange}>
                    
                    <option defaultValue> Choose... </option>

                    {
                        options.map((item)=>(
                            <option key={item.id}>
                                {item.name}
                            </option>
                        ))
                    }
                
                </select>
            
            </div>

        </>

    );
}
 
export default FormSelect;