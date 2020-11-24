import React from "react";
import { TextInput, Text } from "@primer/components";
import styles from "./Profile.module.css";

export interface ProfileSectionProps {
  label: string;
  name: string;
  defaultValue: string | number;
  onChange: (e: React.ChangeEvent) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  label,
  defaultValue,
  onChange,
}) => {
  return (
    <div className={styles.section}>
      <Text className={styles.label} fontWeight="bold">
        {label}
      </Text>
      <TextInput
        name={name}
        placeholder={label}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};
