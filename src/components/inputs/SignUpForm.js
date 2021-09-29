import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useHistory } from "react-router-dom";
import { AppSatateContext } from "../../contexts/AppStateContext";
import { appStateVars } from "../../unchangingVars";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Container } from "../containers/flexbox";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
`;
const StyledContainer = styled(Container)`
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  nick: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .min(6, "Must be 6 characters or more")
    .max(20, "Must be 15 characters or less")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function SignUpForm() {
  const { signup } = useAuth();
  const { createUser } = useFirestore();
  const [, dispatch] = useContext(AppSatateContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      nick: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError("");
        setLoading(true);
        await signup(values.email, values.password);
        await createUser({ email: values.email, nick: values.nick });
        dispatch({
          type: appStateVars.ALLERT,
          message: "Succes sign up, hello new frend!",
        });
        dispatch({ type: appStateVars.SHOW_ALLERT });
        history.push("/");
      } catch {
        setError("Failed to create an account");
        dispatch({ type: appStateVars.ALLERT, message: error, isError: true });
        dispatch({ type: appStateVars.SHOW_ALLERT });
      }
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: appStateVars.DONT_SHOW_ALLERT });
      }, 5000);
    },
  });
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <StyledContainer direction="column" jusContent="center" aliItems="center">
        {error && <p>{error}</p>}
        <TextField
          fullWidth
          color="secondary"
          id="email"
          label="e-mail"
          type="email"
          error={formik.touched.email && formik.errors.email ? true : false}
          {...formik.getFieldProps("email")}
          helperText={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
        />
        <TextField
          fullWidth
          color="secondary"
          id="nick"
          label="nick"
          type="text"
          error={formik.touched.nick && formik.errors.nick ? true : false}
          {...formik.getFieldProps("nick")}
          helperText={
            formik.touched.nick && formik.errors.nick
              ? formik.errors.nick
              : null
          }
        />
        <TextField
          fullWidth
          color="secondary"
          id="password"
          label="password"
          type="password"
          error={
            formik.touched.password && formik.errors.password ? true : false
          }
          {...formik.getFieldProps("password")}
          helperText={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
        />
        <TextField
          fullWidth
          color="secondary"
          id="passwordConfirmation"
          label="repeat password"
          type="password"
          error={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
              ? true
              : false
          }
          {...formik.getFieldProps("passwordConfirmation")}
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
              ? formik.errors.passwordConfirmation
              : null
          }
        />

        <Button color="secondary" variant="contained" type="submit">
          {loading ? <CircularProgress /> : "Submit"}
        </Button>
      </StyledContainer>
    </StyledForm>
  );
}

export default SignUpForm;
