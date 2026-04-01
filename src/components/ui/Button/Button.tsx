import Icon from '../Icon/Icon'
import styles from './Button.module.scss'

type Props = {
    type?: 'submit' | 'reset' | 'button',
    level?: 'primary' | 'secondary',
    size?: 'small' | 'medium' | 'large',
    shape?: 'square' | 'rounded',
    styleProps?: object,
    icon?: string, 
    text?: string,
    onClick?: Function,
    isDisabled?: boolean
}

export const Button = ({type = 'button', level = 'secondary', size = 'medium', shape = 'square', styleProps, icon, text, onClick, isDisabled}:Props )=> {
    return (
        <button type={type} className={`${styles.button} ${styles[size]} ${styles[shape]} ${styles[level]}`} style={styleProps} onClick={() => onClick()} disabled={isDisabled}>{icon ? <Icon name={icon}></Icon> : null}{text}</button>
    )
}