import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';

export default function InputsCard(props) {
  // required props:
  const {fieldsSchema, uiSchema, submitFunction} = props
  const [formData, setFormData] = React.useState(null);

  return (
    <Paper elevation={3} sx={{ ...{ marginTop: "10px", marginBottom: "10px", padding: "10px" }, ...props.sx }}>
      <Typography variant="overline" >Inputs</Typography>
      <br />
      <Form
        schema={fieldsSchema}
        uiSchema={uiSchema}
        validator={validator}
        formData={formData}
        onChange={(e) => { setFormData(e.formData) }}
        onSubmit={() => { submitFunction(formData) }}
        onError={(e) => console.log('errors')}
      />
    </Paper>
  )
}