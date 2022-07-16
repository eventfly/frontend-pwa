import "react-datepicker/dist/react-datepicker.css"
import styles from '../../styles/Form.module.css'
import DatePicker from "react-datepicker";
import {useState} from 'react'

const FormDatePicker = ({id, startDate, onChange}) => {

    // const [startDate, setStartDate] = useState(new Date());

    return ( 

        <>

            <div className={"form-group " + styles.datepickerfield}>
                <label htmlFor={id} className={styles.label}>Date of Birth</label>

                <DatePicker
                    selected={startDate}
                    className={styles.datepicker_style}
                    onChange={onChange}
                    // onChange={(date) => setStartDate(date)}
                    popperPlacement="bottom" 
                />

            </div>
        
        </>

    );
}
 
export default FormDatePicker;