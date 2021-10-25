import React ,{useState}from "react";
import Input from "../Input";
import stepOneSchema from "./schema"
import { useUser } from "../../context/userContext/userContex"
import { Redirect } from "react-router";
import Button from "../Button/index";
import { useFormik } from "formik";



function StepOneForm() {
  const { name, email, countryCode, phone, submitStepOne,userDataValidPage1 } = useUser();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      countryCode: "countryCode",
      phone: "phone",
          },
    validationSchema: stepOneSchema,
    onSubmit: (values) => {
      submitStepOne(values);
      useUser(values)
      setTimeout(() => {
        setHasSubmitted(true);
      }, 500);
    },
    
  });
  if(userDataValidPage1){
    return(<Redirect to="/checkout/step-2"/>)
  }

  return (
    <>
      <div class="d-flex flex-column min-vh-100">
        <form onSubmit={formik.handleSubmit} id="stepOne">
          <Input
            type="text"
            label="Name"
            placeholder="Your name"
            id="name"
            value={formik.values.name}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            hasErrorMessage={formik.touched.name}
            errorMessage={formik.errors.name}
            isTouched={formik.touched.name}
          />
          <Input
            type="text"
            label="Email"
            placeholder="Your email address"
            id="email"
            value={formik.values.email}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            hasErrorMessage={formik.touched.email}
            errorMessage={formik.errors.email}
            isTouched={formik.touched.email}
          />

          <Input
            type="number"
            label="Phone"
            placeholder="Your phone number"
            id="phone"
            // name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Button
            submitButton
            block
            disabled={formik.isValidating || !formik.isValid}
          >
            {formik.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          {/* {hasSubmitted && <Redirect to="/checkout/step-2"/>} */}
        </form>
      </div>
    </>
  )
} export default StepOneForm