import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import "./loginDialogStyle.css";

const LoginDialog = (props: {
    onClose: (arg0: boolean) => void;
    show: boolean | ((prevState: boolean) => boolean);
}) => {
    const [show, setShow] = useState(false);

    const closeHandler = () => {
        setShow(false);
        props.onClose(false);
    };

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    return <p></p>;
};

LoginDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LoginDialog;
