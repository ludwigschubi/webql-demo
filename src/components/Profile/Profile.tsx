import React from "react";
import { Formik, Form } from "formik";
import { ButtonPrimary, Text } from "@primer/components";

import { useGqlQuery } from "../../api/schema";
import { ProfileSection } from "./ProfileSection";
import styles from "./Profile.module.css";

function Profile() {
  const result = useGqlQuery(
    `
  query getPerson($webId: String!) {
    person(webId: $webId) {
      id
      foaf#name
      vcard#role
      vcard#hasEmail { 
        vcard#value
      }
    }
  }
  `,
    { webId: "https://lalatest.solidcommunity.net/profile/card#me" }
  );

  const { error, data } = result;

  if (error) {
    return <div>{error.message as string}</div>;
  } else if (!data || !data.person) {
    return <div>Loading...</div>;
  }

  const { name, hasEmail, role } = data.person;

  return (
    <>
      <Text fontSize="2em" marginBottom="16px">Hello {name}</Text>
      <Formik
        initialValues={{ name, role, email: hasEmail.value }}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <ProfileSection
              label="Name"
              name="name"
              defaultValue={values.name}
              onChange={handleChange}
            />
            <ProfileSection
              label="Job / Role"
              name="role"
              defaultValue={values.role}
              onChange={handleChange}
            />
            <ProfileSection
              label="Email"
              name="hasEmail"
              defaultValue={values.email}
              onChange={handleChange}
            />
            <ButtonPrimary className={styles.submit} name="submit">
              Submit
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Profile;
