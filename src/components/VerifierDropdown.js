import React, { useState } from "react";
import { Form, Dropdown } from "react-bootstrap";

function VerifierDropdown(props) {
    const [selected, setSelected] = useState("Select " + props.default);

    const handleSelect = (data) => {
        setSelected(data[props.key1]);
        props.onSelect(data[props.selectKey]);
    };

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <Form.Group className="mb-3" controlId="dropdown_name">
        <Form.Label>{ props.title }</Form.Label>
        <Dropdown drop="down" dir="down">
            <Dropdown.Toggle variant="dark" id="dropdown-basic" size="md" style={{ width: "100%" }} dir="down">
            {selected}
            </Dropdown.Toggle>
            <Dropdown.Menu
            style={{
                maxHeight: "400px",
                overflowY: "auto",
                padding: "0.5rem 0",
                width: "100%",
                left: 0,
                right: 0,
                top: "100%",
                marginTop: "0.5rem"
            }}
            >
            <Dropdown.Header
                style={{ paddingLeft: "1rem", fontWeight: "bold" }}
            >
                {capitalize(props.key1Title)} : {capitalize(props.key2Title)}
            </Dropdown.Header>
            {props.data.map((data) => (
                <React.Fragment key={data[props.selectKey]}>
                <Dropdown.Item
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                    }}
                    onClick={() => handleSelect(data)}
                    key={data[props.selectKey]}
                >
                    {data[props.key1]}{" "}
                    <span style={{ color: "#999", paddingLeft: "1rem" }}>
                    {data[props.key2]}
                    </span>
                </Dropdown.Item>
                <Dropdown.Divider />
                </React.Fragment>
            ))}
            </Dropdown.Menu>
        </Dropdown>
        </Form.Group>
    );
}

export default VerifierDropdown;