import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string()
    .required('Email is required')
    .email('Email format in invalid'),

    password: yup. string()
    .required("Password is Required")
    .min(5, 'Password have minimum 5 characters')
    .max(25, 'Password maximal 25 characters')
})