import * as React from 'react';
import Button from '@material-ui/core/Button';

type Variant = 'contained' | 'outined';
type Color = 'primary' | 'secondary';

interface ButtonProps {
    variant: Variant;
    loading?: boolean;
    disabled?: boolean;
    color: string;
    onClick: () => void;
}

export const OutlinedButton = ({type, name, value, text, loading, disabled, onClick}: ButtonProps) => {
    const [isLoading, setLoading] = React.useState(false);

    return <button onClick={onClick} className={styles.button} disabled type={type} name={name} value={value}>{text}</button>;
};