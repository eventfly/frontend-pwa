import styles from '../../styles/Form.module.css'

const FormTitle = ({title}) => {
    return ( 

        <>
        
            <div className={styles.title}>
                <h1>{title}</h1>
            </div>

        </>

     );
}
 
export default FormTitle;