import * as yup from 'yup';

const formSchema = yup.object.shape({
    username: yup
        .string()
        .trim()
        .required('Username is required')
        .min(3, 'At least 3 characters'),
    email: yup
        .string()
        .email('Must be valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Min 6 characters long'),
    tos: yup 
        .boolean()
        .oneOf([true], 'Must accept terms')
    
})

export default formSchema