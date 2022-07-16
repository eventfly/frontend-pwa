import styles from '../../styles/Form.module.css'

const FormTitle = ({title}) => {
    return ( 
        <div>
            <div className={styles.title}>
                <h1>{title}</h1>
            </div>
        </div>
     );
}
 
export default FormTitle;