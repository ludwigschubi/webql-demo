import React from "react";
import { Formik, Form } from "formik";
import { ButtonPrimary, Text, ButtonDanger } from "@primer/components";
import auth from "solid-auth-client";

import { useGqlMutation, useGqlQuery } from "../../api/schema";
import { FormSection } from "./FormSection";
import styles from "./Profile.module.css";

export const Profile: React.FC<{ webId: string }> = ({ webId }) => {
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
    { webId }
  );

  const [updateProfile] = useGqlMutation(`
  mutation updateProfile($data: UpdatePersonInput!, $webId: String!) {
    updatePerson(data: $data, webId: $webId) {
      id
    }
  }
  `);

  const { error, data } = result;

  if (error) {
    return <div>{error.message as string}</div>;
  } else if (!data || !data.person) {
    return <div>Loading...</div>;
  }

  const { name, hasEmail, role } = data.person;

  return (
    <>
      <Text fontSize="2em" marginBottom="16px">
        Hello {name}
      </Text>
      <Formik
        initialValues={{
          name,
          role,
          email: hasEmail.value.replace("mailto:", ""),
        }}
        onSubmit={async (data) => {
          const result = await updateProfile({ variables: { data, webId } });
          console.log(result);
        }}
      >
        {({ values, handleChange, dirty }) => (
          <Form>
            <FormSection
              label="Name"
              name="name"
              defaultValue={values.name}
              onChange={handleChange}
            />
            <FormSection
              label="Job / Role"
              name="role"
              defaultValue={values.role}
              onChange={handleChange}
            />
            <FormSection
              label="Email"
              name="hasEmail"
              defaultValue={values.email}
              onChange={handleChange}
            />
            <div className={styles.buttons}>
              <ButtonDanger
                marginRight="8px"
                onClick={() => {
                  auth.logout().then(() => {
                    window.location.reload();
                  });
                }}
              >
                Logout
              </ButtonDanger>
              <ButtonPrimary disabled={!dirty} name="submit">
                Submit
              </ButtonPrimary>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
