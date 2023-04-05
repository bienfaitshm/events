import {
    FormControl,
    WarningOutlineIcon,
    IFormControlLabelProps,
    IFormControlProps,
    IFormControlErrorMessageProps,
} from "native-base";

/**
 * Label Input
 * @param props{}
 * @returns ReactNode
 */
export type LabelInputProps = {
    label: string;
    children: React.ReactNode;
    labelColor?: string;
    labelProps?: IFormControlLabelProps;
    errorMessageProps?: IFormControlErrorMessageProps;
    errorMessage?: string;
} & IFormControlProps;

const LabelInput: React.FC<LabelInputProps> = ({
    label,
    children,
    labelProps,
    errorMessage,
    errorMessageProps,
    ...props
}) => {
    return (
        <FormControl {...props}>
            <FormControl.Label {...labelProps}>{label}</FormControl.Label>
            {children}
            <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
                {...errorMessageProps}
            >
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
};

export default LabelInput;
