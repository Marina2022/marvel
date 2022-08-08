import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./formComponent.css";
import useMarvelService from "../../services/useMarvelService";

const FormComponent = () => {
  const [char, setChar] = useState(null);
  const { getCharByName, error, loading, clearError } = useMarvelService();

  const updateChar = (charName) => {
    getCharByName(charName).then((res) => {
      setChar(res);
    });
  };

  let additionalSection = null; // доп. кнопка или ошибка после запроса

  if (char) {
    console.log(char);
  }

  if (char === undefined) {
    additionalSection = (
      <div className="text search-error">
        The character was not found. Check the name and try again
      </div>
    );
  } else if (char) {
    additionalSection = (
      <>
        <div className="text succes-text">
          We found the hero! Visit the {char.name} page?
        </div>
        <Link to={`/${char.id}`} className="button button__secondary">
          <div className="inner">To page</div>
        </Link>
      </>
    );
  }

  return (
    <>
      <Formik
        initialValues={{ charName: "" }}
        onSubmit={({ charName }) => updateChar(charName)}
        validationSchema={Yup.object({
          charName: Yup.string().required(
            <div className="text search-error">This field is required</div>
          ),
        })}
      >
        <Form>
          <h3>Or find a character by name</h3>
          <Field name="charName" type="text" placeholder="Enter name"></Field>
          <ErrorMessage name="charName"></ErrorMessage>
          <button type="submit" className="button button__main">
            <div className="inner">Find</div>
          </button>
          {additionalSection}
        </Form>
      </Formik>
    </>
  );
};

export default FormComponent;
