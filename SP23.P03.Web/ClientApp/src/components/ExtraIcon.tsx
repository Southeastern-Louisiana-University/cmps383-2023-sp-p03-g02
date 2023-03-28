import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import React from "react";
import { faChild, faPerson, faPersonCane, faRunning, faTrain, faWalking } from "@fortawesome/free-solid-svg-icons";

// This component is for FontAwesome icons that are not included in Semantic UI's Icon component.
// Feel free to add more icons if you need them.

const EXTRA_ICONS = {
    "running": faRunning,
    "walking": faWalking,
    "person": faPerson,
    "train": faTrain,
    "senior": faPersonCane,
    "child": faChild,
};

type ExtraIconProps = Omit<FontAwesomeIconProps, "icon"> & {
    name: keyof typeof EXTRA_ICONS;
}


const ExtraIcon = (props: ExtraIconProps) => {
    const { name, ...rest } = props;
    return <FontAwesomeIcon icon={EXTRA_ICONS[name]} {...rest} />;
}

export default ExtraIcon;